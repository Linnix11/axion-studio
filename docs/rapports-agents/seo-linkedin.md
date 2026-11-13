# Posts LinkedIn

Deux parties :

- **Partie A : les 5 premiers posts** (préparée le 13 novembre 2026) : la séquence de démarrage, un post par semaine, pour un profil et une page qui n’ont encore rien publié.
- **Partie B** (préparée le 10 novembre 2026) : 9 posts par article du blog et page Agence n8n, à utiliser ensuite.

Rien n’a été publié : c’est Arthur qui colle et publie chaque post.

---

# Partie A : les 5 premiers posts (un par semaine)

## Avant le premier post

1. Mettre la bannière du profil : `marketing/banners/linkedin-profil-1584x396.png` (LinkedIn, profil, crayon de la bannière).
2. Mettre la couverture de la page entreprise : `marketing/banners/linkedin-page-1128x191.png`.
3. Reprendre les textes de profil et de page déjà prêts dans `docs/kit-profils.md`.
4. Dès que la page entreprise existe, envoyer son adresse pour l’ajouter à `company.profils` dans `src/data.js` (reprise en `sameAs` par Google et les IA).

## Mode d’emploi

- Chaque semaine : un post long sur le profil d’Arthur, puis la version courte sur la page Axion Studio le lendemain (pour ne pas montrer deux fois le même texte aux mêmes personnes).
- Copier le contenu du cadre tel quel : les espaces avant « : ? ! ; » sont déjà insécables, les liens finissent par « / ».
- LinkedIn coupe le texte vers 200 caractères : les deux premières lignes de chaque post sont conçues pour tenir seules.
- Aucun emoji, 3 à 5 mots-clics, aucun chiffre qui ne figure pas déjà sur le site ou dans l’article cité.
- Avant chaque post, ouvrir le lien pour vérifier que la page répond.
- Répondre aux commentaires dans la journée : c’est ce qui donne de la portée au post.

## Calendrier proposé

| Semaine | Sujet | Lien | Image |
|---|---|---|---|
| 1 | Lancement d’Axion Studio | https://axionstudio.fr/ | `google-publication-audit-1200x900.png` (voir la remarque ci-dessous) |
| 2 | n8n, c’est quoi ? | https://axionstudio.fr/blog/n8n-c-est-quoi/ | `google-couverture-1024x576.png` |
| 3 | Créer un agent IA avec n8n | https://axionstudio.fr/blog/agent-ia-n8n/ | capture d’un workflow n8n, sinon `linkedin-profil-1584x396.png` |
| 4 | Agenda et emploi du temps | https://axionstudio.fr/services/#agenda | capture de la carte « Temps rendu chaque semaine » de l’accueil, sinon `google-couverture-1024x576.png` |
| 5 | Facture électronique 2026-2027 | https://axionstudio.fr/blog/facture-electronique-tpe-2026-2027/ | `linkedin-page-1128x191.png` (bandeau sobre, sans message commercial) |

Deux remarques sur les images, à décider par Arthur :

- `google-publication-audit-1200x900.png` affiche « Réponse sous 48 h ouvrées », alors que le site annonce 24 heures ouvrées (`company.delai`). À régénérer avant de publier le post 1, sinon publier sans image ou avec une capture de l’accueil.
- `linkedin-publication-article-1200x627.png` porte le titre de l’article « Combien coûte l’automatisation » : ne pas l’utiliser pour un autre sujet. Un visuel 1200x627 par article serait à ajouter dans `marketing/banners/generate.mjs` (hors du périmètre de ce rapport).

---

## Semaine 1 : Lancement

Lien : https://axionstudio.fr/

### Post profil (Arthur)

