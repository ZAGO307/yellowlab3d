"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "/", label: "Accueil" },
    { href: "/services", label: "Services & Tarifs" },
    { href: "/order", label: "Commander" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-black/95 backdrop-blur border-b border-yellow-400/20" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-yellow-400 flex items-center justify-center" style={{clipPath:'polygon(0 0,calc(100% - 8px) 0,100% 8px,100% 100%,8px 100%,0 calc(100% - 8px))'}}>
            <span className="font-display text-black text-lg leading-none">Y</span>
          </div>
          <span className="font-display text-2xl tracking-wider text-white group-hover:text-yellow-400 transition-colors">
            YellowLAB<span className="text-yellow-400">3D</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm tracking-widest uppercase text-gray-400 hover:text-yellow-400 transition-colors font-body"
            >
              {l.label}
            </Link>
          ))}
          <Link href="/order" className="btn-primary text-base px-6 py-3">
            Devis Gratuit
          </Link>
        </nav>

        {/* Mobile burger */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-white hover:text-yellow-400 transition-colors"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-black/98 border-b border-yellow-400/30 px-6 pb-8 pt-4">
          <nav className="flex flex-col gap-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-lg tracking-widest uppercase text-gray-300 hover:text-yellow-400 transition-colors py-2 border-b border-gray-800"
              >
                {l.label}
              </Link>
            ))}
            <Link href="/order" onClick={() => setOpen(false)} className="btn-primary mt-4 text-center justify-center">
              Devis Gratuit
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
