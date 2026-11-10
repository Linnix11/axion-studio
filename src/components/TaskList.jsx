import { reducedMotion } from '../prefs'
import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { tasks } from '../data'
import { btn } from './ui'
import { preparerDemande } from '../demande'

const WEEKS_PER_YEAR = 47
const DAYS = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven']
// Le reste de la semaine, pour situer les tâches (non cliquable)
const FIXED = [['Rendez-vous client'], ['Chantier'], [], ['Devis'], ['Chantier']]

function fmt(min) {
  const h = Math.floor(min / 60), m = min % 60
  if (!h) return `${m} min`
  return m ? `${h} h ${String(m).padStart(2, '0')}` : `${h} h`
}

export default function TaskList() {
  const [checked, setChecked] = useState(() => tasks.map(t => t.preset))
  // Rature progressive au chargement : seul moment animé de la page.
  const [drawn, setDrawn] = useState(0)
  useEffect(() => {
    if (reducedMotion()) { setDrawn(tasks.length); return }
    let i = 0
    const id = setInterval(() => { i += 1; setDrawn(i); if (i >= tasks.length) clearInterval(id) }, 350)
    return () => clearInterval(id)
  }, [])

  const total = tasks.reduce((sum, t, i) => sum + (checked[i] ? t.minutes : 0), 0)
  const yearly = Math.round((total * WEEKS_PER_YEAR) / 60)
  const block = 'rounded-md border border-rule px-2.5 py-2 text-left text-sm leading-snug sm:px-2 sm:text-[0.8125rem]'

  return (
    <div className="rounded-xl border border-rule bg-paper p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2" aria-live="polite">
        <p>
          <span className="block text-sm text-muted">Temps rendu chaque semaine</span>
          <span key={total} className="bump marker mt-1 inline-block rounded-md px-2 font-display text-5xl leading-[1.15] font-extrabold tabular-nums [font-stretch:85%]">{fmt(total)}</span>
        </p>
        <p className="text-sm text-muted sm:text-right">soit environ {yearly} h par an<br />durées moyennes indicatives</p>
      </div>
      <h2 className="sr-only">Ma semaine type</h2>
      <ul className="mt-5 grid gap-2 sm:grid-cols-5">
        {DAYS.map((day, d) => (
          <li key={day} className="grid grid-cols-[2.75rem_minmax(0,1fr)] content-start items-start gap-2 sm:grid-cols-1">
            <p className="pt-2 text-xs font-semibold tracking-[0.06em] text-muted uppercase sm:pt-0 sm:text-center">{day}</p>
            <div className="flex flex-wrap gap-1.5 sm:flex-col">
              {FIXED[d].map((f, k) => <p key={k} className={`${block} bg-paper-2`}>{f}</p>)}
              {tasks.map((t, i) => t.day === d && (
                <button
                  key={t.label}
                  type="button"
                  aria-pressed={checked[i]}
                  onClick={() => setChecked(c => c.map((v, j) => (j === i ? !v : v)))}
                  style={{ '--h': `${t.minutes + 20}px` }}
                  className={`${block} flex flex-col justify-between gap-1 hover:border-pen sm:min-h-[var(--h)] ${checked[i] ? 'hatch bg-paper text-muted' : 'bg-paper-2'}`}
                >
                  <span className="strike" data-done={checked[i] && i < drawn}>{t.label}</span>
                  <span className="text-xs tabular-nums text-muted">{t.minutes} min{checked[i] && <span className="sr-only">, automatisé</span>}</span>
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted">
        <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="hatch size-3.5 rounded-sm border border-rule" />automatisé</span>
        <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="size-3.5 rounded-sm border border-rule bg-paper-2" />reste à vous</span>
      </p>
      {/* Le calcul débouche sur une demande déjà rédigée (tâches cochées + total) */}
      <Link
        to="/contact/"
        onClick={() => {
          const choisies = tasks.filter((t, i) => checked[i]).map(t => `- ${t.label.toLowerCase()} (${t.minutes} min)`)
          preparerDemande(choisies.length
            ? `Bonjour,\n\nD’après la semaine type de votre site, ces tâches me prennent du temps :\n${choisies.join('\n')}\n\nSoit environ ${fmt(total)} par semaine. Pouvons-nous en parler lors de l’audit gratuit ?`
            : 'Bonjour,\n\nJ’aimerais savoir quelles tâches de ma semaine peuvent être automatisées. Pouvons-nous en parler lors de l’audit gratuit ?')
        }}
        className={`${btn.primary} mt-5 w-full sm:w-auto`}
      >
        {total ? `Parler de mes ${fmt(total)}` : 'Parler de mes tâches'}
      </Link>
    </div>
  )
}