```text
Je lance Axion Studio. J’automatise les tâches répétitives des TPE, PME et indépendants, et je commence toujours par la même chose : 30 minutes, gratuites, pour regarder votre semaine.

Je m’appelle Arthur Champagne-Forterre. Je suis installé à Montlignon, dans le Val-d’Oise, et je travaille partout en France, à distance.

Ce que je fais, concrètement :

1. Des automatisations sur mesure. Une demande de devis qui crée seule la fiche client, des relances de factures qui s’arrêtent dès le paiement, des justificatifs rangés sans vous.

2. De l’intelligence artificielle là où elle est utile. Lire un document, trier une demande, préparer un brouillon. Une personne relit toujours avant que quoi que ce soit parte chez votre client.

3. Des sites web reliés à vos outils. Un formulaire qui alimente votre logiciel, pas une boîte mail de plus.

Trois règles que je m’impose : un prix fixé avant de commencer, les comptes et les accès à votre nom, un mois de suivi inclus. Si une automatisation ne vous fait pas gagner plus qu’elle ne coûte, je vous le dis.

Quelle tâche refaites-vous chaque semaine, exactement de la même façon ?

https://axionstudio.fr/

#Automatisation #TPE #PME #IA
```

### Version courte (page Axion Studio)

```text
Axion Studio ouvre ses portes : automatisation, intelligence artificielle et sites web pour les TPE, PME et indépendants, depuis le Val-d’Oise et partout en France à distance. Prix fixé avant de commencer, comptes à votre nom, un mois de suivi inclus. L’audit de 30 minutes est gratuit et sans engagement.
https://axionstudio.fr/

#Automatisation #TPE #PME
```

---

## Semaine 2 : n8n, c’est quoi ?

Lien : https://axionstudio.fr/blog/n8n-c-est-quoi/

### Post profil (Arthur)

```text
« n8n, c’est quoi ? » La question revient à chaque premier rendez-vous. Réponse courte : le logiciel qui fait passer une information d’un de vos outils à un autre, sans que personne la recopie.

Trois choses à savoir avant d’y regarder de plus près :

1. Une automatisation s’y dessine comme un schéma, appelé workflow. Un déclencheur la lance (un e-mail reçu, un formulaire envoyé, une heure fixe), puis chaque étape est un nœud : lire le message, ajouter une ligne au tableur, créer le contact. Quand un logiciel n’a pas de connecteur prêt, n8n passe par son API.

2. Deux façons de l’utiliser. n8n Cloud, où n8n s’occupe des serveurs et où l’abonnement se calcule sur le nombre d’exécutions ; ou installé sur un serveur à votre nom, et vos données restent chez vous.

3. L’IA peut s’insérer dans un workflow classique, pour lire un document ou préparer un brouillon.

À l’inverse, pour deux ou trois automatisations simples entre outils courants, Make ou Zapier se prennent en main plus vite.

Si une seule tâche de votre semaine pouvait se faire sans vous, ce serait laquelle ?

https://axionstudio.fr/blog/n8n-c-est-quoi/

#n8n #Automatisation #TPE #SansCode
```

### Version courte (page Axion Studio)

```text
n8n expliqué simplement : ce qu’est un workflow, à quoi sert un déclencheur, la différence entre n8n Cloud et une installation sur votre propre serveur, la place de l’IA, et les cas où Make ou Zapier suffisent.
https://axionstudio.fr/blog/n8n-c-est-quoi/

#n8n #Automatisation
```

---

## Semaine 3 : Créer un agent IA avec n8n

Lien : https://axionstudio.fr/blog/agent-ia-n8n/

### Post profil (Arthur)

```text
Un agent IA n’est pas un workflow avec de l’IA dedans. Dans un workflow, c’est vous qui avez décidé les étapes ; avec un agent, c’est le modèle qui choisit ses outils.

Trois repères pour s’y retrouver :

1. Un agent réunit quatre éléments : un modèle qui raisonne, des consignes (ce qu’il doit faire et ne jamais faire), des outils (lire l’agenda, créer un brouillon d’e-mail) et une mémoire de l’échange en cours.

2. Dans n8n, deux chemins. Le nœud AI Agent, posé dans un workflow, avec au moins un outil branché. Ou les Agents, des objets à part entière, encore en préversion : pour un usage quotidien chez un client, je reste sur le nœud AI Agent.

3. L’exemple détaillé dans l’article : un agent qui lit les demandes de rendez-vous reçues par e-mail, consulte l’agenda, propose des créneaux et prépare la réponse. Il n’envoie rien, vous relisez.

Un agent peut se tromper avec assurance : on lui donne le minimum d’outils, et une personne valide avant tout envoi.

Sur quelle tâche accepteriez-vous qu’une IA prépare le travail, à condition de relire avant l’envoi ?

https://axionstudio.fr/blog/agent-ia-n8n/

#IA #n8n #Automatisation #TPE
```

