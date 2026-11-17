#!/usr/bin/env node
// Tests unitaires sans dépendance des utilitaires purs de src/utils (assert natif).
// Lancer : npm run test:utils
// Les utilitaires sont en ES modules : on les importe via une URL data: (le projet
// n'a pas "type": "module"), sans toucher au code source.

const assert = require('assert')
const fs = require('fs')
const path = require('path')

async function loadModule(relativePath) {
  const source = fs.readFileSync(path.join(__dirname, '..', 'src', relativePath), 'utf8')
  return import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`)
}

// Erreurs au format axios.
const axiosError = (response, code) => Object.assign(new Error('axios'), { isAxiosError: true, response, code })
const apiNotFound = { status: 404, data: { success: false, message: 'Ressource non trouvée' } }

const tests = []
const test = (name, fn) => tests.push({ name, fn })

async function main() {
  const { isNetworkLost, isAlreadyDeleted } = await loadModule('utils/deletion.js')

  test('isNetworkLost : axios sans réponse (reset, HTTP/2)', () => {
    assert.strictEqual(isNetworkLost(axiosError(undefined, 'ERR_NETWORK')), true)
    assert.strictEqual(isNetworkLost(axiosError(undefined, 'ECONNRESET')), true)
  })
  test('isNetworkLost : Error simple (bug local) = non', () => {
    assert.strictEqual(isNetworkLost(new Error('boom')), false)
  })
  test('isNetworkLost : ERR_CANCELED = non', () => {
    assert.strictEqual(isNetworkLost(axiosError(undefined, 'ERR_CANCELED')), false)
  })
  test('isNetworkLost : 4xx et 5xx avec réponse = non', () => {
    assert.strictEqual(isNetworkLost(axiosError({ status: 422, data: {} })), false)
    assert.strictEqual(isNetworkLost(axiosError({ status: 500, data: {} })), false)
  })
  test('isNetworkLost : null / undefined = non', () => {
    assert.strictEqual(isNetworkLost(null), false)
    assert.strictEqual(isNetworkLost(undefined), false)
  })

  test('isAlreadyDeleted : 404 au format API = oui', () => {
    assert.strictEqual(isAlreadyDeleted(axiosError(apiNotFound)), true)
  })
  test('isAlreadyDeleted : 404 sans corps API (proxy HTML, corps vide) = non', () => {
    assert.strictEqual(isAlreadyDeleted(axiosError({ status: 404, data: '<html>404</html>' })), false)
    assert.strictEqual(isAlreadyDeleted(axiosError({ status: 404, data: {} })), false)
    assert.strictEqual(isAlreadyDeleted(axiosError({ status: 404, data: { success: true, message: 'x' } })), false)
    assert.strictEqual(isAlreadyDeleted(axiosError({ status: 404, data: { success: false, message: '' } })), false)
  })
  test('isAlreadyDeleted : 4xx/5xx hors 404, sans réponse, Error simple = non', () => {
    assert.strictEqual(isAlreadyDeleted(axiosError({ status: 403, data: apiNotFound.data })), false)
    assert.strictEqual(isAlreadyDeleted(axiosError({ status: 500, data: apiNotFound.data })), false)
    assert.strictEqual(isAlreadyDeleted(axiosError(undefined, 'ERR_NETWORK')), false)
    assert.strictEqual(isAlreadyDeleted(new Error('boom')), false)
    assert.strictEqual(isAlreadyDeleted(undefined), false)
  })

  let failed = 0
  for (const { name, fn } of tests) {
    try {
      await fn()
      console.log(`  ok   ${name}`)
    } catch (error) {
      failed += 1
      console.error(`  FAIL ${name}\n       ${error.message}`)
    }
  }
  console.log(`${tests.length - failed}/${tests.length} tests passés`)
  process.exit(failed > 0 ? 1 : 0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
