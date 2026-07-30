"use client";

import ErrorState from "@/components/ErrorState";

export default function BanlistError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      message="No se pudo cargar la lista prohibida y limitada. Intenta nuevamente en unos segundos."
      onRetry={reset}
    />
  );
}