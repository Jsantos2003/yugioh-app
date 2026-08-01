"use client";

import { useState } from "react";
import Card from "@/components/Card";

interface ArchetypeItem {
  archetype: string;
  imageUrl: string | null;
}

interface ArchetypeGridProps {
  initialItems: ArchetypeItem[];
  total: number;
  pageSize: number;
}

export default function ArchetypeGrid({ initialItems, total, pageSize }: ArchetypeGridProps) {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const validItems = items.filter(
    (item): item is ArchetypeItem => typeof item.archetype === "string" && item.archetype.length > 0
  );

  const hasMore = items.length < total;

  async function loadMore() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/archetypes?offset=${items.length}&limit=${pageSize}`);
      if (!res.ok) throw new Error("Error al cargar más arquetipos");
      const data = await res.json();
      setItems((prev) => [...prev, ...data.results]);
    } catch {
      setError("No se pudieron cargar más arquetipos. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="card-grid">
        {validItems.map((item, index) => (
          <Card
            key={`${item.archetype}-${index}`}
            href={`/archetypes/${encodeURIComponent(item.archetype)}`}
            eyebrow="Arquetipo"
            title={item.archetype}
            description="Ver todos los miembros →"
            imageUrl={item.imageUrl ?? undefined}
          />
        ))}
      </div>

      {error && (
        <p style={{ color: "#ff8a9a", textAlign: "center", marginTop: 20 }}>{error}</p>
      )}

      {hasMore && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
          <button className="btn btn-primary" onClick={loadMore} disabled={loading}>
            {loading ? "Cargando..." : `Cargar más (${items.length} de ${total})`}
          </button>
        </div>
      )}
    </>
  );
}