"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Globe, Heart } from "lucide-react";
import { C } from "@/lib/styles";

const team = [
  { name: "Aryan Kapoor", role: "Founder & Creative Director", img: "https://picsum.photos/seed/aryan/400/400", quote: "Every sneaker tells a story. We're just the chapter where it finds its owner." },
  { name: "Meera Joshi", role: "Head of Curation", img: "https://picsum.photos/seed/meera/400/400", quote: "We don't stock products. We curate culture." },
  { name: "Rohan Verma", role: "Lead Designer", img: "https://picsum.photos/seed/rohan/400/400", quote: "The best design is invisible — it just feels right." },
];

const values = [
  { icon: Shield, title: "100% Authentic", desc: "Every product is verified through our 12-point authentication process. Zero fakes, guaranteed." },
  { icon: Zap, title: "Drop First", desc: "We partner directly with brands to give AURA members exclusive early access to limited releases." },
  { icon: Globe, title: "Pan-India Delivery", desc: "Free express delivery across India. Orders placed before 3PM ship the same day." },
  { icon: Heart, title: "Community First", desc: "AURA started as a community of sneakerheads. That's still what we are, just with a better website." },
];

const stats = [
  { value: "2019", label: "Founded" },
  { value: "50K+", label: "Happy Customers" },
  { value: "1200+", label: "Products Curated" },
  { value: "100%", label: "Authentic" },
];

