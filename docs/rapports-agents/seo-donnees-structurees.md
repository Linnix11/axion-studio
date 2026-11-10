# Rapport : données structurées (JSON-LD)

Agent : seo-donnees-structurees. Date : 10 novembre 2026.
Analyse faite sur le dossier `dist/` déjà construit (29 pages HTML), sans relancer le build et sans rien modifier dans le site.
Les corrections proposées ci-dessous sont à faire dans `src/seo.js` (sauf mention contraire), par un passage ultérieur.

## En résumé

Les données structurées sont en bon état. Aucune erreur bloquante : chaque page a un seul bloc JSON-LD, qui se lit sans erreur,
et les types attendus sont présents. Les problèmes trouvés sont des écarts entre ce que dit le JSON-LD et ce que la page affiche
(Google demande que les deux concordent), plus une FAQ affichée sans balisage.

## Ce qui est valide

- **29 pages, 29 blocs JSON-LD, tous lisibles** (aucune erreur de syntaxe).
- **Entreprise (ProfessionalService) et site (WebSite)** sur toutes les pages, avec logo PNG (512 x 512), image de partage
  (1200 x 630), adresse, téléphone, zone servie (France), `knowsAbout`. Le téléphone est visible sur toutes les pages,
  l'adresse complète sur l'accueil, À propos, les mentions légales, les CGV et la confidentialité.
- **Fil d'Ariane (BreadcrumbList)** sur toutes les pages sauf l'accueil et la 404, ce qui est correct.
- **Articles (BlogPosting)** : présents sur les 8 articles, avec titre identique au H1, auteur (Person relié à la page À propos),
  date de publication, nombre de mots, image. Le nom de l'auteur et la date sont bien visibles sur chaque article.
- **Page Blog (Blog)** : liste les 8 articles.
- **FAQ (FAQPage)** : sur la page FAQ (8 questions), Tarifs (6), Agence n8n (5), les 6 pages métier (5 chacune)
  et les 4 articles qui ont une FAQ (devis, facture électronique, rendez-vous, relances). Pour toutes ces pages,
  **chaque question et chaque réponse du JSON-LD est bien visible sur la page**.
- **Pages métier (Service)** : nom, description et les 4 tâches du catalogue sont tous visibles sur la page.
- **Page Services (Service x 4)** : nom et description visibles, et les ancres `#workflows`, `#integrations`, `#ia`, `#sites-web` existent bien.
- **Tarifs (OfferCatalog)** : Audit offert, Projet dès 150 €, Suivi dès 250 € par mois, tous visibles sur la page.
- **À propos (Person + AboutPage)** et **Contact (ContactPage)** : présents.
- **Aucun avis, aucune note, aucun prix inventé** : rien à retirer de ce côté.

## Problèmes trouvés, par ordre d'importance

### 1. Important : la FAQ de la page Contact n'a pas de balisage FAQPage

- **Page** : `/contact/`. **Type manquant** : FAQPage.
- **Constat** : la page affiche une section « Questions fréquentes » de 4 questions (audit gratuit, que préparer,
  hors Île-de-France, devenir des informations du formulaire), mais le JSON-LD ne contient pas de FAQPage.
  La règle du projet est « FAQPage dès qu'une page affiche une FAQ ».
- **Difficulté** : ces 4 questions sont écrites en dur dans `src/pages/Contact.jsx` (lignes 63 et suivantes), donc `src/seo.js` ne peut pas les lire.
- **Correction proposée** :
  1. déplacer les 4 questions dans `src/data.js` sous un nom comme `contactFaq` (liste de `{ q, a }`, la 4e réponse en texte simple
     pour le JSON-LD, les liens restant dans la page), et faire afficher cette liste par `Contact.jsx` ;
  2. dans `src/seo.js`, à côté de la ligne `if (path === '/contact') ...`, ajouter :
     `if (path === '/contact') out.push({ '@type': 'FAQPage', mainEntity: contactFaq.map(f => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })`
     (avec `contactFaq` importé depuis `./data.js`).
  À éviter : recopier les questions directement dans `seo.js`, car les deux versions finiraient par diverger.

### 2. Moyen : prix « dès 150 € » annoncé dans le JSON-LD mais absent de deux types de pages

Google demande que les informations balisées soient visibles par le lecteur.

