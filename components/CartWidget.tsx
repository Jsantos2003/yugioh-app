"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

export default function CartWidget() {
  const { items, removeItem, total, count } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <div className="cart-widget">
      <button
        className="cart-button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label="Abrir carrito"
      >
        🛒 <span className="cart-count">{count}</span>
      </button>

      {open && (
        <div className="cart-panel">
          <h4>Tu carrito</h4>
          {items.length === 0 ? (
            <p className="cart-empty">Aún no has agregado productos.</p>
          ) : (
            <>
              <ul className="cart-list">
                {items.map((item) => (
                  <li key={item.code} className="cart-item">
                    <span>{item.name} × {item.quantity}</span>
                    <div className="cart-item-actions">
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                      <button onClick={() => removeItem(item.code)} aria-label={`Quitar ${item.name}`}>
                        ✕
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="cart-total">
                <span>Total</span>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}