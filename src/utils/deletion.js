// Suppressions admin : un DELETE peut durer plusieurs secondes. Un 404 signifie que
// l'élément n'existe déjà plus (double clic, autre onglet) : on le traite comme supprimé.
// Seul le 404 au format du backend ({ success: false, message }) compte : un 404 de
// proxy/serveur web (corps HTML, route absente) reste une erreur normale.

const HTTP_NOT_FOUND = 404

export function isAlreadyDeleted(error) {
  const response = error?.response
  if (response?.status !== HTTP_NOT_FOUND) return false
  const body = response.data
  return body?.success === false && typeof body.message === 'string' && body.message !== ''
}

export const ALREADY_DELETED_TOAST = {
  title: 'Déjà supprimé',
  description: 'Cet élément avait déjà été supprimé.'
}
