// Toutes les informations de l’entreprise et les textes du site sont centralisés ici.
export const company = {
  brand: 'Axion Studio',
  tradeName: 'axionstudio',
  owner: 'Arthur Champagne-Forterre',
  email: 'arthur.champagne@icloud.com',
  phone: '06 48 61 23 50',
  phoneHref: '+33648612350',
  city: 'Montlignon (95)',
  siege: '5 allée des Pommiers, 95680 Montlignon, France',
  domain: 'axionstudio.fr',
  siret: "En cours d’attribution",
  // Profils publics de l'entreprise (LinkedIn, fiche Google Business, Malt…) : repris par Google et les IA (sameAs).
  // Ajouter chaque adresse dès que le profil existe, avec le même nom et la même description que le site.
  profils: [],
  // Page de réservation Google Agenda de l'audit gratuit (Planning de rendez-vous). Vide : les boutons mènent au formulaire.
  rdv: '',
  delai: '24 heures ouvrées',   // délai de réponse annoncé partout (contact, assistant, bandeaux)
  host: 'Hostinger International Ltd., 61 Lordou Vironos Street, 6023 Larnaca, Chypre (hostinger.fr)',
}

export const nav = [
  { to: '/services/', label: 'Services' },
  { to: '/exemples/', label: 'Exemples' },
  { to: '/methode/', label: 'Méthode' },
  { to: '/tarifs/', label: 'Tarifs' },
  { to: '/blog/', label: 'Blog' },
  { to: '/a-propos/', label: 'À propos' },
  { to: '/faq/', label: 'FAQ' },
]

export const services = [
  {
    slug: 'workflows',
    title: 'Workflows automatisés',
    short: 'Relances, facturation, reporting, saisie de données : des workflows qui tournent seuls, 24 h/24.',
    intro: "Les tâches que vous refaites chaque semaine à l’identique sont les premières à automatiser. Je conçois des enchaînements qui se déclenchent seuls : à la réception d’un e-mail, d’un formulaire, d’une commande ou à heure fixe.",
    includes: [
      'Cartographie de la tâche telle que vous la faites aujourd’hui',
      'Conception et construction du workflow',
      'Gestion des erreurs : vous êtes prévenu si quelque chose bloque',
      'Tests sur vos vraies données avant la mise en route',
      'Documentation simple pour comprendre et modifier',
    ],
    examples: ['Relance automatique des factures impayées à J+7 et J+15', 'Création des commandes dans le tableur à partir des e-mails reçus', 'Envoi du récapitulatif hebdomadaire des ventes'],
  },
  {
    slug: 'integrations',
    title: "Intégration d’outils",
    short: 'CRM, tableur, messagerie, agenda, facturation : vos logiciels connectés via leurs API.',
    intro: "Vous utilisez déjà de bons outils, mais ils ne se parlent pas : vous recopiez donc les mêmes informations à plusieurs endroits. Je les relie pour qu’une donnée saisie une fois soit à jour partout.",
    includes: [
      'Inventaire de vos outils et des données qui circulent',
      'Connexion via les API ou les intégrations natives',
      'Synchronisation dans un sens ou dans les deux',
      'Contrôle des doublons et des données manquantes',
    ],
    examples: ['Un nouveau client dans le CRM crée sa fiche dans l’outil de facturation', 'Les rendez-vous pris en ligne arrivent dans l’agenda partagé', 'Les paiements reçus mettent à jour le tableau de trésorerie'],
  },
  {
    slug: 'ia',
    title: 'Intelligence artificielle',
    short: "Tri d’e-mails, extraction de documents, assistants internes, réponses clients assistées.",
    intro: "L’IA est utile là où une tâche demande de lire et de comprendre un texte : trier, résumer, extraire, rédiger un premier jet. Je l’intègre dans vos workflows, avec une validation humaine quand c’est nécessaire.",
    includes: [
      'Choix du bon usage : là où l’IA fait vraiment gagner du temps',
      'Extraction de données depuis des PDF, e-mails ou formulaires',
      'Brouillons de réponses que vous relisez avant envoi',
      'Assistant interne qui répond à partir de vos propres documents',
      'Attention portée à la confidentialité des données envoyées',
    ],
    examples: ['Lecture des factures fournisseurs et report des montants', 'Classement des e-mails entrants par type de demande', 'Brouillon de réponse aux questions récurrentes des clients'],
  },
  {
    slug: 'sites-web',
    title: 'Sites web',
    short: 'Sites vitrines rapides et clairs, reliés directement à vos automatisations.',
    intro: "Un site vitrine sert à être trouvé et contacté. Je réalise des sites rapides, lisibles sur mobile et faciles à mettre à jour, dont les formulaires alimentent directement vos outils.",
    includes: [
      'Structure des pages et rédaction avec vous',
      'Design sur mesure, adapté au mobile',
      'Formulaire de contact relié à votre CRM ou à votre messagerie',
      'Mise en ligne, nom de domaine et mentions légales',
    ],
    examples: ['Site vitrine de 4 à 8 pages', 'Page de prise de rendez-vous reliée à l’agenda', 'Formulaire de devis qui crée le contact dans le CRM'],
  },
]

