"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Clock, TrendingUp } from "lucide-react";
import { useStore } from "@/lib/store";
import { products } from "@/data/products";
import { useRouter } from "next/navigation";

const trending = ["Nike Air Max", "Yeezy 350", "Jordan 1", "Supreme Box Logo", "New Balance"];

export function SearchModal() {
  const { searchOpen, setSearchOpen, searchQuery, setSearchQuery, recentSearches, addRecentSearch } = useStore();
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [results, setResults] = useState(products);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [searchOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      setResults(products.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      ));
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) { e.preventDefault(); setSearchOpen(true); }
      if (e.key === "Escape") setSearchOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [setSearchOpen]);

  const handleSearch = (q: string) => {
    addRecentSearch(q);
    setSearchOpen(false);
    setSearchQuery("");
    router.push(`/shop?q=${encodeURIComponent(q)}`);
  };

  return (
    <AnimatePresence>
      {searchOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-start justify-center pt-20 px-4"
          style={{ background: "rgba(9,9,11,0.9)", backdropFilter: "blur(20px)" }}
          onClick={() => setSearchOpen(false)}
        >
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.97 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="w-full max-w-2xl bg-[#141418] rounded-[20px] border border-[#2A2A35] overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.6)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Input */}
            <div className="flex items-center gap-4 px-5 py-4 border-b border-[#2A2A35]">
              <Search size={20} className="text-[#7C5CFF] shrink-0" />
              <input
                ref={inputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && searchQuery.trim()) handleSearch(searchQuery); }}
                placeholder="Search sneakers, brands, styles..."
                className="flex-1 bg-transparent text-white text-base outline-none placeholder:text-text-secondary font-body"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-text-secondary hover:text-white">
                  <X size={16} />
                </button>
              )}
              <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 bg-[#09090B] rounded text-xs text-text-muted border border-[#2A2A35]">
                <span>ESC</span>
              </kbd>
            </div>

            <div className="p-4 max-h-[60vh] overflow-y-auto">
              {results.length > 0 ? (
                <div>
                  <p className="text-xs text-text-secondary uppercase tracking-wider mb-3 font-heading">Results</p>
                  {results.slice(0, 5).map((p) => (
                    <button
                      key={p.id}
                      onClick={() => { router.push(`/product/${p.id}`); setSearchOpen(false); setSearchQuery(""); }}
                      className="w-full flex items-center gap-4 p-3 rounded-[12px] hover:bg-[#09090B] transition-colors group text-left"
                    >
                      <div className="w-12 h-12 rounded-[10px] overflow-hidden bg-[#09090B] shrink-0">
                        <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <p className="text-white text-sm font-medium font-heading group-hover:text-[#7C5CFF] transition-colors">{p.name}</p>
                        <p className="text-text-secondary text-xs">{p.brand} · ₹{p.price.toLocaleString("en-IN")}</p>
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-6">
                  {recentSearches.length > 0 && (
                    <div>
                      <p className="text-xs text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2 font-heading">
                        <Clock size={12} /> Recent
                      </p>
                      {recentSearches.map((s) => (
                        <button key={s} onClick={() => handleSearch(s)} className="block text-sm text-text-secondary hover:text-white py-1.5 transition-colors font-body">
                          {s}
                        </button>
                      ))}
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-text-secondary uppercase tracking-wider mb-3 flex items-center gap-2 font-heading">
                      <TrendingUp size={12} /> Trending
                    </p>
                    {trending.map((t) => (
                      <button key={t} onClick={() => handleSearch(t)} className="block text-sm text-text-secondary hover:text-white py-1.5 transition-colors font-body">
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
