import crypto from "crypto";
import type { NextRequest } from "next/server";

// PayTR, x-www-form-urlencoded ile POST yapar.
export async function POST(req: NextRequest) {
  const raw = await req.text();
  const params = new URLSearchParams(raw);

  const status = params.get("status") || "";
  const merchant_oid = params.get("merchant_oid") || "";
  const total_amount = params.get("total_amount") || "";
  const hash = params.get("hash") || "";

  const merchant_key = process.env.PAYTR_MERCHANT_KEY!;
  const merchant_salt = process.env.PAYTR_MERCHANT_SALT!;

  // Doğrulama
  const tokenStr = merchant_oid + merchant_salt + status + total_amount;
  const myHash = crypto
    .createHmac("sha256", merchant_key)
    .update(tokenStr)
    .digest("base64");

  if (hash !== myHash) {
    // Hatalı istek (PayTR'a "BAD" dönme)
    return new Response("BAD", { status: 400 });
  }

  // TODO: merchant_oid ile siparişi DB'de bul ve status === "success" ise "paid" yap.
  // idempotent davran (aynı bildirim 2 kez gelirse de sorun çıkmasın).

  // PayTR OK bekler:
  return new Response("OK", { status: 200 });
}
