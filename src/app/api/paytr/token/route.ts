import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const API_URL = "https://www.paytr.com/odeme/api/get-token";

// Basit base64 yardımcı
const b64 = (s: string) => Buffer.from(s, "utf8").toString("base64");

export async function POST(req: NextRequest) {
  try {
    // İstemciden beklenen minimal payload:
    // { email: string; basket: [name, unitPriceString, qty][] }
    const { email, basket } = (await req.json()) as {
      email: string;
      basket: [string, string, number][];
    };

    if (!email || !Array.isArray(basket) || basket.length === 0) {
      return NextResponse.json(
        { status: "failed", reason: "Geçersiz istek" },
        { status: 400 },
      );
    }

    const merchant_id = process.env.PAYTR_MERCHANT_ID!;
    const merchant_key = process.env.PAYTR_MERCHANT_KEY!;
    const merchant_salt = process.env.PAYTR_MERCHANT_SALT!;
    const merchant_ok_url = process.env.PAYTR_OK_URL!;
    const merchant_fail_url = process.env.PAYTR_FAIL_URL!;
    const test_mode = Number(process.env.PAYTR_TEST_MODE || 0);

    // Zorunlu alanlar
    const merchant_oid = "OID" + Date.now(); // örnek sipariş no
    const user_ip =
      (req.headers.get("x-forwarded-for") || "127.0.0.1").split(",")[0].trim();

    // İsteğe bağlı alanlar (örnek)
    const user_name = "Müşteri";
    const user_address = "İstanbul";
    const user_phone = "05550000000";
    const currency = "TL";
    const no_installment = 0;
    const max_installment = 0;

    // Toplam tutar (kuruş)
    const payment_amount = basket.reduce((sum, [, unit, qty]) => {
      const krs = Math.round(parseFloat(unit) * 100);
      return sum + krs * qty;
    }, 0);

    const user_basket = b64(JSON.stringify(basket));

    // Hash metni
    const hash_str =
      merchant_id +
      user_ip +
      merchant_oid +
      email +
      payment_amount +
      user_basket +
      no_installment +
      max_installment +
      currency +
      test_mode +
      merchant_salt;

    const paytr_token = crypto
      .createHmac("sha256", merchant_key)
      .update(hash_str)
      .digest("base64");

    const form = new URLSearchParams({
      merchant_id,
      user_ip,
      merchant_oid,
      email,
      payment_amount: String(payment_amount),
      currency,
      user_basket,
      no_installment: String(no_installment),
      max_installment: String(max_installment),
      paytr_token,
      user_name,
      user_address,
      user_phone,
      merchant_ok_url,
      merchant_fail_url,
      test_mode: String(test_mode),
      iframe_v2: "1",
    });

    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: form.toString(),
      cache: "no-store",
    });

    const data = await res.json();
    // Örn: { status: "success", token: "..." } veya { status:"failed", reason:"..." }
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json(
      { status: "failed", reason: e?.message || "Sunucu hatası" },
      { status: 500 },
    );
  }
}
