import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import type { ReactNode } from "react";

interface CardProps {
  eyebrow?: string;
  title: string;
  description: string;
  imageUrl?: string;
  badge?: ReactNode;
  accentColor?: string;
  href?: string;
}

export default function Card({
  eyebrow,
  title,
  description,
  imageUrl,
  badge,
  accentColor,
  href,
}: CardProps) {
  const style = accentColor ? { borderTop: `4px solid ${accentColor}` } : undefined;

  const content = (
    <>
      <div className="ygo-card-media">
        <SafeImage src={imageUrl} alt={title} />
      </div>
      <div className="ygo-card-body">
        {eyebrow && <span className="ygo-card-eyebrow">{eyebrow}</span>}
        <h3 className="ygo-card-title">{title}</h3>
        <p className="ygo-card-desc">{description}</p>
        {badge}
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className="ygo-card" style={style}>
        {content}
      </Link>
    );
  }

  return (
    <article className="ygo-card" style={style}>
      {content}
    </article>
  );
}