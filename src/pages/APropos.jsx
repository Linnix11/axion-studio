import { Link } from 'react-router'
import { PageHeader, textLink, Section, SectionHead, CtaBand, usePageMeta } from '../components/ui'
import { IdentityCard, Guarantees } from '../components/Trust'
import { company } from '../data'

export default function APropos() {
  usePageMeta('/a-propos')
  return (
    <>
      <PageHeader title="À propos d’Axion Studio et de son fondateur" note="Un seul interlocuteur" />
      <Section note="Le fondateur">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <div className="max-w-[62ch]">
            <h2 className="text-[2rem] leading-tight md:text-[2.5rem]">Qui je suis</h2>
            <div className="mt-8 space-y-5 text-lg leading-[1.7]">
              <p>
                Je m’appelle {company.owner} et j’ai créé {company.brand} pour une raison simple : trop d’entreprises
                perdent des heures chaque semaine à recopier, relancer et classer à la main.
              </p>
              <p>
                Ces tâches ne demandent pas de réflexion, mais elles prennent du temps et de l’attention. Elles sont
                aussi celles où les erreurs arrivent le plus souvent : une facture oubliée, un client qu’on ne rappelle
                pas, un chiffre mal recopié.
              </p>
              <p>
                Je construis des automatisations simples, qui fonctionnent avec les outils que vous utilisez déjà et
                que vous comprenez. Pas de logiciel à réapprendre, pas de boîte noire : chaque workflow est documenté et
                vous appartient.
              </p>
              <p>
                Je suis basé à Montlignon, dans le Val-d’Oise (coordonnées complètes dans les{' '}
                <Link to="/mentions-legales/" className={textLink}>mentions légales</Link>). Je me déplace en Île-de-France
                et je travaille à distance partout en France.
              </p>
              <p>
                Pour les entreprises qui utilisent n8n, je propose aussi la <Link to="/agence-n8n/" className={textLink}>conception et la maintenance de workflows n8n</Link>.
              </p>
            </div>
            <p className="mt-8 text-lg font-medium">{company.owner}</p>
            <p className="text-muted">Fondateur, {company.brand}</p>
          </div>
          <div className="self-start lg:sticky lg:top-24"><IdentityCard /></div>
        </div>
      </Section>
      <Section tone="alt" note="Mes garanties">
        <SectionHead title="Mes garanties" />
        <Guarantees />
      </Section>
      <CtaBand />
    </>
  )
}
