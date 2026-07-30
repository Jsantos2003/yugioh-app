import Image from "next/image";
import Link from "next/link";
import CartWidget from "@/components/CartWidget";

const links = [
  { href: "/archetypes", label: "Arquetipos" },
  { href: "/banlist", label: "Lista Prohibida" },
  { href: "/spells-traps", label: "Mágicas y Trampas" },
  { href: "/characters", label: "Personajes" },
  { href: "/products", label: "Productos" },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <Link href="/" className="brand">
          {/* 👇 Ícono externo en lugar del SVG */}
          <Image
            src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f1ea70e0-6b84-41e0-945a-9388d618e4a0/dc0ha8w-7530b956-68f7-497f-ab9b-ae71d5100cbd.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiIvZi9mMWVhNzBlMC02Yjg0LTQxZTAtOTQ1YS05Mzg4ZDYxOGU0YTAvZGMwaGE4dy03NTMwYjk1Ni02OGY3LTQ5N2YtYWI5Yi1hZTcxZDUxMDBjYmQucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.AgCslVL-9PLL6fRP7jeE1YYeAj8UNzcmJL_rQ0uEx3k"
            alt="Internet icon"
            width={50}   // 👈 ajusta el tamaño aquí
            height={50}  // 👈 puedes agrandarlo cambiando estos valores
            className="brand-icon"
          />
          <span className="brand-text">Duel Hub</span>
        </Link>

        <nav aria-label="Navegación principal">
          <ul className="nav-links">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <CartWidget />
      </div>
    </header>
  );
}
