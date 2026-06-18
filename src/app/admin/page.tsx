"use client";

import { useState } from "react";
import { products } from "@/data/products";
import Link from "next/link";
import { Edit, Trash2, Plus, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Voulez-vous vraiment supprimer le produit "${name}" ?`)) return;

    setDeletingId(id);
    try {
      const res = await fetch("/api/products", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      if (res.ok) {
        alert("Produit supprimé avec succès ! (Le changement prendra effet après le déploiement sur GitHub)");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Erreur lors de la suppression.");
      }
    } catch (err) {
      alert("Erreur de connexion.");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-choco">Tableau de bord</h1>
          <p className="text-choco/60 mt-1">Gérez vos produits et votre contenu</p>
        </div>
        <Link 
          href="/admin/add-product"
          className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-colors font-medium shadow-sm"
        >
          <Plus size={20} />
          Ajouter un produit
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-choco/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-choco/5 text-choco/70 text-sm uppercase tracking-wider font-medium">
              <tr>
                <th className="px-6 py-4">Produit</th>
                <th className="px-6 py-4">Prix</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-choco/5">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-choco/[0.02] transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-lg bg-choco/5 flex items-center justify-center p-2 border border-choco/10">
                        <img src={product.imageUrl} alt={product.name} className="max-h-full max-w-full object-contain" />
                      </div>
                      <div>
                        <div className="font-serif text-choco font-bold">{product.name}</div>
                        <div className="text-sm text-choco/60 line-clamp-1 max-w-md">{product.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-choco">{product.price} DH</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/edit-product/${product.id}`} className="p-2 inline-flex text-choco/40 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors" title="Modifier">
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => handleDelete(product.id, product.name)}
                        disabled={deletingId === product.id}
                        className="p-2 text-choco/40 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50" 
                        title="Supprimer"
                      >
                        {deletingId === product.id ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {products.length === 0 && (
          <div className="text-center py-12 text-choco/60">
            Aucun produit trouvé.
          </div>
        )}
      </div>
    </div>
  );
}
