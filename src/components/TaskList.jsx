import { reducedMotion } from '../prefs'
import { useEffect, useState } from 'react'
import { tasks } from '../data'

const WEEKS_PER_YEAR = 47

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

  return (
    <div className="rounded-xl border border-rule bg-paper">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 px-5 pt-5 sm:px-6" aria-live="polite">
        <p>
          <span className="block text-sm text-muted">Temps rendu chaque semaine</span>
          <span key={total} className="bump marker mt-1 inline-block rounded-md px-2 font-display text-5xl leading-[1.15] font-extrabold tabular-nums [font-stretch:85%]">{fmt(total)}</span>
        </p>
        <p className="text-sm text-muted sm:text-right">soit environ {yearly} h par an<br />durées moyennes indicatives</p>
      </div>
      <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-rule px-5 pb-3 sm:px-6">
        <h2 className="text-lg">Ma semaine, à la main</h2>
        <p className="text-sm text-muted">min / semaine</p>
      </div>
      <fieldset>
        <legend className="sr-only">Cochez les tâches que vous faites encore à la main</legend>
        <ul className="grid gap-1.5 p-2 sm:p-3">
          {tasks.map((t, i) => (
            <li key={t.label}>
              <label className={`flex min-h-12 cursor-pointer items-center gap-3 rounded-md border border-rule px-3 py-2 sm:px-4 ${checked[i] ? 'hatch' : ''}`}>
                <input
                  type="checkbox"
                  id={`task-${i}`}
                  checked={checked[i]}
                  onChange={() => setChecked(c => c.map((v, j) => (j === i ? !v : v)))}
                  className="size-5 shrink-0 accent-[var(--c-pen)]"
                />
                <span className="min-w-0 flex-1 leading-snug">
                  <span className="strike" data-done={checked[i] && i < drawn}>{t.label}</span>
                </span>
                <span className="shrink-0 rounded-sm bg-paper px-1 text-sm tabular-nums text-muted">{t.minutes}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <p className="flex flex-wrap gap-x-5 gap-y-1 border-t border-rule px-5 py-3 text-sm text-muted sm:px-6">
        <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="hatch size-3.5 rounded-sm border border-rule" />automatisable</span>
        <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="size-3.5 rounded-sm border border-rule" />reste à vous</span>
      </p>
    </div>
  )
}