- **Page `/services/`, type Service (x 4)** : chaque service porte `offers` avec `minPrice: 150`, mais la page n'affiche aucun prix.
  **Correction** (lignes 110 à 114 de `seo.js`) : retirer la ligne `offers: { ... }` des 4 services. Le prix reste annoncé là où il est
  visible (Tarifs, Agence n8n, et `priceRange` de l'entreprise). Autre option : afficher « Projets dès 150 € » sur la page Services
  (modification de la page, pas de `seo.js`).
- **Page `/automatisation/experts-comptables/`, type Service** : même `offers` à 150 €, mais cette page n'affiche aucun prix
  (les 5 autres pages métier l'affichent dans leur FAQ « Combien ça coûte ? »).
  **Correction** (ligne 102) : n'ajouter `offers` que si la page affiche le prix, par exemple
  `...(metier.faq.some(f => f.a.includes('150')) ? { offers: { ... } } : {})`,
  ou plus simplement ajouter à la FAQ des experts-comptables (dans `src/data.js`) la même question sur le prix que les autres métiers.

### 3. Faible : description des articles différente du texte affiché

- **Pages** : les 8 articles. **Type** : BlogPosting, champ `description`.
- **Constat** : la description reprise est le résumé court du blog (`post.description`), qui n'apparaît pas tel quel sur la page de l'article.
  Ce n'est pas une erreur (une description peut résumer), mais le chapeau affiché en haut de l'article (`post.lead`) est plus fidèle.
- **Correction** (ligne 90) : `description: post.lead || post.description`.

### 4. Faible : description du Service de la page Agence n8n absente de la page

- **Page** : `/agence-n8n/`. **Type** : Service, champ `description`.
- **Constat** : la description utilisée est la balise meta (`n8n.description`), alors que la page affiche l'introduction `n8n.intro`.
- **Correction** (ligne 105) : `description: n8n.intro`. On peut aussi ajouter à ce Service la même ligne `offers` (dès 150 €)
  que les pages métier, puisque ce prix est visible dans la FAQ de la page.

### 5. Faible : petites incohérences de forme

- **Page `/services/`, type Service** : `areaServed: 'France'` est un simple texte, alors que partout ailleurs c'est
  `{ '@type': 'Country', name: 'France' }`. **Correction** (ligne 112) : utiliser la même forme objet.
- **Page `/tarifs/`, type OfferCatalog** : le catalogue est posé seul dans la page, sans lien avec l'entreprise.
  **Correction** (ligne 115), facultative : donner au catalogue un identifiant (`'@id': pageUrl('/tarifs') + '#formules'`)
  et, sur la page Tarifs, ajouter dans l'objet `org` la ligne `hasOfferCatalog: { '@id': pageUrl('/tarifs') + '#formules' }`.
  Tel quel, c'est valide, juste moins explicite.
- **Pages `/a-propos/` et `/contact/`, types AboutPage et ContactPage** : pas de `name`. **Correction** (lignes 119 et 120) :
  ajouter `name: fullTitle(path)`.

## Points sans action (pour information)

- **`sameAs` vide** : normal tant que les profils externes (LinkedIn, Google Business, Malt) n'existent pas. Remplir `company.profils`
  dans `src/data.js` à chaque profil créé.
- **`dateModified` égale à `datePublished`** sur tous les articles : correct tant qu'aucun article n'a été mis à jour. Penser au champ
  `updated` de l'article lors d'une mise à jour (et afficher « Mis à jour le … » sur la page, ce qui n'existe pas encore).
- **Pages Exemples, Méthode, Sécurité, Accueil** : pas de type particulier en plus de l'entreprise et du fil d'Ariane. Aucun type
  utile manquant (le type HowTo pour la Méthode n'est plus affiché par Google).
- **Page 404** : contient le JSON-LD de l'entreprise mais est en `noindex`, sans conséquence.
- Les FAQ ne donnent plus d'affichage enrichi dans Google pour un site d'entreprise (réservé aux sites officiels et de santé depuis 2023),
  mais elles restent utiles pour la compréhension par les moteurs et les IA. Les garder.

## Vérification après correction

Après les modifications : `npm run build`, puis tester 3 pages dans l'outil « Test des résultats enrichis » de Google
(Contact, Services, une page métier) et le validateur schema.org.
