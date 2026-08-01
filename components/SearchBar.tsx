"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  }

  return (
    <form className="search-bar" onSubmit={handleSubmit} role="search">
      <input
        type="search"
        placeholder="Buscar cartas, arquetipos, personajes..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Buscar en Duel Hub"
      />
      <button type="submit" aria-label="Buscar">
        🔍
      </button>
    </form>
  );
}