export const tools = ['n8n', 'Make', 'Zapier', 'Google Workspace', 'Microsoft 365', 'Notion', 'Airtable', 'HubSpot', 'Pipedrive', 'Brevo', 'Stripe', 'API OpenAI et Anthropic']

export const useCases = [
  { sector: 'Artisan du bâtiment', task: 'Demandes de devis', before: 'Les demandes arrivent par le site, par e-mail et par téléphone. Vous les recopiez dans un carnet, puis rédigez chaque devis de zéro.', after: 'Chaque demande crée une fiche client, un brouillon de devis est préparé à partir de vos tarifs et vous êtes prévenu sur votre téléphone.', gain: '2 à 3 h par semaine' },
  { sector: 'Cabinet de conseil', task: 'Factures fournisseurs', before: 'Les PDF s’accumulent dans la boîte mail et sont classés à la main en fin de mois, avant d’être envoyés au comptable.', after: 'Chaque facture est lue, renommée, rangée dans le bon dossier et ses montants sont reportés dans le tableau de suivi partagé avec le comptable.', gain: '1 à 2 h par semaine' },
  { sector: 'Boutique en ligne', task: 'Suivi des commandes', before: 'Vous exportez les commandes, mettez à jour le stock dans un tableur et répondez aux clients qui demandent où en est leur colis.', after: 'Le stock se met à jour à chaque vente, le client reçoit son numéro de suivi automatiquement et vous recevez une alerte quand un produit passe sous le seuil.', gain: '3 à 4 h par semaine' },
  { sector: 'Agence immobilière', task: 'Qualification des contacts', before: 'Les demandes des portails d’annonces arrivent en vrac, et il faut les trier et rappeler chaque contact pour connaître son projet.', after: 'Chaque demande est classée (achat, location, estimation), un e-mail de bienvenue pose les premières questions et le contact arrive qualifié dans le CRM.', gain: '2 h par semaine' },
  { sector: 'Indépendant', task: 'Reporting et relances', before: 'Le lundi matin, vous assemblez les chiffres de trois outils et relancez les factures en retard une par une.', after: 'Le récapitulatif arrive seul dans votre boîte mail et les relances partent automatiquement, avec un ton que vous avez choisi.', gain: '1 h 30 par semaine' },
]

export const steps = [
  { title: 'Audit', duration: '30 min offertes', text: 'On repère ensemble les tâches qui vous coûtent le plus de temps.', detail: "Un appel en visio ou par téléphone. Vous me décrivez votre semaine type et vos outils. Je vous dis ce qui peut être automatisé, ce qui ne vaut pas la peine de l’être, et dans quel ordre." },
  { title: 'Proposition', duration: 'sous 72 h', text: 'Une solution chiffrée, avec le temps gagné estimé, sans engagement.', detail: 'Vous recevez un document clair : ce qui sera construit, avec quels outils, le prix au forfait, le délai et une estimation du temps gagné. Vous décidez ensuite, sans relance insistante.' },
  { title: 'Mise en place', duration: '1 à 4 semaines', text: 'Construction, tests sur vos vraies données, puis mise en production.', detail: "Je construis l’automatisation, je la teste sur des cas réels avec vous, puis je la mets en route. Vous suivez l’avancement et validez chaque étape avant qu’elle touche vos clients." },
  { title: 'Suivi', duration: '1 mois inclus', text: 'Prise en main, documentation et ajustements pour que tout reste fiable.', detail: "Je vous montre comment tout fonctionne et vous remets une documentation simple. Pendant un mois, j’ajuste ce qui doit l’être. Ensuite, vous êtes autonome ou vous choisissez un suivi mensuel." },
]

