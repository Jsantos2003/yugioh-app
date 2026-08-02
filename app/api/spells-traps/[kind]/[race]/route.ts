import { NextRequest, NextResponse } from "next/server";
import { getCardsByType } from "@/lib/api";
import { translateText } from "@/lib/translate";
import { mapWithConcurrency } from "@/lib/concurrency";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ kind: string; race: string }> }
) {
  const { kind, race } = await params;
  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset") ?? "0");
  const limit = Number(searchParams.get("limit") ?? "40");

  const raceName = decodeURIComponent(race);
  const type = kind === "spell" ? "Spell Card" : "Trap Card";

  const allCards = await getCardsByType(type as "Spell Card" | "Trap Card");
  const filtered = allCards.filter((c) => c.race === raceName);
  const slice = filtered.slice(offset, offset + limit);

  const results = await mapWithConcurrency(slice, 6, async (card) => ({
    id: card.id,
    name: card.name,
    desc: await translateText(card.desc.slice(0, 130)),
    truncated: card.desc.length > 130,
    imageUrl: card.card_images?.[0]?.image_url_cropped ?? null,
  }));

  return NextResponse.json({
    results,
    total: filtered.length,
    hasMore: offset + slice.length < filtered.length,
  });
}