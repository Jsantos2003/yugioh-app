"use client";

import ErrorState from "@/components/ErrorState";

export default function ExpansionsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      message="No se pudieron cargar las expansiones. Intenta de nuevo en unos instantes."
      onRetry={reset}
    />
  );
}