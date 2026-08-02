"use client";

import { useState } from "react";
import Card from "@/components/Card";

interface SpellTrapItem {
  id: number;
  name: string;
  desc: string;
  truncated: boolean;
  imageUrl: string | null;
}

interface SpellTrapGridProps {
  initialItems: SpellTrapItem[];
  total: number;
  pageSize: number;
  kind: string;
  race: string;
  label: string;
  accentColor: string;
}

export default function SpellTrapGrid({
  initialItems,
  total,
  pageSize,
  kind,
  race,
  label,
  accentColor,
}: SpellTrapGridProps) {
  const [items, setItems] = useState(initialItems);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasMore = items.length < total;

  async function loadMore() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `/api/spells-traps/${kind}/${encodeURIComponent(race)}?offset=${items.length}&limit=${pageSize}`
      );
      if (!res.ok) throw new Error("Error al cargar más cartas");
      const data = await res.json();
      setItems((prev) => [...prev, ...data.results]);
    } catch {
      setError("No se pudieron cargar más cartas. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="card-grid">
        {items.map((item, index) => (
          <Card
            key={`${item.id}-${index}`}
            eyebrow={label}
            title={item.name}
            description={item.desc + (item.truncated ? "…" : "")}
            imageUrl={item.imageUrl ?? undefined}
            accentColor={accentColor}
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