# Rapport : maillage interne (agent seo-maillage-interne)

Date : 10 novembre 2026. Analyse du dossier `dist/` déjà construit (aucun build relancé, aucun fichier du site modifié).

## Méthode

- 29 pages HTML lues dans `dist/` (la page 404 est exclue).
- Seuls les liens placés dans la balise `<main>` sont comptés : le menu et le pied de page ne comptent pas.
- Une page source compte une seule fois, même si elle fait plusieurs liens vers la même page. Les liens d'une page vers elle-même sont ignorés.
- À noter : le fil d'Ariane (« Accueil / Blog ») et la signature « Par Arthur… » des articles sont dans `<main>`. Ils expliquent pourquoi l'accueil, `/blog/` et `/a-propos/` reçoivent un lien de chaque article.
- Aucun lien interne cassé : toutes les adresses visées existent.

## Liens reçus par page (depuis le contenu `<main>`)

| Page | Liens reçus | Pages qui font le lien |
|---|---:|---|
| /cgv/ | 1 | /tarifs/ |
| /faq/ | 1 | /tarifs/ |
| /mentions-legales/ | 1 | /cgv/ |
| /methode/ | 1 | / |
| /exemples/ | 2 | /, /agence-n8n/ |
| /services/ | 2 | /, article n8n-make-zapier |
| /securite/ | 3 | /, article ia-donnees-clients, /contact/ |
| /agence-n8n/ | 3 | /, /services/, /tarifs/ |
| /confidentialite/ | 4 | /cgv/, /contact/, /mentions-legales/, /securite/ |
| /blog/devis-artisan-automatiser/ | 4 | page artisans, /blog/, articles ia-donnees et n8n-make-zapier |
| /blog/facture-electronique-tpe-2026-2027/ | 5 | page experts-comptables, /blog/, 3 articles |
| /blog/cout-automatisation-petite-entreprise/ | 6 | page boutiques, /blog/, 4 articles |
| /blog/taches-a-automatiser-tpe/ | 6 | page commerces, /blog/, 4 articles |
| /blog/prise-rendez-vous-en-ligne-rappels/ | 6 | pages commerces et professions libérales, /blog/, 3 articles |
| /blog/ia-donnees-clients-regles/ | 6 | pages immobilier et experts-comptables, /blog/, 3 articles |
| /automatisation/boutiques-en-ligne/ | 7 | /, /services/, les 5 autres pages métier |
| /blog/relances-factures-impayees/ | 7 | pages artisans et professions libérales, /blog/, 4 articles |
| / (accueil) | 8 | les 8 articles (fil d'Ariane) |
| /automatisation/commerces-restaurants/ | 8 | /, /services/, 5 pages métier, article rendez-vous |
| /blog/ | 8 | les 8 articles (fil d'Ariane) |
| /blog/n8n-make-zapier-comparatif/ | 8 | /agence-n8n/, pages immobilier et boutiques, /blog/, 4 articles |
| /a-propos/ | 8 | les 8 articles (signature) |
| /automatisation/experts-comptables/ | 9 | /, /agence-n8n/, /services/, 5 pages métier, article facture électronique |
| /automatisation/agences-immobilieres/ | 9 | /, /agence-n8n/, /services/, 5 pages métier, article rendez-vous |
| /automatisation/professions-liberales/ | 9 | /, /services/, 5 pages métier, 2 articles |
| /automatisation/artisans-batiment/ | 11 | /, /agence-n8n/, /services/, 5 pages métier, 3 articles |
| /tarifs/ | 11 | /agence-n8n/, 6 pages métier, 4 articles |
| /contact/ | 25 | presque toutes les pages |

**Pages sous 4 liens : 8.** Six comptent pour le référencement (`/methode/`, `/exemples/`, `/services/`, `/securite/`, `/agence-n8n/`, `/faq/`). Les deux autres sont des pages légales (`/cgv/`, `/mentions-legales/`).

Constat principal : les articles du blog renvoient beaucoup vers les pages métier, `/tarifs/` et `/contact/`, mais presque jamais vers `/methode/`, `/exemples/`, `/services/` et `/agence-n8n/`. Ce sont pourtant des pages commerciales.

## Liens proposés (à valider, rien n'a été modifié)

Où les ajouter : toutes les propositions vont dans `src/blog.js`, dans le champ `body` de l'article indiqué, au format `[texte](/chemin/)`. Le champ `articles` de `src/data.js` ne sert pas ici : il ne peut pointer que vers des articles du blog. Les réponses `faq` des articles ne sont pas retenues, car elles ne transforment pas `[texte](/chemin/)` en lien.

Toutes les ancres sont différentes les unes des autres. Les numéros de ligne correspondent à l'état actuel du fichier.

### /methode/ (1 lien reçu)

1. **Article « Combien coûte l'automatisation »** (`cout-automatisation-petite-entreprise`, `body`, paragraphe « Chez Axion Studio, chaque projet est chiffré au forfait… », ligne 337).
   Remplacer « Le prix exact figure dans la proposition, avant tout engagement » par :
   « Le prix exact figure dans la proposition ([voir un exemple de proposition](/methode/)), avant tout engagement »
2. **Article « 5 tâches à automatiser »** (`taches-a-automatiser-tpe`, `body`, paragraphe « Commencez par une seule tâche… », ligne 393).
   Après « tests compris, et sert ensuite de base aux suivantes. », ajouter :
   « Les [étapes, de l'audit gratuit au suivi](/methode/), sont détaillées à part. »

### /exemples/ (2 liens reçus)

1. **Article « Devis d'artisan »** (`devis-artisan-automatiser`, `body`, dernier paragraphe « Voir la page consacrée à… », ligne 87).
   Ajouter en fin de phrase : « , ainsi que l'[exemple complet de demande de devis automatisée](/exemples/) ».
2. **Article « 5 tâches à automatiser »** (`taches-a-automatiser-tpe`, `body`, paragraphe « Les PDF s'accumulent dans la boîte mail… », ligne 384).
   Ajouter à la fin : « Le circuit complet figure parmi les [exemples d'automatisation pour TPE](/exemples/). »
3. **Article « Facture électronique 2026-2027 »** (`facture-electronique-tpe-2026-2027`, `body`, liste « Par où commencer », 4e élément, ligne 302).
   Ajouter à la fin de l'élément : « (voir l'exemple du [traitement automatique des factures fournisseurs](/exemples/)) ».

### /services/ (2 liens reçus)

1. **Article « 5 tâches à automatiser »** (`taches-a-automatiser-tpe`, `body`, paragraphe « Horaires, délais, documents à fournir… », ligne 390).
   Ajouter à la fin : « C'est l'un des usages de l'[intelligence artificielle pour TPE et PME](/services/) que je mets en place. »
2. **Article « Combien coûte l'automatisation »** (`cout-automatisation-petite-entreprise`, `body`, liste « Ce qui fait varier le prix », élément « Le nombre d'outils à connecter… », ligne 330).
   Ajouter à la fin de l'élément : « (voir l'[intégration d'outils entre eux](/services/)) ».
3. **Article « Prise de rendez-vous en ligne »** (`prise-rendez-vous-en-ligne-rappels`, `body`, paragraphe « Les outils de réservation spécialisés… », ligne 166).
   Dans « L'automatisation sert à les relier au reste », remplacer « les relier au reste » par « les [relier au reste de vos outils](/services/) ».

### /securite/ (3 liens reçus)

1. **Article « n8n, Make ou Zapier »** (`n8n-make-zapier-comparatif`, `body`, liste « Comment choisir », élément « Regardez la sensibilité des données… », ligne 425).
   Ajouter à la fin de l'élément : « (voir mes règles d'[hébergement en Europe quand c'est possible](/securite/)) ».
2. **Article « Prise de rendez-vous en ligne »** (`prise-rendez-vous-en-ligne-rappels`, `body`, paragraphe RGPD « Un rappel de rendez-vous demandé par le client… », ligne 154).
   Ajouter à la fin : « Les [précautions prises sur les données de vos clients](/securite/) sont détaillées à part. »
3. **Article « Combien coûte l'automatisation »** (`cout-automatisation-petite-entreprise`, `body`, liste des coûts récurrents, élément « L'abonnement aux outils… », ligne 342).
   Remplacer « Il est souscrit à votre nom » par « Il est [souscrit à votre nom, sur vos propres comptes](/securite/) ».

### /agence-n8n/ (3 liens reçus)

1. **Article « n8n, Make ou Zapier »** (`n8n-make-zapier-comparatif`, `body`, paragraphe « n8n peut s'utiliser en ligne… », ligne 418).
   Ajouter à la fin : « Je détaille ces usages sur la page [agence n8n pour TPE et PME](/agence-n8n/). »
2. **Article « Facture électronique 2026-2027 »** (`facture-electronique-tpe-2026-2027`, `body`, paragraphe « La plupart des plateformes et des logiciels de facturation proposent des connexions (API)… », ligne 295).
   Après « à votre tableur ou à votre CRM », ajouter : « , par exemple avec un [workflow n8n relié à votre facturation](/agence-n8n/) ».

### /faq/ (1 lien reçu)

1. **Article « IA et données clients »** (`ia-donnees-clients-regles`, `body`, dernier paragraphe, ligne 461).
   Avant « Une question sur votre cas ? », ajouter : « Les [questions fréquentes sur l'automatisation et l'IA](/faq/) répondent aux cas les plus courants. »
2. **Article « Combien coûte l'automatisation »** (`cout-automatisation-petite-entreprise`, `body`, paragraphe « Le bon réflexe », ligne 360).
   Ajouter à la fin : « Délais, outils, pannes : les autres réponses sont dans la [foire aux questions](/faq/). »

### /cgv/ et /mentions-legales/ (1 lien reçu chacune) : aucune action recommandée

Ces deux pages sont déjà reliées depuis le pied de page de toutes les pages. Elles n'ont pas besoin d'être mises en avant dans les recherches Google. Ajouter des liens dans les articles pour gonfler le compteur serait artificiel.

Une seule option naturelle, facultative, pour les CGV : dans l'article `cout-automatisation-petite-entreprise` (ligne 337), après « il ne bouge pas en cours de route », ajouter « ([conditions générales de vente](/cgv/)) ».

## Suivi des ancres et du typographe (pour l'agent qui appliquera)

- Toutes les adresses se terminent par « / ».
- La ponctuation « ? » de la phrase faq/1 est déjà dans le texte existant. Les phrases ajoutées n'introduisent ni « : » ni « ; », sauf faq/2 (« Délais, outils, pannes : »). Il faut y mettre une espace insécable avant le deux-points, comme dans le reste de `src/blog.js`. Ensuite, lancer `npm run build` et vérifier qu'aucun avertissement typographique n'apparaît.
- Au total : 16 liens proposés, dont 1 facultatif (CGV). Si tous sont acceptés :
  - `/methode/` passerait de 1 à 3 pages sources ;
  - `/exemples/` de 2 à 5 ;
  - `/services/` de 2 à 5 ;
  - `/securite/` de 3 à 6 ;
  - `/agence-n8n/` de 3 à 5 ;
  - `/faq/` de 1 à 3.
- Pour atteindre 4 sur `/methode/` et `/faq/`, il faudra une source de plus. Le plus simple : le prochain article du blog.
