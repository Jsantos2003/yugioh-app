import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";
import { getCardsByArchetype } from "@/lib/api";
import { translateText } from "@/lib/translate";
import { translateCardType, accentForCardType } from "@/lib/translations";
import { mapWithConcurrency } from "@/lib/concurrency";
interface PageProps {
  params: Promise<{ name: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { name } = await params;
  const archetypeName = decodeURIComponent(name);
  return {
    title: archetypeName,
    description: `Todos los miembros del arquetipo ${archetypeName}: efectos, ataque y defensa.`,
    openGraph: {
      title: `${archetypeName} · Arquetipos · Duel Hub`,
      description: `Todos los miembros del arquetipo ${archetypeName}: efectos, ataque y defensa.`,
    },
  };
}

export default async function ArchetypeDetailPage({ params }: PageProps) {
  const { name } = await params;
  const archetypeName = decodeURIComponent(name);
  const members = await getCardsByArchetype(archetypeName);

 const translated = await mapWithConcurrency(members, 6, async (card) => ({
  card,
  desc: await translateText(card.desc.slice(0, 260)),
}));

  return (
    <>
      <Link href="/archetypes" className="back-link">
        ← Volver a arquetipos
      </Link>

      <Hero
        eyebrow="Arquetipo"
        title={archetypeName}
        description={`${members.length} carta(s) pertenecen a este arquetipo.`}
      />

      <div className="member-grid">
        {translated.map(({ card, desc }, index) => (
          <article
            key={`${card.id}-${index}`}
            className="member-card"
            style={{ borderTop: `4px solid ${accentForCardType(card.type)}` }}
          >
            <div className="member-card-media">
              {card.card_images?.[0]?.image_url_cropped ? (
                <img
                  src={card.card_images[0].image_url_cropped}
                  alt={card.name}
                />
              ) : (
                <div className="ygo-card-media-empty">🂠</div>
              )}
            </div>
            <div className="member-card-body">
              <span className="ygo-card-eyebrow">{translateCardType(card.type)}</span>
              <h3 className="ygo-card-title">{card.name}</h3>
              <p className="ygo-card-desc">{desc}</p>
              <div className="stat-row">
                {typeof card.atk === "number" && (
                  <span className="stat-pill">ATQ {card.atk}</span>
                )}
                {typeof card.def === "number" && (
                  <span className="stat-pill">DEF {card.def}</span>
                )}
                {typeof card.level === "number" && (
                  <span className="stat-pill">Nivel {card.level}</span>
                )}
                {card.attribute && <span className="stat-pill">{card.attribute}</span>}
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}