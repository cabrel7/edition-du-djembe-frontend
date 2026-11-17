// Utilitaires de téléchargement de fichiers via l'API authentifiée (cookie httpOnly).

const HTTP_NOT_FOUND = 404
const HTTP_UNAUTHORIZED = 401
const HTTP_FORBIDDEN = 403

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

// Déclenche l'enregistrement d'un Blob et libère l'URL objet.
export function saveBlob(blob, filename) {
  const url = window.URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', filename)
  document.body.appendChild(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)
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
