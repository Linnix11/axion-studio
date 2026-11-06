import { Link } from 'react-router'
import { PageHeader, Section, textLink, usePageMeta } from '../components/ui'
import { cgv, cgvSettings } from '../legal'

/** Texte avec renvoi automatique vers les pages du site (/confidentialite…). */
function Text({ t }) {
  const parts = t.split(/(\/confidentialite)/)
  return <>{parts.map((p, i) => p === '/confidentialite' ? <Link key={i} to="/confidentialite" className={textLink}>politique de confidentialité</Link> : p)}</>
}

export default function Cgv() {
  usePageMeta('/cgv')
  return (
    <>
      <PageHeader title="Conditions générales de vente" note={`Version du ${cgvSettings.version}`}>
        Les règles qui s’appliquent à chaque prestation : commande, prix, paiement, livraison, propriété et
        responsabilité. Écrites simplement, sans petites lignes.
      </PageHeader>
      <Section note={`${cgv.length} articles`}>
        <nav aria-label="Sommaire des CGV" className="mb-10 max-w-3xl">
          <ol className="grid gap-x-8 gap-y-2 text-sm sm:grid-cols-2">
            {cgv.map((a, i) => (
              <li key={a.title}><a href={`#article-${i + 1}`} className="inline-flex min-h-11 items-center text-muted hover:text-pen">{i + 1}. {a.title}</a></li>
            ))}
          </ol>
        </nav>
        <div className="max-w-3xl border-t-2 border-ink">
          {cgv.map((a, i) => (
            <section key={a.title} id={`article-${i + 1}`} className="scroll-mt-24 border-b border-rule py-7">
              <h2 className="text-xl leading-tight"><span className="mr-2 font-serif text-pen italic">Article {i + 1}.</span>{a.title}</h2>
              <div className="mt-3 max-w-[68ch] space-y-3 font-serif text-lg leading-[1.6]">
                {a.text.some(x => x.startsWith('- ')) ? (
                  <>
                    {a.text.filter(x => !x.startsWith('- ')).slice(0, 1).map(x => <p key={x}><Text t={x} /></p>)}
                    <ul className="list-disc space-y-2 pl-6 marker:text-pen">{a.text.filter(x => x.startsWith('- ')).map(x => <li key={x}><Text t={x.slice(2)} /></li>)}</ul>
                    {a.text.filter(x => !x.startsWith('- ')).slice(1).map(x => <p key={x}><Text t={x} /></p>)}
                  </>
                ) : a.text.map(x => <p key={x}><Text t={x} /></p>)}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-8 max-w-[68ch] text-sm text-muted">
          Une question sur ces conditions ? <Link to="/contact" className={textLink}>Écrivez-moi</Link> avant de passer commande.
          Voir aussi les <Link to="/mentions-legales" className={textLink}>mentions légales</Link>.
        </p>
      </Section>
    </>
  )
}
