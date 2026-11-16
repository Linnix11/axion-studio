// Éléments communs de l'espace client et de l'administration.
import { useEffect } from 'react'
import { BRAND } from '../seo'

/** Titre d'onglet des pages privées (non référencées). */
export function usePrivateTitle(title) {
  useEffect(() => { document.title = `${title} | ${BRAND}` }, [title])
}

export const input = 'w-full min-h-12 rounded-md border border-rule bg-paper px-3 py-3 text-base text-ink'
export const card = 'rounded-xl border border-rule bg-paper'

export function Field({ id, label, hint, error, children }) {
  return (
    <div className="mb-5">
      <label htmlFor={id} className="mb-2 block text-base font-medium">{label}</label>
      {children}
      {hint && !error && <p id={`${id}-hint`} className="mt-2 text-sm text-muted">{hint}</p>}
      {error && <p id={`${id}-err`} className="mt-2 text-sm text-error">{error}</p>}
    </div>
  )
}

export function Alert({ tone = 'error', children }) {
  const cls = tone === 'ok' ? 'border-ok text-ok' : tone === 'info' ? 'border-rule text-ink' : 'border-error text-error'
  return <div role={tone === 'error' ? 'alert' : 'status'} className={`mb-5 rounded-md border-2 bg-paper p-4 ${cls}`}>{children}</div>
}

// États d'une automatisation (calculés côté serveur, voir automation_state dans _crm.php), en mots de tous les jours.
// aide : ce que ça veut dire pour le client ; admin : ce qu'Arthur doit savoir ou faire.
export const ETATS = {
  ok: { label: 'Fonctionne', cls: 'bg-ok text-paper', aide: 'Elle a fait son travail normalement la dernière fois.', admin: '' },
  erreur: { label: 'Problème', cls: 'bg-error text-paper', aide: 'La dernière fois, elle n’a pas pu aller au bout. Axion Studio le voit dans son suivi.', admin: 'Le dernier passage a échoué : ouvrez le workflow dans n8n, onglet « Executions », l’étape en rouge donne la cause.' },
  attente: { label: 'Prête', cls: 'bg-paper-2 text-ink border border-rule', aide: 'Elle est en place et attend la première occasion de servir (un e-mail reçu, une date prévue…).', admin: 'Activée, jamais lancée : normal juste après la mise en service.' },
  demande: { label: 'À la demande', cls: 'bg-paper-2 text-ink border border-rule', aide: 'Elle ne tourne pas toute seule : elle se lance quand on en a besoin, d’un bouton ou depuis une autre automatisation.', admin: 'Désactivée dans n8n mais lancée cette semaine (à la main ou par un autre workflow).' },
  pause: { label: 'Arrêtée', cls: 'bg-paper-2 text-ink border border-rule', aide: 'Elle est mise à l’arrêt pour le moment et ne fait rien tant qu’elle n’est pas relancée.', admin: 'Désactivée dans n8n et pas lancée depuis 7 jours.' },
  retiree: { label: 'Retirée', cls: 'bg-paper-2 text-muted border border-rule', aide: 'Elle n’existe plus.', admin: 'Le workflow a disparu de n8n (supprimé ou archivé).' },
}
const ORDRE = ['ok', 'erreur', 'attente', 'demande', 'pause']

export function Badge({ etat }) {
  const e = ETATS[etat] || ETATS.attente
  return <span className={`inline-flex min-h-7 items-center rounded-full px-3 text-sm font-semibold whitespace-nowrap ${e.cls}`}>{e.label}</span>
}

/** Ce que l'automatisation a fait cette semaine, en une phrase. */
export function activite(a) {
  if (!a.executions_7j) return a.derniere_execution ? `N’a pas servi ces 7 derniers jours (dernière fois ${depuis(a.derniere_execution)}).` : 'N’a pas encore servi.'
  const fois = `A servi ${n(a.executions_7j, 'fois', 'fois')} ces 7 derniers jours, la dernière fois ${depuis(a.derniere_execution)}.`
  if (!a.erreurs_7j) return fois
  const echecs = n(a.erreurs_7j, 'échec')
  return a.etat === 'erreur' ? `${fois} ${echecs} sur la semaine.` : `${fois} ${echecs} sur la semaine, tout est rentré dans l’ordre depuis.`
}

/** Légende repliable des états. pour = 'client' ou 'admin' (ajoute ce qu'il faut faire). */
export function Legende({ pour = 'client' }) {
  return (
    <details className={`${card} p-5`}>
      <summary className="cursor-pointer font-medium">Que veulent dire les états{' '}?</summary>
      <dl className="mt-4 grid gap-4">
        {ORDRE.map(k => (
          <div key={k} className="grid gap-1 sm:grid-cols-[9rem_minmax(0,1fr)] sm:items-baseline sm:gap-4">
            <dt><Badge etat={k} /></dt>
            <dd className="text-sm text-muted">{ETATS[k].aide}{pour === 'admin' && ETATS[k].admin ? <span className="mt-1 block text-ink">{ETATS[k].admin}</span> : null}</dd>
          </div>
        ))}
      </dl>
    </details>
  )
}

/** Plus d'une heure sans nouvelles de n8n : les états affichés peuvent être dépassés. */
export const SYNC_RETARD = 3600
export const synchroEnRetard = ts => !ts || Date.now() / 1000 - ts > SYNC_RETARD

const fmtDate = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
const fmtDateHeure = new Intl.DateTimeFormat('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })
const rel = new Intl.RelativeTimeFormat('fr-FR', { numeric: 'auto' })

/** « il y a 5 minutes », « hier », ou la date au-delà d'une semaine. Accepte une date ISO ou un horodatage Unix (secondes). */
export function depuis(v) {
  if (!v) return 'jamais'
  const d = typeof v === 'number' ? new Date(v * 1000) : new Date(v)
  if (Number.isNaN(d.getTime())) return '-'
  const s = Math.round((d.getTime() - Date.now()) / 1000)
  const a = Math.abs(s)
  if (a < 60) return 'à l’instant'
  if (a < 3600) return rel.format(Math.round(s / 60), 'minute')
  if (a < 86400) return rel.format(Math.round(s / 3600), 'hour')
  if (a < 7 * 86400) return rel.format(Math.round(s / 86400), 'day')
  return fmtDateHeure.format(d)
}

export function dateLongue(iso) {
  if (!iso) return ''
  const d = new Date(`${iso}T12:00:00`)
  return Number.isNaN(d.getTime()) ? iso : fmtDate.format(d)
}

/** Nombre avec son nom au singulier ou au pluriel : n(3, 'exécution') → « 3 exécutions ». */
export const n = (k, mot, pluriel = `${mot}s`) => `${k} ${k > 1 ? pluriel : mot}`
