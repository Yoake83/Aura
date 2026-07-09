"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal } from "lucide-react";
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
  const sizes = ["US 6", "US 7", "US 8", "US 9", "US 10", "US 11", "US 12"];
  const categories = [["all", "All Products"], ["sneakers", "Sneakers"], ["streetwear", "Streetwear"], ["accessories", "Accessories"], ["limited", "Limited"]];

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

  const inp: React.CSSProperties = { background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: "14px", fontFamily: "'Inter', sans-serif", width: "100%" };
  const filterLabel: React.CSSProperties = { fontSize: "11px", color: C.textMuted, fontFamily: "'Inter', sans-serif", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "12px", display: "block" };

  return (
    <div style={{ minHeight: "100vh", paddingTop: "70px", width: "100%", background: C.bg }}>
      {/* Header bar */}
      <div style={{ borderBottom: `1px solid ${C.border}`, padding: "20px 0" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "16px", flexWrap: "wrap" as const }}>
          <div>
            <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 700, fontSize: "28px", color: "#fff" }}>Shop</h1>
            <p style={{ color: C.textSecondary, fontFamily: "'Inter', sans-serif", fontSize: "14px", marginTop: "2px" }}>{filtered.length} products</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" as const }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", background: C.card, border: `1px solid ${C.border}`, borderRadius: "12px", padding: "10px 14px" }}>
              <Search size={14} color={C.textSecondary} />
              <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search..." style={inp} />
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)} style={{ background: C.card, border: `1px solid ${C.border}`, color: "#fff", fontSize: "14px", borderRadius: "12px", padding: "10px 14px", fontFamily: "'Inter', sans-serif", outline: "none", cursor: "pointer" }}>
              {sortOptions.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            <button onClick={() => setFiltersOpen(!filtersOpen)} style={{ display: "flex", alignItems: "center", gap: "8px", padding: "10px 16px", background: filtersOpen ? C.accent : C.card, border: `1px solid ${filtersOpen ? C.accent : C.border}`, color: "#fff", fontSize: "14px", borderRadius: "12px", fontFamily: "'Inter', sans-serif", cursor: "pointer", transition: "all 0.2s" }}>
              <SlidersHorizontal size={14} /> Filters
            </button>
          </div>
        </div>
      </div>

      {/* Category tabs */}
      <div style={{ borderBottom: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "0 24px", display: "flex", overflowX: "auto" }}>
          {categories.map(([val, lbl]) => (
            <button key={val} onClick={() => setCategory(val)}
              style={{ padding: "14px 20px", fontSize: "14px", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 500, whiteSpace: "nowrap", background: "none", border: "none", borderBottom: `2px solid ${category === val ? C.accent : "transparent"}`, color: category === val ? C.accent : C.textSecondary, cursor: "pointer", transition: "all 0.2s" }}>
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "32px 24px", display: "flex", gap: "32px" }}>
        {/* Filters sidebar */}
        <AnimatePresence initial={false}>
          {filtersOpen && (
            <motion.aside initial={{ width: 0, opacity: 0 }} animate={{ width: 240, opacity: 1 }} exit={{ width: 0, opacity: 0 }}
              style={{ flexShrink: 0, overflow: "hidden" }}>
              <div style={{ width: "240px" }}>
                {/* Price */}
                <div style={{ marginBottom: "32px" }}>
                  <span style={filterLabel}>Price Range</span>
                  <input type="range" min={0} max={200000} value={priceMax} onChange={(e) => setPriceMax(+e.target.value)} style={{ width: "100%" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
                    <span style={{ fontSize: "12px", color: C.textMuted, fontFamily: "'Inter', sans-serif" }}>₹0</span>
                    <span style={{ fontSize: "12px", color: "#fff", fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600 }}>₹{priceMax.toLocaleString("en-IN")}</span>
                  </div>
                </div>
                {/* Brands */}
                <div style={{ marginBottom: "32px" }}>
                  <span style={filterLabel}>Brand</span>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                    {brands.map((b) => (
                      <label key={b} style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }}>
                        <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} style={{ accentColor: C.accent }} />
                        <span style={{ fontSize: "14px", color: selectedBrands.includes(b) ? "#fff" : C.textSecondary, fontFamily: "'Inter', sans-serif" }}>{b}</span>
                      </label>
                    ))}
                  </div>
                </div>
                {/* Sizes */}
                <div>
                  <span style={filterLabel}>Size</span>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                    {sizes.map((s) => (
                      <button key={s} onClick={() => toggleSize(s)}
                        style={{ padding: "6px 12px", borderRadius: "8px", border: `1px solid ${selectedSizes.includes(s) ? C.accent : C.border}`, background: selectedSizes.includes(s) ? C.accent : "transparent", color: selectedSizes.includes(s) ? "#fff" : C.textSecondary, fontSize: "12px", fontFamily: "'Inter', sans-serif", cursor: "pointer", transition: "all 0.2s" }}>
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "80px 0" }}>
              <p style={{ fontFamily: "'Space Grotesk', sans-serif", color: C.textSecondary, fontSize: "18px" }}>No products found</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: `repeat(${filtersOpen ? 3 : 4}, 1fr)`, gap: "16px" }}>
              {filtered.map((p, i) => (
                <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
