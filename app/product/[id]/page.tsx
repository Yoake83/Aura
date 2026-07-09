"use client";
import { useState, use, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Star, ChevronLeft, ChevronRight, ZoomIn, Minus, Plus, Check } from "lucide-react";
import Link from "next/link";
import { products } from "@/data/products";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/Toast";
import { ProductCard } from "@/components/ui/ProductCard";
import { Footer } from "@/components/sections/footer/Footer";
import { formatPrice } from "@/lib/utils";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addToCart, addToWishlist, isWishlisted, addRecentlyViewed, setCartOpen } = useStore();
  const { showToast } = useToast();

  const [imgIndex, setImgIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [qty, setQty] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0]);
      setSelectedColor(product.colors[0]);
      addRecentlyViewed(product);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen pt-[70px] flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">😔</p>
          <h1 className="text-2xl font-heading font-bold text-white mb-3">Product Not Found</h1>
          <Link href="/shop" className="text-[#7C5CFF] font-body hover:underline">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const wishlisted = isWishlisted(product.id);
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) { showToast("Please select a size", "error"); return; }
    for (let i = 0; i < qty; i++) addToCart(product, selectedSize, selectedColor);
    setAddedToCart(true);
    showToast(`${product.name} added to cart!`);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleBuyNow = () => {
    if (!selectedSize) { showToast("Please select a size", "error"); return; }
    addToCart(product, selectedSize, selectedColor);
    setCartOpen(true);
  };

  return (
    <>
      <div style={{minHeight:"100vh",paddingTop:"70px",width:"100%"}}>
        {/* Breadcrumb */}
        <div className="px-6 py-4 border-b border-[#2A2A35]">
          <div style={{maxWidth:"1280px",margin:"0 auto",padding:"0 24px",display:"flex",alignItems:"center",gap:"8px",fontSize:"12px",color:"#A0A0B0"}}>
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-white">{product.name}</span>
          </div>
        </div>

        <div style={{maxWidth:"1280px",margin:"0 auto",padding:"40px 24px"}}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Gallery */}
            <div className="space-y-4">
              <div className="relative rounded-[20px] overflow-hidden bg-[#141418] aspect-square group cursor-zoom-in" onClick={() => setZoomOpen(true)}>
                <AnimatePresence mode="wait">
                  <motion.img
                    key={imgIndex}
                    src={product.images[imgIndex]}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35 }}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </AnimatePresence>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="glass rounded-[10px] p-2.5">
                    <ZoomIn size={16} className="text-white" />
                  </div>
                </div>
                {/* Nav arrows */}
                {product.images.length > 1 && (
                  <>
                    <button onClick={(e) => { e.stopPropagation(); setImgIndex((p) => (p - 1 + product.images.length) % product.images.length); }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#7C5CFF]">
                      <ChevronLeft size={16} />
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); setImgIndex((p) => (p + 1) % product.images.length); }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 glass rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#7C5CFF]">
                      <ChevronRight size={16} />
                    </button>
                  </>
                )}
                {/* Tags */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  {product.isNew && <span className="px-2.5 py-1 bg-[#7C5CFF] text-white text-[10px] font-heading font-bold rounded-full uppercase tracking-wider">New</span>}
                  {product.originalPrice && <span className="px-2.5 py-1 bg-green-500 text-white text-[10px] font-heading font-bold rounded-full uppercase tracking-wider">Sale</span>}
                </div>
              </div>
              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((img, i) => (
                  <button key={i} onClick={() => setImgIndex(i)}
                    className={`rounded-[12px] overflow-hidden aspect-square bg-[#141418] border-2 transition-all ${i === imgIndex ? "border-[#7C5CFF]" : "border-[#2A2A35] hover:border-[#3A3A48]"}`}>
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="lg:sticky lg:top-[90px] lg:self-start">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <p className="text-[#7C5CFF] text-xs font-body uppercase tracking-widest mb-1">{product.brand}</p>
                  <h1 className="text-3xl md:text-4xl font-heading font-bold text-white leading-tight">{product.name}</h1>
                </div>
                <button onClick={() => { addToWishlist(product); showToast(wishlisted ? "Removed from wishlist" : "Added to wishlist", wishlisted ? "error" : "success"); }}
                  className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all shrink-0 ${wishlisted ? "border-red-500 bg-red-500/10" : "border-[#2A2A35] hover:border-red-500/50"}`}>
                  <Heart size={18} className={wishlisted ? "fill-red-500 stroke-red-500" : "stroke-text-secondary"} />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-yellow-400 stroke-yellow-400" : "stroke-[#2A2A35] fill-transparent"} />
                  ))}
                </div>
                <span className="text-white font-heading font-semibold text-sm">{product.rating}</span>
                <span className="text-text-secondary font-body text-sm">({product.reviews} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-[#2A2A35]">
                <span className="text-4xl font-heading font-bold text-white">{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <>
                    <span className="text-text-muted text-lg font-body line-through">{formatPrice(product.originalPrice)}</span>
                    <span className="px-2 py-0.5 bg-green-500/15 text-green-400 text-xs font-heading font-bold rounded-full">
                      {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Color */}
              <div className="mb-6">
                <p className="text-white font-heading font-medium text-sm mb-3">
                  Color — <span className="text-text-secondary font-body font-normal">{selectedColor}</span>
                </p>
                <div className="flex gap-3">
                  {product.colors.map((c) => (
                    <button key={c} onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-all relative ${selectedColor === c ? "border-[#7C5CFF] scale-110" : "border-[#2A2A35] hover:border-[#7C5CFF]/50"}`}
                      style={{ background: c }}>
                      {selectedColor === c && <div className="absolute inset-0 rounded-full border-2 border-[#09090B] m-0.5" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white font-heading font-medium text-sm">Size</p>
                  <button className="text-[#7C5CFF] text-xs font-body hover:underline">Size Guide</button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button key={sz} onClick={() => setSelectedSize(sz)}
                      className={`px-4 py-2.5 rounded-[10px] text-sm font-heading font-medium transition-all min-w-[48px] ${selectedSize === sz ? "bg-[#7C5CFF] text-white" : "bg-[#141418] border border-[#2A2A35] text-text-secondary hover:border-[#7C5CFF]/50 hover:text-white"}`}>
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-8">
                <p className="text-white font-heading font-medium text-sm">Qty</p>
                <div className="flex items-center gap-3 bg-[#141418] border border-[#2A2A35] rounded-[12px] p-1">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-white transition-colors rounded-[8px] hover:bg-[#09090B]">
                    <Minus size={14} />
                  </button>
                  <span className="text-white font-heading font-semibold w-6 text-center">{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} className="w-8 h-8 flex items-center justify-center text-text-secondary hover:text-white transition-colors rounded-[8px] hover:bg-[#09090B]">
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleAddToCart}
                  className={`flex-1 flex items-center justify-center gap-2.5 py-4 rounded-[14px] font-heading font-bold text-sm tracking-wide transition-all duration-300 ${
                    addedToCart
                      ? "bg-green-500 text-white"
                      : "bg-[#7C5CFF] text-white hover:bg-[#9B82FF] animate-glow-pulse"
                  }`}
                >
                  {addedToCart ? <><Check size={16} /> Added!</> : <><ShoppingBag size={16} /> Add to Cart</>}
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleBuyNow}
                  className="flex-1 py-4 rounded-[14px] border-2 border-[#2A2A35] text-white font-heading font-bold text-sm tracking-wide hover:border-[#7C5CFF] hover:bg-[#7C5CFF]/10 transition-all"
                >
                  Buy Now
                </motion.button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { icon: "✓", label: "100% Authentic" },
                  { icon: "🚚", label: "Free Delivery" },
                  { icon: "↩", label: "Easy Returns" },
                ].map((b) => (
                  <div key={b.label} className="flex flex-col items-center gap-1.5 py-3 px-2 bg-[#141418] rounded-[12px] border border-[#2A2A35]">
                    <span className="text-base">{b.icon}</span>
                    <span className="text-text-secondary text-[10px] font-body text-center leading-tight">{b.label}</span>
                  </div>
                ))}
              </div>

              {/* Description */}
              <div className="border-t border-[#2A2A35] pt-6">
                <h3 className="text-white font-heading font-semibold text-sm mb-3">About this product</h3>
                <p className="text-text-secondary font-body text-sm leading-relaxed">{product.description}</p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {product.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-[#09090B] border border-[#2A2A35] rounded-full text-text-secondary text-xs font-body capitalize">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          {related.length > 0 && (
            <div className="mt-24">
              <h2 className="text-3xl font-heading font-bold text-white mb-8">
                You might <span className="gradient-text">also like</span>
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
                {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Zoom Modal */}
      <AnimatePresence>
        {zoomOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center bg-black/95 p-6 cursor-zoom-out"
            onClick={() => setZoomOpen(false)}>
            <motion.img
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}
              src={product.images[imgIndex]} alt={product.name}
              className="max-w-full max-h-full object-contain rounded-[20px]"
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Footer />
    </>
  );
}
