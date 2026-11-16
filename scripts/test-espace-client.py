"""Parcours complet de l'API de l'espace client sur le serveur PHP de test (port 8099)."""
import http.cookiejar, json, os, re, sys, urllib.request, urllib.error

B = 'http://127.0.0.1:8099/api/crm'
# Le serveur de test doit être lancé avec les mêmes valeurs (voir docs/espace-client.md, « Tester en local ») :
#   CRM_DB=$D/crm.sqlite CRM_MAIL_LOG=$D/mails.txt CRM_SITE_URL=http://localhost:8099 CRM_N8N_TOKEN=<jeton> php -S 127.0.0.1:8099 -t public
T = os.environ['CRM_TEST_DIR']   # dossier $D ci-dessus (base neuve à chaque essai)
TOK = os.environ.get('CRM_N8N_TOKEN', 'test-token-0123456789abcdef0123456789abcdef')
ok = ko = 0


class Client:
    def __init__(self):
        self.op = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(http.cookiejar.CookieJar()))

    def req(self, path, data=None, headers=None, axion=True):
        h = {'Content-Type': 'application/json'}
        if axion and data is not None:
            h['X-Requested-With'] = 'axion'
        h.update(headers or {})
        body = json.dumps(data).encode() if data is not None else None
        r = urllib.request.Request(B + path, data=body, headers=h, method='POST' if body else 'GET')
        try:
            with self.op.open(r) as resp:
                return resp.status, json.loads(resp.read() or b'{}')
        except urllib.error.HTTPError as e:
            return e.code, json.loads(e.read() or b'{}')


def check(name, cond, got=None):
    global ok, ko
    if cond:
        ok += 1; print('OK  ', name)
    else:
        ko += 1; print('FAIL', name, '->', got)


def last_link():
    txt = open(os.path.join(T, 'mails.txt'), encoding='utf-8').read()
    return re.findall(r'lien=([a-f0-9]{64})', txt)[-1]


anon, admin, client, n8n = Client(), Client(), Client(), Client()
N = {'X-Axion-Token': TOK}

s, r = anon.req('/auth.php?action=moi'); check('moi sans session = 401', s == 401, r)
try:
    urllib.request.urlopen(B + '/auth.php?action=moi')
except urllib.error.HTTPError as e:
    check('aucun cookie pour un visiteur', e.headers.get('Set-Cookie') is None, e.headers.get('Set-Cookie'))
s, r = anon.req('/auth.php', {'action': 'oubli'}, axion=False); check('POST sans en-tête = 403', s == 403, r)
s, r = anon.req('/admin.php?action=tableau'); check('admin sans session = 401', s == 401, r)

# 0. Accès administrateur sans e-mail (empreinte crm_admin_password_hash, ici CRM_ADMIN_PASSWORD_HASH)
if os.environ.get('CRM_ADMIN_PASSWORD_HASH'):
    s, r = Client().req('/auth.php', {'action': 'connexion', 'email': 'arthur.champagne@icloud.com', 'password': 'faux-mot-de-passe'}); check('empreinte : mauvais mot de passe refusé', s == 401, r)
    s, r = Client().req('/auth.php', {'action': 'connexion', 'email': 'arthur.champagne@icloud.com', 'password': os.environ.get('CRM_ADMIN_TEST_PASSWORD', '')}); check('empreinte : compte admin créé à la connexion', r.get('user', {}).get('role') == 'admin', r)

# 1. Premier accès administrateur
s, r = anon.req('/auth.php', {'action': 'oubli', 'email': 'arthur.champagne@icloud.com'}); check('oubli admin (résultat d’envoi indiqué)', r.get('ok') and r.get('envoi') is True, r)
s, r = anon.req('/auth.php', {'action': 'oubli', 'email': 'inconnu@exemple.fr'}); check('oubli inconnu : même réponse, sans résultat', r.get('ok') and 'envoi' not in r, r)
L = last_link()
s, r = anon.req(f'/auth.php?action=lien&lien={L}'); check('lien vérifié', r.get('usage') == 'reinitialisation', r)
s, r = anon.req('/auth.php', {'action': 'activer', 'lien': L, 'password': 'court'}); check('mot de passe trop court', r.get('error') == 'validation', r)
s, r = admin.req('/auth.php', {'action': 'activer', 'lien': L, 'password': 'motdepasse-admin-1'}); check('activation admin', r.get('user', {}).get('role') == 'admin', r)
s, r = anon.req(f'/auth.php?action=lien&lien={L}'); check('lien à usage unique', s == 404, r)
s, r = anon.req('/auth.php', {'action': 'connexion', 'email': 'arthur.champagne@icloud.com', 'password': 'faux-faux-faux'}); check('mauvais mot de passe', s == 401, r)
admin = Client()
s, r = admin.req('/auth.php', {'action': 'connexion', 'email': 'Arthur.Champagne@icloud.com', 'password': 'motdepasse-admin-1'}); check('connexion admin (majuscules)', r.get('ok'), r)

