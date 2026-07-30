import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import Hero from "@/components/Hero";
import { getCardSets } from "@/lib/api";

export const metadata: Metadata = {
  title: "Sets",
  description: "Catálogo de sets de cartas de Yu-Gi-Oh!, con código, cantidad de cartas y fecha de lanzamiento.",
  openGraph: {
    title: "Sets · Productos · Duel Hub",
    description: "Catálogo de sets de cartas de Yu-Gi-Oh!, con código, cantidad de cartas y fecha de lanzamiento.",
  },
};

export default async function SetsPage() {
  const allSets = await getCardSets();
  const sets = allSets
    .filter((s) => s.tcg_date)
    .sort((a, b) => (b.tcg_date! > a.tcg_date! ? 1 : -1))
    .slice(0, 48);

  return (
    <>
      <Hero eyebrow="Productos" title="Sets" description="El catálogo general de sets de cartas: la unidad básica de lanzamiento del juego." />
      <div className="section-title">
        <span className="kicker">Mostrando {sets.length} de {allSets.length} sets</span>
      </div>
      <div className="card-grid">
        {sets.map((set, index) => (
          <ProductCard
            key={`${set.set_code}-${index}`}
            code={set.set_code}
            name={set.set_name}
            numCards={set.num_of_cards}
            date={set.tcg_date}
            categoryLabel="Set"
          />
        ))}
      </div>
    </>
  );
}