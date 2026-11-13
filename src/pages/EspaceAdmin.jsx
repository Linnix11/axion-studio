import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router'
import { Container, btn, textLink } from '../components/ui'
import { offers } from '../data'
import { api, messageErreur } from '../espace/api'
import { Alert, Badge, Field, card, dateLongue, depuis, input, n, usePrivateTitle } from '../espace/ui'

const COMPTES = {
  invite: 'Invité',
  actif: 'Compte actif',
  suspendu: 'Accès suspendu',
  'sans-compte': 'Sans compte',
}
const STATUTS = { actif: 'En cours', pause: 'En pause', termine: 'Terminé' }
const FORMULES = offers.filter(o => o.name !== 'Audit').map(o => o.name).concat('Projet + suivi mensuel')
const SYNC_RETARD = 3600   // au-delà d'une heure sans nouvelles de n8n, on le signale
const petit = 'inline-flex min-h-11 items-center justify-center rounded-full border border-rule bg-paper px-4 text-sm font-semibold text-ink cursor-pointer hover:border-pen hover:text-pen active:translate-y-px disabled:cursor-not-allowed disabled:opacity-60'
const etiquette = c => `client-${c.slug}`
// Adresse de chaque n8n (nom d'instance envoyé par le workflow de suivi), pour ouvrir un workflow d'un clic
const N8N_URL = { vps: 'https://n8n-ic2h.srv2151065.hstgr.cloud' }
// Workflows de démarchage : reconnus à leur nom (« Collecte de prospects », « … de prospection », « démarchage »)
const estProspection = a => /prospect|d[ée]marchage/i.test(a.nom)

/** /espace-client/admin/ : ce qui demande une action d'abord, puis les clients, puis les workflows à rattacher.
 *  La vue est dans l'adresse (?client=…, ?nouveau) : le bouton Retour du navigateur fonctionne. */
export default function EspaceAdmin() {
  usePrivateTitle('Administration')
  const navigate = useNavigate()
  const [params, setParams] = useSearchParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [flash, setFlash] = useState('')

  const charger = useCallback(() => api.admin.tableau().then(d => { setData(d); setError('') }).catch(e => {
    if (e.code === 'auth' || e.code === 'forbidden') navigate('/espace-client/', { replace: true })
    else setError(messageErreur(e))
  }), [navigate])
  useEffect(() => { charger() }, [charger])

  const aller = (p, msg = '') => { setFlash(msg); setParams(p); charger(); window.scrollTo(0, 0) }
  const logout = async () => { try { await api.deconnexion() } finally { navigate('/espace-client/', { replace: true }) } }

  if (!data) {
    return <Container className="py-16">{error ? <Alert>{error}</Alert> : <p className="text-lg text-muted" role="status">Chargement…</p>}</Container>
  }

  const clientId = Number(params.get('client')) || null
  const nouveau = params.has('nouveau')
  const prospection = params.get('vue') === 'prospection'
  const nbProspection = data.non_rattachees.filter(estProspection).length
  const onglet = actif => `inline-flex min-h-11 items-center border-b-2 px-1 text-base no-underline ${actif ? 'border-pen font-medium text-ink' : 'border-transparent text-muted hover:text-pen'}`

  return (
    <Container className="py-8 md:py-10">
      <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-rule pb-5">
        <div className="min-w-0">
          <h1 className="text-3xl leading-tight">
            <button type="button" className="cursor-pointer hover:text-pen" onClick={() => aller({})}>Administration</button>
          </h1>
          <Synchro synchros={data.synchros} onChange={charger} />
        </div>
        <div className="flex flex-wrap gap-3">
          {!nouveau && <button type="button" className={btn.primary} onClick={() => aller({ nouveau: '' })}>Nouveau client</button>}
          <button type="button" className={btn.ghost} onClick={logout}>Se déconnecter</button>
        </div>
      </header>

      <nav aria-label="Sections de l’administration" className="mt-4 flex gap-6 border-b border-rule">
        <button type="button" className={onglet(!prospection)} aria-current={!prospection ? 'page' : undefined} onClick={() => aller({})}>Clients</button>
        <button type="button" className={onglet(prospection)} aria-current={prospection ? 'page' : undefined} onClick={() => aller({ vue: 'prospection' })}>
          Prospection <span className="ml-1 text-muted tabular-nums">({nbProspection})</span>
        </button>
      </nav>

      <div className="mt-8">
        {flash && <Alert tone="ok">{flash}</Alert>}
        {error && <Alert>{error}</Alert>}
        {nouveau ? <NouveauClient onAnnuler={() => aller({})} onCree={(id, msg) => aller({ client: String(id) }, msg)} />
          : prospection ? <Prospection autos={data.non_rattachees.filter(estProspection)} />
          : clientId ? <FicheClient key={clientId} id={clientId} clients={data.clients} onRetour={msg => aller({}, msg)} onChange={charger} />
          : <Accueil data={data} ouvrir={id => aller({ client: String(id) })} onChange={charger} />}
      </div>
    </Container>
  )
}

