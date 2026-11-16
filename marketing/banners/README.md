# Bannières Axion Studio

Style « le temps rendu » (charte v2, `docs/brand-guidelines.md`) : fond gris bleuté, polices Bricolage Grotesque et Hanken Grotesk, surligneur pour le temps gagné, semaine type hachurée. Régénérer : `node marketing/banners/generate.mjs` (Playwright requis, voir plus bas). Les polices viennent de `src/assets/fonts/`, les mêmes que le site.
Chaque visuel existe en taille exacte et en `@2x` (plus net sur les écrans haute définition, même proportion).

| Fichier | Où l'utiliser |
|---|---|
| `linkedin-profil-1584x396` | LinkedIn → ton profil → icône crayon de la bannière |
| `linkedin-page-1128x191` | LinkedIn → page entreprise Axion Studio → Modifier la page → Image de couverture |
| `linkedin-publication-article-1200x627` | Publication LinkedIn pour partager l'article « Combien coûte l'automatisation… » |
| `google-couverture-1024x576` | Google Business Profile → Photos → Photo de couverture |
| `google-logo-720x720` | Google Business Profile → Photos → Logo |
| `google-publication-audit-1200x900` | Google Business Profile → Ajouter une mise à jour / une offre |

Zones sûres respectées : sur le profil LinkedIn, la photo recouvre le coin inférieur gauche (rien d'important à
gauche de 440 px) ; la couverture Google est centrée car Google la recadre selon l'écran.

## À savoir avant de publier une bannière (16 nov. 2026)

- **PNG régénérés le 16 nov. 2026** : la publication d'audit affiche bien « Réponse sous 24 h ouvrées », comme le site.
  Pour les refaire, Playwright suffit, sans l'ajouter au site : dans un dossier à part, `npm i playwright`, puis
  `NODE_PATH=<ce dossier>/node_modules node marketing/banners/generate.mjs` depuis la racine du dépôt. Le script prend
  Chromium de Playwright s'il est installé (`npx playwright install chromium`), sinon Google Chrome.
- **« 2 h 15 »** est le total par défaut de la liste interactive de l'accueil (45 + 30 + 60 minutes) : une simulation,
  pas un résultat mesuré chez un client. La carte est donc titrée « Exemple de semaine : temps rendu », et la couverture
  Google, qui disait « en moyenne indicative », affiche à la place l'audit gratuit. À remplacer par un vrai chiffre dès
  qu'un client en aura donné un, avec son accord.
- **`linkedin-publication-article-1200x627.png`** porte le titre de l'article « Combien coûte l'automatisation » :
  il ne convient pas à un autre sujet. Il manque un visuel 1200x627 par article.
