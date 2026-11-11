import { Link, useParams } from 'react-router'
import { PageHeader, Section, SectionHead, CtaBand, AuditLink, btn, standaloneLink, usePageMeta } from '../components/ui'
import { metiers } from '../data'
import { posts } from '../blog'
import NotFound from './NotFound'

/** Page « Automatisation pour … » d'un métier (contenu dans data.js, tableau metiers). */
export default function Metier() {
  const { slug } = useParams()
  const m = metiers.find(x => x.slug === slug)
  usePageMeta(m ? `/automatisation/${slug}` : '/404')
  if (!m) return <NotFound />
  const autres = metiers.filter(x => x.slug !== slug)
  const lectures = (m.articles || []).map(a => posts.find(p => p.slug === a)).filter(Boolean)

  return (
    <>
      <PageHeader title={m.title} note={m.cible}>{m.reponse || m.probleme}</PageHeader>

      <Section note={`${m.taches.length} tâches qui se répètent`}>
        <SectionHead title="Ce qui peut être automatisé">{m.reponse && m.probleme}</SectionHead>
        <ul className="grid gap-5 md:grid-cols-2">
          {m.taches.map(t => (
            <li key={t.titre} className="rounded-xl border border-rule bg-paper p-6">
              <h3 className="text-xl leading-tight">{t.titre}</h3>
              <p className="mt-2 leading-[1.6] text-muted">{t.texte}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <AuditLink className={btn.primary} demande={`Bonjour,\n\nMon activité : ${m.nom.toLowerCase()}. La tâche qui me prend le plus de temps : `} />
          <Link to="/tarifs/" className={btn.ghost}>Voir les tarifs</Link>
        </div>
      </Section>

      {m.etapes && (
        <Section tone="alt" note="Un exemple pas à pas">
          <SectionHead title="Concrètement, comment ça se passe" />
          <ol className="max-w-3xl space-y-4">
            {m.etapes.map((e, i) => (
              <li key={e} className="grid grid-cols-[2.5rem_1fr] gap-3 text-lg leading-[1.6]">
                <span aria-hidden="true" className="grid size-9 place-items-center rounded-full bg-pen font-sans text-base font-medium text-paper">{i + 1}</span>
                <span>{e}</span>
              </li>
            ))}
          </ol>
        </Section>
      )}

      <Section note="Ordre de grandeur, à confirmer à l’audit">
        <SectionHead title="Avant, après" />
        <article className="max-w-3xl rounded-xl border border-rule bg-paper p-6 sm:p-8">
          <p className="font-display text-4xl leading-none font-extrabold [font-stretch:85%]">{m.exemple.gain}</p>
          <p className="mt-2 text-sm text-muted">de temps rendu, en moyenne indicative</p>
          <p className="mt-6 leading-[1.6] text-muted line-through decoration-pen/60">{m.exemple.avant}</p>
          <p className="mt-3 leading-[1.6]">{m.exemple.apres}</p>
        </article>
      </Section>

      {m.limites && (
        <Section tone="alt" note="Ce qui ne s’automatise pas">
          <SectionHead title="Ce qui reste entre vos mains">
            L’automatisation prend les tâches répétitives, pas les décisions. Dans ce métier, ces points restent les vôtres :
          </SectionHead>
          <ul className="max-w-3xl list-disc space-y-2 pl-6 text-lg leading-[1.6] marker:text-pen">
            {m.limites.map(l => <li key={l}>{l}</li>)}
          </ul>
        </Section>
      )}

      <Section note="Vos outils d’abord">
        <SectionHead title="Avec les outils que vous utilisez déjà">
          Je relie vos logiciels entre eux au lieu de vous en imposer de nouveaux. Exemples courants dans ce métier :
        </SectionHead>
        <ul className="flex flex-wrap gap-2">
          {m.outils.map(o => <li key={o} className="rounded-md border border-rule bg-paper px-3 py-2">{o}</li>)}
        </ul>
      </Section>

      {m.audit && (
        <Section tone="alt" note="Audit gratuit de 30 minutes">
          <SectionHead title="Ce que l’audit regarde chez vous">
            En 30 minutes, en visio ou par téléphone, on fait le tour de ces points. Vous repartez avec la liste de ce qui vaut la peine d’être automatisé, même si vous ne donnez pas suite.
          </SectionHead>
          <ul className="max-w-3xl list-disc space-y-2 pl-6 text-lg leading-[1.6] marker:text-pen">
            {m.audit.map(a => <li key={a}>{a}</li>)}
          </ul>
        </Section>
      )}

      <Section note="Questions fréquentes">
        <SectionHead title="Vos questions" />
        <div className="max-w-3xl border-t-2 border-ink">
          {m.faq.map(f => (
            <details key={f.q} className="group border-b border-rule">
              <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-4 text-xl leading-tight font-medium hover:text-pen [&::-webkit-details-marker]:hidden">
                {f.q}
                <span aria-hidden="true" className="shrink-0 text-2xl leading-none text-pen transition-transform duration-150 group-open:rotate-45">+</span>
              </summary>
              <p className="faq-a max-w-[62ch] pb-6 text-lg leading-[1.6] text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </Section>

      <Section tone="alt" note="Pour aller plus loin">
        {lectures.length > 0 && (
          <>
            <SectionHead title="À lire sur le blog" />
            <ul className="mb-12 grid gap-5 md:grid-cols-2">
              {lectures.map(p => (
                <li key={p.slug} className="lift rounded-lg border border-rule bg-paper p-6">
                  <p className="text-sm text-muted">{p.category}</p>
                  <Link to={`/blog/${p.slug}/`} className="mt-1 block text-xl leading-tight font-medium text-ink no-underline hover:text-pen">{p.title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
        <SectionHead title="L’automatisation dans d’autres métiers" />
        <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {autres.map(x => <li key={x.slug}><Link to={`/automatisation/${x.slug}/`} className={standaloneLink}>{x.nom}</Link></li>)}
        </ul>
      </Section>

      <CtaBand />
    </>
  )
}
