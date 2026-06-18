"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldAlert } from "lucide-react";

export default function AdminLogin() {
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Une erreur est survenue");
      }
    } catch (err) {
      setError("Erreur de connexion");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex items-center justify-center p-4">
      <div className="bg-white rounded-[2rem] shadow-xl p-8 max-w-md w-full border border-choco/10 text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-choco/5 rounded-full blur-2xl"></div>
        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl"></div>

        <div className="relative z-10">
          <div className="mx-auto w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mb-6">
            <ShieldAlert className="text-blue-500" size={40} />
          </div>

          <h1 className="text-3xl font-serif text-choco mb-2">Tableau de bord</h1>
          <p className="text-choco/60 mb-8 font-medium">Entrez le code PIN pour continuer</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-choco/80 text-left mb-2">Code PIN</label>
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full text-center tracking-[0.5em] text-2xl py-3 rounded-xl border border-choco/20 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all bg-white text-choco font-bold shadow-sm"
                placeholder="••••••"
                maxLength={10}
                required
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || pin.length < 4}
              className="w-full bg-blue-400 hover:bg-blue-500 text-white font-medium py-3 rounded-xl transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Vérification..." : "Vérifier et continuer"}
            </button>
          </form>
          <div className="mt-8">
            <p className="text-xs text-choco/40 uppercase tracking-wider">Moon Cookies Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