### Version courte (page Axion Studio)

```text
Agent IA ou workflow classique : la différence, les deux façons de créer un agent dans n8n (le nœud AI Agent et les Agents, encore en préversion), un exemple pas à pas sur les demandes de rendez-vous, et les garde-fous à prévoir.
https://axionstudio.fr/blog/agent-ia-n8n/

#IA #n8n
```

---

## Semaine 4 : Agenda et emploi du temps

Lien : https://axionstudio.fr/services/#agenda

### Post profil (Arthur)

```text
Caler un rendez-vous, le déplacer, prévenir l’équipe, rappeler le client : des gestes de deux minutes. Mis bout à bout, une partie de la semaine passée dans l’agenda au lieu du métier.

J’ajoute donc une prestation à Axion Studio : la gestion automatique de l’agenda et de l’emploi du temps. Trois briques, à assembler selon votre activité :

1. La prise de rendez-vous en ligne sur vos vraies disponibilités, avec un rappel au client la veille, par e-mail ou par SMS. Un créneau annulé se libère et peut être reproposé au client suivant.

2. Le planning d’équipe ou d’interventions mis à jour à chaque changement : chaque technicien voit sa journée, avec les adresses et les documents à préparer, envoyés le matin même.

3. Les créneaux protégés, pour le travail de fond et les trajets, que les réservations ne viennent pas grignoter.

Rien ne change dans vos outils : je me branche sur l’agenda et la messagerie que vous utilisez déjà.

Combien de fois par semaine déplacez-vous un rendez-vous à la main ?

https://axionstudio.fr/services/#agenda

#Agenda #Automatisation #TPE #Organisation
```

### Version courte (page Axion Studio)

```text
Nouvelle prestation : la gestion automatique de l’agenda et de l’emploi du temps. Réservation en ligne sur vos vraies disponibilités, rappels au client la veille, planning d’équipe à jour à chaque changement, créneaux protégés pour le travail de fond. Branché sur l’agenda que vous utilisez déjà.
https://axionstudio.fr/services/#agenda

#Agenda #Automatisation
```

---

## Semaine 5 : Facture électronique 2026-2027 (post utile, sans message commercial)

Lien : https://axionstudio.fr/blog/facture-electronique-tpe-2026-2027/

### Post profil (Arthur)

```text
Depuis le 1er septembre 2026, votre entreprise doit pouvoir recevoir des factures électroniques, micro-entreprise comprise. Beaucoup croient que la réforme n’arrive qu’en 2027 : pas pour la réception.

Trois points à retenir :

1. Un PDF envoyé par e-mail n’est pas une facture électronique au sens de la réforme. Il faut un format structuré (Factur-X, UBL ou CII), transmis par une plateforme agréée par l’État. La liste officielle est publiée sur impots.gouv.fr.

2. Les micro-entrepreneurs en franchise en base sont concernés : ils ne facturent pas la TVA, mais restent assujettis.

3. Le 1er septembre 2027, les PME, TPE et micro-entreprises devront aussi émettre leurs factures en électronique, et transmettre certaines données de transaction à l’administration. Mieux vaut avoir essayé sur quelques factures bien avant cette date.

Le plus simple pour commencer : demander à votre expert-comptable ou à votre logiciel de facturation quelle plateforme il utilisera, et vérifier qu’elle figure bien sur la liste officielle.

Vous avez déjà choisi la vôtre, ou c’est encore sur la liste des choses à faire ?

https://axionstudio.fr/blog/facture-electronique-tpe-2026-2027/

#FactureElectronique #TPE #MicroEntreprise
```

### Version courte (page Axion Studio)

```text
Rappel utile : depuis le 1er septembre 2026, toutes les entreprises établies en France et assujetties à la TVA, micro-entrepreneurs compris, doivent pouvoir recevoir des factures électroniques. L’émission suit le 1er septembre 2027 pour les TPE et PME. Le calendrier et ce qu’il faut vérifier :
https://axionstudio.fr/blog/facture-electronique-tpe-2026-2027/

#FactureElectronique #TPE
```

