"use client";

import ErrorState from "@/components/ErrorState";

export default function SearchError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorState message="No se pudo completar la búsqueda. Intenta de nuevo." onRetry={reset} />;
}