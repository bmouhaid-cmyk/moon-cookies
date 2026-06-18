import { products } from "@/data/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
  return (
    <section id="products" className="bg-cream py-24 sm:py-32 relative">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mx-auto text-center mb-16 max-w-2xl">
          <h2 className="text-4xl md:text-5xl font-serif text-choco mb-4">
            Notre Collection
          </h2>
          <p className="text-lg text-choco/70 font-sans">
            Des recettes exclusives, généreuses et irrésistibles. Laissez-vous tenter par nos créations signatures.
          </p>
        </div>
        
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Bottom Decorative Text */}
        <div className="mt-24 text-center text-choco">
          <p className="font-script text-3xl md:text-4xl leading-tight opacity-80 hover:opacity-100 transition-opacity duration-300">
            Fait avec amour, <br className="md:hidden" />partagé avec passion <span className="text-choco-light">♥</span>
          </p>
        </div>
      </div>
    </section>
  );
}
