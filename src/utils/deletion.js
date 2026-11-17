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

// Connexion perdue pendant le DELETE (ERR_HTTP2_PROTOCOL_ERROR, ERR_CONNECTION_RESET…) :
// aucune réponse reçue, alors que le serveur a pu supprimer. L'échec n'est donc pas
// définitif : on recharge la liste pour resynchroniser l'affichage.
// Seule une erreur axios sans réponse compte : une Error ordinaire (bug local,
// `success:false` rejeté par le store) n'est PAS une perte de connexion.
export function isNetworkLost(error) {
  return Boolean(error) && error.isAxiosError === true && !error.response && error.code !== 'ERR_CANCELED'
}

export const NETWORK_LOST_TOAST = {
  title: 'Vérification',
  description: 'Connexion interrompue : vérification de la liste…'
}
const RECHECK_FAILED_TOAST = {
  title: 'Erreur',
  description: 'Impossible de vérifier la liste. Actualisez la page puis réessayez.'
}

// Informe l'utilisateur puis recharge la liste (`reload`). `notify(title, description)`
// est le showToast du composant.
export async function recheckAfterNetworkLoss(notify, reload) {
  notify(NETWORK_LOST_TOAST.title, NETWORK_LOST_TOAST.description)
  try {
    await reload()
  } catch (error) {
    notify(RECHECK_FAILED_TOAST.title, RECHECK_FAILED_TOAST.description)
  }
}
