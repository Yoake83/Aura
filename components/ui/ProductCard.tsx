"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { C } from "@/lib/styles";

export function ProductCard({ product: p }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();

  // Only read wishlist state after mount to avoid SSR/client mismatch
  useEffect(() => { setMounted(true); }, []);
  const wishlisted = mounted && isWishlisted(p.id);

  // Reliable fallback images by category
  const fallbacks: Record<string, string> = {
    Sneakers: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    Streetwear: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&q=80",
    Accessories: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
  };

  const handleImgError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    const fallback = fallbacks[p.category] || fallbacks.Sneakers;
    if (el.src !== fallback) el.src = fallback;
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: C.card, borderRadius: "20px",
        border: `1px solid ${hovered ? "rgba(124,92,255,0.3)" : C.border}`,
        overflow: "hidden", transition: "all 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,92,255,0.15)" : "none",
      }}>
      <Link href={`/product/${p.id}`} style={{ display: "block", textDecoration: "none" }}>
        {/* Image */}
        <div style={{ position: "relative", aspectRatio: "1", background: C.elevated, overflow: "hidden" }}>
          <img
            src={p.images[0]}
            alt={p.name}
            onError={handleImgError}
            referrerPolicy="no-referrer"
            style={{
              width: "100%", height: "100%", objectFit: "cover", display: "block",
              transition: "transform 0.6s ease",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
          />
          {/* Badges */}
          <div style={{ position: "absolute", top: "10px", left: "10px", display: "flex", flexDirection: "column", gap: "5px" }}>
            {p.isNew && (
              <span style={{ background: C.accent, color: "#fff", fontSize: "10px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, padding: "3px 9px", borderRadius: "6px", letterSpacing: "0.05em" }}>NEW</span>
            )}
            {p.originalPrice && (
              <span style={{ background: "#ef4444", color: "#fff", fontSize: "10px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, padding: "3px 9px", borderRadius: "6px" }}>SALE</span>
            )}
          </div>
          {/* Wishlist button */}
          <button
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleWishlist(p); }}
            style={{
              position: "absolute", top: "10px", right: "10px",
              width: "34px", height: "34px", borderRadius: "50%",
              background: "rgba(0,0,0,0.55)", border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: hovered ? 1 : 0, transition: "opacity 0.2s", cursor: "pointer",
            }}>
            <Heart size={14} color={wishlisted ? "#ef4444" : "#fff"} fill={wishlisted ? "#ef4444" : "none"} />
          </button>
          {/* Quick add */}
          <div style={{
            position: "absolute", bottom: 0, left: 0, right: 0, padding: "10px",
            transform: hovered ? "translateY(0)" : "translateY(100%)",
            transition: "transform 0.3s ease",
          }}>
            <button
              onClick={(e) => { e.preventDefault(); e.stopPropagation(); addToCart(p, p.sizes[0], p.colors[0]); }}
              style={{ width: "100%", padding: "10px", background: C.accent, color: "#fff", border: "none", borderRadius: "10px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = C.accentHover)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = C.accent)}>
              Quick Add
            </button>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: "14px 16px" }}>
          <p style={{ fontSize: "10px", color: C.textMuted, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{p.brand}</p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "14px", marginBottom: "8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "3px", marginBottom: "10px" }}>
            {"★★★★★".split("").map((s, i) => (
              <span key={i} style={{ color: i < Math.floor(p.rating) ? "#fac800" : C.border, fontSize: "12px" }}>{s}</span>
            ))}
            <span style={{ fontSize: "11px", color: C.textMuted, fontFamily: "'Inter', sans-serif", marginLeft: "4px" }}>({p.reviews})</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "15px" }}>{formatPrice(p.price)}</span>
            {p.originalPrice && (
              <span style={{ fontFamily: "'Inter', sans-serif", color: C.textMuted, fontSize: "12px", textDecoration: "line-through" }}>{formatPrice(p.originalPrice)}</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
}