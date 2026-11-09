# Prospection Axion Studio avec n8n

Deux workflows qui travaillent sur la même feuille Google Sheets :

1. **Collecte de prospects** (`axion-1-collecte-prospects.json`), lancé à la main.
   Plusieurs métiers et départements en un seul lancement → annuaire officiel des entreprises (SIRENE) →
   site et téléphone via Google → **outils repérés sur le site** (WordPress, Wix, Shopify, Calendly, Planity,
   Doctolib, HubSpot, Brevo, WhatsApp, formulaire…) et 1 ou 2 pistes d'automatisation → e-mail générique
   trouvé sur le site (accueil, puis page contact) → une ligne par entreprise dans la feuille.
2. **Envoi des e-mails** (`axion-2-envoi-emails.json`), chaque jour ouvré à 9 h 40.
   20 prospects « nouveau » au maximum → accroche rédigée par Gemini à partir du métier, des outils repérés et des pistes →
   e-mail en texte simple depuis votre adresse iCloud → statut « envoyé » dans la feuille →
   pause de 2 à 4 minutes avant le suivant.

## 1. La feuille Google Sheets

1. Créez une feuille Google Sheets, par exemple « Prospects Axion ».
2. Fichier → Importer → `feuille-prospects-en-tetes.csv` → « Remplacer la feuille actuelle ».
3. Le nom de l'onglet n'a pas d'importance : les workflows utilisent toujours le **premier onglet** de la feuille.
4. Partagez la feuille en **Éditeur** avec le compte Google branché dans n8n (pour un compte de service, son adresse
   en `…iam.gserviceaccount.com`), puis collez l'adresse de la feuille dans chaque nœud Google Sheets des deux workflows,
   ou laissez le script le faire : `FEUILLE="https://docs.google.com/spreadsheets/d/…" node mettre-a-jour.mjs`.

Colonne **statut** : `nouveau` (à contacter), `sans e-mail`, `envoyé`, `erreur d'envoi`, `désinscrit`.
Vous pouvez la modifier à la main ; seules les lignes `nouveau` reçoivent un e-mail.

### Choisir les métiers et les départements

Dans le nœud « Critères de recherche » du workflow 1 :
- **metiers** : une ligne par métier, au format `code d'activité = métier en mots`, par exemple
  `43.22A = plombiers et chauffagistes`. Le métier en mots est repris dans l'e-mail. Codes utiles : 43.22A plomberie,
  43.21A électricité, 43.32A menuiserie, 69.20Z experts-comptables, 56.10A restaurants, 96.02A coiffure, 47.71Z vêtements.
- **departements** : séparés par des virgules, par exemple `95, 78, 92`.
- **pages** : 25 entreprises par page, pour chaque métier et chaque département.
- **max_entreprises** : plafond par lancement (80 par défaut), pour maîtriser le coût de Google Places.

### Mettre à jour une installation existante

**En une commande (recommandé)** : le script `mettre-a-jour.mjs` remplace les deux workflows dans votre n8n
en gardant vos accès et l'adresse de votre feuille.

1. Dans n8n : Settings → n8n API → Create an API key. Copiez la clé.
2. Ouvrez le Terminal sur l'ordinateur où tourne n8n et collez :
   ```bash
   curl -fsSL https://raw.githubusercontent.com/Linnix11/axion-studio/main/automatisations/n8n/mettre-a-jour.mjs -o mettre-a-jour.mjs && node mettre-a-jour.mjs
   ```
   Collez la clé quand elle est demandée. Le script affiche « mis à jour » pour chaque workflow.
3. Dans la feuille, ajoutez deux colonnes à la fin de la ligne 1 : `outils` et `pistes`.

**À la main** : ajoutez les colonnes `outils` et `pistes`, réimportez les deux workflows (Import from URL),
choisissez vos accès et collez l'adresse de la feuille, puis supprimez les anciens pour éviter les envois en double.

## 2. Les accès à créer dans n8n (Credentials)

| Nom dans le workflow | Type n8n | Ce qu'il faut |
|---|---|---|
| Google Sheets (à connecter) | Google Sheets OAuth2 API | Se connecter avec votre compte Google |
| Google Places (clé d'API) | Header Auth | Nom : `X-Goog-Api-Key`, valeur : une clé Google Cloud avec « Places API (New) » activée |
| Google Gemini (clé d'API) | Google Gemini (PaLM) API | La même clé Gemini que le chatbot du site convient |
| iCloud SMTP (mot de passe d'app) | SMTP | Hôte `smtp.mail.me.com`, port `587`, SSL/TLS désactivé (STARTTLS), utilisateur `arthur.champagne@icloud.com`, mot de passe : un **mot de passe pour app** créé sur account.apple.com (pas votre mot de passe Apple) |

Après l'import, ouvrez chaque nœud marqué d'un triangle et choisissez l'accès correspondant.

## 3. Premier essai

1. Workflow 1 : dans « Critères de recherche », gardez `pages = 1` (25 entreprises) et cliquez sur
   « Test workflow ». Vérifiez les lignes ajoutées dans la feuille, en particulier la colonne
   `nom_google` : si Google a renvoyé une autre entreprise, effacez l'e-mail de cette ligne.
2. Workflow 2 : dans la feuille, mettez **votre propre adresse** dans la colonne `email` d'une ligne
   `nouveau`, passez toutes les autres lignes en `test`, puis cliquez sur « Tester maintenant ».
   Relisez l'e-mail reçu.
3. Remettez les autres lignes en `nouveau`, puis activez le workflow 2 (interrupteur « Active »).

## 4. Coûts

- Annuaire de l'État : gratuit.
- Google Places : quota gratuit mensuel, puis environ 3 à 4 centimes par entreprise cherchée
  (les champs site et téléphone sont facturés au tarif « Enterprise »). 25 entreprises par page.
- Gemini : quelques centimes pour 20 e-mails.

## 5. Règles à respecter (prospection B2B, CNIL)

Les workflows appliquent déjà :
- les entreprises qui ont refusé la prospection commerciale dans l'annuaire SIRENE sont écartées ;
- l'e-mail dit qui écrit, d'où vient l'adresse, et comment ne plus être contacté (répondre « STOP ») ;
- 20 e-mails par jour au maximum, espacés de 2 à 4 minutes.

À faire de votre côté :
- **Quand quelqu'un répond « STOP »**, passez sa ligne en `désinscrit` le jour même, et ne la
  supprimez pas : elle empêche aussi que l'entreprise soit recollectée.
- Le message doit rester en rapport avec le métier de la personne (c'est le cas : automatisation
  de leurs tâches administratives).
- Ne gardez pas les lignes plus de 3 ans après le dernier contact sans réponse.
- Les entrepreneurs individuels (artisans en nom propre) sont des personnes physiques :
  écrivez uniquement à une adresse professionnelle publiée sur leur site, jamais à une adresse
  trouvée ailleurs.

## 6. Limites connues

- Google Places renvoie parfois une entreprise voisine au nom proche : la colonne `nom_google`
  sert à le repérer.
- Les outils sont repérés sur la page d'accueil seulement, d'après les traces visibles dans son code :
  un outil utilisé en interne (logiciel de facturation, tableur…) ne se voit pas. Les pistes sont des hypothèses à confirmer à l'audit.
- Certains sites n'affichent l'e-mail qu'en image ou via un formulaire : la ligne reste « sans e-mail ».
  Le téléphone est souvent rempli quand même.
- Les sites construits entièrement en JavaScript peuvent ne rien montrer à n8n.
- Pas de relance automatique : à ajouter plus tard si le premier envoi donne de bons résultats.
