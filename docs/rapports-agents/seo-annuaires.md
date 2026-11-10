# Rapport de l'agent seo-annuaires

Date : 10 novembre 2026. Rien n'a été inscrit, rien n'a été modifié dans le site ni dans les autres fichiers.
Ce document liste les plateformes sérieuses où créer une fiche Axion Studio, avec les textes à coller.
C'est vous qui créez les comptes (mot de passe, vérification d'identité, SIRET).

## À lire avant de commencer

1. **Le SIRET bloque presque tout.** `src/data.js` indique encore « En cours d'attribution ». Malt, PagesJaunes,
   Codeur.com (pour répondre aux projets) et les réseaux locaux le demandent. Attendez de l'avoir avant de créer
   ces fiches, sinon elles seront refusées ou incomplètes.
2. **Ordre conseillé** : Google Business d'abord (déjà prévu dans `docs/kit-profils.md`), puis Bing (qui peut
   reprendre la fiche Google), puis le reste. Copiez toujours exactement les mêmes nom, adresse, téléphone et site.
3. **Après chaque fiche créée**, envoyez son adresse publique : elle sera ajoutée à `company.profils`
   (`src/data.js`). Ce n'est pas fait ici, comme demandé.
4. Les liens vers le site finissent toujours par « / » (exemple : `https://axionstudio.fr/agence-n8n/`).

Rappel des informations communes (dans `docs/kit-profils.md`) : Axion Studio, Arthur Champagne-Forterre,
5 allée des Pommiers, 95680 Montlignon, 06 48 61 23 50, arthur.champagne@icloud.com, https://axionstudio.fr/.

## Tableau récapitulatif

| Priorité | Plateforme | Prix | Prérequis | Page du site à lier |
|---|---|---|---|---|
| 1 | Bing Places (Microsoft) | Gratuit | Fiche Google déjà validée (plus simple) | https://axionstudio.fr/ |
| 1 | Malt | Inscription gratuite, commission sur les missions | SIRET | https://axionstudio.fr/agence-n8n/ |
| 1 | PagesJaunes (Solocal) | Fiche de base gratuite, options payantes à refuser | SIRET | https://axionstudio.fr/ |
| 2 | Codeur.com | Profil gratuit ; répondre aux projets : abonnement payant | SIRET (société) pour répondre | https://axionstudio.fr/services/ |
| 2 | Communauté Make, rubrique « Offer Help » | Gratuit | Compte Make | https://axionstudio.fr/services/ |
| 2 | n8n, profil de créateur de modèles | Gratuit | Un modèle de workflow publiable | https://axionstudio.fr/agence-n8n/ |
| 2 | Dynactive (entrepreneurs de Plaine Vallée) | Adhésion payante (montant non affiché) | Entreprise du territoire | https://axionstudio.fr/ |
| 2 | Label #Madein95 (CCI Val-d'Oise) | Coût non indiqué sur la page | Entreprise du 95 | https://axionstudio.fr/ |
| 3 | Apple Business (fiche Plans) | Gratuit pour la fiche | Disponibilité en France à vérifier | https://axionstudio.fr/ |
| 3 | Make, programme Solution Partner | Gratuit si accepté | Formation + certifications Make + expérience client | https://axionstudio.fr/services/ |
| 3 | n8n, programme Expert Partners | Non indiqué | Programme fermé, voir plus bas | https://axionstudio.fr/agence-n8n/ |
| Fait automatiquement | Annuaire des entreprises (État) | Gratuit | SIRET | Rien à faire |

---

## Priorité 1

### Bing Places (Microsoft)
- **Pourquoi** : Bing alimente ChatGPT, Copilot et DuckDuckGo ; c'est le pendant de la fiche Google.
- **Adresse** : https://www.bing.com/forbusiness/ (l'ancienne adresse bingplaces.com y redirige, vérifié le 10/11/2026).
- **Prix** : gratuit.
- **Astuce** : une fois la fiche Google validée, choisir l'import depuis Google Business Profile (option signalée
  par plusieurs guides, à confirmer à l'écran).
- **Catégorie** : « Consultant en informatique » (ou l'équivalent le plus proche proposé : « Computer Consultant »,
  « Information Technology Services »).
- **Textes** : description longue du kit (750 caractères). Masquer l'adresse, zone desservie : Île-de-France, puis France.
- **Lien** : https://axionstudio.fr/

### Malt
- **Pourquoi** : première plateforme de freelances en France, profils bien positionnés sur Google pour
  « consultant n8n » ou « freelance automatisation ».
