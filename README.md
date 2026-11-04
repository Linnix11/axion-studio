# Site vitrine — Axion Studio

Site vitrine de la micro-entreprise **axionstudio** (Arthur Champagne-Forterre, EI) :
automatisation des processus, IA pour entreprises, création de sites web.

Stack : **React 19 + Vite + Tailwind CSS v4**.

## Lancer le projet

```bash
npm install
npm run dev      # serveur de développement (http://localhost:5173)
npm run build    # génère le site statique dans dist/
npm run preview  # prévisualise le build
```

Le site est publié automatiquement sur GitHub Pages à chaque envoi sur `main`
(workflow `.github/workflows/deploy.yml`) : https://linnix11.github.io/axion-studio/

## Pages
Accueil, Services, Exemples, Méthode, Tarifs, À propos, FAQ, Contact, Mentions légales, Confidentialité
(et une page 404). Navigation avec React Router ; `npm run build` génère un fichier HTML par page
(`scripts/prerender-routes.mjs`) pour que les liens directs fonctionnent sur un hébergement statique.

## Structure
- `src/data.js` — **toutes les infos et tous les textes** : entreprise, services, exemples, étapes, tarifs, FAQ.
- `src/routes.js` — liste des pages (à compléter si vous ajoutez une page).
- `src/pages/` — une page par fichier.
- `src/components/` — en-tête, pied de page, formulaire, liste interactive, éléments communs (`ui.jsx`).
- `src/index.css` — couleurs du thème (clair et sombre).

## Sous-dossier ou domaine dédié
Sur GitHub Pages, le site est servi sous `/axion-studio/` : le workflow construit avec `BASE_PATH=/axion-studio/`.
Avec un domaine dédié (axionstudio.fr), supprimez la variable `BASE_PATH` du workflow.

## À compléter avant la mise en ligne
- **SIRET** : remplacer « En cours d'attribution » dans `src/data.js` dès réception de l'avis INSEE.
- **Adresse** : seule la commune est affichée. La loi (LCEN) demande l'adresse de l'éditeur ;
  ajoutez-la ou utilisez une domiciliation si vous ne voulez pas publier votre adresse personnelle.
