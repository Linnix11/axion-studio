# Vague 6 : notoriété (LinkedIn, Google Business, llms.txt)

Préparé le 11 novembre 2026 par les agents seo-linkedin, seo-google-business et geo-llms-txt. **Rien n’a été publié** et aucun fichier du site n’a été modifié : ce rapport est le seul fichier créé. Arthur colle et publie lui-même chaque texte.

Source unique des faits : l’article « RGPD et automatisation : ce qu’une TPE doit vérifier » (`src/blog.js`) et les données du site (`src/data.js`). Aucun chiffre ni témoignage ajouté.

Suite des rapports `docs/rapports-agents/seo-linkedin.md` (9 posts planifiés jusqu’au mardi 15 décembre) et `docs/rapports-agents/seo-google-business.md` (8 publications jusqu’au mardi 12 janvier).

---

## 1. LinkedIn : article RGPD et automatisation

Lien : https://axionstudio.fr/blog/rgpd-automatisation-tpe/

**Date conseillée : jeudi 17 décembre 2026**, juste après le post « IA et données clients » du mardi 15 décembre. Les deux sujets se suivent : le premier parle de l’IA, celui-ci de tous les outils branchés. Version courte sur la page Axion Studio le vendredi 18 décembre.

### Post profil (Arthur)

```text
Brancher un formulaire sur un CRM, le CRM sur un outil d’e-mail, parfois une IA au milieu : chaque automatisation fait passer les données de vos clients par un outil de plus.

Les règles du RGPD ne changent pas pour autant. Mais c’est le bon moment pour vérifier trois points souvent oubliés :

1. Le registre des traitements. La dispense prévue pour les structures de moins de 250 salariés ne joue pas pour un traitement non occasionnel, comme la gestion des clients. Selon la CNIL, une TPE doit en tenir un, et un modèle simplifié existe sur cnil.fr.

2. Un contrat avec chaque prestataire qui touche aux données : CRM, outil d’e-mailing, plateforme d’automatisation, service d’IA. Chez beaucoup d’éditeurs, il s’appelle « DPA ». Vérifiez qu’il couvre l’offre utilisée au quotidien, pas seulement le compte gratuit ouvert « pour tester ».

3. Une durée de conservation appliquée. Repère de la CNIL pour les prospects : trois ans après la collecte ou le dernier contact venant d’eux. Une tâche planifiée peut archiver ou supprimer à votre place.

Votre registre existe-t-il déjà, ou reste-t-il à écrire ?

La liste de contrôle complète, avec les sources officielles :
https://axionstudio.fr/blog/rgpd-automatisation-tpe/

#RGPD #TPE #Automatisation
```

### Version courte (page Axion Studio)

```text
Registre, contrat avec chaque prestataire, durée de conservation, hébergement hors UE, droits des personnes, sécurité des accès : les six points RGPD qu’une TPE doit vérifier avant d’automatiser, avec une liste de contrôle et les sources officielles.
https://axionstudio.fr/blog/rgpd-automatisation-tpe/

#RGPD #TPE
```

Contrôle : post profil de 199 mots (lien et mots-dièses compris), version courte de 40 mots, 3 et 2 mots-dièses. Chaque règle vient de l’article (articles 28 et 30 du RGPD, repère CNIL de trois ans pour les prospects, piège du compte gratuit).

---

## 2. Google Business : 2 publications

Type « Nouveautés ». Collez le texte, bouton **En savoir plus**, collez le lien. Pas de lien ni de téléphone dans le texte. Les dates suivent la série déjà prévue (un mardi par semaine, dernière publication le 12 janvier).

### Publication 9 : RGPD et automatisation (mardi 19 janvier 2027)

> Automatiser un formulaire, un CRM ou des e-mails ne change pas les règles du RGPD, mais multiplie les outils qui reçoivent les données de vos clients. Registre, contrats, durée de conservation, hébergement : les six points à vérifier avant d’automatiser, avec une liste de contrôle.

- Bouton « En savoir plus » : https://axionstudio.fr/blog/rgpd-automatisation-tpe/
- Longueur : 282 caractères
- Image conseillée : une capture de la liste de contrôle en fin d’article.

### Publication 10 : audit gratuit de 30 minutes (mardi 26 janvier 2027)

> Vous ne savez pas par où commencer ? Audit gratuit de 30 minutes, en visio ou par téléphone : vous décrivez votre semaine type et vos outils, je vous dis ce qui peut être automatisé, ce qui ne vaut pas la peine de l’être et par quoi commencer. Sans engagement.

