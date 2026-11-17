// Le backend (AdminController) valide les champs fichier avec `|file` et ne
// met à jour les colonnes que via hasFile() : toute string (URL/nom déjà
// en base) envoyée dans le multipart faisait échouer la validation en 422 —
// l'édition d'un enregistrement avec fichiers existants n'enregistrait rien.
// On n'envoie donc QUE les File ; tout le reste (string, null) est omis et
// l'existant est conservé côté serveur.
export function stripNonFileUploads(payload, keys) {
  const copy = { ...payload }
  for (const key of keys) {
    if (key in copy && !(copy[key] instanceof File)) {
      delete copy[key]
    }
  }
  return copy
}

// applyCover du store préfixe déjà cover/photo/image en URLs complètes :
// préfixer à nouveau donnerait base/https://… (aperçus cassés).
// Les URLs absolues et les aperçus locaux (data:/blob:) ne sont jamais préfixés.
export function resolveCoverUrl(value, baseUrl) {
  if (!value) return null
  if (/^(https?:\/\/|data:|blob:)/.test(value)) return value
  return `${baseUrl}/${value}`
}

const IMAGE_EXTENSION_RE = /\.(jpe?g|png|gif|webp|avif|svg)(\?.*)?$/i

// Vignette affichable : uniquement une vraie image. Un champ vide ou pointant
// vers un fichier non image (ex. .mp4) donne null → l'appelant affiche un placeholder.
export function resolveImageUrl(value, baseUrl) {
  if (!value) return null
  if (/^(data:image\/|blob:)/.test(value)) return value
  if (!IMAGE_EXTENSION_RE.test(value)) return null
  return resolveCoverUrl(value, baseUrl)
}
