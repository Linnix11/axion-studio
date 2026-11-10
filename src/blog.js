// Articles du blog. Pour ajouter un article : copiez un bloc ci-dessous, changez le slug (l'adresse),
// la date et le contenu. Il apparaît automatiquement sur /blog, dans le plan du site, dans les données
// structurées (Google) et dans llms-full.txt (IA).
//
// seoTitle / seoDescription (facultatifs) : versions courtes pour Google ; sinon title / description.
//
// Contenu : une liste de blocs.
//   { h2: 'Titre de partie' }
//   { p: 'Paragraphe. Les liens s’écrivent [comme ceci](/contact/).' }
//   { ul: ['élément', 'élément'] }   liste à puces
//   { ol: ['étape', 'étape'] }       liste numérotée
//   { note: 'Encadré à retenir.' }
//
// faq (facultatif) : [{ q: 'Question', a: 'Réponse' }], affichée en fin d'article et reprise en FAQPage (Google, IA).

export const posts = [
  {
    "slug": "devis-artisan-automatiser",
    "seoTitle": "Devis d’artisan : le préparer en 5 minutes",
    "seoDescription": "De la demande au devis prêt à relire en quelques minutes : ce qu’un artisan peut automatiser, ce qui reste à faire soi-même et les règles à respecter.",
    "title": "Devis d’artisan : de la demande au devis prêt en 5 minutes",
    "description": "Comment automatiser la réception des demandes, la fiche client, le brouillon de devis et les relances, sans perdre la main sur le chiffrage.",
    "date": "2026-11-10",
    "category": "Artisans",
    "lead": "Un artisan peut passer de la demande au devis prêt à relire en quelques minutes : la demande crée seule une fiche client, un brouillon de devis est préparé à partir de ses tarifs habituels, et il n’a plus qu’à vérifier, ajuster et envoyer. Le chiffrage reste le sien, mais la saisie, le classement et les relances se font sans lui.",
    "body": [
      {
        "h2": "Où part le temps aujourd’hui"
      },
      {
        "p": "Le devis lui-même ne prend souvent que quelques minutes à chiffrer. Le reste du temps part autour : recopier la demande reçue par téléphone, par e-mail ou par un annuaire, retrouver les coordonnées du client, repartir d’un devis vide, puis relancer quand le client ne répond pas."
      },
      {
        "p": "Ce travail se fait le soir ou le week-end, après le chantier. Et une demande qui attend plusieurs jours est souvent une demande perdue : le client a déjà contacté quelqu’un d’autre."
      },
      {
        "h2": "Le circuit automatisé, étape par étape"
      },
      {
        "ol": [
          "La demande arrive par le formulaire du site, par e-mail ou par un annuaire. Pour les appels, un formulaire court, rempli en 30 secondes après l’appel, déclenche la même suite.",
          "Une fiche client est créée automatiquement : nom, adresse du chantier, besoin, photos, délai souhaité.",
          "Le client reçoit tout de suite un message qui confirme la réception et annonce le délai de réponse.",
          "Un brouillon de devis est préparé dans votre logiciel à partir de vos lignes habituelles (déplacement, main-d’œuvre, fournitures courantes).",
          "Vous êtes prévenu sur votre téléphone. Vous relisez, ajustez après la visite si besoin, et envoyez.",
          "Sans réponse après quelques jours, une relance polie part avec vos mots. Une fois le devis signé, la facture d’acompte est préparée."
        ]
      },
      {
        "note": "Rien ne part chez le client sans votre relecture : l’automatisation prépare, c’est vous qui décidez."
      },
      {
        "h2": "Ce qui reste à faire vous-même"
      },
      {
        "ul": [
          "Le chiffrage final, surtout quand il dépend de ce que vous voyez sur le chantier.",
          "La visite technique et les choix de matériaux.",
          "Les échanges délicats : client hésitant, réclamation, litige."
        ]
      },
      {
        "h2": "Les règles à respecter sur un devis"
      },
      {
        "p": "Pour les travaux de dépannage, de réparation et d’entretien chez les particuliers (plomberie, serrurerie, électricité…), le devis détaillé est obligatoire avant toute intervention, quel que soit le montant, depuis l’arrêté du 24 janvier 2017. Il doit notamment indiquer s’il est gratuit ou payant, le taux horaire de main-d’œuvre et les frais de déplacement."
      },
      {
        "p": "Un modèle de devis bien préparé dans votre logiciel reprend ces mentions à chaque fois : c’est un des avantages de partir d’un brouillon plutôt que d’une page blanche."
      },
      {
        "note": "Les mentions exactes dépendent de votre métier et de votre clientèle (particuliers ou professionnels). Vérifiez-les auprès de votre chambre de métiers ou de votre organisation professionnelle. Cet article ne remplace pas un conseil juridique."
      },
      {
        "h2": "Avec quels outils"
      },
      {
        "p": "Les logiciels de devis du bâtiment (Obat, Tolteck, Batappli et d’autres) proposent souvent des modèles et parfois des connexions. Une automatisation relie ce logiciel à votre messagerie, à votre site et à votre agenda, avec un outil comme [n8n, Make ou Zapier](/blog/n8n-make-zapier-comparatif/). Je pars toujours de votre logiciel actuel : en changer n’est proposé que s’il bloque vraiment."
      },
      {
        "p": "Ordre de grandeur : sur ce type de circuit, le gain se compte en heures par semaine, selon le nombre de demandes reçues. Les projets démarrent à 150 € au forfait ([voir les tarifs](/tarifs/))."
      },
      {
        "h2": "Pour aller plus loin"
      },
      {
        "p": "Voir la page consacrée à l’[automatisation pour les artisans du bâtiment](/automatisation/artisans-batiment/), et l’article sur les [relances de factures impayées](/blog/relances-factures-impayees/), l’autre tâche qui pèse le plus sur les artisans."
      }
    ],
    "faq": [
      {
        "q": "Peut-on automatiser un devis d’artisan ?",
        "a": "On automatise tout ce qui l’entoure : réception de la demande, fiche client, brouillon de devis à partir de vos tarifs, notification et relances. Le chiffrage final et l’envoi restent sous votre contrôle."
      },
      {
        "q": "Faut-il changer de logiciel de devis ?",
        "a": "Non, dans la plupart des cas. L’automatisation se branche sur votre logiciel actuel, ou sur un modèle de document si vous n’en avez pas."
      },
      {
        "q": "Et les demandes reçues par téléphone ?",
        "a": "Un formulaire très court, rempli sur votre téléphone après l’appel, déclenche la même suite que les demandes écrites."
      },
      {
        "q": "Le devis est-il obligatoire pour un dépannage ?",
        "a": "Oui, pour les travaux de dépannage, de réparation et d’entretien chez les particuliers dans le bâtiment, un devis détaillé doit être remis avant l’intervention, quel que soit le montant."
      }
    ]
  },
  {
    "slug": "prise-rendez-vous-en-ligne-rappels",
    "seoTitle": "Prise de rendez-vous en ligne et rappels SMS",
    "seoDescription": "Relier la réservation en ligne à votre agenda, envoyer des rappels par SMS ou e-mail et limiter les absences : comment faire et quelles règles respecter.",
    "title": "Prise de rendez-vous en ligne : la relier à votre agenda et aux rappels SMS",
    "description": "Réservation en ligne, agenda à jour, rappel la veille et créneaux libérés à temps : comment automatiser les rendez-vous d’une petite entreprise.",
    "date": "2026-11-10",
    "category": "Organisation",
    "lead": "Pour automatiser vos rendez-vous, il faut trois briques reliées entre elles : une page de réservation qui ne propose que vos vrais créneaux libres, votre agenda mis à jour seul, et un rappel envoyé la veille par SMS ou par e-mail avec un lien pour annuler. Le client réserve à toute heure, vous ne ressaisissez rien, et les absences diminuent.",
    "body": [
      {
        "h2": "Le vrai coût des rendez-vous gérés à la main"
      },
      {
        "ul": [
          "Les allers-retours par téléphone ou par e-mail pour trouver un créneau.",
          "La ressaisie dans l’agenda, avec le risque de doublon ou d’oubli.",
          "Les absences sans prévenir : un créneau perdu, impossible à reproposer.",
          "Les rappels faits de mémoire, quand on y pense."
        ]
      },
      {
        "h2": "Le circuit automatisé"
      },
      {
        "ol": [
          "Le client choisit un créneau sur votre page de réservation, qui ne montre que vos disponibilités réelles.",
          "Le rendez-vous s’inscrit dans votre agenda (Google Agenda, Outlook…) avec les informations utiles : nom, motif, téléphone, adresse.",
          "Le client reçoit une confirmation immédiate, avec ce qu’il doit préparer ou apporter.",
          "La veille, un rappel part par SMS ou par e-mail, avec un lien pour annuler ou déplacer.",
          "Un créneau annulé redevient disponible tout de suite, et peut être proposé à une liste d’attente.",
          "Après le rendez-vous, un message peut remercier le client, envoyer un document ou demander un avis."
        ]
      },
      {
        "h2": "SMS ou e-mail : que choisir ?"
      },
      {
        "p": "Le SMS est lu presque toujours et rapidement : c’est le meilleur canal pour un rappel la veille. Il coûte quelques centimes par message selon le fournisseur. L’e-mail est gratuit et convient à la confirmation, qui peut contenir plus d’informations (plan d’accès, documents à préparer). Beaucoup de petites entreprises combinent les deux : e-mail à la réservation, SMS la veille."
      },
      {
        "h2": "Ce que dit la règle (RGPD)"
      },
      {
        "p": "Un rappel de rendez-vous demandé par le client est un message lié au service, pas de la prospection : il n’exige pas de consentement marketing. Il faut en revanche informer le client de l’usage de son numéro, par une mention courte sur la page de réservation."
      },
      {
        "p": "Attention : dès qu’un message contient une promotion ou une offre, il bascule dans la prospection commerciale, avec des règles plus strictes (consentement préalable pour les particuliers). Gardez les rappels purement pratiques."
      },
      {
        "note": "Les règles détaillées sont sur cnil.fr, rubrique « prospection commerciale par SMS ». Cet article ne remplace pas un conseil juridique."
      },
      {
        "h2": "Avec quels outils"
      },
      {
        "p": "Les outils de réservation spécialisés (Planity, Doctolib, TheFork, Calendly, la page de réservation de Google Agenda…) font déjà une partie du travail. L’automatisation sert à les relier au reste : votre fichier clients, votre facturation, les demandes d’avis, ou une liste d’attente. Je pars de l’outil que vous utilisez déjà, et je n’en propose un nouveau que s’il manque une brique."
      },
      {
        "p": "Ordre de grandeur : ce type de circuit se met en place en quelques jours, et les projets démarrent à 150 € au forfait ([voir les tarifs](/tarifs/))."
      },
      {
        "h2": "Pour aller plus loin"
      },
      {
        "p": "Les rendez-vous sont au cœur des pages consacrées aux [commerces et restaurants](/automatisation/commerces-restaurants/), aux [professions libérales](/automatisation/professions-liberales/) et aux [agences immobilières](/automatisation/agences-immobilieres/) pour les visites. Voir aussi les [5 tâches à automatiser en priorité](/blog/taches-a-automatiser-tpe/)."
      }
    ],
    "faq": [
      {
        "q": "Faut-il le consentement du client pour lui envoyer un rappel par SMS ?",
        "a": "Pas pour un rappel de rendez-vous qu’il a lui-même pris : c’est un message lié au service. Il faut l’informer de l’usage de son numéro, et ne pas glisser de promotion dans le rappel."
      },
      {
        "q": "Combien coûte un rappel par SMS ?",
        "a": "Quelques centimes par message selon le fournisseur et le volume. L’e-mail est gratuit mais moins lu au dernier moment."
      },
      {
        "q": "Mon outil de réservation envoie déjà des rappels, à quoi sert une automatisation ?",
        "a": "À relier cet outil au reste : fichier clients, facturation, demandes d’avis, liste d’attente, tableau de suivi. Si votre outil couvre déjà tout, l’audit vous le dira."
      },
      {
        "q": "Les rappels réduisent-ils vraiment les absences ?",
        "a": "Oui, c’est leur principal intérêt : un client rappelé la veille, avec un lien pour annuler, prévient plus souvent quand il ne peut pas venir, ce qui libère le créneau à temps."
      }
    ]
  },
  {
    slug: 'relances-factures-impayees',
    seoTitle: 'Relancer une facture impayée : guide TPE',
    seoDescription: 'Quand relancer, quoi écrire, quelles pénalités appliquer et comment automatiser les relances de factures impayées sans braquer vos clients.',
    title: 'Relances de factures impayées : comment les automatiser sans braquer vos clients',
    description: 'Le calendrier de relance qui marche, les règles à connaître (délais, pénalités, 40 € d’indemnité) et ce qu’une automatisation peut faire à votre place.',
    date: '2026-11-10',
    category: 'Facturation',
    lead: 'Pour relancer une facture impayée sans abîmer la relation, il faut relancer tôt, à date fixe, avec un ton qui monte progressivement : un rappel aimable avant l’échéance, une relance le lendemain, puis une relance ferme et enfin une mise en demeure. Ces étapes se répètent à l’identique d’un client à l’autre : c’est exactement ce qu’une automatisation sait faire, pendant que vous gardez la main sur les cas sensibles.',
    body: [
      { h2: 'Pourquoi les relances sont souvent oubliées' },
      { p: 'Relancer un client est désagréable, prend du temps et passe toujours après le travail urgent. Résultat : la relance part trop tard, ou pas du tout, et le retard s’installe. Plus une facture est ancienne, plus elle est difficile à récupérer.' },
      { p: 'Le problème n’est presque jamais de savoir quoi écrire. C’est de penser à le faire, au bon moment, pour chaque facture. Une tâche régulière, répétitive et basée sur des dates : le cas idéal pour l’automatisation.' },

      { h2: 'Ce que dit la loi entre professionnels' },
      { ul: [
        'Délai de paiement : 30 jours après la réception des marchandises ou la fin de la prestation si rien n’est prévu. Il peut être porté par contrat jusqu’à 60 jours après la date de la facture, ou 45 jours fin de mois (article L. 441-10 du Code de commerce).',
        'Pénalités de retard : dues sans qu’un rappel soit nécessaire. Leur taux est fixé dans vos conditions de vente ; à défaut, c’est le taux de la Banque centrale européenne majoré de 10 points.',
        'Indemnité forfaitaire pour frais de recouvrement : 40 € par facture payée en retard (article D. 441-5 du Code de commerce), en plus des pénalités.',
        'Le taux des pénalités et l’indemnité de 40 € doivent figurer sur vos factures et dans vos conditions générales de vente.',
      ] },
      { note: 'Pour les ventes aux particuliers, les règles sont différentes : les pénalités ne s’appliquent que si elles sont prévues au contrat. En cas de doute, vérifiez sur entreprendre.service-public.fr ou auprès de votre expert-comptable. Cet article ne remplace pas un conseil juridique.' },

      { h2: 'Le calendrier de relance qui marche' },
      { ol: [
        'Avant l’échéance (environ 5 jours avant) : un rappel aimable avec la facture en pièce jointe et le lien de paiement. Beaucoup de retards sont de simples oublis.',
        'Le lendemain de l’échéance : une première relance courte et neutre, du type « Sauf erreur de notre part, la facture n° X n’a pas encore été réglée ».',
        'Environ 10 jours après : une deuxième relance plus ferme, qui rappelle les pénalités et l’indemnité de 40 € prévues aux conditions de vente.',
        'Environ 20 jours après : un appel téléphonique. C’est souvent là que le vrai problème apparaît (litige, trésorerie, mauvais destinataire).',
        'Environ 30 jours après : une mise en demeure par lettre recommandée avec avis de réception, qui fixe un dernier délai.',
        'Ensuite : procédure d’injonction de payer auprès du tribunal compétent, ou recours à un service de recouvrement.',
      ] },
      { p: 'Ces délais sont des ordres de grandeur à adapter à vos clients : un client fidèle qui paie toujours avec une semaine de retard ne se traite pas comme un nouveau client silencieux.' },

      { h2: 'Ce que l’automatisation fait à votre place' },
      { ul: [
        'Surveiller chaque jour les factures arrivées à échéance, à partir de votre logiciel de facturation, d’un tableur ou de votre plateforme de facture électronique.',
        'Envoyer le rappel et les relances au bon moment, avec vos mots, la facture en pièce jointe et le lien de paiement.',
        'Arrêter les relances dès que le paiement est reçu, grâce au rapprochement avec la banque ou le logiciel de facturation. Aucun client ne reçoit de relance pour une facture déjà réglée.',
        'Calculer les pénalités et l’indemnité de 40 € pour les relances fermes.',
        'Vous prévenir pour l’appel téléphonique et la mise en demeure, avec un brouillon de courrier prêt : ces étapes restent les vôtres.',
        'Tenir un tableau de suivi : qui doit quoi, depuis quand, quelle relance est partie.',
      ] },
      { p: 'Deux réglages évitent les maladresses : une liste de clients à ne jamais relancer automatiquement (grands comptes, litiges en cours), et, si vous le souhaitez, votre validation avant toute relance ferme.' },

      { h2: 'Avec quels outils' },
      { p: 'Beaucoup de logiciels de facturation proposent des relances intégrées : vérifiez d’abord ce que le vôtre sait faire. Une automatisation sur mesure (avec [n8n, Make ou Zapier](/blog/n8n-make-zapier-comparatif/)) devient utile quand les factures sont dans un tableur, quand plusieurs outils doivent se parler (facturation, banque, messagerie, CRM) ou quand vous voulez un ton et un calendrier qui vous ressemblent.' },
      { p: 'Ordre de grandeur : une telle automatisation se met en place en quelques jours, et les projets démarrent à 150 € au forfait ([voir les tarifs](/tarifs/)). Le gain se mesure en heures rendues chaque mois et, surtout, en factures payées plus tôt.' },

      { h2: 'Pour aller plus loin' },
      { p: 'Les relances sont souvent la première tâche automatisée chez les [artisans du bâtiment](/automatisation/artisans-batiment/) et dans les [professions libérales](/automatisation/professions-liberales/). Avec la [facture électronique obligatoire en 2026-2027](/blog/facture-electronique-tpe-2026-2027/), le suivi des paiements devient aussi plus simple à brancher.' },
    ],
    faq: [
      { q: 'Quand faut-il relancer une facture impayée ?', a: 'Dès le lendemain de l’échéance, après un rappel aimable envoyé quelques jours avant. Plus la relance est tardive, plus le paiement est difficile à obtenir.' },
      { q: 'Peut-on facturer 40 € de frais à un client professionnel en retard ?', a: 'Oui. L’indemnité forfaitaire de 40 € pour frais de recouvrement est due pour chaque facture payée en retard entre professionnels, en plus des pénalités. Elle doit figurer sur vos factures et vos conditions de vente.' },
      { q: 'Une relance automatique peut-elle froisser un bon client ?', a: 'Pas si elle est bien réglée : ton aimable au début, arrêt dès le paiement reçu, et liste de clients exclus des relances automatiques. Les étapes fermes peuvent rester soumises à votre validation.' },
      { q: 'Que faire si le client ne paie toujours pas après les relances ?', a: 'Envoyer une mise en demeure par lettre recommandée avec avis de réception, puis engager une procédure d’injonction de payer ou confier le dossier à un service de recouvrement.' },
    ],
  },
  {
    slug: 'facture-electronique-tpe-2026-2027',
    seoTitle: 'Facture électronique 2026 : le guide TPE',
    seoDescription: 'Réception obligatoire depuis septembre 2026, émission en septembre 2027 pour les TPE : qui est concerné, ce qui change et ce que vous pouvez automatiser.',
    title: 'Facture électronique 2026-2027 : ce qui change pour les TPE et ce que vous pouvez automatiser',
    description: 'Le calendrier de la réforme, qui est concerné, ce qui change concrètement, et les tâches autour des factures que vous pouvez automatiser dès maintenant.',
    date: '2026-11-10',
    category: 'Facturation',
    lead: 'Depuis le 1er septembre 2026, toutes les entreprises établies en France et assujetties à la TVA, TPE et micro-entrepreneurs compris, doivent pouvoir recevoir des factures électroniques. À partir du 1er septembre 2027, les PME, TPE et micro-entreprises devront aussi les émettre. Voici ce que cela change concrètement, et ce que vous pouvez automatiser autour.',
    body: [
      { h2: 'Le calendrier en bref' },
      { ul: [
        '1er septembre 2026 : toutes les entreprises doivent pouvoir recevoir des factures électroniques. Les grandes entreprises et les ETI doivent aussi les émettre.',
        '1er septembre 2027 : les PME, TPE et micro-entreprises doivent à leur tour émettre leurs factures en électronique et transmettre leurs données de transaction à l’administration (le « e-reporting »).',
      ] },
      { note: 'Une facture en PDF envoyée par e-mail n’est pas une facture électronique au sens de la réforme : il faut un format structuré (Factur-X, UBL ou CII), transmis par une plateforme agréée par l’État.' },

      { h2: 'Qui est concerné' },
      { p: 'Toutes les entreprises établies en France et assujetties à la TVA, pour leurs factures entre entreprises. Cela inclut les micro-entrepreneurs en franchise en base : ils ne facturent pas la TVA, mais restent assujettis, donc concernés.' },
      { p: 'Pour les ventes aux particuliers et les opérations avec l’étranger, il n’y a pas de facture électronique à émettre, mais certaines données de ces ventes doivent être transmises à l’administration : c’est le e-reporting.' },

      { h2: 'Ce qui change concrètement' },
      { ul: [
        'Choisir une plateforme agréée : c’est par elle que vos factures sont reçues et, à partir de 2027, émises. La liste officielle est publiée sur impots.gouv.fr. Votre logiciel de facturation ou votre expert-comptable en propose souvent une.',
        'Recevoir vos factures fournisseurs par cette plateforme, et non plus seulement par e-mail ou par courrier.',
        'Émettre, à partir de septembre 2027, vos factures dans un format structuré, avec des mentions obligatoires complétées (notamment le numéro SIREN du client).',
        'Transmettre les données de vos ventes aux particuliers et à l’étranger, si vous en faites.',
      ] },

      { h2: 'Ce que vous pouvez automatiser autour des factures' },
      { p: 'La réforme impose un format et un circuit. Elle ne range pas vos factures à votre place, et ne relance pas vos clients. C’est là que l’automatisation fait gagner du temps :' },
      { ul: [
        'Récupérer chaque facture reçue sur la plateforme, la ranger dans le bon dossier et la transmettre à votre comptable, sans téléchargement manuel.',
        'Rapprocher factures et paiements, et relancer automatiquement les factures impayées à date fixe.',
        'Créer la facture à partir d’un devis accepté ou d’une commande, puis l’envoyer par la plateforme, sans ressaisie.',
        'Être prévenu quand une facture est rejetée, pour la corriger tout de suite.',
      ] },
      { p: 'La plupart des plateformes et des logiciels de facturation proposent des connexions (API) : c’est ce qui permet de les relier à votre messagerie, à votre tableur ou à votre CRM. Je le vérifie au cas par cas pendant l’[audit gratuit de 30 minutes](/contact/).' },

      { h2: 'Par où commencer' },
      { ol: [
        'Demandez à votre logiciel de facturation ou à votre expert-comptable quelle plateforme agréée ils proposent.',
        'Choisissez et désignez votre plateforme : la réception est déjà obligatoire.',
        'Vérifiez les informations de vos clients professionnels, en particulier leur numéro SIREN.',
        'Listez les tâches répétitives autour de vos factures : téléchargement, classement, envoi au comptable, relances.',
        'Testez l’émission bien avant septembre 2027, sur quelques factures, pour ne pas découvrir les problèmes à l’échéance.',
      ] },
      { note: 'Les règles détaillées (cas particuliers, sanctions) évoluent : vérifiez-les sur impots.gouv.fr, rubrique « facturation électronique », ou auprès de votre expert-comptable. Cet article ne remplace pas un conseil fiscal.' },

      { h2: 'Pour aller plus loin' },
      { p: 'Selon votre métier, les tâches à automatiser ne sont pas les mêmes : voir par exemple les pages consacrées aux [artisans du bâtiment](/automatisation/artisans-batiment/) et aux [experts-comptables](/automatisation/experts-comptables/), ou l’article sur les [relances et autres tâches à automatiser en priorité](/blog/taches-a-automatiser-tpe/).' },
    ],
    faq: [
      { q: "La facture électronique est-elle obligatoire pour les TPE en 2026 ?", a: "Depuis le 1er septembre 2026, toutes les entreprises assujetties à la TVA, TPE et micro-entrepreneurs compris, doivent pouvoir recevoir des factures électroniques. L’obligation d’en émettre arrive le 1er septembre 2027 pour les PME, TPE et micro-entreprises." },
      { q: "Une facture PDF envoyée par e-mail est-elle une facture électronique ?", a: "Non. Au sens de la réforme, une facture électronique est un fichier structuré (Factur-X, UBL ou CII) transmis par une plateforme agréée par l’État." },
      { q: "Les micro-entrepreneurs sont-ils concernés ?", a: "Oui, y compris en franchise en base de TVA : ils ne facturent pas la TVA mais restent assujettis, donc concernés pour leurs factures entre entreprises." },
      { q: "Que peut-on automatiser avec la facture électronique ?", a: "La récupération et le classement des factures reçues, leur transmission au comptable, la création des factures à partir des devis acceptés, le rapprochement avec les paiements et les relances des impayés." },
    ],
  },
  {
    slug: 'cout-automatisation-petite-entreprise',
    seoTitle: 'Combien coûte l’automatisation ? (TPE)',
    seoDescription: 'Ce qui fait varier le prix d’une automatisation, les coûts à prévoir et une méthode simple pour savoir si elle sera rentable pour votre entreprise.',
    title: 'Combien coûte l’automatisation pour une petite entreprise ?',
    description: 'Ce qui fait varier le prix d’une automatisation, les coûts récurrents à prévoir, et une méthode simple pour calculer si elle sera rentable dans votre cas.',
    date: '2026-11-04',
    category: 'Automatisation',
    lead: 'C’est la première question que se posent les dirigeants de petites entreprises, et elle est légitime : une automatisation n’a d’intérêt que si elle fait gagner plus qu’elle ne coûte. Voici ce qui fait varier le prix, ce qu’il faut prévoir chaque mois, et comment savoir en cinq minutes si le jeu en vaut la chandelle.',
    body: [
      { h2: 'Ce qui fait varier le prix' },
      { p: 'Le prix d’une automatisation dépend moins de la technologie que du nombre d’étapes et d’outils à relier. Quatre critères comptent surtout :' },
      { ul: [
        'Le nombre d’outils à connecter : relier une boîte mail à un tableur est plus simple que relier un site, un CRM et un logiciel de facturation.',
        'Le nombre de cas particuliers : une tâche toujours identique coûte moins cher qu’une tâche avec beaucoup d’exceptions.',
        'L’usage de l’intelligence artificielle : lire des PDF ou rédiger des brouillons demande plus de réglages et de tests.',
        'Le niveau de fiabilité attendu : alertes en cas d’erreur, reprise automatique, documentation.',
      ] },

      { h2: 'Le coût de mise en place' },
      { p: 'Chez Axion Studio, chaque projet est chiffré au forfait après un audit gratuit de 30 minutes, et démarre à 150 €. Une automatisation simple, qui relie deux outils sur une tâche répétitive, se situe dans le bas de la fourchette ; un projet qui combine plusieurs logiciels et de l’IA demande davantage de travail. Le prix exact figure dans la proposition, avant tout engagement, et il ne bouge pas en cours de route. Le détail est sur la page [Tarifs](/tarifs/).' },

      { h2: 'Les coûts récurrents à prévoir' },
      { p: 'Une fois en place, une automatisation a généralement deux types de coûts mensuels :' },
      { ul: [
        'L’abonnement aux outils : outil d’automatisation (n8n, Make, Zapier…) et, le cas échéant, service d’IA. Il est souscrit à votre nom ; certains usages restent dans les offres gratuites, d’autres non.',
        'Le suivi, si vous le souhaitez : surveillance, corrections et petites évolutions. Il est facultatif et sans engagement.',
      ] },
      { note: 'Les tarifs des outils évoluent souvent : la proposition indique toujours leur coût estimé, vérifié au moment du projet.' },

      { h2: 'Calculer si c’est rentable : la méthode en 3 étapes' },
      { ol: [
        'Estimez le temps passé sur la tâche, en minutes par semaine. Soyez honnête : comptez aussi les interruptions et les reprises.',
        'Multipliez par 47 semaines travaillées pour obtenir les heures par an, puis par la valeur d’une heure de votre temps.',
        'Comparez ce montant au coût de mise en place et aux abonnements sur un an.',
      ] },
      { p: 'Exemple de calcul, avec des chiffres d’illustration : une tâche qui prend 2 heures par semaine représente environ 94 heures par an. Si une heure de votre temps vaut 40 €, cela fait près de 3 760 € de temps par an consacrés à cette tâche. Même en retirant le coût de l’automatisation et des outils, le gain est rapide. À l’inverse, une tâche de 10 minutes par mois ne mérite souvent pas d’être automatisée.' },
      { p: 'Vous pouvez faire l’exercice en quelques secondes avec la semaine type de la [page d’accueil](/) : touchez vos tâches, elle calcule le temps récupérable par semaine et par an.' },

      { h2: 'Ce qui ne se chiffre pas, mais compte' },
      { p: 'Le temps gagné n’est pas le seul bénéfice : moins d’oublis (une relance qui part toujours à l’heure), moins d’erreurs de recopie, des clients qui reçoivent une réponse plus vite, et l’esprit plus libre pour le travail qui compte vraiment.' },

      { h2: 'Le bon réflexe' },
      { p: 'Commencez par la tâche qui vous coûte le plus de temps, et faites-la chiffrer. Si le gain ne justifie pas le coût, un bon prestataire doit vous le dire. C’est l’objet de l’[audit gratuit de 30 minutes](/contact/) : repartir avec une liste claire de ce qui vaut la peine d’être automatisé, et de ce qui ne l’est pas.' },
    ],
  },
  {
    slug: 'taches-a-automatiser-tpe',
    seoTitle: '5 tâches à automatiser en priorité (TPE)',              // titre pour Google (≤ 45 caractères)
    seoDescription: 'Devis, relances, justificatifs, reporting, réponses récurrentes : les 5 tâches qui font gagner le plus de temps une fois automatisées.',
    title: '5 tâches à automatiser en priorité dans une petite entreprise',
    description: 'Devis, relances de factures, classement des justificatifs, reporting, réponses récurrentes : les tâches qui rapportent le plus de temps quand on les automatise, et comment s’y prendre.',
    date: '2026-11-04',
    category: 'Automatisation',
    lead: 'Dans une petite entreprise, le temps perdu ne vient pas d’une grosse tâche, mais d’une dizaine de petites qui reviennent chaque semaine. Voici les cinq qui méritent d’être automatisées en premier, parce qu’elles sont fréquentes, répétitives et faciles à fiabiliser.',
    body: [
      { h2: 'Comment repérer une tâche à automatiser' },
      { p: 'Une bonne candidate coche trois cases : elle revient au moins chaque semaine, elle suit toujours les mêmes étapes, et ses informations existent déjà quelque part sous forme numérique (un e-mail, un formulaire, un tableur, un PDF). Si vous recopiez une information d’un outil vers un autre, c’est presque toujours automatisable.' },
      { note: 'Le bon réflexe : notez pendant une semaine chaque tâche que vous faites « encore une fois ». La liste qui en sort est votre feuille de route.' },

      { h2: '1. Le traitement des demandes de devis' },
      { p: 'Une demande arrive par le site, une autre par e-mail, une troisième par téléphone. Il faut la noter, créer la fiche du client, puis rédiger le devis. L’automatisation regroupe toutes les demandes au même endroit, crée la fiche client dans votre CRM ou votre tableur, et prépare un brouillon de devis à partir de vos tarifs. Vous n’avez plus qu’à relire et envoyer.' },

      { h2: '2. Les relances de factures impayées' },
      { p: 'Relancer est désagréable, donc on le reporte. Une automatisation envoie un rappel courtois à J+7, puis une relance plus ferme à J+15, avec le ton que vous avez choisi. Elle s’arrête dès que le paiement est enregistré. Résultat : moins d’oublis, et une trésorerie plus régulière.' },

      { h2: '3. Le classement des factures et justificatifs' },
      { p: 'Les PDF s’accumulent dans la boîte mail et sont rangés à la main en fin de mois. Ici, l’intelligence artificielle est vraiment utile : elle lit chaque document, en extrait le fournisseur, la date et le montant, le renomme, le range dans le bon dossier et reporte les montants dans votre tableau de suivi ou celui de votre comptable.' },

      { h2: '4. Le reporting hebdomadaire' },
      { p: 'Le lundi matin, beaucoup de dirigeants assemblent les chiffres de trois outils différents : ventes, rendez-vous, devis en cours. Un récapitulatif automatique arrive à la place dans votre boîte mail, toujours au même format. Vous gardez l’analyse, la machine fait la collecte.' },

      { h2: '5. Les réponses aux questions qui reviennent' },
      { p: 'Horaires, délais, documents à fournir, suivi de commande : une bonne partie des e-mails reçus posent les mêmes questions. Une automatisation peut classer les messages entrants par type de demande et préparer une réponse que vous relisez avant envoi. Le client est servi plus vite, et vous gardez la main.' },

      { h2: 'Par où commencer ?' },
      { p: 'Commencez par une seule tâche, celle qui vous agace le plus. Une première automatisation simple se met en place en une à deux semaines, tests compris, et sert ensuite de base aux suivantes. Vous ne savez pas laquelle choisir ? C’est exactement l’objet de l’[audit gratuit de 30 minutes](/contact/) : on regarde votre semaine type et on fixe ensemble l’ordre de priorité.' },
    ],
  },
  {
    slug: 'n8n-make-zapier-comparatif',
    seoTitle: 'n8n, Make ou Zapier : lequel choisir ?',              // titre pour Google (≤ 45 caractères)
    seoDescription: 'Comparatif simple de n8n, Make et Zapier pour les TPE et PME : facilité, coût, hébergement des données, et comment choisir sans se tromper.',
    title: 'n8n, Make ou Zapier : quel outil choisir pour automatiser votre entreprise ?',
    description: 'Comparatif simple des trois principaux outils d’automatisation pour les TPE et PME : facilité, prix, hébergement des données, cas d’usage. Et comment choisir sans se tromper.',
    date: '2026-11-04',
    category: 'Outils',
    lead: 'Pour relier vos logiciels entre eux sans développement sur mesure, trois outils dominent : Zapier, Make et n8n. Ils font globalement la même chose, mais pas de la même façon. Voici comment les distinguer et choisir celui qui convient à votre activité.',
    body: [
      { h2: 'Ce que font ces outils' },
      { p: 'Tous les trois fonctionnent sur le même principe : un déclencheur (un e-mail reçu, un formulaire rempli, une ligne ajoutée dans un tableur…) lance une suite d’actions dans d’autres logiciels (créer un contact, envoyer un message, mettre à jour une facture…). On appelle cette suite un workflow, ou un scénario.' },

      { h2: 'Zapier : le plus simple à prendre en main' },
      { p: 'Zapier est le plus connu et le plus accessible. Il se connecte à un très grand nombre d’applications et se configure en quelques clics. En contrepartie, il devient vite coûteux quand le nombre d’actions augmente, et il est moins souple pour les enchaînements complexes.' },
      { ul: ['Idéal pour : quelques automatisations simples entre des outils courants.', 'Points d’attention : coût qui grimpe avec le volume, logique avancée limitée.'] },

      { h2: 'Make : le plus visuel' },
      { p: 'Make (anciennement Integromat) présente chaque scénario sous forme de schéma, ce qui le rend très lisible. Il gère bien les traitements plus riches (conditions, boucles, transformations de données) et reste généralement plus économique que Zapier à volume égal.' },
      { ul: ['Idéal pour : des scénarios de complexité moyenne, avec plusieurs étapes et conditions.', 'Points d’attention : un peu plus d’apprentissage au départ.'] },

      { h2: 'n8n : le plus libre' },
      { p: 'n8n peut s’utiliser en ligne ou être installé sur votre propre serveur. Cette seconde option est précieuse quand vos données sont sensibles : elles restent sous votre contrôle, et le coût ne dépend plus du nombre d’exécutions. n8n est aussi très à l’aise avec l’intelligence artificielle et les appels d’API.' },
      { ul: ['Idéal pour : des volumes importants, des données à garder chez soi, des workflows avec de l’IA.', 'Points d’attention : un hébergement à prévoir et à maintenir si vous l’installez vous-même.'] },

      { h2: 'Comment choisir' },
      { ol: [
        'Partez de vos outils actuels : vérifiez que ceux que vous utilisez chaque jour sont bien pris en charge.',
        'Estimez le volume : quelques dizaines d’exécutions par mois ou plusieurs milliers ? Le modèle de prix change tout.',
        'Regardez la sensibilité des données : données clients, santé, finances… plus elles sont sensibles, plus l’hébergement compte.',
        'Pensez à la reprise : choisissez un outil que vous ou quelqu’un d’autre pourrez comprendre et faire évoluer.',
      ] },
      { note: 'Les tarifs de ces outils évoluent souvent : consultez toujours leur page de prix à jour avant de vous décider.' },
      { p: 'Il n’y a pas de meilleur outil dans l’absolu, seulement un outil adapté à votre situation. Chez Axion Studio, le choix se fait pendant l’audit, en fonction de vos logiciels, de vos volumes et de vos données, et l’abonnement reste toujours à votre nom. [Voir les services](/services/) ou [demander un audit gratuit](/contact/).' },
    ],
  },
  {
    slug: 'ia-donnees-clients-regles',
    seoTitle: 'IA et données clients : 6 règles sûres',              // titre pour Google (≤ 45 caractères)
    seoDescription: 'Utiliser l’IA dans une petite entreprise sans exposer les données de ses clients : 6 bonnes pratiques simples à appliquer.',
    title: 'IA et données clients : 6 règles pour l’utiliser sans risque',
    description: 'Utiliser l’intelligence artificielle dans une petite entreprise sans exposer les données de ses clients : les bonnes pratiques à appliquer, simplement.',
    date: '2026-11-04',
    category: 'IA et sécurité',
    lead: 'L’intelligence artificielle fait gagner un temps réel pour lire, trier, résumer ou rédiger. Mais dès qu’elle touche aux données de vos clients, quelques règles simples évitent les mauvaises surprises. Les voici.',
    body: [
      { h2: '1. N’envoyer que les informations utiles' },
      { p: 'Pour classer un e-mail par type de demande, l’IA n’a pas besoin du numéro de téléphone ni de l’adresse du client. Avant chaque usage, posez-vous la question : de quoi a-t-elle réellement besoin pour faire la tâche ? Tout le reste peut être retiré ou masqué avant l’envoi.' },

      { h2: '2. Choisir des offres professionnelles' },
      { p: 'Les versions gratuites des services d’IA peuvent utiliser vos échanges pour améliorer leurs produits. Les offres professionnelles et les API payantes s’engagent généralement à ne pas le faire. Lisez les conditions de chaque service, et privilégiez ceux qui le garantissent par écrit.' },

      { h2: '3. Garder les données sensibles à l’écart' },
      { p: 'Données de santé, informations bancaires, mots de passe, pièces d’identité : ces informations n’ont rien à faire dans un outil d’IA généraliste sans un cadre précis et l’accord des personnes concernées.' },

      { h2: '4. Garder un humain dans la boucle' },
      { p: 'L’IA peut se tromper, avec beaucoup d’assurance. Pour tout ce qui part chez un client (une réponse, un devis, une relance), la bonne pratique est de faire préparer un brouillon par l’IA, puis de le relire avant l’envoi.' },

      { h2: '5. Informer vos clients' },
      { p: 'Si vous utilisez un outil d’IA pour traiter leurs demandes, dites-le simplement dans votre politique de confidentialité : quelles données, pour quoi faire, et avec quel prestataire. La transparence rassure, et c’est une exigence du RGPD.' },

      { h2: '6. Pouvoir tout arrêter' },
      { p: 'Les comptes, les clés d’accès et les automatisations doivent être à votre nom. Vous devez pouvoir retirer un accès ou couper un service en quelques minutes, sans dépendre de personne.' },

      { note: 'Ces conseils sont des bonnes pratiques générales, pas un avis juridique. Pour une situation particulière, rapprochez-vous de la CNIL (cnil.fr) ou d’un professionnel du droit.' },
      { p: 'Ce sont exactement les règles appliquées sur chaque projet Axion Studio : elles sont détaillées sur la page [Sécurité et données](/securite/). Une question sur votre cas ? [Écrivez-moi](/contact/).' },
    ],
  },
]

const words = p => [p.lead, ...p.body.flatMap(b => b.h2 || b.p || b.note || b.ul || b.ol || [])].join(' ').split(/\s+/).length
export const readingMinutes = p => Math.max(1, Math.round(words(p) / 200))
export const wordCount = words
export const formatDate = iso => new Date(iso + 'T12:00:00').toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
