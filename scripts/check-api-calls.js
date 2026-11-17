#!/usr/bin/env node
// Garde anti-régression : l'URL de tout appel axios.(get|post|put|delete|patch)( dont
// l'expression contient du texte littéral (chaîne, template, concaténation) doit
// COMMENCER par la base d'API (`...localhost` : state.localhost) ou par un schéma
// http(s). Sinon l'URL est relative (préfixe d'API perdu) et part vers le serveur du
// front. Les lignes commentées sont ignorées. Une URL sans aucun texte littéral
// (simple variable : `url`) n'est pas vérifiable statiquement et est ignorée.
// Sans dépendance : node scripts/check-api-calls.js   (npm run check:api)
//
// Cas documentés (rejoués à chaque exécution : voir SELF_TEST_CASES) :
//   NÉGATIFS (doivent être refusés)
//     axios.get('admin/foo')                                  littéral relatif
//     axios.get(`admin/${id}`)                                template relatif
//     axios.get('a' + b)                                      concaténation sans base
//     axios.get(`x/${state.localhost}`)                       localhost présent mais pas en tête
//   POSITIFS (doivent passer)
//     axios.get(`${state.localhost}admin/${id}`)              template : base en tête
//     axios.delete(this.$store.state.localhost + `del/${id}`) concaténation : base en tête
//     axios.get('https://api.exemple.com/x')                  URL absolue
//     axios.get(url)                                          variable seule (ignorée)
//     // axios.get('admin/foo')                               ligne commentée (ignorée)

const fs = require('fs')
const path = require('path')

const SRC_DIR = path.join(__dirname, '..', 'src')
const EXTENSIONS = ['.vue', '.js']
const CALL_PATTERN = /\baxios\s*\.\s*(get|post|put|delete|patch)\s*\(/g
const ABSOLUTE_URL = /^https?:\/\//i
const BASE_URL_TOKEN = 'localhost'
const QUOTES = ['\'', '"', '`']

function listFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return listFiles(full)
    return EXTENSIONS.includes(path.extname(entry.name)) ? [full] : []
  })
}

// Index juste après la fin du littéral (', " ou `) qui commence à `start`.
function skipLiteral(source, start) {
  const quote = source[start]
  let index = start + 1
  while (index < source.length) {
    const char = source[index]
    if (char === '\\') {
      index += 2
    } else if (char === quote) {
      return index + 1
    } else if (quote === '`' && char === '$' && source[index + 1] === '{') {
      index = skipBalanced(source, index + 2, '}')
    } else {
      index += 1
    }
  }
  return index
}

// Index juste après le `closer` qui équilibre une ouverture déjà consommée.
function skipBalanced(source, start, closer) {
  const pairs = { ')': '(', '}': '{', ']': '[' }
  const stack = [closer]
  let index = start
  while (index < source.length && stack.length > 0) {
    const char = source[index]
    if (QUOTES.includes(char)) {
      index = skipLiteral(source, index)
      continue
    }
    if (char === '(') stack.push(')')
    else if (char === '{') stack.push('}')
    else if (char === '[') stack.push(']')
    else if (char === stack[stack.length - 1]) stack.pop()
    else if (pairs[char]) { /* fermeture inattendue : ignorée */ }
    index += 1
  }
  return index
}

// Premier argument : jusqu'à la virgule ou la parenthèse fermante de niveau 0.
function readFirstArgument(source, start) {
  let index = start
  while (index < source.length) {
    const char = source[index]
    if (QUOTES.includes(char)) {
      index = skipLiteral(source, index)
      continue
    }
    if (char === '(' || char === '[' || char === '{') {
      index = skipBalanced(source, index + 1, { '(': ')', '[': ']', '{': '}' }[char])
      continue
    }
    if (char === ',' || char === ')') break
    index += 1
  }
  return source.slice(start, index).trim()
}

// Retourne true si l'expression d'URL est conforme (ou invérifiable).
function isUrlExpressionValid(expression) {
  if (!QUOTES.some((quote) => expression.includes(quote))) return true // variable seule
  const first = expression[0]
  if (first === '\'' || first === '"') {
    return ABSOLUTE_URL.test(expression.slice(1))
  }
  if (first === '`') {
    const body = expression.slice(1)
    if (ABSOLUTE_URL.test(body)) return true
    if (!body.startsWith('${')) return false
    const interpolation = body.slice(2, skipBalanced(body, 2, '}') - 1)
    return interpolation.includes(BASE_URL_TOKEN)
  }
  // Concaténation / expression : la base doit figurer avant le premier littéral.
  const firstQuote = Math.min(...QUOTES.map((q) => {
    const at = expression.indexOf(q)
    return at === -1 ? Infinity : at
  }))
  return expression.slice(0, firstQuote).includes(BASE_URL_TOKEN)
}

function isCommentedAt(source, matchIndex) {
  const lineStart = source.lastIndexOf('\n', matchIndex) + 1
  const before = source.slice(lineStart, matchIndex).trim()
  if (/^(\/\/|\/\*|\*|<!--)/.test(before) || before.includes('//')) return true
  const lastOpen = source.lastIndexOf('/*', matchIndex)
  const lastClose = source.lastIndexOf('*/', matchIndex)
  return lastOpen > lastClose
}

function findViolations(source, file = '<source>') {
  const violations = []
  let match
  CALL_PATTERN.lastIndex = 0
  while ((match = CALL_PATTERN.exec(source)) !== null) {
    if (isCommentedAt(source, match.index)) continue
    const expression = readFirstArgument(source, match.index + match[0].length)
    if (!isUrlExpressionValid(expression)) {
      const line = source.slice(0, match.index).split('\n').length
      violations.push({ file, line, call: match[1], expression })
    }
  }
  return violations
}

const SELF_TEST_CASES = [
  { code: 'axios.get(\'admin/foo\')', ok: false },
  { code: 'axios.get(`admin/${id}`)', ok: false },
  { code: 'axios.get(\'a\' + b)', ok: false },
  { code: 'axios.get(`x/${state.localhost}`)', ok: false },
  { code: 'axios.get(`${state.localhost}admin/${id}`)', ok: true },
  { code: 'axios.delete(this.$store.state.localhost + `del/${id}`)', ok: true },
  { code: 'axios.get(\'https://api.exemple.com/x\')', ok: true },
  { code: 'axios.get(url)', ok: true },
  { code: '// axios.get(\'admin/foo\')', ok: true }
]

function runSelfTest() {
  const failures = SELF_TEST_CASES.filter(({ code, ok }) => (findViolations(code).length === 0) !== ok)
  if (failures.length > 0) {
    console.error('Auto-test du garde en échec :')
    failures.forEach(({ code }) => console.error(`  ${code}`))
    process.exit(1)
  }
}

runSelfTest()

const violations = listFiles(SRC_DIR).flatMap((file) =>
  findViolations(fs.readFileSync(file, 'utf8'), path.relative(process.cwd(), file)))

if (violations.length > 0) {
  console.error('URL sans base d\'API (localhost) en tête ni schéma http(s) :')
  violations.forEach(({ file, line, call, expression }) =>
    console.error(`  ${file}:${line}  axios.${call}(${expression})`))
  process.exit(1)
}
console.log('check:api OK — auto-test passé, aucun appel axios avec URL sans base d\'API en tête.')