- **Adresse** : https://www.malt.fr/ → « Je suis freelance » / créer un profil.
- **Prix** : inscription gratuite ; Malt prélève des frais de service sur chaque mission payée par la plateforme.
  Le taux exact varie selon les sources (barème à lire dans les conditions de Malt au moment de l'inscription) ;
  attention, ces frais sont soumis à la TVA, ce qui compte pour une micro-entreprise non assujettie.
- **Prérequis** : SIRET ; attestation de vigilance URSSAF demandée pour les grosses missions.
- **Catégorie / métier** : Tech → « Consultant automatisation » ou « Développeur no-code » (prendre l'intitulé le plus proche proposé).
- **Titre du profil** : `Consultant automatisation n8n / Make et IA pour TPE-PME`
- **Présentation** (description longue du kit, adaptée « je ») :
  > J'aide les TPE, PME et indépendants à se libérer des tâches administratives répétitives. Demandes de devis rangées toutes seules, relances de factures qui partent à date fixe, factures fournisseurs classées et transmises au comptable, rendez-vous dans l'agenda avec rappel au client : chaque automatisation relie les outils que vous utilisez déjà (messagerie, agenda, tableur, CRM, logiciel de facturation), avec de l'intelligence artificielle quand elle fait vraiment gagner du temps. Chaque projet commence par un audit gratuit de 30 minutes, le prix est fixé avant de commencer et vous gardez tout : comptes, workflows et documentation. Basé à Montlignon (Val-d'Oise), j'interviens partout en France à distance.
- **Compétences** : n8n, Make, Zapier, API, automatisation, intégration IA, Google Workspace, Microsoft 365.
- **Lien** (champ site ou portfolio) : https://axionstudio.fr/agence-n8n/ ; en réalisations, reprendre les exemples de https://axionstudio.fr/exemples/ (uniquement de vrais projets).
- **Tarif journalier** : à fixer par vous ; ne pas inventer de chiffre.

### PagesJaunes (Solocal)
- **Pourquoi** : annuaire de référence en France, très lu par Google et les IA pour vérifier qu'une entreprise existe.
- **Adresse** : https://www.pagesjaunes.fr/ → espace professionnels, ou l'application gratuite Solocal Manager.
  Chercher d'abord « Axion Studio Montlignon » : si une fiche existe déjà (créée d'après le SIRET), la revendiquer ;
  sinon, la créer. Solocal valide souvent par un appel téléphonique.
