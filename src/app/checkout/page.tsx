"use client";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart-store";
import { fmtTRY } from "@/lib/price";

export default function CheckoutPage() {
  const { items, totalKurus } = useCart();
  const [token, setToken] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (items.length === 0) {
        setErr("Sepet boş.");
        return;
      }
      try {
        // PayTR sepet formatı: [urun_adi, birim_fiyat (TL string), adet]
        const basket: [string, string, number][] = items.map((i) => [
          i.name,
          (i.priceKurus / 100).toFixed(2),
          i.qty,
        ]);

        const res = await fetch("/api/paytr/token", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: "musteri@example.com",
            basket,
          }),
        });

        const data = await res.json();
        if (data.status === "success") {
          setToken(data.token);
        } else {
          setErr(data.reason || "Token alınamadı.");
        }
      } catch (e: any) {
        setErr(e.message || "Bilinmeyen hata");
      }
    })();
  }, [items]);

  if (err) {
    return (
      <div className="space-y-3">
        <h2 className="text-3xl poetsen-one-regular text-primary">Ödeme</h2>
        <p className="text-danger">{err}</p>
        <a href="/products" className="btn-nav">Ürünlere Dön</a>
      </div>
    );
  }

  if (!token) {
    return (
      <div className="space-y-3">
        <h2 className="text-3xl poetsen-one-regular text-primary">Ödeme</h2>
        <div>Toplam: {fmtTRY(totalKurus())}</div>
        <div>Ödeme sayfası hazırlanıyor…</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-3xl poetsen-one-regular text-primary">Ödeme</h2>
      <div>Toplam: {fmtTRY(totalKurus())}</div>

      {/* iFrame */}
      <script src="https://www.paytr.com/js/iframeResizer.min.js"></script>
      <iframe
        id="paytriframe"
        src={`https://www.paytr.com/odeme/guvenli/${token}`}
        frameBorder={0}
        scrolling="no"
        style={{ width: "100%", height: 850, borderRadius: 8, background: "#fff" }}
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `iFrameResize({}, '#paytriframe')`,
        }}
      />
    </div>
  );
}
