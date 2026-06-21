import Image from "next/image";

export default function AboutSection() {
  return (
    <section className="bg-cream-dark/10 py-24 sm:py-32 border-b border-choco/10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative">
            <div className="aspect-[4/5] sm:aspect-[3/4] lg:aspect-auto lg:h-[600px] relative rounded-[2rem] overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-choco/10 mix-blend-multiply z-10"></div>
              <Image
                src="/images/about-artisan.png"
                alt="Artisan shaping cookie dough"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            
            {/* Decorative badge */}
            <div className="absolute -bottom-8 -right-8 sm:-bottom-12 sm:-right-12 bg-white p-6 rounded-full shadow-xl z-20 animate-float-delayed hidden sm:block">
              <div className="border border-choco/20 rounded-full w-24 h-24 flex items-center justify-center flex-col text-choco text-center">
                <span className="font-script text-2xl leading-none">Fait</span>
                <span className="font-serif text-sm uppercase tracking-widest leading-none mt-1">Maison</span>
              </div>
            </div>
          </div>
          
          {/* Text Side */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-sm font-semibold leading-7 text-choco-light uppercase tracking-widest font-sans mb-3">Notre Histoire</h2>
            <p className="text-4xl sm:text-5xl font-serif text-choco mb-8 leading-tight">
              L'Artisanat au cœur de notre passion
            </p>
            
            <div className="space-y-6 text-lg text-choco/70 font-sans leading-relaxed">
              <p>
                Chez Moon Cookies, chaque création est une histoire de passion, de patience et de précision. Tout a commencé avec une idée simple : recréer la magie du cookie parfait, croustillant à l'extérieur et incroyablement fondant à l'intérieur.
              </p>
              <p>
                Nous sélectionnons rigoureusement nos ingrédients : du véritable beurre de baratte, du chocolat belge d'exception et de la farine locale. Pas de conservateurs, pas de compromis.
              </p>
              <p className="font-serif italic text-xl text-choco/90 border-l-4 border-choco-light pl-6 py-2 mt-8">
                "Notre plus grande fierté est de voir le sourire sur vos visages à la première bouchée."
              </p>
            </div>
            
            <div className="mt-10">
              <div className="font-script text-3xl text-choco mt-4">La Chef Pâtissière</div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
