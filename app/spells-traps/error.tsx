"use client";

import ErrorState from "@/components/ErrorState";

export default function SpellsTrapsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState message="No se pudo cargar el catálogo de Magias y Trampas." onRetry={reset} />
  );
}