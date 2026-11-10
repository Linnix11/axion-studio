# Rapport de l'agent seo-performance

Date : 10 novembre 2026. Analyse en lecture seule : aucun fichier du site modifié, pas de nouveau build
(le dossier `dist/` existant a été mesuré), rien de publié.

Le site en ligne sert exactement le même build que `dist/` (même fichier `index-L3z1lYLj.js` et `index-rlL5OlfH.css`).

## En bref

Le site est déjà rapide et propre : compression Brotli active, cache d'un an sur les fichiers versionnés,
6 requêtes seulement pour la page d'accueil, aucune image dans les pages, aucun décalage d'affichage mesuré.
Il reste trois vrais gains, tous invisibles pour le visiteur (la charte ne change pas) :

1. alléger la police des titres (environ 44 Ko de moins à la première visite) ;
2. alléger la police du texte (environ 12 Ko de moins) ;
3. découper le JavaScript par page (le texte des 8 articles est chargé sur toutes les pages, même l'accueil).

## 1. Mesures

### Fichiers de `dist/assets/` (poids brut et compressé)

| Fichier | Brut | gzip (mesuré en local) | Brotli (servi en ligne) |
|---|---|---|---|
| `index-L3z1lYLj.js` (tout le JavaScript, une seule pièce) | 447,6 Ko | 134,0 Ko | 127,3 Ko |
| `index-rlL5OlfH.css` | 74,4 Ko | 16,0 Ko | 14,3 Ko |
| `index.html` (accueil) | 50,1 Ko | 9,6 Ko | 8,8 Ko |
| `bricolage-grotesque-latin-wdth-normal.woff2` (titres) | 78,2 Ko | (déjà compressée) | 78,2 Ko |
| `hanken-grotesk-latin-wght-normal.woff2` (texte) | 34,7 Ko | (déjà compressée) | 34,7 Ko |

Autres polices présentes dans `dist/assets/` mais **non téléchargées** par un visiteur français
(elles ne servent que pour les accents d'Europe de l'Est, le vietnamien, ou le mode « police lisible ») :
latin-ext et vietnamese de Bricolage et Hanken, Atkinson Hyperlegible (3 graisses, en woff2 et woff).
Vérifié : aucun caractère des pages pré-rendues ne sort de l'alphabet latin de base, donc ces fichiers ne sont jamais demandés.

Dossier `dist/` complet : 2,0 Mo, 58 fichiers.

### Page d'accueil en ligne (https://axionstudio.fr/, mesuré dans le navigateur)

| Requête | Transféré |
|---|---|
| HTML de l'accueil | 9,1 Ko |
| JavaScript | 127,6 Ko |
| CSS | 14,3 Ko |
| Police Bricolage (préchargée) | 78,2 Ko |
| Police Hanken (préchargée) | 34,7 Ko |
| `/api/chat.php` (vérifie que l'assistant est disponible) | 0,3 Ko |
| `favicon.svg` | 0,3 Ko |

- **Nombre de requêtes : 7** (6 mesurées par le navigateur + l'icône). Total première visite : **environ 264 Ko**.
- **Visite suivante** : seuls le HTML (revalidé) et `/api/chat.php` repartent ; JS, CSS et polices viennent du cache.
- **Décalage d'affichage (CLS) : 0** mesuré. Aucune balise `<img>` dans les 24 pages : pas de risque d'image sans dimensions.
- 2 polices chargées sur 3 familles (Atkinson seulement en mode accessibilité).
- Polices préchargées (`<link rel="preload">`, posé par `scripts/prerender-routes.mjs`) avec `font-display: swap`.
- Taille de page (DOM) de l'accueil : 485 éléments, raisonnable.
- Je n'ai pas pu relever le LCP ni le temps de blocage sur mobile : le quota gratuit de PageSpeed Insights était épuisé
  et le navigateur intégré tournait masqué (pas d'affichage mesurable). Voir « À faire par l'utilisateur ».

### Serveur et en-têtes (Hostinger, CDN « hcdn », HTTP/2, HTTP/3 annoncé)

| Ressource | Compression | Cache-Control | Remarque |
|---|---|---|---|
| Pages HTML | Brotli | `no-cache` | Revalidées à chaque visite (ETag) : bon choix, les mises à jour sont visibles tout de suite |
| JS, CSS | Brotli | `public, max-age=31536000, immutable` | Parfait. Le CDN les met en cache (MISS puis HIT) |
| Polices woff2 | aucune (normal, déjà compressées) | 1 an, immutable | Parfait |
| favicon, logo.png, og.png | Brotli pour le SVG | `max-age=604800` (7 jours, réglage Hostinger) | Correct |
| llms.txt, sitemap.xml | Brotli | aucun | Correct pour des fichiers qui changent |
| `/api/chat.php` (GET) | non | `no-store` | Appelé à chaque page vue, voir problème 4 |

- Temps de réponse du serveur pour l'accueil : 45 à 170 ms selon les essais. Bon.
- `/tarifs` sans « / » final : une redirection 301 vers `/tarifs/` (déjà connue, les liens internes ont le « / »).
- Hostinger ajoute un en-tête `Expires` à 7 jours sur les JS et CSS ; il est ignoré par les navigateurs
  car `max-age` (1 an) est prioritaire. Rien à faire.

### Changements récents (`git log`)

Aucune nouvelle bibliothèque ajoutée récemment : `package.json` ne contient que React, React Router et les 3 polices.
Le poids du JavaScript vient surtout du contenu texte (articles, CGV, données) compilé dedans, pas d'un script ajouté.

## 2. Problèmes classés par gain

### Problème 1 (gain le plus net) : la police des titres est chargée en entier alors qu'un seul réglage sert

- Constat : Bricolage Grotesque est une police « variable » avec deux réglages : largeur (75 % à 100 %) et graisse (200 à 800).
  Le site n'utilise qu'**une largeur, 85 %** (`font-stretch: 85%` dans `src/index.css` ligne 59, et `[font-stretch:85%]`
  sur les gros chiffres de `Home.jsx`, `Tarifs.jsx`, `Metier.jsx`, `TaskList.jsx`) et **deux graisses, 700 et 800**
  (titres en gras, gros chiffres en extra-gras, comme le prévoit `docs/brand-guidelines.md`).
  Les petits titres (`.text-base`, `.text-lg`) passent en Hanken, donc ne sont pas concernés.
- Mesure (faite sur une copie, avec fontTools) : figer la largeur à 85 % et limiter la graisse à 700-800
  fait passer le fichier de **78,2 Ko à 34,5 Ko**, soit **environ 44 Ko de moins** (-56 %) à chaque première visite.
  Le rendu est strictement identique puisque ce sont les mêmes valeurs que celles affichées aujourd'hui.
- C'est aussi la ressource qui retarde l'affichage du grand titre (élément le plus visible de l'accueil).

### Problème 2 : la police du texte contient des graisses inutilisées

- Constat : Hanken Grotesk couvre les graisses 100 à 900. Le code n'utilise que 400 (normal), 500 (`font-medium`, 43 fois),
  600 (`font-semibold`, gras du texte) et 700 (`font-bold`).
- Mesure : limiter à 400-700 fait passer le fichier de **34,7 Ko à 23,2 Ko**, soit **environ 12 Ko de moins**. Rendu identique.

Problèmes 1 et 2 ensemble : environ 56 Ko de moins sur 264 Ko, soit **environ 20 % du poids de la première visite**.

### Problème 3 : un seul fichier JavaScript pour tout le site

- Constat : `src/App.jsx` importe directement les 17 pages. Résultat : l'accueil télécharge aussi le texte complet
  des 8 articles (`src/blog.js`), les CGV (`src/legal.js`), la page Agence n8n, etc.
- Mesure : la partie « articles du blog » occupe à elle seule environ **60 Ko bruts, 19 Ko compressés**,
  soit environ 14 % du JavaScript, chargés sur toutes les pages. Les CGV, mentions et autres pages ajoutent encore du texte.
- Effet : surtout sur les téléphones d'entrée de gamme, où il faut lire et exécuter 448 Ko de code avant
  que les boutons (menu, assistant, semaine type) répondent. Pour Google, cela pèse sur l'INP (réactivité).
- Gain estimé : un ordre de grandeur de 20 à 35 % de JavaScript en moins sur l'accueil (estimation, à mesurer après la correction).
- Effort : moyen, et il y a un piège (voir correction 3) : mal fait, il viderait le HTML pré-rendu que lisent Google et les IA.

### Problème 4 (petit) : l'assistant interroge le serveur à chaque page vue

- Constat : `src/components/ChatWidget.jsx` ligne 54 appelle `GET /api/chat.php` à chaque chargement de page,
  réponse en `no-store`. Côté serveur, `chat.php` relit à chaque fois le fichier `assistant-prompt.txt` (55 Ko).
- Gain : faible pour le visiteur (l'appel part après l'affichage), mais une requête PHP de moins par page vue
  pour l'hébergement, et une requête de moins dans le réseau du téléphone.

### Problème 5 (très petit) : image de partage lourde

- `og.png` fait 90 Ko (97 Ko servis). Elle n'est jamais chargée par les visiteurs du site, seulement par LinkedIn,
  Facebook, etc. lors d'un partage. Une compression PNG sans perte (ou un JPEG de qualité 85) la réduirait sans
  changer l'image. Gain sans effet sur la vitesse du site : à faire seulement à l'occasion.

### Points vérifiés, rien à corriger

- Compression Brotli active sur HTML, JS, CSS, SVG, textes.
- Cache long et `immutable` sur les fichiers versionnés ; HTML revalidé.
- Polices auto-hébergées, préchargées, `font-display: swap`, police de secours « Arial Narrow » proche des titres étroits.
- Aucune image dans les pages, logo et icônes en SVG intégré : pas de décalage d'affichage dû aux images.
- Polices des autres alphabets découpées par `unicode-range` : jamais téléchargées pour un texte français.
- CSS de 14 Ko compressé : correct pour Tailwind v4 (seules les classes utilisées sont générées).
- Le script en ligne du thème (569 octets) est minuscule et évite un flash de mauvais thème : à garder.
- `/api/assistant-prompt.txt` est bien refusé depuis le web (403).

## 3. Corrections précises (à faire sur une branche, avec accord avant publication)

Aucune ne change la charte : mêmes polices, mêmes largeurs, mêmes graisses, même mise en page.

### Correction 1 : police des titres figée à 85 % de largeur, graisses 700 à 800

1. Générer le fichier une fois (outil gratuit fontTools, en Python) à partir de
   `node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-wdth-normal.woff2` :
   ```python
   from fontTools.ttLib import TTFont
   from fontTools.varLib import instancer
   f = TTFont("bricolage-grotesque-latin-wdth-normal.woff2")   # nécessite le module brotli
   g = instancer.instantiateVariableFont(f, {"wdth": 85, "wght": (700, 800)})
   g.flavor = "woff2"
   g.save("src/assets/fonts/bricolage-titres-latin.woff2")
   ```
   Faire de même pour `bricolage-grotesque-latin-ext-wdth-normal.woff2` (par sécurité, pour les noms à accents rares).
2. Dans `src/main.jsx`, retirer la ligne `import '@fontsource-variable/bricolage-grotesque/wdth.css'`.
3. Dans `src/index.css`, déclarer la police à la place (même nom de famille, donc rien d'autre à changer) :
   ```css
   @font-face {
     font-family: "Bricolage Grotesque Variable";
     font-style: normal;
     font-display: swap;
     font-weight: 700 800;
     font-stretch: 85%;
     src: url("./assets/fonts/bricolage-titres-latin.woff2") format("woff2");
     unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
   }
   ```
   (plus un second bloc identique pour le fichier latin-ext avec la plage `unicode-range` d'origine).
4. Dans `scripts/prerender-routes.mjs` ligne 21, adapter le filtre du préchargement au nouveau nom de fichier
   (par exemple `/^(bricolage-titres-latin|hanken-grotesk-latin-wght)-normal-.*\.woff2$/` ou équivalent selon le nom choisi),
   sinon la police des titres ne serait plus préchargée.
5. Vérifier après build : comparer des captures de l'accueil, Tarifs et une page métier avant et après
   (titres et gros chiffres doivent être identiques au pixel près), et que `dist/index.html` contient toujours deux `preload`.

Attention : si un jour la charte utilise une autre largeur ou une graisse sous 700 pour Bricolage, il faudra régénérer le fichier.

### Correction 2 : police du texte limitée aux graisses 400 à 700

Même méthode avec `node_modules/@fontsource-variable/hanken-grotesk/files/hanken-grotesk-latin-wght-normal.woff2` :
`instancer.instantiateVariableFont(f, {"wght": (400, 700)})`, puis `@font-face` avec `font-weight: 400 700`
et le même nom de famille « Hanken Grotesk Variable », retrait de `import '@fontsource-variable/hanken-grotesk/wght.css'`
dans `src/main.jsx`, et mise à jour du filtre de préchargement. Pour la mise en gras de secours, 700 reste disponible.

### Correction 3 : découper le JavaScript par page, sans casser le pré-rendu

Ordre à respecter, sinon les pages pré-rendues seraient vides pour Google et les IA :

1. `src/entry-server.jsx` : remplacer `renderToString` (qui n'attend pas le chargement des pages découpées
   et écrirait un écran vide) par `prerenderToNodeStream` de `react-dom/static` (présent dans react-dom 19.3.1 installé,
   vérifié), qui attend que tout soit chargé. `render()` devient asynchrone : ajouter `await` à l'appel de la ligne 50
   de `scripts/prerender-routes.mjs`.
2. `src/App.jsx` : garder `Home` en import direct (page la plus visitée), passer les autres pages en
   `const Article = lazy(() => import('./pages/Article'))`, etc., et entourer `<Routes>` d'un `<Suspense>`.
   Au chargement, React garde le HTML pré-rendu affiché tant que le morceau de la page n'est pas arrivé : pas de page blanche.
3. Vérifier après build : `dist/blog/*/index.html` contient toujours le texte complet des articles,
   aucun avertissement d'hydratation dans la console (tester avec `/blog/.../` et le « / » final), et la taille
   du fichier JS principal a baissé.

C'est la correction la plus délicate : à faire séparément des deux premières, et à mesurer avant et après.

### Correction 4 : ne vérifier l'assistant qu'une fois par visite

Dans `src/components/ChatWidget.jsx`, ligne 54, garder la réponse en `sessionStorage` (par exemple sous la clé
`axion-chat-available`) et ne rappeler `/api/chat.php` que si elle est absente. Le reste du fonctionnement est inchangé.
Gain : une requête PHP de moins sur chaque page vue après la première.

### Correction 5 (facultative) : compresser `public/og.png` sans perte

Avec un outil comme `oxipng` ou `pngquant`, ou l'export d'un logiciel d'image, en gardant les mêmes dimensions (1200 x 630).

## 4. À faire par l'utilisateur

- Lancer https://pagespeed.web.dev/ sur https://axionstudio.fr/ (mobile) et noter LCP, INP, CLS et la note dans
  `docs/suivi-seo-ia.md`, pour avoir un point de départ avant les corrections. Je n'ai pas pu le faire (quota épuisé).
- Dire quelles corrections lancer. Ordre conseillé : 1 et 2 ensemble (simples, gain sûr), puis 4, puis 3 à part.
