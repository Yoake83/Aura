"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Heart, ShoppingBag, Trash2, ArrowRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { C } from "@/lib/styles";

export default function WishlistPage() {
  const [mounted, setMounted] = useState(false);
  const { wishlist, toggleWishlist, addToCart } = useStore();

  useEffect(() => { setMounted(true); }, []);

  if (!mounted) return null;

  return (
    <div style={{ background: C.bg, minHeight: "100vh", paddingTop: "70px" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div style={{ marginBottom: "40px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
            <Heart size={24} color={C.accent} fill={C.accent} />
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 2.8rem)", color: "#fff" }}>
              My Wishlist
            </h1>
          </div>
          <p style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "15px" }}>
            {wishlist.length === 0 ? "No items saved yet" : `${wishlist.length} item${wishlist.length > 1 ? "s" : ""} saved`}
          </p>
        </div>

        {/* Empty state */}
        {wishlist.length === 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            style={{ textAlign: "center", padding: "80px 24px", background: C.card, borderRadius: "24px", border: `1px solid ${C.border}` }}>
            <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "rgba(124,92,255,0.1)", border: `1px solid rgba(124,92,255,0.2)`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <Heart size={36} color={C.accent} />
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "22px", color: "#fff", marginBottom: "10px" }}>
              Your wishlist is empty
            </h2>
            <p style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "15px", marginBottom: "32px", maxWidth: "360px", margin: "0 auto 32px", lineHeight: 1.6 }}>
              Save items you love by tapping the heart icon on any product.
            </p>
            <Link href="/shop"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 28px", borderRadius: "14px", background: C.accent, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.accentHover)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.accent)}>
              Browse Products <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}

        {/* Wishlist grid */}
        {wishlist.length > 0 && (
          <>
            <div className="wishlist-grid">
              <AnimatePresence>
                {wishlist.map((p, i) => (
                  <motion.div key={p.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: i * 0.06 }}
                    style={{ background: C.card, borderRadius: "20px", border: `1px solid ${C.border}`, overflow: "hidden" }}>

                    {/* Image */}
                    <Link href={`/product/${p.id}`} style={{ display: "block", textDecoration: "none" }}>
                      <div style={{ position: "relative", aspectRatio: "1", background: C.elevated, overflow: "hidden" }}>
                        <img src={p.images[0]} alt={p.name}
                          referrerPolicy="no-referrer"
                          onError={(e) => { (e.currentTarget as HTMLImageElement).src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80"; }}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.5s" }}
                          onMouseEnter={(e) => ((e.target as HTMLElement).style.transform = "scale(1.05)")}
                          onMouseLeave={(e) => ((e.target as HTMLElement).style.transform = "scale(1)")} />
                        {p.isNew && (
                          <span style={{ position: "absolute", top: "10px", left: "10px", background: C.accent, color: "#fff", fontSize: "10px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, padding: "3px 9px", borderRadius: "6px" }}>NEW</span>
                        )}
                        {p.originalPrice && (
                          <span style={{ position: "absolute", top: p.isNew ? "34px" : "10px", left: "10px", background: "#ef4444", color: "#fff", fontSize: "10px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, padding: "3px 9px", borderRadius: "6px" }}>SALE</span>
                        )}
                      </div>
                    </Link>

                    {/* Info */}
                    <div style={{ padding: "16px" }}>
                      <p style={{ fontSize: "10px", color: C.textMuted, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{p.brand}</p>
                      <Link href={`/product/${p.id}`} style={{ textDecoration: "none" }}>
                        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "15px", marginBottom: "8px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
                          onMouseEnter={(e) => ((e.target as HTMLElement).style.color = C.accent)}
                          onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "#fff")}>
                          {p.name}
                        </p>
                      </Link>

                      {/* Stars */}
                      <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "10px" }}>
                        {"★★★★★".split("").map((s, i) => (
                          <span key={i} style={{ color: i < Math.floor(p.rating) ? "#fac800" : C.border, fontSize: "12px" }}>{s}</span>
                        ))}
                        <span style={{ fontSize: "11px", color: C.textMuted, fontFamily: "'Inter', sans-serif", marginLeft: "4px" }}>({p.reviews})</span>
                      </div>

                      {/* Price */}
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "14px" }}>
                        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "16px" }}>{formatPrice(p.price)}</span>
                        {p.originalPrice && (
                          <span style={{ fontFamily: "'Inter', sans-serif", color: C.textMuted, fontSize: "12px", textDecoration: "line-through" }}>{formatPrice(p.originalPrice)}</span>
                        )}
                      </div>

                      {/* Actions */}
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button
                          onClick={() => { addToCart(p, p.sizes[0], p.colors[0]); }}
                          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "6px", padding: "10px", background: C.accent, color: "#fff", border: "none", borderRadius: "10px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "13px", cursor: "pointer", transition: "background 0.2s" }}
                          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = C.accentHover)}
                          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = C.accent)}>
                          <ShoppingBag size={14} /> Add to Cart
                        </button>
                        <button
                          onClick={() => toggleWishlist(p)}
                          title="Remove from wishlist"
                          style={{ width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "10px", cursor: "pointer", color: "#ef4444", transition: "all 0.2s", flexShrink: 0 }}
                          onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.2)"; }}
                          onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(239,68,68,0.1)"; }}>
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Bottom CTA */}
            <div style={{ marginTop: "48px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap" as const, gap: "16px", padding: "24px", background: C.card, borderRadius: "20px", border: `1px solid ${C.border}` }}>
              <div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "16px", marginBottom: "4px" }}>
                  {wishlist.length} item{wishlist.length > 1 ? "s" : ""} in your wishlist
                </p>
                <p style={{ fontFamily: "'Inter', sans-serif", color: C.textSecondary, fontSize: "14px" }}>
                  Total value: {formatPrice(wishlist.reduce((sum, p) => sum + p.price, 0))}
                </p>
              </div>
              <Link href="/shop"
                style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 24px", borderRadius: "12px", border: `1px solid ${C.border}`, color: C.textSecondary, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = "#fff"; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSecondary; }}>
                Continue Shopping <ArrowRight size={14} />
              </Link>
            </div>
          </>
        )}
      </div>

      <style>{`
        .wishlist-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }
        @media (max-width: 1024px) { .wishlist-grid { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 768px)  { .wishlist-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 480px)  { .wishlist-grid { grid-template-columns: 1fr; } }
      `}</style>
    </div>
  );
}