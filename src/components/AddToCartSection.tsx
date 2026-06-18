"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cartStore";
import { Product } from "@/data/products";
import { Minus, Plus, ShoppingBag } from "lucide-react";

export default function AddToCartSection({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((state) => state.addItem);
  const openDrawer = useCartStore((state) => state.openDrawer);

  const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
  const handleIncrease = () => setQuantity((prev) => prev + 1);

  const handleAddToCart = () => {
    addItem(product, quantity);
    openDrawer();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-8">
      {/* Quantity Selector */}
      <div className="flex items-center justify-between border-2 border-choco/20 rounded-full px-4 py-2 sm:w-1/3">
        <button 
          onClick={handleDecrease}
          className="p-2 text-choco hover:bg-choco/10 rounded-full transition-colors"
          disabled={quantity <= 1}
        >
          <Minus size={20} />
        </button>
        <span className="font-serif text-xl text-choco font-semibold w-8 text-center">{quantity}</span>
        <button 
          onClick={handleIncrease}
          className="p-2 text-choco hover:bg-choco/10 rounded-full transition-colors"
        >
          <Plus size={20} />
        </button>
      </div>

      {/* Add to Cart Button */}
      <button 
        onClick={handleAddToCart}
        className="flex-1 bg-choco text-cream font-serif text-xl sm:text-2xl rounded-full py-4 px-8 flex items-center justify-center gap-3 hover:bg-[#7a4c38] hover:scale-[1.02] transition-all duration-300 shadow-lg"
      >
        <ShoppingBag size={24} />
        AJOUTER AU PANIER
      </button>
    </div>
  );
}
