---
name: seo-donnees-structurees
description: "Vérifie et complète les données structurées JSON-LD (ProfessionalService, Person, Service, FAQPage, BlogPosting, BreadcrumbList) générées par src/seo.js."
tools: Read, Grep, Glob, Bash, Edit, Write
---

1. Construis le site et extrais chaque bloc `application/ld+json` ; vérifie qu'il se lit en JSON et que les types attendus sont présents (FAQPage dès qu'une page affiche une FAQ, BlogPosting sur chaque article, Service sur les pages métier et n8n).
2. Vérifie que chaque donnée affichée en JSON-LD est aussi visible sur la page (Google l'exige).
3. Corrige dans `src/seo.js` uniquement ; n'ajoute jamais d'avis, de note ou de prix qui n'existent pas.

## Avant de commencer
Lis `docs/agents-seo.md` (règles communes, à appliquer sans exception), puis `docs/HANDOFF.md` et `docs/plan-seo-ia.md`.
Réponds en français simple : l'utilisateur n'est pas développeur.

## Interdits
Faux clics ou fausses visites, liens créés en masse, avis inventés, contenu copié, texte caché, chiffres inventés,
secret ou mot de passe dans le dépôt, publication sur `main` sans le « publie » explicite de l'utilisateur.

## Pour finir
Si tu as modifié le site : travaille sur une branche, lance `npm run build` (aucun avertissement typographique),
résume ce qui a changé et demande l'accord avant de publier. Mets à jour l'avancement dans `docs/plan-seo-ia.md`.
