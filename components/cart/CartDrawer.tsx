"use client";
import { motion, AnimatePresence } from "framer-motion";
import { X, ShoppingBag, Minus, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";
import { C } from "@/lib/styles";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, updateQuantity, cartTotal, cartCount } = useStore();

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 150, backdropFilter: "blur(4px)" }} />
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 28, stiffness: 300 }}
            style={{ position: "fixed", right: 0, top: 0, height: "100%", width: "100%", maxWidth: "420px", zIndex: 151, background: C.card, borderLeft: `1px solid ${C.border}`, display: "flex", flexDirection: "column" }}>
            {/* Header */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <ShoppingBag size={18} color={C.accent} />
                <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "17px" }}>Cart</span>
                {cartCount() > 0 && <span style={{ background: C.accent, color: "#fff", borderRadius: "50%", width: "20px", height: "20px", fontSize: "11px", fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>{cartCount()}</span>}
              </div>
              <button onClick={() => setCartOpen(false)} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: "10px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", color: C.textSecondary, cursor: "pointer" }}>
                <X size={16} />
              </button>
            </div>

            {/* Items */}
            <div style={{ flex: 1, overflowY: "auto", padding: "16px 24px" }}>
              {cart.length === 0 ? (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "16px" }}>
                  <ShoppingBag size={48} color={C.border} />
                  <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.textMuted, fontSize: "16px" }}>Your cart is empty</p>
                  <button onClick={() => setCartOpen(false)} style={{ padding: "12px 24px", background: C.accent, color: "#fff", border: "none", borderRadius: "12px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>Start Shopping</button>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {cart.map((item) => (
                    <div key={`${item.id}-${item.size}-${item.color}`} style={{ display: "flex", gap: "12px", padding: "16px", background: C.bg, borderRadius: "14px", border: `1px solid ${C.border}` }}>
                      <div style={{ width: "80px", height: "80px", borderRadius: "12px", overflow: "hidden", flexShrink: 0, background: C.card }}>
                        <img src={item.images[0]} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "14px", marginBottom: "4px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.name}</p>
                        <p style={{ fontSize: "12px", color: C.textMuted, fontFamily: "'Inter', sans-serif", marginBottom: "12px" }}>Size {item.size}</p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                            <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity - 1)} style={{ width: "28px", height: "28px", borderRadius: "8px", background: C.card, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}><Minus size={12} /></button>
                            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, color: "#fff", fontSize: "14px", minWidth: "20px", textAlign: "center" }}>{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, item.size, item.color, item.quantity + 1)} style={{ width: "28px", height: "28px", borderRadius: "8px", background: C.card, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}><Plus size={12} /></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id, item.size, item.color)} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, padding: "4px" }}><Trash2 size={14} /></button>
                        </div>
                      </div>
                      <p style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "15px", flexShrink: 0 }}>{formatPrice(item.price * item.quantity)}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div style={{ padding: "20px 24px", borderTop: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>Subtotal</span>
                  <span style={{ color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px" }}>{formatPrice(cartTotal())}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "20px" }}>
                  <span style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "14px" }}>Shipping</span>
                  <span style={{ color: "#05df72", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px" }}>FREE</span>
                </div>
                <Link href="/checkout" onClick={() => setCartOpen(false)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", width: "100%", padding: "14px", background: C.accent, color: "#fff", borderRadius: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "15px", textDecoration: "none", textAlign: "center", boxSizing: "border-box" }}>
                  Checkout — {formatPrice(cartTotal())}
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
