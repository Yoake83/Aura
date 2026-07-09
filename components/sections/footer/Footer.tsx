"use client";
import Link from "next/link";
import { C } from "@/lib/styles";

export function Footer() {
  return (
    <footer style={{ width: "100%", background: C.card, borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "56px 24px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "48px", marginBottom: "48px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "16px" }}>
              <div style={{ width: "32px", height: "32px", borderRadius: "8px", background: "linear-gradient(135deg, #7C5CFF, #B45CFF)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, color: "#fff" }}>A</div>
              <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "18px", color: "#fff" }}>AURA</span>
            </div>
            <p style={{ color: C.textMuted, fontFamily: "'Inter', sans-serif", fontSize: "14px", lineHeight: 1.65, maxWidth: "260px" }}>Premium sneakers, curated streetwear, and statement accessories.</p>
          </div>
          {[
            { title: "Shop", links: ["All Products", "Sneakers", "Streetwear", "Accessories", "Limited Drops"] },
            { title: "Support", links: ["FAQ", "Shipping & Returns", "Size Guide", "Track Order", "Contact Us"] },
            { title: "Company", links: ["About AURA", "Careers", "Press", "Partners", "Privacy Policy"] },
          ].map((col) => (
            <div key={col.title}>
              <h4 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "14px", marginBottom: "16px" }}>{col.title}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px" }}>
                {col.links.map((l) => (
                  <li key={l}><Link href="#" style={{ color: C.textMuted, fontFamily: "'Inter', sans-serif", fontSize: "14px", transition: "color 0.2s" }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                    onMouseLeave={(e) => (e.currentTarget.style.color = C.textMuted)}>{l}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <p style={{ color: C.textMuted, fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>© 2026 AURA. All rights reserved.</p>
          <p style={{ color: C.textMuted, fontFamily: "'Inter', sans-serif", fontSize: "13px" }}>Made with ♥ for sneakerheads</p>
        </div>
      </div>
    </footer>
  );
}
