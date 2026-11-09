# Prospection Axion Studio avec n8n

Deux workflows qui travaillent sur la même feuille Google Sheets :

1. **Collecte de prospects** (`axion-1-collecte-prospects.json`), lancé à la main.
   Annuaire officiel des entreprises (SIRENE) → site et téléphone via Google → e-mail générique
   trouvé sur le site (accueil, puis page contact) → une ligne par entreprise dans la feuille.
2. **Envoi des e-mails** (`axion-2-envoi-emails.json`), chaque jour ouvré à 9 h 40.
   20 prospects « nouveau » au maximum → accroche rédigée par Gemini pour leur métier →
   e-mail en texte simple depuis votre adresse iCloud → statut « envoyé » dans la feuille →
   pause de 2 à 4 minutes avant le suivant.

## 1. La feuille Google Sheets

1. Créez une feuille Google Sheets, par exemple « Prospects Axion ».
2. Fichier → Importer → `feuille-prospects-en-tetes.csv` → « Remplacer la feuille actuelle ».
3. **Renommez ensuite l'onglet du bas en `Prospects`** (exactement, avec la majuscule) : double-clic sur l'onglet.
   L'import lui donne le nom du fichier, et n8n répondrait « Sheet with name Prospects not found ».
4. Copiez l'adresse de la feuille. Dans chaque nœud Google Sheets des deux workflows
   (« Lire… », « Enregistrer… », « Marquer… »), collez-la à la place de
   `COLLER_ICI_L_ADRESSE_DE_VOTRE_GOOGLE_SHEET`.

Colonne **statut** : `nouveau` (à contacter), `sans e-mail`, `envoyé`, `erreur d'envoi`, `désinscrit`.
Vous pouvez la modifier à la main ; seules les lignes `nouveau` reçoivent un e-mail.

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
- Certains sites n'affichent l'e-mail qu'en image ou via un formulaire : la ligne reste « sans e-mail ».
  Le téléphone est souvent rempli quand même.
- Les sites construits entièrement en JavaScript peuvent ne rien montrer à n8n.
- Pas de relance automatique : à ajouter plus tard si le premier envoi donne de bons résultats.
