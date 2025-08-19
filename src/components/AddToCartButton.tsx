"use client";
import { useCart } from "@/lib/cart-store";

export default function AddToCartButton(props: { id: string; name: string; priceKurus: number }) {
  const add = useCart(s => s.add);
  return (
    <button
      onClick={() => add(props, 1)}
      className="px-4 py-2 rounded-full bg-primary text-white border-2 border-transparent
                 hover:bg-transparent hover:text-primary hover:border-primary transition"
      aria-label="Sepete Ekle"
    >
      Sepete Ekle
    </button>
  );
}
