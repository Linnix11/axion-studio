# Axion Studio : récapitulatif du projet (passation)

À donner tel quel à un nouvel assistant. Il décrit tout ce qui a été fait, comment le projet marche
et les règles à respecter. Dernière mise à jour : 9 novembre 2026.

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
  data.js        contenus : entreprise, menu, services, offres, FAQ, garanties, etc.
  blog.js        4 articles (blocs h2/p/ul/ol/note, seoTitle/seoDescription)
  legal.js       CGV (réglages en haut : acompte 30 %, paiement 30 j, etc.)
  chatbot.js     règles et textes de l'assistant IA (geminiFreeTier = true)
  seo.js         titres, descriptions, données structurées JSON-LD par page
  prefs.js       préférences d'affichage (thème, accessibilité)
  index.css      jetons de design, thèmes sombre et contraste, animations
  pages/         Home, Services, Exemples, Methode, Tarifs, APropos, Faq, Contact,
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
marketing/banners/               bannières LinkedIn et Google, style « le temps rendu » (PNG + @2x + HTML + generate.mjs)
automatisations/n8n/             workflows n8n de prospection (collecte SIRENE + Google, envoi d'e-mails personnalisés), mode d'emploi dans README.md
.claude/skills/                  skills installés (voir § 9)
```

## 4. Contenu et offre

- Pages : Accueil, Services, Exemples, Méthode, Tarifs, À propos, FAQ, Contact, Sécurité, Blog (4 articles), CGV, Mentions légales, Confidentialité, 404.
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
- Côté navigateur, la validation se fait à la sortie de chaque champ, et un résumé des erreurs s'affiche (`role=alert`).

## 8. SEO et référencement dans les IA

- `src/seo.js` : titres de 60 caractères maximum, descriptions de 160 caractères maximum. JSON-LD : ProfessionalService, Person, WebSite, BreadcrumbList, Service, OfferCatalog, FAQPage, Blog, BlogPosting.
- `sitemap.xml` (date `lastmod` seulement sur les articles, leur vraie date de publication), `robots.txt` (robots des IA autorisés), `llms.txt`, `llms-full.txt` et `og.png` sont générés au build.
- IndexNow est automatisé par GitHub Actions, seulement quand les textes changent (un changement de style ne déclenche rien).
- DNS (via l'API Hostinger, avec l'accord de l'utilisateur) : SPF `v=spf1 ip4:92.113.28.5 include:_spf.mail.hostinger.com ~all` et DMARC `v=DMARC1; p=none; rua=mailto:arthur.champagne@icloud.com`.
- Problème connu non résolu : la protection anti-robots de Hostinger renvoie parfois 403 à Bingbot et 429 à GPTBot. Cela se règle dans le hPanel, par l'utilisateur.

## 8 bis. Prospection avec n8n (`automatisations/n8n/`)

- `axion-1-collecte-prospects.json` (lancé à la main) : API publique « Recherche d'entreprises » (SIRENE, gratuite) → les entreprises avec `opposition_diffusion_commerciale` ou déjà présentes sont écartées → Google Places (site, téléphone) → e-mail générique trouvé sur la page d'accueil puis la page contact → feuille Google Sheets « Prospects ».
- `axion-2-envoi-emails.json` (jours ouvrés, 9 h 40) : 20 lignes « nouveau » au maximum → objet et accroche rédigés par Gemini → e-mail texte depuis arthur.champagne@icloud.com (SMTP iCloud, mot de passe pour app) → statut « envoyé » ou « erreur d'envoi » → pause de 2 à 4 min.
- `README.md` : mise en route, accès à créer, coûts, règles CNIL. Les réponses « STOP » se traitent à la main (statut « désinscrit »).
- Le n8n de l'utilisateur tourne **sur son ordinateur** : une session cloud ne peut pas l'atteindre. Il importe les workflows lui-même par « Import from URL » avec les adresses `https://raw.githubusercontent.com/Linnix11/axion-studio/main/automatisations/n8n/<fichier>.json`.
- Pièges vus en les construisant : dans un nœud Code n8n, `URL` n'existe pas (utiliser des expressions régulières) ; l'import en ligne de commande (`n8n import:workflow`) exige `active`, `id` et `versionId`, pas l'import par l'interface ; dans le conteneur cloud, les requêtes HTTP de n8n ne passent pas le proxy, donc tester avec un petit serveur local et des données enregistrées.
- Les workflows ont été testés en exécution réelle dans n8n 1.123 (Google Sheets, Places, Gemini et SMTP simulés) ; les vrais accès n'ont pas encore été essayés.

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
- [ ] Créer la fiche Google Business Profile. Les visuels sont prêts dans `marketing/banners/` (nouveau style).
- [ ] Mettre à jour le profil et la page LinkedIn avec les nouvelles bannières (`marketing/banners/README.md` dit où mettre chacune).
- [ ] Renseigner le SIRET dès qu'il est attribué (`src/data.js`).
- [ ] Faire relire les CGV.
- [ ] Recueillir de vrais avis clients avant d'en afficher.
- [ ] Gemini : la facturation étant active, passer `geminiFreeTier` à `false` dans `src/chatbot.js` si l'avis « version gratuite » ne doit plus s'afficher (l'assistant peut le faire).
- [ ] Prospection n8n : importer les deux workflows par URL, créer la feuille Google « Prospects » (en-têtes dans `automatisations/n8n/feuille-prospects-en-tetes.csv`), créer les 4 accès (Google Sheets, clé Google Places, clé Gemini, mot de passe pour app iCloud), faire un essai sur sa propre adresse, puis activer l'envoi.
- [ ] Supprimer la branche `gh-pages` sur GitHub (ancienne copie du site).

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
