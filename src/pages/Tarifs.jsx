import { Link } from 'react-router'
import { PageHeader, Section, CtaBand, btn, textLink, usePageMeta } from '../components/ui'
import { offers } from '../data'

export default function Tarifs() {
  usePageMeta('/tarifs')
  return (
    <>
      <PageHeader title="Tarifs" note="Forfait, jamais à l’heure">
        Des projets à partir de 150 €, chiffrés au forfait après l’audit gratuit. Pas de facturation à l’heure :
        vous connaissez le prix exact avant de vous engager.
      </PageHeader>

      <Section note="3 formules">
        <div className="grid gap-6 lg:grid-cols-3">
          {offers.map(o => (
            <article key={o.name} className={`lift flex flex-col rounded-lg border p-6 sm:p-8 ${o.featured ? 'border-2 border-pen' : 'border-rule'}`}>
              <h2 className="text-2xl leading-tight">{o.name}</h2>
              <p className="mt-4">
                {o.from && <span className="block text-sm text-muted">À partir de</span>}
                <span className="text-[2rem] leading-none font-semibold tabular-nums">{o.price}</span>
                <span className="block mt-1 text-sm text-muted">{o.unit}</span>
              </p>
              <p className="mt-4 font-serif leading-[1.6] text-muted">{o.text}</p>
              <ul className="mt-6 mb-8 border-t border-rule">
                {o.items.map(i => <li key={i} className="border-b border-rule py-3">{i}</li>)}
              </ul>
              <Link to="/contact" className={`${o.featured ? btn.primary : btn.ghost} mt-auto`}>{o.cta}</Link>
            </article>
          ))}
        </div>
        <div className="mt-10 max-w-[64ch] space-y-3 font-serif leading-[1.6] text-muted">
          <p>TVA non applicable, article 293 B du CGI : les prix indiqués sur les devis sont les prix que vous payez.</p>
          <p>
            Les abonnements aux outils d’automatisation ou d’IA (par exemple n8n, Make ou une API d’IA) restent à votre
            nom et à votre charge. Je vous indique leur coût dans la proposition.
            {' '}<Link to="/faq" className={textLink}>Voir les questions fréquentes</Link>
          </p>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}
