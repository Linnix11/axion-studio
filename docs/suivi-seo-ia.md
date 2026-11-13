# Suivi SEO et IA (étape 5 du plan)

Un contrôle par mois, 30 minutes. But : savoir si Axion Studio apparaît sur Google **et** dans les réponses
des IA (ChatGPT, Perplexity, Gemini, Google AI Overviews), et ajuster les pages en conséquence.
Plan d'ensemble : `docs/plan-seo-ia.md`.

## 1. Positions Google (Semrush Position Tracking)

Campagne créée le 10 novembre 2026 : France, Google, français, ordinateur, 10 mots-clés.

| Date | Visibilité | Position moyenne | Top 10 | Top 100 | Remarque |
|---|---|---|---|---|---|
| 10 nov. 2026 | 0,08 % | 97,1 | 0 | 1 | Premier jour. Seul « n8n make zapier comparatif » classé (71e, page `/blog/n8n-make-zapier-comparatif/`). |

**Comment lire le premier relevé** : le site est en ligne depuis quelques jours, sans Search Console ni lien
entrant. Une position moyenne de 97 veut surtout dire « pas encore classé » (Semrush compte 100 pour une page hors
du top 100). C'est normal à ce stade. Les leviers, par ordre d'effet :
1. Search Console et Bing Webmaster Tools, avec envoi du plan du site (sans eux, Google découvre les pages lentement).
2. Assouplir l'anti-robots Hostinger (Bingbot et GPTBot bloqués).
3. Les premiers liens et fiches : Google Business, LinkedIn, Malt, annuaires (`docs/kit-profils.md`).
4. Le contenu : 2 articles par mois, et des titres qui reprennent la recherche exacte.

**Mots-clés suivis et page visée** (à compléter avec les 5 autres mots-clés de la campagne) :

| Mot-clé | Page visée |
|---|---|
| automatisation tpe | `/` |
| automatisation pme | `/` |
| automatisation agence immobilière | `/automatisation/agences-immobilieres/` |
| automatisation cabinet expertise comptable | `/automatisation/experts-comptables/` |
| n8n make zapier comparatif | `/blog/n8n-make-zapier-comparatif/` |

À ajouter dans Semrush quand le contenu existe : « relance facture impayée automatique », « automatisation artisan »,
« facture électronique tpe 2026 », « consultant n8n ».

## 2. Les 20 questions à poser aux IA