- Bouton « En savoir plus » : https://axionstudio.fr/contact/ (la même page que le service « Audit gratuit de 30 minutes » de la fiche)
- Longueur : 260 caractères
- Image conseillée : `marketing/banners/google-publication-audit-1200x900.png`, déjà proposée dans le rapport précédent.
- Si un lien de réservation Google Agenda est un jour renseigné (`rdv` dans `src/data.js`, vide aujourd’hui), le mettre à la place de la page contact.

---

## 3. llms.txt et llms-full.txt (contrôle en ligne du 11 novembre 2026)

Les deux fichiers répondent (code 200), dernière mise à jour le 11 novembre 2026 à 15 h 01 GMT, soit 16 h 01 à Paris : llms.txt 69 lignes, llms-full.txt 1 095 lignes.

| Point contrôlé | llms.txt | llms-full.txt |
|---|---|---|
| Article RGPD | Oui, en tête de la liste « Articles », avec sa date et sa description | Oui, texte complet, FAQ comprise, et cité depuis les articles chatbot et IA |
| Phrases-réponses des 6 pages métier (« Axion Studio automatise pour… ») | Non | Non |

Les phrases-réponses sont bien en ligne sur les pages métier elles-mêmes (vérifié sur la page Artisans du bâtiment), mais le générateur ne les reprend pas : la partie « Automatisation par métier » de `scripts/prerender-routes.mjs` n’utilise que `cible` et `probleme`, jamais le champ `reponse` ajouté dans `src/data.js`. Ce sont pourtant les phrases les plus faciles à citer pour une IA.

### Propositions pour `scripts/prerender-routes.mjs` (texte seulement, à faire sur une branche)

**a. Reprendre la phrase-réponse de chaque métier dans llms-full.txt.** Dans la ligne qui construit « Automatisation par métier », placer `${m.reponse}` avant « Pour : … ». Remplacer :

```js
${pageUrl(`/automatisation/${m.slug}`)}\n\nPour : ${m.cible}. ${m.probleme}
```

par :

```js
${pageUrl(`/automatisation/${m.slug}`)}\n\n${m.reponse}\n\nPour : ${m.cible}. ${m.probleme}
```

**b. Trois réponses courtes à ajouter au tableau `reponses` (llms.txt)**, après « Les données des clients sont-elles protégées ? ». Les variables `audit` et `pageUrl` existent déjà dans le script.

```js
['Que vérifier côté RGPD avant d’automatiser ?', `Six points : le registre des traitements, un contrat de sous-traitance avec chaque outil qui reçoit des données, une durée de conservation appliquée, le lieu d’hébergement et l’encadrement des transferts hors Union européenne, l’information des personnes et la réponse à leurs demandes, la sécurité des accès. Détail et sources officielles : ${pageUrl('/blog/rgpd-automatisation-tpe')}`],
['Axion Studio fait-elle des audits RGPD ?', `Non, pas d’audit juridique. Pendant l’audit gratuit de ${audit.unit}, les points techniques d’une automatisation (outils utilisés, accès, hébergement, durées de conservation) sont vérifiés. Pour une question de droit : la CNIL (cnil.fr) ou un professionnel du droit.`],
['Comment se passe l’audit gratuit ?', `Un appel de ${audit.unit} en visio ou par téléphone : le client décrit sa semaine type et ses outils, Axion Studio indique ce qui peut être automatisé, ce qui ne vaut pas la peine de l’être et dans quel ordre. Proposition écrite au forfait sous 72 h, sans engagement.`],
```

**c. Facultatif :** dans la réponse « Pour quels métiers ? », ajouter « Une page par métier : » suivi des 6 liens `pageUrl('/automatisation/…')`, pour que les IA trouvent directement la bonne page.

### Coquille repérée dans l’article RGPD (en ligne)

Dans l’introduction (`lead`, `src/blog.js`), il manque une virgule : « le lieu d’hébergement des données la façon de répondre » doit devenir « le lieu d’hébergement des données, la façon de répondre ». La phrase est reprise telle quelle dans llms-full.txt et sur la page. À corriger sur une branche, avec accord avant publication.

---

## À faire par Arthur

- Publier le post LinkedIn le 17 décembre, puis la version courte le 18, après avoir ouvert le lien.
- Copier les deux publications dans la fiche Google Business une fois celle-ci vérifiée par Google.
- Dire « go » pour que les propositions a, b (et c) et la virgule soient faites sur une branche, avec `npm run build`, avant tout « publie ».
- Le suivi dans `docs/plan-seo-ia.md` n’a pas été mis à jour, la consigne étant de ne créer que ce rapport.
