// Idempotence des créations admin : le serveur mémorise le résultat d'un POST de
// création identifié par `Idempotency-Key` et le rejoue si la même clé revient
// (réponse perdue puis retry). Une clé est valable pour UN formulaire de création :
// générée à l'ouverture, réutilisée pour tout retry, renouvelée après succès.

export const IDEMPOTENCY_HEADER = 'Idempotency-Key'

const HTTP_CONFLICT = 409
const HTTP_UNPROCESSABLE = 422

const UUID_V4_TEMPLATE = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
const UUID_VARIANT_MASK = 0x3
const UUID_VARIANT_BITS = 0x8
const NIBBLE_RANGE = 16

function webCrypto() {
  return typeof window !== 'undefined' ? window.crypto : undefined
}

export const IDEMPOTENCY_MESSAGES = {
  network: 'La connexion a été interrompue. Réessayez : l\'enregistrement ne sera pas créé en double.',
  inProgress: 'Enregistrement en cours, patientez quelques secondes puis réessayez.',
  keyReused: 'Le formulaire a changé depuis la dernière tentative. Vérifiez la liste avant de réessayer.'
}

// Nibble aléatoire : crypto.getRandomValues (disponible hors contexte sécurisé,
// contrairement à randomUUID), Math.random en tout dernier recours.
function randomNibble() {
  const cryptoApi = webCrypto()
  if (cryptoApi && typeof cryptoApi.getRandomValues === 'function') {
    return cryptoApi.getRandomValues(new Uint8Array(1))[0] % NIBBLE_RANGE
  }
  return Math.floor(Math.random() * NIBBLE_RANGE)
}

export function newIdempotencyKey() {
  const cryptoApi = webCrypto()
  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return cryptoApi.randomUUID()
  }
  return UUID_V4_TEMPLATE.replace(/[xy]/g, (char) => {
    const nibble = randomNibble()
    return (char === 'x' ? nibble : (nibble & UUID_VARIANT_MASK) | UUID_VARIANT_BITS)
      .toString(NIBBLE_RANGE)
  })
}

// En-têtes à fusionner dans la config axios. Sans clé (modification) : aucun en-tête.
export function idempotencyHeaders(key) {
  return key ? { [IDEMPOTENCY_HEADER]: key } : {}
}

// Analyse l'échec d'une CRÉATION. Retourne null si l'erreur n'est pas du ressort de
// l'idempotence (validation 422 avec `errors`, 5xx… : gérées par l'appelant).
//  - réseau  : clé conservée (le retry sera dédoublonné par le serveur)
//  - 409     : requête déjà en cours, clé conservée
//  - 422 sans `errors` : clé réutilisée avec un corps différent → clé à renouveler
export function describeIdempotencyFailure(error) {
  const response = error?.response
  if (!response) {
    return { message: IDEMPOTENCY_MESSAGES.network, renewKey: false }
  }
  if (response.status === HTTP_CONFLICT) {
    return { message: IDEMPOTENCY_MESSAGES.inProgress, renewKey: false }
  }
  if (response.status === HTTP_UNPROCESSABLE && !response.data?.errors) {
    return { message: IDEMPOTENCY_MESSAGES.keyReused, renewKey: true }
  }
  return null
}
