// Articles du blog. Pour ajouter un article : copiez un bloc ci-dessous, changez le slug (l'adresse),
// la date et le contenu. Il apparaît automatiquement sur /blog, dans le plan du site, dans les données
// structurées (Google) et dans llms-full.txt (IA).
//
// Contenu : une liste de blocs.
//   { h2: 'Titre de partie' }
//   { p: 'Paragraphe. Les liens s’écrivent [comme ceci](/contact).' }
//   { ul: ['élément', 'élément'] }   liste à puces
//   { ol: ['étape', 'étape'] }       liste numérotée
//   { note: 'Encadré à retenir.' }

export const posts = [
  {
    slug: 'taches-a-automatiser-tpe',
    title: '5 tâches à automatiser en priorité dans une petite entreprise',
    description: 'Devis, relances de factures, classement des justificatifs, reporting, réponses récurrentes : les tâches qui rapportent le plus de temps quand on les automatise, et comment s’y prendre.',
    date: '2026-11-04',
    category: 'Automatisation',
    lead: 'Dans une petite entreprise, le temps perdu ne vient pas d’une grosse tâche, mais d’une dizaine de petites qui reviennent chaque semaine. Voici les cinq qui méritent d’être automatisées en premier, parce qu’elles sont fréquentes, répétitives et faciles à fiabiliser.',
    body: [
      { h2: 'Comment repérer une tâche à automatiser' },
      { p: 'Une bonne candidate coche trois cases : elle revient au moins chaque semaine, elle suit toujours les mêmes étapes, et ses informations existent déjà quelque part sous forme numérique (un e-mail, un formulaire, un tableur, un PDF). Si vous recopiez une information d’un outil vers un autre, c’est presque toujours automatisable.' },
      { note: 'Le bon réflexe : notez pendant une semaine chaque tâche que vous faites « encore une fois ». La liste qui en sort est votre feuille de route.' },

      { h2: '1. Le traitement des demandes de devis' },
      { p: 'Une demande arrive par le site, une autre par e-mail, une troisième par téléphone. Il faut la noter, créer la fiche du client, puis rédiger le devis. L’automatisation regroupe toutes les demandes au même endroit, crée la fiche client dans votre CRM ou votre tableur, et prépare un brouillon de devis à partir de vos tarifs. Vous n’avez plus qu’à relire et envoyer.' },

      { h2: '2. Les relances de factures impayées' },
      { p: 'Relancer est désagréable, donc on le reporte. Une automatisation envoie un rappel courtois à J+7, puis une relance plus ferme à J+15, avec le ton que vous avez choisi. Elle s’arrête dès que le paiement est enregistré. Résultat : moins d’oublis, et une trésorerie plus régulière.' },

      { h2: '3. Le classement des factures et justificatifs' },
      { p: 'Les PDF s’accumulent dans la boîte mail et sont rangés à la main en fin de mois. Ici, l’intelligence artificielle est vraiment utile : elle lit chaque document, en extrait le fournisseur, la date et le montant, le renomme, le range dans le bon dossier et reporte les montants dans votre tableau de suivi ou celui de votre comptable.' },

      { h2: '4. Le reporting hebdomadaire' },
      { p: 'Le lundi matin, beaucoup de dirigeants assemblent les chiffres de trois outils différents : ventes, rendez-vous, devis en cours. Un récapitulatif automatique arrive à la place dans votre boîte mail, toujours au même format. Vous gardez l’analyse, la machine fait la collecte.' },

      { h2: '5. Les réponses aux questions qui reviennent' },
      { p: 'Horaires, délais, documents à fournir, suivi de commande : une bonne partie des e-mails reçus posent les mêmes questions. Une automatisation peut classer les messages entrants par type de demande et préparer une réponse que vous relisez avant envoi. Le client est servi plus vite, et vous gardez la main.' },

      { h2: 'Par où commencer ?' },
      { p: 'Commencez par une seule tâche, celle qui vous agace le plus. Une première automatisation simple se met en place en une à deux semaines, tests compris, et sert ensuite de base aux suivantes. Vous ne savez pas laquelle choisir ? C’est exactement l’objet de l’[audit gratuit de 30 minutes](/contact) : on regarde votre semaine type et on fixe ensemble l’ordre de priorité.' },
    ],
  },
  {
    slug: 'n8n-make-zapier-comparatif',
    title: 'n8n, Make ou Zapier : quel outil choisir pour automatiser votre entreprise ?',
    description: 'Comparatif simple des trois principaux outils d’automatisation pour les TPE et PME : facilité, prix, hébergement des données, cas d’usage. Et comment choisir sans se tromper.',
    date: '2026-11-04',
    category: 'Outils',
    lead: 'Pour relier vos logiciels entre eux sans développement sur mesure, trois outils dominent : Zapier, Make et n8n. Ils font globalement la même chose, mais pas de la même façon. Voici comment les distinguer et choisir celui qui convient à votre activité.',
    body: [
      { h2: 'Ce que font ces outils' },
      { p: 'Tous les trois fonctionnent sur le même principe : un déclencheur (un e-mail reçu, un formulaire rempli, une ligne ajoutée dans un tableur…) lance une suite d’actions dans d’autres logiciels (créer un contact, envoyer un message, mettre à jour une facture…). On appelle cette suite un workflow, ou un scénario.' },

      { h2: 'Zapier : le plus simple à prendre en main' },
      { p: 'Zapier est le plus connu et le plus accessible. Il se connecte à un très grand nombre d’applications et se configure en quelques clics. En contrepartie, il devient vite coûteux quand le nombre d’actions augmente, et il est moins souple pour les enchaînements complexes.' },
      { ul: ['Idéal pour : quelques automatisations simples entre des outils courants.', 'Points d’attention : coût qui grimpe avec le volume, logique avancée limitée.'] },

      { h2: 'Make : le plus visuel' },
      { p: 'Make (anciennement Integromat) présente chaque scénario sous forme de schéma, ce qui le rend très lisible. Il gère bien les traitements plus riches (conditions, boucles, transformations de données) et reste généralement plus économique que Zapier à volume égal.' },
      { ul: ['Idéal pour : des scénarios de complexité moyenne, avec plusieurs étapes et conditions.', 'Points d’attention : un peu plus d’apprentissage au départ.'] },

      { h2: 'n8n : le plus libre' },
      { p: 'n8n peut s’utiliser en ligne ou être installé sur votre propre serveur. Cette seconde option est précieuse quand vos données sont sensibles : elles restent sous votre contrôle, et le coût ne dépend plus du nombre d’exécutions. n8n est aussi très à l’aise avec l’intelligence artificielle et les appels d’API.' },
      { ul: ['Idéal pour : des volumes importants, des données à garder chez soi, des workflows avec de l’IA.', 'Points d’attention : un hébergement à prévoir et à maintenir si vous l’installez vous-même.'] },

      { h2: 'Comment choisir' },
      { ol: [
        'Partez de vos outils actuels : vérifiez que ceux que vous utilisez chaque jour sont bien pris en charge.',
        'Estimez le volume : quelques dizaines d’exécutions par mois ou plusieurs milliers ? Le modèle de prix change tout.',
        'Regardez la sensibilité des données : données clients, santé, finances… plus elles sont sensibles, plus l’hébergement compte.',
        'Pensez à la reprise : choisissez un outil que vous ou quelqu’un d’autre pourrez comprendre et faire évoluer.',
      ] },
      { note: 'Les tarifs de ces outils évoluent souvent : consultez toujours leur page de prix à jour avant de vous décider.' },
      { p: 'Il n’y a pas de meilleur outil dans l’absolu, seulement un outil adapté à votre situation. Chez Axion Studio, le choix se fait pendant l’audit, en fonction de vos logiciels, de vos volumes et de vos données, et l’abonnement reste toujours à votre nom. [Voir les services](/services) ou [demander un audit gratuit](/contact).' },
    ],
  },
  {
    slug: 'ia-donnees-clients-regles',
    title: 'IA et données clients : 6 règles pour l’utiliser sans risque',
    description: 'Utiliser l’intelligence artificielle dans une petite entreprise sans exposer les données de ses clients : les bonnes pratiques à appliquer, simplement.',
    date: '2026-11-04',
    category: 'IA et sécurité',
    lead: 'L’intelligence artificielle fait gagner un temps réel pour lire, trier, résumer ou rédiger. Mais dès qu’elle touche aux données de vos clients, quelques règles simples évitent les mauvaises surprises. Les voici.',
    body: [
      { h2: '1. N’envoyer que les informations utiles' },
      { p: 'Pour classer un e-mail par type de demande, l’IA n’a pas besoin du numéro de téléphone ni de l’adresse du client. Avant chaque usage, posez-vous la question : de quoi a-t-elle réellement besoin pour faire la tâche ? Tout le reste peut être retiré ou masqué avant l’envoi.' },

      { h2: '2. Choisir des offres professionnelles' },
      { p: 'Les versions gratuites des services d’IA peuvent utiliser vos échanges pour améliorer leurs produits. Les offres professionnelles et les API payantes s’engagent généralement à ne pas le faire. Lisez les conditions de chaque service, et privilégiez ceux qui le garantissent par écrit.' },

      { h2: '3. Garder les données sensibles à l’écart' },
      { p: 'Données de santé, informations bancaires, mots de passe, pièces d’identité : ces informations n’ont rien à faire dans un outil d’IA généraliste sans un cadre précis et l’accord des personnes concernées.' },

      { h2: '4. Garder un humain dans la boucle' },
      { p: 'L’IA peut se tromper, avec beaucoup d’assurance. Pour tout ce qui part chez un client (une réponse, un devis, une relance), la bonne pratique est de faire préparer un brouillon par l’IA, puis de le relire avant l’envoi.' },

      { h2: '5. Informer vos clients' },
      { p: 'Si vous utilisez un outil d’IA pour traiter leurs demandes, dites-le simplement dans votre politique de confidentialité : quelles données, pour quoi faire, et avec quel prestataire. La transparence rassure, et c’est une exigence du RGPD.' },

      { h2: '6. Pouvoir tout arrêter' },
      { p: 'Les comptes, les clés d’accès et les automatisations doivent être à votre nom. Vous devez pouvoir retirer un accès ou couper un service en quelques minutes, sans dépendre de personne.' },

      { note: 'Ces conseils sont des bonnes pratiques générales, pas un avis juridique. Pour une situation particulière, rapprochez-vous de la CNIL (cnil.fr) ou d’un professionnel du droit.' },
      { p: 'Ce sont exactement les règles appliquées sur chaque projet Axion Studio : elles sont détaillées sur la page [Sécurité et données](/securite). Une question sur votre cas ? [Écrivez-moi](/contact).' },
    ],
  },
]

const words = p => [p.lead, ...p.body.flatMap(b => b.h2 || b.p || b.note || b.ul || b.ol || [])].join(' ').split(/\s+/).length
export const readingMinutes = p => Math.max(1, Math.round(words(p) / 200))
export const wordCount = words
export const formatDate = iso => new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
