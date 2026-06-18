import { products } from "@/data/products";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import AddToCartSection from "@/components/AddToCartSection";

// Generate Static Params for SEO & performance
export function generateStaticParams() {
  return products.map((product) => ({
    id: product.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);
  if (!product) return { title: "Produit non trouvé" };
  
  return {
    title: `${product.name} | Moon Cookies`,
    description: product.detailedDescription || product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = products.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-cream pt-24 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-choco/70 hover:text-choco mb-8 transition-colors group font-serif text-lg"
        >
          <ArrowLeft className="group-hover:-translate-x-1 transition-transform" />
          Retour à la boutique
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square w-full rounded-[2rem] overflow-hidden bg-choco/5 flex items-center justify-center p-8 border border-choco/10 shadow-sm">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-contain drop-shadow-xl hover:scale-105 transition-transform duration-500"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((img, idx) => (
                  <div key={idx} className="aspect-square rounded-2xl overflow-hidden bg-choco/5 flex items-center justify-center p-2 border border-choco/10 cursor-pointer hover:border-choco/40 transition-colors">
                     <img src={img} alt={`${product.name} view ${idx + 1}`} className="w-full h-full object-contain" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-serif text-choco uppercase mb-2">
              {product.name}
            </h1>
            <p className="text-2xl text-choco/80 font-serif mb-6">
              {product.price} DH
            </p>

            <div className="w-16 h-1 bg-choco/20 rounded-full mb-8"></div>

            <div className="prose prose-lg text-choco/80 mb-8 font-sans leading-relaxed">
              <p>{product.detailedDescription || product.description}</p>
            </div>

            {(!product.detailedIngredients || product.detailedIngredients.length === 0) && product.ingredients && (
              <div className="mb-10">
                <h3 className="text-xl font-serif text-choco mb-4">Ingrédients Principaux</h3>
                <ul className="grid grid-cols-2 gap-2">
                  {product.ingredients.map((ingredient, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-choco/70">
                      <CheckCircle2 size={16} className="text-[#8A5A44]" />
                      <span className="text-sm md:text-base">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <AddToCartSection product={product} />

            <div className="mt-12 bg-choco/5 rounded-2xl p-6 border border-choco/10">
              <h4 className="font-serif text-choco text-lg mb-2">Livraison & Conservation</h4>
              <p className="text-sm text-choco/70">
                Préparés à la commande. À conserver dans une boîte hermétique à température ambiante pendant 3 à 5 jours.
              </p>
            </div>
          </div>
        </div>

        {/* Dynamic Ingredients Section */}
        {product.detailedIngredients && product.detailedIngredients.length > 0 && (
          <div className="mt-24 max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="h-[1px] w-4 md:w-12 bg-choco/30"></div>
                <h2 className="text-2xl md:text-4xl font-serif text-choco tracking-widest uppercase">Nos Ingrédients</h2>
                <div className="h-[1px] w-4 md:w-12 bg-choco/30"></div>
              </div>
              <div className="flex justify-center">
                <svg className="w-4 h-4 text-choco/40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10">
              {product.detailedIngredients.map((ingredient, idx) => (
                <div key={idx} className="flex flex-col items-center group">
                  <div className="w-28 h-28 md:w-36 md:h-36 rounded-full overflow-hidden border border-choco/20 shadow-md bg-white mb-4 relative p-1 transition-transform duration-300 group-hover:scale-105">
                    <img src={ingredient.imageUrl} alt={ingredient.name} className="w-full h-full object-cover rounded-full" />
                  </div>
                  <h3 className="text-base md:text-lg font-serif text-choco text-center">{ingredient.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Reheating Advice Section */}
        {product.reheatAdvice && (product.reheatAdvice.microwave || product.reheatAdvice.oven) && (
          <div className="mt-24 max-w-4xl mx-auto border-t border-dashed border-choco/20 pt-16">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="h-[1px] w-4 md:w-12 bg-choco/30"></div>
                <h2 className="text-2xl md:text-4xl font-serif text-choco tracking-widest uppercase">Pour La Réchauffer</h2>
                <div className="h-[1px] w-4 md:w-12 bg-choco/30"></div>
              </div>
              <div className="flex justify-center">
                <svg className="w-4 h-4 text-choco/40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-stretch justify-center gap-8 relative">
              {product.reheatAdvice.microwave && (
                <div className="flex items-center gap-4 bg-white/50 p-6 rounded-3xl border border-choco/20 w-full md:w-auto md:min-w-[300px] shadow-sm">
                  <svg className="w-12 h-12 text-choco shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 8h16M4 16h16M4 8v8a2 2 0 002 2h12a2 2 0 002-2V8a2 2 0 00-2-2H6a2 2 0 00-2 2z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h8" /></svg>
                  <div>
                    <h4 className="font-serif text-choco font-bold text-lg leading-tight">Micro-ondes :</h4>
                    <p className="text-choco/80 font-sans mt-1">{product.reheatAdvice.microwave}</p>
                  </div>
                </div>
              )}

              {product.reheatAdvice.microwave && product.reheatAdvice.oven && (
                <div className="hidden md:flex flex-col items-center absolute left-1/2 -translate-x-1/2">
                   <div className="h-full w-[1px] border-l border-dashed border-choco/30 absolute top-0 bottom-0"></div>
                   <div className="bg-[#8A5A44] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm absolute top-1/2 -translate-y-1/2 border-4 border-cream shadow-sm z-10">OU</div>
                </div>
              )}
              {product.reheatAdvice.microwave && product.reheatAdvice.oven && (
                <div className="md:hidden flex items-center justify-center w-full py-2 relative">
                   <div className="w-full h-[1px] border-t border-dashed border-choco/30 absolute"></div>
                   <div className="bg-[#8A5A44] text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm relative z-10 border-4 border-cream shadow-sm">OU</div>
                </div>
              )}

              {product.reheatAdvice.oven && (
                <div className="flex items-center gap-4 bg-white/50 p-6 rounded-3xl border border-choco/20 w-full md:w-auto md:min-w-[300px] shadow-sm">
                  <svg className="w-12 h-12 text-choco shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="4" y="6" width="16" height="14" rx="2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M4 10h16M8 15h8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><circle cx="8" cy="8" r="0.5" fill="currentColor"/><circle cx="12" cy="8" r="0.5" fill="currentColor"/><circle cx="16" cy="8" r="0.5" fill="currentColor"/></svg>
                  <div>
                    <h4 className="font-serif text-choco font-bold text-lg leading-tight">Four :</h4>
                    <p className="text-choco/80 font-sans mt-1">{product.reheatAdvice.oven}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
