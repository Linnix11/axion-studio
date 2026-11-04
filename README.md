# Site vitrine — Axion Studio

Site vitrine de la micro-entreprise **axionstudio** (Arthur Champagne-Forterre, EI) :
automatisation des processus, IA pour entreprises, création de sites web.

Stack : **React 19 + Vite + Tailwind CSS v4**.

## Lancer le projet

```bash
npm install
npm run dev      # serveur de développement (http://localhost:5173)
npm run build    # génère le site statique dans dist/
npm run preview  # prévisualise le build
```

Le site est en ligne sur https://axionstudio.fr et se met à jour à chaque envoi sur `main`.

## Pages
Accueil, Services, Exemples, Méthode, Tarifs, À propos, FAQ, Contact, Mentions légales, Confidentialité
(et une page 404). Navigation avec React Router ; `npm run build` génère un fichier HTML par page
(`scripts/prerender-routes.mjs`) pour que les liens directs fonctionnent sur un hébergement statique.

## Structure
- `src/data.js` — **toutes les infos et tous les textes** : entreprise, services, exemples, étapes, tarifs, FAQ.
- `src/routes.js` — liste des pages (à compléter si vous ajoutez une page).
- `src/pages/` — une page par fichier.
- `src/components/` — en-tête, pied de page, formulaire, liste interactive, éléments communs (`ui.jsx`).
- `src/index.css` — couleurs du thème (clair et sombre).

## Hébergement
- **https://axionstudio.fr** : hébergement Hostinger relié à ce dépôt, mis à jour à chaque envoi sur `main`.

## À compléter avant la mise en ligne
- **SIRET** : remplacer « En cours d'attribution » dans `src/data.js` dès réception de l'avis INSEE.
- **Adresse** : seule la commune est affichée. La loi (LCEN) demande l'adresse de l'éditeur ;
  ajoutez-la ou utilisez une domiciliation si vous ne voulez pas publier votre adresse personnelle.

## Formulaire de contact
`public/api/contact.php` (exécuté par Hostinger) envoie chaque demande par e-mail à l'adresse `TO_EMAIL`,
avec l'adresse du visiteur en « Répondre à ». Expéditeur : `contact@axionstudio.fr` ; créez cette boîte dans
Hostinger (E-mails) pour que les messages n'arrivent pas en indésirables. Limite : 5 envois par heure et par adresse IP.

## Blog
Articles dans `src/blog.js` (mode d'emploi en tête du fichier). Chaque article ajouté apparaît automatiquement
sur `/blog`, a sa propre page pré-rendue, ses données structurées « BlogPosting », et figure dans le plan du site
et dans `llms.txt` / `llms-full.txt`.

## Référencement (SEO) et référencement dans les IA
- `npm run build` **pré-rend chaque page en HTML complet** (`src/entry-server.jsx` + `scripts/prerender-routes.mjs`) :
  tout le texte est lisible par Google, Bing et les robots des IA sans exécuter de JavaScript ; React prend
  ensuite le relais dans le navigateur.
- Titres, descriptions et données structurées schema.org (entreprise, services, prix, FAQ, fil d'Ariane) : `src/seo.js`.
- Fichiers générés : `sitemap.xml`, `robots.txt` (robots des IA autorisés), `llms.txt` (résumé du site pour les IA)
  et `llms-full.txt` (contenu complet en texte), à partir de `src/data.js`.

## Assistant IA (Gemini)
- Bouton « Une question ? » en bas à droite (`src/components/ChatWidget.jsx`), relayé par `public/api/chat.php`.
- Comportement et consignes : `src/chatbot.js`. Le contenu de `src/data.js` lui est fourni automatiquement au build.
- **La clé d'API n'est pas dans le dépôt.** Créez le fichier `axion-config.php` au-dessus du dossier public du site
  (gestionnaire de fichiers Hostinger, dossier `domains/axionstudio.fr/`) :
  ```php
  <?php return ['gemini_api_key' => 'VOTRE_CLE'];
  ```
  Sans clé, l'assistant reste simplement masqué.
- Limites : 30 messages par heure et par visiteur, 400 par jour pour tout le site (constantes en tête de `chat.php`).
- Facturation Google activée ? Passez `geminiFreeTier` à `false` dans `src/chatbot.js` : les mentions
  « offre gratuite » disparaissent du chat et des pages Confidentialité et Sécurité.

## Thème et accessibilité
- Bouton lune/soleil (en-tête) : mode clair (par défaut) ou sombre.
- Bouton Accessibilité : taille du texte, contraste renforcé, police Atkinson Hyperlegible, espacement du texte,
  liens soulignés, arrêt des animations. Réglages gardés dans le navigateur du visiteur (`src/prefs.js`),
  appliqués dès le chargement par le script de `index.html`, styles en fin de `src/index.css`.
