# Vague 6 : mise à jour du contenu, FAQ (GEO), H1

Agents : seo-mise-a-jour-contenu, geo-faq, seo-titres-descriptions. Date : 11 novembre 2026.
Mission en lecture seule : aucun fichier du site n'a été modifié, rien n'a été commité.

## En bref

1. **Urgent (1 point)** : l'assistant du site tourne sur l'offre gratuite de l'API Gemini. Or les conditions de Google (en vigueur depuis le 23 mars 2026) imposent l'offre **payante** quand le service est proposé à des utilisateurs de l'Espace économique européen. L'article sur le chatbot décrit donc une situation non conforme, et sa phrase sur la réutilisation des échanges est inexacte pour l'Europe.
2. Les autres règles vérifiées sont **toujours exactes** au 11 novembre 2026 : calendrier de la facture électronique (septembre 2026 puis septembre 2027), pénalités de retard et indemnité de 40 €, règles CNIL de prospection par SMS et e-mail, AI Act (article 50 en vigueur depuis le 2 août 2026, non reporté par l'omnibus), cadre États-Unis (décision d'adéquation toujours en vigueur).
3. Quelques ajouts facultatifs (source plus à jour, nouveau régime du démarchage téléphonique, une virgule manquante).
4. FAQ proposées pour 4 articles, /agence-n8n/ et /services/ (contenu déjà publié uniquement).
5. H1 proposés pour /contact/, /faq/, /securite/. Tous les titres et descriptions de `src/seo.js` respectent les limites (60 / 160).

---

## 1. Corrections urgentes

### 1.1 Chatbot et offre gratuite de Gemini (article `chatbot-site-tpe-utile-ou-gadget`, et réglage du site)

**Ce que disent les conditions de l'API Gemini** (https://aistudio.google.com/docs/terms, en vigueur depuis le 23 mars 2026) :
- section « Use Restrictions » : « You may use only Paid Services when making API Clients available to users in the European Economic Area, Switzerland, or the United Kingdom » ;
- section « Unpaid Services » : pour un utilisateur situé dans l'EEE, en Suisse ou au Royaume-Uni, les règles d'usage des données des offres payantes s'appliquent aussi aux offres gratuites.

Le chatbot d'axionstudio.fr est mis à disposition de visiteurs en France : selon ces conditions, il doit utiliser l'offre payante. Ce n'est pas un point de texte seulement : **il faut activer la facturation sur le projet Google**, puis passer `geminiFreeTier` à `false` dans `src/chatbot.js` (les mentions « offre gratuite » disparaissent alors du chat, de /confidentialite/ et de /securite/). Décision et action à faire par l'utilisateur.

Corrections de texte à appliquer en même temps :

