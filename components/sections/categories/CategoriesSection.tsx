"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { C } from "@/lib/styles";

const cats = [
  { label: "Sneakers", href: "/shop?filter=sneakers", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80" },
  { label: "Streetwear", href: "/shop?filter=streetwear", img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80" },
  { label: "Accessories", href: "/shop?filter=accessories", img: "https://images.unsplash.com/photo-1594938298603-c8148c4b4a5e?w=600&q=80" },
  { label: "Limited Drops", href: "/shop?filter=limited", img: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&q=80" },
];

export function CategoriesSection() {
  return (
    <section style={{ width: "100%", background: C.bg, padding: "80px 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          style={{ color: C.accent, fontSize: "11px", fontFamily: "'Inter', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>
          Browse by category
        </motion.p>
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", marginBottom: "48px" }}>
          Shop the Collection
        </motion.h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px" }}>
          {cats.map((cat, i) => (
            <motion.div key={cat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link href={cat.href} style={{ display: "block", borderRadius: "20px", overflow: "hidden", aspectRatio: "3/4", position: "relative", textDecoration: "none" }}
                onMouseEnter={(e) => { (e.currentTarget.querySelector("img") as HTMLElement).style.transform = "scale(1.06)"; }}
                onMouseLeave={(e) => { (e.currentTarget.querySelector("img") as HTMLElement).style.transform = "scale(1)"; }}>
                <img src={cat.img} alt={cat.label} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", position: "absolute", inset: 0 }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.1) 60%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "16px" }}>{cat.label}</span>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ArrowRight size={14} color="#fff" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
