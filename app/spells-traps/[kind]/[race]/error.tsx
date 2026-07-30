"use client";

import ErrorState from "@/components/ErrorState";

export default function SubtypeError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <ErrorState message="No se pudieron cargar las cartas de esta categoría." onRetry={reset} />;
}