"use client";
import { useCartStore } from "@/store/cartStore";
import { X, Minus, Plus, ShoppingBag } from "lucide-react";

export default function CartDrawer() {
  const { items, isDrawerOpen, closeDrawer, removeItem, updateQuantity } = useCartStore();

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleCheckout = () => {
    const phoneNumber = "212631639229";
    const header = "Bonjour! Je voudrais commander:\n\n";
    const orderItems = items
      .map((item) => `- ${item.quantity}x ${item.name} (${item.price * item.quantity} DH)`)
      .join("\n");
    const footer = `\n\nTotal: ${total} DH\n\nMerci!`;
    const message = encodeURIComponent(header + orderItems + footer);
    
    window.location.href = `https://wa.me/${phoneNumber}?text=${message}`;
  };

  if (!isDrawerOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm transition-opacity"
        onClick={closeDrawer}
      />
      <div className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col bg-cream shadow-2xl transition-transform border-l border-choco/20 sm:w-96">
        <div className="flex items-center justify-between border-b border-choco/20 px-6 py-5 bg-cream-dark/30">
          <h2 className="text-xl font-bold text-choco flex items-center gap-2 font-serif tracking-wide">
            <ShoppingBag className="h-5 w-5 text-choco-light" /> Votre Panier
          </h2>
          <button 
            onClick={closeDrawer}
            className="rounded-full p-2 text-choco/70 hover:bg-choco/10 hover:text-choco transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-choco/50 font-serif">
              <ShoppingBag className="h-16 w-16 mb-4 opacity-30" />
              <p>Votre panier est vide.</p>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl border border-choco/20 bg-cream-dark/30">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between text-base font-medium text-choco font-serif">
                      <h3 className="line-clamp-1">{item.name}</h3>
                      <p className="ml-4 font-bold">{item.price * item.quantity} DH</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center rounded-lg border border-choco/20 bg-cream-dark/20 p-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="p-1 text-choco/70 hover:text-choco disabled:opacity-30 transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center font-medium text-choco">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 text-choco/70 hover:text-choco transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="font-medium text-choco hover:text-choco-light transition-colors underline"
                      >
                        Supprimer
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-choco/20 px-6 py-6 bg-cream-dark/30">
            <div className="flex justify-between text-xl font-bold text-choco mb-6 font-serif">
              <p>Total</p>
              <p>{total} DH</p>
            </div>
            <button
              onClick={handleCheckout}
              className="btn-primary w-full text-lg"
            >
              Commander (WhatsApp)
            </button>
          </div>
        )}
      </div>
    </>
  );
}
