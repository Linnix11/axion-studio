import { Link } from 'react-router'
import { Container, Section, SectionHead, CtaBand, btn, standaloneLink, usePageMeta } from '../components/ui'
import TaskList from '../components/TaskList'
import Demo from '../components/Demo'
import { IdentityCard, Guarantees, NotDoing } from '../components/Trust'
import { services, useCases, steps } from '../data'

const heroFacts = ['Audit gratuit de 30 min', 'Prix fixé avant de commencer', 'Vous restez propriétaire de tout']

export default function Home() {
  usePageMeta('/')
  return (
    <>
      <section className="seyes border-b border-rule">
        <Container className="grid items-start gap-12 pt-14 pb-20 md:pt-20 md:pb-24 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <div className="intro lg:pt-4">
            <h1 className="text-[2.75rem] leading-[1.02] tracking-[-0.03em] sm:text-7xl lg:text-[5.25rem]">
              Vos tâches répétitives, faites sans vous.
            </h1>
            <p className="mt-6 max-w-[34rem] font-serif text-xl leading-[1.6] text-muted">
              J’automatise le travail administratif des TPE, PME et indépendants : saisies, relances, reporting,
              réponses récurrentes. Vous gardez vos outils, ils travaillent ensemble.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className={btn.primary}>Réserver un audit gratuit</Link>
              <a href="#demo" className={btn.ghost}>Voir une démonstration</a>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2">
              {heroFacts.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm">
                  <span aria-hidden="true" className="grid size-5 place-items-center rounded-full bg-ok text-[0.75rem] text-paper">✓</span>{f}
                </li>
              ))}
            </ul>
          </div>
          <div className="intro-late">
            <TaskList />
            <p className="mt-3 text-sm text-muted">Cochez ce que vous faites encore à la main. Durées moyennes indicatives.</p>
          </div>
        </Container>
      </section>

      <Section id="demo" note="Une vraie automatisation, en 5 étapes">
        <SectionHead title="Regardez une demande de devis se traiter seule">
          Un prospect écrit. Sans que vous touchiez à rien, sa demande est lue, rangée dans votre CRM, et une réponse
          vous attend. Lancez la démonstration.
        </SectionHead>
        <Demo />
      </Section>

      <Section tone="alt" note="4 missions, souvent combinées">
        <SectionHead title="Ce que je fais" />
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

      <Section note="3 cas types sur 5">
        <SectionHead title="Avant, après">Chaque projet part de votre façon de travailler. Les gains sont des ordres de grandeur.</SectionHead>
        <div className="grid gap-5 md:grid-cols-3">
          {useCases.slice(0, 3).map(u => (
            <article key={u.task} className="lift flex flex-col rounded-lg border border-rule bg-paper p-6">
              <p className="text-sm text-muted">{u.sector}</p>
              <h3 className="mt-1 text-xl leading-tight font-medium">{u.task}</h3>
              <p className="mt-4 font-serif leading-[1.6] text-muted line-through decoration-pen/60">{u.before}</p>
              <p className="mt-3 font-serif leading-[1.6]">{u.after}</p>
              <p className="mt-auto pt-5 text-sm"><span className="marker rounded-sm px-1.5 py-0.5 font-medium">{u.gain} récupérées</span></p>
            </article>
          ))}
        </div>
        <p className="mt-6"><Link to="/exemples" className={standaloneLink}>Voir les 5 exemples</Link></p>
      </Section>

      <Section tone="alt" note="Identité, garanties, limites">
        <SectionHead title="Travailler avec moi, concrètement">
          Vous confiez vos outils et vos données à quelqu’un. Voici exactement à qui, et à quelles conditions.
        </SectionHead>
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)]">
          <IdentityCard />
          <NotDoing />
        </div>
        <h3 className="mt-14 mb-6 text-2xl leading-tight">Mes garanties</h3>
        <Guarantees />
      </Section>

      <Section note="4 étapes, prix fixé à l’étape 2">
        <SectionHead title="Comment on travaille ensemble" />
        <ol className="grid gap-x-8 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="border-t-2 border-pen pt-5">
              <p className="font-serif text-pen italic">Étape {i + 1}, {s.duration}</p>
              <h3 className="mt-2 text-xl leading-tight font-medium">{s.title}</h3>
              <p className="mt-2 font-serif leading-[1.6] text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mt-8"><Link to="/methode" className={standaloneLink}>Voir la méthode et un exemple de proposition</Link></p>
      </Section>

      <CtaBand />
    </>
  )
}