export default function AboutPage() {
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section style={{ position: "relative", minHeight: "92vh", display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", paddingTop: "70px" }}>
        {/* Glows */}
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,92,255,0.14) 0%, transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "-100px", right: "-100px", width: "500px", height: "500px", borderRadius: "50%", background: "radial-gradient(circle, rgba(180,92,255,0.1) 0%, transparent 70%)", pointerEvents: "none" }} />

        {/* Big watermark */}
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", userSelect: "none", overflow: "hidden" }}>
          <span style={{ fontSize: "28vw", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "rgba(255,255,255,0.025)", letterSpacing: "-0.05em", lineHeight: 1, whiteSpace: "nowrap" }}>AURA</span>
        </div>

        <div style={{ position: "relative", zIndex: 10, maxWidth: "900px", margin: "0 auto", padding: "80px 24px", textAlign: "center" }}>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "7px 18px", borderRadius: "999px", background: C.card, border: `1px solid ${C.border}`, marginBottom: "32px" }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: C.accent, display: "block" }} />
            <span style={{ fontSize: "11px", color: C.textSecondary, fontFamily: "'Inter', sans-serif", letterSpacing: "0.14em", textTransform: "uppercase" }}>Est. 2019 · Mumbai, India</span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
            style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(3rem, 9vw, 8rem)", color: "#fff", lineHeight: 0.9, letterSpacing: "-0.03em", marginBottom: "36px" }}>
            We Don't<br />
            Sell{" "}
            <span style={{ WebkitTextStroke: "1.5px rgba(255,255,255,0.22)", color: "transparent" }}>Shoes.</span><br />
            We Sell<br />
            Culture.
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}
            style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "18px", lineHeight: 1.7, maxWidth: "520px", margin: "0 auto 44px" }}>
            AURA started in a small Mumbai apartment with a passion for sneakers and a frustration with fake products. Today we're India's most trusted premium streetwear destination.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.38 }}
            style={{ display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" as const }}>
            <Link href="/shop"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 28px", borderRadius: "14px", background: C.accent, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.accentHover)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.accent)}>
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link href="/collections"
              style={{ display: "inline-flex", alignItems: "center", gap: "10px", padding: "14px 28px", borderRadius: "14px", border: `1px solid ${C.border}`, color: C.textSecondary, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = C.accent; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.color = C.textSecondary; }}>
              View Collections
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section style={{ borderTop: `1px solid ${C.border}`, borderBottom: `1px solid ${C.border}`, background: C.card }}>
        <div className="grid-stats" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
              style={{ padding: "44px 24px", textAlign: "center", borderRight: i < stats.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff", marginBottom: "6px" }}>{s.value}</p>
              <p style={{ fontFamily: "'Inter', sans-serif", color: C.textSecondary, fontSize: "14px" }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── OUR STORY ── */}
      <section style={{ padding: "100px 0" }}>
        <div className="grid-2" style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", gap: "64px", alignItems: "center" }}>
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <p style={{ color: C.accent, fontSize: "11px", fontFamily: "'Inter', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>Our Story</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3.2rem)", color: "#fff", lineHeight: 1.1, marginBottom: "24px" }}>
              Born From a Passion,<br />Built on Trust
            </h2>
            <p style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "16px", lineHeight: 1.75, marginBottom: "20px" }}>
              In 2019, our founder Aryan was scammed buying fake Yeezys online. Instead of giving up, he built AURA — a platform where authenticity is non-negotiable. Every product goes through our 12-point verification process before it ever reaches a customer.
            </p>
            <p style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "16px", lineHeight: 1.75, marginBottom: "36px" }}>
              What started as a side project run from a Mumbai apartment now ships to every corner of India, with a community of 50,000+ sneakerheads who trust us with their most coveted purchases.
            </p>
            <Link href="/shop"
              style={{ display: "inline-flex", alignItems: "center", gap: "8px", color: C.accent, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px", textDecoration: "none", transition: "gap 0.2s" }}
              onMouseEnter={(e) => (e.currentTarget.style.gap = "14px")}
              onMouseLeave={(e) => (e.currentTarget.style.gap = "8px")}>
              Explore the Collection <ArrowRight size={16} />
            </Link>
          </motion.div>

          {/* Image with gradient overlay instead of relying on Unsplash */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} style={{ position: "relative" }}>
            <div style={{ borderRadius: "24px", overflow: "hidden", aspectRatio: "4/5", position: "relative", background: "linear-gradient(135deg, #12102a 0%, #1a1230 50%, #0d0d14 100%)" }}>
              {/* Decorative shoe image with blend */}
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&q=85"
                alt="Our Story"
                referrerPolicy="no-referrer"
                crossOrigin="anonymous"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", mixBlendMode: "luminosity", opacity: 0.7 }}
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = "none";
                }}
              />
              {/* Always-visible gradient content overlay */}
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(124,92,255,0.3) 0%, rgba(180,92,255,0.15) 50%, transparent 100%)" }} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px" }}>
                <div style={{ width: "100px", height: "100px", borderRadius: "50%", background: "linear-gradient(135deg, #7C5CFF, #B45CFF)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "24px", boxShadow: "0 0 60px rgba(124,92,255,0.5)" }}>
                  <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "36px", color: "#fff" }}>A</span>
                </div>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "28px", color: "#fff", textAlign: "center", marginBottom: "8px" }}>AURA</p>
                <p style={{ fontFamily: "'Inter', sans-serif", color: "rgba(255,255,255,0.5)", fontSize: "14px", letterSpacing: "0.15em", textTransform: "uppercase", textAlign: "center" }}>Premium · Authentic · Curated</p>
              </div>
            </div>
            {/* Floating stat card */}
            <div className="glass" style={{ position: "absolute", bottom: "-20px", left: "-20px", padding: "18px 22px", borderRadius: "16px", border: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "26px", color: "#fff", marginBottom: "2px" }}>50K+</p>
              <p style={{ fontFamily: "'Inter', sans-serif", color: C.textSecondary, fontSize: "13px" }}>Orders Delivered</p>
            </div>
            {/* Second floating card */}
            <div className="glass" style={{ position: "absolute", top: "20px", right: "-20px", padding: "18px 22px", borderRadius: "16px", border: `1px solid ${C.border}` }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "26px", color: "#fff", marginBottom: "2px" }}>100%</p>
              <p style={{ fontFamily: "'Inter', sans-serif", color: C.textSecondary, fontSize: "13px" }}>Authenticated</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ padding: "100px 0", background: C.card }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ color: C.accent, fontSize: "11px", fontFamily: "'Inter', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>What We Stand For</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff" }}>Our Values</h2>
          </div>
          <div className="grid-4" style={{ gap: "20px" }}>
            {values.map((v, i) => (
              <motion.div key={v.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                style={{ background: C.bg, borderRadius: "20px", border: `1px solid ${C.border}`, padding: "32px 24px", transition: "border-color 0.3s, transform 0.3s" }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(124,92,255,0.4)"; (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = C.border; (e.currentTarget as HTMLElement).style.transform = "none"; }}>
                <div style={{ width: "50px", height: "50px", borderRadius: "14px", background: "rgba(124,92,255,0.1)", border: "1px solid rgba(124,92,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
                  <v.icon size={22} color={C.accent} />
                </div>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "17px", marginBottom: "10px" }}>{v.title}</h3>
                <p style={{ fontFamily: "'Inter', sans-serif", color: C.textSecondary, fontSize: "14px", lineHeight: 1.65 }}>{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section style={{ padding: "100px 0", background: C.bg }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <p style={{ color: C.accent, fontSize: "11px", fontFamily: "'Inter', sans-serif", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>The People</p>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 4vw, 3rem)", color: "#fff" }}>Meet the Team</h2>
          </div>
          <div className="grid-3" style={{ gap: "24px" }}>
            {team.map((member, i) => (
              <motion.div key={member.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                style={{ background: C.card, borderRadius: "20px", border: `1px solid ${C.border}`, overflow: "hidden" }}>
                <div style={{ aspectRatio: "1", overflow: "hidden", background: C.elevated, position: "relative" }}>
                  <img src={member.img} alt={member.name}
                    referrerPolicy="no-referrer"
                    style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease", display: "block" }}
                    onMouseEnter={(e) => ((e.target as HTMLElement).style.transform = "scale(1.06)")}
                    onMouseLeave={(e) => ((e.target as HTMLElement).style.transform = "scale(1)")}
                    onError={(e) => {
                      const el = e.target as HTMLImageElement;
                      el.style.display = "none";
                      const parent = el.parentElement!;
                      parent.style.background = `linear-gradient(135deg, ${C.accent}33, #B45CFF22)`;
                      parent.innerHTML = `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-family:'Space Grotesk',sans-serif;font-size:48px;font-weight:700;color:#7C5CFF">${member.name[0]}</div>`;
                    }}
                  />
                </div>
                <div style={{ padding: "24px" }}>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "18px", marginBottom: "4px" }}>{member.name}</h3>
                  <p style={{ fontFamily: "'Inter', sans-serif", color: C.accent, fontSize: "13px", marginBottom: "16px" }}>{member.role}</p>
                  <p style={{ fontFamily: "'Inter', sans-serif", color: C.textSecondary, fontSize: "14px", lineHeight: 1.65, fontStyle: "italic" }}>"{member.quote}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ padding: "100px 0", background: C.card }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(124,92,255,0.15) 0%, rgba(180,92,255,0.08) 100%)", borderRadius: "28px", border: "1px solid rgba(124,92,255,0.25)", padding: "72px 48px", position: "relative", overflow: "hidden", textAlign: "center" }}>
            <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "300px", height: "300px", borderRadius: "50%", background: "radial-gradient(circle, rgba(124,92,255,0.2) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "200px", height: "200px", borderRadius: "50%", background: "radial-gradient(circle, rgba(180,92,255,0.15) 0%, transparent 70%)", pointerEvents: "none" }} />
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              style={{ position: "relative", zIndex: 1, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 4rem)", color: "#fff", lineHeight: 1.05, marginBottom: "20px" }}>
              Ready to Elevate<br />Your Style?
            </motion.h2>
            <p style={{ position: "relative", zIndex: 1, color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "17px", marginBottom: "40px" }}>
              Join 50,000+ sneakerheads who trust AURA for authentic drops.
            </p>
            <Link href="/shop"
              style={{ position: "relative", zIndex: 1, display: "inline-flex", alignItems: "center", gap: "10px", padding: "16px 36px", borderRadius: "14px", background: C.accent, color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "16px", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.background = C.accentHover)}
              onMouseLeave={(e) => (e.currentTarget.style.background = C.accent)}>
              Shop the Collection <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}