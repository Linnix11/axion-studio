import { Link } from 'react-router'
import { PageHeader, textLink, Section, CtaBand, AuditLink, standaloneLink, usePageMeta } from '../components/ui'
import { useCases } from '../data'

export default function Exemples() {
  usePageMeta('/exemples')
  return (
    <>
      <PageHeader title="Exemples d’automatisation pour TPE et PME" note={`${useCases.length} cas types, ${useCases.length} métiers`}>
        Des cas types, inspirés de situations courantes dans les petites entreprises. Ils montrent ce qui change
        concrètement au quotidien. Les gains de temps sont des ordres de grandeur.
      </PageHeader>

      <Section note="Gains en ordre de grandeur">
        <div className="space-y-6">
          {useCases.map(u => (
            <article key={u.task} className="lift overflow-hidden rounded-lg border border-rule bg-paper">
              <header className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule bg-paper-2 px-6 py-4">
                <div>
                  <p className="text-sm text-muted">{u.sector}</p>
                  <h2 className="text-2xl leading-tight">{u.task}</h2>
                </div>
                <p><span className="marker rounded-sm px-1.5 py-0.5 font-medium">{u.gain} récupérées</span></p>
              </header>
              <div className="grid md:grid-cols-2">
                <div className="border-b border-rule p-6 md:border-r md:border-b-0">
                  <h3 className="text-base font-medium text-muted">Avant</h3>
                  <p className="mt-2 text-lg leading-[1.6] text-muted line-through decoration-pen/60">{u.before}</p>
                </div>
                <div className="p-6">
                  <h3 className="text-base font-medium text-pen">Après</h3>
                  <p className="mt-2 text-lg leading-[1.6]">{u.after}</p>
                  <AuditLink className={`${standaloneLink} mt-2`} demande={`Bonjour,\n\nJ’ai le même besoin que votre exemple « ${u.task} ». Chez moi : `}>J’ai la même tâche, parlons-en</AuditLink>
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-10 max-w-[64ch] text-lg leading-[1.6] text-muted">
          Pour aller plus loin : comment <Link to="/blog/devis-artisan-automatiser/" className={textLink}>préparer un devis d’artisan à partir de la demande</Link>,
          et comment <Link to="/blog/relances-factures-impayees/" className={textLink}>automatiser les relances de factures impayées</Link>.
        </p>
      </Section>

      <CtaBand title="Votre cas n’est pas dans la liste ?" text="Chaque entreprise a ses propres tâches répétitives. Décrivez la vôtre, je vous dis si elle peut être automatisée." />
    </>
  )
}
