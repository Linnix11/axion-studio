import { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { Container, btn, eyebrow, textLink } from '../components/ui'
import { offers } from '../data'
import { api, messageErreur } from '../espace/api'
import { Alert, Badge, Field, card, depuis, input, n, usePrivateTitle } from '../espace/ui'

const COMPTES = {
  invite: { label: 'Invité', aide: 'E-mail envoyé, mot de passe pas encore choisi' },
  actif: { label: 'Compte actif', aide: '' },
  suspendu: { label: 'Accès suspendu', aide: '' },
  'sans-compte': { label: 'Sans compte', aide: '' },
}
const STATUTS = { actif: 'En cours', pause: 'En pause', termine: 'Terminé' }
const FORMULES = offers.filter(o => o.name !== 'Audit').map(o => o.name).concat('Projet + suivi mensuel')
const SYNC_RETARD = 3600   // au-delà d'une heure sans nouvelles de n8n, on le signale

/** /espace-client/admin/ : suivi des clients, création des accès, rattachement des workflows n8n. */
export default function EspaceAdmin() {
  usePrivateTitle('Administration')
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [vue, setVue] = useState({ type: 'liste' })   // liste | nouveau | client (id)
  const [flash, setFlash] = useState('')

  const charger = useCallback(() => api.admin.tableau().then(d => { setData(d); setError('') }).catch(e => {
    if (e.code === 'auth' || e.code === 'forbidden') navigate('/espace-client/', { replace: true })
    else setError(messageErreur(e))
  }), [navigate])
  useEffect(() => { charger() }, [charger])

  const logout = async () => { try { await api.deconnexion() } finally { navigate('/espace-client/', { replace: true }) } }
  const retour = msg => { setFlash(msg || ''); setVue({ type: 'liste' }); charger(); window.scrollTo(0, 0) }

  if (!data) {
    return <Container className="py-20">{error ? <Alert>{error}</Alert> : <p className="text-lg text-muted" role="status">Chargement…</p>}</Container>
  }

  const totalAutos = data.clients.reduce((s, c) => s + c.nb, 0)
  const totalErreurs = data.clients.reduce((s, c) => s + c.erreurs, 0)
  const now = Date.now() / 1000

  return (
    <>
      <section className="border-b border-rule">
        <Container className="pt-14 pb-10 md:pt-16">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className={eyebrow}>Administration</p>
              <h1 className="mt-3 text-[2.5rem] leading-[1.05] tracking-[-0.03em] sm:text-6xl">Clients et automatisations</h1>
            </div>
            <div className="flex flex-wrap gap-3">
              {vue.type === 'liste' && <button type="button" className={btn.primary} onClick={() => { setFlash(''); setVue({ type: 'nouveau' }) }}>Nouveau client</button>}
              <button type="button" className={btn.ghost} onClick={logout}>Se déconnecter</button>
            </div>
          </div>
          <dl className="mt-8 grid gap-4 sm:grid-cols-4">
            <Stat label="Clients" value={data.clients.length} />
            <Stat label="Automatisations" value={totalAutos} />
            <Stat label="En erreur" value={totalErreurs} alert={totalErreurs > 0} />
            <div className={`${card} p-5`}>
              <dt className="text-sm text-muted">Synchro n8n</dt>
              {data.synchros.length === 0
                ? <dd className="mt-1 text-lg font-medium text-error">Jamais reçue</dd>
                : data.synchros.map(s => (
                  <dd key={s.instance} className={`mt-1 text-base ${now - s.recu_le > SYNC_RETARD ? 'font-medium text-error' : ''}`}>
                    {s.instance}{' '}: {depuis(s.recu_le)} ({n(s.nb, 'workflow')})
                  </dd>
                ))}
            </div>
          </dl>
        </Container>
      </section>

      <Container className="py-12 md:py-16">
        {flash && <Alert tone="ok">{flash}</Alert>}
        {error && <Alert>{error}</Alert>}
        {vue.type === 'nouveau' && <NouveauClient onAnnuler={() => setVue({ type: 'liste' })} onCree={retour} />}
        {vue.type === 'client' && <FicheClient id={vue.id} clients={data.clients} onRetour={retour} />}
        {vue.type === 'liste' && (
          <>
            <h2 className="text-[2rem] leading-tight">Clients</h2>
            {data.clients.length === 0 ? (
              <div className={`${card} mt-6 p-6`}>
                <p className="text-lg">Aucun client pour l’instant.</p>
                <p className="mt-2 text-muted">Quand un contrat est signé, créez le client : il reçoit par e-mail le lien de son espace et son identifiant.</p>
                <button type="button" className={`${btn.primary} mt-5`} onClick={() => setVue({ type: 'nouveau' })}>Créer le premier client</button>
              </div>
            ) : (
              <ul className="mt-6 grid gap-4">
                {data.clients.map(c => (
                  <li key={c.id}>
                    <button type="button" onClick={() => { setFlash(''); setVue({ type: 'client', id: c.id }) }}
                            className={`${card} lift grid w-full cursor-pointer gap-3 p-5 text-left hover:border-pen md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)_minmax(0,1.4fr)_minmax(0,1fr)] md:items-center`}>
                      <span>
                        <span className="block text-xl font-medium">{c.entreprise}</span>
                        <span className="block text-sm text-muted">{c.contact || c.email} · étiquette n8n <code>client-{c.slug}</code></span>
                      </span>
                      <span className="text-sm">
                        <span className="block font-medium">{COMPTES[c.compte]?.label}</span>
                        <span className="block text-muted">{c.compte === 'invite' ? 'Mot de passe pas encore choisi' : c.derniere_connexion ? `Vu ${depuis(c.derniere_connexion)}` : ''}</span>
                      </span>
                      <span className="text-sm">
                        <span className="block font-medium">{n(c.nb, 'automatisation')}</span>
                        <span className="block text-muted">{c.actives} active{c.actives > 1 ? 's' : ''} · {c.pause} en pause</span>
                      </span>
                      <span className="flex flex-wrap items-center gap-2 md:justify-end">
                        {c.erreurs > 0 ? <Badge etat="erreur" /> : c.nb > 0 ? <Badge etat="ok" /> : null}
                        {c.statut !== 'actif' && <span className="text-sm text-muted">{STATUTS[c.statut]}</span>}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <NonRattachees autos={data.non_rattachees} clients={data.clients} onChange={charger} />
            <Emails emails={data.emails || []} />
            <AideN8n />
          </>
        )}
      </Container>
    </>
  )
}

function Stat({ label, value, alert }) {
  return (
    <div className={`${card} p-5`}>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className={`mt-1 font-display text-4xl font-extrabold tabular-nums [font-stretch:85%] ${alert ? 'text-error' : ''}`}>{value}</dd>
    </div>
  )
}

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
      </div>
      <div className="grid gap-x-5 sm:grid-cols-2">
        {nouveau ? f('email', 'E-mail (identifiant de connexion)', { type: 'email', autoComplete: 'off' }) : (
          <Field id="email" label="E-mail (identifiant)" hint="L’identifiant ne se modifie pas ici.">
            <input id="email" className={`${input} text-muted`} value={v.email} readOnly />
          </Field>
        )}
        {f('telephone', 'Téléphone (facultatif)', { type: 'tel' })}
      </div>
      <div className="grid gap-x-5 sm:grid-cols-2">
        <Field id="formule" label="Formule">
          <input id="formule" list="formules" className={input} value={v.formule ?? ''} onChange={e => set({ ...v, formule: e.target.value })} />
          <datalist id="formules">{FORMULES.map(x => <option key={x} value={x} />)}</datalist>
        </Field>
        {f('date_contrat', 'Date du contrat', { type: 'date' })}
      </div>
      <div className="grid gap-x-5 sm:grid-cols-2">
        <label className="mb-5 flex min-h-12 items-center gap-3 text-base">
          <input type="checkbox" className="size-5" checked={!!v.suivi} onChange={e => set({ ...v, suivi: e.target.checked })} />
          Suivi mensuel souscrit
        </label>
        {!nouveau && (
          <Field id="statut" label="Statut du client">
            <select id="statut" className={input} value={v.statut} onChange={e => set({ ...v, statut: e.target.value })}>
              {Object.entries(STATUTS).map(([k, l]) => <option key={k} value={k}>{l}</option>)}
            </select>
          </Field>
        )}
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
      onCree(r.mail_envoye
        ? `${r.client.entreprise} est créé. L’e-mail d’accès est parti à ${v.email}. Étiquette n8n à poser sur ses workflows : client-${r.client.slug}`
        : `${r.client.entreprise} est créé, sans e-mail envoyé. Étiquette n8n : client-${r.client.slug}`)
    } catch (err) { setErrors(err.fields || {}); setError(messageErreur(err)) } finally { setBusy(false) }
  }

  return (
    <form noValidate onSubmit={submit} className={`${card} max-w-3xl p-6 sm:p-8`} aria-busy={busy}>
      <h2 className="mb-2 text-[2rem] leading-tight">Nouveau client</h2>
      <p className="mb-6 text-muted">À faire quand le contrat est signé. Le client reçoit un e-mail avec l’adresse de son espace, son identifiant et un lien pour choisir son mot de passe (valable 7 jours).</p>
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

function FicheClient({ id, clients, onRetour }) {
  const [d, setD] = useState(null)
  const [v, set] = useState(null)
  const [errors, setErrors] = useState({})
  const [msg, setMsg] = useState({ tone: 'ok', text: '' })
  const [busy, setBusy] = useState('')
  const [confirmer, setConfirmer] = useState(false)

  const charger = useCallback(() => api.admin.client(id).then(r => { setD(r); set(r.client) }).catch(e => setMsg({ tone: 'error', text: messageErreur(e) })), [id])
  useEffect(() => { charger() }, [charger])

  if (!d || !v) return msg.text ? <Alert>{msg.text}</Alert> : <p className="text-lg text-muted" role="status">Chargement…</p>
  const c = d.client

  const action = async (nom, fn, ok) => {
    setBusy(nom); setMsg({ tone: 'ok', text: '' })
    try { await fn(); setMsg({ tone: 'ok', text: ok }); await charger() }
    catch (e) { setErrors(e.fields || {}); setMsg({ tone: 'error', text: messageErreur(e) }) }
    finally { setBusy(''); setConfirmer(false) }
  }

  return (
    <div className="grid gap-10">
      <div>
        <button type="button" onClick={() => onRetour()} className="inline-flex min-h-11 items-center text-pen underline-offset-4 hover:underline">← Tous les clients</button>
        <h2 className="mt-2 text-[2rem] leading-tight md:text-5xl">{c.entreprise}</h2>
        <p className="mt-2 text-muted">{COMPTES[c.compte]?.label}{c.derniere_connexion ? `, dernière connexion ${depuis(c.derniere_connexion)}` : ''} · étiquette n8n <code>client-{c.slug}</code></p>
      </div>
      {msg.text && <Alert tone={msg.tone}>{msg.text}</Alert>}

      <section aria-labelledby="acces-titre" className={`${card} p-6`}>
        <h3 id="acces-titre" className="text-2xl">Accès à l’espace client</h3>
        <p className="mt-2 text-muted">{c.compte === 'invite' ? 'Le client n’a pas encore choisi son mot de passe.' : c.compte === 'suspendu' ? 'Le client ne peut plus se connecter.' : 'Le client peut se connecter.'}</p>
        <div className="mt-4 flex flex-wrap gap-3">
          {c.compte !== 'suspendu' && (
            <button type="button" disabled={!!busy} className={btn.ghost}
                    onClick={() => action('renvoyer', () => api.admin.renvoyer(c.id), `Nouvel e-mail d’accès envoyé à ${c.email}. Le lien précédent ne fonctionne plus.`)}>
              {busy === 'renvoyer' ? 'Envoi…' : 'Renvoyer l’e-mail d’accès'}
            </button>
          )}
          {c.compte === 'suspendu' ? (
            <button type="button" disabled={!!busy} className={btn.ghost} onClick={() => action('acces', () => api.admin.acces(c.id, true), 'Accès rétabli.')}>Rétablir l’accès</button>
          ) : confirmer ? (
            <span className="flex flex-wrap items-center gap-3">
              <span className="font-medium">Suspendre l’accès de {c.entreprise}{' '}?</span>
              <button type="button" disabled={!!busy} className={`${btn.primary} bg-error hover:bg-ink`} onClick={() => action('acces', () => api.admin.acces(c.id, false), 'Accès suspendu : le client est déconnecté.')}>Suspendre l’accès</button>
              <button type="button" className={btn.ghost} onClick={() => setConfirmer(false)}>Garder l’accès</button>
            </span>
          ) : (
            <button type="button" className={btn.ghost} onClick={() => setConfirmer(true)}>Suspendre l’accès…</button>
          )}
        </div>
      </section>

      <section aria-labelledby="autos-titre">
        <h3 id="autos-titre" className="text-2xl">Automatisations ({d.automatisations.filter(a => a.etat !== 'retiree').length})</h3>
        {d.automatisations.length === 0 ? (
          <p className="mt-3 text-muted">Aucune pour l’instant. Dans n8n, ajoutez l’étiquette <code>client-{c.slug}</code> aux workflows de ce client : ils apparaîtront ici à la prochaine synchronisation.</p>
        ) : (
          <ul className="mt-4 grid gap-4">
            {d.automatisations.map(a => <LigneAutomatisation key={a.id} a={a} clients={clients} onSaved={charger} />)}
          </ul>
        )}
      </section>

      <form noValidate className={`${card} p-6 sm:p-8`} onSubmit={e => { e.preventDefault(); action('modifier', () => api.admin.modifier(v), 'Fiche enregistrée.') }}>
        <h3 className="mb-6 text-2xl">Fiche client</h3>
        <ChampsClient v={v} set={set} errors={errors} />
        <button type="submit" disabled={!!busy} className={btn.primary}>{busy === 'modifier' ? 'Enregistrement…' : 'Enregistrer la fiche'}</button>
      </form>

      <Suppression client={c} onDone={() => onRetour(`${c.entreprise} a été supprimé : fiche, compte et liens d’accès effacés.`)} />
    </div>
  )
}

function Suppression({ client, onDone }) {
  const [ouvert, setOuvert] = useState(false)
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
    <section className="rounded-xl border-2 border-error bg-paper p-6" aria-labelledby="suppr-titre">
      <h3 id="suppr-titre" className="text-2xl">Supprimer ce client</h3>
      <p className="mt-2 max-w-[62ch] text-muted">Efface définitivement la fiche, le compte et les liens d’accès (par exemple à la fin du contrat ou sur demande du client). Les workflows n8n ne sont pas touchés : ils passent dans « Workflows sans client ». Impossible à annuler.</p>
      {!ouvert ? (
        <button type="button" className={`${btn.ghost} mt-4`} onClick={() => setOuvert(true)}>Supprimer ce client…</button>
      ) : (
        <form noValidate onSubmit={go} className="mt-4 max-w-md">
          <Field id="confirmation" label={`Pour confirmer, recopiez « ${client.entreprise} »`} error={error}>
            <input id="confirmation" className={input} value={saisie} autoComplete="off" onChange={e => { setSaisie(e.target.value); setError('') }} aria-invalid={error ? true : undefined} />
          </Field>
          <div className="flex flex-wrap gap-3">
            <button type="submit" disabled={busy} className={`${btn.primary} bg-error hover:bg-ink`}>{busy ? 'Suppression…' : `Supprimer ${client.entreprise}`}</button>
            <button type="button" className={btn.ghost} onClick={() => { setOuvert(false); setSaisie(''); setError('') }}>Garder le client</button>
          </div>
        </form>
      )}
    </section>
  )
}

function LigneAutomatisation({ a, clients, onSaved }) {
  const [desc, setDesc] = useState(a.description)
  const [state, setState] = useState('')
  const save = async patch => {
    setState('…')
    try { await api.admin.automatisation({ id: a.id, ...patch }); setState('Enregistré'); onSaved?.() }
    catch (e) { setState(messageErreur(e)) }
  }
  return (
    <li className={`${card} p-5 ${a.etat === 'retiree' ? 'opacity-70' : ''}`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-lg font-medium">{a.nom}</p>
          <p className="text-sm text-muted">n8n {a.instance} · workflow {a.workflow_id} · dernière exécution {depuis(a.derniere_execution)} · {n(a.executions_7j, 'exécution')} et {n(a.erreurs_7j, 'erreur')} sur 7 jours</p>
        </div>
        <Badge etat={a.etat} />
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <Field id={`desc-${a.id}`} label="Description pour le client" hint="Une phrase simple : ce que fait l’automatisation pour lui.">
          <input id={`desc-${a.id}`} className={input} value={desc} maxLength={500} onChange={e => setDesc(e.target.value)} />
        </Field>
        <button type="button" className={`${btn.ghost} mb-5`} disabled={desc === a.description} onClick={() => save({ description: desc })}>Enregistrer</button>
      </div>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <label className="flex min-h-11 items-center gap-3">
          <input type="checkbox" className="size-5" checked={a.visible} onChange={e => save({ visible: e.target.checked })} />
          Visible par le client
        </label>
        <label className="flex min-h-11 items-center gap-3">
          Client{' '}:
          <select className={`${input} min-h-11 w-auto py-2`} value={a.client_id ?? ''} onChange={e => save({ client_id: e.target.value === '' ? null : Number(e.target.value) })}>
            <option value="">Non rattachée</option>
            {clients.map(c => <option key={c.id} value={c.id}>{c.entreprise}</option>)}
          </select>
        </label>
        {state && <span role="status" className="text-sm text-muted">{state}</span>}
      </div>
    </li>
  )
}

function NonRattachees({ autos, clients, onChange }) {
  if (!autos.length) return null
  return (
    <section className="mt-14" aria-labelledby="orph-titre">
      <h2 id="orph-titre" className="text-[2rem] leading-tight">Workflows sans client ({autos.length})</h2>
      <p className="mt-2 max-w-[62ch] text-muted">Workflows envoyés par n8n sans étiquette <code>client-…</code> connue (vos workflows internes, par exemple). Rattachez-les ici, ou ajoutez l’étiquette dans n8n.</p>
      <ul className="mt-6 grid gap-4">{autos.map(a => <LigneAutomatisation key={a.id} a={a} clients={clients} onSaved={onChange} />)}</ul>
    </section>
  )
}

function Emails({ emails }) {
  if (!emails.length) return null
  return (
    <section className="mt-14" aria-labelledby="mails-titre">
      <h2 id="mails-titre" className="text-[2rem] leading-tight">Derniers e-mails envoyés</h2>
      <p className="mt-2 max-w-[62ch] text-muted">« Envoyé » signifie que le serveur a accepté l’e-mail. S’il n’arrive pas, regardez les indésirables du destinataire.</p>
      <ul className={`${card} mt-6 divide-y divide-rule`}>
        {emails.map((m, i) => (
          <li key={i} className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 p-4">
            <span><span className="font-medium">{m.a}</span> <span className="text-muted">· {m.objet}</span></span>
            <span className={`text-sm ${m.ok ? 'text-ok' : 'text-error'}`}>{m.ok ? 'Envoyé' : `Échec${m.erreur ? `\u00a0: ${m.erreur}` : ''}`} · {depuis(Date.parse(m.date) / 1000)}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function AideN8n() {
  return (
    <section className={`${card} mt-14 p-6`} aria-labelledby="aide-titre">
      <h2 id="aide-titre" className="text-2xl">Relier n8n</h2>
      <ol className="mt-4 list-decimal space-y-2 pl-5 text-muted">
        <li>Dans n8n, ajoutez à chaque workflow d’un client l’étiquette <code>client-</code> suivie de son identifiant (affiché sur sa fiche).</li>
        <li>Importez le workflow « Axion – Suivi des automatisations clients » : toutes les 15 minutes, il envoie ici l’état des workflows étiquetés.</li>
        <li>Le détail (jeton, accès à l’API n8n) est dans <code>automatisations/n8n/README.md</code>. Voir aussi <Link to="/espace-client/" className={textLink}>la vue client</Link>.</li>
      </ol>
    </section>
  )
}
