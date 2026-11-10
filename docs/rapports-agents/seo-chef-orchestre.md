# Chef d'orchestre : actions du 10 au 24 novembre 2026

Agent : seo-chef-orchestre. Date : 10 novembre 2026. Lecture seule : aucun fichier du site modifié, pas de build, rien publié.
Sources lues : `docs/agents-seo.md`, `docs/HANDOFF.md`, `docs/plan-seo-ia.md`, `docs/suivi-seo-ia.md`, les 10 rapports
de `docs/rapports-agents/`, l'historique Git (commits `e0b85c7` et `e8e8ee7`) et quelques contrôles dans `src/`.

## Où on en est

**Fait (ne pas refaire)** : 28 pages indexables, techniquement saines (audit et indexation sans erreur) ; 6 pages métier,
8 articles ; vague 1 des agents appliquée le 10 nov. (15 liens internes, FAQ Contact balisée, prix seulement là où il est
affiché, H1 descriptifs, article relances nuancé, sources de l'article facture électronique, e-mail copiable) ;
nom commercial tranché (« axionstudio », marque « Axion Studio ») ; Search Console branchée, sitemap envoyé,
10 pages demandées à l'indexation.

**Ce qui bloque le plus**, dans l'ordre :
1. **Hors site, rien n'existe encore** : pas de Bing Webmaster Tools, GPTBot bloqué (429) par Hostinger, aucune fiche
   (Google Business, LinkedIn à jour, annuaires), donc `sameAs` vide. Pour Google comme pour les IA, c'est le frein n° 1.
2. **Aucune donnée** : la Search Console vient d'être branchée (premières requêtes visibles sous quelques jours),
   le tableau des 20 questions IA est vide, aucune mesure d'audience choisie.
3. **Le SIRET manque** : il bloque Malt, PagesJaunes, Codeur.com et les réseaux locaux (rapport seo-annuaires).
4. **Contenu** : le calendrier est en avance (8 articles, le plan en demande 2 par mois). Restent 3 nuances du
   vérificateur de faits non appliquées (voir action Claude n° 2).

Conséquence : sur ces deux semaines, l'effet viendra surtout des **actions de l'utilisateur** (débloquer et créer les
premières fiches). Côté Claude, peu de code : un article, des corrections de fond, puis un premier relevé chiffré.

## 3 actions pour Claude (classées par effet attendu)

| # | Action | Agent | Résultat attendu | Temps | Ce que vous faites |
|---|---|---|---|---|---|
| 1 | Écrire l'article n° 5 du calendrier, « Chatbot sur le site d'une TPE : utile ou gadget ? », avec FAQ, sources, et un lien vers `/methode/` et `/faq/` (ces deux pages n'ont que 3 sources de liens, le rapport maillage demande une 4e) ; le relier depuis les pages métier commerces et professions libérales. Faire relire par seo-verificateur-faits avant publication. | seo-redacteur-article, puis seo-verificateur-faits | Une 29e page qui répond à la question IA n° 17 ; `/methode/` et `/faq/` passent à 4 liens reçus. Publication visée la semaine du 17 nov. | 1 h 30 (rédaction et vérification) | Relire l'article (15 min) et dire « publie ». |
| 2 | Appliquer les 3 nuances restantes du rapport seo-verificateur-faits : **devis** (« bâtiment **et équipement de la maison** », corps et FAQ) ; **rendez-vous** (nom actuel de la page CNIL et exception « clients existants » pour la prospection par SMS) ; **facture électronique** (le e-reporting couvre aussi les données de paiement des prestations de services, à contrôler dans le texte). Renseigner `updated` sur les articles retouchés. | seo-mise-a-jour-contenu | Articles exacts au mot près : c'est ce que les IA reprennent et ce qui protège la crédibilité. Date « mis à jour » cohérente dans le JSON-LD. | 30 min | Valider puis dire « publie » (peut partir dans la même publication que l'action 1). |
| 3 | Premier relevé chiffré, **lundi 23 ou mardi 24 nov.** : Search Console (pages indexées ou « détectées, non indexées », premières requêtes, pages vues mais peu cliquées), relevé Semrush, et ligne « nov. 2026 » du tableau des 20 questions IA dans `docs/suivi-seo-ia.md`. En sortie : la liste des pages à retoucher en priorité. | seo-rapport-mensuel (avec geo-suivi-citations pour les 20 questions) | Un point zéro mesuré, pour choisir les actions de décembre sur des faits et non à l'aveugle (titres à retoucher avec seo-titres-descriptions, FAQ avec geo-faq). | 45 min | Donner l'accès en lecture ou un export Search Console (5 min). |

Pas maintenant : retoucher les titres (attendre 3 à 4 semaines de données Search Console), créer une 7e page métier,
partenariats éditoriaux (rapport seo-partenariats : à lancer en décembre, une fois des fiches et des posts en ligne).

## 5 actions pour vous (classées par effet attendu)

| # | Action | Pourquoi | Temps | Guide |
|---|---|---|---|---|
| 1 | **hPanel Hostinger** (une seule visite) : supprimer le jeton API utilisé pendant la session (Profil, puis API), puis assouplir la protection anti-robots ou autoriser GPTBot. | Le jeton est une faille de sécurité (point le plus urgent du HANDOFF). GPTBot reçoit 429 : sans accès, ChatGPT voit mal le site. | 15 min | `docs/HANDOFF.md` § 11 ; `docs/kit-profils.md` |
| 2 | **Bing Webmaster Tools** : ajouter le site par import depuis la Search Console, puis inspecter 2 ou 3 pages pour confirmer que Bingbot passe. | Bing alimente la recherche de ChatGPT, Copilot et DuckDuckGo. IndexNow est déjà en place, mais sans compte vous ne voyez rien. | 10 min | Rapport seo-indexation, § 6 |
| 3 | **Search Console, demandes d'indexation** : 10 pages le **11 nov.**, 5 le **12 nov.** (listes prêtes, dans l'ordre). Puis le **18 nov.**, ouvrir le rapport « Pages » et noter combien sont indexées. | Accélère la découverte des 18 pages restantes, dont la seule déjà classée (comparatif n8n, 71e). | 20 min par jour | Rapport seo-indexation, § 5 |
| 4 | **Fiche Google Business Profile** : la créer (zone desservie, adresse masquée) avec les textes du kit, puis, une fois vérifiée, ajouter les 7 services et la 1re publication (mardi 17 nov. ou dès la vérification). Ensuite, Bing Places en important la fiche Google. Envoyer l'adresse publique de chaque fiche. | Seule source externe qui pèse à la fois sur Google (recherches locales) et sur ses réponses IA. La vérification prend plusieurs jours : à lancer tôt. Chaque adresse envoyée devient un `sameAs` (travail de Claude, sur une branche). | 30 min, puis 10 min par publication | `docs/kit-profils.md` ; rapport seo-google-business |
| 5 | **LinkedIn** : mettre à jour profil et page avec les bannières, nom « Arthur Champagne-Forterre » avec trait d'union et « Fondateur d'Axion Studio », puis publier les posts prêts, **mardi 17 et jeudi 19 nov.** (facture électronique, 5 tâches), puis 24 et 26 nov. | Premiers liens et premières mentions hors site, sans attendre le SIRET. Le profil devient le premier `sameAs` (personne et entreprise). | 30 min, puis 10 min par post | Rapport seo-linkedin ; `marketing/banners/README.md` ; rapport geo-entite, § 3 |

**Dès réception du SIRET** (hors classement, car la date ne dépend pas de vous) : le transmettre pour `src/data.js`,
puis Malt et PagesJaunes (rapport seo-annuaires, priorité 1).
**À choisir quand vous avez 5 min** : l'outil de mesure d'audience sans cookie (Hostinger Analytics ou Plausible) ;
Claude le branche ensuite.

## Calendrier résumé

| Date | Vous | Claude |
|---|---|---|
| 10-11 nov. | hPanel (jeton, anti-robots), Bing Webmaster Tools, 10 demandes d'indexation | |
| 12-13 nov. | 5 demandes d'indexation, création de la fiche Google Business, mise à jour LinkedIn | Article chatbot et 3 nuances (actions 1 et 2), sur branche |
| 17-19 nov. | 2 posts LinkedIn, relecture de l'article, « publie » ; contrôle du rapport « Pages » | Ajout des adresses des profils en `sameAs` dès qu'elles existent |
| 23-24 nov. | 2 posts LinkedIn ; export ou accès Search Console | Premier relevé (action 3) et choix des actions de décembre |

Rappel des règles : aucune manipulation (faux clics, liens en masse, faux avis), aucun chiffre inventé, rien publié
sans votre « publie ».
