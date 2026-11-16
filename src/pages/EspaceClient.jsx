import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { Container, btn, eyebrow, textLink } from '../components/ui'
import { company } from '../data'
import { api, messageErreur } from '../espace/api'
import { Alert, Badge, ETATS, Field, Legende, activite, card, dateLongue, depuis, input, n, synchroEnRetard, usePrivateTitle } from '../espace/ui'

/** /espace-client/ : connexion, choix du mot de passe (lien reçu par e-mail) et tableau de bord du client. */
export default function EspaceClient() {
  const [params, setParams] = useSearchParams()
  const lien = params.get('lien') || ''
  const [user, setUser] = useState(undefined)   // undefined : vérification en cours ; null : non connecté
  const navigate = useNavigate()

  useEffect(() => {
    if (lien) return
    let actif = true
    api.moi().then(r => actif && setUser(r.user)).catch(() => actif && setUser(null))
    return () => { actif = false }
  }, [lien])

  const connecte = u => {
    if (u.role === 'admin') { navigate('/espace-client/admin/'); return }
    setParams({}, { replace: true })
    setUser(u)
  }

  if (lien) return <Shell titre="Choisir votre mot de passe"><ChoixMotDePasse lien={lien} onDone={connecte} onAbandon={() => setParams({}, { replace: true })} /></Shell>
  if (user === undefined) return <Shell titre="Espace client"><p className="text-lg text-muted" role="status">Chargement…</p></Shell>
  if (!user) return <Shell titre="Espace client"><Connexion onDone={connecte} /></Shell>
  if (user.role === 'admin') return <Shell titre="Espace client"><p className="text-lg">Vous êtes connecté en administrateur. <Link to="/espace-client/admin/" className={textLink}>Ouvrir l’administration</Link></p></Shell>
  return <TableauDeBord onLogout={() => setUser(null)} />
}

function Shell({ titre, children }) {
  usePrivateTitle(titre)
  return (
    <section className="border-b border-rule">
      <Container className="pt-14 pb-20 md:pt-20">
        <p className={eyebrow}>Espace client</p>
        <h1 className="mt-3 text-[2.5rem] leading-[1.05] tracking-[-0.03em] sm:text-6xl">{titre}</h1>
        <div className="mt-10 max-w-md">{children}</div>
      </Container>
    </section>
  )
}

function Connexion({ onDone }) {
  const [mode, setMode] = useState('connexion')   // connexion | oubli | envoye
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const alertRef = useRef(null)

  const submit = async e => {
    e.preventDefault()
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Indiquez votre adresse e-mail, par ex. nom@exemple.fr.'); return }
    if (mode === 'connexion' && !password) { setError('Indiquez votre mot de passe.'); return }
    setBusy(true)
    try {
      if (mode === 'connexion') { const r = await api.connexion(email, password); onDone(r.user) }
      else { await api.oubli(email); setMode('envoye') }
    } catch (err) {
      setError(messageErreur(err)); requestAnimationFrame(() => alertRef.current?.focus())
    } finally { setBusy(false) }
  }

  if (mode === 'envoye') {
    return (
      <div>
        <Alert tone="ok">Si un compte existe pour {email}, un e-mail vient de partir avec un lien pour choisir votre mot de passe. Pensez à regarder dans les indésirables.</Alert>
        <button type="button" className={btn.ghost} onClick={() => { setMode('connexion'); setPassword('') }}>Revenir à la connexion</button>
      </div>
    )
  }

  return (
    <form noValidate onSubmit={submit} className={`${card} p-6 sm:p-8`} aria-busy={busy}>
      {error && <div ref={alertRef} tabIndex={-1}><Alert>{error}</Alert></div>}
      {mode === 'oubli' && <p className="mb-5 text-muted">Indiquez votre adresse : vous recevrez un lien pour choisir un nouveau mot de passe.</p>}
      <Field id="email" label="Adresse e-mail">
        <input id="email" type="email" autoComplete="username" className={input} value={email} onChange={e => setEmail(e.target.value)} required />
      </Field>
      {mode === 'connexion' && (
        <Field id="password" label="Mot de passe">
          <input id="password" type="password" autoComplete="current-password" className={input} value={password} onChange={e => setPassword(e.target.value)} required />
        </Field>
      )}
      <button type="submit" disabled={busy} className={`${btn.primary} w-full`}>
        {busy ? 'Un instant…' : mode === 'connexion' ? 'Se connecter' : 'Recevoir le lien'}
      </button>
      <button type="button" className="mt-4 inline-flex min-h-11 items-center text-pen underline-offset-4 hover:underline"
              onClick={() => { setMode(mode === 'connexion' ? 'oubli' : 'connexion'); setError('') }}>
        {mode === 'connexion' ? 'Mot de passe oublié ou première connexion' : 'J’ai déjà un mot de passe'}
      </button>
    </form>
  )
}

