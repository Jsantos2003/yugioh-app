import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Hero from "@/components/Hero";
import SafeImage from "@/components/SafeImage";
import { getCardById } from "@/lib/api";
import { translateText } from "@/lib/translate";
import { translateCardType, accentForCardType } from "@/lib/translations";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const card = await getCardById(id);
  return {
    title: card?.name ?? "Carta no encontrada",
    description: card
      ? `Información completa de ${card.name}: efecto, ataque, defensa y estado en la lista prohibida.`
      : "Esta carta no se encontró en la base de datos.",
  };
}

function statusLabel(status?: string) {
  if (!status) return "Sin restricción";
  const normalized = status.toLowerCase();
  if (normalized === "banned") return "Prohibida";
  if (normalized === "limited") return "Limitada (máx. 1 copia)";
  if (normalized === "semi-limited") return "Semi-limitada (máx. 2 copias)";
  return status;
}

export default async function BanlistCardDetailPage({ params }: PageProps) {
  const { id } = await params;
  const card = await getCardById(id);

  if (!card) {
    notFound();
  }

  const desc = await translateText(card.desc);

  return (
    <>
      <Link href="/banlist" className="back-link">
        ← Volver a la lista prohibida
      </Link>

      <div
        className="card-detail"
        style={{ borderTop: `4px solid ${accentForCardType(card.type)}` }}
      >
        <div className="card-detail-media">
          <SafeImage src={card.card_images?.[0]?.image_url} alt={card.name} />
        </div>

        <div className="card-detail-info">
          <span className="ygo-card-eyebrow">{translateCardType(card.type)}</span>
          <h1 className="ygo-title" style={{ fontSize: "2.2rem" }}>{card.name}</h1>

          <div className="stat-row">
            {typeof card.atk === "number" && <span className="stat-pill">ATQ {card.atk}</span>}
            {typeof card.def === "number" && <span className="stat-pill">DEF {card.def}</span>}
            {typeof card.level === "number" && <span className="stat-pill">Nivel {card.level}</span>}
            {card.attribute && <span className="stat-pill">{card.attribute}</span>}
            {card.race && <span className="stat-pill">{card.race}</span>}
          </div>

          <p className="ygo-card-desc" style={{ fontSize: "1rem" }}>{desc}</p>

          <div className="ban-status">
            Estado en formato TCG: <strong>{statusLabel(card.banlist_info?.ban_tcg)}</strong>
          </div>
        </div>
      </div>
    </>
  );
}