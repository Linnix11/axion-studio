import { Link } from 'react-router'
import { PageHeader, Section, SectionHead, CtaBand, AuditLink, btn, textLink, usePageMeta } from '../components/ui'
import { services, tools, metiers } from '../data'

export default function Services() {
  usePageMeta('/services')
  return (
    <>
      <PageHeader title="Services d’automatisation et d’IA pour TPE et PME" note="4 missions, au forfait">
        Quatre types de missions pour vous libérer des tâches répétitives. Elles se combinent souvent : un site dont
        le formulaire alimente votre CRM, une IA qui lit vos factures et les range. Les workflows sont le plus souvent
        construits avec n8n : voir la page <Link to="/agence-n8n/" className={textLink}>agence n8n</Link>.
      </PageHeader>

      <nav aria-label="Dans cette page" className="border-b border-rule">
        <ul className="mx-auto flex max-w-[1180px] flex-wrap gap-x-6 px-4 md:px-8">
          {services.map(s => (
            <li key={s.slug}><a href={`#${s.slug}`} className="inline-flex min-h-12 items-center text-ink no-underline hover:text-pen">{s.title}</a></li>
          ))}
        </ul>
      </nav>

      {services.map((s, i) => (
        <Section key={s.slug} id={s.slug} tone={i % 2 ? 'alt' : 'paper'} note={`Mission ${i + 1} sur 4`}>
          <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
            <div>
              <h2 className="text-[2rem] leading-tight md:text-[2.5rem]">{s.heading || s.title}</h2>
              <p className="mt-4 max-w-[52ch] text-lg leading-[1.6] text-muted">{s.intro}</p>
              {s.slug === 'ia' && <p className="mt-4 max-w-[52ch] text-lg leading-[1.6] text-muted">Avant d’installer un assistant sur votre site : <Link to="/blog/chatbot-site-tpe-utile-ou-gadget/" className={textLink}>un chatbot sur le site d’une TPE, utile ou gadget ?</Link></p>}
              <AuditLink className={`${btn.ghost} mt-6`} demande={`Bonjour,\n\nJe m’intéresse à la mission « ${s.title} ». Mon besoin : `}>Parler de mon projet</AuditLink>
            </div>
            <div className="grid gap-8 sm:grid-cols-2">
              <div>
                <h3 className="border-b-2 border-ink pb-2 text-base font-medium">Ce qui est inclus</h3>
                <ul className="mt-2">
                  {s.includes.map(x => <li key={x} className="border-b border-rule py-3 leading-[1.5]">{x}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="border-b-2 border-ink pb-2 text-base font-medium">Par exemple</h3>
                <ul className="mt-2">
                  {s.examples.map(x => <li key={x} className="border-b border-rule py-3 leading-[1.5]">{x}</li>)}
                </ul>
              </div>
            </div>
          </div>
        </Section>
      ))}

      <Section note={`${metiers.length} métiers`}>
        <SectionHead title="Par métier">
          Ce que l’automatisation change concrètement dans votre activité, avec des exemples de votre métier.
        </SectionHead>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {metiers.map(m => (
            <li key={m.slug}>
              <Link to={`/automatisation/${m.slug}/`} className="lift flex h-full flex-col rounded-xl border border-rule bg-paper p-5 text-ink no-underline hover:text-ink">
                <span className="text-lg leading-tight font-semibold">{m.nom}</span>
                <span className="mt-1 text-sm leading-[1.5] text-muted">{m.cible}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="alt" note="Vos outils d’abord">
        <SectionHead title="Avec quels outils ?">
          Je pars toujours de ceux que vous utilisez. Selon votre situation, je travaille notamment avec :
        </SectionHead>
        <ul className="flex flex-wrap gap-2">
          {tools.map(t => <li key={t} className="rounded-md border border-rule bg-paper px-3 py-2">{t}</li>)}
        </ul>
        <p className="mt-8 max-w-[60ch] leading-[1.6] text-muted">
          Votre logiciel n’est pas dans la liste ? S’il dispose d’une API ou d’un export, il peut presque toujours être
          relié. <Link to="/contact/" className={textLink}>Posez-moi la question</Link>.
        </p>
      </Section>

      <CtaBand />
    </>
  )
}
