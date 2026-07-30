import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>
          Duel Hub — página con  derechos reservados @JulioSantos2006 & YGOPRODeck.
        </span>
        <nav aria-label="Navegación de pie de página">
          <div className="footer-links">
            <Link href="/archetypes">Arquetipos</Link>
            <Link href="/banlist">Lista Prohibida</Link>
            <Link href="/characters">Personajes</Link>
            <Link href="/products">Productos</Link>
            <Link href="/spells-traps">Mágicas y Trampas</Link>
          </div>
        </nav>
      </div>
    </footer>
  );
}