import { useEffect, useRef, useState } from 'react'
import { loadPrefs, savePrefs, applyPrefs, defaults } from '../prefs'

const iconBtn = 'inline-grid size-11 place-items-center rounded-md border border-rule text-ink hover:border-pen hover:text-pen'

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
    </svg>
  )
}
function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
      <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" />
    </svg>
  )
}
function A11yIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-6" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <circle cx="12" cy="4.5" r="1.8" fill="currentColor" stroke="none" />
      <path d="M5 8.5c2.3.7 4.6 1 7 1s4.7-.3 7-1M12 9.5v4.5M12 14l-3 6.5M12 14l3 6.5" />
    </svg>
  )
}

/** Interrupteur (rôle switch) d'une option d'accessibilité. */
function Switch({ id, label, hint, checked, onChange }) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-rule py-3">
      <div>
        <p id={`${id}-l`} className="font-medium">{label}</p>
        <p id={`${id}-h`} className="text-sm text-muted">{hint}</p>
      </div>
      <button
        type="button" id={id} role="switch" aria-checked={checked} aria-labelledby={`${id}-l`} aria-describedby={`${id}-h`}
        onClick={() => onChange(!checked)}
        className={`relative mt-0.5 inline-flex h-7 w-12 shrink-0 items-center rounded-full border-2 transition-colors duration-150 ${checked ? 'border-pen bg-pen' : 'border-muted bg-paper'}`}
      >
        <span className={`inline-block size-5 rounded-full transition-transform duration-150 ${checked ? 'translate-x-5 bg-paper' : 'translate-x-0.5 bg-muted'}`} />
      </button>
    </div>
  )
}

export default function DisplayTools() {
  // Réglages lus après l'affichage (compatible pré-rendu) ; le script de index.html les a déjà appliqués.
  const [prefs, setPrefs] = useState(defaults)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => { setPrefs(loadPrefs()); setLoaded(true) }, [])
  const [open, setOpen] = useState(false)
  const panelRef = useRef(null)
  const btnRef = useRef(null)

  const update = patch => setPrefs(p => { const next = { ...p, ...patch }; savePrefs(next); return next })
  useEffect(() => { if (loaded) applyPrefs(prefs) }, [prefs, loaded])

  // Panneau : Échap et clic à l'extérieur le ferment ; le focus revient sur le bouton.
  useEffect(() => {
    if (!open) return
    panelRef.current?.querySelector('button')?.focus()
    const onKey = e => { if (e.key === 'Escape') { setOpen(false); btnRef.current?.focus() } }
    const onClick = e => { if (!panelRef.current?.contains(e.target) && !btnRef.current?.contains(e.target)) setOpen(false) }
    window.addEventListener('keydown', onKey); document.addEventListener('mousedown', onClick)
    return () => { window.removeEventListener('keydown', onKey); document.removeEventListener('mousedown', onClick) }
  }, [open])

  const current = prefs.theme === 'dark' ? 'dark' : 'light'
  const toggleTheme = () => update({ theme: current === 'dark' ? 'light' : 'dark' })
  const sizes = [['normal', 'Normal'], ['lg', 'Grand'], ['xl', 'Très grand']]
  const changed = Object.keys(defaults).some(k => k !== 'theme' && prefs[k] !== defaults[k])

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={toggleTheme} className={iconBtn}
        aria-label={current === 'dark' ? 'Passer en mode clair' : 'Passer en mode sombre'}
        title={current === 'dark' ? 'Mode clair' : 'Mode sombre'}>
        {current === 'dark' ? <SunIcon /> : <MoonIcon />}
      </button>

      <div className="relative">
        <button ref={btnRef} type="button" onClick={() => setOpen(o => !o)} className={`${iconBtn} ${changed ? 'border-pen text-pen' : ''}`}
          aria-expanded={open} aria-controls="a11y-panel" aria-label="Accessibilité : taille du texte, contraste, police, animations" title="Accessibilité">
          <A11yIcon />
        </button>

        {open && (
          <div ref={panelRef} id="a11y-panel" role="dialog" aria-modal="false" aria-labelledby="a11y-title"
            className="drop fixed inset-x-2 top-[4.25rem] z-[70] max-h-[calc(100dvh-5rem)] overflow-y-auto rounded-xl border border-rule bg-paper p-5 shadow-[0_12px_40px_rgba(20,33,61,0.18)] sm:absolute sm:inset-x-auto sm:top-[calc(100%+0.5rem)] sm:right-0 sm:w-[360px]">
            <h2 id="a11y-title" className="text-lg">Accessibilité</h2>
            <p className="mt-1 text-sm text-muted">Vos réglages sont gardés pour vos prochaines visites.</p>

            <fieldset className="mt-4">
              <legend className="font-medium">Taille du texte</legend>
              <div className="mt-2 grid grid-cols-3 gap-2">
                {sizes.map(([v, l], i) => (
                  <button key={v} type="button" aria-pressed={prefs.text === v} onClick={() => update({ text: v })}
                    className={`min-h-11 rounded-md border px-2 ${prefs.text === v ? 'border-pen bg-pen text-on-pen' : 'border-rule hover:border-pen'}`}
                    style={{ fontSize: `${[0.9, 1, 1.15][i]}rem` }}>
                    {l}
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mt-4">
              <Switch id="a11y-theme" label="Mode sombre" hint="Fond foncé, plus reposant le soir." checked={current === 'dark'} onChange={v => update({ theme: v ? 'dark' : 'light' })} />
              <Switch id="a11y-contrast" label="Contraste renforcé" hint="Textes plus foncés, quadrillage retiré." checked={prefs.contrast} onChange={v => update({ contrast: v })} />
              <Switch id="a11y-font" label="Police plus lisible" hint="Atkinson Hyperlegible, conçue pour les personnes malvoyantes." checked={prefs.font} onChange={v => update({ font: v })} />
              <Switch id="a11y-spacing" label="Espacer le texte" hint="Lignes, lettres et mots plus espacés." checked={prefs.spacing} onChange={v => update({ spacing: v })} />
              <Switch id="a11y-links" label="Souligner les liens" hint="Repérer les liens sans se fier à la couleur." checked={prefs.links} onChange={v => update({ links: v })} />
              <Switch id="a11y-motion" label="Arrêter les animations" hint="Aucun mouvement ni défilement animé." checked={prefs.motion} onChange={v => update({ motion: v })} />
            </div>

            <div className="mt-2 flex items-center justify-between border-t border-rule pt-3">
              <button type="button" onClick={() => update({ ...defaults, theme: prefs.theme })} disabled={!changed}
                className="inline-flex min-h-11 items-center text-pen hover:underline disabled:text-muted disabled:no-underline">
                Réinitialiser
              </button>
              <button type="button" onClick={() => { setOpen(false); btnRef.current?.focus() }} className="inline-flex min-h-11 items-center rounded-md bg-pen px-4 font-medium text-on-pen">
                Fermer
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
