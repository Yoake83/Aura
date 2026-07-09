import { HeroSection } from "@/components/sections/hero/HeroSection";
import { CategoriesSection } from "@/components/sections/categories/CategoriesSection";
import { FeaturedProducts } from "@/components/sections/featured-products/FeaturedProducts";
import { LatestDrop } from "@/components/sections/latest-drop/LatestDrop";
import { EditorialBanner } from "@/components/sections/editorial/EditorialBanner";
import { Testimonials } from "@/components/sections/testimonials/Testimonials";
import { Footer } from "@/components/sections/footer/Footer";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedProducts />
      <LatestDrop />
      <EditorialBanner />
      <Testimonials />
      <Footer />
    </>
  );
}
