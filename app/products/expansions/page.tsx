import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import { getCardSets } from "@/lib/api";

export const metadata: Metadata = {
  title: "Expansiones",
  description: "Paquetes de sobres (Booster Packs) de Yu-Gi-Oh! que introducen nuevas cartas y arquetipos al juego.",
  openGraph: {
    title: "Expansiones · Productos · Duel Hub",
    description: "Paquetes de sobres (Booster Packs) de Yu-Gi-Oh! que introducen nuevas cartas y arquetipos al juego.",
  },
};

export default async function ExpansionsPage() {
  const allSets = await getCardSets();
  const expansions = allSets
    .filter((s) => /booster|pack/i.test(s.set_name) && s.tcg_date)
    .sort((a, b) => (b.tcg_date! > a.tcg_date! ? 1 : -1))
    .slice(0, 48);

  return (
    <>
      <Hero eyebrow="Productos" title="Expansiones" description="Los Booster Packs renuevan el metajuego con nuevas cartas, mecánicas y arquetipos en cada lanzamiento." />
      <div className="section-title">
        <span className="kicker">{expansions.length} expansiones</span>
      </div>
      <div className="card-grid">
        {expansions.map((set, index) => (
          <ProductCard
            key={`${set.set_code}-${index}`}
            code={set.set_code}
            name={set.set_name}
            numCards={set.num_of_cards}
            date={set.tcg_date}
            categoryLabel="Expansión"
          />
        ))}
      </div>
    </>
  );
}