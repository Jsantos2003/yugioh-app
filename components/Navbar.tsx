import Link from "next/link";
import CartWidget from "@/components/CartWidget";
import SearchBar from "@/components/SearchBar";

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
          <svg className="brand-icon" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <circle cx="32" cy="32" r="30" fill="none" stroke="#e2b23c" strokeWidth="2" />
            <path d="M12 32c6-14 34-14 40 0-6 14-34 14-40 0z" fill="none" stroke="#e2b23c" strokeWidth="2" />
            <circle cx="32" cy="32" r="8" fill="#e2b23c" />
            <circle cx="32" cy="32" r="3.2" fill="#0b0b12" />
          </svg>
          <span className="brand-text">Duel Hub</span>
        </Link>

        <SearchBar />

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