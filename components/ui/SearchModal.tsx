"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { useStore } from "@/lib/store";
import { products } from "@/data/products";
import { useRouter } from "next/navigation";
import { C } from "@/lib/styles";

const trending = ["Nike Air Max", "Yeezy 350", "Jordan 1", "Supreme Box Logo", "New Balance"];

export function SearchModal() {
  const { searchOpen, setSearchOpen } = useStore();
  const [query, setQuery] = useState("");
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const results = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      })
    : [];

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      setQuery("");
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setSearchOpen]);

  const go = (q: string) => {
    setRecentSearches((prev) => [q, ...prev.filter((s) => s !== q)].slice(0, 5));
    setSearchOpen(false);
    router.push(`/shop?q=${encodeURIComponent(q)}`);
  };

  const labelStyle: React.CSSProperties = {
    fontSize: "10px", color: C.textMuted, fontFamily: "'Space Grotesk', sans-serif",
    textTransform: "uppercase", letterSpacing: "0.14em", marginBottom: "12px",
    display: "flex", alignItems: "center", gap: "6px",
  };
  const chipBtn: React.CSSProperties = {
    display: "block", width: "100%", textAlign: "left", padding: "9px 12px",
    background: "none", border: "none", borderRadius: "10px",
    color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "14px",
    cursor: "pointer", transition: "all 0.15s",
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setSearchOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "flex-start", justifyContent: "center", paddingTop: "80px", padding: "80px 24px 24px", background: "rgba(9,9,11,0.88)", backdropFilter: "blur(24px)" }}>

          <motion.div
            initial={{ opacity: 0, y: -16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.97 }}
            transition={{ type: "spring", damping: 22, stiffness: 320 }}
            onClick={(e) => e.stopPropagation()}
            style={{ width: "100%", maxWidth: "620px", background: C.card, borderRadius: "20px", border: `1px solid ${C.borderLight}`, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.7)" }}>

            {/* Input row */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", padding: "18px 20px", borderBottom: `1px solid ${C.border}` }}>
              <Search size={20} color={C.accent} style={{ flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && query.trim()) go(query.trim()); }}
                placeholder="Search sneakers, brands, styles..."
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "16px", fontFamily: "'Inter', sans-serif" }}
              />
              {query && (
                <button onClick={() => setQuery("")} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, display: "flex", padding: "4px" }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#fff")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = C.textMuted)}>
                  <X size={16} />
                </button>
              )}
              <kbd style={{ padding: "4px 8px", background: C.bg, borderRadius: "6px", fontSize: "11px", color: C.textMuted, fontFamily: "'Inter', sans-serif", border: `1px solid ${C.border}`, flexShrink: 0 }}>ESC</kbd>
            </div>

            {/* Body */}
            <div style={{ padding: "20px", maxHeight: "60vh", overflowY: "auto" }}>

              {/* Live results */}
              {results.length > 0 ? (
                <div>
                  <p style={labelStyle}><Search size={11} /> Results</p>
                  {results.slice(0, 5).map((p) => (
                    <button key={p.id}
                      onClick={() => { router.push(`/product/${p.id}`); setSearchOpen(false); }}
                      style={{ display: "flex", alignItems: "center", gap: "14px", width: "100%", padding: "10px 12px", background: "none", border: "none", borderRadius: "12px", cursor: "pointer", textAlign: "left", transition: "background 0.15s" }}
                      onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = C.bg)}
                      onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "none")}>
                      <div style={{ width: "48px", height: "48px", borderRadius: "10px", overflow: "hidden", background: C.bg, flexShrink: 0 }}>
                        <img src={p.images[0]} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ minWidth: 0 }}>
                        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "14px", marginBottom: "2px" }}>{p.name}</p>
                        <p style={{ fontFamily: "'Inter', sans-serif", color: C.textSecondary, fontSize: "12px" }}>{p.brand} · ₹{p.price.toLocaleString("en-IN")}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid-2" style={{ gap: "32px" }}>
                  {/* Recent */}
                  {recentSearches.length > 0 && (
                    <div>
                      <p style={labelStyle}><Clock size={11} /> Recent</p>
                      {recentSearches.map((s) => (
                        <button key={s} onClick={() => go(s)} style={chipBtn}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = C.bg; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = C.textSecondary; }}>
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                  {/* Trending */}
                  <div>
                    <p style={labelStyle}><TrendingUp size={11} /> Trending</p>
                    {trending.map((t) => (
                      <button key={t} onClick={() => go(t)} style={chipBtn}
                        onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = C.bg; (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                        onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "none"; (e.currentTarget as HTMLElement).style.color = C.textSecondary; }}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}