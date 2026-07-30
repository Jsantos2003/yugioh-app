import type { Metadata } from "next";
import Card from "@/components/Card";
import Hero from "@/components/Hero";
import { getCardsByType, type YgoCard } from "@/lib/api";
import { translateRace } from "@/lib/translations";

export const metadata: Metadata = {
  title: "Mágicas y Trampas",
  description:
    "Todos los subtipos de Cartas de Magia y de Trampa registrados en la API de YGOPRODeck.",
  openGraph: {
    title: "Mágicas y Trampas · Duel Hub",
    description:
      "Todos los subtipos de Cartas de Magia y de Trampa registrados en la API de YGOPRODeck.",
  },
};

interface RaceGroup {
  race: string;
  count: number;
  sample: YgoCard;
}

function groupByRace(cards: YgoCard[]): RaceGroup[] {
  const groups = new Map<string, RaceGroup>();
  for (const card of cards) {
    const race = card.race ?? "Sin categoría";
    const existing = groups.get(race);
    if (existing) {
      existing.count += 1;
    } else {
      groups.set(race, { race, count: 1, sample: card });
    }
  }
  return Array.from(groups.values()).sort((a, b) => b.count - a.count);
}

export default async function SpellsTrapsPage() {
  const [spells, traps] = await Promise.all([
    getCardsByType("Spell Card"),
    getCardsByType("Trap Card"),
  ]);

  const spellGroups = groupByRace(spells);
  const trapGroups = groupByRace(traps);

  return (
    <>
      <Hero
        eyebrow="Catálogo completo"
        title="Mágicas y Trampas"
        description={`${spellGroups.length} subtipos de Magia (${spells.length} cartas) y ${trapGroups.length} subtipos de Trampa (${traps.length} cartas) registrados en la base de datos.`}
      />

      <div className="section-title">
        <span className="kicker">Cartas de Magia</span>
      </div>
      <div className="card-grid">
        {spellGroups.map((group) => (
          <Card
            key={group.race}
            href={`/spells-traps/spell/${encodeURIComponent(group.race)}`}
            eyebrow="Magia"
            title={translateRace(group.race)}
            description={`${group.count} carta(s) en esta categoría →`}
            imageUrl={group.sample.card_images?.[0]?.image_url_cropped}
            accentColor="#3ddc84"
          />
        ))}
      </div>

      <div className="section-title">
        <span className="kicker">Cartas de Trampa</span>
      </div>
      <div className="card-grid">
        {trapGroups.map((group) => (
          <Card
            key={group.race}
            href={`/spells-traps/trap/${encodeURIComponent(group.race)}`}
            eyebrow="Trampa"
            title={translateRace(group.race)}
            description={`${group.count} carta(s) en esta categoría →`}
            imageUrl={group.sample.card_images?.[0]?.image_url_cropped}
            accentColor="#ff4fa3"
          />
        ))}
      </div>
    </>
  );
}