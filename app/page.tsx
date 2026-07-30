import type { Metadata } from "next";
import Link from "next/link";
import Hero from "@/components/Hero";

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Bienvenido a Duel Hub, el portal para explorar el universo de Yu-Gi-Oh!: arquetipos, lista prohibida, personajes y productos oficiales.",
  openGraph: {
    title: "Duel Hub — El portal del Duelista",
    description:
      "Bienvenido a Duel Hub, el portal para explorar el universo de Yu-Gi-Oh!: arquetipos, lista prohibida, personajes y productos oficiales.",
  },
};

const sections = [
  {
    href: "/archetypes",
    title: "Arquetipos",
    description:
      "Recorre las familias de cartas que definen los mazos más icónicos del juego, con una carta representativa de cada una.",
  },
  {
    href: "/banlist",
    title: "Lista Prohibida",
    description:
      "Consulta qué cartas están prohibidas, limitadas o semi-limitadas actualmente en el formato TCG.",
  },
  {
    href: "/characters",
    title: "Personajes",
    description:
      "Conoce a los protagonistas del anime y manga, su serie de origen y la carta que los representa en el campo de batalla.",
  },
  {
    href: "/products",
    title: "Productos",
    description:
      "Explora sets, expansiones y mazos de estructura oficiales, con la información de cada lanzamiento.",
  },
];

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="Bienvenido, Duelista"
        title="Duel Hub"
        description="Tu portal hacia el mundo de Yu-Gi-Oh!: arquetipos, la lista prohibida, los héroes del anime y manga, y los productos oficiales, todo en un mismo lugar."
        actions={[
          { href: "/archetypes", label: "Explorar arquetipos" },
          { href: "/products", label: "Ver productos", variant: "secondary" },
        ]}
      />

      <div className="section-title">
        <span className="kicker">Menú principal</span>
        <h2 style={{ margin: 0 }}>¿Qué quieres explorar?</h2>
      </div>

      <div className="link-grid">
        {sections.map((section) => (
          <Link key={section.href} href={section.href} className="link-card">
            <h3>{section.title}</h3>
            <p>{section.description}</p>
          </Link>
        ))}
      </div>
    </>
  );
}