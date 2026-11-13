# Bannières Axion Studio

Style « le temps rendu » (charte v2, `docs/brand-guidelines.md`) : fond gris bleuté, polices Bricolage Grotesque et Hanken Grotesk, surligneur pour le temps gagné, semaine type hachurée. Régénérer : `node marketing/banners/generate.mjs`.
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

## À savoir avant de publier une bannière (13 nov. 2026)

- **Les PNG sont à régénérer.** `generate.mjs` annonçait « Réponse sous 48 h ouvrées » alors que le site annonce
  24 heures ouvrées (`company.delai`). Le script est corrigé, mais les PNG datent d'avant : ils affichent encore 48 h.
  Pour les refaire : `npm i -D playwright && npx playwright install chromium`, puis `node marketing/banners/generate.mjs`.
  En attendant, ne publiez pas `google-publication-audit-1200x900.png`.
- **« Temps rendu chaque semaine : 2 h 15 »** est le total par défaut de la liste interactive de l'accueil
  (3 tâches cochées : 45 + 30 + 60 minutes). C'est une simulation, pas un résultat mesuré chez un client.
  Sur le site, le visiteur coche lui-même ses tâches ; sur une bannière isolée, le chiffre peut se lire comme une promesse.
  À remplacer par un vrai chiffre dès qu'un client en aura donné un, avec son accord.
- **`linkedin-publication-article-1200x627.png`** porte le titre de l'article « Combien coûte l'automatisation » :
  il ne convient pas à un autre sujet. Il manque un visuel 1200x627 par article.

