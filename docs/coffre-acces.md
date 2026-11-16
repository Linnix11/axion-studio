# Coffre des accès clients

Les clients fournissent eux-mêmes les accès dont leurs automatisations ont besoin (clé API, identifiant et mot de
passe) dans leur espace client. Personne n'a besoin de les lire : ni Arthur, ni le site, ni Hostinger.

## Le circuit

1. **Administration → fiche du client → « Demander un accès au client »** : ce qu'il doit fournir, où le trouver, et
   le type d'accès n8n (modèles : clé API en jeton `httpBearerAuth`, clé dans un en-tête `httpHeaderAuth`,
   identifiant et mot de passe `httpBasicAuth`, ou tout autre type n8n avec ses noms de champs).
2. **Espace client → « Accès à fournir »** : le client colle la valeur. Son navigateur la **chiffre avant l'envoi**
   (`src/espace/coffre.js` : clé AES-256 aléatoire, AES-GCM lié à l'accès par `axion-acces:<id>`, clé AES chiffrée en
   RSA-OAEP SHA-256 avec la clé publique du serveur n8n). Le site ne stocke que ce bloc illisible (`acces.chiffre`).
3. **Serveur n8n (VPS)** : `/root/axion-coffre/agent.py` (copie versionnée : `automatisations/coffre/agent.py`), lancé
   chaque minute par la minuterie systemd `axion-coffre.timer`. Il demande les accès reçus à `api/crm/coffre.php`,
   les déchiffre avec la clé privée, ne garde que les champs demandés (un champ ajouté par le client est ignoré),
   et les passe **par l'entrée standard** à `n8n import:credentials` dans le conteneur, qui les chiffre avec sa propre
   clé. Rien n'est écrit en clair sur disque ni dans un journal. Le site efface le bloc dès l'installation.
4. **n8n** : l'accès apparaît sous le nom « Client <entreprise> - <libellé> », valeur masquée, prêt à brancher dans
   les workflows. L'administration du site affiche son identifiant n8n.

## Sécurité

- Les deux clés privées ne quittent jamais le VPS : `/root/axion-coffre/chiffrement.pem` (RSA 4096, déchiffre) et
  `signature.pem` (RSA 3072, signe les requêtes vers le site). Dossier en 700, fichiers en 600. Les clés publiques
  sont dans le dépôt (`src/espace/coffre.js` et `public/api/crm/coffre.php`).
- `coffre.php` n'accepte que des requêtes signées par le serveur n8n, de moins de 5 minutes : aucun mot de passe
  partagé. Le client ne peut déposer que pour ses propres demandes, une fois (à nouveau après une erreur).
- **Limite honnête** : celui qui contrôle le serveur n8n peut techniquement extraire ces accès, comme chez tout
  prestataire qui fait tourner les automatisations d'un client. Le circuit supprime le besoin de les voir ; il ne
  le rend pas mathématiquement impossible.
- Les comptes Google et Microsoft (Gmail, Agenda, Outlook) se connectent par OAuth (« Se connecter avec Google ») :
  ils ne passent pas par ce coffre.

## Exploitation

- Journal (sans aucune valeur) : `/root/axion-coffre/journal.log`. État : `systemctl list-timers axion-coffre.timer`.
- Si les clés du VPS sont perdues (réinstallation) : regénérer les deux paires dans `/root/axion-coffre/`, remplacer
  les deux clés publiques dans le dépôt, publier. Les accès déjà installés dans n8n ne sont pas touchés ; ceux
  « reçus » non installés sont à redemander (bouton « Redemander »).
- Tests : `scripts/test-espace-client.py` avec `CRM_COFFRE_TEST_DIR` (clés de test) et le serveur PHP lancé avec
  `CRM_COFFRE_SIGNATURE_PUB` (voir l'en-tête de la section 12 du test).
