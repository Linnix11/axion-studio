# Espace client (CRM) relié à n8n

Quand un client signe, vous le créez dans l'administration : il reçoit un e-mail avec l'adresse de son espace,
son identifiant (son adresse e-mail) et un lien pour choisir son mot de passe. Dans son espace, il voit ses
automatisations, leur état (active, en erreur, en pause), la dernière exécution et l'activité sur 7 jours.
Ces informations viennent de votre n8n, qui les envoie au site toutes les 15 minutes.

- Espace client : https://axionstudio.fr/espace-client/
- Administration : https://axionstudio.fr/espace-client/admin/ (votre compte uniquement)

Aucun mot de passe ne circule par e-mail : le client choisit le sien grâce à un lien valable 7 jours, utilisable une fois.

## Mise en route (une seule fois)

### 1. Le jeton secret, sur Hostinger

1. Générez un jeton dans le Terminal du Mac :

   ```bash
   openssl rand -hex 32
   ```

2. hPanel → Gestionnaire de fichiers → dossier `domains/axionstudio.fr/` → ouvrez `axion-config.php`
   (le fichier qui contient déjà la clé Gemini) et ajoutez la ligne `crm_n8n_token` :

   ```php
   <?php return [
     'gemini_api_key' => '…votre clé actuelle…',
     'crm_n8n_token'  => 'collez-ici-le-jeton-généré',
   ];
   ```

   Gardez ce jeton : il sert aussi à l'étape 3. Ne le mettez jamais dans le dépôt GitHub.

La base de données est créée toute seule au premier usage : `domains/axionstudio.fr/axion-crm.sqlite`, à côté
d'`axion-config.php`, hors du dossier public (elle n'est donc pas effacée à chaque publication). Pensez à la
télécharger de temps en temps (sauvegarde). Elle demande l'extension PHP `pdo_sqlite`, active par défaut chez Hostinger ;
si l'espace client affiche « momentanément indisponible », vérifiez-la dans hPanel → Avancé → Configuration PHP → Extensions.

### 2. Votre compte administrateur

1. Ouvrez https://axionstudio.fr/espace-client/
2. Cliquez sur « Mot de passe oublié ou première connexion » et indiquez arthur.champagne@icloud.com.
3. Ouvrez le lien reçu (pensez aux indésirables), choisissez votre mot de passe : vous arrivez dans l'administration.

Seule cette adresse peut devenir administrateur (réglage `crm_admin_email` d'`axion-config.php` pour en changer).

### 3. Le workflow n8n de suivi

Dans votre n8n (sur le Mac, http://localhost:5678) :

1. **Clé d'API n8n** : Settings → n8n API → Create an API key. Copiez-la.
2. **Deux accès** (Credentials → Add credential → « Header Auth ») :
   - « n8n API » : Name `X-N8N-API-KEY`, Value = la clé de l'étape 1 ;
   - « Espace client Axion » : Name `X-Axion-Token`, Value = le jeton d'`axion-config.php`.
3. **Importer** : Workflows → Import from URL →
   `https://raw.githubusercontent.com/Linnix11/axion-studio/main/automatisations/n8n/axion-3-suivi-clients.json`
4. Dans le workflow importé, choisissez l'accès sur les trois nœuds HTTP :
   « n8n API » pour « Lister les workflows » et « Lire les exécutions (7 jours) »,
   « Espace client Axion » pour « Envoyer à l'espace client ».
5. Lancez-le une fois (« Execute workflow ») : dans l'administration, la case « Synchro n8n » doit afficher « à l'instant ».
6. Activez-le. Il tourne toutes les 15 minutes, tant que n8n tourne sur le Mac.

Si le Mac est éteint, les statuts ne bougent plus : l'administration affiche alors l'heure de la dernière synchro en rouge
(au-delà d'une heure), et le client voit « État mis à jour il y a … ».

## Au quotidien

**Un contrat est signé** : Administration → « Nouveau client » → entreprise, contact, e-mail, formule, suivi →
« Créer et envoyer l'accès ». La fiche indique son étiquette n8n, par exemple `client-boulangerie-martin`.

**Relier ses automatisations** : dans n8n, ajoutez cette étiquette (Tags) à chaque workflow de ce client.
Ils apparaissent dans son espace à la synchro suivante. Dans sa fiche, vous pouvez :
- écrire une description simple pour le client (ce que fait l'automatisation pour lui) ;
- masquer un workflow technique (case « Visible par le client ») ;
- rattacher à la main un workflow sans étiquette.

**Autres actions de la fiche** : renvoyer l'e-mail d'accès (l'ancien lien cesse de marcher), suspendre ou rétablir
l'accès, modifier la fiche, supprimer le client (fin de contrat ou demande RGPD : fiche, compte et liens effacés,
les workflows restent dans « Workflows sans client »).

**Le client a oublié son mot de passe** : il clique sur « Mot de passe oublié » et reçoit un lien valable 48 heures.

**Créer un client depuis n8n** (facultatif, par exemple après une signature électronique) : requête POST vers
`https://axionstudio.fr/api/crm/n8n.php`, accès « Espace client Axion », corps JSON
`{"action":"nouveau-client","entreprise":"…","contact":"…","email":"…","formule":"…","suivi":true}`.

## Fonctionnement technique

| Élément | Fichier |
|---|---|
| Pages (React, chargées à part) | `src/pages/EspaceClient.jsx`, `src/pages/EspaceAdmin.jsx`, `src/espace/` |
| API PHP | `public/api/crm/` : `auth.php` (connexion, liens), `client.php` (tableau de bord), `admin.php`, `n8n.php` (synchro, jeton) |
| Socle (base, session, e-mails) | `public/api/crm/_crm.php` (bloqué depuis le web par `.htaccess`) |
| Workflow n8n | `automatisations/n8n/axion-3-suivi-clients.json`, généré par `source/build_suivi.py` depuis `source/suivi.cjs` (testé par `suivi.test.cjs`) |
| Tests de l'API | `scripts/test-espace-client.py` |

Sécurité : mots de passe chiffrés (`password_hash`), liens à usage unique stockés sous forme d'empreinte, cookie de session
`HttpOnly`, `Secure`, `SameSite=Strict` (posé seulement à la connexion), en-tête `X-Requested-With: axion` exigé sur toute
modification, limites de tentatives (connexion, liens, jeton n8n), réponse identique à « mot de passe oublié » que le compte
existe ou non. Pages non indexées (`noindex`, `Disallow: /espace-client/`). Les e-mails partent par `mail()` de Hostinger,
comme le formulaire de contact (expéditeur `ne-pas-repondre@axionstudio.fr`, réponse vers votre adresse).

### Tester en local

```bash
brew install php
```

Puis, à la racine du dépôt (dans un premier Terminal) :

```bash
mkdir -p /tmp/crm-test && CRM_DB=/tmp/crm-test/crm.sqlite CRM_MAIL_LOG=/tmp/crm-test/mails.txt CRM_SITE_URL=http://localhost:8099 CRM_N8N_TOKEN=test-token-0123456789abcdef0123456789abcdef php -S 127.0.0.1:8099 -t public
```

Dans un second Terminal (base neuve à chaque essai) :

```bash
CRM_TEST_DIR=/tmp/crm-test python3 scripts/test-espace-client.py
```

Les e-mails ne partent pas : ils sont écrits dans `/tmp/crm-test/mails.txt`. Pour voir les pages : `npm run build && npx vite preview`
(l'aperçu relaie `/api` vers le serveur PHP de test), puis http://localhost:4173/espace-client/.
