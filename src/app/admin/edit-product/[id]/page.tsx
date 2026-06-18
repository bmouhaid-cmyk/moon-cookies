"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { Save, AlertCircle, Plus, Trash2 } from "lucide-react";
import { products } from "@/data/products";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  
  const resolvedParams = use(params);

  const [formData, setFormData] = useState({
    id: "",
    name: "",
    price: "",
    description: "",
    detailedDescription: "",
    imageUrl: "",
    images: "",
    ingredients: "",
  });

  const [detailedIngredients, setDetailedIngredients] = useState<{name: string, imageUrl: string}[]>([]);
  const [reheatAdvice, setReheatAdvice] = useState({ microwave: "", oven: "" });

  useEffect(() => {
    const product = products.find((p) => p.id === resolvedParams.id);
    if (product) {
        setFormData({
            id: product.id,
            name: product.name,
            price: product.price.toString(),
            description: product.description,
            detailedDescription: product.detailedDescription || "",
            imageUrl: product.imageUrl,
            images: product.images ? product.images.join(", ") : "",
            ingredients: product.ingredients ? product.ingredients.join(", ") : "",
        });
        
        if (product.detailedIngredients && product.detailedIngredients.length > 0) {
            setDetailedIngredients(product.detailedIngredients);
        } else {
            setDetailedIngredients([{ name: "", imageUrl: "" }]);
        }

        if (product.reheatAdvice) {
            setReheatAdvice({
                microwave: product.reheatAdvice.microwave || "",
                oven: product.reheatAdvice.oven || "",
            });
        }
    } else {
        setError("Produit non trouvé.");
    }
  }, [resolvedParams.id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleDetailedIngredientChange = (index: number, field: "name" | "imageUrl", value: string) => {
    const newIngredients = [...detailedIngredients];
    newIngredients[index][field] = value;
    setDetailedIngredients(newIngredients);
  };

  const addDetailedIngredient = () => {
    setDetailedIngredients([...detailedIngredients, { name: "", imageUrl: "" }]);
  };

  const removeDetailedIngredient = (index: number) => {
    const newIngredients = detailedIngredients.filter((_, i) => i !== index);
    setDetailedIngredients(newIngredients);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/api/products", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          price: Number(formData.price),
          images: formData.images ? formData.images.split(",").map(i => i.trim()).filter(i => i) : undefined,
          ingredients: formData.ingredients ? formData.ingredients.split(",").map(i => i.trim()).filter(i => i) : undefined,
          detailedIngredients: detailedIngredients.filter(i => i.name.trim() !== ""),
          reheatAdvice: {
            microwave: reheatAdvice.microwave.trim() || undefined,
            oven: reheatAdvice.oven.trim() || undefined,
          }
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Une erreur est survenue lors de la modification du produit.");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-serif text-choco">Modifier un produit</h1>
          <p className="text-choco/60 mt-1">Mettez à jour les informations de votre produit</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Basic Info */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-choco/10">
          <h2 className="text-xl font-serif text-choco mb-6 border-b border-choco/10 pb-4">Informations Principales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-1 md:col-span-2">
              <label className="block text-sm font-medium text-choco/80 mb-2">Nom du produit</label>
              <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full rounded-xl border border-choco/20 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all bg-white text-choco" />
            </div>
            <div>
              <label className="block text-sm font-medium text-choco/80 mb-2">Prix (DH)</label>
              <input type="number" name="price" required min="0" value={formData.price} onChange={handleChange} className="w-full rounded-xl border border-choco/20 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all bg-white text-choco" />
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-choco/10">
          <h2 className="text-xl font-serif text-choco mb-6 border-b border-choco/10 pb-4">Descriptions</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-choco/80 mb-2">Description courte</label>
              <textarea name="description" required rows={2} value={formData.description} onChange={handleChange} className="w-full rounded-xl border border-choco/20 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all bg-white text-choco"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-choco/80 mb-2">Description détaillée (SEO & Page Produit)</label>
              <textarea name="detailedDescription" rows={4} value={formData.detailedDescription} onChange={handleChange} className="w-full rounded-xl border border-choco/20 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all bg-white text-choco"></textarea>
            </div>
          </div>
        </div>

        {/* Media & Details */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-choco/10">
          <h2 className="text-xl font-serif text-choco mb-6 border-b border-choco/10 pb-4">Images & Ingrédients Basiques</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-choco/80 mb-2">URL de l'image principale</label>
              <input type="url" name="imageUrl" required value={formData.imageUrl} onChange={handleChange} className="w-full rounded-xl border border-choco/20 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all bg-white text-choco" />
            </div>
            <div>
              <label className="block text-sm font-medium text-choco/80 mb-2">Images Galerie (URLs séparées par des virgules)</label>
              <input type="text" name="images" value={formData.images} onChange={handleChange} className="w-full rounded-xl border border-choco/20 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all bg-white text-choco" />
            </div>
            <div>
              <label className="block text-sm font-medium text-choco/80 mb-2">Ingrédients Basiques (Texte simple, séparés par des virgules)</label>
              <input type="text" name="ingredients" value={formData.ingredients} onChange={handleChange} className="w-full rounded-xl border border-choco/20 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all bg-white text-choco" placeholder="ex: Farine, Sucre, Chocolat..." />
            </div>
          </div>
        </div>

        {/* Detailed Ingredients */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-choco/10">
          <div className="flex justify-between items-center border-b border-choco/10 pb-4 mb-6">
            <h2 className="text-xl font-serif text-choco">Ingrédients Détaillés (Avec Icônes)</h2>
            <button type="button" onClick={addDetailedIngredient} className="text-blue-500 hover:text-blue-600 flex items-center gap-1 font-medium text-sm transition-colors">
              <Plus size={16} /> Ajouter un ingrédient
            </button>
          </div>
          <div className="space-y-4">
            {detailedIngredients.map((ingredient, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-1">
                  <input type="text" placeholder="Nom de l'ingrédient (ex: Œufs frais)" value={ingredient.name} onChange={(e) => handleDetailedIngredientChange(index, "name", e.target.value)} className="w-full rounded-xl border border-choco/20 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all bg-white text-choco mb-2" />
                  <input type="url" placeholder="URL de l'icône/image" value={ingredient.imageUrl} onChange={(e) => handleDetailedIngredientChange(index, "imageUrl", e.target.value)} className="w-full rounded-xl border border-choco/20 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all bg-white text-choco" />
                </div>
                <button type="button" onClick={() => removeDetailedIngredient(index)} className="p-3 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-colors mt-1" title="Supprimer">
                  <Trash2 size={20} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Reheating Advice */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-choco/10">
          <h2 className="text-xl font-serif text-choco mb-6 border-b border-choco/10 pb-4">Conseils de réchauffage</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-choco/80 mb-2">Micro-ondes (ex: 10 à 15 secondes)</label>
              <input type="text" value={reheatAdvice.microwave} onChange={(e) => setReheatAdvice(prev => ({ ...prev, microwave: e.target.value }))} className="w-full rounded-xl border border-choco/20 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all bg-white text-choco" />
            </div>
            <div>
              <label className="block text-sm font-medium text-choco/80 mb-2">Four (ex: 3 à 5 minutes à 160°C)</label>
              <input type="text" value={reheatAdvice.oven} onChange={(e) => setReheatAdvice(prev => ({ ...prev, oven: e.target.value }))} className="w-full rounded-xl border border-choco/20 px-4 py-3 focus:ring-2 focus:ring-blue-200 focus:border-blue-500 outline-none transition-all bg-white text-choco" />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3 border border-red-100">
            <AlertCircle size={20} />
            {error}
          </div>
        )}

        {success && (
          <div className="bg-green-50 text-green-600 p-4 rounded-xl flex items-center gap-3 border border-green-100">
            Produit modifié avec succès ! La mise à jour sur GitHub a été déclenchée.
          </div>
        )}

        <div className="flex justify-end gap-4">
          <button type="button" onClick={() => router.push("/admin")} className="px-6 py-3 rounded-xl border border-choco/20 text-choco hover:bg-choco/5 font-medium transition-colors">
            Annuler
          </button>
          <button type="submit" disabled={loading} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-xl flex items-center gap-2 font-medium transition-colors shadow-sm disabled:opacity-50">
            <Save size={20} />
            {loading ? "Enregistrement..." : "Mettre à jour le produit"}
          </button>
        </div>
      </form>
    </div>
  );
}
