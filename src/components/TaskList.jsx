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
    <div className="rounded-lg border border-rule bg-paper shadow-[0_2px_16px_rgba(20,33,61,0.06)]">
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-pen px-5 pt-5 pb-3 sm:px-6">
        <h2 className="text-lg">Ma semaine, à la main</h2>
        <p className="text-sm text-muted">min / semaine</p>
      </div>
      <fieldset>
        <legend className="sr-only">Cochez les tâches que vous faites encore à la main</legend>
        <ul>
          {tasks.map((t, i) => (
            <li key={t.label} className="border-b border-rule">
              <label className="flex min-h-13 cursor-pointer items-center gap-3 px-5 py-2 sm:px-6">
                <input
                  type="checkbox"
                  id={`task-${i}`}
                  checked={checked[i]}
                  onChange={() => setChecked(c => c.map((v, j) => (j === i ? !v : v)))}
                  className="size-5 shrink-0 accent-[var(--c-pen)]"
                />
                <span className="min-w-0 flex-1 font-serif text-[1.0625rem] leading-snug">
                  <span className="strike" data-done={checked[i] && i < drawn}>{t.label}</span>
                </span>
                <span className="shrink-0 text-sm tabular-nums text-muted">{t.minutes}</span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>
      <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2 px-5 py-5 sm:px-6" aria-live="polite">
        <p className="text-sm text-muted">Temps récupérable</p>
        <p className="sm:text-right">
          <span key={total} className="bump marker rounded-sm px-1.5 text-2xl font-semibold tabular-nums">{fmt(total)}</span>
          <span className="text-muted"> par semaine</span>
          <span className="block text-sm text-muted">soit environ {yearly} h par an</span>
        </p>
      </div>
    </div>
  )
}
