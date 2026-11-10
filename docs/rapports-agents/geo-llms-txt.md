# Rapport de l'agent geo-llms-txt (10 novembre 2026)

Relecture de `dist/llms.txt`, `dist/llms-full.txt` et `dist/index.md` (build existant, non relancé),
comparés à `src/data.js`, `src/n8n.js`, `src/blog.js`, `src/legal.js`, `src/seo.js` et au générateur
`scripts/prerender-routes.mjs` (lignes 95 à 149). Aucun fichier existant n'a été modifié.

## Bilan rapide

- Les chiffres repris sont exacts et cohérents avec les sources : audit 30 min, projets dès 150 €, suivi dès 250 € par mois,
  proposition sous 72 h, mise en place 1 à 4 semaines, acompte 30 %, paiement à 30 jours, TVA art. 293 B, e-mail, téléphone, adresse.
- Toutes les pages de `pageMeta` sont présentes dans `llms.txt`, sauf `/mentions-legales` (exclue volontairement, ligne 108).
  Les 6 pages métier, la page n8n et les 8 articles y sont.
- `dist/index.md` est une copie exacte de `dist/llms.txt` (vérifié avec `cmp`).
- Longueur correcte : `llms.txt` 9,4 Ko (54 lignes), `llms-full.txt` 79 Ko (891 lignes, environ 20 000 mots-jetons) :
  rien à couper. Les articles du blog font environ la moitié du fichier, les CGV environ 7 Ko ; les garder (paiement, propriété, RGPD).
- Points à corriger : 4 importants (qui est « je », identité légale absente, liens relatifs, délais contradictoires),
  puis des améliorations de formulation et de typographie.

## Corrections importantes

