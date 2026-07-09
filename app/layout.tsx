import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/sections/navbar/Navbar";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { SearchModal } from "@/components/ui/SearchModal";
import { ToastProvider } from "@/components/ui/Toast";

export const metadata: Metadata = {
  title: "AURA — Premium Sneakers & Streetwear",
  description: "Elevate your style with AURA.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" style={{ overflowX: "hidden", width: "100%" }}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ margin: 0, padding: 0, width: "100%", overflowX: "hidden", backgroundColor: "#09090B", color: "#fff" }}>
        <ToastProvider>
          <Navbar />
          <main style={{ width: "100%", overflowX: "hidden" }}>{children}</main>
          <CartDrawer />
          <SearchModal />
        </ToastProvider>
      </body>
    </html>
  );
}