---

## Vérifications faites (partie A)

- Chaque fait vient du site ou de l’article cité : service agenda (`src/data.js`), articles n8n et agent IA (`src/blog.js`, faits vérifiés sur docs.n8n.io le 13 nov.), calendrier de la facture électronique (article du 10 nov., vérifié sur impots.gouv.fr et economie.gouv.fr).
- Aucun chiffre de performance, aucun témoignage, aucun client cité : Arthur n’a pas encore de client public.
- Aucun emoji, aucun tiret cadratin, 3 à 5 mots-clics par post, liens avec « / » final.
- Les posts longs font entre 120 et 200 mots, lien et mots-clics compris.

| Semaine | Sujet | Mots (profil) | Caractères des 2 premières lignes | Mots (page) |
|---|---|---|---|---|
| 1 | Lancement | 193 | 184 | 54 |
| 2 | n8n, c’est quoi ? | 193 | 193 | 40 |
| 3 | Agent IA avec n8n | 192 | 167 | 45 |
| 4 | Agenda et emploi du temps | 178 | 184 | 49 |
| 5 | Facture électronique | 177 | 200 | 49 |

## Restes à faire (par Arthur)

- Créer le profil et la page entreprise, poser les deux bannières, puis publier un post par semaine.
- Décider pour l’image du post 1 (mention « 48 h » à corriger dans la bannière, ou publier sans image).
- Envoyer l’adresse du profil et celle de la page dès qu’elles existent, pour `company.profils`.
- L’avancement de `docs/plan-seo-ia.md` n’a pas été mis à jour : le périmètre de cette tâche interdisait d’écrire ailleurs que dans ce rapport.

---

# Partie B : réserve, 9 posts par article du blog et page Agence n8n

Préparé par l’agent seo-linkedin le 10 novembre 2026. Rien n’a été publié : c’est Arthur qui colle et publie chaque post.

## Mode d’emploi

- Chaque sujet a deux textes : le post long pour le profil d’Arthur (120 à 200 mots) et la version courte pour la page Axion Studio.
- Copier le contenu du cadre tel quel. Les espaces avant « : ? ! ; » sont déjà insécables.
- Aucun emoji, 3 mots-dièses au plus, aucun chiffre qui ne figure pas déjà dans l’article ou la page (dates, 40 €, 150 €, audit de 30 minutes).
- Les liens finissent par « / », comme sur le site.
- Conseil : publier le post long sur le profil, puis la version courte sur la page le même jour ou le lendemain, pour ne pas montrer deux fois le même texte aux mêmes personnes.
- Avant chaque post, ouvrir le lien pour vérifier que la page est bien en ligne.

## Ordre de publication proposé (2 par semaine, mardi et jeudi)

| Semaine | Date | Sujet | Pourquoi à ce moment |
|---|---|---|---|
| 1 | mardi 17 novembre | Facture électronique 2026-2027 | Sujet d’actualité : la réception est déjà obligatoire, beaucoup de TPE l’ignorent |
| 1 | jeudi 19 novembre | 5 tâches à automatiser en priorité | Article d’entrée, il présente toutes les autres tâches |
| 2 | mardi 24 novembre | Devis d’artisan | Premier cas concret, relié à la page Artisans du bâtiment |
| 2 | jeudi 26 novembre | Relances de factures impayées | Suite logique du devis, et utile avant la clôture de fin d’année |
| 3 | mardi 1er décembre | Combien coûte l’automatisation | Répond à l’objection qui suit naturellement les deux cas concrets |
| 3 | jeudi 3 décembre | Prise de rendez-vous et rappels SMS | Cas concret pour commerces, professions libérales et agences |
| 4 | mardi 8 décembre | n8n, Make ou Zapier | Sujet outil, prépare le post sur la page Agence n8n |
| 4 | jeudi 10 décembre | Page Agence n8n | Présentation de l’offre après un mois de contenus utiles |
| 5 | mardi 15 décembre | IA et données clients | Sujet de confiance pour clore la série |

Ensuite : reprendre le rythme de 2 par semaine avec les nouveaux articles du calendrier éditorial, ou republier un ancien post sous un autre angle.

---

## 1. Facture électronique 2026-2027

