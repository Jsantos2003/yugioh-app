const YUGIPEDIA_API = "https://yugipedia.com/api.php";

export interface YugipediaInfo {
  extract: string | null;
  imageUrl: string | null;
}

export async function getYugipediaInfo(pageTitle: string): Promise<YugipediaInfo> {
  const url =
    `${YUGIPEDIA_API}?action=query&titles=${encodeURIComponent(pageTitle)}` +
    `&prop=extracts|pageimages&exintro=1&explaintext=1&exsentences=5` +
    `&piprop=original|thumbnail&pithumbsize=500` +
    `&redirects=1&format=json`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 604800 },
      headers: {
        // MediaWiki rechaza peticiones sin un User-Agent identificable.
        "User-Agent": "DuelHubProyectoUniversitario/1.0 (proyecto academico)",
        Accept: "application/json",
      },
    });
    if (!res.ok) return { extract: null, imageUrl: null };

    const json = await res.json();
    const pages = json?.query?.pages;
    if (!pages) return { extract: null, imageUrl: null };

    const page = Object.values(pages)[0] as {
      missing?: boolean;
      extract?: string;
      original?: { source?: string };
      thumbnail?: { source?: string };
    };

    if (!page || page.missing) return { extract: null, imageUrl: null };

    return {
      extract: page.extract && page.extract.trim().length > 0 ? page.extract : null,
      // Si no hay imagen "original" (de infobox), se usa el thumbnail como respaldo.
      imageUrl: page.original?.source ?? page.thumbnail?.source ?? null,
    };
  } catch {
    return { extract: null, imageUrl: null };
  }
}