import type { Metadata } from "next";
import Link from "next/link";
import Card from "@/components/Card";
import Hero from "@/components/Hero";
import { getCardsByType } from "@/lib/api";
import { translateText } from "@/lib/translate";
import { translateRace } from "@/lib/translations";
import { mapWithConcurrency } from "@/lib/concurrency";

interface PageProps {
  params: Promise<{ kind: string; race: string }>;
}

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

  const allCards = await getCardsByType(type as "Spell Card" | "Trap Card");
  const cards = allCards.filter((c) => c.race === raceName);

  // Se traduce una muestra de hasta 40 para no saturar el traductor.
  const sample = cards.slice(0, 40);
  const translated = await mapWithConcurrency(sample, 6, async (card) => ({
    card,
    desc: await translateText(card.desc.slice(0, 130)),
  }));

  return (
    <>
      <Link href="/spells-traps" className="back-link">
        ← Volver a Mágicas y Trampas
      </Link>

      <Hero
        eyebrow={label}
        title={translateRace(raceName)}
        description={`${cards.length} carta(s) en esta categoría${cards.length > 40 ? " (mostrando las primeras 40)" : ""}.`}
      />

      <div className="card-grid">
        {translated.map(({ card, desc }, index) => (
          <Card
            key={`${card.id}-${index}`}
            eyebrow={label}
            title={card.name}
            description={desc + (card.desc.length > 130 ? "…" : "")}
            imageUrl={card.card_images?.[0]?.image_url_cropped}
          />
        ))}
      </div>
    </>
  );
}