#!/usr/bin/env python3
"""Installe dans n8n les accès que les clients ont déposés chiffrés dans leur espace (voir docs/coffre-acces.md).

Tourne sur le serveur n8n, chaque minute (minuterie systemd). Les clés privées restent dans ce dossier, lisible par
root seul : chiffrement.pem déchiffre les accès, signature.pem signe les requêtes vers le site (pas de mot de passe).
Rien n'est écrit sur disque en clair, rien de secret n'est affiché ni journalisé : l'accès passe directement, par
l'entrée standard, à la commande d'import de n8n, qui le chiffre avec sa propre clé.

Variables (tests uniquement) : COFFRE_SITE (adresse de coffre.php), COFFRE_DOSSIER (dossier des clés),
COFFRE_IMPORT (commande d'import ; par défaut docker exec dans le conteneur n8n).
"""
import base64, json, os, secrets, shlex, string, subprocess, sys, time, urllib.request, urllib.error
from cryptography.hazmat.primitives import hashes, serialization
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.ciphers.aead import AESGCM

SITE = os.environ.get('COFFRE_SITE', 'https://axionstudio.fr/api/crm/coffre.php')
DOSSIER = os.environ.get('COFFRE_DOSSIER', os.path.dirname(os.path.abspath(__file__)))
IMPORT = shlex.split(os.environ.get('COFFRE_IMPORT', 'docker exec -i n8n-ic2h-n8n-1 n8n import:credentials --input=/dev/stdin'))


def cle(nom):
    with open(os.path.join(DOSSIER, nom), 'rb') as f:
        return serialization.load_pem_private_key(f.read(), None)


def journal(texte):   # jamais de valeur d'accès ici
    with open(os.path.join(DOSSIER, 'journal.log'), 'a') as f:
        f.write(time.strftime('%Y-%m-%d %H:%M:%S ') + texte + '\n')


def site(donnees):
    corps = json.dumps(donnees).encode()
    temps = str(int(time.time()))
    sig = cle('signature.pem').sign(temps.encode() + b'\n' + corps, padding.PKCS1v15(), hashes.SHA256())
    req = urllib.request.Request(SITE, data=corps, method='POST', headers={
        'Content-Type': 'application/json', 'User-Agent': 'AxionCoffre/1.0',
        'X-Axion-Temps': temps, 'X-Axion-Signature': base64.b64encode(sig).decode()})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read())


def dechiffrer(acces):
    b = acces['chiffre']
    cle_aes = cle('chiffrement.pem').decrypt(base64.b64decode(b['k']),
                                              padding.OAEP(mgf=padding.MGF1(hashes.SHA256()), algorithm=hashes.SHA256(), label=None))
    clair = AESGCM(cle_aes).decrypt(base64.b64decode(b['iv']), base64.b64decode(b['c']), f"axion-acces:{acces['id']}".encode())
    return json.loads(clair)


def installer(acces, valeurs):
    # Seulement les champs demandés par l'administration, en texte, plus les réglages fixes non secrets
    donnees = dict(acces.get('fixes') or {})
    for k in acces['champs']:
        v = valeurs.get(k)
        if not isinstance(v, str) or not v or len(v) > 8000:
            raise ValueError('champ manquant ou invalide')
        donnees[k] = v
    n8n_id = ''.join(secrets.choice(string.ascii_letters + string.digits) for _ in range(16))
    entree = json.dumps([{'id': n8n_id, 'name': acces['nom'], 'type': acces['type'], 'data': donnees}]).encode()
    r = subprocess.run(IMPORT, input=entree, capture_output=True, timeout=180)
    if r.returncode != 0:
        raise RuntimeError(f'import n8n refusé (code {r.returncode})')   # la sortie n'est pas recopiée
    return n8n_id


def main():
    liste = site({'action': 'a-installer'}).get('acces', [])
    for a in liste:
        try:
            valeurs = dechiffrer(a)
        except Exception:
            site({'action': 'echec', 'id': a['id'], 'erreur': 'déchiffrement impossible (bloc abîmé ou clé changée)'})
            journal(f"accès {a['id']} : déchiffrement impossible")
            continue
        try:
            n8n_id = installer(a, valeurs)
        except Exception as e:
            msg = str(e) if isinstance(e, (ValueError, RuntimeError)) else 'erreur inattendue'
            site({'action': 'echec', 'id': a['id'], 'erreur': msg})
            journal(f"accès {a['id']} : {msg}")
            continue
        finally:
            valeurs = None
        site({'action': 'installe', 'id': a['id'], 'n8n_id': n8n_id})
        journal(f"accès {a['id']} installé dans n8n ({a['type']}, {n8n_id})")


if __name__ == '__main__':
    try:
        main()
    except urllib.error.HTTPError as e:
        journal(f'site : HTTP {e.code}')
        sys.exit(1)
    except Exception as e:
        journal(f'erreur : {type(e).__name__}')
        sys.exit(1)
