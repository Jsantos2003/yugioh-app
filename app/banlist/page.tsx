import type { Metadata } from "next";
import Card from "@/components/Card";
import Hero from "@/components/Hero";
import { getBanlist } from "@/lib/api";
import { translateText } from "@/lib/translate";
import { translateCardType, accentForCardType } from "@/lib/translations";

export const metadata: Metadata = {
  title: "Lista Prohibida y Limitada",
  description:
    "Consulta las cartas actualmente prohibidas, limitadas y semi-limitadas en el formato TCG de Yu-Gi-Oh!.",
  openGraph: {
    title: "Lista Prohibida y Limitada · Duel Hub",
    description:
      "Consulta las cartas actualmente prohibidas, limitadas y semi-limitadas en el formato TCG de Yu-Gi-Oh!.",
  },
};

function badgeFor(status?: string) {
  if (!status) return null;
  const normalized = status.toLowerCase();
  if (normalized === "banned") return <span className="badge badge-forbidden">Prohibida</span>;
  if (normalized === "limited") return <span className="badge badge-limited">Limitada</span>;
  if (normalized === "semi-limited") return <span className="badge badge-semi">Semi-limitada</span>;
  return null;
}

export default async function BanlistPage() {
  const cards = await getBanlist();

  const translated = await Promise.all(
    cards.map(async (card) => ({
      card,
      desc: await translateText(card.desc.slice(0, 130)),
    }))
  );

  return (
    <>
      <Hero
        eyebrow="Formato TCG"
        title="Lista Prohibida y Limitada"
        description="El Comité de Prohibición y Limitación revisa esta lista para mantener el juego equilibrado. Haz clic en una carta para ver su información completa."
      />

      <div className="section-title">
        <span className="kicker">{cards.length} cartas restringidas</span>
      </div>

      <div className="card-grid">
        {translated.map(({ card, desc }, index) => (
          <Card
            key={`${card.id}-${index}`}
            href={`/banlist/${card.id}`}
            eyebrow={translateCardType(card.type)}
            title={card.name}
            description={desc + (card.desc.length > 130 ? "…" : "")}
            imageUrl={card.card_images?.[0]?.image_url_cropped}
            badge={badgeFor(card.banlist_info?.ban_tcg)}
            accentColor={accentForCardType(card.type)}
          />
        ))}
      </div>
    </>
  );
}