"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { priceForSetCode } from "@/lib/pricing";

interface ProductCardProps {
  code: string;
  name: string;
  numCards: number;
  date?: string;
  categoryLabel: string;
}

export default function ProductCard({ code, name, numCards, date, categoryLabel }: ProductCardProps) {
  const { addItem } = useCart();
  const [imgError, setImgError] = useState(false);
  const price = priceForSetCode(code);
  const imageUrl = `https://images.ygoprodeck.com/images/sets/${code}.jpg`;

  return (
    <article className="ygo-card">
      <div className="ygo-card-media">
        {!imgError ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageUrl} alt={name} onError={() => setImgError(true)} />
        ) : (
          <div className="ygo-card-media-empty">🂠</div>
        )}
      </div>
      <div className="ygo-card-body">
        <span className="ygo-card-eyebrow">{categoryLabel} · {code}</span>
        <h3 className="ygo-card-title">{name}</h3>
        <p className="ygo-card-desc">
          {numCards} cartas · lanzado el {date ?? "fecha desconocida"}.
        </p>
        <div className="product-footer">
          <span className="product-price">${price.toFixed(2)}</span>
          <button
            className="btn btn-primary btn-small"
            onClick={() => addItem({ code, name, price })}
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
}