function Synchro({ synchros, onChange }) {
  const now = Date.now() / 1000
  const oublier = async s => {
    if (!window.confirm(`Retirer « ${s.instance} » ? Ses ${s.nb} workflows disparaissent de l’administration. S’il renvoie un jour des statuts, il réapparaîtra.`)) return
    try { await api.admin.oublier(s.instance); onChange() } catch { /* l'erreur réapparaîtra au prochain chargement */ }
  }
  if (!synchros.length) return <p className="mt-1 text-sm font-medium text-error">n8n n’a encore rien envoyé</p>
  return (
    <ul className="mt-1 text-sm text-muted">
      {synchros.map(s => {
        const retard = now - s.recu_le > SYNC_RETARD
        return (
          <li key={s.instance} className={`flex flex-wrap items-center gap-x-2 ${retard ? 'font-medium text-error' : ''}`}>
            n8n {s.instance}{'\u00a0'}: {depuis(s.recu_le)}, {n(s.nb, 'workflow')}
            {retard && <button type="button" className={`${textLink} min-h-11 font-normal`} onClick={() => oublier(s)}>Retirer</button>}
          </li>
        )
      })}
    </ul>
  )
}

/* ——— Accueil : à traiter, clients, workflows sans client ——— */

function Accueil({ data, ouvrir, onChange }) {
  const [q, setQ] = useState('')
  const { clients } = data
  const orphelins = data.non_rattachees.filter(a => !estProspection(a))   // la prospection a son propre onglet
  const emails = data.emails || []
  const filtre = q.trim().toLowerCase()
  const liste = filtre ? clients.filter(c => `${c.entreprise} ${c.contact} ${c.email} ${c.slug}`.toLowerCase().includes(filtre)) : clients

  return (
    <div className="grid gap-12">
      <ATraiter clients={clients} orphelins={orphelins} emails={emails} ouvrir={ouvrir} onChange={onChange} />

      <section aria-labelledby="clients-titre">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="clients-titre" className="text-2xl">Clients <span className="text-muted tabular-nums">({clients.length})</span></h2>
          {clients.length > 5 && (
            <label className="w-full sm:w-72">
              <span className="sr-only">Chercher un client</span>
              <input type="search" className={input} placeholder="Chercher un client" value={q} onChange={e => setQ(e.target.value)} />
            </label>
          )}
        </div>
        {clients.length === 0 ? (
          <p className="mt-4 text-muted">Aucun client pour l’instant. À la signature d’un contrat, « Nouveau client » crée sa fiche et lui envoie son accès.</p>
        ) : liste.length === 0 ? (
          <p className="mt-4 text-muted">Aucun client ne correspond à « {q} ».</p>
        ) : (
          <ul className={`${card} mt-4 divide-y divide-rule`}>
            <li aria-hidden="true" className="hidden gap-4 px-5 py-3 text-sm text-muted md:grid md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)_minmax(0,1fr)_7rem]">
              <span>Client</span><span>Accès</span><span>Automatisations</span><span className="text-right">État</span>
            </li>
            {liste.map(c => (
              <li key={c.id}>
                <button type="button" onClick={() => ouvrir(c.id)}
                        className="grid w-full cursor-pointer gap-1 px-5 py-4 text-left hover:bg-paper-2 focus-visible:bg-paper-2 md:grid-cols-[minmax(0,2fr)_minmax(0,1.3fr)_minmax(0,1fr)_7rem] md:items-center md:gap-4">
                  <span className="min-w-0">
                    <span className="block truncate font-medium">{c.entreprise}</span>
                    <span className="block truncate text-sm text-muted">{c.contact || c.email}</span>
                  </span>
                  <span className="text-sm">
                    {COMPTES[c.compte]}{c.compte === 'actif' && c.derniere_connexion ? <span className="text-muted">, vu {depuis(c.derniere_connexion)}</span> : null}
                  </span>
                  <span className="text-sm tabular-nums">
                    {c.nb === 0 ? <span className="text-muted">Aucune</span> : <>{c.nb}{c.pause > 0 && <span className="text-muted"> · {c.pause} en pause</span>}</>}
                  </span>
                  <span className="flex flex-wrap items-center gap-2 md:justify-end">
                    {c.statut !== 'actif' ? <span className="text-sm text-muted">{STATUTS[c.statut]}</span>
                      : c.erreurs > 0 ? <Badge etat="erreur" /> : c.actives > 0 ? <Badge etat="ok" /> : c.pause > 0 ? <Badge etat="pause" /> : null}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {orphelins.length > 0 && (
        <section id="sans-client" aria-labelledby="orph-titre" className="scroll-mt-6">
          <h2 id="orph-titre" className="text-2xl">Workflows sans client <span className="text-muted tabular-nums">({orphelins.length})</span></h2>
          <p className="mt-1 max-w-[70ch] text-sm text-muted">Envoyés par n8n sans étiquette <code>client-…</code> connue. Rattachez-les à un client, ou laissez vos workflows internes ici.</p>
          <ul className={`${card} mt-4 divide-y divide-rule`}>
            {orphelins.map(a => <Rattacher key={a.id} a={a} clients={clients} onSaved={onChange} />)}
          </ul>
        </section>
      )}

      <div className="grid gap-3">
        <Emails emails={emails} />
        <AideN8n />
      </div>
    </div>
  )
}

/* ——— Prospection : les workflows de démarchage d'Axion Studio ——— */

function Prospection({ autos }) {
  const erreurs = autos.filter(a => a.etat === 'erreur').length
  return (
    <section aria-labelledby="prosp-titre">
      <h2 id="prosp-titre" className="text-2xl">Workflows de démarchage</h2>
      <p className="mt-1 max-w-[70ch] text-sm text-muted">
        Vos workflows de prospection dans n8n, avec leur état à la dernière synchronisation (toutes les 15 minutes).
        Ils apparaissent ici quand leur nom contient « prospect » ou « démarchage ». Rien n’est envoyé sans vous{'\u00a0'}: les e-mails partent en brouillon.
      </p>
      {erreurs > 0 && <div className="mt-4"><Alert>{n(erreurs, 'workflow')} de démarchage en erreur{'\u00a0'}: ouvrez-le dans n8n pour voir la cause.</Alert></div>}
      {autos.length === 0 ? (
        <p className="mt-6 text-muted">Aucun workflow de démarchage reçu de n8n pour l’instant.</p>
      ) : (
        <ul className="mt-6 grid gap-4 md:grid-cols-2">
          {autos.map(a => (
            <li key={a.id} className={`${card} flex flex-col p-5`}>
              <div className="flex items-start justify-between gap-3">
                <h3 className="min-w-0 text-lg leading-tight font-medium">{a.nom}</h3>
                <Badge etat={a.etat} />
              </div>
              <dl className="mt-4 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 text-sm">
                <dt className="text-muted">Dans n8n</dt><dd>{a.active ? 'Activé' : 'Désactivé (lancé à la main)'}</dd>
                <dt className="text-muted">Dernier passage</dt><dd>{depuis(a.derniere_execution)}</dd>
                <dt className="text-muted">7 derniers jours</dt><dd className="tabular-nums">{n(a.executions_7j, 'exécution')}, <span className={a.erreurs_7j ? 'font-medium text-error' : ''}>{n(a.erreurs_7j, 'erreur')}</span></dd>
              </dl>
              {N8N_URL[a.instance] && (
                <a href={`${N8N_URL[a.instance]}/workflow/${a.workflow_id}`} target="_blank" rel="noopener noreferrer" className={`${petit} mt-5 self-start`}>
                  Ouvrir dans n8n<span className="sr-only"> (nouvel onglet)</span>
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

/** Ce qui demande une action, avec le bouton qui la fait. Vide = rien à faire. */
function ATraiter({ clients, orphelins, emails, ouvrir, onChange }) {
  const [etat, setEtat] = useState({})
  const renvoyer = async c => {
    setEtat(s => ({ ...s, [c.id]: 'Envoi…' }))
    try {
      const r = await api.admin.renvoyer(c.id)
      setEtat(s => ({ ...s, [c.id]: r.mail_envoye ? `Envoyé à ${c.email}` : 'Échec de l’envoi, voir le journal' }))
      onChange()
    } catch (e) { setEtat(s => ({ ...s, [c.id]: messageErreur(e) })) }
  }

  const items = []
  clients.filter(c => c.erreurs > 0).forEach(c => items.push(
    <Item key={`e${c.id}`} tone="error" texte={<><b>{c.entreprise}</b>{' '}: {n(c.erreurs, 'automatisation')} en erreur</>}>
      <button type="button" className={petit} onClick={() => ouvrir(c.id)}>Voir</button>
    </Item>))
  clients.filter(c => c.compte === 'invite').forEach(c => items.push(
    <Item key={`i${c.id}`} texte={<><b>{c.entreprise}</b> n’a pas encore choisi son mot de passe</>}>
      {etat[c.id] ? <span role="status" className="text-sm text-muted">{etat[c.id]}</span>
        : <button type="button" className={petit} onClick={() => renvoyer(c)}>Renvoyer l’accès</button>}
    </Item>))
  if (orphelins.length) items.push(
    <Item key="o" texte={<>{n(orphelins.length, 'workflow')} sans client</>}>
      <a href="#sans-client" className={petit}>Rattacher</a>
    </Item>)
  const dernier = emails[0]   // le journal arrive du plus récent au plus ancien
  if (dernier && !dernier.ok) items.push(
    <Item key="m" tone="error" texte={<>Dernier e-mail en échec ({dernier.a}){dernier.erreur ? `\u00a0: ${dernier.erreur}` : ''}</>} />)

  return (
    <section aria-labelledby="todo-titre">
      <h2 id="todo-titre" className="text-2xl">À traiter</h2>
      {items.length === 0
        ? <p className="mt-3 text-muted">Rien à traiter : pas d’erreur, pas d’accès en attente, tous les workflows sont rattachés.</p>
        : <ul className={`${card} mt-4 divide-y divide-rule`}>{items}</ul>}
    </section>
  )
}

function Item({ tone, texte, children }) {
  return (
    <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3">
      <span className={`min-w-0 ${tone === 'error' ? 'text-error' : ''}`}>{texte}</span>
      {children}
    </li>
  )
}

function Rattacher({ a, clients, onSaved }) {
  const [state, setState] = useState('')
  const save = async v => {
    if (v === '') return
    setState('Rattachement…')
    try { await api.admin.automatisation({ id: a.id, client_id: Number(v) }); onSaved() } catch (e) { setState(messageErreur(e)) }
  }
  return (
    <li className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 px-5 py-3">
      <span className="min-w-0">
        <span className="block font-medium">{a.nom}</span>
        <span className="block text-sm text-muted">n8n {a.instance} · dernière exécution {depuis(a.derniere_execution)}</span>
      </span>
      <span className="flex items-center gap-3">
        {state && <span role="status" className="text-sm text-muted">{state}</span>}
        <select aria-label={`Rattacher ${a.nom} à un client`} className={`${input} min-h-11 w-auto py-2`} value="" onChange={e => save(e.target.value)} disabled={!clients.length}>
          <option value="">{clients.length ? 'Rattacher à…' : 'Aucun client'}</option>
          {clients.map(c => <option key={c.id} value={c.id}>{c.entreprise}</option>)}
        </select>
      </span>
    </li>
  )
}

/* ——— Création ——— */

function ChampsClient({ v, set, errors, nouveau }) {
  const f = (k, label, props = {}, hint) => (
    <Field id={k} label={label} error={errors[k]} hint={hint}>
      <input id={k} className={input} value={v[k] ?? ''} onChange={e => set({ ...v, [k]: e.target.value })}
             aria-invalid={errors[k] ? true : undefined} {...props} />
    </Field>
  )
  return (
    <>
      <div className="grid gap-x-5 sm:grid-cols-2">
        {f('entreprise', 'Entreprise')}
        {f('contact', 'Nom du contact', { autoComplete: 'off' })}
        {nouveau ? f('email', 'E-mail (identifiant de connexion)', { type: 'email', autoComplete: 'off' }) : (
          <Field id="email" label="E-mail (identifiant)" hint="L’identifiant ne se modifie pas.">
            <input id="email" className={`${input} text-muted`} value={v.email} readOnly />
          </Field>
        )}
        {f('telephone', 'Téléphone (facultatif)', { type: 'tel' })}
        <Field id="formule" label="Formule">
          <input id="formule" list="formules" className={input} value={v.formule ?? ''} onChange={e => set({ ...v, formule: e.target.value })} />
          <datalist id="formules">{FORMULES.map(x => <option key={x} value={x} />)}</datalist>
        </Field>
        {f('date_contrat', 'Date du contrat', { type: 'date' })}
        {!nouveau && (
          <Field id="statut" label="Statut du client">
            <select id="statut" className={input} value={v.statut} onChange={e => set({ ...v, statut: e.target.value })}>
              {Object.entries(STATUTS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            </select>
          </Field>
        )}
        <label className="mb-5 flex min-h-12 items-center gap-3 self-end text-base">
          <input type="checkbox" className="size-5" checked={!!v.suivi} onChange={e => set({ ...v, suivi: e.target.checked })} />
          Suivi mensuel souscrit
        </label>
      </div>
      <Field id="notes" label="Notes internes (jamais visibles par le client)">
        <textarea id="notes" rows={3} className={`${input} resize-y`} value={v.notes ?? ''} onChange={e => set({ ...v, notes: e.target.value })} />
      </Field>
    </>
  )
}

function NouveauClient({ onAnnuler, onCree }) {
  const [v, set] = useState({ entreprise: '', contact: '', email: '', telephone: '', formule: 'Projet', date_contrat: new Date().toISOString().slice(0, 10), suivi: false, notes: '', envoyer: true })
  const [errors, setErrors] = useState({})
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const submit = async e => {
    e.preventDefault()
    const errs = {}
    if (!v.entreprise.trim()) errs.entreprise = 'Indiquez le nom de l’entreprise.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.email)) errs.email = 'Indiquez une adresse e-mail valide, par ex. nom@exemple.fr.'
    setErrors(errs); setError('')
    if (Object.keys(errs).length) return
    setBusy(true)
    try {
      const r = await api.admin.creer(v)
      onCree(r.client.id, r.mail_envoye
        ? `${r.client.entreprise} est créé et son e-mail d’accès est parti. Posez l’étiquette ${etiquette(r.client)} sur ses workflows n8n.`
        : `${r.client.entreprise} est créé, sans e-mail envoyé. Posez l’étiquette ${etiquette(r.client)} sur ses workflows n8n.`)
    } catch (err) { setErrors(err.fields || {}); setError(messageErreur(err)) } finally { setBusy(false) }
  }

  return (
    <form noValidate onSubmit={submit} className="max-w-3xl" aria-busy={busy}>
      <h2 className="text-2xl">Nouveau client</h2>
      <p className="mt-1 mb-6 text-muted">À la signature du contrat. Le client reçoit l’adresse de son espace, son identifiant et un lien pour choisir son mot de passe (valable 7 jours).</p>
      {error && <Alert>{error}</Alert>}
      <ChampsClient v={v} set={set} errors={errors} nouveau />
      <label className="mb-6 flex min-h-12 items-center gap-3 text-base font-medium">
        <input type="checkbox" className="size-5" checked={v.envoyer} onChange={e => set({ ...v, envoyer: e.target.checked })} />
        Envoyer l’e-mail d’accès maintenant
      </label>
      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={busy} className={btn.primary}>{busy ? 'Création…' : v.envoyer ? 'Créer et envoyer l’accès' : 'Créer le client'}</button>
        <button type="button" className={btn.ghost} onClick={onAnnuler}>Annuler</button>
      </div>
    </form>
  )
}

/* ——— Fiche client ——— */

function FicheClient({ id, clients, onRetour, onChange }) {
  const [d, setD] = useState(null)
  const [msg, setMsg] = useState({ tone: 'ok', text: '' })
  const [edition, setEdition] = useState(false)

  const charger = useCallback(() => api.admin.client(id).then(setD).catch(e => setMsg({ tone: 'error', text: messageErreur(e) })), [id])
  useEffect(() => { charger() }, [charger])
  const recharger = () => { charger(); onChange() }

  if (!d) return msg.text ? <Alert>{msg.text}</Alert> : <p className="text-lg text-muted" role="status">Chargement…</p>
  const c = d.client
  const autos = d.automatisations
  const presentes = autos.filter(a => a.etat !== 'retiree')

  return (
    <div>
      <button type="button" onClick={() => onRetour()} className={`${textLink} inline-flex min-h-11 items-center`}>← Tous les clients</button>
      <div className="mt-1 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <h2 className="min-w-0 text-3xl [overflow-wrap:anywhere] md:text-4xl">{c.entreprise}</h2>
        {c.statut !== 'actif' && <span className="text-muted">{STATUTS[c.statut]}</span>}
      </div>
      <p className="mt-1 text-muted">{[c.contact, c.email, c.telephone].filter(Boolean).join(' · ')}</p>
      {msg.text && <div className="mt-5"><Alert tone={msg.tone}>{msg.text}</Alert></div>}

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <section aria-labelledby="autos-titre" className="min-w-0">
          <h3 id="autos-titre" className="text-2xl">Automatisations <span className="text-muted tabular-nums">({presentes.length})</span></h3>
          {autos.length === 0 ? (
            <div className={`${card} mt-4 p-5`}>
              <p>Aucune pour l’instant.</p>
              <p className="mt-1 text-muted">Dans n8n, ajoutez l’étiquette <code>{etiquette(c)}</code> à ses workflows : ils apparaissent ici au plus tard 15 minutes après.</p>
            </div>
          ) : (
            <ul className={`${card} mt-4 divide-y divide-rule`}>
              {autos.map(a => <LigneAutomatisation key={a.id} a={a} clients={clients} onSaved={recharger} />)}
            </ul>
          )}
        </section>

        <aside className="order-first grid gap-4 lg:order-none">
          <Acces c={c} onDone={(tone, text) => { setMsg({ tone, text }); recharger() }} />
          <section aria-labelledby="n8n-titre" className={`${card} p-5`}>
            <h3 id="n8n-titre" className="font-medium">Étiquette n8n</h3>
            <Copier texte={etiquette(c)} />
          </section>
          <section aria-labelledby="fiche-titre" className={`${card} p-5`}>
            <div className="flex items-center justify-between gap-3">
              <h3 id="fiche-titre" className="font-medium">Contrat</h3>
              {!edition && <button type="button" className={petit} onClick={() => setEdition(true)}>Modifier</button>}
            </div>
            <dl className="mt-3 grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1 text-sm">
              <dt className="text-muted">Formule</dt><dd>{c.formule || '-'}</dd>
              <dt className="text-muted">Signé le</dt><dd>{dateLongue(c.date_contrat) || '-'}</dd>
              <dt className="text-muted">Suivi</dt><dd>{c.suivi ? 'Mensuel' : 'Non'}</dd>
            </dl>
            {c.notes && <p className="mt-3 whitespace-pre-line border-t border-rule pt-3 text-sm">{c.notes}</p>}
          </section>
        </aside>
      </div>

      {edition && <Edition client={c} onFin={(text) => { setEdition(false); if (text) { setMsg({ tone: 'ok', text }); recharger() } }} />}
      <Suppression client={c} onDone={() => onRetour(`${c.entreprise} a été supprimé : fiche, compte et liens d’accès effacés.`)} />
    </div>
  )
}

function Copier({ texte }) {
  const [ok, setOk] = useState(false)
  const copier = async () => { try { await navigator.clipboard.writeText(texte); setOk(true); setTimeout(() => setOk(false), 2000) } catch { /* sélection manuelle possible */ } }
  return (
    <div className="mt-2 flex flex-wrap items-center gap-3">
      <code className="min-w-0 [overflow-wrap:anywhere]">{texte}</code>
      <button type="button" className={petit} onClick={copier}>{ok ? 'Copié' : 'Copier'}</button>
    </div>
  )
}

function Acces({ c, onDone }) {
  const [busy, setBusy] = useState('')
  const [confirmer, setConfirmer] = useState(false)
  const go = async (nom, fn, ok) => {
    setBusy(nom)
    try { const r = await fn(); onDone(r?.mail_envoye === false ? 'error' : 'ok', r?.mail_envoye === false ? 'L’e-mail n’est pas parti : voir le journal des e-mails.' : ok) }
    catch (e) { onDone('error', messageErreur(e)) }
    finally { setBusy(''); setConfirmer(false) }
  }
  const etat = c.compte === 'invite' ? 'Mot de passe pas encore choisi.'
    : c.compte === 'suspendu' ? 'Le client ne peut plus se connecter.'
    : c.compte === 'actif' ? (c.derniere_connexion ? `Dernière connexion ${depuis(c.derniere_connexion)}.` : 'Jamais connecté.') : 'Aucun compte.'
  return (
    <section aria-labelledby="acces-titre" className={`${card} p-5`}>
      <h3 id="acces-titre" className="font-medium">Accès : {COMPTES[c.compte]}</h3>
      <p className="mt-1 text-sm text-muted">{etat}</p>
      {c.compte !== 'sans-compte' && (
        <div className="mt-3 flex flex-wrap gap-2">
          {c.compte === 'suspendu' ? (
            <button type="button" disabled={!!busy} className={petit} onClick={() => go('acces', () => api.admin.acces(c.id, true), 'Accès rétabli.')}>Rétablir l’accès</button>
          ) : confirmer ? (
            <>
              <button type="button" disabled={!!busy} className={`${petit} border-error text-error hover:border-error hover:text-error`}
                      onClick={() => go('acces', () => api.admin.acces(c.id, false), 'Accès suspendu : le client est déconnecté.')}>Oui, suspendre</button>
              <button type="button" className={petit} onClick={() => setConfirmer(false)}>Annuler</button>
            </>
          ) : (
            <>
              <button type="button" disabled={!!busy} className={petit}
                      onClick={() => go('renvoyer', () => api.admin.renvoyer(c.id), `Nouvel e-mail d’accès envoyé à ${c.email}. Le lien précédent ne fonctionne plus.`)}>
                {busy === 'renvoyer' ? 'Envoi…' : 'Renvoyer l’accès'}
              </button>
              <button type="button" className={petit} onClick={() => setConfirmer(true)}>Suspendre</button>
            </>
          )}
        </div>
      )}
    </section>
  )
}

function Edition({ client, onFin }) {
  const [v, set] = useState(client)
  const [errors, setErrors] = useState({})
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const submit = async e => {
    e.preventDefault(); setBusy(true); setError('')
    try { await api.admin.modifier(v); onFin('Fiche enregistrée.') }
    catch (err) { setErrors(err.fields || {}); setError(messageErreur(err)) } finally { setBusy(false) }
  }
  return (
    <form noValidate onSubmit={submit} className={`${card} mt-10 max-w-3xl p-6`} aria-labelledby="edit-titre">
      <h3 id="edit-titre" className="mb-5 text-2xl">Modifier la fiche</h3>
      {error && <Alert>{error}</Alert>}
      <ChampsClient v={v} set={set} errors={errors} />
      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={busy} className={btn.primary}>{busy ? 'Enregistrement…' : 'Enregistrer'}</button>
        <button type="button" className={btn.ghost} onClick={() => onFin('')}>Annuler</button>
      </div>
    </form>
  )
}

function Suppression({ client, onDone }) {
  const [saisie, setSaisie] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const go = async e => {
    e.preventDefault()
    if (saisie.trim() !== client.entreprise) { setError('Recopiez exactement le nom de l’entreprise.'); return }
    setBusy(true)
    try { await api.admin.supprimer(client.id, saisie.trim()); onDone() } catch (err) { setError(err.fields?.confirmation || messageErreur(err)) } finally { setBusy(false) }
  }
  return (
    <details className="mt-12 max-w-3xl border-t border-rule pt-4">
      <summary className="inline-flex min-h-11 cursor-pointer items-center text-sm text-muted hover:text-error">Supprimer ce client…</summary>
      <p className="mt-2 max-w-[62ch] text-sm text-muted">Efface définitivement la fiche, le compte et les liens d’accès. Les workflows n8n ne sont pas touchés : ils repassent dans « Workflows sans client ». Impossible à annuler.</p>
      <form noValidate onSubmit={go} className="mt-4 max-w-md">
        <Field id="confirmation" label={`Pour confirmer, recopiez « ${client.entreprise} »`} error={error}>
          <input id="confirmation" className={input} value={saisie} autoComplete="off" onChange={e => { setSaisie(e.target.value); setError('') }} aria-invalid={error ? true : undefined} />
        </Field>
        <button type="submit" disabled={busy} className={`${btn.primary} bg-error hover:bg-ink`}>{busy ? 'Suppression…' : `Supprimer ${client.entreprise}`}</button>
      </form>
    </details>
  )
}

function LigneAutomatisation({ a, clients, onSaved }) {
  const [desc, setDesc] = useState(a.description)
  const [state, setState] = useState('')
  const save = async patch => {
    setState('Enregistrement…')
    try { await api.admin.automatisation({ id: a.id, ...patch }); setState('Enregistré'); onSaved?.() }
    catch (e) { setState(messageErreur(e)) }
  }
  return (
    <li className={`p-5 ${a.etat === 'retiree' ? 'opacity-70' : ''}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium">{a.nom}</p>
          <p className="text-sm text-muted">Dernière exécution {depuis(a.derniere_execution)} · 7 jours{' '}: {n(a.executions_7j, 'exécution')}, {n(a.erreurs_7j, 'erreur')}</p>
        </div>
        <Badge etat={a.etat} />
      </div>
      <form className="mt-3 flex flex-wrap items-end gap-3" onSubmit={e => { e.preventDefault(); if (desc !== a.description) save({ description: desc }) }}>
        <label className="min-w-0 flex-1 basis-64">
          <span className="mb-1 block text-sm text-muted">Ce que le client lit</span>
          <input className={input} value={desc} maxLength={500} placeholder="Une phrase simple : ce qu’elle fait pour lui" onChange={e => setDesc(e.target.value)} />
        </label>
        {desc !== a.description && <button type="submit" className={`${petit} min-h-12`}>Enregistrer</button>}
      </form>
      <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
        <label className="flex min-h-11 items-center gap-2">
          <input type="checkbox" className="size-5" checked={a.visible} onChange={e => save({ visible: e.target.checked })} />
          Visible par le client
        </label>
        <label className="flex min-h-11 items-center gap-2">
          <span className="text-muted">Client</span>
          <select className={`${input} min-h-11 w-auto py-1 text-sm`} value={a.client_id ?? ''} onChange={e => save({ client_id: e.target.value === '' ? null : Number(e.target.value) })}>
            <option value="">Aucun (détacher)</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.entreprise}</option>)}
          </select>
        </label>
        <span className="text-muted">n8n {a.instance} · #{a.workflow_id}</span>
        {state && <span role="status" className="text-muted">{state}</span>}
      </div>
    </li>
  )
}

/* ——— Repliés en bas de l'accueil ——— */

function Emails({ emails }) {
  if (!emails.length) return null
  return (
    <details className={`${card} p-5`}>
      <summary className="cursor-pointer font-medium">Derniers e-mails envoyés</summary>
      <p className="mt-2 text-sm text-muted">« Envoyé » : le serveur a accepté l’e-mail. S’il n’arrive pas, regardez les indésirables du destinataire.</p>
      <ul className="mt-3 divide-y divide-rule">
        {emails.map((m, i) => (
          <li key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-2 text-sm">
            <span className="min-w-0"><span className="font-medium">{m.a}</span> <span className="text-muted">· {m.objet}</span></span>
            <span className={m.ok ? 'text-ok' : 'text-error'}>{m.ok ? 'Envoyé' : `Échec${m.erreur ? ` : ${m.erreur}` : ''}`} · {depuis(Date.parse(m.date) / 1000)}</span>
          </li>
        ))}
      </ul>
    </details>
  )
}

function AideN8n() {
  return (
    <details className={`${card} p-5`}>
      <summary className="cursor-pointer font-medium">Relier n8n</summary>
      <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted">
        <li>Dans n8n, ajoutez à chaque workflow d’un client l’étiquette <code>client-</code> suivie de son identifiant (à copier sur sa fiche).</li>
        <li>Le workflow « Axion – Suivi des automatisations clients » envoie ici l’état des workflows étiquetés toutes les 15 minutes.</li>
        <li>Le détail (jeton, accès à l’API n8n) est dans <code>automatisations/n8n/README.md</code>. Voir aussi <Link to="/espace-client/" className={textLink}>la vue client</Link>.</li>
      </ol>
    </details>
  )
}
