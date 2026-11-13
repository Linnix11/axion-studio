# Fiche Google Business Profile : à coller dès la vérification

Mis à jour le 13 novembre 2026 par l’agent seo-google-business. **Rien n’est publié par l’agent** : Arthur copie
ces textes dans la fiche. Aucun fichier du site n’a été modifié.

État de la fiche au 13 novembre 2026 : créée, **en attente de vérification par Google** (pas encore publique).
Réglages retenus : adresse masquée, zone desservie Île-de-France puis France, nom « Axion Studio » seul,
site https://axionstudio.fr, téléphone 06 48 61 23 50, adresse e-mail publique contact@axionstudio.fr.

Sources : `src/data.js` (services, tarifs, méthode, pages métier, FAQ), `src/blog.js` (articles),
`docs/kit-profils.md` (catégories et descriptions déjà validées). Aucun chiffre n’a été ajouté : seuls les prix et
délais affichés sur le site sont repris (audit offert de 30 minutes, proposition sous 72 h, projets dès 150 €,
suivi dès 250 € par mois). Aucun avis, aucun client cité.

## 0. Les limites de longueur de Google

| Champ de la fiche | Limite appliquée par Google | Ce que nous avons écrit |
|---|---|---|
| Nom de l’entreprise | 100 caractères | « Axion Studio » (12) |
| Description de l’entreprise | 750 caractères | voir `docs/kit-profils.md` (description longue) |
| Nom d’un service | 120 caractères | 20 à 46 caractères |
| Description d’un service | 300 caractères | 218 à 256 caractères |
| Publication « Nouveautés » | 1 500 caractères, 150 à 300 conseillés | 211 à 245 caractères |
| Titre d’une offre | 58 caractères | non utilisé (publications en « Nouveautés ») |
| Question et réponse | compteur affiché dans l’interface | questions sous 70, réponses sous 320 caractères |

Google fait évoluer ces limites : **le compteur affiché dans l’interface fait foi**. Si un texte est refusé,
coupez la dernière phrase, jamais le début.

Les photos : logo `marketing/banners/google-logo-720x720.png`, couverture `google-couverture-1024x576.png`,
visuel de publication `google-publication-audit-1200x900.png` (format 4/3, celui que Google préfère dans les publications).

## 1. Les 5 services à déclarer

Fiche Google → **Modifier le profil** → **Services** → ajouter un service → « Service personnalisé » si le nom
proposé par Google ne correspond pas. Gardez exactement ces noms : ce sont ceux du site, ce qui garde la fiche,
le site et les IA cohérents.

### 1. Workflows automatisés (22 caractères)

> Relances, facturation, reporting, saisie de données : des enchaînements qui se déclenchent seuls à la réception d’un e-mail, d’un formulaire, d’une commande ou à heure fixe. Testés sur vos vraies données, documentés simplement, avec alerte en cas d’erreur.

256 caractères. Page : https://axionstudio.fr/services/#workflows

### 2. Agenda et emploi du temps (24 caractères) — nouveau

> Prise de rendez-vous selon vos vraies disponibilités, rappel au client la veille, planning d’équipe mis à jour à chaque changement, créneaux protégés pour le travail de fond et récapitulatif de la journée chaque matin.

218 caractères. Page : https://axionstudio.fr/services/#agenda

### 3. Intégration d’outils (20 caractères)

> CRM, tableur, messagerie, agenda, facturation : vos logiciels reliés par leurs API pour qu’une donnée saisie une fois soit à jour partout, dans un sens ou dans les deux, avec contrôle des doublons et des données manquantes.

223 caractères. Page : https://axionstudio.fr/services/#integrations

### 4. Intelligence artificielle pour les PME et TPE (46 caractères)

> Tri des e-mails entrants, lecture des factures et des documents, brouillons de réponses que vous relisez avant envoi, assistant interne qui répond à partir de vos documents. Seules les données utiles sont envoyées à l’IA.

221 caractères. Page : https://axionstudio.fr/services/#ia

