# Axion Studio : récapitulatif du projet (passation)

À donner tel quel à un nouvel assistant. Il décrit tout ce qui a été fait, comment le projet marche
et les règles à respecter. Dernière mise à jour : 10 novembre 2026.

## 1. Le client et l'entreprise

- **Arthur Champagne-Forterre**, micro-entreprise **Axion Studio** : automatisation, intégration d'IA et sites web pour TPE, PME et indépendants.
- Adresse : 5 allée des Pommiers, 95680 Montlignon. Téléphone : 06 48 61 23 50.
- **Seul e-mail à utiliser : arthur.champagne@icloud.com.** Il n'existe pas de boîte contact@. Les e-mails du site partent de `ne-pas-repondre@axionstudio.fr` (expéditeur technique).
- SIRET : « En cours d'attribution » (à remplacer dans `src/data.js` dès qu'il est connu).
- L'utilisateur parle français et n'est pas développeur : il faut lui répondre en français simple et faire les choses à sa place quand c'est possible.

## 2. Où est le code, comment il est mis en ligne

- Dépôt : **https://github.com/Linnix11/axion-studio** (public), branche **`main`**.
- Site en ligne : **https://axionstudio.fr** (hébergé chez **Hostinger**).
- **Déploiement automatique** : chaque push sur `main` est reconstruit et publié par Hostinger en 1 à 3 minutes (souvent moins d'une minute). Il n'y a rien d'autre à faire. Pour un changement visible du site, montrer le résultat (captures) et attendre l'accord de l'utilisateur avant de pousser sur `main`.
- Vérifier une mise en ligne : comparer le nom du fichier `dist/assets/index-XXXX.css` du build local avec celui que sert `https://axionstudio.fr/`.
- L'ancienne copie GitHub Pages a été supprimée et ses réglages retirés du code (`BASE_PATH`, `basename`). Seule reste la branche `gh-pages` sur GitHub, que l'utilisateur peut supprimer.

## 3. Technique

- **React 19 + Vite 8 + Tailwind CSS v4** (jetons dans `@theme inline`), **react-router 8**.
- **Pré-rendu SSR au build** (bon pour le SEO) :
  `vite build && vite build --ssr src/entry-server.jsx --outDir dist-server && node scripts/prerender-routes.mjs`
  → 17 pages HTML, `404.html`, `sitemap.xml`, `robots.txt`, `llms.txt`, `llms-full.txt`.
  `main.jsx` utilise `hydrateRoot`. Tout ce qui lit `localStorage` ou `sessionStorage` se fait dans un `useEffect` pour que l'hydratation reste propre.
  Le pré-rendu **avertit** (sans bloquer) quand une espace normale précède `: ; ? ! »` dans une page : corriger avec une espace insécable (`\u00A0` avant « : », `\u202F` avant ; ? ! »).
  En local, `npx vite preview` sert la page d'accueil pour une adresse sans `/` final (`/tarifs`) : tester avec `/tarifs/`, sinon React affiche une fausse erreur d'hydratation (#418).
- Commandes : `npm install`, `npm run dev`, `npm run build`.

### Arborescence utile
```
src/
  data.js        contenus : entreprise (dont profils publics pour sameAs), menu, services, offres, FAQ, garanties, pages métier (metiers), etc.
  blog.js        4 articles (blocs h2/p/ul/ol/note, seoTitle/seoDescription)
  legal.js       CGV (réglages en haut : acompte 30 %, paiement 30 j, etc.)
  chatbot.js     règles et textes de l'assistant IA (geminiFreeTier = true)
  seo.js         titres, descriptions, données structurées JSON-LD par page
  prefs.js       préférences d'affichage (thème, accessibilité)
  index.css      jetons de design, thèmes sombre et contraste, animations
  pages/         Home, Services, Exemples, Methode, Tarifs, APropos, Faq, Contact, Metier (/automatisation/:slug),
                 Securite, Blog, Article, Cgv, MentionsLegales, Confidentialite, NotFound
  components/    ui.jsx (Container, Section, SectionHead, PageHeader, CtaBand, eyebrow, boutons, usePageMeta),
                 Header, Footer, DisplayTools (thème et accessibilité), ChatWidget,
                 ContactForm, TaskList (semaine type de l'accueil), Demo, Trust, Logo, Icons, useReveal
public/
  api/contact.php   envoi du formulaire (mail(), piège à robots, validation, limite de débit)
  api/chat.php      relais vers l'API Gemini pour le chatbot
  api/_common.php   IP du client, limite de débit (flock)
  .htaccess         404, www → domaine nu, en-têtes de sécurité, cache ; axion-config.php et _common.php refusés depuis le web
  a0c151f7f1797e02da7cf2971dc6be50.txt   clé IndexNow
scripts/            prerender-routes.mjs, indexnow.mjs
.github/workflows/indexnow.yml   signale les pages à Bing (IndexNow) 2 min après un push qui modifie les textes (data, blog, CGV, SEO, pages)
docs/brand-guidelines.md         charte de marque complète
docs/plan-seo-ia.md              plan SEO et IA validé (10 nov. 2026) et son avancement
docs/kit-profils.md              textes prêts à coller pour les fiches (Google Business, LinkedIn, Malt, annuaires) et étapes Search Console, Bing, Hostinger
marketing/banners/               bannières LinkedIn et Google, style « le temps rendu » (PNG + @2x + HTML + generate.mjs)
automatisations/n8n/             workflows n8n de prospection, mettre-a-jour.mjs, README.md ; source/ = générateur (build.py) et tests (*.test.cjs)
.claude/skills/                  skills installés (voir § 9)
```

## 4. Contenu et offre

- Pages : Accueil, Services, Exemples, Méthode, Tarifs, À propos, FAQ, Contact, Sécurité, Blog (5 articles), CGV, Mentions légales, Confidentialité, 404. Plus 6 pages « Automatisation pour … » par métier (artisans du bâtiment, experts-comptables, agences immobilières, boutiques en ligne, professions libérales, commerces et restaurants).
- **Prix** : Projet **à partir de 150 €** au forfait, prix exact sur devis ; Suivi **à partir de 250 €/mois**. Prestations réservées aux professionnels (la FAQ précise ce qui est possible pour les particuliers).
- Arguments : audit gratuit de 30 min, prix fixé avant de commencer, le client garde tout, un mois de suivi inclus.
- **Pas de photos. Pas de faux témoignages ni de chiffres inventés** (les gains sont présentés comme des ordres de grandeur).

## 5. Design

- Identité « **le temps rendu** » (depuis novembre 2026, remplace le cahier Seyès) : fond gris bleuté, cartes blanches arrondies, boutons en pilule, surligneur jaune pour le temps gagné, hachures pour ce qui est automatisé. Tout est détaillé dans `docs/brand-guidelines.md` (v2).
- Couleurs : bleu #2B5CE6, encre #14213D, surligneur #FFE45C, hachures #C3CDE0, vert #1D7A4B, fond de page #F3F5F9, cartes #FFFFFF, texte secondaire #56627D, bordures #D9E0EC, erreur #B42318.
- Polices hébergées sur le site : Bricolage Grotesque (titres, gros chiffres), Hanken Grotesk (textes et interface), Atkinson Hyperlegible (mode accessibilité). Les bannières de `marketing/banners/` utilisent les mêmes.
- **Thème clair par défaut**, avec un bouton thème sombre et un panneau d'accessibilité (taille du texte, contraste, police lisible, espacement, liens soulignés, animations réduites). Les réglages sont posés en attributs `data-*` sur `<html>` par un script en ligne dans `index.html`.
- Accueil : carte « Temps rendu chaque semaine » (`TaskList.jsx`) = semaine type du lundi au vendredi. Chaque tâche de `tasks` (`src/data.js`, champ `day` : 0 = lundi) est un bouton (`aria-pressed`) qui la marque automatisée (hachures + rature) et met à jour le total. Les blocs fixes (Chantier, Devis…) sont dans le composant, pas dans `data.js`, pour ne pas polluer les informations du chatbot.
- Animations d'apparition (`useReveal`), qui respectent `prefers-reduced-motion`.
- Ombres limitées à trois jetons (`shadow-card`, `shadow-float`, `shadow-overlay`) ; couleur du logo `--c-logo`. Boutons avec états survol, appui, focus (contour de 3 px) et désactivé.
- Audits réalisés à plusieurs reprises (UX, accessibilité, contraste, débordements, CLS, liens) : tout est au vert au dernier passage.

## 6. Chatbot IA (Gemini)

- Bulle de chat sur toutes les pages sauf `/contact`. Elle propose un bouton « Envoyer ma demande à Arthur » qui pré-remplit le formulaire.
- `public/api/chat.php` appelle **gemini-3.5-flash** (`thinkingLevel: low`), puis en secours gemini-3.5-flash-lite et gemini-flash-lite-latest. Limites : 30 messages par heure et par IP, 400 par jour.
- **La clé API Gemini n'est PAS dans le dépôt.** Elle se trouve sur Hostinger dans `domains/axionstudio.fr/axion-config.php`, en dehors de `public_html`, qui est effacé à chaque déploiement. Ne jamais la committer.
- La facturation Gemini a été activée par l'utilisateur. `geminiFreeTier` vaut encore `true` dans `src/chatbot.js` ; il faudra le passer à `false` si l'avis « version gratuite » ne doit plus s'afficher.
- Règles de l'assistant : parler d'Arthur à la 3e personne, ne pas inventer de chiffres, répondre brièvement, renvoyer vers les bonnes pages.

## 7. Formulaire de contact

- `public/api/contact.php` envoie la demande à arthur.champagne@icloud.com. Testé : l'utilisateur a bien reçu les e-mails.
- Téléphone facultatif (validé côté navigateur et dans `contact.php`, repris dans l'e-mail reçu).
- **Demande pré-remplie** : `preparerDemande(texte)` (`src/demande.js`) range le texte dans `sessionStorage` (`axion-contact-draft`) et prévient le formulaire, qui le reprend dans « Message ». Utilisé par le chatbot, le bouton « Parler de mes 2 h 15 » de la semaine type, les formules de Tarifs, les pages métier, les missions de Services, les cas d'Exemples et l'encadré au milieu des articles.

## 7 bis. Appels à l'action (audit business du 10 novembre 2026)

- Tous les boutons « Réserver un audit gratuit » passent par `AuditLink` (`src/components/ui.jsx`). **`company.rdv`** (`src/data.js`) : adresse de la page de réservation Google Agenda (« Planning de rendez-vous »). Vide pour l'instant : les boutons mènent au formulaire. Dès que l'utilisateur l'envoie, la coller là : tous les boutons et la page Contact (bloc « Choisir un créneau ») l'utilisent.
- **`company.delai`** : délai de réponse affiché partout (24 heures ouvrées, choix de l'utilisateur). Ne jamais l'écrire en dur.
- Mobile : bouton « Audit gratuit » dans l'en-tête à côté du menu (le nom « Axion Studio » est masqué sous 480 px pour laisser la place, logo seul ; bouton masqué sous 360 px). Formulaire avant les coordonnées sur la page Contact.
- Pas de mesure d'audience pour l'instant (choix de l'utilisateur).
- Liens internes toujours avec « / » final (`/contact/`, `/services/#…`), comme les adresses canoniques : sans lui, Hostinger répond par une redirection 301.
- Côté navigateur, la validation se fait à la sortie de chaque champ, et un résumé des erreurs s'affiche (`role=alert`).

## 8. SEO et référencement dans les IA

- `src/seo.js` : titres de 60 caractères maximum, descriptions de 160 caractères maximum. JSON-LD : ProfessionalService, Person, WebSite, BreadcrumbList, Service, OfferCatalog, FAQPage, Blog, BlogPosting.
- `sitemap.xml` (date `lastmod` seulement sur les articles, leur vraie date de publication), `robots.txt` (robots des IA autorisés), `llms.txt`, `llms-full.txt` et `og.png` sont générés au build.
- IndexNow est automatisé par GitHub Actions, seulement quand les textes changent (un changement de style ne déclenche rien).
- **Cible : la France entière** (ni seulement le Val-d'Oise, ni l'international). Signaux en place : titre de l'accueil « Automatisation IA pour TPE et PME en France », descriptions « partout en France », `lang="fr-FR"` et `hreflang="fr-FR"` sur la page elle-même (il n'existe pas d'autre version), `geo.region FR-95` (lu par Bing), JSON-LD avec `areaServed` France, coordonnées de Montlignon et `contactPoint` en français, `llms.txt` « clientèle en France, accompagnée en français ». Garder « France » dans le titre et la description de l'accueil lors de toute retouche.
- Google ne propose plus de réglage « pays ciblé » dans Search Console : le domaine en .fr et ces signaux suffisent. Pour des publicités Google (SEA), choisir la zone « France » dans la campagne.
- **Plan SEO et IA : `docs/plan-seo-ia.md`** (5 étapes, avancement en bas). Pages métier faites ; prochaines étapes côté site : 2 articles par mois selon le calendrier du plan, et remplir `company.profils` (`src/data.js`) à chaque profil public créé (LinkedIn, Google Business, Malt…), repris en `sameAs` dans le JSON-LD. Logo des données structurées : `public/logo.png`.
- DNS (via l'API Hostinger, avec l'accord de l'utilisateur) : SPF `v=spf1 ip4:92.113.28.5 include:_spf.mail.hostinger.com ~all` et DMARC `v=DMARC1; p=none; rua=mailto:arthur.champagne@icloud.com`.
- Problème connu non résolu : la protection anti-robots de Hostinger renvoie parfois 403 à Bingbot et 429 à GPTBot. Cela se règle dans le hPanel, par l'utilisateur.

## 8 bis. Prospection avec n8n (`automatisations/n8n/`)

- `axion-1-collecte-prospects.json` (lancé à la main) : plusieurs métiers (lignes « code NAF = métier ») et départements par lancement, plafond `max_entreprises` → API publique « Recherche d'entreprises » (SIRENE, gratuite) → les entreprises avec `opposition_diffusion_commerciale` ou déjà présentes sont écartées → Google Places (site, téléphone) → outils repérés sur la page d'accueil (CMS, prise de rendez-vous, boutique, formulaire, chat, e-mailing) et 1 ou 2 pistes d'automatisation (colonnes `outils`, `pistes`) → e-mail générique trouvé sur l'accueil puis la page contact → feuille Google Sheets « Prospects ».
- `axion-2-envoi-emails.json` (« Axion – 2. Brouillons des e-mails de prospection », jours ouvrés, 9 h 40) : **n'envoie rien**, à la demande de l'utilisateur. 20 lignes « nouveau » au maximum → objet et accroche rédigés par Gemini (métier, outils repérés, pistes ; ne citer que les outils listés) → brouillon déposé dans le dossier `Drafts` d'iCloud par le nœud communautaire `n8n-nodes-imap` (opération `createDraft`, accès IMAP standard de n8n, `imap.mail.me.com:993`, mot de passe pour app) → statut « brouillon » ou « erreur brouillon ». L'utilisateur relit et envoie depuis Mail.
- `README.md` : mise en route, accès à créer, coûts, règles CNIL. Les réponses « STOP » se traitent à la main (statut « désinscrit »).
- `mettre-a-jour.mjs` : met à jour les deux workflows dans le n8n de l'utilisateur par l'API publique n8n (`/api/v1`, en-tête `X-N8N-API-KEY`), en reprenant nœud par nœud ses accès et l'adresse de sa feuille ; crée le workflow s'il n'existe pas. Clé demandée au lancement (ou `N8N_API_KEY`), adresse `N8N_URL` (par défaut http://localhost:5678), source `AXION_SOURCE` (par défaut GitHub, ou un dossier local pour tester). Il ne touche pas à la feuille Google : les nouvelles colonnes s'ajoutent à la main.
- **Modifier les workflows** : jamais à la main dans les JSON. Éditer `automatisations/n8n/source/build.py` (ou `extract.cjs`, `outils.cjs`), lancer `python3 automatisations/n8n/source/build.py`, puis `for t in automatisations/n8n/source/*.test.cjs; do node $t; done`. La table code d'activité → page métier du workflow 2 est lue dans `src/data.js` (`metiers[].naf`) à la génération.
- Tester le script : lancer un n8n local avec `N8N_LISTEN_ADDRESS=127.0.0.1` (l'IPv6 n'est pas disponible dans le conteneur), créer le propriétaire (`POST /rest/owner/setup`), se connecter (`POST /rest/login`), créer une clé (`POST /rest/api-keys`, `rawApiKey` dans la réponse), créer de faux accès (l'accès Google Sheets OAuth exige `serverUrl`), installer les anciennes versions branchées dessus, lancer le script et vérifier nœuds, accès et feuille par `GET /api/v1/workflows/<id>`.
- Le n8n de l'utilisateur (version 2.7.5) tourne **sur son Mac**, à http://localhost:5678 : une session cloud ne peut pas l'atteindre, même si l'utilisateur pense le contraire. Pour agir dedans, il faut une session Claude qui tourne sur le Mac (application Claude, onglet Code, ou `claude` dans le Terminal) ou un dossier relié par Remote Control. Sinon, il importe les workflows lui-même par « Import from URL » avec les adresses `https://raw.githubusercontent.com/Linnix11/axion-studio/main/automatisations/n8n/<fichier>.json`.
- Pièges vus en les construisant : dans un nœud Code n8n, `URL` n'existe pas (utiliser des expressions régulières) ; l'import en ligne de commande (`n8n import:workflow`) exige `active`, `id` et `versionId`, pas l'import par l'interface ; dans le conteneur cloud, les requêtes HTTP de n8n ne passent pas le proxy, donc tester avec un petit serveur local et des données enregistrées ; ne jamais mettre d'accès fictif (`credentials` avec `id` vide) dans un workflow livré : n8n l'affiche comme choisi, aucun triangle n'alerte, et l'exécution échoue avec « Found credential with no ID » (arrivé chez l'utilisateur).
- Feuille Google : les workflows visent par défaut l'onglet `gid=0` (premier onglet d'une feuille créée à la main). Une feuille créée par import CSV a un autre numéro : il faut passer au script l'adresse copiée dans le navigateur (`FEUILLE=…#gid=…`), qu'il lit pour régler l'onglet. n8n y écrit avec un compte de service Google (`n8nauto@…iam.gserviceaccount.com`) qui doit être Éditeur de la feuille ; dans n8n, ses nœuds Google Sheets sont donc en `authentication: serviceAccount` (accès de type `googleApi`), et le script recopie ce réglage avec l'accès. Le connecteur Google Drive de Claude peut lire les feuilles et en créer (import CSV), pas modifier des cellules ni (sans accord) partager. Le 9 novembre, une nouvelle feuille « Prospects » vide aux 19 colonnes a été créée dans le Drive de l'utilisateur pour remplacer « Prospets » (colonnes incomplètes, 29 lignes sans site, lisible par lien).
- Les workflows ont été testés en exécution réelle dans n8n 1.123 (Google Sheets, Places, Gemini et SMTP simulés). L'utilisateur fait tourner n8n 2.7.5 : la collecte y fonctionne avec ses vrais accès (après avoir nommé l'onglet « Prospects » et partagé la feuille en Éditeur avec le compte Google branché dans n8n). L'envoi réel n'a pas encore été confirmé.

## 9. Skills installés (`.claude/skills/`)

- `design`, `brand`, `design-system`, `ui-styling`, `ui-ux-pro-max` (nextlevelbuilder/ui-ux-pro-max-skill, MIT). Ils ont servi au redesign, à la charte, aux bannières et à la revue UX.
- `ponytail`, `ponytail-review`, `ponytail-audit`, `ponytail-debt`, `ponytail-gain`, `ponytail-help` (DietrichGebert/ponytail @96608e0, MIT). Seuls les skills sont installés, pas les hooks du plugin.
- `.claude/settings.json` active le plugin `hostinger@claude-plugins-official`.
- Contrôle des jetons : `node .claude/skills/design-system/scripts/validate-tokens.cjs --dir src`. Il signale environ 40 « écarts » qui sont les définitions des jetons dans `src/index.css` : normal. Une couleur en dur dans un composant `.jsx` serait, elle, une vraie erreur.
- Contrôle de la charte : `node .claude/skills/brand/scripts/inject-brand-context.cjs --json`.
- Le script de recherche de `ui-ux-pro-max` modifie ses fichiers `__pycache__` : ne pas les committer (`git restore` avant le commit).

## 10. Règles à respecter

1. **Ne jamais committer ni afficher une clé API, un jeton ou un mot de passe** (Gemini, Hostinger…). Ne jamais saisir un mot de passe à la place de l'utilisateur.
2. Demander l'accord explicite de l'utilisateur avant toute modification DNS, toute modification des réglages Claude ou toute action difficile à annuler.
3. Utiliser uniquement l'adresse arthur.champagne@icloud.com.
4. Garder le thème clair par défaut, ne pas mettre de photos ni de témoignages inventés.
5. Avant chaque push, vérifier que `npm run build` passe. Pousser sur `main` en réessayant en cas d'erreur réseau, puis vérifier la mise en ligne.
6. Les CGV (`src/legal.js`) sont un modèle : elles doivent être relues par un juriste.
7. Tout nouveau texte suit la typographie française : espace insécable avant « : » et espace fine insécable avant ; ? ! », après « (le build avertit en cas d'oubli).
8. Prospection : respecter l'opposition SIRENE, 20 e-mails par jour au maximum, traiter les « STOP » le jour même, envoyer uniquement depuis arthur.champagne@icloud.com.

## 11. Reste à faire par l'utilisateur

- [ ] **Supprimer le jeton API Hostinger** utilisé pendant la session (hPanel → Profil → API). C'est le plus urgent.
- [ ] Google Search Console : ajouter le site et envoyer `https://axionstudio.fr/sitemap.xml`.
- [ ] Bing Webmaster Tools : ajouter le site (import possible depuis Search Console).
- [ ] hPanel : assouplir la protection anti-robots, qui bloque Bingbot et GPTBot.
- [ ] Créer la fiche Google Business Profile (zone desservie : France, ou Île-de-France pour les déplacements). Les visuels sont prêts dans `marketing/banners/` (nouveau style).
- [ ] Mettre à jour le profil et la page LinkedIn avec les nouvelles bannières (`marketing/banners/README.md` dit où mettre chacune).
- [ ] Renseigner le SIRET dès qu'il est attribué (`src/data.js`).
- [ ] Faire relire les CGV.
- [ ] Recueillir de vrais avis clients avant d'en afficher.
- [ ] Gemini : la facturation étant active, passer `geminiFreeTier` à `false` dans `src/chatbot.js` si l'avis « version gratuite » ne doit plus s'afficher (l'assistant peut le faire).
- [ ] Prospection n8n : sa version installée est la première (un seul métier, sans repérage des outils). Pour passer à la nouvelle : créer une clé d'API n8n et lancer `automatisations/n8n/mettre-a-jour.mjs` sur son Mac (commande dans le README ; garde ses accès et sa feuille, testé sur n8n 1.123), puis ajouter les colonnes `outils` et `pistes` à la fin de la ligne 1 de la feuille. Ensuite : un essai sur sa propre adresse, puis activer l'envoi.
- [ ] Supprimer la branche `gh-pages` sur GitHub (ancienne copie du site).
- [ ] Créer la page de réservation Google Agenda de l'audit gratuit (Agenda → Créer → Planning de rendez-vous, 30 min, Meet ou téléphone) et envoyer son adresse pour `company.rdv`.
- [ ] Plan SEO/IA, étape 1 (`docs/plan-seo-ia.md`) : Search Console, Bing Webmaster Tools, anti-robots Hostinger, fiche Google Business, choix d'une mesure d'audience sans cookie.
- [ ] Plan SEO/IA, étape 4 : fiches LinkedIn, Malt, Codeur.com, PagesJaunes, annuaires n8n/Make et CCI, avis Google réels ; envoyer chaque adresse de profil pour `company.profils`.

## 12. Historique résumé

1. Site vitrine créé à partir du document INPI, puis passé en React + Tailwind.
2. Mise en ligne sur GitHub et Hostinger (déploiement automatique), domaine axionstudio.fr.
3. Site multi-pages et refonte « cahier Seyès » pour inspirer confiance, animations, logo fourni par l'utilisateur.
4. Plusieurs audits UX et accessibilité, avec toutes les corrections appliquées.
5. Prix ajoutés (150 € pour un projet, 250 €/mois pour le suivi).
6. Chatbot Gemini : réglages, corrections de modèle et de quotas, amélioration des réponses.
7. Thèmes clair et sombre, panneau d'accessibilité, thème clair par défaut.
8. SEO et référencement IA, blog de 4 articles, audit complet du code et du déploiement, CGV.
9. DNS SPF et DMARC via l'API Hostinger, adresse ajoutée aux pages légales, IndexNow.
10. Installation des skills de design, bannières LinkedIn et Google, revue ui-ux-pro-max.
11. Réglage du design (jetons, états des boutons), charte `docs/brand-guidelines.md`.
12. Installation des skills Ponytail.
13. Revue ui-ux-pro-max et ponytail : bouton du chat rond sur mobile, garanties sur 2 colonnes, espaces insécables avant : ; ? ! » (règle à garder pour tout nouveau texte).
14. Refonte « le temps rendu » (piste C choisie parmi trois maquettes) : nouvelles polices, nouveaux jetons, fin du cahier Seyès.
15. Workflows n8n de prospection dans `automatisations/n8n/` : collecte de prospects (annuaire SIRENE, opposition à la prospection respectée) et envoi de 20 e-mails par jour personnalisés par Gemini. À configurer dans n8n (accès listés dans le README) ; les « STOP » se traitent à la main.
16. Audit ponytail du dépôt, puis corrections : dates réelles dans le plan du site, IndexNow limité aux changements de texte, avertissement typographique au build, restes GitHub Pages retirés, `_common.php` bloqué depuis le web, option inutile retirée de `SectionHead`.
17. Accueil : la carte du temps rendu devient une semaine type du lundi au vendredi, interactive, comme sur la maquette retenue.
18. Bannières LinkedIn et Google refaites dans le style « le temps rendu » ; polices Schibsted Grotesk et Source Serif 4 retirées du projet.
19. Prospection n8n, deuxième version : plusieurs métiers et départements par lancement, repérage des outils visibles sur le site des prospects et pistes d'automatisation reprises par Gemini dans l'e-mail. Mise en route chez l'utilisateur : onglet à nommer « Prospects » après l'import du CSV, feuille à partager en Éditeur avec le compte Google branché dans n8n.
20. SEO recentré sur la France entière (titre et descriptions, `fr-FR`, hreflang, données structurées, `llms.txt`).
21. Script `mettre-a-jour.mjs` : mise à jour des workflows n8n en une commande, testée sur un vrai serveur n8n (accès et feuille conservés, pas de doublon). L'utilisateur ne l'a pas encore lancé.
22. Workflow 2 en brouillons iCloud (rien n'est envoyé) ; workflow 1 : arrêt si Google Places refuse, entreprises jamais traitées par Google retentées et mises à jour par SIREN.
23. Plan SEO et IA validé (`docs/plan-seo-ia.md`) ; 6 pages métier, logo PNG et `sameAs` prêt ; lien vers la page métier dans les e-mails du workflow 2 ; générateur des workflows et tests rangés dans `automatisations/n8n/source/`.
24. Article « Facture électronique 2026-2027 » (calendrier vérifié sur les sites officiels) ; kit des fiches `docs/kit-profils.md` pour les actions que seul l'utilisateur peut faire (comptes Google, Bing, LinkedIn, annuaires).
25. Audit business (appels à l'action) et corrections : bouton d'audit visible sur mobile, boutons en milieu de page, demandes pré-remplies selon la page, téléphone facultatif, réponse sous 24 h ouvrées, réservation Google Agenda prête à brancher (`company.rdv`), liens internes avec « / » final.
