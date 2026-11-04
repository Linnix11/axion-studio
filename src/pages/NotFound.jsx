import { Link } from 'react-router'
import { PageHeader, Container, btn, usePageMeta } from '../components/ui'

export default function NotFound() {
  usePageMeta('Page introuvable')
  return (
    <>
      <PageHeader title="Cette page n'existe pas">
        Le lien est peut-être ancien ou mal recopié. Vous pouvez repartir de l'accueil ou me contacter directement.
      </PageHeader>
      <Container className="flex flex-wrap gap-3 py-12 lg:pl-[13.5rem]">
        <Link to="/" className={btn.primary}>Retour à l'accueil</Link>
        <Link to="/contact" className={btn.ghost}>Me contacter</Link>
      </Container>
    </>
  )
}
