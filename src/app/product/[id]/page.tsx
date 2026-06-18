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

            {product.ingredients && (
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
      </div>
    </div>
  );
}
