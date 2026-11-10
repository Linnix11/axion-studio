# Plan SEO et IA (SIA) d'Axion Studio

Plan validé par l'utilisateur le 10 novembre 2026. L'avancement est tenu à jour dans la section « Avancement » en bas.

## Contexte

Axion Studio vend de l'automatisation et de l'IA aux TPE, PME et indépendants, partout en France.
L'objectif : apparaître quand un dirigeant cherche « automatiser mes devis », « consultant n8n »,
« automatisation comptabilité cabinet »… sur Google **et** quand il pose la question à ChatGPT,
Perplexity, Gemini ou aux réponses IA de Google.

**Ce qui est déjà solide** (à ne pas refaire) : pages pré-rendues lisibles sans JavaScript,
titres et descriptions maîtrisés (`src/seo.js`), données structurées (entreprise, services, FAQ,
articles), `llms.txt` et `llms-full.txt`, robots des IA autorisés, plan du site avec vraies dates,
IndexNow, ciblage « France » (`fr-FR`, hreflang, zone desservie), site rapide et accessible.

**Ce qui manque vraiment** :
1. Des réglages hors site jamais faits (Search Console, Bing, fiche Google, blocage des robots chez Hostinger).
2. Trop peu de contenu : 4 articles, aucune page par métier, alors que les gens cherchent par métier et par problème.
3. Aucune notoriété hors du site : pas d'annuaires, pas d'avis, pas de mentions. Or les IA citent
   surtout ce qu'elles voient répété sur plusieurs sources fiables.
4. Aucune mesure : impossible de savoir ce qui marche.

## Étape 1 — Débloquer (semaine 1, surtout vous, 2 h au total)

| Action | Pourquoi | Qui |
|---|---|---|
| hPanel Hostinger : assouplir la protection anti-robots (Bingbot reçoit 403, GPTBot 429) | **Priorité n°1 pour l'IA** : ChatGPT s'appuie sur Bing ; un site bloqué n'existe pas pour eux | Vous (je guide) |
| Google Search Console : ajouter le site, envoyer `sitemap.xml` | Voir les requêtes, forcer l'indexation | Vous (je guide) |
| Bing Webmaster Tools : importer depuis Search Console | Bing = ChatGPT, Copilot, DuckDuckGo | Vous |
| Fiche Google Business Profile (zone desservie : France / Île-de-France, catégorie « Consultant en informatique » ou « Service d'automatisation ») | Recherches « près de moi », réponses IA de Google | Vous, avec les bannières déjà prêtes |
| Mesure d'audience sans cookie (Hostinger Analytics ou Plausible) | Savoir d'où viennent les visites, y compris depuis ChatGPT/Perplexity | Moi après votre choix |

## Étape 2 — Pages par métier (semaines 1-2, moi)

Créer **6 pages « Automatisation pour … »**, une par cible, alignées sur la prospection n8n :
artisans du bâtiment (plombiers, électriciens, menuisiers), experts-comptables,
agences immobilières, boutiques en ligne, professions libérales / cabinets de conseil, restaurants et commerces.

Chaque page : le problème du métier en 2 phrases, 3 à 5 tâches automatisables concrètes (tirées de
`useCases` et des « pistes » du workflow), un exemple chiffré en ordre de grandeur, les outils du métier
(ex. Planity, Doctolib, Pennylane, logiciels de devis), une FAQ de 4 questions, l'appel à l'audit gratuit.

- **Réutiliser le modèle du blog** : données dans `src/data.js` (tableau `metiers`), entrées ajoutées
  à `pageMeta` comme les articles dans `src/seo.js` (ligne `...Object.fromEntries(posts.map(…))`), une page
  `src/pages/Metier.jsx` calquée sur `src/pages/Article.jsx`, une route `/automatisation/:slug` dans `src/App.jsx`.
  Le pré-rendu, le plan du site et `llms.txt` les prennent automatiquement (`paths = Object.keys(pageMeta)`).
- JSON-LD par page : `Service` (audience = le métier, zone = France) + `FAQPage` + fil d'Ariane, dans `schemaFor`.
- Liens : depuis l'accueil (« Ce que je fais »), Services, Exemples et le pied de page.
- Bonus prospection : l'e-mail du workflow 2 pointe vers la page du métier du prospect.

## Étape 3 — Contenu qui répond aux questions (2 articles par mois, moi + votre relecture)

Format pensé pour Google **et** pour être cité par les IA : réponse directe en 2-3 phrases en tête,
puis détails en listes, chiffres sourcés, auteur (Arthur), date de mise à jour, FAQ en fin d'article.

Calendrier proposé (12 sujets, par ordre de priorité) :
1. Facture électronique obligatoire 2026-2027 : ce qui change pour les TPE et comment l'automatiser (sujet chaud, forte demande)
2. Automatiser les relances de factures impayées sans braquer ses clients
3. Devis d'artisan : de la demande au devis prêt en 5 minutes
4. Prise de rendez-vous en ligne reliée à l'agenda et aux rappels SMS
5. Chatbot sur le site d'une TPE : utile ou gadget ?
6. RGPD et automatisation : ce qu'une TPE doit vérifier
7. Combien de temps une TPE perd-elle en tâches administratives ? (ordres de grandeur sourcés)
8. Expert-comptable : automatiser la collecte des justificatifs clients
9. Agence immobilière : qualifier automatiquement les contacts des portails
10. Boutique en ligne : stock, commandes et suivi client sans ressaisie
11. Lire ses factures fournisseurs avec l'IA : comment ça marche, quelles limites
12. Faire appel à un freelance en automatisation : questions à poser avant de signer

Chaque article renvoie vers 1 page métier et l'audit gratuit (maillage interne).

## Étape 4 — Notoriété et citations (en continu, surtout vous, 1 h par semaine)

Les IA recommandent les entreprises qu'elles voient **citées de façon cohérente** sur plusieurs sites.
- **Fiches cohérentes** (même nom, même description, même adresse, lien vers le site) : Google Business,
  LinkedIn (profil + page), Malt, Codeur.com, PagesJaunes, annuaire des experts n8n et des partenaires Make,
  CCI Val-d'Oise, annuaires locaux (mairie de Montlignon, réseaux d'entrepreneurs du 95).
