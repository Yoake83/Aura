"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { C } from "@/lib/styles";

const collections = [
  {
    id: "2026-drop",
    title: "2026 Collection",
    subtitle: "The Future of Street",
    desc: "Our most ambitious curation yet. Pieces that define the next decade of streetwear.",
    tag: "NEW SEASON",
    accent: "#7C5CFF",
    bg: "linear-gradient(135deg, #0d0a1f 0%, #12102a 100%)",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&q=85",
    filter: (p: typeof products[0]) => p.isNew,
  },
  {
    id: "limited",
    title: "Limited Drops",
    subtitle: "Once They're Gone, They're Gone",
    desc: "Exclusive releases with limited pairs. Authenticated, curated, coveted.",
    tag: "LIMITED",
    accent: "#ef4444",
    bg: "linear-gradient(135deg, #1a0808 0%, #200d0d 100%)",
    img: "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=900&q=85",
    filter: (p: typeof products[0]) => p.tags.includes("limited") || p.tags.includes("drop"),
  },
  {
    id: "premium",
    title: "Premium Edit",
    subtitle: "No Compromises",
    desc: "The finest materials, rarest silhouettes, and most iconic pieces from the world's best brands.",
    tag: "PREMIUM",
    accent: "#fac800",
    bg: "linear-gradient(135deg, #141008 0%, #1a1508 100%)",
    img: "https://images.unsplash.com/photo-1539185441755-769473a23570?w=900&q=85",
    filter: (p: typeof products[0]) => p.tags.includes("premium") || p.tags.includes("luxury"),
  },
  {
    id: "essentials",
    title: "Street Essentials",
    subtitle: "Every Wardrobe Needs These",
    desc: "Timeless pieces that transcend seasons. The foundation of any serious streetwear collection.",
    tag: "ESSENTIALS",
    accent: "#05df72",
    bg: "linear-gradient(135deg, #081410 0%, #0a1a12 100%)",
    img: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900&q=85",
    filter: (p: typeof products[0]) => p.category === "Streetwear",
  },
];

export default function CollectionsPage() {
  const [active, setActive] = useState<string | null>(null);

  const activeCol = collections.find((c) => c.id === active);
  const activeProducts = activeCol ? products.filter(activeCol.filter) : [];

  return (
    <div style={{ background: C.bg, minHeight: "100vh", paddingTop: "70px" }}>

      {/* Header */}
      <section style={{ padding: "80px 0 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(124,92,255,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            style={{ color: C.accent, fontSize: "11px", fontFamily: "'Inter', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>
            Curated for You
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 7vw, 6rem)", color: "#fff", lineHeight: 0.92, letterSpacing: "-0.03em", marginBottom: "24px" }}>
            Collections
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "17px", maxWidth: "480px", margin: "0 auto", lineHeight: 1.65 }}>
            Four distinct worlds. One standard: the best.
          </motion.p>
        </div>
      </section>

      {/* Collection cards */}
      <section style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px 80px" }}>
        <div className="grid-2" style={{ gap: "20px", marginBottom: "80px" }}>
          {collections.map((col, i) => (
            <motion.div key={col.id}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              onClick={() => setActive(active === col.id ? null : col.id)}
              style={{ position: "relative", borderRadius: "24px", overflow: "hidden", cursor: "pointer", border: `1px solid ${active === col.id ? col.accent : C.border}`, transition: "all 0.3s", boxShadow: active === col.id ? `0 0 40px ${col.accent}30` : "none" }}>

              {/* Background image */}
              <div style={{ aspectRatio: "16/9", position: "relative", overflow: "hidden" }}>
                <img src={col.img} alt={col.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", transform: active === col.id ? "scale(1.06)" : "scale(1)", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)` }} />

                {/* Tag */}
                <div style={{ position: "absolute", top: "16px", left: "16px", padding: "5px 12px", borderRadius: "999px", background: col.accent, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "10px", color: "#fff", letterSpacing: "0.1em" }}>
                  {col.tag}
                </div>

                {/* Content */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "28px" }}>
                  <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.5)", marginBottom: "6px", textTransform: "uppercase", letterSpacing: "0.1em" }}>{col.subtitle}</p>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "24px", color: "#fff", marginBottom: "10px" }}>{col.title}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.6)", fontSize: "14px", lineHeight: 1.55, marginBottom: "16px" }}>{col.desc}</p>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: col.accent, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px" }}>
                    {active === col.id ? "Hide Products" : "Explore"} <ArrowRight size={14} style={{ transform: active === col.id ? "rotate(90deg)" : "none", transition: "transform 0.3s" }} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expanded products */}
        {active && activeProducts.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "32px" }}>
              <div>
                <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "24px", color: "#fff", marginBottom: "4px" }}>
                  {activeCol?.title}
                </h2>
                <p style={{ fontFamily: "'Inter', sans-serif", color: C.textSecondary, fontSize: "14px" }}>{activeProducts.length} products</p>
              </div>
              <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: C.accent, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                View All <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid-4" style={{ gap: "16px" }}>
              {activeProducts.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
            {activeProducts.length === 0 && (
              <div style={{ textAlign: "center", padding: "60px 0" }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.textSecondary, fontSize: "16px" }}>More drops coming soon.</p>
                <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "16px", padding: "12px 24px", background: C.accent, color: "#fff", borderRadius: "12px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", textDecoration: "none" }}>
                  Browse All Products
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {/* All products teaser if nothing selected */}
        {!active && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.textSecondary, fontSize: "16px", marginBottom: "20px" }}>
              Click any collection above to explore its products
            </p>
            <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", background: C.accent, color: "#fff", borderRadius: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.accentHover)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.accent)}>
              Browse All Products <ArrowRight size={16} />
            </Link>
          </motion.div>
        )}
      </section>
    </div>
  );
}