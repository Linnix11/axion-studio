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

# 1. Premier accès administrateur
s, r = anon.req('/auth.php', {'action': 'oubli', 'email': 'arthur.champagne@icloud.com'}); check('oubli admin', r.get('ok'), r)
s, r = anon.req('/auth.php', {'action': 'oubli', 'email': 'inconnu@exemple.fr'}); check('oubli inconnu : même réponse', r.get('ok'), r)
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
check('reste 1 non rattachée', len(r.get('non_rattachees', [])) == 1, r.get('non_rattachees'))

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
s, r = anon.req('/auth.php', {'action': 'oubli', 'email': 'claire@exemple.fr'})
L = last_link()
s, r = anon.req(f'/auth.php?action=lien&lien={L}'); check('lien réinitialisation client', r.get('usage') == 'reinitialisation', r)
c2 = Client()
s, r = c2.req('/auth.php', {'action': 'activer', 'lien': L, 'password': 'nouveau-mdp-2026'}); check('nouveau mot de passe', r.get('ok'), r)
s, r = Client().req('/auth.php', {'action': 'connexion', 'email': 'claire@exemple.fr', 'password': 'boulangerie-2026'}); check('ancien mot de passe refusé', s == 401, r)

# 7. n8n crée un client (workflow « contrat signé »)
s, r = n8n.req('/n8n.php', {'action': 'nouveau-client', 'entreprise': 'Boulangerie Martin', 'contact': 'Paul', 'email': 'paul@exemple.fr'}, N, axion=False)
check('n8n : nouveau client (slug unique)', r.get('client', {}).get('slug') == 'boulangerie-martin-2', r)

# 8. Suppression d'un client (fin de contrat, droit à l'effacement)
s, r = admin.req('/admin.php', {'action': 'supprimer', 'id': 1, 'confirmation': 'Boulangerie'}); check('suppression : confirmation exigée', s == 422, r)
s, r = admin.req('/admin.php', {'action': 'supprimer', 'id': 1, 'confirmation': 'Boulangerie Martin'}); check('suppression du client', r.get('ok'), r)
s, r = Client().req('/auth.php', {'action': 'connexion', 'email': 'claire@exemple.fr', 'password': 'nouveau-mdp-2026'}); check('compte effacé', s == 401, r)
s, r = admin.req('/admin.php?action=tableau')
check('workflows gardés, sans client', len(r.get('non_rattachees', [])) == 4 and all(c['id'] != 1 for c in r.get('clients', [])), r)

s, r = admin.req('/auth.php', {'action': 'deconnexion'}); check('déconnexion', r.get('ok'), r)
s, r = admin.req('/admin.php?action=tableau'); check('après déconnexion = 401', s == 401, r)

print(f'--- {ok} OK, {ko} échecs')
sys.exit(1 if ko else 0)