### 5. Création de site web pour TPE et PME (37 caractères)

> Site vitrine rapide, lisible sur mobile et facile à mettre à jour, dont le formulaire de contact ou de devis alimente directement votre CRM ou votre messagerie. Nom de domaine, mise en ligne et mentions légales compris.

219 caractères. Page : https://axionstudio.fr/services/#sites-web

**Prix** : si Google propose un champ prix, mettre « À partir de 150 € » sur les services 1 à 5 (c’est le prix affiché
sur le site). Sinon, ne rien mettre : pas de prix inventé.

**Catégories** (rappel de `docs/kit-profils.md`) : principale « Consultant en informatique » ; secondaires
« Concepteur de sites web » et « Service de conseil aux entreprises ».

## 2. Les 4 premières publications (un mois)

Fiche Google → **Ajouter une actualité** → type **Nouveautés**. Pour chacune : collez le texte, ajoutez l’image,
choisissez le bouton et collez l’adresse de destination. **Ne mettez pas le lien dans le texte** : il n’est pas
cliquable, c’est le bouton qui porte le lien.

Rythme conseillé : une publication par semaine, le même jour (par exemple le mardi), à partir du jour où Google
valide la fiche. Une publication « Nouveautés » reste visible environ une semaine en vedette, puis rejoint l’onglet
des publications.

### Publication 1 — semaine 1 : présentation et audit gratuit

> Axion Studio automatise les tâches qui se répètent dans les TPE, PME et chez les indépendants : relances, devis, saisie, rendez-vous. Premier échange de 30 minutes offert, en visio ou par téléphone, pour repérer ce qui vous fait gagner du temps.

- 245 caractères
- Bouton : **En savoir plus**
- Destination : https://axionstudio.fr/contact/
- Image : `marketing/banners/google-publication-audit-1200x900.png`

### Publication 2 — semaine 2 : nouveau service, l’agenda

> Nouveau : la gestion de l’agenda. Les rendez-vous se posent sur vos vraies disponibilités, le client reçoit un rappel la veille, le planning d’équipe se met à jour tout seul et vous recevez le programme de la journée chaque matin.

- 230 caractères
- Bouton : **En savoir plus**
- Destination : https://axionstudio.fr/services/#agenda
- Image : `marketing/banners/google-couverture-1024x576.png` (Google la recadre, le texte est centré)

### Publication 3 — semaine 3 : facture électronique

> Depuis le 1er septembre 2026, toute entreprise assujettie à la TVA doit pouvoir recevoir des factures électroniques. L’émission suit en septembre 2027 pour les TPE. Le calendrier et ce qui peut être automatisé, expliqués simplement.

- 232 caractères
- Bouton : **En savoir plus**
- Destination : https://axionstudio.fr/blog/facture-electronique-tpe-2026-2027/
- Image : `marketing/banners/google-publication-audit-1200x900.png`
- Dates reprises de l’article du site, vérifiées sur les sources officielles qu’il cite. Si l’article change, changez la publication.

### Publication 4 — semaine 4 : artisans du bâtiment

> Artisans du bâtiment : les demandes de devis rangées toutes seules, les devis non signés relancés avec vos mots, les factures en retard suivies à date fixe et un rappel envoyé au client la veille du rendez-vous.

- 211 caractères
- Bouton : **En savoir plus**
- Destination : https://axionstudio.fr/automatisation/artisans-batiment/
- Image : `marketing/banners/google-couverture-1024x576.png`

Pour le mois suivant, les publications 5 à 8 (experts-comptables, 5 tâches à automatiser, comparatif n8n, commerces
et restaurants) sont prêtes dans l’historique de ce fichier ; l’agent les régénère sur demande.

## 3. Six questions-réponses à publier

Rubrique **Questions et réponses** de la fiche. Vous posez la question depuis un compte Google personnel, puis vous
y répondez depuis le compte qui gère la fiche : la réponse porte alors la mention « Propriétaire ». Ne publiez pas
tout le même jour : deux ou trois questions, puis les autres la semaine suivante.

