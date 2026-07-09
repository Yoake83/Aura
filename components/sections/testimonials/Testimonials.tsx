"use client";
import { motion } from "framer-motion";
import { C } from "@/lib/styles";

const testimonials = [
  { name: "Arjun Mehta", handle: "@arjun.kicks", text: "AURA has completely changed how I shop for sneakers. The curation is insane and delivery was super fast.", rating: 5, avatar: "AM" },
  { name: "Priya Sharma", handle: "@priya.style", text: "Got the Off-White cargos and I'm obsessed. Quality is unmatched and the packaging felt premium.", rating: 5, avatar: "PS" },
  { name: "Rohan Kapoor", handle: "@rohan.drops", text: "Copped the Yeezy 350s during a drop. Site was smooth, no bots. Legit experience all the way.", rating: 5, avatar: "RK" },
];

export function Testimonials() {
  return (
    <section style={{ width: "100%", background: C.bg, padding: "80px 0" }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <p style={{ color: C.accent, fontSize: "11px", fontFamily: "'Inter', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "8px" }}>What people say</p>
          <h2 style={{ fontSize: "clamp(1.8rem, 4vw, 3rem)", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff" }}>Community Love</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
          {testimonials.map((t, i) => (
            <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              style={{ background: C.card, borderRadius: "20px", border: `1px solid ${C.border}`, padding: "28px" }}>
              <div style={{ display: "flex", gap: "2px", marginBottom: "16px" }}>
                {"★★★★★".split("").map((s, j) => <span key={j} style={{ color: "#fac800", fontSize: "14px" }}>{s}</span>)}
              </div>
              <p style={{ color: "#fff", fontFamily: "'Inter', sans-serif", fontSize: "15px", lineHeight: 1.65, marginBottom: "20px" }}>"{t.text}"</p>
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: `linear-gradient(135deg, ${C.accent}, #B45CFF)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 700, color: "#fff" }}>{t.avatar}</div>
                <div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "14px" }}>{t.name}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", color: C.textMuted, fontSize: "12px" }}>{t.handle}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
