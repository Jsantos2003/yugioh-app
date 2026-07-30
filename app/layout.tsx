import type { Metadata } from "next";
import { Anton, Rajdhani } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CartProvider } from "@/lib/cart-context";
import "./globals.css";

const anton = Anton({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-anton",
  display: "swap",
});

const rajdhani = Rajdhani({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-rajdhani",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Duel Hub — El portal del Duelista",
    template: "%s · Duel Hub",
  },
  description:
    "Duel Hub: explora arquetipos, la lista prohibida y limitada, personajes del anime y manga, y productos oficiales de Yu-Gi-Oh!.",
  openGraph: {
    title: "Duel Hub — El portal del Duelista",
    description:
      "Explora arquetipos, la lista prohibida y limitada, personajes del anime y manga, y productos oficiales de Yu-Gi-Oh!.",
    siteName: "Duel Hub",
    type: "website",
    locale: "es_ES",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${anton.variable} ${rajdhani.variable}`}>
      <body>
        <CartProvider>
          <Navbar />
          <main className="page-shell">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}