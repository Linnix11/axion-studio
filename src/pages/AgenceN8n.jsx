import { Link } from 'react-router'
import { PageHeader, Section, SectionHead, CtaBand, AuditLink, btn, textLink, usePageMeta } from '../components/ui'
import { n8n } from '../n8n'

/** Page « Agence n8n » (contenu dans src/n8n.js). */
export default function AgenceN8n() {
  usePageMeta('/agence-n8n')
  return (
    <>
      <PageHeader title={n8n.title} note="Workflows n8n sur mesure">{n8n.intro}</PageHeader>

      <Section note="Pourquoi n8n">
        <SectionHead title="Pourquoi choisir n8n pour automatiser votre entreprise" />
        <ul className="grid gap-5 md:grid-cols-2">
          {n8n.pourquoi.map(p => (
            <li key={p.titre} className="rounded-xl border border-rule bg-paper p-6">
              <h3 className="text-xl leading-tight">{p.titre}</h3>
              <p className="mt-2 leading-[1.6] text-muted">{p.texte}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-[64ch] text-lg leading-[1.6] text-muted">
          n8n n’est pas toujours le bon choix : pour un petit besoin, Make ou Zapier peuvent suffire.
          Le comparatif est dans l’article <Link to="/blog/n8n-make-zapier-comparatif/" className={textLink}>n8n, Make ou Zapier : quel outil choisir</Link>.
          Pour découvrir l’outil : <Link to="/blog/n8n-c-est-quoi/" className={textLink}>n8n, c’est quoi ?</Link> et <Link to="/blog/agent-ia-n8n/" className={textLink}>créer un agent IA avec n8n</Link>.
        </p>
      </Section>

      <Section tone="alt" note="Ce que je fais">
        <SectionHead title="Mes prestations n8n" />
        <ul className="max-w-3xl border-t border-rule">
          {n8n.prestations.map(p => <li key={p} className="border-b border-rule py-3 text-lg leading-[1.5]">{p}</li>)}
        </ul>
        <div className="mt-8 flex flex-wrap gap-3">
          <AuditLink className={btn.primary} demande={'Bonjour,\n\nJe cherche un prestataire n8n. Mon besoin : '} />
          <Link to="/tarifs/" className={btn.ghost}>Voir les tarifs</Link>
        </div>
      </Section>

      <Section note="Exemples de workflows">
        <SectionHead title="Des workflows n8n concrets">
          D’autres cas par métier : <Link to="/automatisation/artisans-batiment/" className={textLink}>artisans</Link>,{' '}
          <Link to="/automatisation/experts-comptables/" className={textLink}>experts-comptables</Link>,{' '}
          <Link to="/automatisation/agences-immobilieres/" className={textLink}>agences immobilières</Link>,{' '}
          <Link to="/exemples/" className={textLink}>et tous les exemples</Link>.
        </SectionHead>
        <ul className="grid gap-5 md:grid-cols-2">
          {n8n.exemples.map(e => (
            <li key={e.titre} className="rounded-xl border border-rule bg-paper p-6">
              <h3 className="text-xl leading-tight">{e.titre}</h3>
              <p className="mt-2 leading-[1.6] text-muted">{e.texte}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section tone="alt" note="Questions fréquentes">
        <SectionHead title="Vos questions sur n8n" />
        <dl className="max-w-3xl space-y-8 text-lg leading-[1.6]">
          {n8n.faq.map(f => (
            <div key={f.q}>
              <dt className="text-xl leading-tight font-medium">{f.q}</dt>
              <dd className="mt-2 text-muted">{f.a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CtaBand title="Un workflow n8n à créer ou à reprendre ?" />
    </>
  )
}
