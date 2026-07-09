"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { C } from "@/lib/styles";

export function EditorialBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section ref={ref} style={{ width: "100%", background: C.bg, padding: "80px 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ position: "relative", borderRadius: "28px", overflow: "hidden", height: "520px", display: "flex", alignItems: "center" }}>
          <motion.img style={{ y }} src="https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=1400&q=80" alt="Editorial"
            sx={{ position: "absolute", inset: 0, width: "100%", height: "120%", objectFit: "cover", top: "-10%" } as React.CSSProperties}
            style={{ position: "absolute", inset: 0, width: "100%", height: "120%", objectFit: "cover", top: "-10%", y }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 70%)" }} />
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            style={{ position: "relative", zIndex: 10, padding: "48px 56px" }}>
            <p style={{ fontSize: "11px", color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: "16px" }}>Editorial — 2026</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "#fff", lineHeight: 0.95, letterSpacing: "-0.02em", marginBottom: "24px" }}>
              WEAR<br />
              <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.3)", color: "transparent" }}>YOUR</span><br />
              STORY
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontFamily: "'Inter', sans-serif", fontSize: "16px", maxWidth: "360px", lineHeight: 1.65 }}>Every piece tells a story. Curated for those who make every step count.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