Lien : https://axionstudio.fr/blog/facture-electronique-tpe-2026-2027/

### Post profil (Arthur)

```text
Depuis le 1er septembre 2026, votre entreprise doit pouvoir recevoir des factures électroniques. Même en micro-entreprise.

Beaucoup de dirigeants de TPE pensent que la réforme ne les concerne qu’en 2027. C’est vrai pour l’émission, pas pour la réception.

Trois points à retenir :

1. Un PDF envoyé par e-mail n’est pas une facture électronique au sens de la réforme. Il faut un format structuré (Factur-X, UBL ou CII), transmis par une plateforme agréée par l’État.

2. Les micro-entrepreneurs en franchise de TVA sont concernés : ils ne facturent pas la TVA, mais restent assujettis.

3. Le 1er septembre 2027, les PME, TPE et micro-entreprises devront aussi émettre leurs factures en électronique. Mieux vaut tester sur quelques factures bien avant.

La réforme impose un format et un circuit. Elle ne range pas vos factures et ne relance pas vos clients : c’est là que l’automatisation reprend du temps.

Vous avez déjà choisi votre plateforme agréée, ou c’est encore sur la liste ?

Le calendrier, ce qui change et par où commencer :
https://axionstudio.fr/blog/facture-electronique-tpe-2026-2027/

#FactureÉlectronique #TPE #Automatisation
```

### Version courte (page Axion Studio)

```text
Depuis le 1er septembre 2026, toutes les entreprises assujetties à la TVA, micro-entrepreneurs compris, doivent pouvoir recevoir des factures électroniques. L’émission suit le 1er septembre 2027 pour les PME et TPE. Ce qui change, et ce que vous pouvez automatiser autour :
https://axionstudio.fr/blog/facture-electronique-tpe-2026-2027/

#FactureÉlectronique #TPE
```

---

## 2. 5 tâches à automatiser en priorité

Lien : https://axionstudio.fr/blog/taches-a-automatiser-tpe/

### Post profil (Arthur)

```text
Dans une petite entreprise, le temps perdu ne vient presque jamais d’une grosse tâche. Il vient d’une dizaine de petites qui reviennent chaque semaine.

Pour repérer celles qui méritent d’être automatisées, je regarde trois critères :

1. Elle revient au moins chaque semaine.

2. Elle suit toujours les mêmes étapes.

3. Ses informations existent déjà sous forme numérique : un e-mail, un formulaire, un tableur, un PDF.

Si vous recopiez une information d’un outil vers un autre, c’est presque toujours automatisable.

Les cinq que je rencontre le plus souvent : les demandes de devis, les relances de factures impayées, le classement des justificatifs, le reporting du lundi matin et les réponses aux questions qui reviennent.

Un exercice simple pour démarrer : pendant une semaine, notez chaque tâche que vous faites « encore une fois ». La liste qui en sort est votre feuille de route.

Laquelle de ces cinq tâches vous prend le plus de temps ?

L’article complet :
https://axionstudio.fr/blog/taches-a-automatiser-tpe/

#Automatisation #TPE #Productivité
```

### Version courte (page Axion Studio)

```text
Devis, relances, justificatifs, reporting, réponses récurrentes : les cinq tâches à automatiser en premier dans une petite entreprise, et le critère simple pour repérer les vôtres.
https://axionstudio.fr/blog/taches-a-automatiser-tpe/

#Automatisation #TPE
```

---

## 3. Devis d’artisan

Lien : https://axionstudio.fr/blog/devis-artisan-automatiser/

### Post profil (Arthur)

```text
Pour un artisan, le devis lui-même se chiffre souvent en quelques minutes. C’est tout ce qu’il y a autour qui mange les soirées.

Recopier la demande reçue par téléphone, retrouver les coordonnées, repartir d’un devis vide, relancer quand le client ne répond pas. Et une demande qui attend plusieurs jours est souvent une demande perdue.

Ce qu’une automatisation peut prendre en charge :

1. Chaque demande (site, e-mail, annuaire, ou formulaire court rempli après un appel) crée seule une fiche client.

2. Un brouillon de devis est préparé dans votre logiciel à partir de vos lignes habituelles, et vous êtes prévenu sur votre téléphone.

3. Sans réponse après quelques jours, une relance polie part avec vos mots.

Ce qui reste à vous : le chiffrage final, la visite technique, les échanges délicats. Rien ne part chez le client sans votre relecture.

Au passage : pour un dépannage, une réparation ou un entretien chez un particulier, le devis détaillé est obligatoire avant l’intervention, quel que soit le montant.

Combien de temps vous prend un devis, de l’appel à l’envoi ?

https://axionstudio.fr/blog/devis-artisan-automatiser/

#Artisans #Bâtiment #Automatisation
```