export const offers = [
  { name: 'Audit', price: 'Offert', unit: '30 minutes', text: 'Pour savoir ce qui peut être automatisé chez vous et par quoi commencer.', items: ['Appel en visio ou par téléphone', 'Liste des tâches automatisables', 'Ordre de priorité conseillé'], cta: 'Réserver l’audit' },
  { name: 'Projet', from: true, price: '150 €', unit: 'au forfait, prix exact sur devis', text: 'Pour une automatisation, une intégration ou un site web, livré clés en main.', items: ['Proposition détaillée sous 72 h', 'Construction et tests sur vos données', 'Documentation et 1 mois de suivi inclus'], cta: 'Demander un devis', featured: true },
  { name: 'Suivi mensuel', from: true, price: '250 €', unit: 'par mois, sans engagement', text: 'Pour faire évoluer vos automatisations et en ajouter au fil de l’eau.', items: ['Surveillance et correction des workflows', 'Petites évolutions incluses', 'Un point mensuel sur les prochaines tâches à automatiser'], cta: 'En parler' },
]

export const faq = [
  { q: 'Je ne suis pas à l’aise avec la technique, est-ce un problème ?', a: 'Non. Vous me décrivez votre travail avec vos mots, je m’occupe de la partie technique. Je vous explique ensuite le fonctionnement simplement, et la documentation est écrite pour être lue par quelqu’un qui n’est pas développeur.' },
  { q: 'Quels outils utilisez-vous ?', a: 'Je pars des vôtres. Pour relier et automatiser, j’utilise selon les cas n8n, Make ou Zapier, et les API des logiciels que vous utilisez. Je vous recommande la solution la plus simple à maintenir pour votre situation.' },
  { q: 'Que deviennent mes données ?', a: 'Les automatisations tournent sur vos comptes. Avant d’utiliser un service d’IA, je vérifie avec vous quelles données lui sont envoyées et je privilégie les options qui n’utilisent pas vos données pour entraîner leurs modèles. Rien n’est conservé de mon côté au-delà du projet.' },
  { q: 'Combien de temps faut-il pour mettre en place une automatisation ?', a: 'Une automatisation simple est en place en une à deux semaines. Un projet qui relie plusieurs outils ou intègre de l’IA demande généralement trois à quatre semaines, tests compris.' },
  { q: 'Que se passe-t-il si une automatisation tombe en panne ?', a: 'Chaque workflow prévient en cas d’erreur. Pendant le mois de suivi inclus, je corrige sans frais. Ensuite, vous pouvez choisir le suivi mensuel ou me solliciter ponctuellement.' },
  { q: 'Travaillez-vous avec les particuliers ?', a: 'Non. Les prestations d’Axion Studio sont réservées aux professionnels : entreprises, indépendants, professions libérales et associations, dans le cadre de leur activité. Les conditions générales de vente (page /cgv) sont écrites pour ce cadre.' },
  { q: 'Travaillez-vous à distance ?', a: 'Oui, la plupart des projets se font entièrement à distance, partout en France. Je me déplace aussi en Île-de-France, notamment dans le Val-d’Oise, quand c’est utile.' },
  { q: 'Combien ça coûte ?', a: 'Les projets démarrent à 150 €, et le suivi mensuel à 250 € par mois. Chaque projet est chiffré au forfait après l’audit gratuit, en fonction de ce qui est à construire : vous connaissez le prix exact avant de vous engager. La TVA n’est pas applicable (article 293 B du CGI).' },
]

// Liste interactive de la page d’accueil : durées moyennes indicatives, en minutes par semaine.
// day : 0 = lundi … 4 = vendredi (place dans la semaine type de l’accueil)
export const tasks = [
  { label: 'Recopier les commandes dans le tableur', minutes: 45, preset: true, day: 0 },
  { label: 'Relancer les factures impayées', minutes: 30, preset: true, day: 1 },
  { label: 'Répondre aux mêmes questions par e-mail', minutes: 60, preset: true, day: 2 },
  { label: 'Préparer le reporting du lundi', minutes: 40, preset: false, day: 0 },
  { label: 'Classer les justificatifs et factures', minutes: 35, preset: false, day: 3 },
  { label: 'Saisir les rendez-vous dans l’agenda', minutes: 20, preset: false, day: 4 },
]

export const needs = [
  'Automatisation de processus',
  "Intégration d’outils",
  'Intelligence artificielle',
  'Site web',
  'Je ne sais pas encore',
]

// ——— Confiance ———

