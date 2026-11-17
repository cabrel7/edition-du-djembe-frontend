// Aides d'accessibilité communes aux modales admin : focus trap (Tab / Maj+Tab) et
// gestion du focus. L'ouverture/fermeture, Échap et les verrous restent dans le composant.

export const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

const EXCLUDED_ANCESTORS = '[hidden], [inert], [aria-hidden="true"]'

// Visible et interactif : pas désactivé, pas tabindex=-1, pas dans un ancêtre
// hidden / inert / aria-hidden, et affiché (display:none → aucune boîte de rendu).
function isTabbable(element) {
  if (element.disabled || element.getAttribute('tabindex') === '-1') return false
  if (element.closest(EXCLUDED_ANCESTORS)) return false
  if (element.getClientRects().length === 0) return false
  return window.getComputedStyle(element).visibility !== 'hidden'
}

// Éléments réellement atteignables au clavier dans `panel`.
export function getTabbable(panel) {
  return Array.from(panel.querySelectorAll(FOCUSABLE_SELECTOR)).filter(isTabbable)
}

// Fait boucler Tab / Maj+Tab dans `panel` (appelé depuis un keydown de Tab). Sans
// élément atteignable, le focus est gardé sur le panneau lui-même (jamais derrière).
export function trapTabKey(event, panel) {
  if (!panel) return
  const focusables = getTabbable(panel)
  if (focusables.length === 0) {
    event.preventDefault()
    if (!panel.hasAttribute('tabindex')) panel.setAttribute('tabindex', '-1')
    panel.focus()
    return
  }
  const first = focusables[0]
  const last = focusables[focusables.length - 1]
  const active = document.activeElement
  const isOutside = !panel.contains(active)
  if (event.shiftKey && (active === first || isOutside)) {
    event.preventDefault()
    last.focus()
  } else if (!event.shiftKey && (active === last || isOutside)) {
    event.preventDefault()
    first.focus()
  }
}

// Place le focus sur le premier élément atteignable du panneau (sinon sur le panneau).
export function focusFirstIn(panel) {
  if (!panel) return
  const [first] = getTabbable(panel)
  if (first) {
    first.focus()
    return
  }
  if (!panel.hasAttribute('tabindex')) panel.setAttribute('tabindex', '-1')
  panel.focus()
}

// Rend le focus à l'élément d'origine s'il est toujours dans le document.
export function restoreFocus(element) {
  if (element && document.contains(element)) element.focus()
}