Les poser chaque mois, dans une **fenêtre privée sans compte** (sinon l'historique fausse la réponse), à ChatGPT
(avec recherche web), Perplexity, Gemini, et dans Google (AI Overviews). Noter : cité (lien ou nom), mentionné
sans lien, ou absent, et qui est cité à la place.

**Trouver un prestataire**
1. Quel consultant pour automatiser les tâches administratives d'une TPE en France ?
2. Qui peut m'aider à automatiser mes devis d'artisan ?
3. Freelance n8n en France : qui recommander ?
4. Consultant en automatisation dans le Val-d'Oise ?
5. Combien coûte l'automatisation des tâches d'une petite entreprise ?
6. Agence ou freelance pour automatiser ma PME : que choisir ?

**Par métier**
7. Comment automatiser la collecte des justificatifs dans un cabinet d'expertise comptable ?
8. Comment une agence immobilière peut-elle automatiser le traitement des contacts des portails ?
9. Quels outils pour automatiser une boutique en ligne (stock, commandes, suivi client) ?
10. Comment un restaurant peut-il automatiser ses réservations et ses avis ?
11. Quelles tâches une profession libérale peut-elle automatiser ?

**Par problème**
12. Comment automatiser les relances de factures impayées ?
13. Facture électronique 2026-2027 : que doit faire une TPE ?
14. n8n, Make ou Zapier : lequel choisir pour une TPE ?
15. Quelles tâches automatiser en priorité dans une petite entreprise ?
16. Peut-on utiliser l'IA avec les données de ses clients sans risque (RGPD) ?
17. Un chatbot sur le site d'une TPE, est-ce utile ?
18. Comment relier Gmail, Google Agenda et un tableur automatiquement ?
19. Comment lire automatiquement ses factures fournisseurs avec l'IA ?
20. Combien de temps une TPE perd-elle en tâches administratives ?

## 3. Tableau de suivi mensuel

Une ligne par question et par mois. Colonnes : C = ChatGPT, P = Perplexity, G = Gemini, A = Google AI Overviews,
**W = recherche web faite par l'agent** (les sources que ces IA utilisent quand elles cherchent sur le web).
Valeurs : **oui** (cité avec lien), **nom** (cité sans lien), **non**, vide = pas encore posé.

Aucune clé d'API d'IA n'est disponible dans l'environnement (et il ne faut pas en mettre dans le dépôt) :
la colonne W a été remplie par l'agent avec une vraie recherche web, les colonnes C, P, G et A restent à remplir
par Arthur en fenêtre privée (liste prête au § 5).

### Relevé de novembre 2026 (premier relevé, 13 nov. 2026)

Contexte : site en ligne depuis une dizaine de jours, anti-robot Hostinger bloquant encore GPTBot et Bingbot,
aucun profil externe publié. **Axion Studio est absent des 20 questions, ce qui est attendu.** L'intérêt du relevé
est de savoir qui est cité à sa place.

| Mois | Question | C | P | G | A | W | Cités à la place (et pourquoi) |
|---|---|---|---|---|---|---|---|
| nov. 2026 | 1. Consultant TPE France | | | | | non | Profils **Malt** (quasi tout le haut de page), Cegid, La Poste Mag, lessentieldeleco → plateforme de freelances |
| nov. 2026 | 2. Devis d'artisan | | | | | non | **Obat, EBP, Tolteck, ArtisanSmart, Sellsy, Axonaut, Henrri, Abby** ; comparateurs appvizer, Capterra, LaFabriqueDuNet ; services ComeUp → éditeurs de logiciels + comparateurs |
| nov. 2026 | 3. Freelance n8n France | | | | | non | **Malt uniquement** (une vingtaine de profils, aucun site personnel) → plateforme de freelances |
| nov. 2026 | 4. Val-d'Oise | | | | | non | Presque rien de pertinent : offres d'emploi (Randstad, France Travail, Michael Page), CEEVO 95, **1 seul profil Malt à Cergy-Pontoise** → niche quasi vide |
| nov. 2026 | 5. Coût de l'automatisation | | | | | non | Blogs d'éditeurs et d'agences : beancount.io, Bluehost, Mailchimp, Abby, The Intelligence Academy, FlowHunt, Studeria → blogs « guide de prix » |
| nov. 2026 | 6. Agence ou freelance | | | | | non | **Annuaires d'agences : Codeur.com, LaFabriqueDuNet, impli.fr, HelloDarwin** ; blogs d'agences Tensoria, Hackceleration → annuaires |
| nov. 2026 | 7. Justificatifs en cabinet comptable | | | | | non | **Dext, Tiime, Qonto, Agiris (Bobbee), Lido** ; Lefebvre Dalloz, FrenchWeb, appvizer → éditeurs métier |
| nov. 2026 | 8. Leads des portails immobiliers | | | | | non | **Parseur, HubSpot, Brevo, Pipedrive, RealAdvisor** ; services ComeUp ; blog d'agence Tensoria → éditeurs CRM |
| nov. 2026 | 9. Boutique en ligne | | | | | non | **Shopify (3 pages), ShippyPro, Zoho, eDesk, Linnworks, WiziShop** ; TheRetailExec → éditeurs e-commerce |
| nov. 2026 | 10. Restaurant | | | | | non | **Zenchef, Eat App, Tableo, Qamarero, Lightspeed, Square, Jotform** ; digidop, appvizer, ComeUp → éditeurs métier |
| nov. 2026 | 11. Profession libérale | | | | | non | La Poste Mag, **Indy, EBP**, LeCoinDesEntrepreneurs, tool-advisor, independant.io, **CCI des Landes (PDF)** ; ComeUp, Malt |
| nov. 2026 | 12. Relances d'impayés | | | | | non | **Sellsy, Pennylane, Tiime, Agicap, Cegid, Clearnox, Billabex, HighRadius** ; L'Expert-Comptable, appvizer ; 4 services ComeUp → éditeurs + places de marché |
| nov. 2026 | 13. Facture électronique | | | | | non | Mon Expert en Gestion, **Propulse by CA, les-aides.fr, ma-facture-electronique.org**, In Extenso, Keobiz, Sellsy, tpeactu → aucun site officiel (.gouv) dans le haut de page |
| nov. 2026 | 14. n8n, Make ou Zapier | | | | | non | **Digidop, Parseur, Tensoria, Studeria, virtua.cloud, comparepdp, G2** → comparatifs d'agences et d'éditeurs, très concurrentiel |
| nov. 2026 | 15. Quoi automatiser en priorité | | | | | non | beancount.io, ActiveCampaign, **Sage**, Bluehost, Parseur, NinjaOne, Mailchimp, agence Scroll |
| nov. 2026 | 16. IA et RGPD | | | | | non | **CNIL (fiche IA TPE/PME en PDF), CCI Paris Île-de-France, Banque de France** ; Juritravail, CMS Law, UCM → sources institutionnelles et juridiques |
| nov. 2026 | 17. Chatbot sur un site de TPE | | | | | non | comparateur-ia.com, LaFabriqueDuNet, tpeactu, HubSpot, **France Num (.gouv)**, ComeUp |
| nov. 2026 | 18. Gmail, Agenda et tableur | | | | | non | **Google Workspace Studio (doc officielle), Zapier, Mailmeteor, ClickUp** ; beaucoup de Fiverr et ComeUp → doc officielle + micro-services |
| nov. 2026 | 19. Factures fournisseurs et IA | | | | | non | **Parseur, Esker, ABBYY, FlowHunt, Snowflake** ; beancount, kolonell, imagetotable → éditeurs d'OCR et de comptabilité fournisseurs |
| nov. 2026 | 20. Temps perdu en administratif | | | | | non | **Sage (120 à 142 jours/an), étude American Express-Ipsos (132 h/an), EBP** ; petite-entreprise.net, Harvest → le chiffre repris partout vient de Sage |

### Deux recherches de contrôle (même jour)

| Recherche | Résultat |
|---|---|
| « Axion Studio automatisation IA TPE Montlignon » | **Aucun résultat pour Axion Studio.** Confusions de nom : Axion-IA (Product Hunt), Axionyx Consulting (Malt), PrimeAxis (ComeUp), AION (HCLTech), IAxion (Les Pépites Tech). À surveiller : le nom n'est pas unique. |
| « agence n8n France automatisation » | impli.fr, Tensoria, LaFabriqueDuNet, Blck Alpaca, AY Automate, n8n Lab (Paris), Hackceleration, Sequance (Lyon), Hyperstack, The Intelligence Academy. Mention de l'annuaire officiel **experts.n8n.io** et de « plus de 1 400 profils n8n sur Malt en France ». |

Si une question reste à « non » partout pendant 3 mois alors qu'un article y répond : retoucher le début de
l'article (réponse directe en 2-3 phrases), ajouter une FAQ, et le citer dans un post LinkedIn.
Le premier contrôle « 3 mois » aura donc lieu au relevé de **janvier 2027**.

## 4. Analyse du relevé de novembre 2026

### Les 3 types de sources qui ressortent le plus

1. **Les plateformes de freelances** (Malt surtout, puis ComeUp, Fiverr, Codeur.com). Dès que la question
   commence par « qui peut m'aider… », le haut de page est fait de **fiches de profils**, pas de sites d'entreprise.
   Malt sort sur les questions 1, 3, 4, 11 et domine complètement la question 3.
2. **Les blogs des éditeurs de logiciels** (Shopify, Sellsy, Pennylane, Dext, Tiime, Qonto, Sage, Cegid, EBP,
   Parseur, Agicap, Esker…). Ils occupent toutes les questions « comment faire » et « combien ça coûte »
   (5, 7, 9, 10, 12, 15, 19, 20). Ce sont de gros sites, anciens, avec beaucoup de pages sur un même sujet.
3. **Les annuaires et comparateurs d'agences** (impli.fr, LaFabriqueDuNet, Codeur.com, HelloDarwin, appvizer,
   Capterra, Clutch), accompagnés des **blogs comparatifs d'agences concurrentes** (Tensoria, Digidop,
   Hackceleration, Blck Alpaca, Studeria). Ils tiennent les questions 2, 6, 14 et « agence n8n France ».

