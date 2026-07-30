"use client";

import ErrorState from "@/components/ErrorState";

export default function DecksError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      message="No se pudieron cargar los mazos de estructura. Intenta de nuevo en unos instantes."
      onRetry={reset}
    />
  );
}