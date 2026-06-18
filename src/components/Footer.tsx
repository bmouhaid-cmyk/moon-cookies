import Link from "next/link";
import Image from "next/image";
import { settings } from "@/data/settings";

export default function Footer() {
  return (
    <footer className="bg-choco text-cream py-16 border-t border-choco-light/20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-8">
          
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <Link href="/" className="inline-block mb-6 bg-cream rounded-full p-2">
              <div className="relative w-16 h-16">
                <Image
                  src="/logo.png"
                  alt="Moon Cookies Logo"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
            <p className="text-cream/70 font-sans max-w-xs">
              {settings.footerDescription}
            </p>
          </div>

          {/* Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-xl font-serif mb-6 text-cream">Nous Contacter</h4>
            <ul className="space-y-4 font-sans text-cream/70">
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-choco-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                <a href={`https://wa.me/${settings.whatsappNumber}`} className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  +{settings.whatsappNumber.slice(0, 3)} {settings.whatsappNumber.slice(3, 6)} {settings.whatsappNumber.slice(6, 9)} {settings.whatsappNumber.slice(9)}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-5 h-5 text-choco-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                <span>{settings.contactAddress}</span>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h4 className="text-xl font-serif mb-6 text-cream">Suivez-nous</h4>
            <p className="text-cream/70 font-sans mb-6">
              Rejoignez notre communauté sur Instagram pour ne rien manquer de nos nouveautés.
            </p>
            <a 
              href={settings.instagramLink} 
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cream/10 hover:bg-cream/20 border border-cream/20 text-cream px-6 py-3 rounded-full transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>
              <span>{settings.instagramHandle}</span>
            </a>
          </div>

        </div>

        <div className="mt-16 pt-8 border-t border-cream/10 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-cream/50 text-sm font-sans">
          <p>© {new Date().getFullYear()} Moon Cookies. Tous droits réservés.</p>
          <Link href="/admin" className="hover:text-cream transition-colors">
            Administration
          </Link>
        </div>
      </div>
    </footer>
  );
}
