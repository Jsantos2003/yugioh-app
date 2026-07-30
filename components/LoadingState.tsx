interface LoadingStateProps {
  message?: string;
}

export default function LoadingState({ message = "Invocando datos desde el Reino de las Sombras..." }: LoadingStateProps) {
  return (
    <div className="state-panel" role="status" aria-live="polite">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
}