export async function getCardsByType(type: "Spell Card" | "Trap Card"): Promise<YgoCard[]> {
  const data = await fetchJson<{ data: YgoCard[] }>(
    `${BASE_URL}/cardinfo.php?type=${encodeURIComponent(type)}`
  );
  return data.data ?? [];
}

const BASE_URL = "https://db.ygoprodeck.com/api/v7";

export interface Archetype {
  archetype_name: string;
}

export interface CardImage {
  id: number;
  image_url: string;
  image_url_small: string;
  image_url_cropped: string;
}

export interface BanlistInfo {
  ban_tcg?: string;
  ban_ocg?: string;
  ban_goat?: string;
}

export interface YgoCard {
  id: number;
  name: string;
  type: string;
  desc: string;
  race?: string;
  attribute?: string;
  archetype?: string;
  atk?: number;
  def?: number;
  level?: number;
  linkval?: number;
  scale?: number;
  card_images: CardImage[];
  banlist_info?: BanlistInfo;
}

export interface CardSet {
  set_name: string;
  set_code: string;
  num_of_cards: number;
  tcg_date?: string;
}

async function fetchJson<T>(url: string, retries = 2): Promise<T> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const res = await fetch(url, { next: { revalidate: 3600 } });

      if (res.ok) {
        return (await res.json()) as T;
      }

    
      if ((res.status === 429 || res.status >= 500) && attempt < retries) {
        await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
        continue;
      }

      throw new Error(`La API de YGOPRODeck respondió con un error (${res.status}).`);
    } catch (err) {
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 400 * (attempt + 1)));
        continue;
      }
      throw err;
    }
  }
  throw new Error("La API de YGOPRODeck no respondió tras varios intentos.");
}

export async function getArchetypes(): Promise<Archetype[]> {
  const data = await fetchJson<Archetype[]>(`${BASE_URL}/archetypes.php`);
  return data.filter((a) => a.archetype_name);
}

export async function getArchetypeSample(archetypeName: string): Promise<YgoCard | null> {
  try {
    const data = await fetchJson<{ data: YgoCard[] }>(
      `${BASE_URL}/cardinfo.php?archetype=${encodeURIComponent(archetypeName)}&num=1&offset=0`
    );
    return data.data?.[0] ?? null;
  } catch {
    return null;
  }
}


export async function getCardsByArchetype(archetypeName: string): Promise<YgoCard[]> {
  const data = await fetchJson<{ data: YgoCard[] }>(
    `${BASE_URL}/cardinfo.php?archetype=${encodeURIComponent(archetypeName)}`
  );
  return data.data ?? [];
}

export async function getBanlist(): Promise<YgoCard[]> {
  const data = await fetchJson<{ data: YgoCard[] }>(`${BASE_URL}/cardinfo.php?banlist=tcg`);
  return data.data ?? [];
}


export async function getCardById(id: string): Promise<YgoCard | null> {
  try {
    const data = await fetchJson<{ data: YgoCard[] }>(`${BASE_URL}/cardinfo.php?id=${id}`);
    return data.data?.[0] ?? null;
  } catch {
    return null;
  }
}

export async function getCardSets(): Promise<CardSet[]> {
  return fetchJson<CardSet[]>(`${BASE_URL}/cardsets.php`);
}


export async function searchCardsByName(query: string): Promise<YgoCard[]> {
  if (!query.trim()) return [];
  try {
    const data = await fetchJson<{ data: YgoCard[] }>(
      `${BASE_URL}/cardinfo.php?fname=${encodeURIComponent(query)}`
    );
    return (data.data ?? []).slice(0, 24);
  } catch {
    return [];
  }
}