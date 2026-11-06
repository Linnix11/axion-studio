import { PageHeader, Section, SectionHead, CtaBand, usePageMeta } from '../components/ui'
import { IdentityCard, Guarantees } from '../components/Trust'
import { company } from '../data'

export default function APropos() {
  usePageMeta('/a-propos')
  return (
    <>
      <PageHeader title="À propos" note="Un seul interlocuteur" />
      <Section note="Le fondateur">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] lg:gap-16">
          <div className="max-w-[62ch]">
            <h2 className="text-[2rem] leading-tight md:text-[2.5rem]">Qui je suis</h2>
            <div className="mt-8 space-y-5 font-serif text-lg leading-[1.7]">
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
                Je suis basé à Montlignon, dans le Val-d’Oise. Je me déplace en Île-de-France et je travaille à
                distance partout en France.
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
