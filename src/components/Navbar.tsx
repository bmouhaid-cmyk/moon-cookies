"use client";
import { ShoppingCart, Cookie } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const openDrawer = useCartStore((state) => state.openDrawer);
  
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-choco/20 bg-cream/90 backdrop-blur-sm">
      <div className="container mx-auto flex h-24 items-center justify-between px-6 relative">
        
        {/* Spacer for flex layout */}
        <div className="w-12"></div>

        {/* Center Logo */}
        <Link href="/" className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center group z-10">
          <div className="relative h-20 w-20 md:h-24 md:w-24 transition-transform duration-300 group-hover:scale-105">
            <Image
              src="/logo.png"
              alt="Moon Cookies Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <button 
          onClick={openDrawer}
          className="relative flex h-12 w-12 items-center justify-center rounded-full bg-transparent border border-choco/30 text-choco transition-all hover:bg-choco hover:text-cream"
          aria-label="Open cart"
        >
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-choco text-[11px] font-bold text-cream border border-cream">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </nav>
  );
}
