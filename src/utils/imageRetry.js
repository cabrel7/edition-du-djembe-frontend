// Nouvelles tentatives de chargement d'une <img> avant d'afficher le repli (équivalent
// de web/app/utils/imageRetry.ts). Un échec réseau transitoire (connexion coupée sous
// rafale HTTP/2) ne doit pas figer le repli jusqu'au rechargement de la page.

// Nombre maximal de nouvelles tentatives avant d'afficher le repli.
export const IMAGE_MAX_RETRIES = 2
// Délai différé avant chaque nouvelle tentative.
export const IMAGE_RETRY_DELAY_MS = 3000
// Paramètre ignoré par le serveur : il contourne seulement le cache d'erreur.
const RETRY_PARAM = 'r'
const LOCAL_SOURCE = /^(data|blob):/i

// Handler `@error` : recharge l'image (IMAGE_RETRY_DELAY_MS plus tard) jusqu'à
// IMAGE_MAX_RETRIES fois, puis appelle `onGiveUp`. Retourne un `cancel` qui annule la
// tentative en attente (à appeler au démontage du composant).
export function retryImage(event, onGiveUp) {
  const img = event.target
  if (!(img instanceof HTMLImageElement)) {
    onGiveUp()
    return () => {}
  }
  // data: / blob: (aperçus locaux) : l'ajout de ?r=N est sans effet, pas de nouvelle tentative.
  if (LOCAL_SOURCE.test(img.currentSrc || img.src)) {
    onGiveUp()
    return () => {}
  }
  const attempt = Number(img.dataset.retry || 0)
  if (attempt >= IMAGE_MAX_RETRIES) {
    onGiveUp()
    return () => {}
  }
  img.dataset.retry = String(attempt + 1)
  const url = new URL(img.currentSrc || img.src, window.location.href)
  url.searchParams.set(RETRY_PARAM, String(attempt + 1))
  const timer = window.setTimeout(() => { img.src = url.toString() }, IMAGE_RETRY_DELAY_MS)
  return () => window.clearTimeout(timer)
}

// Remet à zéro le compteur de tentatives (nouvelle source sur le même élément).
export function resetImageRetry(img) {
  if (img) delete img.dataset.retry
}