function ChoixMotDePasse({ lien, onDone, onAbandon }) {
  const [info, setInfo] = useState(undefined)   // undefined : vérification ; null : lien invalide
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [errors, setErrors] = useState({})
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => { api.lien(lien).then(setInfo).catch(() => setInfo(null)) }, [lien])

  if (info === undefined) return <p className="text-lg text-muted" role="status">Vérification du lien…</p>
  if (info === null) {
    return (
      <div>
        <Alert>Ce lien n’est plus valable : il a déjà servi ou il a expiré.</Alert>
        <button type="button" className={btn.primary} onClick={onAbandon}>Demander un nouveau lien</button>
      </div>
    )
  }

  const submit = async e => {
    e.preventDefault()
    const errs = {}
    if (password.length < 10) errs.password = 'Choisissez au moins 10 caractères.'
    else if (confirm !== password) errs.confirm = 'Les deux saisies ne sont pas identiques.'
    setErrors(errs); setError('')
    if (Object.keys(errs).length) return
    setBusy(true)
    try { const r = await api.activer(lien, password); onDone(r.user) }
    catch (err) { setErrors(err.fields || {}); setError(messageErreur(err)) }
    finally { setBusy(false) }
  }

  return (
    <form noValidate onSubmit={submit} className={`${card} p-6 sm:p-8`} aria-busy={busy}>
      {error && <Alert>{error}</Alert>}
      <p className="mb-5 text-muted">Identifiant{' '}: <strong className="text-ink">{info.email}</strong></p>
      <input type="email" autoComplete="username" value={info.email} readOnly hidden />
      <Field id="password" label="Nouveau mot de passe" hint="Au moins 10 caractères. Une phrase courte est facile à retenir et difficile à deviner." error={errors.password}>
        <input id="password" type="password" autoComplete="new-password" className={input} value={password} onChange={e => { setPassword(e.target.value); setErrors({}) }}
               aria-invalid={errors.password ? true : undefined} aria-describedby={errors.password ? 'password-err' : 'password-hint'} />
      </Field>
      <Field id="confirm" label="Confirmer le mot de passe" error={errors.confirm}>
        <input id="confirm" type="password" autoComplete="new-password" className={input} value={confirm} onChange={e => { setConfirm(e.target.value); setErrors({}) }}
               aria-invalid={errors.confirm ? true : undefined} aria-describedby={errors.confirm ? 'confirm-err' : undefined} />
      </Field>
      <button type="submit" disabled={busy} className={`${btn.primary} w-full`}>{busy ? 'Un instant…' : 'Enregistrer et ouvrir mon espace'}</button>
    </form>
  )
}

