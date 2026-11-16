// BROUILLON, non publié : article prévu pour le 2 février 2027. Le site ne lit pas ce fichier.
// Pour le publier : copier le bloc ci-dessous en tête du tableau `posts` de src/blog.js, ajouter
// 'agence-immobiliere-contacts-portails' au champ `articles` de la page agences-immobilieres (src/data.js),
// puis `npm run build`.
// Vérifié le 16 nov. 2026 (rédaction + vérification indépendante). À revérifier le jour de la publication :
// - Code de la consommation L223-1 (version du 11 août 2026) et décret n° 2026-662 : toujours en vigueur, non modifiés ;
// - fiche service-public F33267 : Bloctel « n'est plus nécessaire », horaires d'appel (lun.-ven., 10-13 h, 14-20 h) ;
// - FAQ de la DGCCRF sur le démarchage téléphonique (economie.gouv.fr, citée au 17 sept. 2026, non lue : page
//   protégée contre les robots, à ouvrir dans un navigateur). Elle pourrait trancher le rappel d'un contact
//   qui a écrit pour un bien (présenté dans l'article comme la lecture la plus courante, pas comme une règle écrite) ;
// - CNIL : page prospection par e-mail (exception clients), référentiel prospects (3 ans), page sur les annonces ;
// - L34-5 du CPCE : suites de la décision QPC n° 2026-1210 (abrogation partielle reportée au 31 oct. 2027) ;
// - prix (150 €, 250 € par mois) dans src/data.js.

