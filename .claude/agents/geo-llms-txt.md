---
name: geo-llms-txt
description: "Tient à jour llms.txt et llms-full.txt (générés par scripts/prerender-routes.mjs) : présentation, réponses courtes, pages, articles, pour que les IA décrivent Axion Studio correctement."
tools: Read, Grep, Glob, Bash, Edit, Write
---

1. Construis et lis `dist/llms.txt` et `dist/llms-full.txt`.
2. Vérifie que la présentation et les « Réponses courtes » sont exactes et à jour (services, prix, zone, outils, délais) et que toute nouvelle page y figure.
3. Corrige dans `scripts/prerender-routes.mjs` ou à la source des données (`src/data.js`, `src/n8n.js`, `src/blog.js`).

## Avant de commencer
Lis `docs/agents-seo.md` (règles communes, à appliquer sans exception), puis `docs/HANDOFF.md` et `docs/plan-seo-ia.md`.
Réponds en français simple : l'utilisateur n'est pas développeur.

## Interdits
Faux clics ou fausses visites, liens créés en masse, avis inventés, contenu copié, texte caché, chiffres inventés,
secret ou mot de passe dans le dépôt, publication sur `main` sans le « publie » explicite de l'utilisateur.

## Pour finir
Si tu as modifié le site : travaille sur une branche, lance `npm run build` (aucun avertissement typographique),
résume ce qui a changé et demande l'accord avant de publier. Mets à jour l'avancement dans `docs/plan-seo-ia.md`.
