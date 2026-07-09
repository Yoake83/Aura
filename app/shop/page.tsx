"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ui/ProductCard";
import { C } from "@/lib/styles";

const sortOptions = ["Featured", "Newest", "Price: Low to High", "Price: High to Low", "Best Rated"];

export default function ShopPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("Featured");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [priceMax, setPriceMax] = useState(200000);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);

  const brands = [...new Set(products.map((p) => p.brand))];
  const sizes = ["US 7", "US 8", "US 9", "US 10", "US 11", "US 12"];
  const categories: [string, string][] = [["all", "All"], ["sneakers", "Sneakers"], ["streetwear", "Streetwear"], ["accessories", "Accessories"], ["limited", "Limited"]];

  const filtered = useMemo(() => {
    let r = [...products];
    if (search) r = r.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()));
    if (category !== "all") r = r.filter((p) => p.category.toLowerCase() === category || p.tags.some((t) => t.toLowerCase().includes(category)));
    if (selectedBrands.length) r = r.filter((p) => selectedBrands.includes(p.brand));
    if (selectedSizes.length) r = r.filter((p) => p.sizes.some((s) => selectedSizes.includes(s)));
    r = r.filter((p) => p.price <= priceMax);
    if (sort === "Newest") r = [...r.filter((p) => p.isNew), ...r.filter((p) => !p.isNew)];
    if (sort === "Price: Low to High") r.sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") r.sort((a, b) => b.price - a.price);
    if (sort === "Best Rated") r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [search, category, sort, selectedBrands, selectedSizes, priceMax]);

  const toggleBrand = (b: string) => setSelectedBrands((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);
  const toggleSize = (s: string) => setSelectedSizes((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const filterLabel: React.CSSProperties = {
    fontSize: "11px", color: C.textMuted, fontFamily: "'Inter', sans-serif",
    textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "12px", display: "block",
  };

  const FilterPanel = () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Price */}
      <div>
        <span style={filterLabel}>Price Range</span>
        <input type="range" min={0} max={200000} value={priceMax} onChange={(e) => setPriceMax(+e.target.value)} />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
          <span style={{ fontSize: "12px", color: C.textMuted, fontFamily: "'Inter', sans-serif" }}>₹0</span>
          <span style={{ fontSize: "12px", color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>₹{priceMax.toLocaleString("en-IN")}</span>
        </div>
      </div>
      {/* Brands */}
      <div>
        <span style={filterLabel}>Brand</span>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {brands.map((b) => (
            <label key={b} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
              <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} style={{ accentColor: C.accent, width: "16px", height: "16px" }} />
              <span style={{ fontSize: "14px", color: selectedBrands.includes(b) ? "#fff" : C.textSecondary, fontFamily: "'Inter', sans-serif" }}>{b}</span>
            </label>
          ))}
        </div>
      </div>
      {/* Sizes */}
      <div>
        <span style={filterLabel}>Size</span>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "8px" }}>
          {sizes.map((s) => (
            <button key={s} onClick={() => toggleSize(s)}
              style={{ padding: "8px 14px", borderRadius: "8px", border: `1px solid ${selectedSizes.includes(s) ? C.accent : C.border}`, background: selectedSizes.includes(s) ? C.accent : "transparent", color: selectedSizes.includes(s) ? "#fff" : C.textSecondary, fontSize: "13px", fontFamily: "'Inter', sans-serif", cursor: "pointer", transition: "all 0.2s" }}>
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", paddingTop: "70px", width: "100%", background: C.bg }}>

      {/* Header */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "16px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px", flexWrap: "wrap" as const }}>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "24px", color: "#fff" }}>Shop</h1>
            <p style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "13px", marginTop: "2px" }}>{filtered.length} products</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" as const }}>
            {/* Search */}
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "9px 14px" }}>
              <Search size={14} color={C.textSecondary} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." style={{ background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "14px", fontFamily: "'Inter', sans-serif", width: "120px" }} />
            </div>
            {/* Sort */}
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ background: C.card, border: `1px solid ${C.border}`, color: "#fff", fontSize: "13px", borderRadius: "12px", padding: "9px 12px", fontFamily: "'Inter', sans-serif", outline: "none", cursor: "pointer" }}>
              {sortOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            {/* Filter toggle */}
            <button onClick={() => setFiltersOpen(!filtersOpen)}
              style={{ display: "flex", alignItems: "center", gap: "6px", padding: "9px 14px", background: filtersOpen ? C.accent : C.card, border: `1px solid ${filtersOpen ? C.accent : C.border}`, color: "#fff", fontSize: "13px", borderRadius: "12px", fontFamily: "'Inter', sans-serif", cursor: "pointer", whiteSpace: "nowrap" as const }}>
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 16px", display: "flex", overflowX: "auto" }} className="no-scrollbar">
          {categories.map(([val, lbl]) => (
            <button key={val} onClick={() => setCategory(val)}
              style={{ padding: "12px 16px", fontSize: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, whiteSpace: "nowrap", background: "none", border: "none", borderBottom: `2px solid ${category === val ? C.accent : "transparent"}`, color: category === val ? C.accent : C.textSecondary, cursor: "pointer", transition: "all 0.2s" }}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Desktop: sidebar + grid. Mobile: just grid (filters in bottom sheet) */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "24px 16px" }}>

        {/* Desktop filter sidebar + grid */}
        <div style={{ display: "flex", gap: "32px", alignItems: "flex-start" }}>
          {/* Desktop sidebar — hidden on mobile via CSS */}
          <AnimatePresence initial={false}>
            {filtersOpen && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }} animate={{ width: 240, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
                className="desktop-filter-sidebar"
                style={{ flexShrink: 0, overflow: "hidden" }}>
                <div style={{ width: "240px", background: C.card, borderRadius: "16px", border: `1px solid ${C.border}`, padding: "20px" }}>
                  <FilterPanel />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product grid */}
          <div style={{ flex: 1, minWidth: 0 }}>
            {filtered.length === 0 ? (
              <div style={{ textAlign: "center", padding: "80px 0" }}>
                <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.textSecondary, fontSize: "18px" }}>No products found</p>
                <button onClick={() => { setSearch(""); setSelectedBrands([]); setSelectedSizes([]); setCategory("all"); }}
                  style={{ marginTop: "16px", padding: "10px 20px", background: C.accent, color: "#fff", border: "none", borderRadius: "10px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "14px", cursor: "pointer" }}>
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="shop-grid">
                {filtered.map((p, i) => (
                  <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <ProductCard product={p} />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter bottom sheet */}
      <AnimatePresence>
        {filtersOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setFiltersOpen(false)}
              className="mobile-filter-backdrop"
              style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 200, display: "none" }} />
            <motion.div
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="mobile-filter-sheet"
              style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 201, background: C.card, borderRadius: "20px 20px 0 0", padding: "20px", maxHeight: "80vh", overflowY: "auto", display: "none", borderTop: `1px solid ${C.border}` }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "24px" }}>
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, color: "#fff", fontSize: "18px" }}>Filters</h3>
                <button onClick={() => setFiltersOpen(false)} style={{ background: C.bg, border: `1px solid ${C.border}`, borderRadius: "8px", width: "36px", height: "36px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff" }}>
                  <X size={16} />
                </button>
              </div>
              <FilterPanel />
              <button onClick={() => setFiltersOpen(false)}
                style={{ width: "100%", marginTop: "24px", padding: "14px", background: C.accent, color: "#fff", border: "none", borderRadius: "12px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "15px", cursor: "pointer" }}>
                Show {filtered.length} Products
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        /* Desktop: sidebar visible, mobile sheet hidden */
        .desktop-filter-sidebar { display: block !important; }
        .mobile-filter-backdrop,
        .mobile-filter-sheet { display: none !important; }

        /* Product grid: 4 cols desktop → 3 tablet → 2 mobile → 1 small */
        .shop-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 16px;
        }

        @media (max-width: 1024px) {
          .shop-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 768px) {
          /* Hide desktop sidebar, show mobile sheet */
          .desktop-filter-sidebar { display: none !important; }
          .mobile-filter-backdrop,
          .mobile-filter-sheet { display: block !important; }
          /* 2 columns on tablet-mobile */
          .shop-grid { grid-template-columns: repeat(2, 1fr); gap: 12px; }
        }

        @media (max-width: 480px) {
          /* Single column on small phones so nothing is cut off */
          .shop-grid { grid-template-columns: 1fr; gap: 12px; }
        }
      `}</style>
    </div>
  );
}