# 2. n8n envoie des workflows avant que le client existe
wf = [
    {'id': '11', 'nom': 'Relances factures', 'active': True, 'client': 'boulangerie-martin', 'dernier_statut': 'success', 'derniere_execution': '2026-11-12T08:00:03.000Z', 'executions_7j': 42, 'erreurs_7j': 0},
    {'id': '12', 'nom': 'Devis entrants', 'active': True, 'client': 'boulangerie-martin', 'dernier_statut': 'error', 'derniere_execution': '2026-11-12T09:10:00.000Z', 'executions_7j': 10, 'erreurs_7j': 2},
    {'id': '13', 'nom': 'Rapport hebdo', 'active': False, 'client': 'boulangerie-martin', 'dernier_statut': '', 'derniere_execution': '', 'executions_7j': 0, 'erreurs_7j': 0},
    {'id': '20', 'nom': 'Prospection Axion', 'active': True, 'client': '', 'dernier_statut': 'success', 'derniere_execution': '2026-11-12T07:00:00.000Z', 'executions_7j': 5, 'erreurs_7j': 0},
]
sync = {'action': 'synchro', 'instance': 'mac-arthur', 'workflows': wf}
s, r = n8n.req('/n8n.php', sync, axion=False); check('n8n sans jeton = 401', s == 401, r)
s, r = n8n.req('/n8n.php', sync, {'X-Axion-Token': 'faux'}, axion=False); check('n8n mauvais jeton = 401', s == 401, r)
s, r = n8n.req('/n8n.php', sync, N, axion=False); check('synchro n8n (X-Axion-Token)', r.get('recues') == 4, r)
s, r = n8n.req('/n8n.php', sync, {'Authorization': 'Bearer ' + TOK}, axion=False); check('synchro n8n (Authorization)', r.get('recues') == 4, r)
s, r = admin.req('/admin.php?action=tableau'); check('4 automatisations non rattachées', len(r.get('non_rattachees', [])) == 4, r)

# 3. Contrat signé : création du client et e-mail d'accès
s, r = admin.req('/admin.php', {'action': 'creer', 'entreprise': 'Boulangerie Martin', 'contact': 'Claire Martin', 'email': 'claire@exemple.fr', 'formule': 'Projet + suivi mensuel', 'suivi': True, 'date_contrat': '2026-11-12', 'envoyer': True})
check('création client', r.get('client', {}).get('slug') == 'boulangerie-martin', r)
check('e-mail envoyé', r.get('mail_envoye') is True, r)
mail = open(os.path.join(T, 'mails.txt'), encoding='utf-8').read().split('-----')[-2]
check('e-mail : identifiant et adresse', 'Votre identifiant : claire@exemple.fr' in mail and '/espace-client/' in mail, mail)
check('e-mail : aucun mot de passe', 'mot de passe :' not in mail.lower(), mail)
s, r = admin.req('/admin.php', {'action': 'creer', 'entreprise': 'Autre', 'email': 'claire@exemple.fr'}); check('doublon refusé', s == 422, r)
s, r = admin.req('/admin.php?action=tableau')
c = (r.get('clients') or [{}])[0]
check('rattachement automatique (3)', c.get('nb') == 3, c)
check('compteurs : 1 erreur, 1 en pause', c.get('erreurs') == 1 and c.get('pause') == 1, c)
check('compte invité', c.get('compte') == 'invite', c)
check('3 visibles sans description', c.get('sans_description') == 3, c)
check('reste 1 non rattachée', len(r.get('non_rattachees', [])) == 1, r.get('non_rattachees'))
check('journal des e-mails visible', any(m.get('a') == 'claire@exemple.fr' and m.get('ok') for m in r.get('emails', [])), r.get('emails'))