- **Avis réels** : demander un avis Google à chaque client après le mois de suivi (jamais d'avis inventés).
- **LinkedIn** : un post par article (résumé + lien) ; un retour d'expérience par projet terminé.
- **Démos vidéo** courtes (YouTube/LinkedIn) : « une demande de devis traitée seule en 30 s ».
- **Interventions** : réponses utiles dans la communauté n8n francophone, groupes d'entrepreneurs ;
  un article invité ou un podcast par trimestre.
- Dans le site : ajouter `sameAs` (LinkedIn, Google Business, Malt…) au JSON-LD de l'entreprise
  et un logo PNG (les moteurs n'utilisent pas toujours le SVG) — `src/seo.js`.

## Étape 5 — Suivre et ajuster (chaque mois, 30 min)

- Search Console : requêtes qui montent, pages vues mais peu cliquées (retoucher titre/description).
- Liste de **20 questions types** (« quel consultant pour automatiser mes devis dans le Val-d'Oise ? »,
  « n8n ou Make pour une TPE ? »…) posées chaque mois à ChatGPT, Perplexity, Gemini et Google :
  noter si Axion Studio est cité. Je peux préparer la liste et un tableau de suivi.
- Visites venant de chatgpt.com / perplexity.ai dans la mesure d'audience.

## Ce que je fais dans le dépôt (après votre accord)

1. Pages métier (étape 2) : `src/data.js`, `src/seo.js`, `src/pages/Metier.jsx`, `src/App.jsx`, liens dans `Home.jsx`, `Services.jsx`, `Footer.jsx`.
2. `sameAs`, logo PNG, auteur et dates de mise à jour dans le JSON-LD (`src/seo.js`, `public/`).
3. Premiers articles du calendrier (`src/blog.js`), 2 par mois.
4. Lien page métier dans le workflow n8n 2 (`automatisations/n8n/`).
5. Mise à jour de `docs/HANDOFF.md` (§ 8 SEO) avec ce plan et l'avancement.

Règles qui restent valables : textes en français avec espaces insécables (le build avertit), pas de chiffres
inventés (ordres de grandeur), pas de faux avis, titres ≤ 60 caractères, descriptions ≤ 160.

## Vérification

- `npm run build` : nouvelles pages pré-rendues, présentes dans `sitemap.xml` et `llms.txt`, aucun avertissement typographique.
- JSON-LD valide (test des résultats enrichis de Google sur 2 pages métier), titres et descriptions dans les limites.
- Contrôle en ligne après publication (mobile, sombre, pas d'erreur), puis inspection d'URL dans Search Console.
- Sous 4 à 8 semaines : premières impressions des pages métier dans Search Console ; tableau des 20 questions IA mis à jour.

## Avancement

- [x] Étape 2 : 6 pages « Automatisation pour … » (`/automatisation/<slug>`), contenu dans `src/data.js` (`metiers`), page `src/pages/Metier.jsx`, JSON-LD `Service` + `FAQPage` + fil d'Ariane, liens depuis l'accueil, Services et le pied de page, présentes dans `sitemap.xml`, `llms.txt` et `llms-full.txt` (10 nov. 2026).
- [x] Logo PNG (`public/logo.png`) dans le JSON-LD ; champ `company.profils` prêt pour `sameAs` (vide tant que les profils n'existent pas).
- [x] Workflow n8n 2 : l'e-mail contient le lien vers la page du métier du prospect (code d'activité → page).
- [ ] Étape 1 : Search Console, Bing Webmaster Tools, anti-robots Hostinger, fiche Google Business, mesure d'audience (utilisateur).
- [ ] Étape 3 : articles du calendrier, 2 par mois (prochain : facture électronique 2026-2027).
- [ ] Étape 4 : fiches dans les annuaires, avis réels, LinkedIn ; ajouter chaque profil créé dans `company.profils`.
- [ ] Étape 5 : liste des 20 questions IA et tableau de suivi mensuel.
