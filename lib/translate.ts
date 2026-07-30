// Traduce texto de inglés a español. Se prueba primero el endpoint no oficial
// de Google Translate (soporta mucho más volumen que servicios "free tier"),
// y si falla, se usa MyMemory como respaldo. Si ambos fallan, se devuelve
// el texto original para no romper la página.

async function translateViaGoogle(text: string): Promise<string> {
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=es&dt=t&q=${encodeURIComponent(
    text
  )}`;
  const res = await fetch(url, { next: { revalidate: 604800 } });
  if (!res.ok) throw new Error("Google Translate no disponible");
  const json = await res.json();
  const segments = json?.[0];
  if (!Array.isArray(segments)) throw new Error("Respuesta inesperada");
  return segments.map((seg: unknown[]) => seg[0]).join("");
}

async function translateViaMyMemory(text: string): Promise<string> {
  const chunk = text.slice(0, 480);
  const res = await fetch(
    `https://api.mymemory.translated.net/get?q=${encodeURIComponent(chunk)}&langpair=en|es`,
    { next: { revalidate: 604800 } }
  );
  if (!res.ok) throw new Error("MyMemory no disponible");
  const json = await res.json();
  const translated = json?.responseData?.translatedText;
  if (typeof translated !== "string" || translated.length === 0) {
    throw new Error("Traducción vacía");
  }
  return translated;
}

export async function translateText(text: string): Promise<string> {
  if (!text) return text;

  try {
    return await translateViaGoogle(text);
  } catch {
    try {
      return await translateViaMyMemory(text);
    } catch {
      return text; // último recurso: texto original en inglés
    }
  }
}