# 4. Le client active son accès
L = last_link()
s, r = anon.req(f'/auth.php?action=lien&lien={L}'); check('lien client = invitation', r.get('usage') == 'invitation', r)
s, r = client.req('/auth.php', {'action': 'activer', 'lien': L, 'password': 'boulangerie-2026'}); check('activation client', r.get('user', {}).get('role') == 'client', r)
s, r = client.req('/client.php')
check('client voit son contrat', r.get('client', {}).get('entreprise') == 'Boulangerie Martin', r)
check('client voit 3 automatisations', len(r.get('automatisations', [])) == 3, r)
etats = sorted(a['etat'] for a in r.get('automatisations', []))
check('états : erreur, ok, pause', etats == ['erreur', 'ok', 'pause'], etats)
check('pas de fuite (prospection)', 'Prospection' not in json.dumps(r), r)
check('pas de champ interne (workflow_id)', 'workflow_id' not in json.dumps(r), r)
s, r = client.req('/admin.php?action=tableau'); check('client refusé en admin', s == 403, r)
s, r = client.req('/admin.php', {'action': 'creer', 'entreprise': 'X', 'email': 'x@exemple.fr'}); check('client ne peut pas créer', s == 403, r)

# 5. Administration
s, r = admin.req('/admin.php?action=client&id=1')
aid = next(a['id'] for a in r['automatisations'] if a['nom'] == 'Rapport hebdo')
s, r = admin.req('/admin.php', {'action': 'automatisation', 'id': aid, 'visible': False, 'description': 'Envoi du rapport du lundi'}); check('masquer une automatisation', r.get('ok'), r)
s, r = client.req('/client.php'); check('le client en voit 2', len(r.get('automatisations', [])) == 2, r)
s, r = n8n.req('/n8n.php', {'action': 'synchro', 'instance': 'mac-arthur', 'workflows': [wf[0]]}, N, axion=False)
s, r = client.req('/client.php'); check('workflow disparu = retiré', len(r.get('automatisations', [])) == 1, r)
s, r = n8n.req('/n8n.php', sync, N, axion=False)
s, r = admin.req('/admin.php?action=client&id=1')
ra = next(a for a in r['automatisations'] if a['nom'] == 'Rapport hebdo')
check('réglages gardés après synchro', ra['visible'] is False and ra['description'] == 'Envoi du rapport du lundi', ra)
s, r = admin.req('/admin.php', {'action': 'modifier', 'id': 1, 'statut': 'pause', 'notes': 'Relance le 15'}); check('modifier le client', r.get('ok'), r)
s, r = admin.req('/admin.php', {'action': 'acces', 'id': 1, 'actif': False}); check("suspendre l'accès", r.get('ok'), r)
s, r = client.req('/client.php'); check('session client coupée', s == 401, r)
s, r = Client().req('/auth.php', {'action': 'connexion', 'email': 'claire@exemple.fr', 'password': 'boulangerie-2026'}); check('connexion refusée si suspendu', s == 401, r)
s, r = admin.req('/admin.php', {'action': 'acces', 'id': 1, 'actif': True}); check("rétablir l'accès", r.get('ok'), r)
s, r = admin.req('/admin.php', {'action': 'renvoyer', 'id': 1}); check("renvoyer l'accès", r.get('mail_envoye') is True, r)

# 6. Mot de passe oublié côté client
s, r = client.req('/auth.php', {'action': 'connexion', 'email': 'claire@exemple.fr', 'password': 'boulangerie-2026'}); check('reconnexion du client', r.get('ok'), r)
s, r = anon.req('/auth.php', {'action': 'oubli', 'email': 'claire@exemple.fr'})
L = last_link()
s, r = anon.req(f'/auth.php?action=lien&lien={L}'); check('lien réinitialisation client', r.get('usage') == 'reinitialisation', r)
c2 = Client()
s, r = c2.req('/auth.php', {'action': 'activer', 'lien': L, 'password': 'nouveau-mdp-2026'}); check('nouveau mot de passe', r.get('ok'), r)
s, r = Client().req('/auth.php', {'action': 'connexion', 'email': 'claire@exemple.fr', 'password': 'boulangerie-2026'}); check('ancien mot de passe refusé', s == 401, r)
s, r = client.req('/client.php'); check('ancienne session coupée par le nouveau mot de passe', s == 401, r)
s, r = c2.req('/client.php'); check('la session qui a changé le mot de passe reste ouverte', s == 200, r)

