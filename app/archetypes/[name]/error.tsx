"use client";

import ErrorState from "@/components/ErrorState";

export default function ArchetypeDetailError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      message="No se pudieron cargar los miembros de este arquetipo."
      onRetry={reset}
    />
  );
}