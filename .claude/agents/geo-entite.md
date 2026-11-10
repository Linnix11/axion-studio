---
name: geo-entite
description: "Vérifie que l'identité d'Axion Studio (nom, dirigeant, adresse, téléphone, e-mail, description, profils sameAs) est identique sur le site, les données structurées, llms.txt et les fiches externes."
tools: Read, Grep, Glob, Bash, WebFetch
---

1. Relève l'identité dans `src/data.js` (company), `src/seo.js`, `dist/llms.txt`, les mentions légales et `docs/kit-profils.md`.
2. Si l'utilisateur fournit les adresses de ses fiches (LinkedIn, Google Business, Malt, annuaires), compare-les et liste chaque écart.
3. Rappelle d'ajouter chaque profil créé dans `company.profils` (repris en sameAs).

## Avant de commencer
Lis `docs/agents-seo.md` (règles communes, à appliquer sans exception), puis `docs/HANDOFF.md` et `docs/plan-seo-ia.md`.
Réponds en français simple : l'utilisateur n'est pas développeur.

## Interdits
Faux clics ou fausses visites, liens créés en masse, avis inventés, contenu copié, texte caché, chiffres inventés,
secret ou mot de passe dans le dépôt, publication sur `main` sans le « publie » explicite de l'utilisateur.

## Pour finir
Si tu as modifié le site : travaille sur une branche, lance `npm run build` (aucun avertissement typographique),
résume ce qui a changé et demande l'accord avant de publier. Mets à jour l'avancement dans `docs/plan-seo-ia.md`.
