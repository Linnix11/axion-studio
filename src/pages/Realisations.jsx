import { Link } from 'react-router'
import { PageHeader, Section, CtaBand, textLink, standaloneLink, usePageMeta } from '../components/ui'
import { realisations, metiers } from '../data'

/** Aperçu dessiné en CSS (pas d'image) : une fenêtre de navigateur avec le grand mot de la page d'accueil. Décoratif. */
function Apercu({ apercu: a }) {
  return (
    <div aria-hidden="true" className="overflow-hidden rounded-lg border border-rule" style={{ background: a.fond, color: a.texte }}>
      <div className="flex items-center gap-1.5 px-3 py-2" style={{ borderBottom: `1px solid ${a.texte}22` }}>
        {[0, 1, 2].map(i => <span key={i} className="h-2 w-2 rounded-full" style={{ background: `${a.texte}55` }} />)}
      </div>
      <div className="relative aspect-[16/9] p-5">
        <div className="absolute inset-0" style={{ background: `radial-gradient(circle at 78% 70%, ${a.accent}66, transparent 55%)` }} />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex justify-between">
            <span className="h-2 w-14 rounded-full" style={{ background: a.texte, opacity: 0.7 }} />
            <span className="flex gap-2">{[0, 1, 2].map(i => <span key={i} className="h-2 w-6 rounded-full" style={{ background: a.texte, opacity: 0.35 }} />)}</span>
          </div>
          <div>
            <p className="font-display text-5xl leading-none font-bold tracking-[-0.04em] sm:text-6xl">{a.mot}</p>
            <span className="mt-3 block h-2 w-2/3 rounded-full" style={{ background: a.texte, opacity: 0.3 }} />
            <span className="mt-4 inline-block h-6 w-24 rounded-full" style={{ background: a.accent }} />
          </div>
        </div>
      </div>
    </div>
  )
}

const GROUPES = [
  { id: 'batiment', titre: 'Artisans du bâtiment et services', texte: 'Des sites rapides et sobres, pensés pour un téléphone en 4G : ils s’affichent tout de suite et mènent au devis.' },
  { id: 'axion', titre: 'Mon propre site', texte: 'Le site d’Axion Studio, en ligne : conçu, écrit et développé par moi.' },
  { id: 'immersif', titre: 'Sites immersifs', texte: 'Pour une entreprise qui veut se démarquer : effets au défilement et 3D sur grand écran, une page simple et légère sur mobile.' },
]

export default function Realisations() {
  usePageMeta('/realisations')
  return (
    <>
      <PageHeader title="Réalisations : sites vitrine" note="Sites web">
        Je crée des sites vitrine soignés, rapides et reliés à vos outils : un formulaire qui crée la fiche client,
        une prise de rendez-vous qui remplit votre agenda, une confirmation envoyée seule. Voici des concepts de
        démonstration, d’abord pour les artisans du bâtiment, puis mon propre site et des sites plus spectaculaires.
      </PageHeader>

      {GROUPES.map((g, i) => {
        const liste = realisations.filter(r => r.groupe === g.id)
        return (
          <Section key={g.id} note={i === 0 ? `${realisations.length} sites` : undefined}>
            <h2 className="text-3xl leading-tight md:text-4xl">{g.titre}</h2>
            <p className="mt-3 max-w-[64ch] text-lg leading-[1.6] text-muted">{g.texte}</p>
            <ul className="mt-8 grid gap-8 md:grid-cols-2">
              {liste.map(r => {
                const metier = r.metier && metiers.find(m => m.slug === r.metier)
                return (
                  <li key={r.nom}>
                    <article className="lift flex h-full flex-col rounded-xl border border-rule bg-paper p-5">
                      <Apercu apercu={r.apercu} />
                      <p className="mt-5 text-sm text-muted">{r.type}</p>
                      <h3 className="text-2xl leading-tight">{r.nom}</h3>
                      {r.demo
                        ? <p className="mt-3 self-start rounded-md border border-pen px-2.5 py-1 text-sm font-semibold text-pen">Concept de démonstration, entreprise fictive</p>
                        : <p className="mt-3 self-start rounded-md bg-paper-2 px-2.5 py-1 text-sm font-semibold">Réalisation en ligne</p>}
                      <p className="mt-4 text-lg leading-[1.6] text-muted">{r.texte}</p>
                      <p className="mt-5 border-b-2 border-ink pb-2 text-base font-medium">Ce qui est inclus</p>
                      <ul className="mt-1">
                        {r.inclus.map(x => <li key={x} className="border-b border-rule py-3 leading-[1.5]">{x}</li>)}
                      </ul>
                      {metier && (
                        <p className="mt-4 leading-[1.6] text-muted">
                          {'Pensé pour : '}<Link to={`/automatisation/${metier.slug}/`} className={textLink}>{metier.nom.toLowerCase()}</Link>
                        </p>
                      )}
                      <div className="mt-auto pt-4">
                        {r.demo
                          ? <a href={r.lien} target="_blank" rel="noopener" className={standaloneLink}>Voir la démo<span className="sr-only"> {r.nom}, nouvel onglet</span></a>
                          : <a href={r.lien} className={standaloneLink}>{r.lienTexte}</a>}
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
          </Section>
        )
      })}

      <Section>
        <p className="max-w-[64ch] text-lg leading-[1.6] text-muted">
          Les démos présentent des entreprises inventées. Leurs formulaires n’envoient rien : chaque démo explique ce qui
          se passerait chez un vrai client. Le détail de l’offre est sur la page <Link to="/services/#sites-web" className={textLink}>services</Link>.
        </p>
      </Section>

      <CtaBand title="Un site pour votre entreprise ?" text="Dites-moi ce que fait votre entreprise et ce que votre site doit faire. Je vous réponds avec une proposition claire, au forfait." />
    </>
  )
}
