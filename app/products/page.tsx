import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Productos",
  description:
    "Explora los productos oficiales de Yu-Gi-Oh!: sets de cartas, expansiones y mazos de estructura, con la información de cada lanzamiento.",
  openGraph: {
    title: "Productos · Duel Hub",
    description:
      "Explora los productos oficiales de Yu-Gi-Oh!: sets de cartas, expansiones y mazos de estructura, con la información de cada lanzamiento.",
  },
};

const productSections = [
  {
    href: "/products/sets",
    title: "Sets",
    description:
      "El catálogo completo de sets de cartas lanzados oficialmente, con su código, cantidad de cartas y fecha de lanzamiento.",
  },
  {
    href: "/products/expansions",
    title: "Expansiones",
    description:
      "Paquetes de sobres (Booster Packs) que introducen nuevas cartas y arquetipos al juego.",
  },
  {
    href: "/products/decks",
    title: "Mazos de Estructura",
    description:
      "Structure Decks listos para jugar, pensados para arrancar o reforzar una estrategia específica.",
  },
];

export default function ProductsPage() {
  return (
    <>
      <Hero
        eyebrow="Catálogo oficial"
        title="Productos"
        description="Desde sets generales hasta mazos de estructura temáticos: así se organiza el catálogo de productos de Yu-Gi-Oh!."
      />

      <div className="section-title">
        <span className="kicker">Categorías</span>
      </div>

      <div className="link-grid">
        {productSections.map((section) => (
          <Link key={section.href} href={section.href} className="link-card">
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}