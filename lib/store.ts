import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/data/products";

interface CartItem extends Product {
  quantity: number;
  size: string;
  color: string;
}

interface StoreState {
  // Cart
  cart: CartItem[];
  cartOpen: boolean;
  addToCart: (product: Product, size: string, color: string) => void;
  removeFromCart: (id: string, size: string, color: string) => void;
  updateQuantity: (id: string, size: string, color: string, quantity: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  cartTotal: () => number;
  cartCount: () => number;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (id: string) => boolean;

  // Search
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  recentSearches: string[];
  addRecentSearch: (query: string) => void;

  // Checkout
  checkoutStep: number;
  setCheckoutStep: (step: number) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      cartOpen: false,
      addToCart: (product, size, color) =>
        set((state) => {
          const existing = state.cart.find(
            (i) => i.id === product.id && i.size === size && i.color === color
          );
          if (existing) {
            return {
              cart: state.cart.map((i) =>
                i.id === product.id && i.size === size && i.color === color
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return {
            cart: [...state.cart, { ...product, quantity: 1, size, color }],
          };
        }),
      removeFromCart: (id, size, color) =>
        set((state) => ({
          cart: state.cart.filter(
            (i) => !(i.id === id && i.size === size && i.color === color)
          ),
        })),
      updateQuantity: (id, size, color, quantity) =>
        set((state) => ({
          cart:
            quantity <= 0
              ? state.cart.filter(
                  (i) => !(i.id === id && i.size === size && i.color === color)
                )
              : state.cart.map((i) =>
                  i.id === id && i.size === size && i.color === color
                    ? { ...i, quantity }
                    : i
                ),
        })),
      clearCart: () => set({ cart: [] }),
      setCartOpen: (open) => set({ cartOpen: open }),
      cartTotal: () =>
        get().cart.reduce((sum, i) => sum + i.price * i.quantity, 0),
      cartCount: () =>
        get().cart.reduce((sum, i) => sum + i.quantity, 0),

      // Wishlist
      wishlist: [],
      toggleWishlist: (product) =>
        set((state) => ({
          wishlist: state.wishlist.find((p) => p.id === product.id)
            ? state.wishlist.filter((p) => p.id !== product.id)
            : [...state.wishlist, product],
        })),
      isWishlisted: (id) => get().wishlist.some((p) => p.id === id),

      // Search
      searchOpen: false,
      setSearchOpen: (open) => set({ searchOpen: open }),
      searchQuery: "",
      setSearchQuery: (query) => set({ searchQuery: query }),
      recentSearches: [],
      addRecentSearch: (query) =>
        set((state) => ({
          recentSearches: [
            query,
            ...state.recentSearches.filter((s) => s !== query),
          ].slice(0, 5),
        })),

      // Checkout
      checkoutStep: 1,
      setCheckoutStep: (step) => set({ checkoutStep: step }),
    }),
    {
      name: "aura-store",
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        recentSearches: state.recentSearches,
      }),
    }
  )
);