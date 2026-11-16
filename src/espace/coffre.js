// Chiffrement des accès clients dans le navigateur, avant tout envoi (voir docs/coffre-acces.md).
// Clé publique du serveur n8n : seule sa clé privée, qui ne quitte jamais ce serveur, peut déchiffrer.
// Schéma : clé AES-256 aléatoire → valeurs chiffrées en AES-GCM (lié à l'accès par « axion-acces:<id> »),
// clé AES chiffrée en RSA-OAEP (SHA-256). Le site ne reçoit que ce bloc illisible.

const CLE_PUBLIQUE = `-----BEGIN PUBLIC KEY-----
MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEAo0Wj2gJ5hB1IkvHsQtQJ
GD/FYHIz7ln2YgBqSeK7U2elE7jtRW5SDNRpIkHU0vmywK53A8QN3cIhSBd0GYrI
QI7NSmpPNfIZD4EJD0xDDR7UOiaAi6i9OHbALc14UA+Q+A+2B5QmoKW2tC+KPZXo
YrM8TnN+ytbhi+lFN3KKJAEBtSlRUmDlM1edUYIGnT7oQ6tbAoBOvJDtT5gA9viW
zwudRxnE4/AL+xrsRqnWHRkRozTmoYOEasejQ3Ews07XPI3PwabdDnYmYX+8MFbI
IZ8C0HJdNgGvgNyqSxjwWqQHbcaTneHl/ZTHmPFXRAF0PWJ5sNrZxdKWKQbMj45p
P2Lo9Yuc/aIlQmr+ZmSk0JuqVHZwX35dkI0KIW4Aqf5GvqNUTPurrjxgzQMLx+Lc
PJ05q/eGstc39e2VEymCo96FL4PcruRwqtzMlIsrLyPdmDzJW3xADI04ZtcQDsmY
hX4LoUs6PyoI3xxgMWbJ+92q7ecRdYE/mhb5xQb2HofEmg72Mv9UNeX1ERMoWUUT
Pgiebt38FXR8suBM0+SAArTx1f+3AZARBw2mbdFom2FUB7BnoJlTPjf6nrUIRrrZ
+2N93pwlq+glgaFStRwsxe7lpYVY17/Ju2umlGtkQHyjIH9T2Xxzf0zXpOte3Bxp
w74EOdAymf+NfsllS8E3j/UCAwEAAQ==
-----END PUBLIC KEY-----`

const b64 = buf => { let s = ''; for (const x of new Uint8Array(buf)) s += String.fromCharCode(x); return btoa(s) }
const der = pem => Uint8Array.from(atob(pem.replace(/-----[^-]+-----|\s/g, '')), ch => ch.charCodeAt(0))

/** Vrai si le navigateur sait chiffrer (page en HTTPS, navigateur récent). */
export const chiffrementDisponible = () => !!globalThis.crypto?.subtle

/** Chiffre {cle: valeur} pour l'accès n° id. Renvoie {v, k, iv, c}. `pem` : clé publique (tests uniquement). */
export async function chiffrerAcces(id, valeurs, pem = CLE_PUBLIQUE) {
  const { subtle } = globalThis.crypto
  const rsa = await subtle.importKey('spki', der(pem), { name: 'RSA-OAEP', hash: 'SHA-256' }, false, ['encrypt'])
  const aes = await subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt'])
  const iv = globalThis.crypto.getRandomValues(new Uint8Array(12))
  const enc = new TextEncoder()
  const c = await subtle.encrypt({ name: 'AES-GCM', iv, additionalData: enc.encode(`axion-acces:${id}`) }, aes, enc.encode(JSON.stringify(valeurs)))
  const k = await subtle.encrypt({ name: 'RSA-OAEP' }, rsa, await subtle.exportKey('raw', aes))
  return { v: 1, k: b64(k), iv: b64(iv), c: b64(c) }
}