### Version courte (page Axion Studio)

```text
Artisans : la demande crée seule la fiche client, un brouillon de devis est prêt à partir de vos tarifs habituels, la relance part sans vous. Le chiffrage et l’envoi restent les vôtres.
https://axionstudio.fr/blog/devis-artisan-automatiser/

#Artisans #Bâtiment
```

---

## 4. Relances de factures impayées

Lien : https://axionstudio.fr/blog/relances-factures-impayees/

### Post profil (Arthur)

```text
Le problème des factures impayées, ce n’est presque jamais de savoir quoi écrire. C’est de penser à relancer, au bon moment, pour chaque facture.

Trois points à connaître pour les ventes entre professionnels :

1. Les pénalités de retard sont dues sans qu’un rappel soit nécessaire.

2. L’indemnité forfaitaire de 40 € pour frais de recouvrement s’applique à chaque facture payée en retard (article D. 441-5 du Code de commerce). Elle doit figurer sur vos factures et vos conditions de vente.

3. Un calendrier qui marche : rappel aimable avant l’échéance, relance neutre le lendemain, relance plus ferme une dizaine de jours après, appel, puis mise en demeure.

Ces étapes se répètent à l’identique d’un client à l’autre. Une automatisation peut les envoyer, et surtout les arrêter dès que le paiement est reçu. Vous gardez la main sur l’appel, la mise en demeure et les clients à ne jamais relancer automatiquement.

Pour les ventes aux particuliers, les règles sont différentes : à vérifier avant de relancer.

Et vous, au bout de combien de jours de retard relancez-vous ?

https://axionstudio.fr/blog/relances-factures-impayees/

#Trésorerie #TPE #Automatisation
```

### Version courte (page Axion Studio)

```text
Relancer tôt, à date fixe, avec un ton qui monte progressivement, et s’arrêter dès le paiement reçu. Le calendrier de relance, les règles entre professionnels (pénalités, indemnité de 40 €) et ce qu’une automatisation fait à votre place :
https://axionstudio.fr/blog/relances-factures-impayees/

#Trésorerie #TPE
```

---

## 5. Combien coûte l’automatisation

Lien : https://axionstudio.fr/blog/cout-automatisation-petite-entreprise/

### Post profil (Arthur)

```text
« Combien ça coûte ? » C’est la première question qu’on me pose, et c’est la bonne : une automatisation n’a d’intérêt que si elle fait gagner plus qu’elle ne coûte.

Ce qui fait varier le prix, ce n’est pas la technologie. C’est surtout :

1. Le nombre d’outils à relier et le nombre de cas particuliers.

2. L’usage de l’IA (lire des PDF, rédiger des brouillons), qui demande plus de réglages et de tests.

3. Les coûts mensuels : l’abonnement aux outils, toujours à votre nom, et un suivi facultatif.

Pour savoir si c’est rentable : estimez le temps passé sur la tâche chaque semaine, multipliez par les semaines travaillées et par la valeur d’une heure de votre temps, puis comparez au coût sur un an. Une tâche de 10 minutes par mois ne mérite souvent pas d’être automatisée.

Chez Axion Studio, les projets démarrent à 150 € au forfait, prix fixé après un audit gratuit de 30 minutes. Si le gain ne justifie pas le coût, je le dis.

Vous avez déjà fait le calcul pour une de vos tâches ?

https://axionstudio.fr/blog/cout-automatisation-petite-entreprise/

#Automatisation #TPE #PME
```

### Version courte (page Axion Studio)

