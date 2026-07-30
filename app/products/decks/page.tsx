import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import { getCardSets } from "@/lib/api";

export const metadata: Metadata = {
  title: "Mazos de Estructura",
  description: "Structure Decks oficiales de Yu-Gi-Oh!, listos para jugar y pensados para una estrategia específica.",
  openGraph: {
    title: "Mazos de Estructura · Productos · Duel Hub",
    description: "Structure Decks oficiales de Yu-Gi-Oh!, listos para jugar y pensados para una estrategia específica.",
  },
};

export default async function DecksPage() {
  const allSets = await getCardSets();
  const decks = allSets
    .filter((s) => /structure deck/i.test(s.set_name) && s.tcg_date)
    .sort((a, b) => (b.tcg_date! > a.tcg_date! ? 1 : -1))
    .slice(0, 48);

  return (
    <>
      <Hero eyebrow="Productos" title="Mazos de Estructura" description="Cada Structure Deck entrega un mazo de 40+ cartas construido alrededor de una estrategia, listo para jugar." />
      <div className="section-title">
        <span className="kicker">{decks.length} mazos de estructura</span>
      </div>
      <div className="card-grid">
        {decks.map((set, index) => (
          <ProductCard
            key={`${set.set_code}-${index}`}
            code={set.set_code}
            name={set.set_name}
            numCards={set.num_of_cards}
            date={set.tcg_date}
            categoryLabel="Mazo"
          />
        ))}
      </div>
    </>
  );
}