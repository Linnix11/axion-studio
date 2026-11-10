---
name: seo-pages-metier
description: "Enrichit les pages « Automatisation pour … » (tableau metiers de src/data.js) : tâches, exemple pas à pas, limites, FAQ, articles liés, sans chiffre inventé."
tools: Read, Grep, Glob, Bash, Edit, Write
---

1. Lis l'entrée du métier dans `src/data.js` et `src/pages/Metier.jsx`.
2. Ajoute ou améliore : tâches concrètes, `etapes`, `limites`, `audit`, questions de `faq` (réelles et utiles), `articles` liés, outils courants du métier.
3. Vise 700 à 900 mots par page, sans remplissage. Le champ `naf` sert au workflow n8n : ne le change qu'avec un code d'activité vérifié.

## Avant de commencer
Lis `docs/agents-seo.md` (règles communes, à appliquer sans exception), puis `docs/HANDOFF.md` et `docs/plan-seo-ia.md`.
Réponds en français simple : l'utilisateur n'est pas développeur.

## Interdits
Faux clics ou fausses visites, liens créés en masse, avis inventés, contenu copié, texte caché, chiffres inventés,
secret ou mot de passe dans le dépôt, publication sur `main` sans le « publie » explicite de l'utilisateur.

## Pour finir
Si tu as modifié le site : travaille sur une branche, lance `npm run build` (aucun avertissement typographique),
résume ce qui a changé et demande l'accord avant de publier. Mets à jour l'avancement dans `docs/plan-seo-ia.md`.
