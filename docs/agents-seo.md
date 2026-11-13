# Agents de référencement (SEO et GEO)

25 agents Claude Code, rangés dans `.claude/agents/seo-*.md` et `.claude/agents/geo-*.md`.
Chacun a un rôle précis. Ils travaillent sur ce dépôt et préparent le travail ; c'est l'utilisateur
qui valide avant toute mise en ligne.

## Comment les utiliser

Dans une session Claude Code ouverte sur ce dossier (application Claude, onglet Code, ou `claude` dans le Terminal) :
- demander simplement : « utilise l'agent seo-redacteur-article pour écrire l'article sur le chatbot » ;
- ou commencer par le chef d'orchestre : « utilise l'agent seo-chef-orchestre pour choisir les actions de la semaine ».

Ils ne tournent pas seuls en arrière-plan. Pour un passage régulier (par exemple le rapport du lundi), créer une tâche
planifiée dans Claude Code ou un workflow n8n qui lance la commande.

## Règles communes (tous les agents les appliquent)

1. **Aucune manipulation** : jamais de faux clics, de fausses visites, de liens créés en masse, de fermes de liens,
   d'avis inventés, de contenu copié ou généré en masse sans relecture, de texte caché. Google les sanctionne et
   l'activité vend de la confiance.
2. **Aucun chiffre inventé** : ordres de grandeur seulement ; toute règle de droit ou donnée chiffrée est vérifiée
   sur une source officielle et citée.
3. **Rien n'est publié sans accord** : l'agent prépare sur une branche, lance `npm run build`, montre le résultat ;
   l'utilisateur dit « publie » avant tout push sur `main` (le site se met en ligne à chaque push).
4. **Typographie française** : espace insécable avant « : », espace fine insécable avant ; ? ! », après « (le build avertit).
5. **Limites** : titres de 60 caractères maximum (marque comprise), descriptions de 160 maximum ; liens internes avec « / » final.
6. **Pas de secret** : aucune clé d'API, aucun mot de passe dans le dépôt ni dans les réponses ; l'agent ne saisit jamais
   un mot de passe à la place de l'utilisateur.
7. **Adresses** : publique (site, profils, annuaires, demandes d'avis) contact@axionstudio.fr ; administration de l'espace client et prospection n8n : arthur.champagne@icloud.com.
8. **Les actions hors site** (Search Console, annuaires, LinkedIn, Google Business, avis) sont préparées par l'agent
   et faites par l'utilisateur, ou par Claude dans le navigateur avec son accord explicite à chaque fois.
9. **Tout le contexte est dans** `docs/HANDOFF.md` (fonctionnement du site), `docs/plan-seo-ia.md` (plan et avancement)
   et `docs/suivi-seo-ia.md` (relevés). L'agent les lit avant d'agir et met à jour l'avancement après.

## Les 25 agents

| Groupe | Agent | Rôle |
|---|---|---|
| Pilotage | seo-chef-orchestre | Choisit les 3 actions de la semaine et dit quel agent les fait |
| Pilotage | seo-rapport-mensuel | Compile Semrush, Search Console et citations IA dans le suivi |
| Technique | seo-audit-technique | Contrôle titres, descriptions, H1, canonicals, redirections, liens cassés |
| Technique | seo-donnees-structurees | Vérifie et complète le JSON-LD de chaque page |
| Technique | seo-maillage-interne | Mesure les liens reçus par page et propose les liens manquants |
| Technique | seo-indexation | Contrôle plan du site, robots.txt, accès des robots, IndexNow |
| Technique | seo-performance | Poids des pages, polices, images, stabilité de l'affichage |
| Mots-clés | seo-recherche-mots-cles | Associe chaque mot-clé à une page, à partir des exports fournis |
| Mots-clés | seo-titres-descriptions | Réécrit titres et descriptions des pages peu cliquées |
| Contenu | seo-calendrier-editorial | Tient le calendrier des articles et choisit le prochain sujet |
| Contenu | seo-redacteur-article | Écrit un article complet au format du blog, avec FAQ et sources |
| Contenu | seo-verificateur-faits | Vérifie chaque règle, date et chiffre d'un texte avant publication |
| Contenu | seo-pages-metier | Enrichit les 6 pages « Automatisation pour … » |
| Contenu | seo-nouveau-metier | Crée une nouvelle page métier quand un métier cible manque |
| Contenu | seo-mise-a-jour-contenu | Rafraîchit les articles anciens (règles, dates, liens) |
| GEO | geo-llms-txt | Tient à jour llms.txt, les réponses courtes et llms-full.txt |
| GEO | geo-reponses-directes | Réécrit les débuts de page en réponse directe, citable par les IA |
| GEO | geo-faq | Ajoute des FAQ à partir des vraies questions (Search Console, contacts) |
| GEO | geo-entite | Vérifie la cohérence de l'identité (nom, adresse, sameAs) partout |
| GEO | geo-suivi-citations | Pose les 20 questions aux IA et note les citations |
| Notoriété | seo-annuaires | Prépare les fiches pour les annuaires et plateformes |
| Notoriété | seo-linkedin | Prépare un post LinkedIn par article ou projet |
| Notoriété | seo-google-business | Prépare les publications de la fiche Google Business |
| Notoriété | seo-avis-clients | Prépare les demandes d'avis aux vrais clients |
| Notoriété | seo-partenariats | Repère des sites où proposer un article invité ou une interview |
