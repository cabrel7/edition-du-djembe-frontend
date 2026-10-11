// En production, supprime le spam console (log/info/debug/warn).
// console.error reste intact pour le diagnostic des vraies erreurs.
if (process.env.NODE_ENV === 'production') {
  const noop = () => {}
  console.log = noop
  console.info = noop
  console.debug = noop
  console.warn = noop
}
