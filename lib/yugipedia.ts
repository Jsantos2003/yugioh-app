const YUGIPEDIA_API = "https://yugipedia.com/api.php";

const HEADERS = {
  "User-Agent": "DuelHubProyectoUniversitario/1.0 (proyecto academico)",
  Accept: "application/json",
};

export interface YugipediaInfo {
  extract: string | null;
  imageUrl: string | null;
}


function stripTemplates(text: string): string {
  let result = "";
  let depth = 0;

  for (let i = 0; i < text.length; i++) {
    if (text[i] === "{" && text[i + 1] === "{") {
      depth++;
      i++;
      continue;
    }
    if (text[i] === "}" && text[i + 1] === "}" && depth > 0) {
      depth--;
      i++;
      continue;
    }
    if (depth === 0) {
      result += text[i];
    }
  }

  return result;
}

function cleanWikitext(raw: string): string {
  let text = stripTemplates(raw);

  text = text
    .replace(/<ref[^>]*\/>/g, "")
    .replace(/<ref[^>]*>[\s\S]*?<\/ref>/g, "")
    .replace(/<[^>]+>/g, "")
    .replace(/\[\[(?:[^|\]]*\|)?([^\]]+)\]\]/g, "$1")
    .replace(/'''?/g, "")
    .trim();

  return text;
}

export async function getYugipediaInfo(pageTitle: string): Promise<YugipediaInfo> {
  
  const url =
    `${YUGIPEDIA_API}?action=query&titles=${encodeURIComponent(pageTitle)}` +
    `&prop=revisions|pageimages&rvprop=content` +
    `&piprop=original|thumbnail&pithumbsize=500` +
    `&redirects=1&format=json&formatversion=2`;

  try {
    const res = await fetch(url, { next: { revalidate: 604800 }, headers: HEADERS });
    if (!res.ok) return { extract: null, imageUrl: null };

    const json = await res.json();
    const page = json?.query?.pages?.[0];
    if (!page || page.missing) return { extract: null, imageUrl: null };

    const wikitext: string | undefined = page.revisions?.[0]?.content;
    const imageUrl: string | null = page.original?.source ?? page.thumbnail?.source ?? null;

    if (!wikitext) return { extract: null, imageUrl };

    const cleaned = cleanWikitext(wikitext);

   
    const paragraphs = cleaned
      .split(/\n+/)
      .map((p) => p.trim())
      .filter((p) => p.length > 60);

    const firstParagraph = paragraphs[0] ?? null;

    return {
      extract: firstParagraph ? firstParagraph.slice(0, 500) : null,
      imageUrl,
    };
  } catch {
    return { extract: null, imageUrl: null };
  }
}