import { Link } from 'react-router'
import { Container, Section, SectionHead, CtaBand, btn, standaloneLink, usePageMeta } from '../components/ui'
import TaskList from '../components/TaskList'
import { services, useCases, steps, commitments } from '../data'

export default function Home() {
  usePageMeta(null, "Axion Studio automatise le travail administratif des TPE, PME et indépendants : workflows, intégration d'outils, intelligence artificielle et sites web.")
  return (
    <>
      <section className="border-b border-rule pt-16 pb-20 md:pt-24 md:pb-24">
        <Container className="grid items-start gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <div className="lg:pt-6">
            <h1 className="text-[2.5rem] leading-[1.08] tracking-[-0.02em] sm:text-6xl">Vos tâches répétitives, faites sans vous.</h1>
            <p className="mt-6 max-w-[34rem] font-serif text-xl leading-[1.6] text-muted">
              J'automatise le travail administratif des TPE, PME et indépendants : saisies, relances, reporting,
              réponses récurrentes. Vous gardez vos outils, ils travaillent ensemble.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className={btn.primary}>Réserver un audit gratuit</Link>
              <Link to="/exemples" className={btn.ghost}>Voir des exemples</Link>
            </div>
            <p className="mt-8 max-w-[30rem] text-sm text-muted">
              Cochez dans la liste ce que vous faites encore à la main. Les durées sont des moyennes indicatives.
            </p>
          </div>
          <TaskList />
        </Container>
      </section>

      <Section>
        <SectionHead title="Ce que je fais">Quatre types de missions, souvent combinées dans un même projet.</SectionHead>
        <dl className="border-t-2 border-ink">
          {services.map(s => (
            <div key={s.slug} className="grid gap-2 border-b border-rule py-6 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-8">
              <dt className="text-2xl leading-tight font-medium">
                <Link to={`/services#${s.slug}`} className="inline-flex min-h-11 items-center text-ink no-underline hover:text-pen">{s.title}</Link>
              </dt>
              <dd className="max-w-[60ch] font-serif text-lg leading-[1.6] text-muted">{s.short}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-6"><Link to="/services" className={standaloneLink}>Voir le détail des services</Link></p>
      </Section>

      <Section tone="alt">
        <SectionHead title="Avant, après">Trois cas types parmi d'autres. Chaque projet part de votre façon de travailler.</SectionHead>
        <div className="grid gap-5 md:grid-cols-3">
          {useCases.slice(0, 3).map(u => (
            <article key={u.task} className="flex flex-col rounded-lg border border-rule bg-paper p-6">
              <p className="text-sm text-muted">{u.sector}</p>
              <h3 className="mt-1 text-xl leading-tight font-medium">{u.task}</h3>
              <p className="mt-4 font-serif leading-[1.6]">{u.after}</p>
              <p className="mt-auto pt-5 text-sm"><span className="marker rounded-sm px-1.5 py-0.5 font-medium">{u.gain} récupérées</span></p>
            </article>
          ))}
        </div>
        <p className="mt-6"><Link to="/exemples" className={standaloneLink}>Voir tous les exemples</Link></p>
      </Section>

      <Section>
        <SectionHead title="Comment on travaille ensemble" />
        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-pen pt-5">
              <p className="text-sm text-pen">Étape {i + 1}, {s.duration}</p>
              <h3 className="mt-2 text-xl leading-tight font-medium">{s.title}</h3>
              <p className="mt-2 font-serif leading-[1.6] text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8"><Link to="/methode" className={standaloneLink}>Comprendre la méthode en détail</Link></p>
      </Section>

      <Section tone="alt">
        <SectionHead title="Mes engagements" />
        <dl className="grid gap-x-10 gap-y-8 md:grid-cols-2">
          {commitments.map(c => (
            <div key={c.title} className="border-l-2 border-pen pl-5">
              <dt className="text-xl leading-tight font-medium">{c.title}</dt>
              <dd className="mt-2 max-w-[52ch] font-serif leading-[1.6] text-muted">{c.text}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBand />
    </>
  )
}
