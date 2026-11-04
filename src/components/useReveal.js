import { reducedMotion } from '../prefs'
import { useEffect, useRef } from 'react'

/**
 * Animation à l’apparition au défilement.
 * Seuls les éléments situés sous la ligne de flottaison au chargement sont masqués puis révélés :
 * tout ce qui est visible au chargement reste affiché immédiatement.
 * Rien n’est masqué si le visiteur a demandé de réduire les animations.
 */
export function useReveal() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = reducedMotion()
    if (reduce || !('IntersectionObserver' in window)) return
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return
    el.dataset.anim = 'pending'
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { el.dataset.anim = 'in'; io.disconnect() }
    }, { rootMargin: '0px 0px -12% 0px' })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}
