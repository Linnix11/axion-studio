// Appels à l'API de l'espace client (public/api/crm/*.php).
// Les requêtes qui modifient quelque chose portent l'en-tête X-Requested-With: axion (vérifié côté serveur).

const BASE = '/api/crm'

export class ApiError extends Error {
  constructor(status, body) {
    super(body?.error || `http_${status}`)
    this.status = status
    this.code = body?.error || ''
    this.fields = body?.fields || {}
  }
}

async function call(path, data) {
  const opts = { credentials: 'same-origin', headers: { Accept: 'application/json' } }
  if (data !== undefined) {
    opts.method = 'POST'
    opts.headers['Content-Type'] = 'application/json'
    opts.headers['X-Requested-With'] = 'axion'
    opts.body = JSON.stringify(data)
  }
  let res
  try { res = await fetch(BASE + path, opts) } catch { throw new ApiError(0, { error: 'reseau' }) }
  const body = await res.json().catch(() => ({}))
  if (!res.ok || body.ok === false) throw new ApiError(res.status, body)
  return body
}

export const api = {
  moi: () => call('/auth.php?action=moi'),
  lien: lien => call(`/auth.php?action=lien&lien=${encodeURIComponent(lien)}`),
  connexion: (email, password) => call('/auth.php', { action: 'connexion', email, password }),
  deconnexion: () => call('/auth.php', { action: 'deconnexion' }),
  oubli: email => call('/auth.php', { action: 'oubli', email }),
  activer: (lien, password) => call('/auth.php', { action: 'activer', lien, password }),
  tableauClient: () => call('/client.php'),
  admin: {
    tableau: () => call('/admin.php?action=tableau'),
    client: id => call(`/admin.php?action=client&id=${id}`),
    creer: data => call('/admin.php', { action: 'creer', ...data }),
    modifier: data => call('/admin.php', { action: 'modifier', ...data }),
    renvoyer: id => call('/admin.php', { action: 'renvoyer', id }),
    acces: (id, actif) => call('/admin.php', { action: 'acces', id, actif }),
    automatisation: data => call('/admin.php', { action: 'automatisation', ...data }),
    supprimer: (id, confirmation) => call('/admin.php', { action: 'supprimer', id, confirmation }),
    oublier: instance => call('/admin.php', { action: 'oublier', instance }),
  },
}

/** Message lisible pour une erreur d'API (jamais de faute rejetée sur la personne). */
export function messageErreur(e) {
  switch (e?.code) {
    case 'identifiants': return 'Adresse e-mail ou mot de passe incorrect. Vérifiez-les, ou demandez un nouveau lien.'
    case 'rate': return 'Trop de tentatives en peu de temps. Réessayez dans un quart d’heure à une heure.'
    case 'lien': return 'Ce lien n’est plus valable : il a déjà servi ou il a expiré. Demandez-en un nouveau ci-dessous.'
    case 'auth': return 'Votre session a pris fin. Reconnectez-vous.'
    case 'reseau': return 'Le serveur ne répond pas. Vérifiez votre connexion et réessayez.'
    case 'config': case 'db': return 'L’espace client est momentanément indisponible. Réessayez un peu plus tard.'
    case 'validation': return 'Un champ est à corriger.'
    default: return 'Une erreur est survenue de notre côté. Réessayez dans un instant.'
  }
}