### 1. « Je » n'est jamais identifié dans llms-full.txt
Le texte reprend le site à la première personne (environ 40 phrases avec « je »). Une IA qui lit un extrait isolé
(« Je conçois, j'installe et je maintiens des workflows n8n… », ligne 274) ne sait pas qui parle, et le mot « agence »
peut lui faire croire à une équipe.

- Fichier : `scripts/prerender-routes.mjs`, ligne 134.
- Remplacer :
  ```js
  md.push(`# ${BRAND} : contenu complet du site\n\n${intro}\n`)
  ```
  par :
  ```js
  md.push(`# ${BRAND} : contenu complet du site\n\n${intro}\n\nLe site est écrit à la première personne : « je » désigne ${company.owner}, fondateur et seul intervenant d'Axion Studio, de l'audit au suivi.\n`)
  ```
- Même idée dans la réponse courte « Qui est Axion Studio ? » (ligne 99), texte proposé :
  « Une agence d'automatisation et d'IA indépendante tenue par une seule personne, Arthur Champagne-Forterre, à Montlignon (Val-d'Oise). Elle travaille pour des TPE, PME et indépendants partout en France, avec un seul interlocuteur de l'audit au suivi. »

### 2. L'identité légale manque (nom commercial, statut, SIRET)
Les CGV (ligne 818 de llms-full) parlent du nom commercial « axionstudio », que rien d'autre n'explique.
Le tableau `identity` de `src/data.js` (lignes 146 à 154 : nom commercial, statut, déclaration INPI, SIRET, siège, TVA)
n'est repris ni dans `llms.txt` ni dans `llms-full.txt`, et `/mentions-legales` est exclue de `llms.txt`.
Une IA peut alors prendre « axionstudio » et « Axion Studio » pour deux entreprises différentes.

- Fichier : `scripts/prerender-routes.mjs`.
- Ligne 96 : ajouter `identity` à la déstructuration :
  `const { company, services, useCases, steps, offers, faq, guarantees, security, notDoing, tools, identity } = data`
- Dans `llms.txt`, après la section Contact (après la ligne 118), ajouter :
  ```js
  ## Identité
  ${identity.map(([k, v]) => `- ${k} : ${v}`).join('\n')}
  ```
- Dans `llms-full.txt`, ligne 148, ajouter la même liste avant `## Contact` :
  ```js
  md.push(`## Identité\n` + identity.map(([k, v]) => `- ${k} : ${v}`).join('\n') + '\n')
  ```
- Ligne 108 : retirer l'exclusion de `/mentions-legales` (elle sert de source d'identité aux IA et à l'agent geo-entite) :
  `const links = paths.filter(p => !p.startsWith('/blog/'))…`
- Information datée à surveiller : « SIRET : En cours d'attribution » (`src/data.js` lignes 12 et 151). Dès que le numéro
  arrive, le mettre à ces deux endroits : il apparaîtra partout au build suivant.

### 3. Liens relatifs dans llms-full.txt
25 liens du type `[voir les tarifs](/tarifs/)` (articles, lignes 445 à 814). Lu hors du site, un lien `/tarifs/`
ne mène nulle part : l'IA ne peut ni le suivre ni le citer. Même chose pour « page /cgv » (ligne 398, `src/data.js` ligne 120)
et « page /confidentialite » (ligne 869, `src/legal.js` ligne 102).

- Fichier : `scripts/prerender-routes.mjs`, ligne 149. Remplacer :
  ```js
  writeFileSync(join(dist, 'llms-full.txt'), md.join('\n'))
  ```
  par :
  ```js
  writeFileSync(join(dist, 'llms-full.txt'), md.join('\n')
    .replace(/\]\(\//g, `](${SITE_URL}/`)                                  // liens Markdown relatifs → adresses complètes
    .replace(/page \/(cgv|confidentialite)\b/g, `page ${SITE_URL}/$1/`))   // mentions « page /cgv »
  ```
  Les pages du site ne changent pas (correction faite seulement dans le fichier texte).

### 4. Délais contradictoires
Une IA qui croise les textes trouve trois réponses différentes à « combien de temps ? » :
- Réponses courtes et FAQ : « une à deux semaines » pour une automatisation simple, trois à quatre pour un projet plus large.
- Méthode : « 1 à 4 semaines ».
- Deux articles : « se met en place en quelques jours ».

Corrections proposées (à valider avec l'agent seo-mise-a-jour-contenu, qui gère les articles) :
- `src/blog.js` ligne 169 (article rendez-vous), remplacer « ce type de circuit se met en place en quelques jours » par
  « ce type de circuit se met en place en une à deux semaines, tests compris ».
- `src/blog.js` ligne 245 (article relances), remplacer « une telle automatisation se met en place en quelques jours » par
  « une telle automatisation se met en place en une à deux semaines, tests compris ».

## Améliorations de formulation

### 5. Phrase bancale sur les commerces et restaurants
`llms-full.txt` ligne 247 : « Ordre de grandeur : Une à deux heures par mois sur les seules factures (ordre de grandeur) de temps rendu. »
(« ordre de grandeur » deux fois, phrase incompréhensible). Le texte vient de `src/data.js` ligne 370, mais il s'affiche
tel quel en gros sur la page métier : corriger seulement le générateur.

- Fichier : `scripts/prerender-routes.mjs`, ligne 137. Remplacer
  `Ordre de grandeur : ${m.exemple.gain} de temps rendu.`
  par
  `Temps rendu, en ordre de grandeur : ${m.exemple.gain.replace(/\s*\(ordre de grandeur\)$/, '')}.`
- Résultat : « Temps rendu, en ordre de grandeur : 2 à 3 h par semaine. » et « … : Une à deux heures par mois sur les seules factures. »

### 6. Calendrier des relances incohérent
- `src/data.js` ligne 45 : « Relance automatique des factures impayées à J+7 et J+15 ».
- `src/blog.js` ligne 382 : « un rappel courtois à J+7, puis une relance plus ferme à J+15 ».
- L'article sur les relances (lignes 548 à 555 de llms-full) recommande au contraire un rappel avant l'échéance,
  une relance le lendemain, une relance ferme vers 10 jours. Une IA peut citer l'un ou l'autre.

Texte proposé :
- `src/data.js` ligne 45 : « Relance automatique des factures impayées, du rappel avant l'échéance à la relance ferme »
- `src/blog.js` ligne 382 : « Une automatisation envoie un rappel aimable quelques jours avant l'échéance, une relance courte le lendemain, puis une relance plus ferme une dizaine de jours après, avec le ton que vous avez choisi. »

### 7. Prix et délais écrits en dur dans le générateur
L'introduction (ligne 97), la réponse « Combien ça coûte ? » (ligne 101) et le délai de réponse (ligne 118) recopient
150 €, 250 €, 30 minutes et « 24 heures ouvrées » au lieu de les lire dans `offers` et `company.delai`.
Si un prix change dans `src/data.js`, `llms.txt` restera faux sans que personne ne le voie.

- Ligne 96, ajouter : `const [audit, projet, suivi] = offers`
- Lignes 97 et 101 : remplacer `150 €` par `${projet.price}`, `250 €` par `${suivi.price}`, `30 minutes` par `${audit.unit}`.
- Ligne 118 : remplacer `(réponse sous 24 heures ouvrées)` par `(réponse sous ${company.delai})`.

### 8. Réponses courtes à ajouter
Questions fréquentes posées aux IA qui n'ont pas de réponse courte. Ajouter dans le tableau `reponses` (après la ligne 106),
avec les valeurs de `cgvSettings` (ajouter `cgvSettings` déjà importé, ligne 13) :
```js
['Comment se passe une mission ?', "Audit gratuit de 30 minutes, proposition écrite au forfait sous 72 h, mise en place de 1 à 4 semaines avec tests sur les données du client, puis un mois de suivi inclus."],
['Comment se passe le paiement ?', `Acompte de ${cgvSettings.depositPercent} % à la commande, solde à la livraison, par virement, payable sous ${cgvSettings.paymentDays} jours. Les abonnements aux outils (n8n, Make, Zapier, IA, hébergement) sont au nom du client et à sa charge.`],
['Les données des clients sont-elles protégées ?', "Les automatisations tournent sur les comptes du client, avec des accès limités et révocables. Seules les informations utiles sont envoyées à un service d'IA, de préférence une offre professionnelle qui n'entraîne pas ses modèles avec, et rien de sensible sans accord. Hébergement dans l'Union européenne possible, n8n pouvant être auto-hébergé."],
```

### 9. Dates des articles dans llms.txt
Les articles de `llms.txt` n'ont pas de date ; `llms-full.txt` les donne. Une date aide les IA à juger la fraîcheur
(surtout pour la facture électronique). Ligne 127, remplacer
`- [${p.title}](${pageUrl(`/blog/${p.slug}`)}) : ${p.description}`
par
`- [${p.title}](${pageUrl(`/blog/${p.slug}`)}) (${p.date}) : ${p.description}`

### 10. Ranger les pages légales à part
Dans `llms.txt`, CGV et Confidentialité sont mêlées aux pages commerciales. Proposition (ligne 108 et suivantes) :
une section `## Pages` sans `/cgv`, `/confidentialite`, `/mentions-legales`, puis une section
`## Informations légales` avec ces trois pages. Facultatif, mais plus lisible pour un agent.

## Typographie (règle commune 4)

Le contrôle du build ne lit que les pages HTML, pas les fichiers texte. Relevé :
- `llms.txt` : 8 « ? » précédés d'une espace normale (les 8 questions des réponses courtes, lignes 13 à 20),
  3 « : » sans espace insécable (lignes 14, 16, 19), 11 apostrophes droites (« d'automatisation », « Val-d'Oise »…)
  alors que le reste du site utilise l'apostrophe courbe.
- `llms-full.txt` : 8 « : » sans espace insécable (« Ce qui est inclus : » et « Exemples : », lignes 9 à 59) ;
  apostrophes droites dans l'introduction (ligne 3) et « Ce qu'Axion Studio ne fait pas » (ligne 367).

Correction unique dans `scripts/prerender-routes.mjs` : ajouter une fonction appliquée aux deux fichiers avant écriture
(lignes 109 et 149), sans toucher aux adresses :
```js
const fr = s => s.replace(/ :(?=\s)/g, ' :').replace(/ ([;?!»])/g, ' $1').replace(/« /g, '« ')
```
et remplacer les apostrophes droites des textes écrits en dur (lignes 97 à 107, 117, 143) par « ’ ».

## Informations datées vérifiées

- Facture électronique : « Depuis le 1er septembre 2026 » (réception) et « 1er septembre 2027 » (émission PME, TPE, micro) :
  cohérent avec la date du jour (10 novembre 2026). Le contrôle détaillé revient à l'agent seo-verificateur-faits.
- CGV « version du 10 novembre 2026 » et déclaration INPI « novembre 2026 » : à jour.
- SIRET « en cours d'attribution » : à remplacer dès réception (voir point 2).
- Dates des articles : 4 articles datés du 4 novembre 2026, 4 du 10 novembre 2026, aucune dans le futur.

## Ce qui ne change pas

- La forme du fichier respecte la proposition llms.txt : titre, résumé en citation, sections de liens.
- `index.md` reste une copie de `llms.txt` : toutes les corrections ci-dessus s'y appliquent automatiquement.
- Aucun chiffre inventé : les ordres de grandeur (2 à 3 h par semaine, etc.) sont présentés comme tels.

## Suite

Ces corrections touchent surtout `scripts/prerender-routes.mjs`. À faire sur une branche, puis `npm run build`
(aucun avertissement typographique), relecture de `dist/llms.txt` et `dist/llms-full.txt`, et accord de l'utilisateur
avant publication. Les points 4 et 6 modifient des articles et une page : à coordonner avec seo-mise-a-jour-contenu.