```text
Ce qui fait varier le prix d’une automatisation, les coûts mensuels à prévoir, et une méthode en trois étapes pour savoir si elle sera rentable dans votre cas.
https://axionstudio.fr/blog/cout-automatisation-petite-entreprise/

#Automatisation #TPE
```

---

## 6. Prise de rendez-vous en ligne et rappels SMS

Lien : https://axionstudio.fr/blog/prise-rendez-vous-en-ligne-rappels/

### Post profil (Arthur)

```text
Un client qui ne vient pas sans prévenir, c’est un créneau perdu qu’on ne peut plus reproposer.

Automatiser ses rendez-vous tient en trois briques reliées entre elles :

1. Une page de réservation qui ne montre que vos vrais créneaux libres.

2. Votre agenda mis à jour seul, sans ressaisie ni doublon.

3. Un rappel la veille, par SMS ou par e-mail, avec un lien pour annuler ou déplacer. Le créneau libéré redevient disponible tout de suite.

Côté canal : le SMS convient le mieux au rappel de la veille, l’e-mail à la confirmation, qui peut contenir plus d’informations (plan d’accès, documents à apporter).

Côté règles : un rappel de rendez-vous pris par le client est un message lié au service, pas de la prospection. Mais dès qu’une promotion s’y glisse, il bascule dans la prospection commerciale, avec des règles plus strictes (voir cnil.fr). Gardez les rappels purement pratiques.

Comment gérez-vous les absences aujourd’hui ?

https://axionstudio.fr/blog/prise-rendez-vous-en-ligne-rappels/

#RendezVous #TPE #Automatisation
```

### Version courte (page Axion Studio)

```text
Réservation en ligne, agenda à jour sans ressaisie, rappel la veille par SMS avec un lien pour annuler : comment automatiser les rendez-vous d’une petite entreprise, et la règle à respecter pour les rappels.
https://axionstudio.fr/blog/prise-rendez-vous-en-ligne-rappels/

#RendezVous #TPE
```

---

## 7. n8n, Make ou Zapier

Lien : https://axionstudio.fr/blog/n8n-make-zapier-comparatif/

### Post profil (Arthur)

```text
n8n, Make ou Zapier ? On me pose souvent la question, et la réponse honnête dépend de votre situation, pas de l’outil.

Les trois font la même chose sur le principe : un déclencheur lance une suite d’actions dans vos logiciels. Ce qui les distingue :

1. Zapier est le plus simple à prendre en main, mais son coût grimpe vite avec le volume.

2. Make est le plus visuel et gère bien les scénarios à plusieurs étapes et conditions.

3. n8n peut être installé sur votre propre serveur : vos données restent chez vous et le coût ne dépend plus du nombre d’exécutions. En contrepartie, l’hébergement est à prévoir et à maintenir.

Pour choisir, quatre questions : vos outils actuels sont-ils pris en charge ? Quel volume par mois ? Vos données sont-elles sensibles ? Qui pourra reprendre les workflows demain ?

Les tarifs de ces outils changent souvent : vérifiez toujours leur page de prix avant de décider.

Vous utilisez déjà l’un des trois ? Lequel, et pour quoi ?

https://axionstudio.fr/blog/n8n-make-zapier-comparatif/

#n8n #Make #Zapier
```

### Version courte (page Axion Studio)

```text
Zapier le plus simple, Make le plus visuel, n8n le plus libre. Comparatif clair pour les TPE et PME, et quatre questions pour choisir sans se tromper :
https://axionstudio.fr/blog/n8n-make-zapier-comparatif/

#n8n #Make #Zapier
```

---

## 8. Page Agence n8n

Lien : https://axionstudio.fr/agence-n8n/

### Post profil (Arthur)

```text
J’utilise n8n pour ma propre prospection : recherche d’entreprises dans l’annuaire public SIRENE, enrichissement, puis brouillons d’e-mails rédigés par l’IA, que je relis avant envoi. C’est aussi l’outil que je propose le plus souvent aux TPE et PME.

Pourquoi n8n :

1. Vos données chez vous. n8n peut être installé sur votre propre serveur : vos données clients ne transitent pas par une plateforme tierce, ce qui simplifie le RGPD.

2. Un coût qui ne grimpe pas avec le volume. Auto-hébergé, il ne facture pas chaque exécution.

3. L’IA au milieu d’un workflow classique : lire un document, classer une demande, préparer un brouillon.

Exemples concrets : une demande de devis qui crée seule la fiche client, des factures fournisseurs lues et rangées, des relances qui s’arrêtent dès le paiement.

Ce n’est pas toujours la bonne réponse : pour de petits besoins, Make ou Zapier sont plus simples. Je recommande l’outil le plus simple à maintenir pour votre cas, et les workflows restent à votre nom.

Quelle tâche aimeriez-vous ne plus faire à la main ?

https://axionstudio.fr/agence-n8n/

#n8n #Automatisation #PME
```

