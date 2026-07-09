# AURA — Premium Sneakers & Streetwear

A luxury editorial e-commerce website built with Next.js 15, TypeScript, Tailwind CSS v4, Framer Motion, and Zustand.

## 🚀 Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 🛠 Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS v4** (via @tailwindcss/postcss)
- **Framer Motion** — page transitions, scroll reveals, parallax, floating animations
- **Zustand** — cart, wishlist, search, checkout state (persisted to localStorage)
- **Lucide React** — icons
- **canvas-confetti** — order success celebration
- **Google Fonts** — Space Grotesk (headings) + Inter (body)

## 📁 Structure

```
app/
  page.tsx              → Homepage (Hero + Categories + Products + Drop + Editorial + Testimonials)
  shop/page.tsx         → Shop with sidebar filters
  product/[id]/page.tsx → Product detail with gallery + size/color/quantity selector
  checkout/page.tsx     → 3-step checkout (Shipping → Payment → Confirm)
  order-success/page.tsx → Confetti success screen

components/
  ui/
    ProductCard.tsx      → Hover card with image swap, quick-add, wishlist
    SearchModal.tsx      → ⌘K search with trending + recent + live results
    Toast.tsx            → Animated toast notifications
    CustomCursor.tsx     → Purple dot + ring cursor (desktop)
  sections/
    navbar/Navbar.tsx    → Glassmorphism sticky navbar with cart/wishlist badges
    hero/HeroSection.tsx → Parallax hero with floating sneaker + ticker
    categories/          → 4-card category grid with hover zoom
    featured-products/   → 8-product grid
    latest-drop/         → Live countdown timer
    editorial/           → Scroll parallax banner
    testimonials/        → 3-card review section
    footer/Footer.tsx    → Minimal footer with links
  cart/CartDrawer.tsx    → Slide-in cart drawer
  
lib/
  store.ts              → Zustand store (cart, wishlist, search, recently viewed, checkout)
  utils.ts              → formatPrice (INR), generateOrderId, cn()

data/products.ts        → 8 products with images, variants, descriptions
```

## ✨ Features

- **Custom cursor** — purple dot + trailing ring with hover enlargement
- **Animated search modal** — ⌘K shortcut, live filtering, trending + recent
- **Cart drawer** — slide-in with quantity controls
- **Wishlist** — heart icon toggle with persistence
- **Recently viewed** — automatically tracked
- **Skeleton loading** on shop page
- **Toast notifications** for cart/wishlist actions
- **Countdown timer** on Latest Drop section
- **Parallax hero** with mouse tracking
- **Image zoom modal** on product page
- **3-step checkout** with shipping + payment + order review
- **Confetti** on order success
- **Responsive** — mobile first, works on all screen sizes

## 🎨 Design System

| Token | Value |
|-------|-------|
| Background | `#09090B` |
| Card | `#141418` |
| Accent | `#7C5CFF` |
| Accent Hover | `#9B82FF` |
| Border | `#2A2A35` |
| Text Secondary | `#A0A0B0` |
| Border Radius | `20px` |
| Heading Font | Space Grotesk |
| Body Font | Inter |

## 📦 Deploy to Vercel

```bash
npm run build
vercel --prod
```

Or push to GitHub and connect to Vercel — zero configuration needed.