export const identity = [
  ['Entreprise', 'Axion Studio (nom commercial « axionstudio »)'],
  ['Dirigeant', 'Arthur Champagne-Forterre'],
  ['Statut', 'Entrepreneur individuel, micro-entreprise'],
  ['Déclaration', 'Guichet unique de l’INPI, novembre 2026'],
  ['SIRET', "En cours d’attribution"],
  ['Siège', '5 allée des Pommiers, 95680 Montlignon (Val-d’Oise)'],
  ['TVA', 'Non applicable, art. 293 B du CGI'],
]

export const guarantees = [
  { title: 'Audit gratuit, sans engagement', text: '30 minutes pour savoir ce qui peut être automatisé. Vous ne devez rien ensuite.' },
  { title: 'Prix fixé avant de commencer', text: 'Un forfait écrit dans la proposition, jamais de facturation à l’heure. Il ne bouge pas en cours de projet.' },
  { title: 'Rien ne part sans votre accord', text: 'Chaque automatisation est testée avec vous avant de toucher vos clients.' },
  { title: 'Vous gardez tout', text: 'Comptes, workflows et documentation sont à votre nom. Rien ne s’arrête si nous cessons de travailler ensemble.' },
  { title: 'Pas de boîte noire', text: 'Chaque workflow est documenté en français, avec des mots simples, pour que vous ou quelqu’un d’autre puissiez le reprendre.' },
  { title: 'Vos outils d’abord', text: 'Je pars de ce que vous utilisez déjà. Je ne propose un nouvel outil que s’il apporte un vrai gain.' },
  { title: 'Un mois de suivi inclus', text: 'Les corrections après la mise en route sont comprises dans le prix.' },
  { title: 'Un interlocuteur unique', text: 'La personne qui fait l’audit est celle qui construit et qui répond au téléphone.' },
]

export const notDoing = [
  'Je ne vous vends pas un logiciel ni un abonnement maison.',
  'Je n’automatise pas une tâche si le gain ne justifie pas le coût : je vous le dis à l’audit.',
  'Je n’envoie pas vos données sensibles à une IA sans votre accord explicite.',
  'Je ne facture pas à l’heure et je n’ajoute pas de frais en cours de route.',
]

export const security = [
  { title: 'Tout est créé sur vos comptes', text: 'Les outils d’automatisation, les clés d’accès et les workflows sont ouverts à votre nom. Vous en êtes propriétaire et vous pouvez tout arrêter à tout moment.' },
  { title: 'Des accès limités et révocables', text: 'Je demande uniquement les accès nécessaires au projet, de préférence via des comptes invités ou des clés dédiées que vous pouvez retirer en un clic.' },
  { title: 'L’IA, avec précaution', text: 'Seules les informations utiles à la tâche sont envoyées à un service d’IA. Je privilégie les offres professionnelles qui n’utilisent pas vos données pour entraîner leurs modèles, et rien de sensible ne part sans votre accord.' },
  { title: 'Hébergement en Europe quand c’est possible', text: 'Quand vos données le demandent, les automatisations peuvent tourner sur un serveur situé dans l’Union européenne, sous votre contrôle.' },
  { title: 'Des erreurs signalées, pas cachées', text: 'Chaque workflow vous prévient s’il échoue. Aucune donnée n’est perdue en silence.' },
  { title: 'Fin de projet propre', text: 'À la fin de la mission, je vous remets la documentation, puis je supprime mes accès et les données de test.' },
]

// Démonstration interactive de la page d’accueil (données fictives).
export const demo = {
  email: {
    from: 'Claire Martin <c.martin@exemple.fr>',
    subject: 'Demande de devis rénovation salle de bain',
    body: 'Bonjour, nous souhaiterions refaire notre salle de bain (environ 6 m²) à Taverny, si possible avant l’été. Pouvez-vous me rappeler au 06 00 00 00 00 ? Merci, Claire Martin',
  },
  steps: ['E-mail reçu dans la boîte de contact', 'Lecture par l’IA : nom, téléphone, ville, besoin, délai', 'Fiche client créée dans le CRM', 'Brouillon de réponse préparé', 'Vous êtes prévenu sur votre téléphone'],
  record: [['Nom', 'Claire Martin'], ['Téléphone', '06 00 00 00 00'], ['Ville', 'Taverny'], ['Besoin', 'Rénovation salle de bain, 6 m²'], ['Délai', 'Avant l’été'], ['Statut', 'À rappeler']],
  reply: 'Bonjour Madame Martin, merci pour votre demande concernant la rénovation de votre salle de bain à Taverny. Je vous rappelle demain dans la matinée pour en parler. Bien cordialement.',
}