### Version courte (page Axion Studio)

```text
Création, hébergement et maintenance de workflows n8n pour les TPE et PME : vos logiciels reliés, les tâches répétitives faites sans vous, l’IA là où elle est utile. Audit gratuit, projets dès 150 €.
https://axionstudio.fr/agence-n8n/

#n8n #Automatisation
```

---

## 9. IA et données clients

Lien : https://axionstudio.fr/blog/ia-donnees-clients-regles/

### Post profil (Arthur)

```text
L’IA fait gagner un temps réel pour lire, trier ou rédiger. Mais dès qu’elle touche aux données de vos clients, quelques règles évitent les mauvaises surprises.

Les trois que j’applique en premier sur chaque projet :

1. N’envoyer que l’utile. Pour classer un e-mail par type de demande, l’IA n’a besoin ni du téléphone ni de l’adresse du client.

2. Choisir des offres professionnelles. Les versions gratuites peuvent utiliser vos échanges pour améliorer leurs produits ; les offres pro et les API payantes s’engagent généralement à ne pas le faire. Lisez les conditions.

3. Garder un humain dans la boucle. L’IA peut se tromper avec beaucoup d’assurance : elle prépare un brouillon, vous relisez avant l’envoi.

Les trois autres : garder les données sensibles à l’écart, informer vos clients dans votre politique de confidentialité, et pouvoir tout couper vous-même, parce que comptes et clés d’accès sont à votre nom.

Laquelle de ces règles vous paraît la plus difficile à tenir au quotidien ?

https://axionstudio.fr/blog/ia-donnees-clients-regles/

#IA #RGPD #TPE
```

### Version courte (page Axion Studio)

```text
Utiliser l’IA sans exposer les données de vos clients : six règles simples, appliquées sur chaque projet Axion Studio.
https://axionstudio.fr/blog/ia-donnees-clients-regles/

#IA #RGPD
```

---

## Vérifications faites

- Chaque chiffre et chaque règle viennent de l’article ou de la page cités (`src/blog.js`, `src/n8n.js`) ; aucune statistique ajoutée.
- Aucun tiret cadratin, aucun emoji, 3 mots-dièses au plus par post.
- Les posts longs font entre 120 et 200 mots (décompte ci-dessous, lien et mots-dièses compris).

| Sujet | Mots (profil) | Mots (page) | Mots-dièses (profil / page) |
|---|---|---|---|
| 1. Facture électronique 2026-2027 | 175 | 45 | 3 / 2 |
| 2. 5 tâches à automatiser en priorité | 164 | 29 | 3 / 2 |
| 3. Devis d’artisan | 183 | 36 | 3 / 2 |
| 4. Relances de factures impayées | 182 | 42 | 3 / 2 |
| 5. Combien coûte l’automatisation | 187 | 31 | 3 / 2 |
| 6. Prise de rendez-vous en ligne et rappels SMS | 159 | 37 | 3 / 2 |
| 7. n8n, Make ou Zapier | 176 | 32 | 3 / 3 |
| 8. Page Agence n8n | 180 | 37 | 3 / 2 |
| 9. IA et données clients | 167 | 22 | 3 / 2 |


## Restes à faire (par Arthur)

- Publier chaque post à la date choisie, depuis le profil puis la page.
- Ajouter si possible une image par post (les bannières de `marketing/banners/` ou une capture du schéma de l’article).
- Répondre aux commentaires dans la journée : c’est ce qui donne de la portée au post.
- Le suivi de l’avancement dans `docs/plan-seo-ia.md` n’a pas été mis à jour, la consigne étant de ne modifier aucun fichier du projet.
