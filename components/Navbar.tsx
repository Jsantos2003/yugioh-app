import Link from "next/link";
import Image from "next/image";
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
          <Image
            src="/favicon.ico"
            alt="Duel Hub"
            width={30}
            height={30}
            className="brand-icon"
          />
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