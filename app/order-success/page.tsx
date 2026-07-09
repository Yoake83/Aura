"use client";
import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { CheckCircle, Package, Truck, Home } from "lucide-react";
import confetti from "canvas-confetti";
import { C } from "@/lib/styles";

function OrderSuccessContent() {
  const params = useSearchParams();
  const orderId = params.get("order") || "AUR-000000";

  useEffect(() => {
    confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 }, colors: ["#7C5CFF", "#B45CFF", "#fff"] });
  }, []);

  const steps = [
    { icon: CheckCircle, label: "Order Confirmed", done: true },
    { icon: Package, label: "Being Packed", done: true },
    { icon: Truck, label: "Out for Delivery", done: false },
    { icon: Home, label: "Delivered", done: false },
  ];

  return (
    <div style={{ minHeight: "100vh", paddingTop: "70px", display: "flex", alignItems: "center", justifyContent: "center", padding: "70px 24px 48px", background: C.bg }}>
      <div style={{ maxWidth: "560px", width: "100%", textAlign: "center" }}>
        <motion.div initial={{ scale: 0, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
          style={{ width: "112px", height: "112px", borderRadius: "50%", background: "linear-gradient(135deg, #7C5CFF, #B45CFF)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px", boxShadow: "0 0 60px rgba(124,92,255,0.5)" }}>
          <CheckCircle size={52} color="#fff" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "clamp(2rem, 5vw, 3rem)", color: "#fff", marginBottom: "12px", lineHeight: 1.1 }}>
            Order Placed<br />
            <span className="gradient-text">Successfully!</span>
          </h1>
          <p style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "16px", lineHeight: 1.65, marginBottom: "32px" }}>
            Your order has been confirmed and is being prepared. You'll receive a confirmation email shortly.
          </p>
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "16px", padding: "16px 24px", display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "40px" }}>
            <span style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>Order ID:</span>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: C.accent, fontSize: "15px" }}>{orderId}</span>
          </div>

          {/* Progress */}
          <div style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "20px", padding: "24px", marginBottom: "32px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
              <div style={{ position: "absolute", top: "20px", left: "10%", right: "10%", height: "2px", background: C.border, zIndex: 0 }} />
              {steps.map((s, i) => (
                <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", zIndex: 1 }}>
                  <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: s.done ? C.accent : C.bg, border: `2px solid ${s.done ? C.accent : C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <s.icon size={18} color={s.done ? "#fff" : C.textMuted} />
                  </div>
                  <span style={{ fontSize: "11px", color: s.done ? "#fff" : C.textMuted, fontFamily: "'Inter', sans-serif", textAlign: "center", maxWidth: "64px" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/shop" style={{ padding: "14px 28px", background: C.accent, color: "#fff", borderRadius: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px" }}>Continue Shopping</Link>
            <Link href="/" style={{ padding: "14px 28px", background: "transparent", border: `1px solid ${C.border}`, color: C.textSecondary, borderRadius: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px" }}>Back to Home</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return <Suspense><OrderSuccessContent /></Suspense>;
}
