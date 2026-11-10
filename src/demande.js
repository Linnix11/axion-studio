// Pré-remplit le message du formulaire de contact avant d'y envoyer le visiteur
// (assistant, calcul du temps gagné de l'accueil, formules de Tarifs, pages métier).
export const DRAFT_KEY = 'axion-contact-draft'

export function preparerDemande(texte) {
  try { sessionStorage.setItem(DRAFT_KEY, texte) } catch { /* stockage indisponible : formulaire vide */ }
  window.dispatchEvent(new Event('axion-draft'))   // si le formulaire est déjà affiché
}
