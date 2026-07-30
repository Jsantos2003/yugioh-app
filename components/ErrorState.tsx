"use client";

interface ErrorStateProps {
  message?: string;
  onRetry?: () => void;
}

export default function ErrorState({
  message = "No se pudo invocar la información desde la API de YGOPRODeck. Puede que el servidor esté fuera de servicio o tu conexión haya fallado.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="state-panel" role="alert">
      <h2>⚠ Duelo interrumpido</h2>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-primary" onClick={onRetry} style={{ cursor: "pointer" }}>
          Intentar de nuevo
        </button>
      )}
    </div>
  );
}