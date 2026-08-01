import Image from "next/image";
import Link from "next/link";

interface HeroAction {
  href: string;
  label: string;
  variant?: "primary" | "secondary";
}

interface HeroProps {
  eyebrow?: string;
  title: string;
  description: string;
  actions?: HeroAction[];
}

export default function Hero({ eyebrow, title, description, actions }: HeroProps) {
  return (
    <section className="hero">
      {}
      <Image
        src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f1ea70e0-6b84-41e0-945a-9388d618e4a0/dc0ha8w-7530b956-68f7-497f-ab9b-ae71d5100cbd.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi9mMWVhNzBlMC02Yjg0LTQxZTAtOTQ1YS05Mzg4ZDYxOGU0YTAvZGMwaGE4dy03NTMwYjk1Ni02OGY3LTQ5N2YtYWI5Yi1hZTcxZDUxMDBjYmQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.AgCslVL-9PLL6fRP7jeE1YYeAj8UNzcmJL_rQ0uEx3k" 
        alt="Internet icon"
        width={80}
        height={80}
        className="hero-icon"
      />

      {eyebrow && (
        <p
          style={{
            color: "#9c1c31",
            fontWeight: 700,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            fontSize: "0.75rem",
          }}
        >
          {eyebrow}
        </p>
      )}

      <h1 className="ygo-title">{title}</h1>
      <p>{description}</p>

      {actions && actions.length > 0 && (
        <div className="hero-actions">
          {actions.map((action) => (
            <Link
              key={action.href}
              href={action.href}
              className={`btn ${
                action.variant === "secondary" ? "btn-secondary" : "btn-primary"
              }`}
            >
              {action.label}
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
