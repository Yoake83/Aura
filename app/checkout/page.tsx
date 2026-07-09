"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { Truck, CreditCard, Check, ChevronRight, Package } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { generateOrderId } from "@/lib/utils";
import { C } from "@/lib/styles";
import Image from "next/image";

const steps = ["Shipping", "Payment", "Confirm"];

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, cartTotal, clearCart, setCheckoutStep: setStoreStep, checkoutStep } = useStore();
  const [step, setStep] = useState(1);
  const [processing, setProcessing] = useState(false);
  const [shipping, setShipping] = useState({ name: "", email: "", phone: "", address: "", city: "", pincode: "" });
  const [payment, setPayment] = useState("upi");
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({ number: "", expiry: "", cvv: "", name: "" });

  const inp: React.CSSProperties = { width: "100%", padding: "12px 14px", background: C.bg, border: `1px solid ${C.border}`, borderRadius: "10px", color: "#fff", fontSize: "14px", fontFamily: "'Inter', sans-serif", outline: "none", boxSizing: "border-box" };
  const tax = Math.round(cartTotal() * 0.18);
  const total = cartTotal() + tax;

  if (cart.length === 0 && !processing) {
    return (
      <div style={{ minHeight: "100vh", paddingTop: "70px", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: "16px", background: C.bg }}>
        <Package size={48} color={C.border} />
        <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.textSecondary, fontSize: "18px" }}>Your cart is empty</p>
        <a href="/shop" style={{ padding: "12px 24px", background: C.accent, color: "#fff", borderRadius: "12px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px" }}>Go Shopping</a>
      </div>
    );
  }

  const placeOrder = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2500));
    const id = generateOrderId();
    clearCart();
    router.push(`/order-success?order=${id}`);
  };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "70px", width: "100%", background: C.bg, paddingBottom: "80px" }}>
      <div style={{ maxWidth: "1024px", margin: "0 auto", padding: "40px 24px" }}>
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "32px", color: "#fff", marginBottom: "40px" }}>Checkout</h1>

        {/* Steps */}
        <div style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}>
          {steps.map((s, i) => (
            <div key={s} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : "none" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, fontFamily: "'Space Grotesk', sans-serif", background: step > i + 1 ? "#00c758" : step === i + 1 ? C.accent : C.card, color: "#fff", border: step <= i + 1 && step !== i + 1 ? `1px solid ${C.border}` : "none", transition: "all 0.3s" }}>
                  {step > i + 1 ? <Check size={16} /> : i + 1}
                </div>
                <span style={{ fontSize: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, color: step === i + 1 ? "#fff" : C.textMuted }}>{s}</span>
              </div>
              {i < steps.length - 1 && <div style={{ flex: 1, height: "1px", margin: "0 16px", background: step > i + 1 ? "rgba(0,199,88,0.5)" : C.border, transition: "background 0.5s" }} />}
            </div>
          ))}
        </div>

        <div className="grid-checkout" style={{ gap: "32px" }}>
          {/* Left */}
          <div>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div key="ship" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div style={{ background: C.card, borderRadius: "20px", border: `1px solid ${C.border}`, padding: "24px", marginBottom: "16px" }}>
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "17px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <Truck size={18} color={C.accent} /> Shipping Details
                    </h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      <div style={{ gridColumn: "1/-1" }}>
                        <label style={{ display: "block", fontSize: "11px", color: C.textSecondary, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>Full Name *</label>
                        <input value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} placeholder="Arjun Mehta" style={inp} onFocus={(e) => (e.target.style.borderColor = C.accent)} onBlur={(e) => (e.target.style.borderColor = C.border)} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "11px", color: C.textSecondary, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>Email *</label>
                        <input type="email" value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} placeholder="arjun@email.com" style={inp} onFocus={(e) => (e.target.style.borderColor = C.accent)} onBlur={(e) => (e.target.style.borderColor = C.border)} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "11px", color: C.textSecondary, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>Phone *</label>
                        <input value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} placeholder="+91 98765 43210" style={inp} onFocus={(e) => (e.target.style.borderColor = C.accent)} onBlur={(e) => (e.target.style.borderColor = C.border)} />
                      </div>
                      <div style={{ gridColumn: "1/-1" }}>
                        <label style={{ display: "block", fontSize: "11px", color: C.textSecondary, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>Address *</label>
                        <input value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} placeholder="123, MG Road, Apartment 4B" style={inp} onFocus={(e) => (e.target.style.borderColor = C.accent)} onBlur={(e) => (e.target.style.borderColor = C.border)} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "11px", color: C.textSecondary, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>City *</label>
                        <input value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} placeholder="Mumbai" style={inp} onFocus={(e) => (e.target.style.borderColor = C.accent)} onBlur={(e) => (e.target.style.borderColor = C.border)} />
                      </div>
                      <div>
                        <label style={{ display: "block", fontSize: "11px", color: C.textSecondary, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>PIN Code *</label>
                        <input value={shipping.pincode} onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })} placeholder="400001" style={inp} onFocus={(e) => (e.target.style.borderColor = C.accent)} onBlur={(e) => (e.target.style.borderColor = C.border)} />
                      </div>
                    </div>
                  </div>
                  <button onClick={() => { if (Object.values(shipping).every(Boolean)) setStep(2); }}
                    style={{ width: "100%", padding: "16px", background: C.accent, color: "#fff", border: "none", borderRadius: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "15px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                    Continue to Payment <ChevronRight size={16} />
                  </button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div key="pay" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div style={{ background: C.card, borderRadius: "20px", border: `1px solid ${C.border}`, padding: "24px", marginBottom: "16px" }}>
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "17px", marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px" }}>
                      <CreditCard size={18} color={C.accent} /> Payment Method
                    </h2>
                    {[["upi", "UPI / GPay / PhonePe"], ["card", "Credit / Debit Card"], ["cod", "Cash on Delivery"]].map(([val, lbl]) => (
                      <div key={val} onClick={() => setPayment(val)}
                        style={{ padding: "16px", borderRadius: "14px", border: `1px solid ${payment === val ? C.accent : C.border}`, background: payment === val ? "rgba(124,92,255,0.08)" : "transparent", marginBottom: "12px", cursor: "pointer", transition: "all 0.2s" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                          <div style={{ width: "20px", height: "20px", borderRadius: "50%", border: `2px solid ${payment === val ? C.accent : C.border}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                            {payment === val && <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: C.accent }} />}
                          </div>
                          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, color: "#fff", fontSize: "15px" }}>{lbl}</span>
                        </div>
                        {payment === "upi" && val === "upi" && (
                          <input value={upi} onChange={(e) => setUpi(e.target.value)} placeholder="yourname@upi" style={{ ...inp, marginTop: "16px" }} onFocus={(e) => (e.target.style.borderColor = C.accent)} onBlur={(e) => (e.target.style.borderColor = C.border)} />
                        )}
                        {payment === "card" && val === "card" && (
                          <div style={{ marginTop: "16px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                            <div style={{ gridColumn: "1/-1" }}><input value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} placeholder="Card Number" style={inp} /></div>
                            <input value={card.expiry} onChange={(e) => setCard({ ...card, expiry: e.target.value })} placeholder="MM/YY" style={inp} />
                            <input value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} placeholder="CVV" style={inp} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button onClick={() => setStep(1)} style={{ flex: 1, padding: "16px", background: "transparent", color: C.textSecondary, border: `1px solid ${C.border}`, borderRadius: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}>Back</button>
                    <button onClick={() => setStep(3)} style={{ flex: 2, padding: "16px", background: C.accent, color: "#fff", border: "none", borderRadius: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "15px", cursor: "pointer" }}>Review Order →</button>
                  </div>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div key="confirm" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div style={{ background: C.card, borderRadius: "20px", border: `1px solid ${C.border}`, padding: "24px", marginBottom: "16px" }}>
                    <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "17px", marginBottom: "20px" }}>Order Review</h2>
                    <div style={{ padding: "16px", background: C.bg, borderRadius: "12px", marginBottom: "16px" }}>
                      <p style={{ fontSize: "11px", color: C.textMuted, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>Shipping to</p>
                      <p style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px" }}>{shipping.name}</p>
                      <p style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "14px", marginTop: "4px" }}>{shipping.address}, {shipping.city} — {shipping.pincode}</p>
                    </div>
                    <div style={{ padding: "16px", background: C.bg, borderRadius: "12px" }}>
                      <p style={{ fontSize: "11px", color: C.textMuted, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "8px" }}>Payment</p>
                      <p style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px" }}>{payment === "upi" ? `UPI — ${upi || "N/A"}` : payment === "card" ? "Credit / Debit Card" : "Cash on Delivery"}</p>
                    </div>
                  </div>
                  <div style={{ display: "flex", gap: "12px" }}>
                    <button onClick={() => setStep(2)} style={{ flex: 1, padding: "16px", background: "transparent", color: C.textSecondary, border: `1px solid ${C.border}`, borderRadius: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px", cursor: "pointer" }}>Back</button>
                    <button onClick={placeOrder} disabled={processing}
                      style={{ flex: 2, padding: "16px", background: processing ? C.border : "#00c758", color: "#fff", border: "none", borderRadius: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "15px", cursor: processing ? "not-allowed" : "pointer", transition: "background 0.3s" }}>
                      {processing ? "Processing..." : `Place Order — ${formatPrice(total)}`}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div style={{ background: C.card, borderRadius: "20px", border: `1px solid ${C.border}`, padding: "24px", height: "fit-content", position: "sticky", top: "90px" }}>
            <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "16px", marginBottom: "20px" }}>Order Summary</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "20px" }}>
              {cart.map((item) => (
                <div key={`${item.id}-${item.size}`} style={{ display: "flex", gap: "12px", alignItems: "center" }}>
                  <div style={{ width: "52px", height: "52px", borderRadius: "10px", overflow: "hidden", background: C.bg, flexShrink: 0 }}>
                    <img src={item.images[0]} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "13px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                    <p style={{ fontSize: "12px", color: C.textMuted, fontFamily: "'Inter', sans-serif" }}>Size {item.size} × {item.quantity}</p>
                  </div>
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "14px", flexShrink: 0 }}>{formatPrice(item.price * item.quantity)}</p>
                </div>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: "16px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[["Subtotal", formatPrice(cartTotal())], ["Shipping", "FREE"], ["Tax (GST 18%)", formatPrice(tax)]].map(([l, v]) => (
                <div key={l} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>{l}</span>
                  <span style={{ color: l === "Shipping" ? "#00c758" : "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px" }}>{v}</span>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", borderTop: `1px solid ${C.border}`, paddingTop: "12px", marginTop: "4px" }}>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "16px" }}>Total</span>
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "16px" }}>{formatPrice(total)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}