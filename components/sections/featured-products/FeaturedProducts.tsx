"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { C } from "@/lib/styles";

export function FeaturedProducts() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "left" ? -300 : 300, behavior: "smooth" });
  };

  return (
    <section style={{ width: "100%", background: C.card, padding: "60px 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "36px", flexWrap: "wrap" as const, gap: "12px" }}>
          <div>
            <p style={{ color: C.accent, fontSize: "11px", fontFamily: "'Inter', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "6px" }}>Hand-picked for you</p>
            <h2 style={{ fontSize: "clamp(1.6rem, 4vw, 2.8rem)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff" }}>Featured Products</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/* Arrow buttons — always visible, especially useful on mobile */}
            <button onClick={() => scroll("left")}
              style={{ width: "38px", height: "38px", borderRadius: "50%", border: `1px solid ${C.border}`, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", flexShrink: 0 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = C.accent)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = C.border)}>
              <ChevronLeft size={18} />
            </button>
            <button onClick={() => scroll("right")}
              style={{ width: "38px", height: "38px", borderRadius: "50%", border: `1px solid ${C.border}`, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", flexShrink: 0 }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.borderColor = C.accent)}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.borderColor = C.border)}>
              <ChevronRight size={18} />
            </button>
            <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, color: C.accent, textDecoration: "none" }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Scrollable product row — works on all screen sizes */}
        <div
          ref={scrollRef}
          className="no-scrollbar"
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            paddingBottom: "8px",
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
          }}>
          {products.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              style={{
                flexShrink: 0,
                width: "clamp(200px, 28vw, 280px)",
                scrollSnapAlign: "start",
              }}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}