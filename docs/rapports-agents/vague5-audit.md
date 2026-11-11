# Vague 5 : audit technique, maillage interne et réponses directes

Date : 11 novembre 2026. Agents : seo-audit-technique, seo-maillage-interne, geo-reponses-directes.
Mode : lecture seule. Mesures faites avec `curl` sur le site en ligne (https://axionstudio.fr/, 29 adresses du plan du site),
analyse du HTML servi (pages pré-rendues). Aucun fichier source modifié, rien de publié.

## Résumé par priorité

| Priorité | Problème | Pages | Correction proposée |
|---|---|---|---|
| 1 | Le premier paragraphe ne répond pas à la question « que peut-on automatiser pour ce métier ? » : il décrit le problème, pas la réponse | les 6 pages /automatisation/*/ | Ajouter une phrase-réponse avant le texte actuel (section C) |
| 1 | Pages « cul-de-sac » : aucun lien dans le contenu vers les articles ou les pages métier | /exemples/, /methode/, /faq/, /a-propos/, /securite/ | Liens 1 à 8 de la section B |
| 1 | /agence-n8n/ (page commerciale) n'est liée par aucune page métier ni par la FAQ | /agence-n8n/ | Liens 3, 4 et 6 de la section B |
| 2 | /tarifs/ répond en partie : le prix de départ est là, mais ni l'audit offert ni le suivi mensuel, ni le nom Axion Studio | /tarifs/ | Réécriture section C |
| 2 | /agence-n8n/ commence par « Je conçois… » : phrase peu citable hors contexte (on ne sait pas qui est « je ») | /agence-n8n/ | Réécriture section C |
| 2 | L'article chatbot ne reçoit que 3 liens de contenu (hors page Blog) | /blog/chatbot-site-tpe-utile-ou-gadget/ | Liens 5 et 7 de la section B |
| 2 | JSON-LD : pas de `PriceSpecification` sur la page experts-comptables (les 5 autres pages métier en ont une) | /automatisation/experts-comptables/ | Le prix n'est ajouté que si la FAQ du métier contient « 150 » (`src/seo.js` ligne 104) ; ajouter une question « Combien ça coûte ? » à la FAQ experts-comptables dans `src/data.js`, avec le même texte que les autres métiers |
| 3 | H1 peu descriptifs | /contact/ (« Parlons de votre semaine »), /faq/ (« Questions fréquentes »), /securite/ (« Sécurité et données ») | Facultatif : y glisser le sujet, par ex. « Questions fréquentes sur l'automatisation et l'IA » |
| 3 | Page Blog : 9 ancres identiques « Lire l'article » (en plus du titre) | /blog/ | Facultatif : texte caché aux lecteurs d'écran ou suppression du doublon |
| 3 | `lastmod` présent seulement pour les 9 articles dans le plan du site | sitemap.xml | Facultatif : ajouter une date aux pages métier et à /agence-n8n/ quand elles changent |
| 3 | Limites atteintes pile : titre /tarifs/ à 60 caractères ; descriptions /services/ et /automatisation/boutiques-en-ligne/ à 160 | 3 pages | Rien à faire, mais ne plus rien ajouter à ces textes |

## A. Audit technique (site en ligne)

### Ce qui est conforme

- **Codes HTTP** : 29 adresses sur 29 répondent 200. Sans « / » final, `/tarifs` et `/agence-n8n` redirigent en 301 vers la version avec « / ». `http://` et `www.` redirigent en 301 vers `https://axionstudio.fr/`. Une adresse inconnue renvoie bien 404.
- **Titres** : tous ≤ 60 caractères (entités décodées). Le plus long : /tarifs/ (60).
- **Descriptions** : toutes présentes, toutes ≤ 160. Les plus longues : /services/ et /automatisation/boutiques-en-ligne/ (160), /contact/ et /agence-n8n/ (159), / (158).
- **H1** : exactement un H1 par page, aucun doublon entre pages.
- **Canonicals** : présents sur les 29 pages, égaux à l'adresse de la page avec « / » final. Pas de balise `robots` bloquante.
- **Liens internes** : aucun lien cassé, aucun lien interne sans « / » final, aucun lien vers une page absente du plan du site.
- **JSON-LD** : tous les blocs se lisent sans erreur (parse JSON). Types présents : ProfessionalService, WebSite, BreadcrumbList (sauf accueil), FAQPage sur les pages qui ont une FAQ (tarifs, faq, contact, pages métier, agence-n8n, 4 articles), BlogPosting et Person sur les articles, OfferCatalog sur tarifs et pages métier.
- **robots.txt** : accès ouvert aux moteurs et aux robots des IA, seul `/api/` est fermé, plan du site déclaré.
- **Pages orphelines** : aucune. Toutes les pages reçoivent des liens (menu, pied de page, page Blog).

### Points à corriger

Voir le tableau de résumé (JSON-LD experts-comptables, H1 génériques, ancres « Lire l'article », `lastmod`).

## B. Maillage interne

Comptage : nombre de pages différentes qui pointent vers la page **depuis le contenu** (`<main>`, fil d'Ariane compris, liens vers /contact/ exclus de l'analyse des ancres). Entre parenthèses : en comptant aussi menu et pied de page.

| Liens reçus (contenu) | Page |
|---|---|
| 1 (28) | /mentions-legales/, /cgv/ (normal pour des pages légales) |
| 3 (28) | /methode/, /faq/ |
| 4 (4) | /blog/chatbot-site-tpe-utile-ou-gadget/ (dont la page Blog) |
| 5 | /exemples/, /services/, /agence-n8n/, /confidentialite/, /blog/relances-factures-impayees/, /blog/devis-artisan-automatiser/, /blog/facture-electronique-tpe-2026-2027/ |
| 6 | /blog/prise-rendez-vous-en-ligne-rappels/, /blog/cout-automatisation-petite-entreprise/, /blog/taches-a-automatiser-tpe/ |
| 7 | /automatisation/boutiques-en-ligne/, /securite/, /blog/ia-donnees-clients-regles/ |
| 8 | /blog/n8n-make-zapier-comparatif/ |
| 9 à 12 | accueil, /blog/, /a-propos/, /tarifs/, les 5 autres pages métier |
| 26 | /contact/ |

Constats :
- Les articles ne sont liés ni par le menu ni par le pied de page : ils dépendent entièrement des liens de contenu.
- /exemples/, /methode/, /faq/, /a-propos/ n'ont **aucun** lien de contenu sortant (hors /contact/). /securite/ ne pointe que vers /confidentialite/.
- Aucune des 6 pages métier ne pointe vers /agence-n8n/ ni vers /methode/.

### Liens à ajouter (10)

| # | Page source (endroit) | Ancre proposée | Page cible |
|---|---|---|---|
| 1 | /exemples/ (cas « Demandes de devis ») | préparer un devis d'artisan à partir de la demande | /blog/devis-artisan-automatiser/ |
| 2 | /exemples/ (cas « Reporting et relances ») | automatiser les relances de factures impayées | /blog/relances-factures-impayees/ |
| 3 | /faq/ (réponse « Quels outils utilisez-vous ? ») | comparatif de n8n, Make et Zapier | /blog/n8n-make-zapier-comparatif/ |
| 4 | /a-propos/ (bloc « Qui je suis ») | conception et maintenance de workflows n8n | /agence-n8n/ |
| 5 | /services/ (section « Intelligence artificielle ») | un chatbot sur le site d'une TPE, utile ou gadget | /blog/chatbot-site-tpe-utile-ou-gadget/ |
| 6 | /automatisation/experts-comptables/ (FAQ « Les données de nos clients sont-elles en sécurité ? ») | workflows n8n hébergés sur vos propres serveurs | /agence-n8n/ |
| 7 | /faq/ (réponse « Que deviennent mes données ? ») | ce qu'un chatbot peut faire sans exposer vos clients | /blog/chatbot-site-tpe-utile-ou-gadget/ |
| 8 | /securite/ (règle « 3. L'IA, avec précaution ») | 6 règles pour utiliser l'IA avec des données clients | /blog/ia-donnees-clients-regles/ |
| 9 | /tarifs/ (sous la formule « Projet ») | les étapes, de l'audit gratuit au suivi | /methode/ |
| 10 | /methode/ (exemple de proposition, ligne « Prix ») | ce qui fait varier le prix d'une automatisation | /blog/cout-automatisation-petite-entreprise/ |

Où les placer : les pages métier se règlent dans `src/data.js` (champ `faq` ou `articles`) ; /exemples/, /faq/, /services/, /securite/, /tarifs/, /methode/ sont dans `src/data.js` ou `src/pages/*.jsx` selon la page (à vérifier par l'agent qui fera la modification). Ancres toutes différentes, aucune répétée.

## C. Réponses directes (GEO)

Question principale retenue : celle du H1 et du titre. « Citable » = compréhensible seul, avec le nom Axion Studio, sans « je » ni « vous » sans antécédent.

| Page | Premier paragraphe actuel (début) | Répond en 1 ou 2 phrases citables ? |
|---|---|---|
| /automatisation/artisans-batiment/ | « Sur le chantier toute la journée, vous traitez les demandes de devis… » | Non : décrit le problème |
| /automatisation/experts-comptables/ | « Une grande partie du temps des collaborateurs part dans la collecte des pièces… » | Non : décrit le problème |
| /automatisation/agences-immobilieres/ | « Les demandes des portails arrivent en vrac… » | Non : décrit le problème |
| /automatisation/boutiques-en-ligne/ | « Commandes, stock, suivi des colis et questions des clients : chaque vente entraîne… » | Non : décrit le problème |
| /automatisation/professions-liberales/ | « Seul ou en petite équipe, vous facturez votre temps… » | Non : décrit le problème |
| /automatisation/commerces-restaurants/ | « Le service ou la boutique occupe la journée, et l'administratif se fait après la fermeture… » | Non : décrit le problème |
| /agence-n8n/ | « Je conçois, j'installe et je maintiens des workflows n8n pour les TPE et PME… » | En partie : bonne réponse, mais « je » non citable hors contexte |
| /tarifs/ | « Des projets à partir de 150 €, chiffrés au forfait après l'audit gratuit… » | En partie : manque l'audit offert, le suivi mensuel et le nom |

Les réécritures ci-dessous reprennent uniquement des faits déjà publiés sur le site (tâches listées sur chaque page, audit gratuit de 30 minutes, projets au forfait dès 150 €, suivi dès 250 € par mois sans engagement, travail à distance partout en France). Aucun chiffre nouveau. Pour les pages métier, la phrase s'ajoute **avant** le texte actuel (champ `probleme` dans `src/data.js`, ou nouveau champ affiché sous le H1), qui reste en second paragraphe.

**Artisans du bâtiment**
> Axion Studio automatise pour les artisans du bâtiment les tâches administratives qui se répètent : demandes de devis rangées avec un brouillon prêt à relire, relance des devis non signés et des factures impayées, rendez-vous ajoutés à l'agenda avec un rappel au client. Rien ne part chez le client sans votre accord, et le prix est fixé au forfait, dès 150 €, après un audit gratuit de 30 minutes.

**Experts-comptables**
> Axion Studio automatise pour les cabinets d'expertise comptable la collecte des justificatifs et la relance des pièces manquantes, la lecture et le classement des factures reçues par e-mail, les brouillons de réponse aux questions récurrentes et le suivi des échéances. La saisie validée, la révision et le conseil restent au cabinet.

**Agences immobilières**
> Axion Studio automatise pour les agences immobilières le tri et la qualification des contacts venus des portails, la prise de rendez-vous de visite dans l'agenda du négociateur, les relances des acquéreurs et des vendeurs et la préparation des comptes rendus de visite. L'équipe se concentre sur les rendez-vous, et le projet est chiffré au forfait, dès 150 €, après un audit gratuit.

**Boutiques en ligne**
> Axion Studio automatise pour les boutiques en ligne sur Shopify, WooCommerce ou PrestaShop la mise à jour du stock à chaque vente, l'envoi du numéro de suivi, les réponses aux questions « où en est ma commande ? » et l'export des factures pour le comptable. Ces tâches se font sans intervention, et le prix est fixé au forfait, dès 150 €, après un audit gratuit.

**Professions libérales**
> Axion Studio automatise pour les professions libérales (consultants, architectes, avocats, indépendants) la prise de rendez-vous avec rappel, l'accueil d'un nouveau client, la facturation avec relance des retards et le récapitulatif de la semaine. Chaque heure rendue sur l'administratif peut redevenir une heure facturée.

**Commerces et restaurants**
> Axion Studio automatise pour les commerces et les restaurants les rappels de réservation, les demandes d'avis Google après une visite, le regroupement des commandes fournisseurs et la transmission des factures au comptable. L'administratif ne se fait plus après la fermeture, et le projet est chiffré au forfait, dès 150 €, après un audit gratuit.

**Agence n8n**
> Axion Studio est une agence n8n indépendante qui conçoit, installe et maintient des workflows n8n pour les TPE et PME partout en France : logiciels reliés entre eux, tâches répétitives faites sans vous et IA là où elle est utile. Vous travaillez directement avec la personne qui construit vos workflows, et les projets démarrent à 150 € au forfait.

(Le texte actuel « Je conçois… » peut rester juste après, sans sa première phrase, ou être remplacé.)

**Tarifs**
> Chez Axion Studio, l'audit de 30 minutes est offert, les projets d'automatisation ou de site web sont facturés au forfait à partir de 150 € et le suivi mensuel démarre à 250 € par mois, sans engagement. Le prix exact est fixé après l'audit, avant tout engagement : pas de facturation à l'heure.

Avant d'appliquer : montrer l'avant et l'après à l'utilisateur (règle de l'agent geo-reponses-directes), lancer `npm run build` pour vérifier la typographie (espaces insécables avant « : », « ? », « € » et dans les guillemets), puis attendre le « publie ».
