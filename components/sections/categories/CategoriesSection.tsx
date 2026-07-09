"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { C } from "@/lib/styles";

const cats = [
  {
    label: "Sneakers",
    href: "/shop?filter=sneakers",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80",
    gradient: "linear-gradient(135deg, #1a0a0a 0%, #2d1010 100%)",
  },
  {
    label: "Streetwear",
    href: "/shop?filter=streetwear",
    img: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&q=80",
    gradient: "linear-gradient(135deg, #0a0a1a 0%, #101028 100%)",
  },
  {
    label: "Accessories",
    href: "/shop?filter=accessories",
    img: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=600&q=80",
    gradient: "linear-gradient(135deg, #0f0a1a 0%, #1a1030 100%)",
  },
  {
    label: "Limited Drops",
    href: "/shop?filter=limited",
    img: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&q=80",
    gradient: "linear-gradient(135deg, #0a1a0a 0%, #102010 100%)",
  },
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

        <div className="grid-4">
          {cats.map((cat, i) => (
            <motion.div key={cat.label} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Link href={cat.href}
                style={{ display: "block", borderRadius: "20px", overflow: "hidden", aspectRatio: "3/4", position: "relative", textDecoration: "none", background: cat.gradient }}
                onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLElement;
                  if (img) img.style.transform = "scale(1.06)";
                }}
                onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector("img") as HTMLElement;
                  if (img) img.style.transform = "scale(1)";
                }}>
                {/* Gradient always shows — image layered on top if it loads */}
                <div style={{ position: "absolute", inset: 0, background: cat.gradient }} />
                {/* Purple accent glow */}
                <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(124,92,255,0.2) 0%, transparent 70%)" }} />
                <img
                  src={cat.img}
                  alt={cat.label}
                  referrerPolicy="no-referrer"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s ease", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.1) 60%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "16px" }}>{cat.label}</span>
                  <div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
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