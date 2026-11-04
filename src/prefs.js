// Préférences d'affichage du visiteur (thème et accessibilité), gardées dans son navigateur.
// Elles sont appliquées sous forme d'attributs sur <html> (voir index.css), dès le chargement
// grâce au petit script placé dans index.html, pour éviter tout « flash » de mauvais thème.

export const PREFS_KEY = 'axion-prefs'

export const defaults = {
  theme: 'light',     // 'light' (par défaut) | 'dark'
  text: 'normal',     // 'normal' | 'lg' | 'xl'
  contrast: false,    // contraste renforcé
  font: false,        // police plus lisible (Atkinson Hyperlegible)
  spacing: false,     // espacement du texte augmenté
  links: false,       // liens toujours soulignés
  motion: false,      // animations désactivées
}

export function loadPrefs() {
  try { return { ...defaults, ...JSON.parse(localStorage.getItem(PREFS_KEY) || '{}') } } catch { return { ...defaults } }
}

export function savePrefs(p) {
  try { localStorage.setItem(PREFS_KEY, JSON.stringify(p)) } catch { /* stockage indisponible : réglage valable pour cette page */ }
}

export function applyPrefs(p) {
  const r = document.documentElement
  r.dataset.theme = p.theme === 'dark' ? 'dark' : 'light'
  r.dataset.text = p.text
  const flag = (name, on) => (on ? r.setAttribute(`data-${name}`, 'on') : r.removeAttribute(`data-${name}`))
  flag('contrast', p.contrast); flag('font', p.font); flag('spacing', p.spacing); flag('links', p.links); flag('motion', p.motion)
}

/** Vrai si le visiteur a demandé moins d'animations (réglage de l'appareil ou bouton d'accessibilité). */
export const reducedMotion = () =>
  document.documentElement.hasAttribute('data-motion') || window.matchMedia('(prefers-reduced-motion: reduce)').matches
