// src/app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Venus Shop",
  description: "Mini e-ticaret uygulaması",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body>
        <Navbar />
        <main className="brand-container py-6 min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
