import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <FeaturesSection />
      <ProductGrid />
      <Footer />
    </div>
  );
}