export const brouillon =
  {
    slug: 'agence-immobiliere-contacts-portails',
    seoTitle: 'Agence immobilière : qualifier ses contacts',
    seoDescription: 'Qualifier les contacts immobiliers des portails : accusé de réception, questions, fiche sans ressaisie, bon négociateur, alerte, et règles de prospection.',
    title: 'Agence immobilière : qualifier automatiquement les contacts des portails',
    description: 'Le trajet d’un contact, de la demande sur un portail à la visite : ce qui s’automatise, ce qui reste au négociateur, les erreurs à éviter et les règles de prospection.',
    date: '2027-02-02',
    category: 'Automatisation',
    lead: 'Pour qualifier automatiquement les contacts venus des portails, une agence immobilière envoie dans les minutes qui suivent un accusé de réception qui pose quatre ou cinq questions (projet, budget, financement, délai, critères), crée la fiche dans son logiciel de transaction sans ressaisie et l’attribue au bon négociateur, avec une alerte si personne n’a rappelé. Le premier appel, le jugement sur le sérieux du projet et le choix des biens à proposer restent au négociateur. Répondre à une personne qui a écrit pour un bien, sur ce bien, c’est traiter sa demande ; la recontacter plus tard pour d’autres biens, l’inscrire d’office à des alertes ou démarcher des propriétaires, c’est de la prospection, qui demande en principe son consentement préalable.',
    body: [
      { p: 'Samedi, 22 h : une demande arrive d’un portail d’annonces pour un trois-pièces. Lundi matin, le négociateur la découvre au milieu des autres, sans savoir si la personne cherche à acheter dans un mois ou se renseigne pour dans deux ans. Il rappelle, tombe sur la messagerie, recommence le lendemain. Pendant ce temps, la personne a peut-être écrit à d’autres agences.' },
      { p: 'Cet article suit le trajet d’un contact (un « lead », comme on dit souvent) dans une petite agence, de la demande à la visite : ce qui peut se faire seul, ce qui doit rester au négociateur, et la frontière, importante, entre répondre et prospecter. Le principe d’une demande entrante traitée vite est le même que pour un artisan ([devis d’artisan en 5 minutes](/blog/devis-artisan-automatiser/)) ; ici, il n’y a rien à chiffrer, et la demande vient le plus souvent d’un portail.' },

      { h2: 'Le trajet d’un contact, étape par étape' },
      { p: 'Voici un exemple type pour une agence de deux à cinq négociateurs. Ce n’est pas le récit d’un client, c’est un circuit possible, à adapter à vos outils et à vos habitudes.' },
      { ol: [
        'La demande arrive : par un portail d’annonces, par le formulaire de votre site, ou par téléphone. Pour les appels, un formulaire très court, rempli en une minute par la personne qui a décroché, déclenche la même suite.',
        'Elle est lue et classée : achat, location, demande d’estimation ou autre, et rattachée à l’annonce concernée grâce à sa référence.',
        'Le contact reçoit tout de suite un accusé de réception au nom de l’agence, avec quelques questions pour préparer l’appel.',
        'Une fiche est créée dans votre logiciel de transaction, ou complétée si la personne y figure déjà, sans que personne ne recopie quoi que ce soit.',
        'Le contact est attribué à un négociateur selon vos règles : secteur, type de bien, disponibilité.',
        'Si personne ne l’a rappelé dans le délai que vous avez fixé, une alerte part, d’abord au négociateur, puis au responsable de l’agence.',
        'Après le premier échange, une visite est proposée et se pose dans l’agenda du négociateur.',
      ] },
      { p: 'Selon le portail et votre logiciel, la demande arrive par e-mail ou directement dans le logiciel. C’est le premier point que je vérifie pendant l’audit : il décide de la façon dont tout le reste se branche.' },

      { h2: 'Le premier message : un accusé de réception, et quelques questions' },
      { p: 'Le premier message a deux rôles : rassurer la personne (sa demande est arrivée, quelqu’un va la rappeler) et préparer l’appel du négociateur. Il est écrit une fois avec vous, dans votre ton, signé du nom de l’agence et, quand c’est possible, de celui du négociateur. Les questions utiles tiennent en une courte liste :' },
      { ul: [
        'le projet : résidence principale, résidence secondaire, investissement locatif, ou location ;',
        'le budget, en fourchette plutôt qu’en chiffre exact ;',
        'le financement : achat comptant, prêt à demander, accord de principe déjà obtenu, vente d’un autre bien à prévoir ;',
        'le délai : dans les trois mois, dans l’année, sans date précise ;',
        'les critères indispensables : secteur, nombre de pièces, extérieur, stationnement, ce qui ferait renoncer.',
      ] },
      { p: 'Les réponses se donnent en quelques clics, par un formulaire court ou en répondant simplement à l’e-mail. Aucune n’est obligatoire : une personne qui ne répond pas reste un contact à rappeler, pas un contact à écarter. Et on ne demande à ce stade que ce qui sert à préparer l’appel : pas de bulletins de salaire ni de justificatifs, qui viendront plus tard si le projet avance.' },
      { p: 'Quand les réponses arrivent en texte libre (« plutôt le centre, pas de rez-de-chaussée, on vend notre maison d’abord »), une étape d’intelligence artificielle peut les résumer en trois lignes sur la fiche. Le négociateur relit ce résumé avant d’appeler ; il ne remplace pas la lecture du message en cas de doute.' },
      { note: 'Un accusé de réception rapide ne remplace pas l’appel : il le prépare. Le message dit clairement quand la personne sera rappelée, et la promesse doit être tenue. C’est le rôle de l’alerte décrite plus bas.' },

      { h2: 'Une fiche à jour et le bon négociateur, sans ressaisie' },
      { p: 'Une fois la demande lue, ses informations vont directement dans votre logiciel de transaction : nom, coordonnées, bien concerné, origine (portail, site, téléphone), puis les réponses aux questions dès qu’elles arrivent. Deux précautions évitent la plupart des ennuis :' },
      { ul: [
        'chercher la personne avant de créer sa fiche : la même personne écrit souvent pour deux biens, ou par deux portails, puis appelle l’agence. Le rapprochement se fait sur l’adresse e-mail et le numéro de téléphone, et en cas de doute la fiche est signalée plutôt que dédoublée ;',
        'ajouter, pas écraser : une nouvelle demande complète l’historique de la fiche existante, sans effacer ce que le négociateur y a noté.',
      ] },
      { p: 'L’attribution suit des règles que vous écrivez une fois :' },
      { ul: [
        'le secteur géographique de chaque négociateur ;',
        'le type de bien ou de demande : vente, location, estimation ;',
        'la disponibilité : un négociateur en congé ou absent ce jour-là ne reçoit rien, son contact passe au suivant ;',
        'le cas échéant, le négociateur qui suit déjà le bien concerné, ou un tour de rôle quand plusieurs personnes couvrent le même secteur.',
      ] },
      { p: 'Reste le point qui fait perdre le plus de contacts : la demande attribuée que personne ne rappelle, parce que la journée a été pleine. Vous fixez un délai, par exemple avant la fin de la matinée pour une demande arrivée la veille au soir. Passé ce délai, sans appel ni note sur la fiche, une alerte part au négociateur, puis au responsable si rien ne bouge. L’outil ne rappelle personne à votre place : il évite qu’un contact reste oublié.' },

      { h2: 'Ce qui reste au négociateur' },
      { p: 'L’automatisation trie, range et prévient. Le cœur du métier ne bouge pas :' },
      { ul: [
        'le premier appel : c’est lui qui crée la relation, et beaucoup de projets ne se révèlent qu’au téléphone ;',
        'le jugement sur le sérieux du projet : un budget annoncé, un financement « en cours », un délai « rapide » se vérifient en parlant, pas dans un formulaire ;',
        'le choix des biens à proposer, qui dépend de ce qu’il connaît du marché et du vendeur ;',
        'les situations délicates : séparation, succession, mutation, urgence. Elles ne relèvent d’aucun message automatique ;',
        'la visite elle-même, et tout ce qui suit.',
      ] },
      { p: 'Une fois le premier échange fait, le contact peut choisir lui-même un créneau de visite, qui arrive dans l’agenda du négociateur avec un rappel la veille. Je ne détaille pas ce circuit ici : il est décrit dans [prise de rendez-vous en ligne et rappels](/blog/prise-rendez-vous-en-ligne-rappels/).' },

      { h2: 'Les erreurs classiques' },
      { ul: [
        'La réponse robotique : un message impersonnel, signé « l’équipe », qui reprend mot pour mot l’annonce. Mieux vaut trois phrases simples, avec un nom et un délai de rappel.',
        'Trop de questions : au-delà de quatre ou cinq, le message ressemble à un dossier à remplir, et la personne risque de ne pas répondre. Ce qui ne sert pas au premier appel peut attendre.',
        'Les doublons : la même personne présente trois fois dans le logiciel, suivie par deux négociateurs qui l’appellent chacun de leur côté.',
        'La fiche jamais mise à jour : le contact a acheté ailleurs il y a six mois, mais il reçoit encore des messages. Une fiche se ferme quand le projet se termine.',
        'Écarter automatiquement un contact sur ses réponses : un budget un peu court ou une question sans réponse ne disent pas grand-chose. L’outil classe, le négociateur décide.',
        'Profiter de l’accusé de réception pour glisser d’autres annonces ou une offre d’estimation : le message change alors de nature, comme on va le voir.',
      ] },

      { h2: 'Répondre n’est pas prospecter : les règles à connaître' },
      { p: 'C’est le point le plus délicat de ce circuit, et il tient en une distinction.' },
      { p: 'Première situation : vous répondez. La personne a écrit elle-même à l’agence pour un bien précis. L’accusé de réception, les questions sur son projet, l’appel du négociateur et la proposition de visite pour ce bien répondent à sa demande. Restez sur cet objet. Aucun texte ne dit en toutes lettres qu’un tel rappel échappe aux règles du démarchage : c’est la lecture la plus courante, puisque c’est la personne qui a pris contact. Le décret du 23 juillet 2026 ne prévoit ce cas expressément que pour la rénovation énergétique et l’adaptation du logement (rappel sous cinq jours ouvrables, limité à l’objet de la demande). Par prudence, rappelez vite, restez sur le bien demandé et gardez sa demande sur la fiche : elle montre que c’est elle qui vous a écrit. Elle doit en revanche être informée de l’usage de ses données, par une mention courte dans le premier message qui renvoie vers votre politique de confidentialité. Les bases du RGPD (information, registre, prestataires, droits des personnes) sont détaillées dans [RGPD et automatisation : ce qu’une TPE doit vérifier](/blog/rgpd-automatisation-tpe/).' },
      { p: 'Deuxième situation : vous prospectez. Recontacter la personne plus tard pour d’autres biens, l’inscrire à des alertes de nouvelles annonces, ou appeler des propriétaires pour obtenir des mandats, c’est de la prospection commerciale. Les règles dépendent du canal.' },
      { p: 'Par e-mail ou par SMS, vers des particuliers, la CNIL et l’article L34-5 du Code des postes et des communications électroniques posent les règles suivantes :' },
      { ul: [
        'la personne doit avoir donné son consentement avant d’être démarchée ; selon la CNIL, un consentement libre, spécifique, éclairé et univoque, recueilli par exemple par une case à cocher, jamais pré-cochée ;',
        'il existe une exception si la personne est déjà cliente et que la prospection porte sur des produits ou services analogues fournis par la même entreprise ; mais selon la CNIL, elle ne peut pas être utilisée lorsqu’aucune vente ou prestation de service n’a été effectuée ;',
        'chaque message doit indiquer qui l’envoie et permettre de refuser simplement les envois suivants, par exemple par un lien de désinscription.',
      ] },
      { p: 'Une personne qui a seulement demandé des renseignements sur une annonce entre-t-elle dans cette exception ? La CNIL ne traite pas ce cas précis. Le plus sûr est donc de demander le consentement : dans le premier message, une case non cochée, du type « je souhaite recevoir les nouveaux biens qui correspondent à ma recherche », suffit. Elle est simple à automatiser, et la date de l’accord est notée sur la fiche.' },
      { p: 'Par téléphone, la règle a changé le 11 août 2026. Depuis cette date, l’article L223-1 du Code de la consommation, modifié par la loi n° 2025-594 du 30 juin 2025, interdit de démarcher par téléphone un consommateur qui n’a pas exprimé préalablement son consentement à être prospecté par ce moyen. Ce qu’il faut savoir :' },
      { ul: [
        'le consentement doit être libre, spécifique, éclairé, univoque et révocable, et c’est au professionnel de prouver qu’il l’a recueilli ;',
        'l’interdiction ne s’applique pas à un appel qui concerne un contrat en cours et a un rapport avec l’objet de ce contrat ;',
        'd’après le décret n° 2026-662 du 23 juillet 2026, la demande de consentement indique notamment l’identité du professionnel et la nature des biens ou services concernés ; l’accord vaut un an au plus, ne se renouvelle pas tacitement, et sa preuve est conservée trois ans à compter de son recueil ; la personne peut le retirer à tout moment, aussi simplement qu’elle l’a donné ;',
        'selon service-public.gouv.fr, l’inscription sur la liste d’opposition Bloctel n’est plus nécessaire pour être protégé : c’est désormais l’absence d’accord qui interdit l’appel. Les appels de prospection ne peuvent avoir lieu que du lundi au vendredi, de 10 h à 13 h et de 14 h à 20 h, hors jours fériés, sauf si la personne a expressément accepté un appel à un autre moment.',
      ] },
      { p: 'Pour une agence, la conséquence est concrète : un numéro relevé sur l’annonce d’un particulier qui vend seul ne vaut pas consentement. La CNIL l’indique déjà pour les annonces entre particuliers, et le décret du 23 juillet 2026 n’admet qu’un accord donné en réponse à une demande claire, par un acte positif. Démarcher des propriétaires par téléphone suppose leur accord préalable, que vous devrez pouvoir prouver.' },
      { p: 'Enfin, combien de temps garder la fiche d’un contact qui n’a pas donné suite ? Le référentiel de la CNIL sur la gestion commerciale retient trois ans à compter de la collecte ou du dernier contact venant de la personne. Ce repère n’est pas contraignant : une autre durée est possible si vous pouvez la justifier. Une tâche automatique peut archiver ou supprimer les fiches arrivées à échéance.' },
      { note: 'Ces repères sont généraux et ne constituent pas un conseil juridique. Pour une situation particulière, rapprochez-vous de la CNIL, de votre organisation professionnelle ou d’un professionnel du droit.' },

      { h2: 'Par où commencer' },
      { ol: [
        'Pendant deux semaines, notez pour chaque demande reçue son origine, l’heure d’arrivée et l’heure du premier rappel. C’est votre point de départ, et la seule mesure qui compte.',
        'Écrivez avec vos négociateurs le premier message et les quatre ou cinq questions, puis relisez-les à voix haute : s’ils sonnent comme un formulaire administratif, raccourcissez.',
        'Écrivez vos règles d’attribution et le délai de rappel au-delà duquel une alerte doit partir.',
        'Commencez par une seule source, souvent le portail qui vous envoie le plus de demandes, avant de brancher les autres.',
        'Refaites la mesure après un mois. Si vous préférez déléguer la construction, je relie vos outils actuels (portails, site, messagerie, logiciel de transaction, agenda) et je teste le circuit sur vos vraies demandes. Les projets démarrent à partir de 150 €, et un suivi facultatif est proposé à partir de 250 € par mois.',
      ] },

      { p: 'Pour aller plus loin : les autres tâches que j’automatise pour les agences (visites, relances des acquéreurs et des vendeurs, comptes rendus) sont sur la page [automatisation pour les agences immobilières](/automatisation/agences-immobilieres/). Quand les messages reçus sont trop variés pour une règle fixe, un [agent IA qui lit et trie les demandes](/blog/agent-ia-n8n/) peut préparer le travail, avec une validation humaine avant tout envoi. Vous voulez voir ce que cela donnerait avec vos portails et votre logiciel ? [Écrivez-moi](/contact/) : nous regardons le trajet de vos contacts pendant l’audit gratuit de 30 minutes.' },
      { p: 'Sources : CNIL, [la prospection commerciale par courrier électronique, SMS-MMS et automate d’appel](https://www.cnil.fr/fr/la-prospection-commerciale-par-courrier-electronique), [ne plus être démarché par téléphone](https://www.cnil.fr/fr/plainte/telephonie/ne-plus-etre-demarche-par-telephone), [prospection commerciale par téléphone](https://www.cnil.fr/fr/prospection-commerciale-par-telephone-hors-automate-dappel-quelles-sont-les-regles), [réutilisation des données publiquement accessibles à des fins de démarchage commercial](https://www.cnil.fr/fr/la-reutilisation-des-donnees-publiquement-accessibles-en-ligne-des-fins-de-demarchage-commercial) et [questions-réponses sur les référentiels de gestion des activités commerciales](https://www.cnil.fr/fr/questions-reponses-sur-les-referentiels-relatifs-la-gestion-des-activites-commerciales-et-des) ; Légifrance, [Code des postes et des communications électroniques, article L34-5](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000042155961), [Code de la consommation, article L223-1](https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000051830285) et [décret n° 2026-662 du 23 juillet 2026](https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000054483939) ; service-public.gouv.fr, [démarchage téléphonique abusif, spam vocal ou par SMS : que faire ?](https://www.service-public.gouv.fr/particuliers/vosdroits/F33267).' },
    ],
    faq: [
      { q: 'Peut-on qualifier automatiquement les contacts des portails immobiliers ?', a: 'En grande partie. L’accusé de réception, les questions de qualification (projet, budget, financement, délai, critères), la création de la fiche dans le logiciel de transaction, l’attribution au bon négociateur et l’alerte si personne n’a rappelé s’automatisent bien. Le premier appel, le jugement sur le sérieux du projet et le choix des biens à proposer restent au négociateur.' },
      { q: 'Quelles questions poser à un contact acquéreur ?', a: 'Quatre ou cinq au plus : le type de projet, le budget en fourchette, le mode de financement, le délai et les critères indispensables. Aucune ne doit être obligatoire, et les justificatifs viennent plus tard, si le projet avance.' },
      { q: 'Peut-on envoyer d’autres biens à une personne qui a écrit pour une annonce ?', a: 'Lui répondre sur le bien demandé, oui. Lui envoyer ensuite d’autres biens par e-mail ou par SMS, c’est de la prospection : il faut en principe son consentement préalable. L’exception des clients existants ne s’applique pas, selon la CNIL, quand aucune vente ou prestation n’a eu lieu ; le plus sûr est de proposer une case non cochée dans le premier message.' },
      { q: 'Peut-on encore appeler des propriétaires pour obtenir des mandats ?', a: 'Depuis le 11 août 2026, l’article L223-1 du Code de la consommation interdit de démarcher par téléphone un consommateur qui n’y a pas consenti au préalable, et c’est au professionnel de prouver ce consentement. Un numéro relevé sur une annonce de particulier ne suffit pas. Le consentement vaut un an au plus (décret n° 2026-662 du 23 juillet 2026).' },
    ],
  }