Deux remarques en plus :
- Sur les questions **réglementaires** (13, 16, 17), les IA citent volontiers des sources institutionnelles
  (CNIL, CCI, France Num, Banque de France) — mais sur la facture électronique, **aucun site officiel** n'est
  sorti : la place est prise par des cabinets et des éditeurs. C'est une vraie ouverture pour l'article d'Axion Studio.
- La question **4 (Val-d'Oise)** ne donne presque rien d'utile : offres d'emploi d'automaticien et un seul
  profil Malt à Cergy-Pontoise. **Personne n'occupe ce terrain local.**

### Ce qu'Arthur devrait obtenir en priorité pour y figurer

| Priorité | Action | Pourquoi |
|---|---|---|
| 1 | **Profil Malt complet** (titre « Consultant automatisation et IA n8n — TPE/PME », Val-d'Oise + France, tarif, 2 ou 3 cas) | C'est la source n° 1 citée sur « qui peut m'aider ». Gratuit, rapide, et le profil se positionne vite. |
| 2 | **Inscription à l'annuaire officiel des experts n8n** (experts.n8n.io) et aux annuaires d'agences : impli.fr, LaFabriqueDuNet, Codeur.com, HelloDarwin | Ce sont les pages que les IA citent pour « agence n8n France » et « agence ou freelance ». Un lien depuis n8n.io est aussi un lien de forte confiance. |
| 3 | **Fiche Google Business vérifiée + PagesJaunes + CCI Val-d'Oise** | Le terrain local est vide (question 4). C'est la seule question où Axion Studio peut passer devant vite. |
| 4 | **Débloquer GPTBot et Bingbot dans le hPanel Hostinger** | Tant que c'est bloqué, aucune des actions ci-dessus ne pourra ramener l'IA vers axionstudio.fr. C'est le préalable technique. |
| 5 | **Donner des chiffres sourcés et datés dans les articles** (temps perdu, coût d'un projet, délais) | Les IA citent la page qui porte le chiffre (Sage pour les 142 jours, les éditeurs pour les prix). Sans chiffre repérable, un article n'est pas cité, seulement lu. |
| 6 | **Un comparatif « n8n, Make ou Zapier pour une TPE » très concret** (prix réels, cas d'usage, RGPD) | C'est la question la plus concurrentielle (14), mais celle où Axion Studio a le plus de légitimité, et elle amène les bons prospects. |
| 7 | **Avis Google réels** après les premiers clients | Aucun avis ne ressort aujourd'hui pour Axion Studio ; les annuaires classent par avis. Jamais d'avis inventé. |

Point de vigilance : le nom **Axion** est déjà porté par plusieurs acteurs proches du sujet (Axion-IA, Axionyx
Consulting, AION, IAxion). Il faut toujours écrire « Axion Studio » en entier, avec la ville et le domaine,
dans toutes les fiches, pour que les IA ne confondent pas.

## 5. Liste prête à poser en fenêtre privée (colonnes C, P, G, A)

À faire par Arthur, une fois, en fenêtre de navigation privée **sans compte** : ouvrir chatgpt.com (recherche web
activée), perplexity.ai, gemini.google.com et google.fr, poser les 20 questions du § 2, et noter dans le tableau
du § 3 : **oui** (Axion Studio cité avec un lien), **nom** (cité sans lien), **non** (absent), plus les noms cités
à la place. Compter environ 30 minutes par IA. Si une IA cite un concurrent intéressant, l'ajouter à la colonne
« Cités à la place ».