function TableauDeBord({ onLogout }) {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  usePrivateTitle('Mon espace client')

  const charger = () => api.tableauClient().then(d => { setData(d); setError('') }).catch(e => (e.code === 'auth' ? onLogout() : setError(messageErreur(e))))
  useEffect(() => {
    charger()
    const t = setInterval(charger, 5 * 60 * 1000)   // statuts rafraîchis toutes les 5 minutes
    return () => clearInterval(t)
  }, [])   // eslint-disable-line react-hooks/exhaustive-deps

  const logout = async () => { try { await api.deconnexion() } finally { onLogout() } }

  if (!data) {
    return <Shell titre="Mon espace client">{error ? <Alert>{error}</Alert> : <p className="text-lg text-muted" role="status">Chargement…</p>}</Shell>
  }
  const { client } = data
  // Les problèmes d'abord, puis ce qui tourne, puis le reste
  const rang = { erreur: 0, ok: 1, attente: 2, demande: 3, pause: 4 }
  const autos = [...data.automatisations].sort((a, b) => (rang[a.etat] ?? 9) - (rang[b.etat] ?? 9))
  const prenom = (client.contact || '').split(' ')[0]
  const mail = data.contact.email

  return (
    <>
      <section className="border-b border-rule">
        <Container className="pt-14 pb-12 md:pt-20">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className={eyebrow}>Espace client</p>
              <h1 className="mt-3 text-[2.5rem] leading-[1.05] tracking-[-0.03em] sm:text-6xl">{prenom ? `Bonjour ${prenom}` : 'Bonjour'}</h1>
              <p className="mt-4 text-xl text-muted">{client.entreprise}</p>
            </div>
            <button type="button" onClick={logout} className={btn.ghost}>Se déconnecter</button>
          </div>
          <Resume autos={autos} suivi={client.suivi} synchro={data.derniere_synchro} mail={mail} />
        </Container>
      </section>

      <section>
        <Container className="py-14 md:py-20">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-[2rem] leading-tight md:text-4xl">Vos automatisations</h2>
            {data.derniere_synchro && <p className="text-sm text-muted">Informations relevées {depuis(data.derniere_synchro)}</p>}
          </div>
          <p className="mt-2 max-w-[65ch] text-muted">Chaque automatisation fait une tâche à votre place. Vous voyez ici si elle fonctionne et ce qu’elle a fait cette semaine.</p>
          {error && <div className="mt-6"><Alert>{error}</Alert></div>}
          {autos.length === 0 ? (
            <div className={`${card} mt-8 p-6 sm:p-8`}>
              <p className="text-lg">Vos automatisations apparaîtront ici dès leur mise en service.</p>
              <p className="mt-2 text-muted">Pour chacune, vous verrez si elle fonctionne et combien de fois elle a servi dans la semaine.</p>
            </div>
          ) : (
            <ul className="mt-8 grid gap-5 md:grid-cols-2">
              {autos.map(a => (
                <li key={a.id} className={`${card} p-6 ${a.etat === 'erreur' ? 'border-2 border-error' : ''}`}>
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl leading-tight">{a.nom}</h3>
                    <Badge etat={a.etat} />
                  </div>
                  {a.description && <p className="mt-2 leading-[1.6]">{a.description}</p>}
                  <p className={`mt-3 text-sm ${a.etat === 'erreur' ? 'text-error' : 'text-muted'}`}>{ETATS[a.etat]?.aide}</p>
                  <p className="mt-3 border-t border-rule pt-3 text-sm text-muted">{activite(a)}</p>
                </li>
              ))}
            </ul>
          )}
          <div className="mt-8 grid gap-3">
            <Legende />
            <details className={`${card} p-5`}>
              <summary className="cursor-pointer font-medium">Questions fréquentes</summary>
              <dl className="mt-4 grid gap-4 text-sm">
                <div><dt className="font-medium">Dois-je faire quelque chose{' '}?</dt><dd className="mt-1 text-muted">Non. Vos automatisations tournent seules. Cette page sert à vérifier d’un coup d’œil que tout va bien.</dd></div>
                <div><dt className="font-medium">Une automatisation ne fait plus ce qu’elle devrait{' '}?</dt><dd className="mt-1 text-muted">Écrivez-moi ce que vous avez remarqué, avec un exemple (date, client, document concerné){' '}: c’est ce qui permet de trouver la cause le plus vite.</dd></div>
                <div><dt className="font-medium">Je voudrais modifier une automatisation ou en ajouter une</dt><dd className="mt-1 text-muted">Décrivez la tâche avec vos mots, par e-mail{' '}: vous saurez ce qui est possible et à quel prix avant que rien ne commence.</dd></div>
                <div><dt className="font-medium">D’où viennent ces informations{' '}?</dt><dd className="mt-1 text-muted">Elles sont relevées automatiquement toutes les 15 minutes dans l’outil qui fait tourner vos automatisations, et cette page se met à jour toute seule.</dd></div>
              </dl>
            </details>
          </div>
        </Container>
      </section>

      <section className="border-t border-rule bg-paper">
        <Container className="grid gap-8 py-14 md:grid-cols-2 md:py-20">
          <div>
            <h2 className="text-2xl">Votre contrat</h2>
            <dl className="mt-4 space-y-2 text-lg">
              {client.formule && <div><dt className="inline text-muted">Formule{' '}: </dt><dd className="inline">{client.formule}</dd></div>}
              {client.date_contrat && <div><dt className="inline text-muted">Depuis le </dt><dd className="inline">{dateLongue(client.date_contrat)}</dd></div>}
              <div><dt className="inline text-muted">Suivi mensuel{' '}: </dt><dd className="inline">{client.suivi ? 'inclus' : 'non souscrit'}</dd></div>
            </dl>
            <p className="mt-3 max-w-[50ch] text-muted">{client.suivi
              ? 'Vos automatisations sont surveillées et corrigées, les petites évolutions sont comprises et nous faisons le point ensemble chaque mois.'
              : 'Les corrections et les évolutions se font à la demande. Le suivi mensuel, sans engagement, les inclut.'}</p>
          </div>
          <div>
            <h2 className="text-2xl">Une question, une évolution{' '}?</h2>
            <p className="mt-4 text-lg leading-[1.6] text-muted">Écrivez-moi, je vous réponds sous {company.delai}.</p>
            <a href={`mailto:${mail}`} className={`${btn.primary} mt-5`}>Écrire à Axion Studio</a>
          </div>
        </Container>
      </section>
    </>
  )
}