| Endroit | Avant | Après |
|---|---|---|
| Partie « Combien ça coûte », 1er paragraphe | « Il existe une offre gratuite limitée, mais Google peut alors utiliser les échanges pour améliorer ses services, ce qui n’est pas le cas des offres payantes. » | « Il existe une offre gratuite limitée, mais les conditions de Google réservent l’offre payante aux services proposés à des utilisateurs situés en Europe (Espace économique européen), ce qui est le cas d’un chatbot sur le site d’une entreprise française. Avec l’offre payante, Google indique ne pas utiliser les échanges pour améliorer ses produits. » |
| Partie « Un exemple réel », dernier point | « Il fonctionne aujourd’hui avec l’offre gratuite de Gemini, ce qui est signalé dans la fenêtre du chat et dans la [politique de confidentialité](/confidentialite/). » | « Il utilise l’offre payante de l’API Gemini : selon les conditions de Google, les échanges ne servent pas à améliorer ses produits. Le détail figure dans la [politique de confidentialité](/confidentialite/). » (seulement **après** activation de la facturation) |
| FAQ « Combien coûte un chatbot… ? » | « …une offre gratuite limitée existe, avec réutilisation possible des échanges par le fournisseur. » | « …l’offre gratuite n’est pas prévue pour un service proposé à des visiteurs européens ; un plafond quotidien garde le coût sous contrôle. » |
| Ligne « Sources » | (pas de lien vers les conditions) | Ajouter : [Google, conditions de l’API Gemini](https://aistudio.google.com/docs/terms) |

Ajouter `updated: '2026-11-11'` à l'article une fois corrigé.

---

## 2. Vérification article par article

Seuls les points datés ou réglementaires sont listés. « Exact » = rien à changer.

### rgpd-automatisation-tpe (11 novembre 2026)
- Articles 5, 12, 13, 22, 28, 30, 33, 34 du RGPD, délais (un mois + deux mois, 72 heures), repères CNIL de conservation (3 ans prospects, 10 ans facturation) : exact.
- Décision d'adéquation États-Unis du 10 juillet 2023 : toujours en vigueur. Le Tribunal de l'UE a rejeté le recours le 3 septembre 2025 ; un pourvoi est pendant devant la Cour de justice. La phrase « Ce cadre peut bouger » reste juste. Facultatif : « …un pourvoi contre la décision de 2023 est en cours devant la Cour de justice de l’UE. » (source : https://www.cnil.fr/fr/adequation-des-etats-unis-les-premieres-questions-reponses ; à vérifier sur curia.europa.eu avant d'ajouter).
- **Coquille dans l'accroche** : « le lieu d’hébergement des données la façon de répondre » → « le lieu d’hébergement des données, la façon de répondre ».

### chatbot-site-tpe-utile-ou-gadget (10 novembre 2026)
- Voir 1.1 (urgent).
- AI Act, article 50 (informer qu'on parle à une IA) applicable depuis le 2 août 2026 : exact. L'omnibus numérique sur l'IA, entré en vigueur fin juillet 2026, a reporté les règles « haut risque » (décembre 2027 / août 2028) ; les paragraphes 1 et 2 de l'article 50 ne portent pas de mention de modification sur le service d'assistance de la Commission (https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50). La phrase de l'article est exacte. Ne pas ajouter le numéro du règlement omnibus sans l'avoir lu sur EUR-Lex (les sources secondaires citent le règlement (UE) 2026/1744).

### devis-artisan-automatiser
- Arrêté du 24 janvier 2017 (devis obligatoire pour dépannage, réparation et entretien chez les particuliers) : exact, corrections de la vague précédente déjà appliquées. Rien à changer.

### prise-rendez-vous-en-ligne-rappels
- Rappel lié au service sans consentement marketing, consentement préalable du particulier pour la prospection sauf clients existants (produits ou services analogues) : exact. Page CNIL source mise à jour le 10 juin 2026, titre exact « La prospection commerciale par courrier électronique, SMS-MMS et automate d’appel » : l'encadré est déjà à jour.
- Facultatif, nouveauté à mentionner dans « Ce que dit la règle » : « De même, depuis le 11 août 2026, le démarchage téléphonique des particuliers exige leur consentement préalable, sauf appel en lien avec un contrat en cours. » Source : CNIL, https://www.cnil.fr/fr/prospection-commerciale-par-telephone-hors-automate-dappel-quelles-sont-les-regles (article L. 223-1 du Code de la consommation, loi du 30 juin 2025 ; décret n° 2026-662 du 23 juillet 2026).

### relances-factures-impayees
- Délais L. 441-10, pénalités sans rappel, taux par défaut BCE + 10 points, plancher de trois fois le taux d'intérêt légal, 40 € (D. 441-5), règles pour les particuliers : exact (entreprendre.service-public.gouv.fr F23211, vérifiée le 7 août 2026 : 12,40 % au 2e semestre 2026, plancher 8,25 %). L'article ne cite pas de taux chiffré : rien ne périme.
- Facultatif : la source Bpifrance affiche encore des taux de 2025. Ajouter en tête de la ligne « Sources » : [entreprendre.service-public.gouv.fr, retard de paiement entre professionnels](https://entreprendre.service-public.gouv.fr/vosdroits/F23211).

### facture-electronique-tpe-2026-2027
- Réception obligatoire pour toutes les entreprises depuis le 1er septembre 2026 ; émission et e-reporting au 1er septembre 2027 pour PME, TPE et micro-entreprises ; nouvelles mentions (SIREN du client, etc.) : exact. La loi de finances 2026 n'a pas changé ce calendrier (impots.gouv.fr, page mise à jour le 1er septembre 2026 ; service-public A15683, mise à jour du 27 février 2026).
- Sanctions : la loi de finances 2026 les a durcies, mais les montants trouvés (50 € par facture, plafond annuel) viennent de sources secondaires. **Ne rien ajouter** tant que le chiffre n'est pas lu sur Légifrance ou impots.gouv.fr ; l'encadré actuel (« les règles détaillées (cas particuliers, sanctions) évoluent ») suffit.

### cout-automatisation, taches-a-automatiser, n8n-make-zapier, ia-donnees-clients
- Pas de règle de droit datée. Rien à corriger. L'article « IA et données clients » dit que les versions gratuites « peuvent utiliser vos échanges » : reste vrai en général (formulé au conditionnel).

---

## 3. FAQ proposées (GEO)

Uniquement des faits déjà publiés sur le site (blog, `src/data.js`, `src/n8n.js`). Aucun chiffre nouveau. Questions formulées autrement que celles de /faq/ et de la FAQ n8n existante, pour éviter les doublons.

### cout-automatisation-petite-entreprise (champ `faq`)
1. **Combien coûte la mise en place d’une automatisation chez Axion Studio ?** Chaque projet est chiffré au forfait après un audit gratuit de 30 minutes et démarre à 150 €. Le prix exact figure dans la proposition, avant tout engagement, et ne change pas en cours de projet.
2. **Quels coûts mensuels prévoir après la mise en place ?** L’abonnement aux outils (n8n, Make, Zapier, service d’IA), souscrit à votre nom, et, si vous le souhaitez, un suivi facultatif et sans engagement, à partir de 250 € par mois.
3. **Comment savoir si une automatisation sera rentable ?** Estimez le temps passé sur la tâche chaque semaine, multipliez par 47 semaines puis par la valeur d’une heure de votre temps, et comparez au coût de mise en place et des abonnements sur un an. Une tâche de 10 minutes par mois ne mérite souvent pas d’être automatisée.

### taches-a-automatiser-tpe (champ `faq`)
1. **Quelles tâches automatiser en premier dans une petite entreprise ?** Le traitement des demandes de devis, les relances de factures impayées, le classement des factures et justificatifs, le reporting hebdomadaire et les réponses aux questions qui reviennent.
2. **Comment savoir si une tâche peut être automatisée ?** Elle revient au moins chaque semaine, suit toujours les mêmes étapes et ses informations existent déjà sous forme numérique (e-mail, formulaire, tableur, PDF). Recopier une information d’un outil à un autre est presque toujours automatisable.
3. **Combien de temps pour mettre en place une première automatisation ?** Une automatisation simple se met en place en une à deux semaines, tests compris, et sert ensuite de base aux suivantes.

### n8n-make-zapier-comparatif (champ `faq`)
1. **Quelle est la différence entre n8n, Make et Zapier ?** Zapier est le plus simple à prendre en main mais son coût grimpe avec le volume. Make présente chaque scénario sous forme de schéma et reste généralement plus économique à volume égal. n8n peut être installé sur votre propre serveur, et son coût ne dépend alors plus du nombre d’exécutions.
2. **Quel outil d’automatisation choisir quand les données sont sensibles ?** n8n installé sur votre propre serveur garde les données sous votre contrôle. Il faut alors prévoir un hébergement à maintenir.
3. **Sur quels critères choisir son outil d’automatisation ?** Les logiciels que vous utilisez déjà, le volume d’exécutions par mois, la sensibilité des données et la facilité de reprise par vous ou par quelqu’un d’autre.

### ia-donnees-clients-regles (champ `faq`)
1. **Peut-on utiliser l’IA avec les données de ses clients ?** Oui, avec des précautions : n’envoyer que les informations utiles à la tâche, choisir des offres professionnelles, tenir les données sensibles à l’écart, relire avant tout envoi au client, informer les clients et garder la possibilité de tout arrêter.
2. **Les versions gratuites des outils d’IA posent-elles un problème ?** Elles peuvent utiliser vos échanges pour améliorer leurs produits. Les offres professionnelles et les API payantes s’engagent généralement à ne pas le faire : lisez les conditions de chaque service.
3. **Faut-il dire à ses clients qu’on utilise l’IA ?** Oui, dans la politique de confidentialité : quelles données, pour quoi faire et avec quel prestataire. C’est une exigence du RGPD.

### /agence-n8n/ (ajouter à `n8n.faq`, qui en a déjà 5)
1. **Faut-il installer n8n sur son propre serveur ?** Non. Axion Studio installe n8n soit sur n8n Cloud, soit sur un serveur à votre nom. L’auto-hébergement garde vos données chez vous et évite une facturation à chaque exécution.
2. **n8n peut-il utiliser l’intelligence artificielle ?** Oui. Un workflow n8n peut appeler les grands modèles d’IA pour lire un document, classer une demande ou rédiger un brouillon, au milieu d’étapes classiques.
3. **Que faire si mon logiciel n’a pas de connecteur n8n ?** Il est relié directement par son API : n8n peut appeler n’importe quelle API quand un connecteur manque.

### /services/ (nouveau : la page n'affiche pas de FAQ ; il faut un bloc d'affichage et un `FAQPage` dans `schemaFor('/services')`)
1. **Quels services propose Axion Studio ?** Quatre : des workflows automatisés, l’intégration de vos outils entre eux, l’intelligence artificielle appliquée à vos tâches et la création de sites web, pour les TPE, PME et indépendants. Les projets démarrent à 150 € au forfait.
2. **Faut-il changer de logiciels pour automatiser ?** Non. Le travail part des outils que vous utilisez déjà ; un nouvel outil n’est proposé que s’il apporte un vrai gain.
3. **Comment l’IA est-elle utilisée dans les projets ?** Là où une tâche demande de lire et de comprendre un texte : trier, résumer, extraire, rédiger un premier jet. Seules les informations utiles sont envoyées au service d’IA, avec une validation humaine quand c’est nécessaire.
4. **Le site web peut-il être relié aux automatisations ?** Oui. Les formulaires du site alimentent directement votre CRM ou votre messagerie, par exemple un formulaire de devis qui crée le contact dans le CRM.

Rappel typographie : le build ajoute les insécables pour `src/n8n.js` (fonction `typo`) ; pour `src/blog.js`, les écrire à la main (avant « ? » et « : »).

---

## 4. H1 et limites des titres

### H1 proposés (champ `title` de `PageHeader`)

| Page | Fichier | H1 actuel | H1 proposé |
|---|---|---|---|
| /contact/ | `src/pages/Contact.jsx` ligne 18 | Parlons de votre semaine | Parlons de votre semaine : audit gratuit de 30 minutes |
| /faq/ | `src/pages/Faq.jsx` ligne 9 | Questions fréquentes | Questions fréquentes sur l’automatisation et l’IA |
| /securite/ | `src/pages/Securite.jsx` ligne 11 | Sécurité et données | Sécurité de vos données et usage de l’IA |

Les trois reprennent la promesse ou le sujet du `<title>` existant, sans fait nouveau. Le H1 s'affiche en très gros (`text-7xl`) : vérifier le rendu sur mobile, et prévoir l'espace insécable avant « : » pour /contact/. Les champs `name` de `src/seo.js` (fil d'Ariane) n'ont pas besoin de changer.

### Longueurs dans `src/seo.js` (titre complet avec « | Axion Studio »)
Toutes les pages respectent les limites. Aucune modification nécessaire. Pages au plafond, à ne pas allonger :
- /tarifs/ : titre de 60 caractères ;
- /services/ et /automatisation/boutiques-en-ligne/ : description de 160 caractères ;
- /contact/ (159) et /agence-n8n/ (159) : description à 1 caractère du plafond.

---

## Sources consultées le 11 novembre 2026
- Google, conditions de l'API Gemini : https://aistudio.google.com/docs/terms
- impots.gouv.fr, facturation électronique : https://www.impots.gouv.fr/professionnel/je-passe-la-facturation-electronique
- entreprendre.service-public.gouv.fr, A15683 : https://entreprendre.service-public.gouv.fr/actualites/A15683
- entreprendre.service-public.gouv.fr, F23211 : https://entreprendre.service-public.gouv.fr/vosdroits/F23211
- CNIL, prospection par e-mail, SMS-MMS et automate : https://www.cnil.fr/fr/la-prospection-commerciale-par-sms-mms
- CNIL, prospection par téléphone : https://www.cnil.fr/fr/prospection-commerciale-par-telephone-hors-automate-dappel-quelles-sont-les-regles
- AI Act Service Desk, article 50 : https://ai-act-service-desk.ec.europa.eu/en/ai-act/article-50
