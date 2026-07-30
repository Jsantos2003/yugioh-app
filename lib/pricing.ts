// La API pública de YGOPRODeck no expone precios reales.
// Este precio es simulado pero estable: el mismo set_code siempre
// da el mismo precio (no cambia entre recargas de página).
export function priceForSetCode(code: string): number {
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = (hash * 31 + code.charCodeAt(i)) % 10000;
  }
  const price = 8 + (hash % 37); // entre $8 y $44
  return Math.round(price * 100) / 100;
}