/** Coche en SVG (remplace le caractère « ✓ », dont le rendu varie selon les appareils). Décorative : aria-hidden. */
export function CheckIcon({ className = 'size-3.5' }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 8.5l3 3 6-7" />
    </svg>
  )
}
