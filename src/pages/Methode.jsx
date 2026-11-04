import { PageHeader, Section, SectionHead, CtaBand, usePageMeta } from '../components/ui'
import { steps, commitments } from '../data'

const needed = [
  'Une heure de votre temps pour l’audit et la validation de la proposition',
  'Des accès aux outils concernés, que vous pouvez retirer à tout moment',
  'Quelques exemples réels : e-mails, factures, exports, pour tester',
  'Un interlocuteur disponible pour valider chaque étape',
]

export default function Methode() {
  usePageMeta('Méthode', "Audit offert, proposition au forfait sous 72 h, mise en place testée sur vos données et un mois de suivi inclus.")
  return (
    <>
      <PageHeader title="Méthode">
        Quatre étapes, un prix fixé à l'avance et aucune surprise. Vous validez chaque étape avant de passer à la
        suivante.
      </PageHeader>

      <Section>
        <ol className="border-t-2 border-ink">
          {steps.map((s, i) => (
            <li key={s.title} className="grid gap-3 border-b border-rule py-8 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-10">
              <div>
                <p className="text-sm text-pen">Étape {i + 1}, {s.duration}</p>
                <h2 className="mt-1 text-[2rem] leading-tight">{s.title}</h2>
              </div>
              <div className="max-w-[62ch]">
                <p className="font-serif text-lg leading-[1.6]">{s.text}</p>
                <p className="mt-3 font-serif text-lg leading-[1.6] text-muted">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="alt">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead title="Ce dont j'ai besoin de votre part" />
            <ul className="border-t-2 border-ink">
              {needed.map(n => <li key={n} className="border-b border-rule py-4 font-serif text-lg leading-[1.5]">{n}</li>)}
            </ul>
          </div>
          <div>
            <SectionHead title="Mes engagements" />
            <dl className="space-y-6">
              {commitments.map(c => (
                <div key={c.title} className="border-l-2 border-pen pl-5">
                  <dt className="text-xl leading-tight font-medium">{c.title}</dt>
                  <dd className="mt-2 font-serif leading-[1.6] text-muted">{c.text}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
