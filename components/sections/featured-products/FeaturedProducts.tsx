"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { C } from "@/lib/styles";

export function FeaturedProducts() {
  return (
    <section style={{ width: "100%", background: C.card, padding: "80px 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: "48px", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <p style={{ color: C.accent, fontSize: "11px", fontFamily: "'Inter', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>Hand-picked for you</p>
            <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff" }}>Featured Products</h2>
          </div>
          <Link href="/shop" style={{ display: "inline-flex", alignItems: "center", gap: "8px", fontSize: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, color: C.accent, transition: "gap 0.2s" }}
            onMouseEnter={(e) => (e.currentTarget.style.gap = "12px")}
            onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}>
            View All <ArrowRight size={14} />
          </Link>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {products.map((p, i) => (
            <motion.div key={p.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <ProductCard product={p} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