# 7. n8n crée un client (workflow « contrat signé »)
s, r = n8n.req('/n8n.php', {'action': 'nouveau-client', 'entreprise': 'Boulangerie Martin', 'contact': 'Paul', 'email': 'paul@exemple.fr'}, N, axion=False)
check('n8n : nouveau client (slug unique)', r.get('client', {}).get('slug') == 'boulangerie-martin-2', r)

# 8. Suppression d'un client (fin de contrat, droit à l'effacement)
s, r = admin.req('/admin.php', {'action': 'supprimer', 'id': 1, 'confirmation': 'Boulangerie'}); check('suppression : confirmation exigée', s == 422, r)
s, r = admin.req('/admin.php', {'action': 'supprimer', 'id': 1, 'confirmation': 'Boulangerie Martin'}); check('suppression du client', r.get('ok'), r)
s, r = Client().req('/auth.php', {'action': 'connexion', 'email': 'claire@exemple.fr', 'password': 'nouveau-mdp-2026'}); check('compte effacé', s == 401, r)
s, r = admin.req('/admin.php?action=tableau')
check('workflows gardés, sans client', len(r.get('non_rattachees', [])) == 4 and all(c['id'] != 1 for c in r.get('clients', [])), r)

# 9. Retirer un n8n qui n'envoie plus rien : seul celui-là disparaît
s, r = n8n.req('/n8n.php', {'action': 'synchro', 'instance': 'ancien-mac', 'workflows': [{'id': '99', 'nom': 'Vieux test', 'active': False}]}, N, axion=False)
s, r = admin.req('/admin.php?action=tableau'); avant = len(r.get('non_rattachees', []))
s, r = admin.req('/admin.php', {'action': 'oublier', 'instance': 'ancien-mac'}); check('retirer un n8n', r.get('ok'), r)
s, r = admin.req('/admin.php?action=tableau')
check("retirer : l'instance et ses workflows partent", [x['instance'] for x in r.get('synchros', [])] == ['mac-arthur'] and len(r.get('non_rattachees', [])) == avant - 1, r.get('synchros'))
check("retirer : l'autre instance est intacte", sum(1 for a in r.get('non_rattachees', []) if a['instance'] == 'mac-arthur') == 4, r.get('non_rattachees'))

# 10. Étiquette sans lettre ni chiffre : rattachée à personne, même si un client s'appelle « client »
s, r = n8n.req('/n8n.php', {'action': 'nouveau-client', 'entreprise': '???', 'email': 'z@exemple.fr', 'envoyer': False}, N, axion=False)
check('client sans lettre = identifiant « client »', r.get('client', {}).get('slug') == 'client', r)
s, r = n8n.req('/n8n.php', {'action': 'synchro', 'instance': 'test-etiquette', 'workflows': [{'id': '1', 'nom': 'Etiquette vide', 'client': '---'}]}, N, axion=False)
s, r = admin.req('/admin.php?action=tableau')
check('étiquette « --- » : aucun client', any(a['nom'] == 'Etiquette vide' for a in r.get('non_rattachees', [])), r.get('non_rattachees'))
admin.req('/admin.php', {'action': 'oublier', 'instance': 'test-etiquette'})

# 11. Désactivée dans n8n : « à la demande » si elle a tourné cette semaine (bouton, sous-workflow), sinon « en pause »
s, r = n8n.req('/n8n.php', {'action': 'synchro', 'instance': 'test-etats', 'workflows': [
    {'id': '1', 'nom': 'Sous-workflow appele', 'active': False, 'dernier_statut': 'success', 'executions_7j': 3},
    {'id': '2', 'nom': 'Arrete', 'active': False, 'dernier_statut': 'success', 'executions_7j': 0}]}, N, axion=False)
s, r = admin.req('/admin.php?action=tableau')
etats = {a['nom']: a['etat'] for a in r.get('non_rattachees', []) if a['instance'] == 'test-etats'}
check('états : à la demande / en pause', etats == {'Sous-workflow appele': 'demande', 'Arrete': 'pause'}, etats)
admin.req('/admin.php', {'action': 'oublier', 'instance': 'test-etats'})

