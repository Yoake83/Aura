"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { C } from "@/lib/styles";

function useCountdown(target: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = target.getTime() - Date.now();
      if (diff <= 0) return;
      setT({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [target]);
  return t;
}

export function LatestDrop() {
  const dropDate = useMemo(() => new Date(Date.now() + 3 * 86400000 + 6 * 3600000), []);
  const { d, h, m, s } = useCountdown(dropDate);

  const box = (val: number, label: string) => (
    <div key={label} style={{ textAlign: "center" }}>
      <div style={{ background: "rgba(255,255,255,0.1)", borderRadius: "12px", padding: "12px 16px", minWidth: "64px", marginBottom: "6px", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.12)" }}>
        <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(22px, 4vw, 32px)", color: "#fff", display: "block" }}>{String(val).padStart(2, "0")}</span>
      </div>
      <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.45)", fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.12em" }}>{label}</span>
    </div>
  );

  return (
    <section style={{ width: "100%", background: C.card, padding: "80px 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div className="grid-hero" style={{
          position: "relative", borderRadius: "28px", overflow: "hidden", minHeight: "420px",
          background: "linear-gradient(135deg, #0d0d14 0%, #12101e 50%, #0a0a10 100%)",
          border: `1px solid ${C.border}`,
        }}>
          <div style={{ position: "absolute", top: "-60px", right: "20%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,255,0.25) 0%, transparent 70%)", pointerEvents: "none" }} />

          {/* LEFT */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            style={{ position: "relative", zIndex: 10, padding: "clamp(28px, 4vw, 52px)" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 14px", borderRadius: "999px", background: C.accent, marginBottom: "20px" }}>
              <span style={{ fontSize: "11px", fontFamily: "'Inter', sans-serif", color: "#fff", letterSpacing: "0.1em", textTransform: "uppercase" }}>🔥 Limited Drop</span>
            </div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(1.8rem, 4vw, 3.2rem)", color: "#fff", marginBottom: "10px", lineHeight: 1.1 }}>
              Air Jordan 1<br />Retro High OG
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontFamily: "'Inter', sans-serif", fontSize: "15px", marginBottom: "28px", lineHeight: 1.6 }}>Exclusively on AURA. Limited pairs available.</p>
            <div style={{ display: "flex", gap: "12px", marginBottom: "36px", flexWrap: "wrap" as const }}>
              {[[d, "Days"], [h, "Hours"], [m, "Min"], [s, "Sec"]].map(([v, l]) => box(v as number, l as string))}
            </div>
            <Link href="/shop"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 26px", borderRadius: "14px", background: "#fff", color: "#09090B", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "14px", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}>
              Shop the Drop →
            </Link>
          </motion.div>

          {/* RIGHT */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.15 }}
            className="hide-mobile"
            style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 40px 40px 0" }}>
            <div style={{ position: "absolute", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,255,0.4) 0%, transparent 65%)", filter: "blur(40px)" }} />
            <img src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=700&q=90" alt="Air Jordan 1"
              style={{ width: "100%", maxWidth: "400px", objectFit: "contain", transform: "rotate(-8deg) translateY(-10px)", filter: "drop-shadow(0 30px 50px rgba(124,92,255,0.5))", position: "relative", zIndex: 1, mixBlendMode: "screen" }}
              onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=700&q=90"; }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}