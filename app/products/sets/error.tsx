"use client";

import ErrorState from "@/components/ErrorState";

export default function SetsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      message="No se pudo cargar el catálogo de sets. Verifica tu conexión e intenta de nuevo."
      onRetry={reset}
    />
  );
}