// Extrait type de proposition commerciale (page Méthode).
export const proposalSample = {
  client: 'Exemple : cabinet de conseil, 4 personnes',
  problem: 'Environ 2 heures par semaine à classer les factures fournisseurs et à les transmettre au comptable.',
  solution: ['Lecture automatique des factures reçues par e-mail', 'Renommage et classement dans le dossier partagé', 'Report des montants dans le tableau de suivi', 'Envoi mensuel du récapitulatif au comptable'],
  tools: 'Votre messagerie, votre Google Drive, un tableur partagé, n8n',
  delay: '2 semaines, tests compris',
  price: 'Forfait indiqué ici, TVA non applicable',
  gain: 'Environ 90 heures par an',
}

// Pages « Automatisation pour … » (une par métier visé, /automatisation/<slug>).
// Gains en ordre de grandeur, repris des cas types ci-dessus ; outils cités comme exemples courants du métier.
// naf : codes d'activité du métier (sert à relier un prospect du workflow n8n à sa page).
export const metiers = [
  {
    slug: 'artisans-batiment',
    nom: 'Artisans du bâtiment',
    title: 'Automatisation pour les artisans du bâtiment',
    seoTitle: 'Automatisation pour artisans du bâtiment',
    description: 'Plombiers, électriciens, menuisiers : demandes de devis rangées toutes seules, relances de devis et de factures, rendez-vous dans l’agenda. Audit gratuit.',
    cible: 'Plombiers, chauffagistes, électriciens, menuisiers, peintres, couvreurs',
    naf: ['43.22A', '43.22B', '43.21A', '43.32A', '43.34Z', '43.91B', '41.20A'],
    probleme: 'Sur le chantier toute la journée, vous traitez les demandes de devis, les relances et les factures le soir ou le week-end. Une partie de ce travail se répète à l’identique et peut se faire sans vous.',
    taches: [
      { titre: 'Demandes de devis', texte: 'Chaque demande reçue par le site, par e-mail ou par un formulaire crée une fiche client, avec le besoin, l’adresse et le délai. Un brouillon de devis est préparé à partir de vos tarifs et vous êtes prévenu sur votre téléphone.' },
      { titre: 'Relance des devis non signés', texte: 'Sans réponse après quelques jours, le client reçoit une relance polie, écrite avec vos mots. Vous ne relancez plus de mémoire.' },
      { titre: 'Factures impayées', texte: 'Les factures en retard sont relancées à date fixe, puis signalées si le retard dure. Vous gardez la main sur les cas sensibles.' },
      { titre: 'Rendez-vous et interventions', texte: 'Les rendez-vous pris en ligne arrivent dans votre agenda et le client reçoit un rappel la veille.' },
    ],
    exemple: { avant: 'Les demandes arrivent par le site, par e-mail et par téléphone. Vous les recopiez dans un carnet, puis rédigez chaque devis de zéro.', apres: 'Chaque demande crée une fiche client, un brouillon de devis est préparé à partir de vos tarifs et vous êtes prévenu sur votre téléphone.', gain: '2 à 3 h par semaine' },
    outils: ['Gmail ou Outlook', 'Google Agenda', 'logiciel de devis et factures (Obat, Tolteck, Batappli…)', 'tableur', 'formulaire du site'],
    faq: [
      { q: 'Faut-il changer de logiciel de devis ?', a: 'Non. Je pars de votre logiciel actuel et je le relie à votre messagerie et à votre agenda. Un nouvel outil n’est proposé que s’il apporte un vrai gain.' },
      { q: 'Le devis part-il tout seul chez le client ?', a: 'Non. Le brouillon est préparé, mais c’est vous qui le relisez et l’envoyez. Rien ne part sans votre accord.' },
      { q: 'Je reçois surtout des appels, est-ce utile quand même ?', a: 'Oui, si une partie des demandes arrive par écrit (site, e-mail, annuaires). Pour les appels, un simple formulaire à remplir après coup suffit à déclencher la même suite.' },
      { q: 'Combien ça coûte ?', a: 'Les projets démarrent à 150 €, au forfait. Le prix exact est fixé après l’audit gratuit de 30 minutes, avant de commencer.' },
    ],
  },
  {
    slug: 'experts-comptables',
    nom: 'Experts-comptables',
    title: 'Automatisation pour les cabinets d’expertise comptable',
    seoTitle: 'Automatisation cabinet d’expertise comptable',
    description: 'Collecte des justificatifs, relance des pièces manquantes, lecture des factures, réponses aux questions récurrentes : du temps rendu à vos collaborateurs.',
    cible: 'Cabinets d’expertise comptable, commissaires aux comptes, gestionnaires de paie',
    naf: ['69.20Z'],
    probleme: 'Une grande partie du temps des collaborateurs part dans la collecte des pièces et les relances, surtout en période fiscale. Ce travail se répète d’un client à l’autre et se prête bien à l’automatisation.',
    taches: [
      { titre: 'Collecte des justificatifs', texte: 'Chaque client reçoit à date fixe la liste de ses pièces manquantes, avec un lien pour les déposer. Les relances suivent seules jusqu’à réception.' },
      { titre: 'Lecture des factures', texte: 'Les factures reçues par e-mail sont lues, renommées et rangées dans le bon dossier client, prêtes pour la saisie ou l’import dans votre logiciel.' },
      { titre: 'Questions récurrentes des clients', texte: 'Les questions les plus fréquentes reçoivent un brouillon de réponse que le collaborateur relit avant envoi.' },
      { titre: 'Suivi des échéances', texte: 'Un tableau de bord récapitule chaque semaine les dossiers en attente et les échéances proches.' },
    ],
    exemple: { avant: 'Les PDF s’accumulent dans la boîte mail et sont classés à la main en fin de mois.', apres: 'Chaque facture est lue, renommée, rangée dans le bon dossier et ses montants sont reportés dans un tableau de suivi.', gain: '1 à 2 h par semaine et par collaborateur concerné' },
    outils: ['Outlook ou Gmail', 'Pennylane, Tiime, Cegid ou ACD selon le cabinet', 'Google Drive, OneDrive ou SharePoint', 'tableur'],
    faq: [
      { q: 'Les données de nos clients sont-elles en sécurité ?', a: 'Les automatisations tournent sur vos comptes, avec des accès limités et révocables. Avant d’utiliser un service d’IA, nous vérifions ensemble quelles données lui sont envoyées.' },
      { q: 'Est-ce compatible avec notre logiciel de production ?', a: 'Le plus souvent, oui : par import de fichiers ou par les connexions que le logiciel propose. Je le vérifie pendant l’audit.' },
      { q: 'L’IA fait-elle la saisie comptable ?', a: 'Elle prépare : lecture, classement, pré-remplissage. La validation reste au cabinet, qui garde la responsabilité de la tenue.' },
      { q: 'Peut-on commencer petit ?', a: 'Oui. On choisit une tâche, souvent la relance des pièces manquantes, on la met en place et on mesure le temps gagné avant d’aller plus loin.' },
    ],
  },
  {
    slug: 'agences-immobilieres',
    nom: 'Agences immobilières',
    title: 'Automatisation pour les agences immobilières',
    seoTitle: 'Automatisation d’agence immobilière',
    description: 'Contacts des portails triés et qualifiés, visites dans l’agenda, relances des acquéreurs et des vendeurs : votre équipe se concentre sur les rendez-vous.',
    cible: 'Agences immobilières, mandataires, administrateurs de biens',
    naf: ['68.31Z'],
    probleme: 'Les demandes des portails arrivent en vrac et chacune demande un rappel pour connaître le projet. Les bons contacts se perdent au milieu des autres.',
    taches: [
      { titre: 'Qualification des contacts', texte: 'Chaque demande est classée (achat, location, estimation), un e-mail pose les premières questions et le contact arrive qualifié dans votre logiciel.' },
      { titre: 'Visites', texte: 'Le contact choisit un créneau, la visite arrive dans l’agenda du négociateur et un rappel part la veille.' },
      { titre: 'Relances', texte: 'Acquéreurs sans nouvelles et vendeurs en attente de retours reçoivent des relances régulières, avec un ton que vous avez choisi.' },
      { titre: 'Comptes rendus', texte: 'Après une visite, le négociateur dicte quelques phrases et un compte rendu propre est préparé pour le vendeur.' },
    ],
    exemple: { avant: 'Les demandes des portails d’annonces arrivent en vrac, et il faut les trier et rappeler chaque contact pour connaître son projet.', apres: 'Chaque demande est classée, un e-mail de bienvenue pose les premières questions et le contact arrive qualifié dans le CRM.', gain: '2 h par semaine' },
    outils: ['portails d’annonces', 'logiciel de transaction (Apimo, Hektor, Netty…)', 'Google Agenda ou Outlook', 'Gmail ou Outlook'],
    faq: [
      { q: 'Est-ce compatible avec notre logiciel de transaction ?', a: 'Je le vérifie pendant l’audit. La plupart des logiciels reçoivent les contacts par e-mail ou par une connexion dédiée.' },
      { q: 'Les contacts reçoivent-ils des messages robotiques ?', a: 'Non. Les messages sont écrits avec vous, dans votre ton, et restent courts. Les cas particuliers reviennent à un négociateur.' },
      { q: 'Combien de temps pour la mise en place ?', a: 'Une à deux semaines pour une première automatisation, tests compris.' },
      { q: 'Combien ça coûte ?', a: 'Les projets démarrent à 150 €, au forfait. Le prix exact est fixé après l’audit gratuit.' },
    ],
  },
  {
    slug: 'boutiques-en-ligne',
    nom: 'Boutiques en ligne',
    title: 'Automatisation pour les boutiques en ligne',
    seoTitle: 'Automatisation pour boutiques en ligne',
    description: 'Stock mis à jour à chaque vente, numéro de suivi envoyé seul, alertes de rupture, réponses aux questions de livraison : pour Shopify, WooCommerce ou PrestaShop.',
    cible: 'E-commerçants sur Shopify, WooCommerce, PrestaShop ou une place de marché',
    naf: ['47.91A', '47.91B'],
    probleme: 'Commandes, stock, suivi des colis et questions des clients : chaque vente entraîne une série de petites tâches qui se répètent et prennent des heures chaque semaine.',
    taches: [
      { titre: 'Stock', texte: 'Le stock se met à jour à chaque vente, sur tous vos canaux, et vous recevez une alerte quand un produit passe sous le seuil.' },
      { titre: 'Suivi des colis', texte: 'Le client reçoit son numéro de suivi automatiquement, puis un message à la livraison.' },
      { titre: 'Questions des clients', texte: 'Les questions « où en est ma commande ? » reçoivent une réponse avec le bon suivi, sans intervention.' },
      { titre: 'Factures et comptabilité', texte: 'Les factures et les paiements sont exportés chaque semaine dans le format demandé par votre comptable.' },
    ],
    exemple: { avant: 'Vous exportez les commandes, mettez à jour le stock dans un tableur et répondez aux clients qui demandent où en est leur colis.', apres: 'Le stock se met à jour à chaque vente, le client reçoit son numéro de suivi automatiquement et vous recevez une alerte quand un produit passe sous le seuil.', gain: '3 à 4 h par semaine' },
    outils: ['Shopify, WooCommerce ou PrestaShop', 'Colissimo, Mondial Relay ou autre transporteur', 'Stripe ou PayPal', 'Google Sheets', 'Brevo ou Mailchimp'],
    faq: [
      { q: 'Je vends aussi sur une place de marché, est-ce possible ?', a: 'Souvent, oui, quand la place de marché propose une connexion. Je le vérifie pendant l’audit.' },
      { q: 'Faut-il une application payante pour ma boutique ?', a: 'Pas forcément. Je pars de ce que votre boutique sait déjà faire et je n’ajoute un outil que s’il apporte un vrai gain.' },
      { q: 'Que se passe-t-il si une automatisation tombe en panne ?', a: 'Chaque workflow prévient en cas d’erreur et rien n’est perdu en silence. Le premier mois de suivi est inclus.' },
      { q: 'Combien ça coûte ?', a: 'Les projets démarrent à 150 €, au forfait. Le prix exact est fixé après l’audit gratuit.' },
    ],
  },
  {
    slug: 'professions-liberales',
    nom: 'Professions libérales et cabinets',
    title: 'Automatisation pour les professions libérales',
    seoTitle: 'Automatisation pour professions libérales',
    description: 'Rendez-vous et rappels, documents clients, facturation et relances, reporting : pour cabinets de conseil, architectes, avocats et indépendants.',
    cible: 'Consultants, architectes, avocats, coachs, cabinets de conseil, indépendants',
    naf: ['70.22Z', '71.11Z', '69.10Z', '74.90B'],
    probleme: 'Seul ou en petite équipe, vous facturez votre temps, et chaque heure passée sur l’administratif est une heure non facturée.',
    taches: [
      { titre: 'Rendez-vous', texte: 'Les rendez-vous pris en ligne arrivent dans votre agenda, avec un rappel au client et les documents à préparer.' },
      { titre: 'Arrivée d’un nouveau client', texte: 'Lettre de mission, questionnaire et demande de documents partent automatiquement dès qu’un client dit oui.' },
      { titre: 'Facturation et relances', texte: 'Les factures sont préparées à partir de votre suivi d’activité et les retards relancés à date fixe.' },
      { titre: 'Reporting', texte: 'Le récapitulatif de la semaine arrive seul dans votre boîte mail.' },
    ],
    exemple: { avant: 'Le lundi matin, vous assemblez les chiffres de trois outils et relancez les factures en retard une par une.', apres: 'Le récapitulatif arrive seul dans votre boîte mail et les relances partent automatiquement, avec un ton que vous avez choisi.', gain: '1 h 30 par semaine' },
    outils: ['Calendly ou Google Agenda', 'Gmail ou Outlook', 'logiciel de facturation', 'Google Drive ou OneDrive', 'Notion ou tableur'],
    faq: [
      { q: 'Mes échanges sont confidentiels, est-ce compatible ?', a: 'Oui : les automatisations tournent sur vos comptes et rien de sensible n’est envoyé à un service d’IA sans votre accord explicite.' },
      { q: 'Je travaille seul, est-ce rentable ?', a: 'C’est souvent là que le gain se voit le plus. L’audit gratuit sert justement à vérifier que le temps gagné justifie le coût.' },
      { q: 'Faut-il des compétences techniques ?', a: 'Non. Vous décrivez votre façon de travailler, je construis, et chaque automatisation est documentée avec des mots simples.' },
      { q: 'Combien ça coûte ?', a: 'Les projets démarrent à 150 €, au forfait. Le prix exact est fixé après l’audit gratuit.' },
    ],
  },
  {
    slug: 'commerces-restaurants',
    nom: 'Commerces et restaurants',
    title: 'Automatisation pour les commerces et restaurants',
    seoTitle: 'Automatisation pour commerces et restaurants',
    description: 'Réservations et rappels, demandes d’avis Google, commandes fournisseurs, factures pour le comptable : moins d’administratif après la fermeture.',
    cible: 'Restaurants, commerces de proximité, salons de coiffure et instituts',
    naf: ['56.10A', '56.10C', '96.02A', '96.02B', '47.71Z'],
    probleme: 'Le service ou la boutique occupe la journée, et l’administratif se fait après la fermeture : réservations, avis, commandes, factures.',
    taches: [
      { titre: 'Réservations', texte: 'Les réservations prises en ligne déclenchent un rappel au client, ce qui limite les absences.' },
      { titre: 'Avis Google', texte: 'Après une visite, le client reçoit un message simple l’invitant à laisser un avis.' },
      { titre: 'Commandes fournisseurs', texte: 'Les besoins notés dans la semaine sont regroupés en une commande prête à envoyer.' },
      { titre: 'Factures pour le comptable', texte: 'Les factures fournisseurs reçues par e-mail sont rangées et transmises chaque mois.' },
    ],
    exemple: { avant: 'Les factures fournisseurs arrivent par e-mail et sur papier, et sont rassemblées à la main en fin de mois pour le comptable.', apres: 'Chaque facture reçue par e-mail est renommée, rangée et transmise au comptable une fois par mois.', gain: 'Une à deux heures par mois sur les seules factures (ordre de grandeur)' },
    outils: ['TheFork, Zenchef ou Planity', 'Google Business Profile', 'Gmail ou Outlook', 'caisse enregistreuse', 'tableur'],
    faq: [
      { q: 'J’utilise déjà un outil de réservation, faut-il en changer ?', a: 'Non. Je pars de votre outil et je relie ce qu’il sait faire au reste : rappels, avis, fichier clients.' },
      { q: 'Demander des avis automatiquement, est-ce autorisé ?', a: 'Oui, tant que la demande est faite à de vrais clients, sans contrepartie et sans filtrer les avis négatifs.' },
      { q: 'Combien de temps pour la mise en place ?', a: 'Une à deux semaines pour une première automatisation, tests compris.' },
      { q: 'Combien ça coûte ?', a: 'Les projets démarrent à 150 €, au forfait. Le prix exact est fixé après l’audit gratuit.' },
    ],
  },
]
