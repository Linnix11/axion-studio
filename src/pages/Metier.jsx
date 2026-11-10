import { Link, useParams } from 'react-router'
import { PageHeader, Section, SectionHead, CtaBand, btn, standaloneLink, usePageMeta } from '../components/ui'
import { metiers } from '../data'
import NotFound from './NotFound'

/** Page « Automatisation pour … » d'un métier (contenu dans data.js, tableau metiers). */
export default function Metier() {
  const { slug } = useParams()
  const m = metiers.find(x => x.slug === slug)
  usePageMeta(m ? `/automatisation/${slug}` : '/404')
  if (!m) return <NotFound />
  const autres = metiers.filter(x => x.slug !== slug)

  return (
    <>
      <PageHeader title={m.title} note={m.cible}>{m.probleme}</PageHeader>

      <Section note={`${m.taches.length} tâches qui se répètent`}>
        <SectionHead title="Ce qui peut être automatisé" />
        <ul className="grid gap-5 md:grid-cols-2">
          {m.taches.map(t => (
            <li key={t.titre} className="rounded-xl border border-rule bg-paper p-6">
              <h3 className="text-xl leading-tight">{t.titre}</h3>
              <p className="mt-2 leading-[1.6] text-muted">{t.texte}</p>
            </li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contact" className={btn.primary}>Réserver un audit gratuit</Link>
          <Link to="/tarifs" className={btn.ghost}>Voir les tarifs</Link>
        </div>
      </Section>

      <Section tone="alt" note="Ordre de grandeur, à confirmer à l’audit">
        <SectionHead title="Avant, après" />
        <article className="max-w-3xl rounded-xl border border-rule bg-paper p-6 sm:p-8">
          <p className="font-display text-4xl leading-none font-extrabold [font-stretch:85%]">{m.exemple.gain}</p>
          <p className="mt-2 text-sm text-muted">de temps rendu, en moyenne indicative</p>
          <p className="mt-6 leading-[1.6] text-muted line-through decoration-pen/60">{m.exemple.avant}</p>
          <p className="mt-3 leading-[1.6]">{m.exemple.apres}</p>
        </article>
      </Section>

      <Section note="Vos outils d’abord">
        <SectionHead title="Avec les outils que vous utilisez déjà">
          Je relie vos logiciels entre eux au lieu de vous en imposer de nouveaux. Exemples courants dans ce métier :
        </SectionHead>
        <ul className="flex flex-wrap gap-2">
          {m.outils.map(o => <li key={o} className="rounded-md border border-rule bg-paper px-3 py-2">{o}</li>)}
        </ul>
      </Section>

      <Section tone="alt" note="Questions fréquentes">
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

      <Section note="Autres métiers">
        <SectionHead title="L’automatisation dans d’autres métiers" />
        <ul className="grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {autres.map(x => <li key={x.slug}><Link to={`/automatisation/${x.slug}`} className={standaloneLink}>{x.nom}</Link></li>)}
        </ul>
      </Section>

      <CtaBand />
    </>
  )
}