- **Prix** : fiche de base gratuite. Solocal propose ensuite des offres payantes par téléphone : les refuser,
  elles ne sont pas nécessaires. (Je n'ai pas pu ouvrir la page officielle actuelle, accès bloqué au robot :
  vérifiez à l'écran qu'aucun paiement n'est demandé.)
- **Activité** : « Conseil en informatique » (sinon « Informatique : services »).
- **Texte** : description moyenne du kit (300 caractères).
- **Zone** : Île-de-France.
- **Lien** : https://axionstudio.fr/

---

## Priorité 2

### Codeur.com
- **Adresse** : https://www.codeur.com/ → inscription prestataire (explications : https://www.codeur.com/comment-ca-marche-pour-les-prestataires).
- **Prix** (page officielle des tarifs, vérifiée le 10/11/2026) : compte gratuit (profil, portfolio, alertes projets par e-mail) ;
  pour répondre aux projets, abonnement à partir de 31,90 € HT par mois, sans engagement ; commission de 4 %
  (minimum 5 € HT) sur les projets gagnés.
- **Conseil** : créer le profil gratuit maintenant (il apparaît dans Google), ne prendre l'abonnement que si
  vous voulez vraiment répondre aux appels d'offres.
- **Catégories** : Développement web, Automatisation / No-code, Intelligence artificielle (cocher celles proposées).
- **Titre** : `Consultant automatisation n8n / Make et IA pour TPE-PME`
- **Présentation** : même texte que Malt.
- **Lien** : https://axionstudio.fr/services/

### Communauté Make : rubrique « Hire a Pro » → « Offer Help »
- **Adresse** : https://community.make.com/c/hire-a-pro/offer-help/75
- **Prix** : gratuit (compte Make gratuit suffisant).
- **Règle** : un seul sujet par personne, qui sert d'annonce permanente et se modifie ensuite. C'est le seul
  endroit autorisé pour proposer ses services sur ce forum. Ne pas reposter, ne pas démarcher dans les autres rubriques.
- **Texte à coller** (le forum est en anglais) :
  > **Axion Studio: Make and AI automation for small businesses (France, French-speaking)**
  > I'm Arthur, founder of Axion Studio, based near Paris. I build Make and n8n workflows for small businesses and freelancers: quote requests, invoice reminders, supplier invoices sent to the accountant, reporting, calendar booking with reminders, and AI steps (email sorting, document reading, drafted replies) when they really save time.
  > How I work: free 30-minute audit, fixed price agreed before starting, you keep full ownership of accounts, scenarios and documentation.
  > Languages: French, English. Remote across France.
  > Website: https://axionstudio.fr/services/
- **Ne pas** ajouter téléphone ni adresse postale dans un forum public : le site suffit.

### n8n : profil de créateur (bibliothèque de modèles)
- **Pourquoi** : chaque modèle de workflow publié sur n8n.io porte le nom et le lien de son auteur. C'est le moyen
  le plus réaliste d'apparaître sur le site de n8n, le programme « experts » étant fermé (voir priorité 3).
- **Adresse** : portail créateurs https://creators.n8n.io/ ; règles : https://docs.n8n.io/contribute/create-templates/
- **Prix** : gratuit.
- **Règles relevées** : un modèle à la fois pour un nouveau créateur, validé par n8n avant le suivant ; au bout
  de trois modèles validés, badge « créateur vérifié ». Le modèle doit marcher après import et expliquer
  sa configuration dans des notes. Partir d'un vrai workflow de `automatisations/n8n/`, sans aucune clé ni donnée client.
- **Bio courte** (anglais) :
  > Founder of Axion Studio (France). n8n and AI automation for small businesses: quotes, invoices, reminders, reporting. https://axionstudio.fr/agence-n8n/
- **Lien** : https://axionstudio.fr/agence-n8n/

### Dynactive (association d'entrepreneurs de Plaine Vallée)
- **Pourquoi** : réseau local de Plaine Vallée, l'agglomération dont fait partie Montlignon ; plus de 100
  entrepreneurs, petits-déjeuners, afterworks, ateliers. Un annuaire des adhérents existe (réservé aux membres) :
  intérêt surtout pour les contacts et le bouche-à-oreille, peu pour le référencement.
- **Adresse** : https://www.dynactive.fr/ → « Nos formules d'adhésion » / « Adhérer » ; contact : contact@dynactive.fr.
- **Prix** : adhésion payante, montant non affiché sur l'accueil. Venir d'abord à un petit-déjeuner avant de payer.
- **Message à envoyer** (par vous) :
  > Bonjour, je viens de créer Axion Studio à Montlignon. J'automatise le travail administratif des TPE, PME et indépendants (devis, relances, factures, reporting), avec de l'IA quand c'est utile. J'aimerais découvrir Dynactive lors d'un prochain petit-déjeuner avant d'adhérer. Pouvez-vous m'indiquer la prochaine date et les formules d'adhésion ? Merci. Arthur Champagne-Forterre, 06 48 61 23 50, https://axionstudio.fr/
- **Texte pour l'annuaire des adhérents** : description moyenne du kit.

### Label #Madein95 (CCI Val-d'Oise)
- **Ce que c'est** : label de la CCI pour les entreprises du Val-d'Oise : petit-déjeuner le premier jeudi
  du mois, vidéos de présentation des membres, plateforme de mise en relation en ligne.
- **Conditions** : être installé dans le 95 et avoir au moins 50 % des coûts de production dans le département
  ou au moins 50 % des effectifs qui y habitent. Seul dirigeant, domicilié à Montlignon : a priori éligible, à confirmer.
- **Adresse** : https://www.entreprises.cci-paris-idf.fr/offres/made-in-95 → « Rejoignez le label #Madein95 ».
  Contact CCI Val-d'Oise : 01 55 65 44 44, 35 boulevard du Port, 95000 Cergy.
- **Prix** : non indiqué sur la page, à demander.
- **Texte** : description moyenne du kit ; secteur « Conseil en informatique / services numériques ».
- **Lien** : https://axionstudio.fr/
- **À noter** : la CCI Val-d'Oise n'a pas d'annuaire public d'inscription trouvé en ligne ; #Madein95 et ses
  événements (par exemple « BOOST Camp IA », novembre-décembre 2026) en tiennent lieu. La CCI renvoie aussi vers
  lesdigiteurs.fr (annuaire de prestataires numériques) : non vérifié en détail, à regarder plus tard.

---

## Priorité 3 (plus tard)

### Apple Business (anciennement Business Connect, fiche Apple Plans)
- **Adresse** : https://business.apple.com/ (businessconnect.apple.com y redirige).
- **Prix** : la fiche est gratuite ; certains services annexes sont payants (inutiles ici).
- **Réserve** : la page ne dit pas si une entreprise sans local ouvert au public est acceptée, ni les conditions en France.
- **Catégorie** : « Consultant en informatique ». **Texte** : description longue. **Lien** : https://axionstudio.fr/

### Make : programme Solution Partner (et annuaire des partenaires)
- **Adresse** : https://www.make.com/en/solution-partners ; formation obligatoire : https://partnertraining.make.com/ ;
  annuaire public : https://www.make.com/en/partners-directory
- **Prix** : gratuit pour les candidats retenus.
- **Conditions** : au moins un expert automatisation, expérience de projets clients, formation partenaire suivie,
  certifications Make. Validation jusqu'à deux mois.
- **Quand** : après quelques projets clients réels sur Make. Texte : description courte + lien https://axionstudio.fr/services/

### n8n : programme Expert Partners (annuaire experts.n8n.io)
- **Adresse** : https://n8n.io/become-an-expert/ (liste d'attente sur un formulaire Typeform).
- **Conditions affichées le 10/11/2026** : programme pilote fermé, pour agences et intégrateurs, au moins 3 clients
  n8n actifs, membre actif de la communauté, et seulement pour le Royaume-Uni, l'Irlande, l'Europe du Nord
  et l'Amérique du Nord. **La France n'est pas dans la liste** : inutile de candidater pour l'instant.
- **Quand** : revérifier dans quelques mois ; d'ici là, le profil de créateur (priorité 2) est la bonne porte d'entrée.

---

## Rien à faire

- **Annuaire des entreprises de l'État** (annuaire-entreprises.data.gouv.fr) : la fiche apparaît d'elle-même
  quand le SIRET est attribué. Vérifier seulement que nom et adresse correspondent.
- **Mairie de Montlignon** : aucun annuaire officiel des entreprises trouvé en ligne. On peut demander par e-mail
  à la mairie (10 rue de Paris) si un annuaire ou le bulletin municipal présente les nouvelles entreprises,
  avec la description moyenne. Priorité faible.

## Écartés

- **Annuaires de liens, « annuaires SEO », communiqués de presse en série, sites qui vendent des liens** :
  sanctionnés par Google, aucun intérêt pour la confiance.
- **Copies d'annuaires** (annuaire-mairie.fr, la-mairie.com, sites qui recopient le registre SIRENE) : on ne
  s'y inscrit pas, ils se remplissent seuls.
- **Plateformes de micro-services à bas prix** (type ComeUp, Fiverr) : image peu compatible avec des projets au forfait.
- **Réseau Entreprendre Val-d'Oise** : réseau sérieux, mais c'est un accompagnement de créateurs avec prêt
  d'honneur, pas un annuaire. À garder en tête si vous cherchez un financement.
- **Clutch, Sortlist** : non vérifiés dans cette session ; à étudier plus tard, une fois des références clients obtenues.

## À faire par vous (liste « créé / à créer »)

Cette liste n'a pas été recopiée dans `docs/kit-profils.md` (consigne : aucun fichier existant modifié).

- [ ] Obtenir le SIRET (débloque la suite)
- [ ] Google Business (kit, étape 1)
- [ ] Bing Places
- [ ] Malt
- [ ] PagesJaunes
- [ ] Codeur.com (profil gratuit)
- [ ] Annonce Make « Offer Help »
- [ ] Premier modèle n8n soumis
- [ ] Contact Dynactive
- [ ] Candidature #Madein95
- [ ] Plus tard : Apple Business, Make Solution Partner, n8n Expert Partners

## Sources consultées (10 novembre 2026)

- n8n : https://n8n.io/expert-partners , https://n8n.io/become-an-expert/ , https://experts.n8n.io/ , https://docs.n8n.io/contribute/create-templates/
- Make : https://www.make.com/en/solution-partners , https://www.make.com/en/partners-directory , https://community.make.com/t/want-to-offer-your-services-promote-yourself-in-offer-help/96842
- Codeur.com : https://www.codeur.com/pages/tarifs-codeur-com , https://www.codeur.com/comment-ca-marche-pour-les-prestataires
- Malt : https://www.malt.fr/ et centre d'aide help.malt.com (frais : sources divergentes, barème non confirmé)
- Bing : https://www.bing.com/forbusiness/ ; Apple : https://business.apple.com/
- CCI Val-d'Oise : https://www.entreprises.cci-paris-idf.fr/web/cci95/accueil_cci95 , https://www.entreprises.cci-paris-idf.fr/offres/made-in-95
- Dynactive : https://www.dynactive.fr/
- PagesJaunes : page officielle non accessible au robot ; informations tirées de documents Solocal et de guides, à vérifier à l'écran.