# 12. Coffre : le client dépose un accès chiffré dans son navigateur, le serveur n8n l'installe (docs/coffre-acces.md).
# Nécessite CRM_COFFRE_TEST_DIR (clés de test : chiffrement.pem/.pub.pem, signature.pem/.pub.pem) et le serveur PHP
# lancé avec CRM_COFFRE_SIGNATURE_PUB=$CRM_COFFRE_TEST_DIR/signature.pub.pem.
K = os.environ.get('CRM_COFFRE_TEST_DIR')
if K:
    import base64, subprocess, time
    from cryptography.hazmat.primitives import hashes, serialization
    from cryptography.hazmat.primitives.asymmetric import padding
    RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

    def chiffrer_navigateur(i, valeurs):   # le vrai code du navigateur (src/espace/coffre.js), exécuté par Node
        js = ("import { chiffrerAcces } from './src/espace/coffre.js'; import { readFileSync } from 'node:fs';"
              f"console.log(JSON.stringify(await chiffrerAcces({i}, {json.dumps(valeurs)}, readFileSync('{K}/chiffrement.pub.pem', 'utf8'))))")
        return json.loads(subprocess.run(['node', '--input-type=module', '-e', js], cwd=RACINE, capture_output=True, text=True, check=True).stdout)

    def signe(corps, temps=None, cle='signature.pem'):
        temps = str(temps or int(time.time()))
        k = serialization.load_pem_private_key(open(os.path.join(K, cle), 'rb').read(), None)
        sig = k.sign(temps.encode() + b'\n' + corps, padding.PKCS1v15(), hashes.SHA256())
        return {'X-Axion-Temps': temps, 'X-Axion-Signature': base64.b64encode(sig).decode()}

    def agent(importer):
        env = dict(os.environ, COFFRE_SITE=B + '/coffre.php', COFFRE_DOSSIER=K, COFFRE_IMPORT=importer)
        return subprocess.run([sys.executable, os.path.join(RACINE, 'automatisations/coffre/agent.py')], env=env, capture_output=True, text=True)

    # un client actif
    s, r = admin.req('/admin.php', {'action': 'creer', 'entreprise': 'Cabinet Coffre', 'email': 'coffre@exemple.fr', 'envoyer': True})
    cid = r['client']['id']
    cc = Client(); s, r = cc.req('/auth.php', {'action': 'activer', 'lien': last_link(), 'password': 'coffre-mdp-2026'})
    s, r = admin.req('/admin.php', {'action': 'acces-creer', 'client_id': cid, 'libelle': 'Clé', 'type': 'pas un type!', 'champs': [{'cle': 'token', 'libelle': 'Clé'}]})
    check('coffre : type invalide refusé', s == 422 and 'type' in r.get('fields', {}), r)
    s, r = admin.req('/admin.php', {'action': 'acces-creer', 'client_id': cid, 'libelle': 'Clé API facturation', 'type': 'httpBearerAuth', 'champs': [{'cle': 'token', 'libelle': 'Clé API'}]})
    aid = r.get('id'); check('coffre : demande créée', bool(aid), r)
    s, r = cc.req('/client.php')
    check('coffre : le client voit la demande', [a['statut'] for a in r.get('acces', [])] == ['demande'], r.get('acces'))
    check('coffre : le client ne voit ni type ni réglages', 'type' not in r['acces'][0] and 'fixes' not in r['acces'][0], r['acces'][0])
    s, r = cc.req('/client.php', {'action': 'acces-envoyer', 'id': aid, 'chiffre': {'v': 1, 'k': 'abc', 'iv': 'x', 'c': 'y'}})
    check('coffre : bloc mal formé refusé', s == 422 and r.get('error') == 'chiffre', r)
    s, r = client.req('/client.php', {'action': 'acces-envoyer', 'id': aid, 'chiffre': chiffrer_navigateur(aid, {'token': 'x'})})
    check("coffre : un autre compte ne peut pas déposer", s in (401, 403, 404), (s, r))
    # le client glisse un champ en plus : il ne doit pas être installé
    s, r = cc.req('/client.php', {'action': 'acces-envoyer', 'id': aid, 'chiffre': chiffrer_navigateur(aid, {'token': 'sk-secret-É€-42', 'oauthTokenData': 'piege'})})
    check('coffre : accès chiffré déposé', r.get('ok'), r)
    s, r = cc.req('/client.php', {'action': 'acces-envoyer', 'id': aid, 'chiffre': chiffrer_navigateur(aid, {'token': 'y'})})
    check('coffre : pas de second dépôt pendant l’installation', s == 404, (s, r))
    s, r = admin.req(f'/admin.php?action=client&id={cid}')
    check("coffre : l'admin voit « reçu », jamais le bloc", r['acces'][0]['statut'] == 'recu' and 'chiffre' not in json.dumps(r) and 'sk-secret' not in json.dumps(r), r['acces'])
    # entrée du serveur n8n : signature obligatoire
    corps = json.dumps({'action': 'a-installer'}).encode()
    s, r = n8n.req('/coffre.php', {'action': 'a-installer'}, axion=False); check('coffre : sans signature = 401', s == 401, r)
    s, r = n8n.req('/coffre.php', {'action': 'a-installer'}, signe(corps, cle='chiffrement.pem'), axion=False); check('coffre : mauvaise clé = 401', s == 401, r)
    s, r = n8n.req('/coffre.php', {'action': 'a-installer'}, signe(corps, temps=int(time.time()) - 600), axion=False); check('coffre : signature périmée = 401', s == 401, r)
    s, r = n8n.req('/coffre.php', {'action': 'a-installer'}, signe(corps), axion=False)
    check('coffre : le serveur reçoit le bloc', [a['id'] for a in r.get('acces', [])] == [aid] and r['acces'][0]['champs'] == ['token'], r)
    # le programme du serveur : déchiffre et « importe » (ici dans un fichier de test)
    imp = os.path.join(T, 'import.json')
    out = agent(f"sh -c 'cat > {imp}'")
    importe = json.load(open(imp))[0]
    check('coffre : importé avec la bonne valeur', importe['type'] == 'httpBearerAuth' and importe['data'] == {'token': 'sk-secret-É€-42'}, importe)
    check('coffre : champ glissé par le client ignoré', 'oauthTokenData' not in importe['data'], importe['data'])
    s, r = cc.req('/client.php')
    check('coffre : le client voit « en place »', r['acces'][0]['statut'] == 'installe', r['acces'])
    s, r = admin.req(f'/admin.php?action=client&id={cid}')
    check("coffre : l'admin voit l'identifiant n8n", r['acces'][0]['n8n_id'] == importe['id'], r['acces'])
    s, r = n8n.req('/coffre.php', {'action': 'a-installer'}, signe(corps), axion=False)
    check('coffre : bloc effacé après installation', r.get('acces') == [], r)
    journal = open(os.path.join(K, 'journal.log')).read()
    check('coffre : aucune valeur dans le journal', 'sk-secret' not in journal and 'installé' in journal, journal)
    # échec d'installation : le client peut renvoyer
    s, r = admin.req('/admin.php', {'action': 'acces-redemander', 'id': aid}); check('coffre : redemander', r.get('ok'), r)
    s, r = cc.req('/client.php', {'action': 'acces-envoyer', 'id': aid, 'chiffre': chiffrer_navigateur(aid, {'token': 'nouvelle-cle'})})
    out = agent('false')
    s, r = cc.req('/client.php')
    check('coffre : échec signalé, à renvoyer', r['acces'][0]['statut'] == 'erreur', r['acces'])
    s, r = cc.req('/client.php', {'action': 'acces-envoyer', 'id': aid, 'chiffre': chiffrer_navigateur(aid, {'token': 'encore'})})
    check('coffre : renvoi accepté après une erreur', r.get('ok'), r)
    s, r = admin.req('/admin.php', {'action': 'acces-supprimer', 'id': aid}); check('coffre : retirer la demande', r.get('ok'), r)
    s, r = cc.req('/client.php'); check('coffre : demande retirée', r.get('acces') == [], r.get('acces'))
else:
    print('(coffre non testé : CRM_COFFRE_TEST_DIR absent)')

s, r = admin.req('/auth.php', {'action': 'deconnexion'}); check('déconnexion', r.get('ok'), r)
s, r = admin.req('/admin.php?action=tableau'); check('après déconnexion = 401', s == 401, r)

print(f'--- {ok} OK, {ko} échecs')
sys.exit(1 if ko else 0)
