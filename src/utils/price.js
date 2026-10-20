const CAD = new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD', minimumFractionDigits: 2 })

export function formatPrice(value) {
  const n = Number(value)
  return value != null && Number.isFinite(n) && n > 0 ? CAD.format(n) : null
}
