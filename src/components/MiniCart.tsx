"use client";
import { useCart } from "@/lib/cart-store";
import { fmtTRY } from "@/lib/price";

export default function MiniCart() {
  const { items, remove, setQty, totalKurus, clear } = useCart();
  if (items.length === 0) return <div>Sepet boş.</div>;

  return (
    <div className="space-y-3">
      {items.map(it => (
        <div key={it.id} className="flex items-center justify-between gap-3">
          <div className="min-w-0">
            <div className="font-medium text-primary truncate">{it.name}</div>
            <div className="text-foreground/70 text-sm">{fmtTRY(it.priceKurus)}</div>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-2 border rounded" onClick={() => setQty(it.id, it.qty - 1)}>-</button>
            <span className="w-6 text-center">{it.qty}</span>
            <button className="px-2 border rounded" onClick={() => setQty(it.id, it.qty + 1)}>+</button>
            <button className="px-2 border rounded text-danger" onClick={() => remove(it.id)}>Sil</button>
          </div>
        </div>
      ))}
      <div className="font-semibold">Toplam: {fmtTRY(totalKurus())}</div>
      <div className="flex gap-2">
        <a href="/checkout" className="px-4 py-2 rounded-full bg-primary text-white hover:opacity-90">Ödemeye Geç</a>
        <button className="px-3 py-2 border rounded" onClick={clear}>Temizle</button>
      </div>
    </div>
  );
}
