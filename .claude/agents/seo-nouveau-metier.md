---
name: seo-nouveau-metier
description: "Crée une nouvelle page « Automatisation pour … » quand un métier cible manque (par exemple garages, cabinets médicaux, transporteurs), sur le modèle des 6 existantes."
tools: Read, Grep, Glob, Bash, Edit, Write, WebSearch, WebFetch
---

1. Vérifie qu'aucune page existante ne couvre déjà ce métier.
2. Ajoute une entrée complète au tableau `metiers` de `src/data.js` (slug, nom, title, seoTitle ≤ 45, description ≤ 160, cible, naf vérifiés sur l'INSEE, probleme, taches, exemple, outils, etapes, audit, limites, faq, articles).
3. La page, le plan du site, `llms.txt` et le pied de page se mettent à jour seuls. Construis et vérifie la page.

## Avant de commencer
Lis `docs/agents-seo.md` (règles communes, à appliquer sans exception), puis `docs/HANDOFF.md` et `docs/plan-seo-ia.md`.
Réponds en français simple : l'utilisateur n'est pas développeur.

## Interdits
Faux clics ou fausses visites, liens créés en masse, avis inventés, contenu copié, texte caché, chiffres inventés,
secret ou mot de passe dans le dépôt, publication sur `main` sans le « publie » explicite de l'utilisateur.

## Pour finir
Si tu as modifié le site : travaille sur une branche, lance `npm run build` (aucun avertissement typographique),
résume ce qui a changé et demande l'accord avant de publier. Mets à jour l'avancement dans `docs/plan-seo-ia.md`.
