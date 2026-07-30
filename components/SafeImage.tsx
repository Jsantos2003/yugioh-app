"use client";

import { useState } from "react";

interface SafeImageProps {
  src?: string;
  alt: string;
}

export default function SafeImage({ src, alt }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <div className="ygo-card-media-empty">🂠</div>;
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} onError={() => setFailed(true)} />;
}