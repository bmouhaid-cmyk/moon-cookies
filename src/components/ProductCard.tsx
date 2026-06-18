import { Product } from "@/data/products";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link 
      href={`/product/${product.id}`}
      className="group relative flex flex-col w-full h-full bg-cream-dark/10 hover:bg-cream-dark/30 transition-colors duration-500 rounded-3xl overflow-hidden border border-choco/5 hover:border-choco/10 shadow-sm hover:shadow-xl"
    >
      {/* Image Container */}
      <div className="relative w-full aspect-[4/3] bg-choco/5 flex items-center justify-center p-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.8)_0%,transparent_70%)] opacity-50 group-hover:opacity-100 transition-opacity duration-500" />
        
        <div className="relative w-full h-full transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-3 z-10">
          <Image 
            src={product.imageUrl} 
            alt={product.name} 
            fill
            className="object-contain drop-shadow-xl"
          />
        </div>
        
        {/* Quick Price Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-choco font-bold font-serif px-3 py-1.5 rounded-full shadow-sm border border-white/50 z-20 transition-transform duration-300 group-hover:scale-105 text-sm">
          {product.price} DH
        </div>
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col flex-1">
        <div className="mb-2 inline-flex items-center gap-2 text-choco/40 text-xs font-medium tracking-widest uppercase">
          <span>Collection</span>
          <span className="w-4 h-px bg-choco/20"></span>
        </div>
        
        <h3 className="text-2xl font-serif text-choco mb-3 transition-colors group-hover:text-choco-light">
          {product.name}
        </h3>
        
        <p className="text-choco/70 font-sans text-sm mb-6 line-clamp-2">
          {product.description}
        </p>
        
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-choco/10">
          <span className="text-choco text-sm font-serif italic">
            Découvrir
          </span>
          <div className="w-8 h-8 rounded-full bg-cream shadow-sm border border-choco/10 flex items-center justify-center group-hover:bg-choco group-hover:text-cream transition-all duration-300 group-hover:scale-110">
            <ArrowUpRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </Link>
  );
}
