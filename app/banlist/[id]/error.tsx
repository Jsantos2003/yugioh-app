"use client";

import ErrorState from "@/components/ErrorState";

export default function BanlistDetailError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState message="No se pudo cargar la información de esta carta." onRetry={reset} />
  );
}