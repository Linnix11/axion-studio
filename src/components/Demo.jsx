import { reducedMotion } from '../prefs'
import { useEffect, useRef, useState } from 'react'
import { btn } from './ui'
import { CheckIcon } from './Icons'
import { demo } from '../data'

const STEP_MS = 700

function Check({ done, active }) {
  return (
    <span aria-hidden="true"
      className={`grid size-6 shrink-0 place-items-center rounded-full border-2 text-xs font-semibold transition-colors duration-200
        ${done ? 'pop border-ok bg-ok text-paper' : active ? 'border-pen text-pen' : 'border-rule text-transparent'}`}>
      <CheckIcon className="size-3" />
    </span>
  )
}

/** Démonstration déclenchée par le visiteur : un e-mail devient une fiche CRM et un brouillon. */
export default function Demo() {
  const [stage, setStage] = useState(0) // 0 = pas lancé, n = nombre d’étapes terminées
  const [running, setRunning] = useState(false)
  const timer = useRef(null)
  const total = demo.steps.length

  useEffect(() => () => clearInterval(timer.current), [])

  const run = () => {
    clearInterval(timer.current)
    if (reducedMotion()) { setStage(total); return }
    setStage(0); setRunning(true)
    let i = 0
    timer.current = setInterval(() => {
      i += 1; setStage(i)
      if (i >= total) { clearInterval(timer.current); setRunning(false) }
    }, STEP_MS)
  }

  const finished = stage >= total
  return (
    <div className="overflow-hidden rounded-lg border border-rule bg-paper">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-rule bg-paper-2 px-5 py-4 sm:px-6">
        <p className="text-sm text-muted">Démonstration avec des données fictives</p>
        <button type="button" onClick={run} disabled={running} className={`${btn.primary} min-h-11 disabled:cursor-wait disabled:opacity-70`}>
          {running ? 'Démonstration en cours' : stage ? 'Rejouer la démonstration' : 'Lancer la démonstration'}
        </button>
      </div>

      <div className="grid lg:grid-cols-3">
        {/* 1. L’e-mail */}
        <section className="border-b border-rule p-5 sm:p-6 lg:border-r lg:border-b-0">
          <h3 className="text-base font-medium text-muted">1. Ce qui arrive</h3>
          <div className="mt-4 rounded-md border border-rule p-4">
            <p className="text-sm text-muted">De : {demo.email.from}</p>
            <p className="mt-1 font-medium">{demo.email.subject}</p>
            <p className="mt-3 font-serif leading-[1.6]">{demo.email.body}</p>
          </div>
        </section>

        {/* 2. Les étapes */}
        <section className="border-b border-rule p-5 sm:p-6 lg:border-r lg:border-b-0">
          <h3 className="text-base font-medium text-muted">2. Ce que fait l’automatisation</h3>
          <ol className="mt-4 space-y-4" aria-live="polite">
            {demo.steps.map((s, i) => (
              <li key={s} className="flex items-start gap-3">
                <Check done={stage > i} active={running && stage === i} />
                <span className={stage > i ? '' : 'text-muted'}>{s}</span>
                <span className="sr-only">{stage > i ? ' : terminé' : ' : en attente'}</span>
              </li>
            ))}
          </ol>
          <p className="mt-6 text-sm text-muted">Temps total : quelques secondes, sans intervention.</p>
        </section>

        {/* 3. Le résultat */}
        <section className="p-5 sm:p-6">
          <h3 className="text-base font-medium text-muted">3. Ce que vous retrouvez</h3>
          {stage < 3 ? (
            <p className="mt-4 rounded-md border border-dashed border-rule p-4 font-serif leading-[1.6] text-muted">
              Lancez la démonstration pour voir la fiche client se remplir et la réponse se préparer.
            </p>
          ) : (
            <div className="mt-4 space-y-4">
              <dl className="drop rounded-md border border-rule text-sm">
                <div className="border-b border-rule bg-paper-2 px-4 py-2 font-medium">Fiche CRM</div>
                {demo.record.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[90px_1fr] gap-2 border-b border-rule px-4 py-2 last:border-0">
                    <dt className="text-muted">{k}</dt><dd>{v}</dd>
                  </div>
                ))}
              </dl>
              {stage >= 4 && (
                <div className="drop rounded-md border border-rule p-4">
                  <p className="text-sm font-medium">Brouillon de réponse, à relire</p>
                  <p className="mt-2 font-serif text-sm leading-[1.6]">{demo.reply}</p>
                </div>
              )}
              {finished && (
                <p className="drop text-sm"><span className="marker rounded-sm px-1.5 py-0.5 font-medium">Notification envoyée</span> Nouvelle demande de devis : Claire Martin</p>
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}
