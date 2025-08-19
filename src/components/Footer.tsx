// src/components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-surface text-primary">
      <div className="brand-container py-4 text-center">
        © {new Date().getFullYear()} VenusEğitim — Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
