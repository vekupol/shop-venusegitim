"use client";
import { useCart } from "@/lib/cart-store";

export default function CartBadge() {
  const count = useCart(s => s.count());
  if (count === 0) return null;
  return (
    <span className="ml-1 inline-flex items-center justify-center text-xs
                     bg-white text-primary rounded-full w-5 h-5">
      {count}
    </span>
  );
}
