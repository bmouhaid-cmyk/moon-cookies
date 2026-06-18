import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { settings } from "@/data/settings";

export default function Hero() {
  return (
    <section className="relative min-h-[90vh] bg-cream flex items-center overflow-hidden border-b border-choco/10 pt-24 lg:pt-0">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-choco-light/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-caramel/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10 flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
        
        {/* Text Content */}
        <div className="flex-1 text-center lg:text-left animate-fade-in-up flex flex-col justify-center pb-16 lg:pb-0">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-choco/20 bg-cream-dark/30 backdrop-blur-sm mx-auto lg:mx-0 mb-8 w-max">
            <span className="text-choco/70 text-sm font-medium tracking-wider uppercase">Nouveau</span>
            <span className="h-1 w-1 bg-choco rounded-full"></span>
            <span className="text-choco font-serif italic text-sm">Découvrez nos collections</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-serif text-choco leading-[1.1] mb-6">
            {settings.heroTitle1} <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-choco to-choco-light font-script text-7xl sm:text-8xl lg:text-[140px] leading-none block -mt-2 lg:-mt-6 mb-4 drop-shadow-sm pb-4">{settings.heroTitle2}</span>
            <span className="italic font-light">{settings.heroSubtitle}</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-choco/70 max-w-xl mx-auto lg:mx-0 font-sans leading-relaxed mb-10">
            {settings.heroDescription}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
            <Link
              href="#products"
              className="group relative flex items-center justify-center gap-3 bg-choco text-cream font-serif rounded-full px-8 py-4 text-lg overflow-hidden transition-transform hover:scale-105 shadow-xl shadow-choco/20"
            >
              <div className="absolute inset-0 bg-choco-light translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">{settings.heroButtonText}</span>
              <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            
            <div className="flex items-center gap-4 text-choco/80 font-serif">
              <div className="flex -space-x-4">
                <div className="w-12 h-12 rounded-full border-2 border-cream bg-caramel/20 flex items-center justify-center text-xl z-30">✨</div>
                <div className="w-12 h-12 rounded-full border-2 border-cream bg-choco/10 flex items-center justify-center text-xl z-20">🍫</div>
                <div className="w-12 h-12 rounded-full border-2 border-cream bg-choco-light/20 flex items-center justify-center text-xl z-10">🍪</div>
              </div>
              <div className="text-sm leading-tight text-left">
                <span className="font-bold block text-choco">100% Artisanal</span>
                Cuit le jour même
              </div>
            </div>
          </div>
        </div>

        {/* Hero Image */}
        <div className="flex-1 relative w-full max-w-[280px] sm:max-w-md lg:max-w-none mx-auto opacity-0 animate-[fade-in-up_1s_ease-out_0.3s_forwards] pt-8 lg:pt-0">
          <div className="relative aspect-square flex items-center justify-center">
            {/* Abstract Decorative Shapes behind image */}
            <div className="absolute inset-4 bg-gradient-to-tr from-choco/5 to-transparent rounded-[3rem] sm:rounded-[5rem] rotate-6 scale-95 opacity-50 transition-transform duration-700 hover:rotate-12" />
            <div className="absolute inset-8 border border-choco/10 rounded-[3rem] sm:rounded-[5rem] -rotate-3 scale-95" />
            
            <div className="relative w-[120%] h-[120%] lg:w-[130%] lg:h-[130%] animate-float z-10 right-[-5%] sm:right-[-10%]">
              <Image
                src={settings.heroImageUrl}
                alt={settings.heroTitle2}
                fill
                className="object-contain drop-shadow-[0_20px_50px_rgba(97,57,38,0.2)]"
                priority
              />
            </div>
            
            {/* Floating Badges */}
            <div className="absolute top-1/4 -left-8 sm:-left-12 bg-white/90 backdrop-blur-md rounded-2xl p-3 sm:p-4 shadow-xl border border-white z-20 animate-float-delayed -rotate-6">
              <div className="text-choco font-serif font-bold text-lg sm:text-xl">Pur Beurre</div>
              <div className="text-choco/60 text-xs sm:text-sm">Chocolat Belge</div>
            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
