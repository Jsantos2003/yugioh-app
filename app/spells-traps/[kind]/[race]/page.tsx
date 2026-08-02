import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import SpellTrapGrid from "@/components/SpellTrapGrid";
import { getCardsByType } from "@/lib/api";
import { translateText } from "@/lib/translate";
import { translateRace, accentForCardType } from "@/lib/translations";
import { mapWithConcurrency } from "@/lib/concurrency";

interface PageProps {
  params: Promise<{ kind: string; race: string }>;
}

const PAGE_SIZE = 40;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { kind, race } = await params;
  const raceName = decodeURIComponent(race);
  const label = kind === "spell" ? "Magia" : "Trampa";
  return {
    title: `${translateRace(raceName)} (${label})`,
    description: `Todas las cartas de tipo ${label} - ${translateRace(raceName)} registradas en la API.`,
  };
}

export default async function SpellTrapSubtypePage({ params }: PageProps) {
  const { kind, race } = await params;
  const raceName = decodeURIComponent(race);
  const type = kind === "spell" ? "Spell Card" : "Trap Card";
  const label = kind === "spell" ? "Carta de Magia" : "Carta de Trampa";
  const accentColor = kind === "spell" ? "#3ddc84" : "#ff4fa3";

  const allCards = await getCardsByType(type as "Spell Card" | "Trap Card");
  const filtered = allCards.filter((c) => c.race === raceName);
  const firstBatch = filtered.slice(0, PAGE_SIZE);

  const initialItems = await mapWithConcurrency(firstBatch, 6, async (card) => ({
    id: card.id,
    name: card.name,
    desc: await translateText(card.desc.slice(0, 130)),
    truncated: card.desc.length > 130,
    imageUrl: card.card_images?.[0]?.image_url_cropped ?? null,
  }));

  return (
    <>
      <Link href="/spells-traps" className="back-link">
        ← Volver a Mágicas y Trampas
      </Link>

      <Hero
        eyebrow={label}
        title={translateRace(raceName)}
        description={`${filtered.length} carta(s) en esta categoría.`}
      />

      <div className="section-title">
        <span className="kicker">Mostrando {initialItems.length} de {filtered.length}</span>
      </div>

      <SpellTrapGrid
        initialItems={initialItems}
        total={filtered.length}
        pageSize={PAGE_SIZE}
        kind={kind}
        race={race}
        label={label}
        accentColor={accentColor}
      />
    </>
  );
}