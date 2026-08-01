import type { Metadata } from "next";
import Card from "@/components/Card";
import Hero from "@/components/Hero";
import { getArchetypes, searchCardsByName } from "@/lib/api";
import { characters } from "@/lib/characters";
import { translateCardType, accentForCardType } from "@/lib/translations";

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `Resultados para "${q}"` : "Buscar",
    description: `Resultados de busqueda en Duel Hub para "${q ?? ""}".`,
  };
}

export default async function SearchPage({ searchParams }: PageProps) {
  const { q } = await searchParams;
  const query = (q ?? "").trim();

  if (!query) {
    return (
      <Hero
        eyebrow="Busqueda"
        title="Buscar en Duel Hub"
        description="Escribe algo en la barra de arriba para buscar cartas, arquetipos y personajes."
      />
    );
  }

  const lowerQuery = query.toLowerCase();

  const [cardResults, allArchetypes] = await Promise.all([
    searchCardsByName(query),
    getArchetypes(),
  ]);

  const archetypeResults = allArchetypes
    .filter((a) => a.archetype_name.toLowerCase().includes(lowerQuery))
    .slice(0, 12);

  const characterResults = characters
    .filter(
      (c) => c.name.toLowerCase().includes(lowerQuery) || c.series.toLowerCase().includes(lowerQuery)
    )
    .slice(0, 12);

  const totalResults = cardResults.length + archetypeResults.length + characterResults.length;

  const truncate = (text: string, max = 140) =>
    text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;

  return (
    <>
      <Hero
        eyebrow="Busqueda"
        title={query}
        description={
          totalResults > 0
            ? `${totalResults} resultado(s) encontrados en cartas, arquetipos y personajes.`
            : "No se encontraron resultados. Intenta con otro termino."
        }
      />

      {cardResults.length > 0 && (
        <>
          <div className="section-title">
            <span className="kicker">Cartas ({cardResults.length})</span>
          </div>
          <div className="card-grid">
            {cardResults.map((card, index) => {
              const isBanlistEligible = Boolean(card.banlist_info?.ban_tcg);
              const cardKey = `${card.id}-${index}`;
              return (
                <Card
                  key={cardKey}
                  href={isBanlistEligible ? `/banlist/${card.id}` : undefined}
                  eyebrow={translateCardType(card.type)}
                  title={card.name}
                  description={truncate(card.desc)}
                  imageUrl={card.card_images?.[0]?.image_url_cropped}
                  accentColor={accentForCardType(card.type)}
                />
              );
            })}
          </div>
        </>
      )}

      {archetypeResults.length > 0 && (
        <>
          <div className="section-title">
            <span className="kicker">Arquetipos ({archetypeResults.length})</span>
          </div>
          <div className="card-grid">
            {archetypeResults.map((archetype) => (
              <Card
                key={archetype.archetype_name}
                href={`/archetypes/${encodeURIComponent(archetype.archetype_name)}`}
                title={archetype.archetype_name}
                description="Ver todos los miembros de este arquetipo"
                accentColor="#6b7cff"
              />
            ))}
          </div>
        </>
      )}

      {characterResults.length > 0 && (
        <>
          <div className="section-title">
            <span className="kicker">Personajes ({characterResults.length})</span>
          </div>
          <div className="card-grid">
            {characterResults.map((character) => (
              <Card
                key={character.slug}
                href="/characters"
                title={character.name}
                description={`${character.role} · ${character.series}`}
                accentColor="#f59e0b"
              />
            ))}
          </div>
        </>
      )}
    </>
  );
}
