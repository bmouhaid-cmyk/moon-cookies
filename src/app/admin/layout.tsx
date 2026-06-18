"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, PlusCircle, LogOut, Cookie } from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  // Do not show the sidebar on the login page
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    // Delete cookie by setting expiry in the past
    document.cookie = 'admin_auth=; Max-Age=0; path=/';
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="flex h-screen bg-cream font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-choco/10 shadow-sm flex flex-col">
        <div className="p-6 flex items-center gap-3 border-b border-choco/5">
          <Cookie className="text-choco" size={28} />
          <span className="text-xl font-serif text-choco font-bold uppercase tracking-wider">Admin</span>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
              pathname === '/admin' 
                ? 'bg-choco text-cream shadow-md' 
                : 'text-choco/80 hover:bg-choco/5 hover:text-choco'
            }`}
          >
            <LayoutDashboard size={20} />
            Tableau de bord
          </Link>
          
          <Link 
            href="/admin/add-product" 
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors font-medium ${
              pathname === '/admin/add-product' 
                ? 'bg-choco text-cream shadow-md' 
                : 'text-choco/80 hover:bg-choco/5 hover:text-choco'
            }`}
          >
            <PlusCircle size={20} />
            Ajouter un produit
          </Link>
        </nav>
        
        <div className="p-4 border-t border-choco/5">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-xl transition-colors font-medium"
          >
            <LogOut size={20} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
