
export function priceForSetCode(code: string): number {
  let hash = 0;
  for (let i = 0; i < code.length; i++) {
    hash = (hash * 31 + code.charCodeAt(i)) % 10000;
  }
  const price = 8 + (hash % 37); 
  return Math.round(price * 100) / 100;
}