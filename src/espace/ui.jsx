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

// États d'une automatisation (calculés côté serveur) : libellé, couleur et explication pour le client.
export const ETATS = {
  ok: { label: 'Active', cls: 'bg-ok text-paper', aide: 'Elle tourne normalement.' },
  erreur: { label: 'En erreur', cls: 'bg-error text-paper', aide: 'La dernière exécution a échoué : l’erreur est signalée à Axion Studio.' },
  pause: { label: 'En pause', cls: 'bg-paper-2 text-ink border border-rule', aide: 'Elle est arrêtée pour le moment.' },
  attente: { label: 'En attente', cls: 'bg-paper-2 text-ink border border-rule', aide: 'Active, elle n’a pas encore tourné.' },
  retiree: { label: 'Retirée', cls: 'bg-paper-2 text-muted border border-rule', aide: 'Elle n’existe plus dans n8n.' },
}

export function Badge({ etat }) {
  const e = ETATS[etat] || ETATS.attente
  return <span className={`inline-flex min-h-7 items-center rounded-full px-3 text-sm font-semibold whitespace-nowrap ${e.cls}`}>{e.label}</span>
}

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
