# Branche « Sites internet » : sites vitrine de démonstration et page Réalisations

Inspiration : les sites dits « immersifs » (reel Instagram du 18 novembre 2026) : écran de chargement qui compte
jusqu'à 100, grands visuels plein écran, mots géants dispersés qui bougent au défilement, scènes en 3D, galeries.
On reprend le **genre**, jamais les sites eux-mêmes : textes, noms, mises en page et visuels sont originaux.

## Règles communes

- **Honnêteté** : Axion Studio n'a pas encore de client « site web ». Chaque démo est une entreprise **fictive**,
  annoncée comme telle sur la démo et sur la page Réalisations (« Concept de démonstration, entreprise fictive »).
  Pas d'avis clients, de récompenses, d'adresse, de téléphone ni de chiffres inventés présentés comme réels.
- **Hors référencement** : chaque démo porte `<meta name="robots" content="noindex">` et n'est pas dans le plan du site
  (une entreprise fictive ne doit pas apparaître dans Google).
- **Aucune ressource externe** : pas de CDN, pas de Google Fonts, pas de photos téléchargées. Visuels faits en code
  (three.js, shaders, SVG, dégradés CSS). Polices : celles du système ou les familles déjà installées
  (`@fontsource-variable/bricolage-grotesque`, `@fontsource-variable/hanken-grotesk`, `@fontsource/atkinson-hyperlegible`).
- **Bibliothèques partagées** dans `public/demos/_lib/` (copiées depuis node_modules, versions figées) :
  GSAP 3.15.1 + ScrollTrigger + SplitText (licence standard gratuite), Lenis 1.3.27 (MIT), three.js 0.187.0 (MIT, module ES :
  `import * as THREE from '../_lib/three.module.js'`).
- **Accessibilité** : `prefers-reduced-motion` = page lisible sans aucune animation ni 3D ; navigation au clavier ;
  contrastes suffisants ; la 3D est décorative (`aria-hidden`).
- **Mobile** : 3D allégée (pixel ratio ≤ 1,5, rendu en pause hors écran ou onglet caché), pas de défilement horizontal.
- **Typographie française** : espace insécable avant « : » et après « « », espace fine avant ; ? ! ».
- **Ce qu'Axion vend en plus** : chaque démo montre un formulaire (réservation, devis, visite) relié aux outils du
  client. Sur la démo, il n'envoie rien et le dit ; une ligne explique ce qui se passerait chez un vrai client
  (fiche créée, agenda, e-mail de confirmation).

## Les trois démos (`public/demos/<dossier>/`)

| Dossier | Entreprise fictive | Métier visé (page métier liée) | Ambiance |
|---|---|---|---|
| `ardoise-et-sel` | Ardoise & Sel, restaurant de saison | Commerces et restaurants | Chaleureuse, nuit, braises ; 3D : particules de braise et fumée |
| `atelier-veine` | Atelier Veine, ébéniste | Artisans du bâtiment | Matière, lumière rasante ; 3D : planche de bois dont les veines bougent au défilement |
| `seuil` | Seuil, agence immobilière de caractère | Agences immobilières | Calme, architecture ; 3D : volumes de maison qui s'assemblent au défilement |

## Page Réalisations (`/realisations`, site React)

Liste les trois démos (aperçu, ce qui est inclus, lien « Voir la démo »), avec la mention « concept de démonstration »,
plus axionstudio.fr lui-même comme vraie réalisation. Liée depuis la page Services (création de sites) et le pied de page.

## Ce qui reste à décider par Arthur

- Publier ou non (les démos et la page changent le site visible).
- Remplacer plus tard les visuels faits en code par de vraies photos de clients, avec leur accord.
