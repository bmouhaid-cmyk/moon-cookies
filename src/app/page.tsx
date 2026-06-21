import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import FeaturesSection from "@/components/FeaturesSection";
import AboutSection from "@/components/AboutSection";
import Testimonials from "@/components/Testimonials";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <ProductGrid />
      <FeaturesSection />
      <AboutSection />
      <Testimonials />
      <Marquee />
      <Footer />
    </div>
  );
}
