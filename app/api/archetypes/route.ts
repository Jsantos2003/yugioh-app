import { NextRequest, NextResponse } from "next/server";
import { getArchetypes, getArchetypeSample } from "@/lib/api";
import { mapWithConcurrency } from "@/lib/concurrency";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const offset = Number(searchParams.get("offset") ?? "0");
  const limit = Number(searchParams.get("limit") ?? "40");

  const allArchetypes = await getArchetypes();
  const slice = allArchetypes.slice(offset, offset + limit);
  
const results = await mapWithConcurrency(slice, 6, async (a) => {
    const card = await getArchetypeSample(a.archetype_name);
    return {
      archetype: a.archetype_name,
      imageUrl: card?.card_images?.[0]?.image_url_cropped ?? null,
    };
  });

  return NextResponse.json({
    results,
    total: allArchetypes.length,
    hasMore: offset + slice.length < allArchetypes.length,
  });
}