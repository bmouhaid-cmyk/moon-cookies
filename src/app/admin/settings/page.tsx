"use client";

import { useState } from "react";
import { settings as defaultSettings } from "@/data/settings";
import { Save, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SettingsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState(defaultSettings);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Paramètres mis à jour avec succès ! (Le changement prendra effet après le déploiement sur GitHub)");
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || "Erreur lors de la mise à jour des paramètres.");
      }
    } catch (err) {
      alert("Erreur de connexion.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-serif text-choco mb-2">Paramètres du site</h1>
        <p className="text-choco/60">Gérez la configuration générale de votre site web.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* General section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-choco/10">
          <h2 className="text-xl font-serif text-choco mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-choco/5 flex items-center justify-center text-sm">1</span>
            Informations Générales
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-choco/80 mb-2">
                Numéro WhatsApp (Format international sans +)
              </label>
              <input
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                placeholder="212631639229"
                className="w-full px-4 py-3 rounded-xl border border-choco/20 bg-cream focus:outline-none focus:ring-2 focus:ring-choco/20 focus:border-choco transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-choco/80 mb-2">
                Adresse de contact
              </label>
              <input
                type="text"
                name="contactAddress"
                value={formData.contactAddress}
                onChange={handleChange}
                placeholder="Casablanca, Maroc"
                className="w-full px-4 py-3 rounded-xl border border-choco/20 bg-cream focus:outline-none focus:ring-2 focus:ring-choco/20 focus:border-choco transition-all"
              />
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-choco/10">
          <h2 className="text-xl font-serif text-choco mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-choco/5 flex items-center justify-center text-sm">2</span>
            Page d'accueil (Hero)
          </h2>
          
          <div className="grid grid-cols-1 gap-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-choco/80 mb-2">Titre (Partie 1)</label>
                <input
                  type="text"
                  name="heroTitle1"
                  value={formData.heroTitle1}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-choco/20 bg-cream focus:outline-none focus:ring-2 focus:ring-choco/20 focus:border-choco transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-choco/80 mb-2">Titre (Partie 2 en grand)</label>
                <input
                  type="text"
                  name="heroTitle2"
                  value={formData.heroTitle2}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-choco/20 bg-cream focus:outline-none focus:ring-2 focus:ring-choco/20 focus:border-choco transition-all"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-choco/80 mb-2">Sous-titre</label>
                <input
                  type="text"
                  name="heroSubtitle"
                  value={formData.heroSubtitle}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-choco/20 bg-cream focus:outline-none focus:ring-2 focus:ring-choco/20 focus:border-choco transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-choco/80 mb-2">Texte du bouton</label>
                <input
                  type="text"
                  name="heroButtonText"
                  value={formData.heroButtonText}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-choco/20 bg-cream focus:outline-none focus:ring-2 focus:ring-choco/20 focus:border-choco transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-choco/80 mb-2">Description d'accueil</label>
              <textarea
                name="heroDescription"
                value={formData.heroDescription}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 rounded-xl border border-choco/20 bg-cream focus:outline-none focus:ring-2 focus:ring-choco/20 focus:border-choco transition-all resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-choco/80 mb-2">URL de l'image (Optionnel)</label>
              <input
                type="text"
                name="heroImageUrl"
                value={formData.heroImageUrl}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-choco/20 bg-cream focus:outline-none focus:ring-2 focus:ring-choco/20 focus:border-choco transition-all"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-choco/10">
          <h2 className="text-xl font-serif text-choco mb-6 flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-choco/5 flex items-center justify-center text-sm">3</span>
            Réseaux Sociaux et Pied de page
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-choco/80 mb-2">Lien Instagram</label>
              <input
                type="url"
                name="instagramLink"
                value={formData.instagramLink}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-choco/20 bg-cream focus:outline-none focus:ring-2 focus:ring-choco/20 focus:border-choco transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-choco/80 mb-2">Handle Instagram (ex: @mooncookies)</label>
              <input
                type="text"
                name="instagramHandle"
                value={formData.instagramHandle}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-choco/20 bg-cream focus:outline-none focus:ring-2 focus:ring-choco/20 focus:border-choco transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-choco/80 mb-2">Texte du pied de page</label>
            <textarea
              name="footerDescription"
              value={formData.footerDescription}
              onChange={handleChange}
              rows={2}
              className="w-full px-4 py-3 rounded-xl border border-choco/20 bg-cream focus:outline-none focus:ring-2 focus:ring-choco/20 focus:border-choco transition-all resize-none"
            />
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-primary flex items-center gap-2"
          >
            {isSubmitting ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
            Enregistrer les paramètres
          </button>
        </div>
      </form>
    </div>
  );
}
