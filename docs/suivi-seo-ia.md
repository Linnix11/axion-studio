# Suivi SEO et IA (étape 5 du plan)

Un contrôle par mois, 30 minutes. But : savoir si Axion Studio apparaît sur Google **et** dans les réponses
des IA (ChatGPT, Perplexity, Gemini, Google AI Overviews), et ajuster les pages en conséquence.
Plan d'ensemble : `docs/plan-seo-ia.md`.

## 1. Positions Google (Semrush Position Tracking)

Campagne créée le 10 novembre 2026 : France, Google, français, ordinateur, 10 mots-clés.

| Date | Visibilité | Position moyenne | Top 10 | Top 100 | Remarque |
|---|---|---|---|---|---|
| 10 nov. 2026 | 0,08 % | 97,1 | 0 | 1 | Premier jour. Seul « n8n make zapier comparatif » classé (71e, page `/blog/n8n-make-zapier-comparatif/`). |

**Comment lire le premier relevé** : le site est en ligne depuis quelques jours, sans Search Console ni lien
entrant. Une position moyenne de 97 veut surtout dire « pas encore classé » (Semrush compte 100 pour une page hors
du top 100). C'est normal à ce stade. Les leviers, par ordre d'effet :
1. Search Console et Bing Webmaster Tools, avec envoi du plan du site (sans eux, Google découvre les pages lentement).
2. Assouplir l'anti-robots Hostinger (Bingbot et GPTBot bloqués).
3. Les premiers liens et fiches : Google Business, LinkedIn, Malt, annuaires (`docs/kit-profils.md`).
4. Le contenu : 2 articles par mois, et des titres qui reprennent la recherche exacte.

**Mots-clés suivis et page visée** (à compléter avec les 5 autres mots-clés de la campagne) :

| Mot-clé | Page visée |
|---|---|
| automatisation tpe | `/` |
| automatisation pme | `/` |
| automatisation agence immobilière | `/automatisation/agences-immobilieres/` |
| automatisation cabinet expertise comptable | `/automatisation/experts-comptables/` |
| n8n make zapier comparatif | `/blog/n8n-make-zapier-comparatif/` |

À ajouter dans Semrush quand le contenu existe : « relance facture impayée automatique », « automatisation artisan »,
« facture électronique tpe 2026 », « consultant n8n ».

## 2. Les 20 questions à poser aux IA

Les poser chaque mois, dans une **fenêtre privée sans compte** (sinon l'historique fausse la réponse), à ChatGPT
(avec recherche web), Perplexity, Gemini, et dans Google (AI Overviews). Noter : cité (lien ou nom), mentionné
sans lien, ou absent, et qui est cité à la place.

**Trouver un prestataire**
1. Quel consultant pour automatiser les tâches administratives d'une TPE en France ?
2. Qui peut m'aider à automatiser mes devis d'artisan ?
3. Freelance n8n en France : qui recommander ?
4. Consultant en automatisation dans le Val-d'Oise ?
5. Combien coûte l'automatisation des tâches d'une petite entreprise ?
6. Agence ou freelance pour automatiser ma PME : que choisir ?

**Par métier**
7. Comment automatiser la collecte des justificatifs dans un cabinet d'expertise comptable ?
8. Comment une agence immobilière peut-elle automatiser le traitement des contacts des portails ?
9. Quels outils pour automatiser une boutique en ligne (stock, commandes, suivi client) ?
10. Comment un restaurant peut-il automatiser ses réservations et ses avis ?
11. Quelles tâches une profession libérale peut-elle automatiser ?

**Par problème**
12. Comment automatiser les relances de factures impayées ?
13. Facture électronique 2026-2027 : que doit faire une TPE ?
14. n8n, Make ou Zapier : lequel choisir pour une TPE ?
15. Quelles tâches automatiser en priorité dans une petite entreprise ?
16. Peut-on utiliser l'IA avec les données de ses clients sans risque (RGPD) ?
17. Un chatbot sur le site d'une TPE, est-ce utile ?
18. Comment relier Gmail, Google Agenda et un tableur automatiquement ?
19. Comment lire automatiquement ses factures fournisseurs avec l'IA ?
20. Combien de temps une TPE perd-elle en tâches administratives ?

## 3. Tableau de suivi mensuel

Une ligne par question et par mois. Colonnes : C = ChatGPT, P = Perplexity, G = Gemini, A = Google AI Overviews.
Valeurs : **oui** (cité avec lien), **nom** (cité sans lien), **non**.

| Mois | Question | C | P | G | A | Cités à la place |
|---|---|---|---|---|---|---|
| nov. 2026 | 1 | | | | | |
| nov. 2026 | 2 | | | | | |

Si une question reste à « non » partout pendant 3 mois alors qu'un article y répond : retoucher le début de
l'article (réponse directe en 2-3 phrases), ajouter une FAQ, et le citer dans un post LinkedIn.