/** La réponse à « est-ce que tout va bien ? », en une phrase, avant le détail. */
function Resume({ autos, suivi, synchro, mail }) {
  if (!autos.length) return null
  const problemes = autos.filter(a => a.etat === 'erreur').length
  const enService = autos.filter(a => a.etat !== 'pause').length
  const total = autos.reduce((s, a) => s + (a.executions_7j || 0), 0)
  return (
    <div className="mt-10 grid max-w-3xl gap-3">
      {problemes > 0 ? (
        <div role="status" className="rounded-xl border-2 border-error bg-paper p-6">
          <p className="text-2xl font-medium text-error">{problemes > 1 ? `${problemes} automatisations ont un problème` : '1 automatisation a un problème'}</p>
          <p className="mt-2 text-lg text-muted">{suivi
            ? 'Axion Studio le voit dans son suivi et s’en occupe dans le cadre de votre suivi mensuel. Vous n’avez rien à faire.'
            : <>Axion Studio le voit dans son suivi. Si cette tâche est urgente pour vous, <a href={`mailto:${mail}`} className={textLink}>écrivez-moi</a>.</>}</p>
        </div>
      ) : (
        <div role="status" className="rounded-xl border-2 border-ok bg-paper p-6">
          <p className="text-2xl font-medium text-ok">Tout fonctionne normalement</p>
          <p className="mt-2 text-lg text-muted">{n(enService, 'automatisation')} en service{total > 0 ? `, qui ont servi ${n(total, 'fois', 'fois')} ces 7 derniers jours` : ''}.</p>
        </div>
      )}
      {synchroEnRetard(synchro) && (
        <Alert tone="info">
          {synchro ? `Dernier relevé\u00a0: ${depuis(synchro)}.` : 'Aucun relevé pour l’instant.'} Les états ci-dessous peuvent ne plus être à jour. Axion Studio le voit dans son tableau de suivi.
        </Alert>
      )}
    </div>
  )
}
