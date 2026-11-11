import { Link } from 'react-router'
import { preparerDemande } from '../demande'
import { PageHeader, Section, CtaBand, btn, textLink, usePageMeta } from '../components/ui'
import { offers } from '../data'
import { tarifsFaq } from '../n8n'

export default function Tarifs() {
  usePageMeta('/tarifs')
  return (
    <>
      <PageHeader title="Tarifs de l’automatisation pour TPE, dès 150 €" note="Forfait, jamais à l’heure">
        Chez Axion Studio, l’audit de 30 minutes est offert, les projets sont facturés au forfait à partir de 150 € et
        le suivi mensuel démarre à 250 € par mois, sans engagement. Pas de facturation à l’heure : vous connaissez le
        prix exact avant de vous engager.
      </PageHeader>

      <Section note="3 formules">
        <div className="grid gap-6 lg:grid-cols-3">
          {offers.map(o => (
            <article key={o.name} className={`lift flex flex-col rounded-lg border bg-paper p-6 sm:p-8 ${o.featured ? 'border-2 border-pen' : 'border-rule'}`}>
              <h2 className="text-2xl leading-tight">{o.name}</h2>
              <p className="mt-4">
                {o.from && <span className="block text-sm text-muted">À partir de</span>}
                <span className="font-display text-[2.5rem] leading-none font-extrabold tabular-nums [font-stretch:85%]">{o.price}</span>
                <span className="block mt-1 text-sm text-muted">{o.unit}</span>
              </p>
              <p className="mt-4 leading-[1.6] text-muted">{o.text}</p>
              <ul className="mt-6 mb-8 border-t border-rule">
                {o.items.map(i => <li key={i} className="border-b border-rule py-3">{i}</li>)}
              </ul>
              <Link to="/contact/" onClick={() => preparerDemande(`Bonjour,\n\nJe m’intéresse à la formule ${o.name}. Mon besoin : `)} className={`${o.featured ? btn.primary : btn.ghost} mt-auto`}>{o.cta}</Link>
            </article>
          ))}
        </div>
        <div className="mt-10 max-w-[64ch] space-y-3 leading-[1.6] text-muted">
          <p className="font-sans font-medium text-ink">Prestations réservées aux professionnels : entreprises, indépendants, professions libérales et associations.</p>
          <p>TVA non applicable, article 293 B du CGI : les prix indiqués sur les devis sont les prix que vous payez.
            Acompte, paiement et conditions détaillés dans les <Link to="/cgv/" className={textLink}>conditions générales de vente</Link>.</p>
          <p>
            Les abonnements aux outils d’automatisation ou d’IA (par exemple n8n, Make ou une API d’IA) restent à votre
            nom et à votre charge. Je vous indique leur coût dans la proposition.
            {' '}<Link to="/faq/" className={textLink}>Voir les questions fréquentes</Link>
          </p>
          <p>Comment se déroule un projet : <Link to="/methode/" className={textLink}>les étapes, de l’audit gratuit au suivi</Link>.</p>
        </div>
      </Section>

      <Section tone="alt" note="Ce qui fait le prix">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="text-[2rem] leading-tight">Ce qui fait varier le prix d’un projet</h2>
            <ul className="mt-6 list-disc space-y-2 pl-6 text-lg leading-[1.6] marker:text-pen">
              <li>Le nombre de logiciels à relier, et s’ils proposent une connexion (API) ou non.</li>
              <li>Les étapes d’intelligence artificielle : lecture de documents, tri, rédaction de brouillons.</li>
              <li>Le volume de données et les cas particuliers à prévoir.</li>
              <li>La reprise de l’existant : fichiers à nettoyer, workflows à corriger.</li>
            </ul>
          </div>
          <div>
            <h2 className="text-[2rem] leading-tight">Ce qui est toujours inclus</h2>
            <ul className="mt-6 list-disc space-y-2 pl-6 text-lg leading-[1.6] marker:text-pen">
              <li>L’audit gratuit de 30 minutes et une proposition écrite sous 72 heures.</li>
              <li>La construction et les tests sur vos données réelles.</li>
              <li>La documentation en mots simples, et tout reste à votre nom.</li>
              <li>Un mois de suivi : corrections sans frais si quelque chose ne marche pas.</li>
            </ul>
          </div>
        </div>
      </Section>

      <Section note="Questions sur les prix">
        <h2 className="text-[2rem] leading-tight">Questions fréquentes sur les tarifs</h2>
        <dl className="mt-8 max-w-3xl space-y-8 text-lg leading-[1.6]">
          {tarifsFaq.map(f => (
            <div key={f.q}>
              <dt className="text-xl leading-tight font-medium">{f.q}</dt>
              <dd className="mt-2 text-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 text-lg">Vous utilisez n8n ? Voir aussi la page <Link to="/agence-n8n/" className={textLink}>agence n8n</Link>.</p>
      </Section>

      <CtaBand />
    </>
  )
}