**Q1. Intervenez-vous en dehors du Val-d’Oise ?**
> Oui. Axion Studio travaille partout en France à distance, en visio, par téléphone et par accès partagés à vos outils. Les déplacements sont possibles en Île-de-France. L’audit gratuit de 30 minutes se fait en visio ou par téléphone.

**Q2. Combien coûte une automatisation ?**
> Les projets démarrent à 150 € au forfait et le suivi mensuel à 250 € par mois, sans engagement. Le prix exact est fixé par écrit après l’audit gratuit, avant de commencer, et ne bouge pas en cours de projet. Les abonnements aux outils restent à votre nom.

**Q3. Comment se passe l’audit gratuit ?**
> Un appel de 30 minutes en visio ou par téléphone : vous décrivez votre semaine type et vos outils, je vous dis ce qui peut être automatisé, ce qui ne vaut pas la peine de l’être et par quoi commencer. Vous recevez une proposition chiffrée sous 72 h, sans engagement.

**Q4. Faut-il changer de logiciels ?**
> Non. Je pars de vos outils actuels et je les relie entre eux : CRM, tableur, messagerie, agenda, facturation. Un nouvel outil n’est proposé que s’il apporte un vrai gain. Pour automatiser, j’utilise selon les cas n8n, Make ou Zapier.

**Q5. Les automatisations m’appartiennent-elles ?**
> Oui. Les comptes, les workflows et la documentation sont à votre nom. Vous pouvez les modifier, les exporter ou changer de prestataire à tout moment. Un mois de suivi est inclus après la mise en route, puis le suivi mensuel est facultatif.

**Q6. Travaillez-vous avec les particuliers ?**
> Non. Les prestations sont réservées aux professionnels : entreprises, indépendants, professions libérales et associations, dans le cadre de leur activité. Les conditions générales de vente sont écrites pour ce cadre.

Ces six réponses reprennent la FAQ du site (`/faq/`) sans rien y ajouter.

## 4. Ce qu’il ne faut surtout pas faire

- **Pas de mots-clés dans le nom.** Le nom de la fiche est « Axion Studio », rien d’autre. « Axion Studio
  automatisation IA Île-de-France » est une infraction aux règles de Google : fiche suspendue, et il faut
  parfois refaire toute la vérification.
- **Pas d’avis inventés ni échangés.** Pas d’avis écrits par vous, par des proches qui ne sont pas clients, ni
  achetés, ni échangés avec d’autres entreprises, ni obtenus contre une remise ou un cadeau. Les avis se demandent
  aux vrais clients, après la prestation, sans contrepartie.
- **Pas de faux chiffres.** Aucun « +40 % de productivité », aucun nombre de clients : seuls les prix et délais du
  site (150 €, 250 €/mois, 30 minutes, 72 h, 24 heures ouvrées).
- **Pas de client cité** sans son accord écrit.
- **Pas d’adresse affichée.** L’adresse reste masquée : la fiche fonctionne en zone desservie.
- **Pas de lien dans le texte des publications** (non cliquable) ni de numéro de téléphone dans le texte : Google
  le refuse souvent.
- **Pas de photo prise ailleurs** (banque d’images sans licence, capture d’un autre site) : seuls les visuels de
  `marketing/banners/` et vos propres captures.
- **Pas de doublon de fiche** : une seule fiche pour Axion Studio.

## 5. Après la vérification

1. Publier logo, couverture, les 5 services, puis la publication 1.
2. Copier l’adresse publique de la fiche (bouton « Partager votre profil ») et l’envoyer : elle sera ajoutée à
   `company.profils` dans `src/data.js` (par un autre agent, sur une branche, avec votre accord) pour que le site
   la déclare en `sameAs`.
3. Dans Google Business, activer la messagerie seulement si vous comptez répondre dans la journée : un délai de
   réponse long est visible par les visiteurs.
4. Dès que la page de réservation Google Agenda existe (`company.rdv`), la publication 1 pourra passer du bouton
   « En savoir plus » au bouton « Réserver ».
