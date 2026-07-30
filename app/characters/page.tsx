import type { Metadata } from "next";
import Card from "@/components/Card";
import Hero from "@/components/Hero";
import { characters } from "@/lib/characters";
import { getYugipediaInfo } from "@/lib/yugipedia";
import { translateText } from "@/lib/translate";
import { mapWithConcurrency } from "@/lib/concurrency";

export const metadata: Metadata = {
  title: "Personajes",
  description:
    "Duelistas del anime y manga de Yu-Gi-Oh!, desde la era Duel Monsters hasta VRAINS, con biografía traída de Yugipedia.",
  openGraph: {
    title: "Personajes · Duel Hub",
    description:
      "Duelistas del anime y manga de Yu-Gi-Oh!, desde la era Duel Monsters hasta VRAINS, con biografía traída de Yugipedia.",
  },
};

const eras = ["Duel Monsters", "GX", "5D's", "ZEXAL", "ARC-V", "VRAINS"];

export default async function CharactersPage() {
  // Máximo 6 peticiones a Yugipedia en paralelo para no ser bloqueados.
  const enriched = await mapWithConcurrency(characters, 6, async (c) => {
    const info = await getYugipediaInfo(c.slug);
    const rawExtract = info.extract ? info.extract.slice(0, 320) : "";
    const desc = rawExtract
      ? await translateText(rawExtract)
      : "Biografía no disponible en Yugipedia para este personaje por el momento.";
    return { ...c, desc, imageUrl: info.imageUrl ?? undefined };
  });

  return (
    <>
      <Hero
        eyebrow="Anime y manga · Fuente: Yugipedia"
        title="Personajes"
        description="Protagonistas, rivales, villanos y duelistas destacadas desde Duel Monsters hasta VRAINS."
      />

      {eras.map((era) => {
        const group = enriched.filter((c) => c.series === era);
        if (group.length === 0) return null;

        return (
          <div key={era}>
            <div className="section-title">
              <span className="kicker">{era}</span>
              <h2 style={{ margin: 0 }}>{group.length} personajes</h2>
            </div>
            <div className="card-grid">
              {group.map((c, index) => (
                <Card
                  key={`${c.slug}-${index}`}
                  eyebrow={c.role}
                  title={c.name}
                  description={c.desc}
                  imageUrl={c.imageUrl}
                />
              ))}
            </div>
          </div>
        );
      })}
    </>
  );
}