// Utilitaires de téléchargement de fichiers via l'API authentifiée (cookie httpOnly).

const HTTP_NOT_FOUND = 404
const HTTP_UNAUTHORIZED = 401
const HTTP_FORBIDDEN = 403
// Délai avant de libérer l'URL objet : certains navigateurs lisent le Blob
// après le retour de click() ; une révocation immédiate peut annuler le téléchargement.
const REVOKE_URL_DELAY_MS = 1000

// Extrait le nom de fichier d'un en-tête Content-Disposition
// (filename*=UTF-8''… prioritaire, puis filename="…"). Retourne null sinon.
export function filenameFromDisposition(header) {
  if (!header) return null
  const star = /filename\*\s*=\s*UTF-8''([^;]+)/i.exec(header)
  if (star) {
    try {
      return decodeURIComponent(star[1].trim())
    } catch (e) {
      // encodage invalide : on retombe sur filename=
    }
  }
  const plain = /filename\s*=\s*"?([^";]+)"?/i.exec(header)
  return plain ? plain[1].trim() : null
}

const FILENAME_MAX_LENGTH = 120
const FILENAME_FALLBACK = 'memoire'
// Caractères interdits dans un nom de fichier (Windows/Unix) et caractères de contrôle.
// eslint-disable-next-line no-control-regex
const UNSAFE_FILENAME_CHARS = /[\\/:*?"<>|\u0000-\u001f\u007f]/g

// Nom de fichier de repli assaini à partir d'un titre libre.
export function safeFilenameBase(title) {
  const cleaned = String(title ?? '')
    .replace(UNSAFE_FILENAME_CHARS, '')
    .trim()
    .slice(0, FILENAME_MAX_LENGTH)
    .trim()
  return cleaned || FILENAME_FALLBACK
}

// Déclenche l'enregistrement d'un Blob puis libère l'URL objet (différé).
export function saveBlob(blob, filename) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  link.remove()
  setTimeout(() => window.URL.revokeObjectURL(url), REVOKE_URL_DELAY_MS)
}

// Message utilisateur pour une erreur axios de téléchargement. Avec
// responseType 'blob', le corps d'erreur JSON est lui-même un Blob : on le lit.
export async function downloadErrorMessage(error) {
  const response = error?.response
  if (!response) {
    return 'Erreur réseau : impossible de joindre le serveur. Vérifiez votre connexion et réessayez.'
  }
  if (response.status === HTTP_NOT_FOUND) {
    return 'Fichier introuvable sur le serveur.'
  }
  if (response.status === HTTP_UNAUTHORIZED || response.status === HTTP_FORBIDDEN) {
    return 'Session expirée ou accès refusé. Reconnectez-vous.'
  }
  try {
    if (response.data instanceof Blob) {
      const body = JSON.parse(await response.data.text())
      if (body?.message) return body.message
    }
  } catch (e) {
    // corps non JSON : message générique ci-dessous
  }
  return 'Impossible de télécharger le fichier.'
}
