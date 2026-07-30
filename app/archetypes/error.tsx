"use client";

import ErrorState from "@/components/ErrorState";

export default function ArchetypesError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      message="No se pudieron cargar los arquetipos. La API de YGOPRODeck podría no estar disponible en este momento."
      onRetry={reset}
    />
  );
}