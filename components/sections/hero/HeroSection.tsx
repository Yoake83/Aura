"use client";
import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { C } from "@/lib/styles";

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const h = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 30);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 30);
    };
    window.addEventListener("mousemove", h);
    return () => window.removeEventListener("mousemove", h);
  }, [mouseX, mouseY]);

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", width: "100%", background: C.bg }}>
      {/* Glow bg */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 65% 50%, rgba(124,92,255,0.18) 0%, transparent 70%)", pointerEvents: "none" }} />
      {/* Second glow for depth */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 40% at 30% 60%, rgba(124,92,255,0.06) 0%, transparent 60%)", pointerEvents: "none" }} />

      {/* Watermark */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", userSelect: "none" }}>
        <span style={{ fontSize: "22vw", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.022)", letterSpacing: "-0.04em", lineHeight: 1 }}>2026</span>
      </div>

      {/* Particles */}
      {[...Array(6)].map((_, i) => (
        <motion.div key={i}
          style={{ position: "absolute", width: "4px", height: "4px", borderRadius: "50%", background: C.accent, left: `${15 + i * 14}%`, top: `${20 + (i % 3) * 25}%`, opacity: 0.4 }}
          animate={{ y: [0, -20, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, delay: i * 0.4 }} />
      ))}

      {/* Main grid */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: "1280px", margin: "0 auto", padding: "96px 24px 80px", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", gap: "48px", width: "100%" }}>

        {/* LEFT */}
        <div style={{ overflow: "hidden", minWidth: 0 }}>
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "999px", background: C.card, border: `1px solid ${C.border}`, marginBottom: "32px" }}>
            <span className="animate-pulse-dot" style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.accent, display: "block" }} />
            <span style={{ fontSize: "11px", color: C.textSecondary, fontFamily: "'Inter', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase" }}>2026 Collection — Now Live</span>
          </motion.div>

          {/* Title */}
          <div style={{ marginBottom: "24px" }}>
            {["ELEVATE", "YOUR", "STYLE"].map((word, i) => (
              <div key={word} style={{ overflow: "hidden" }}>
                <motion.h1
                  initial={{ y: "100%" }} animate={{ y: 0 }}
                  transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 100, damping: 20 }}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700,
                    fontSize: "clamp(2.8rem, 8vw, 7rem)", lineHeight: 0.9, letterSpacing: "-0.02em",
                    color: i === 1 ? "transparent" : "#fff",
                    WebkitTextStroke: i === 1 ? "1.5px rgba(255,255,255,0.22)" : "none",
                    display: "block", margin: 0,
                  }}>
                  {word}
                </motion.h1>
              </div>
            ))}
          </div>

          {/* Subtext */}
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "17px", lineHeight: 1.65, maxWidth: "420px", marginBottom: "40px" }}>
            Premium sneakers, curated streetwear, and statement accessories for those who move with intention.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85 }}
            style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/shop"
              className="animate-glow"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 28px", borderRadius: "14px", background: C.accent, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", letterSpacing: "0.03em", transition: "background 0.2s", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.accentHover)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.accent)}>
              Explore Collection <ArrowRight size={16} />
            </Link>
            <Link href="/shop?filter=new"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "14px 28px", borderRadius: "14px", border: `1px solid ${C.border}`, color: C.textSecondary, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", transition: "all 0.2s", textDecoration: "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSecondary; }}>
              New Drops
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
            style={{ display: "flex", alignItems: "center", gap: "40px", marginTop: "48px", paddingTop: "32px", borderTop: `1px solid ${C.border}` }}>
            {[["1200+", "Premium Products"], ["50K+", "Happy Customers"], ["100%", "Authentic Gear"]].map(([val, lbl]) => (
              <div key={lbl}>
                <p style={{ fontSize: "22px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", margin: 0 }}>{val}</p>
                <p style={{ fontSize: "12px", color: C.textSecondary, fontFamily: "'Inter', sans-serif", marginTop: "2px" }}>{lbl}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — floating shoe, no background */}
        <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "500px" }}>
          {/* Large purple glow behind shoe */}
          <div style={{
            position: "absolute", width: "420px", height: "420px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,92,255,0.35) 0%, rgba(124,92,255,0.12) 45%, transparent 70%)",
            filter: "blur(50px)",
            transform: "translate(10%, 5%)",
          }} />
          {/* Secondary warm glow */}
          <div style={{
            position: "absolute", width: "280px", height: "280px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(180,92,255,0.2) 0%, transparent 70%)",
            filter: "blur(40px)",
            transform: "translate(-20%, 20%)",
          }} />

          <motion.div style={{ x: springX, y: springY, position: "relative", zIndex: 10 }} className="animate-float">
            {/* The shoe image — mix-blend-mode to dissolve any background color */}
            <div style={{ position: "relative" }}>
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=90&auto=format&fit=crop"
                alt="AURA Sneaker 2026"
                style={{
                  width: "100%", maxWidth: "480px", objectFit: "contain",
                  transform: "rotate(-12deg)",
                  filter: "drop-shadow(0 30px 60px rgba(124,92,255,0.5)) drop-shadow(0 0 80px rgba(124,92,255,0.2)) brightness(1.05) contrast(1.05)",
                  mixBlendMode: "screen",
                  display: "block",
                }}
              />
            </div>
          </motion.div>

          {/* Floating badge — Best Seller */}
          <motion.div initial={{ opacity: 0, scale: 0.8, x: -20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 1.2, type: "spring" }}
            className="glass"
            style={{ position: "absolute", top: "60px", left: "0px", padding: "12px 16px", borderRadius: "14px", border: `1px solid ${C.border}`, zIndex: 20 }}>
            <p style={{ fontSize: "10px", color: C.textSecondary, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.15em", margin: 0 }}>Best Seller</p>
            <p style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", margin: "4px 0 0" }}>Air Max Pulse</p>
            <p style={{ color: C.accent, fontFamily: "'Inter', sans-serif", fontSize: "14px", fontWeight: 500, margin: "2px 0 0" }}>₹13,999</p>
          </motion.div>

          {/* Floating badge — Reviews */}
          <motion.div initial={{ opacity: 0, scale: 0.8, x: 20 }} animate={{ opacity: 1, scale: 1, x: 0 }} transition={{ delay: 1.35, type: "spring" }}
            className="glass"
            style={{ position: "absolute", bottom: "80px", right: "0px", padding: "12px 16px", borderRadius: "14px", border: `1px solid ${C.border}`, zIndex: 20 }}>
            <div style={{ display: "flex", gap: "2px" }}>
              {"★★★★★".split("").map((s, i) => <span key={i} style={{ color: "#fac800", fontSize: "13px" }}>{s}</span>)}
            </div>
            <p style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "12px", margin: "4px 0 0" }}>50K+ reviews</p>
          </motion.div>
        </div>
      </div>

      {/* Ticker */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: `1px solid ${C.border}`, padding: "12px 0", overflow: "hidden" }}>
        <div style={{ display: "flex" }} className="animate-ticker">
          {[...Array(8)].map((_, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "40px", paddingRight: "40px", flexShrink: 0 }}>
              {["Premium Sneakers", "Streetwear", "Limited Drops", "New Collection 2026", "Free Delivery"].map((t) => (
                <span key={t} style={{ fontSize: "11px", color: C.textMuted, fontFamily: "'Inter', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ width: "5px", height: "5px", borderRadius: "50%", background: C.accent, display: "inline-block", flexShrink: 0 }} />{t}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
