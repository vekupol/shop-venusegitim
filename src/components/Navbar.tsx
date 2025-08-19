// src/components/Navbar.tsx
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import CartBadge from "./CartBadge";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", next);
    document.documentElement.classList.toggle("dark");
    setTheme(next);
  };

  return (
    <nav className="nav-on-primary  text-white dark:bg-black dark:text-white transition-colors duration-300">
      <div className="brand-container flex items-center justify-between py-4">
        <Link href="/" className="text-4xl poetsen-one-regular">
          venüs eğitim mağaza
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/products" className="btn-nav">Ürünler</Link>
          <Link href="/cart" className="btn-nav">Sepet</Link>
          <Link href="/cart" className="btn-nav">Sepet <CartBadge /></Link>
          <button
            onClick={toggleTheme}
            className="btn-nav w-10 h-10 flex items-center justify-center"
            aria-label="Tema Değiştir"
            title="Gece/Gündüz Modu"
          >
            {theme === "dark" ? "🌞" : "🌙"}
          </button>
        </div>
      </div>
    </nav>
  );
}
