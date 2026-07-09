"use client";
import { useState } from "react";
import Link from "next/link";
import { Heart } from "lucide-react";
import { Product } from "@/data/products";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { C } from "@/lib/styles";

export function ProductCard({ product: p }: { product: Product }) {
  const [hovered, setHovered] = useState(false);
  const { addToCart, toggleWishlist, isWishlisted } = useStore();
  const wishlisted = isWishlisted(p.id);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ background: C.card, borderRadius: "20px", border: `1px solid ${hovered ? "rgba(124,92,255,0.3)" : C.border}`, overflow: "hidden", transition: "all 0.3s ease", transform: hovered ? "translateY(-4px)" : "none", boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,92,255,0.15)" : "none" }}>
      <Link href={`/product/${p.id}`} style={{ display: "block", textDecoration: "none" }}>
        {/* Image */}
        <div style={{ position: "relative", aspectRatio: "1", background: "#09090B", overflow: "hidden" }}>
          <img src={p.images[hovered && p.images[1] ? 1 : 0]} alt={p.name}
            style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }} />
          {/* Badges */}
          <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
            {p.isNew && <span style={{ background: C.accent, color: "#fff", fontSize: "10px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, padding: "3px 8px", borderRadius: "6px", letterSpacing: "0.05em" }}>NEW</span>}
            {p.originalPrice && <span style={{ background: "#ef4444", color: "#fff", fontSize: "10px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, padding: "3px 8px", borderRadius: "6px" }}>SALE</span>}
          </div>
          {/* Wishlist */}
          <button onClick={(e) => { e.preventDefault(); toggleWishlist(p); }}
            style={{ position: "absolute", top: "12px", right: "12px", width: "34px", height: "34px", borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", opacity: hovered ? 1 : 0, transition: "opacity 0.2s" }}>
            <Heart size={14} color={wishlisted ? "#ef4444" : "#fff"} fill={wishlisted ? "#ef4444" : "none"} />
          </button>
          {/* Quick add */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "12px", transform: hovered ? "translateY(0)" : "translateY(100%)", transition: "transform 0.3s ease" }}>
            <button onClick={(e) => { e.preventDefault(); addToCart(p, p.sizes[0], p.colors[0]); }}
              style={{ width: "100%", padding: "10px", background: C.accent, color: "#fff", border: "none", borderRadius: "10px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "13px", cursor: "pointer", transition: "background 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.accentHover)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.accent)}>
              Quick Add
            </button>
          </div>
        </div>
        {/* Info */}
        <div style={{ padding: "16px" }}>
          <p style={{ fontSize: "11px", color: C.textMuted, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "4px" }}>{p.brand}</p>
          <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "15px", marginBottom: "8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.name}</p>
          <div style={{ display: "flex", alignItems: "center", gap: "4px", marginBottom: "10px" }}>
            {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: i < Math.floor(p.rating) ? "#fac800" : C.border, fontSize: "12px" }}>{s}</span>)}
            <span style={{ fontSize: "12px", color: C.textMuted, fontFamily: "'Inter', sans-serif", marginLeft: "4px" }}>({p.reviews})</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "16px" }}>{formatPrice(p.price)}</span>
            {p.originalPrice && <span style={{ fontFamily: "'Inter', sans-serif", color: C.textMuted, fontSize: "13px", textDecoration: "line-through" }}>{formatPrice(p.originalPrice)}</span>}
          </div>
        </div>
      </Link>
    </div>
  );
}
