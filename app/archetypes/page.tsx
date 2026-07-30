import type { Metadata } from "next";
import Hero from "@/components/Hero";
import ArchetypeGrid from "@/components/ArchetypeGrid";
import { getArchetypes, getArchetypeSample } from "@/lib/api";
import { mapWithConcurrency } from "@/lib/concurrency";

export const metadata: Metadata = {
  title: "Arquetipos",
  description: "Todos los arquetipos oficiales registrados en la API de YGOPRODeck.",
  openGraph: {
    title: "Arquetipos · Duel Hub",
    description: "Todos los arquetipos oficiales registrados en la API de YGOPRODeck.",
  },
};

const PAGE_SIZE = 40;

export default async function ArchetypesPage() {
  const archetypes = await getArchetypes();
  const firstBatch = archetypes.slice(0, PAGE_SIZE);

  const initialItems = await mapWithConcurrency(firstBatch, 6, async (a) => {
    const card = await getArchetypeSample(a.archetype_name);
    return {
      archetype: a.archetype_name,
      imageUrl: card?.card_images?.[0]?.image_url_cropped ?? null,
    };
  });

  return (
    <>
      <Hero
        eyebrow="Familias de cartas"
        title="Arquetipos"
        description={`Estos son los ${archetypes.length} arquetipos registrados actualmente en la base de datos. Haz clic en uno para ver todos sus miembros con su información detallada.`}
      />

      <div className="section-title">
        <span className="kicker">Mostrando {initialItems.length} de {archetypes.length}</span>
      </div>

      <ArchetypeGrid initialItems={initialItems} total={archetypes.length} pageSize={PAGE_SIZE} />
    </>
  );
}