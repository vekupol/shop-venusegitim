export default function FailPage() {
  return (
    <div className="space-y-3">
      <h2 className="text-3xl poetsen-one-regular text-danger">Ödeme Başarısız</h2>
      <p>Ödeme tamamlanamadı. Lütfen tekrar deneyin.</p>
      <a href="/cart" className="btn-nav">Sepete Dön</a>
    </div>
  );
}
