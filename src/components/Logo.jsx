/** Logo Axion Studio : réseau de nœuds bleus + chevron. Le chevron suit la couleur du texte (currentColor). */
export function LogoMark({ className = '' }) {
  return (
    <svg viewBox="0 0 210 175" className={className} aria-hidden="true" focusable="false">
      <g stroke="var(--c-logo)" strokeWidth="9" strokeLinecap="round">
        <line x1="66" y1="25" x2="23" y2="81" />
        <line x1="23" y1="81" x2="128" y2="81" />
        <line x1="128" y1="81" x2="68" y2="150" />
      </g>
      <g fill="var(--c-logo)">
        <circle cx="66" cy="25" r="18" />
        <circle cx="23" cy="81" r="18" />
        <circle cx="128" cy="81" r="18" />
        <circle cx="68" cy="150" r="18" />
      </g>
      <path d="M95 22H148L190 86L148 152H95" fill="none" stroke="currentColor" strokeWidth="18" strokeLinejoin="round" />
    </svg>
  )
}
