import { PageHeader, Section, SectionHead, CtaBand, usePageMeta } from '../components/ui'
import { steps, commitments, proposalSample as ps } from '../data'

const needed = [
  'Une heure de votre temps pour l’audit et la validation de la proposition',
  'Des accès aux outils concernés, que vous pouvez retirer à tout moment',
  'Quelques exemples réels : e-mails, factures, exports, pour tester',
  'Un interlocuteur disponible pour valider chaque étape',
]

export default function Methode() {
  usePageMeta('/methode')
  return (
    <>
      <PageHeader title="Méthode" note="4 étapes, aucune surprise">
        Quatre étapes, un prix fixé à l’avance et aucune surprise. Vous validez chaque étape avant de passer à la
        suivante.
      </PageHeader>

      <Section note="Vous validez chaque étape">
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

      <Section tone="alt" note="Ce que vous recevez à l’étape 2">
        <SectionHead title="À quoi ressemble une proposition">
          Un document d’une page, sans jargon, qui dit exactement ce qui sera fait, en combien de temps et pour quel prix.
        </SectionHead>
        <article className="seyes max-w-3xl rounded-lg border border-rule shadow-[0_2px_16px_rgba(20,33,61,0.06)]">
          <header className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-margin/70 bg-paper/85 px-6 py-4">
            <h3 className="text-xl">Proposition d’automatisation</h3>
            <p className="text-sm text-muted">{ps.client}</p>
          </header>
          <dl className="bg-paper/75 px-6 py-2">
            {[
              ['Constat', ps.problem],
              ['Ce qui sera construit', <ul className="list-disc pl-5">{ps.solution.map(x => <li key={x}>{x}</li>)}</ul>],
              ['Outils utilisés', ps.tools],
              ['Délai', ps.delay],
              ['Prix', ps.price],
              ['Temps gagné estimé', <span className="marker rounded-sm px-1.5">{ps.gain}</span>],
            ].map(([k, v]) => (
              <div key={k} className="grid gap-x-6 border-b border-rule py-3 last:border-0 sm:grid-cols-[170px_1fr]">
                <dt className="text-sm text-muted">{k}</dt>
                <dd className="font-serif leading-[1.6]">{v}</dd>
              </div>
            ))}
          </dl>
        </article>
      </Section>

      <Section note="Votre part, ma part">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="mb-8 text-[2rem] leading-tight">Ce dont j’ai besoin de votre part</h2>
            <ul className="border-t-2 border-ink">
              {needed.map(n => <li key={n} className="border-b border-rule py-4 font-serif text-lg leading-[1.5]">{n}</li>)}
            </ul>
          </div>
          <div>
            <h2 className="mb-8 text-[2rem] leading-tight">Mes engagements</h2>
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
