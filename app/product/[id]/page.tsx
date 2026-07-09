"use client";
import { useState } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Heart, ShoppingBag, ChevronLeft, ChevronRight, ZoomIn, X, Check, Shield, Truck, RotateCcw } from "lucide-react";
import { products } from "@/data/products";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { ProductCard } from "@/components/ui/ProductCard";
import { C } from "@/lib/styles";

export default function ProductPage() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addToCart, toggleWishlist, isWishlisted, setCartOpen } = useStore();

  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || "");
  const [qty, setQty] = useState(1);
  const [imgIndex, setImgIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div style={{ minHeight: "100vh", paddingTop: "70px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px", background: C.bg }}>
        <p style={{ fontSize: "48px" }}>😔</p>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "24px", color: "#fff" }}>Product Not Found</h1>
        <Link href="/shop" style={{ color: C.accent, fontFamily: "'Inter', sans-serif", fontSize: "15px" }}>Back to Shop</Link>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) return;
    for (let i = 0; i < qty; i++) addToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const inp: React.CSSProperties = { background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "15px", fontFamily: "'Inter', sans-serif", width: "100%" };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", paddingTop: "70px" }}>

      {/* Breadcrumb */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "14px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: "8px", fontSize: "12px", color: C.textSecondary, fontFamily: "'Inter', sans-serif", flexWrap: "wrap" as const }}>
          <Link href="/" style={{ color: C.textMuted, textDecoration: "none" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")} onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}>Home</Link>
          <span style={{ color: C.border }}>/</span>
          <Link href="/shop" style={{ color: C.textMuted, textDecoration: "none" }} onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")} onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}>Shop</Link>
          <span style={{ color: C.border }}>/</span>
          <span style={{ color: "#fff" }}>{product.name}</span>
        </div>
      </div>

      {/* Main content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "40px 24px" }}>
        <div className="grid-2" style={{ gap: "60px", alignItems: "flex-start" }}>

          {/* LEFT — Images */}
          <div>
            {/* Main image */}
            <div onClick={() => setZoomOpen(true)}
              style={{ position: "relative", borderRadius: "20px", overflow: "hidden", background: C.card, aspectRatio: "1", cursor: "zoom-in", marginBottom: "12px", border: `1px solid ${C.border}` }}>
              <img src={product.images[imgIndex]} alt={product.name}
                style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.transform = "scale(1.04)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.transform = "scale(1)")} />
              {/* Nav arrows */}
              {product.images.length > 1 && (<>
                <button onClick={(e) => { e.stopPropagation(); setImgIndex((i) => (i - 1 + product.images.length) % product.images.length); }}
                  style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>
                  <ChevronLeft size={18} />
                </button>
                <button onClick={(e) => { e.stopPropagation(); setImgIndex((i) => (i + 1) % product.images.length); }}
                  style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", width: "36px", height: "36px", borderRadius: "50%", background: "rgba(0,0,0,0.6)", border: "none", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>
                  <ChevronRight size={18} />
                </button>
              </>)}
              {/* Badges */}
              <div style={{ position: "absolute", top: "12px", left: "12px", display: "flex", flexDirection: "column", gap: "6px" }}>
                {product.isNew && <span style={{ background: C.accent, color: "#fff", fontSize: "10px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, padding: "4px 10px", borderRadius: "20px", letterSpacing: "0.06em" }}>NEW</span>}
                {product.originalPrice && <span style={{ background: "#22c55e", color: "#fff", fontSize: "10px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, padding: "4px 10px", borderRadius: "20px" }}>SALE</span>}
              </div>
              {/* Zoom icon */}
              <div style={{ position: "absolute", top: "12px", right: "12px", width: "34px", height: "34px", borderRadius: "8px", background: "rgba(0,0,0,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <ZoomIn size={15} color="#fff" />
              </div>
            </div>

            {/* Thumbnails */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "10px" }}>
              {product.images.map((img, i) => (
                <div key={i} onClick={() => setImgIndex(i)}
                  style={{ borderRadius: "12px", overflow: "hidden", aspectRatio: "1", background: C.card, border: `2px solid ${i === imgIndex ? C.accent : C.border}`, cursor: "pointer", transition: "border-color 0.2s" }}>
                  <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT — Info */}
          <div style={{ position: "sticky", top: "90px" }}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: "16px", marginBottom: "8px" }}>
              <div style={{ minWidth: 0 }}>
                <p style={{ color: C.accent, fontSize: "11px", fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "6px" }}>{product.brand}</p>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.6rem, 3vw, 2.4rem)", color: "#fff", lineHeight: 1.1 }}>{product.name}</h1>
              </div>
              <button onClick={() => toggleWishlist(product)}
                style={{ width: "44px", height: "44px", borderRadius: "50%", border: `2px solid ${wishlisted ? "#ef4444" : C.border}`, background: wishlisted ? "rgba(239,68,68,0.1)" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, transition: "all 0.2s" }}>
                <Heart size={18} color={wishlisted ? "#ef4444" : C.textSecondary} fill={wishlisted ? "#ef4444" : "none"} />
              </button>
            </div>

            {/* Rating */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" }}>
              <div style={{ display: "flex", gap: "2px" }}>
                {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: i < Math.floor(product.rating) ? "#fac800" : C.border, fontSize: "14px" }}>{s}</span>)}
              </div>
              <span style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>{product.rating} ({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "28px" }}>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.5rem, 3vw, 2rem)", color: "#fff" }}>{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span style={{ fontFamily: "'Inter', sans-serif", color: C.textMuted, fontSize: "16px", textDecoration: "line-through" }}>{formatPrice(product.originalPrice)}</span>
              )}
              {product.originalPrice && (
                <span style={{ background: "rgba(34,197,94,0.15)", color: "#22c55e", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "12px", padding: "3px 10px", borderRadius: "20px" }}>
                  Save {Math.round((1 - product.price / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            {/* Color */}
            <div style={{ marginBottom: "24px" }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "13px", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Color</p>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" as const }}>
                {product.colors.map((c) => (
                  <button key={c} onClick={() => setSelectedColor(c)}
                    style={{ width: "32px", height: "32px", borderRadius: "50%", background: c, border: `3px solid ${selectedColor === c ? "#fff" : "transparent"}`, outline: `2px solid ${selectedColor === c ? C.accent : "transparent"}`, cursor: "pointer", transition: "all 0.2s" }} />
                ))}
              </div>
            </div>

            {/* Size */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "13px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Size</p>
                <button style={{ background: "none", border: "none", color: C.accent, fontFamily: "'Inter', sans-serif", fontSize: "12px", cursor: "pointer" }}>Size Guide</button>
              </div>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
                {product.sizes.map((s) => (
                  <button key={s} onClick={() => setSelectedSize(s)}
                    style={{ padding: "10px 16px", borderRadius: "10px", border: `1px solid ${selectedSize === s ? C.accent : C.border}`, background: selectedSize === s ? "rgba(124,92,255,0.12)" : "transparent", color: selectedSize === s ? "#fff" : C.textSecondary, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, fontSize: "13px", cursor: "pointer", transition: "all 0.2s" }}>
                    {s}
                  </button>
                ))}
              </div>
              {!selectedSize && <p style={{ color: "#ef4444", fontFamily: "'Inter', sans-serif", fontSize: "12px", marginTop: "8px" }}>Please select a size</p>}
            </div>

            {/* Qty + Add to cart */}
            <div style={{ display: "flex", gap: "12px", marginBottom: "16px", flexWrap: "wrap" as const }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0", border: `1px solid ${C.border}`, borderRadius: "12px", overflow: "hidden" }}>
                <button onClick={() => setQty(Math.max(1, qty - 1))} style={{ width: "44px", height: "52px", background: "none", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>−</button>
                <span style={{ width: "44px", textAlign: "center", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "15px" }}>{qty}</span>
                <button onClick={() => setQty(qty + 1)} style={{ width: "44px", height: "52px", background: "none", border: "none", color: "#fff", fontSize: "18px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>+</button>
              </div>
              <button onClick={handleAddToCart} disabled={!selectedSize}
                style={{ flex: 1, minWidth: "180px", padding: "14px 24px", borderRadius: "12px", background: added ? "#22c55e" : selectedSize ? C.accent : C.border, color: "#fff", border: "none", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "15px", cursor: selectedSize ? "pointer" : "not-allowed", transition: "background 0.3s", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                {added ? <><Check size={18} /> Added!</> : <><ShoppingBag size={18} /> Add to Cart</>}
              </button>
            </div>

            <button onClick={() => { if (selectedSize) { handleAddToCart(); setCartOpen(true); } }}
              style={{ width: "100%", padding: "14px", borderRadius: "12px", background: "transparent", border: `1px solid ${C.border}`, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px", cursor: "pointer", marginBottom: "28px", transition: "border-color 0.2s" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = C.accent)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = C.border)}>
              Buy Now
            </button>

            {/* Trust badges */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px", padding: "16px", background: C.card, borderRadius: "16px", border: `1px solid ${C.border}` }}>
              {[[Shield, "Authentic", "100% verified"], [Truck, "Free Delivery", "On all orders"], [RotateCcw, "Easy Returns", "30-day policy"]].map(([Icon, title, sub]) => (
                <div key={title as string} style={{ textAlign: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center", marginBottom: "6px" }}>
                    <Icon size={18} color={C.accent} />
                  </div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "12px", marginBottom: "2px" }}>{title as string}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", color: C.textMuted, fontSize: "11px" }}>{sub as string}</p>
                </div>
              ))}
            </div>

            {/* Description */}
            <div style={{ marginTop: "28px", padding: "20px", background: C.card, borderRadius: "16px", border: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "14px", marginBottom: "10px" }}>About this product</p>
              <p style={{ fontFamily: "'Inter', sans-serif", color: C.textSecondary, fontSize: "14px", lineHeight: 1.7 }}>{product.description}</p>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div style={{ marginTop: "80px" }}>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "24px", color: "#fff", marginBottom: "28px" }}>You Might Also Like</h2>
            <div className="grid-4" style={{ gap: "16px" }}>
              {related.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoomOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setZoomOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 300, background: "rgba(0,0,0,0.95)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
            <button style={{ position: "absolute", top: "20px", right: "20px", background: C.card, border: `1px solid ${C.border}`, borderRadius: "10px", width: "40px", height: "40px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>
              <X size={18} />
            </button>
            <img src={product.images[imgIndex]} alt={product.name} onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90vw", maxHeight: "85vh", objectFit: "contain", borderRadius: "16px" }} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}