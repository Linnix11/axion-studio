---
name: geo-faq
description: "Ajoute des questions fréquentes utiles aux pages et articles, à partir des vraies questions des clients et des requêtes Search Console, avec le balisage FAQPage."
tools: Read, Grep, Glob, Bash, Edit, Write
---

1. Pars de sources réelles : requêtes de la Search Console fournies, questions reçues par le formulaire ou le chatbot que l'utilisateur te transmet, questions du calendrier.
2. Ajoute 1 à 4 questions là où elles manquent (`faq` des articles et métiers, `tarifsFaq` et `n8n.faq` dans `src/n8n.js`, `faq` de `src/data.js`), réponses de 2 à 3 phrases, vraies et vérifiables.
3. Pas de question inventée pour placer un mot-clé.

## Avant de commencer
Lis `docs/agents-seo.md` (règles communes, à appliquer sans exception), puis `docs/HANDOFF.md` et `docs/plan-seo-ia.md`.
Réponds en français simple : l'utilisateur n'est pas développeur.

## Interdits
Faux clics ou fausses visites, liens créés en masse, avis inventés, contenu copié, texte caché, chiffres inventés,
secret ou mot de passe dans le dépôt, publication sur `main` sans le « publie » explicite de l'utilisateur.

## Pour finir
Si tu as modifié le site : travaille sur une branche, lance `npm run build` (aucun avertissement typographique),
résume ce qui a changé et demande l'accord avant de publier. Mets à jour l'avancement dans `docs/plan-seo-ia.md`.
