"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";
import { C } from "@/lib/styles";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { cartCount, wishlist, setCartOpen, setSearchOpen } = useStore();

  useEffect(() => {
    setMounted(true);
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const nav: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
    backgroundColor: scrolled ? "rgba(9,9,11,0.92)" : "transparent",
    backdropFilter: scrolled ? "blur(20px)" : "none",
    borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
    transition: "all 0.4s ease",
  };
  const inner: React.CSSProperties = {
    maxWidth: "1280px", margin: "0 auto", padding: "0 24px",
    height: "70px", display: "flex", alignItems: "center", justifyContent: "space-between",
  };
  const logo: React.CSSProperties = {
    display: "flex", alignItems: "center", gap: "10px",
    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "18px", color: "#fff",
    textDecoration: "none",
  };
  const logoMark: React.CSSProperties = {
    width: "32px", height: "32px", borderRadius: "8px",
    background: "linear-gradient(135deg, #7C5CFF, #B45CFF)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: "14px", fontWeight: 700, color: "#fff", flexShrink: 0,
  };
  const iconBtn: React.CSSProperties = {
    width: "38px", height: "38px", borderRadius: "10px",
    border: `1px solid ${C.border}`, background: "transparent",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: C.textSecondary, position: "relative", transition: "all 0.2s",
    cursor: "pointer",
  };
  const badge: React.CSSProperties = {
    position: "absolute", top: "-6px", right: "-6px",
    width: "18px", height: "18px", borderRadius: "50%",
    background: C.accent, color: "#fff",
    fontSize: "10px", fontWeight: 700,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontFamily: "'Space Grotesk', sans-serif",
  };

  const navLinks = [
    { href: "/shop", label: "Shop" },
    { href: "/shop?filter=collections", label: "Collections" },
    { href: "/shop?filter=new", label: "New Drops" },
    { href: "#", label: "About" },
  ];

  // counts only after mount to avoid SSR/client mismatch
  const cartQty = mounted ? cartCount() : 0;
  const wishQty = mounted ? wishlist.length : 0;

  return (
    <nav style={nav}>
      <div style={inner}>
        {/* Logo */}
        <Link href="/" style={logo}>
          <div style={logoMark}>A</div>
          AURA
        </Link>

        {/* Desktop nav links */}
        <ul style={{ display: "flex", alignItems: "center", gap: "32px", listStyle: "none", margin: 0, padding: 0 }}>
          {navLinks.map((l) => (
            <li key={l.href} style={{ display: "none" }} className="desktop-nav-item">
              <Link href={l.href}
                style={{ fontSize: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, color: C.textSecondary, textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = C.textSecondary)}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <button style={iconBtn} onClick={() => setSearchOpen(true)}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.accent; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.color = C.textSecondary; }}>
            <Search size={16} />
          </button>

          <button style={iconBtn}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.accent; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.color = C.textSecondary; }}>
            <Heart size={16} />
            {wishQty > 0 && <span style={badge}>{wishQty}</span>}
          </button>

          <button style={{ ...iconBtn, background: C.accent, borderColor: C.accent, color: "#fff" }}
            onClick={() => setCartOpen(true)}>
            <ShoppingBag size={16} />
            {cartQty > 0 && <span style={badge}>{cartQty}</span>}
          </button>

          <button style={{ ...iconBtn, display: "flex" }} onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ background: "rgba(9,9,11,0.98)", backdropFilter: "blur(20px)", borderTop: `1px solid ${C.border}`, padding: "20px 24px" }}>
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)}
              style={{ display: "block", padding: "14px 0", fontSize: "16px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, color: C.textSecondary, borderBottom: `1px solid ${C.border}`, textDecoration: "none" }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}

      <style>{`
        @media (min-width: 768px) {
          .desktop-nav-item { display: list-item !important; }
        }
      `}</style>
    </nav>
  );
}
