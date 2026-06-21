const textItems = [
  "100% Artisanal",
  "Ingrédients Premium",
  "Cuit le jour même",
  "Pur Beurre de Baratte",
  "Chocolat Belge",
  "Fait avec Amour",
];

export default function Marquee() {
  return (
    <div className="w-full bg-choco text-cream border-y border-choco-light/30 overflow-hidden py-4 sm:py-5 flex relative">
      {/* Gradient mask for smooth fade on edges */}
      <div className="absolute inset-y-0 left-0 w-12 sm:w-24 bg-gradient-to-r from-choco to-transparent z-10"></div>
      <div className="absolute inset-y-0 right-0 w-12 sm:w-24 bg-gradient-to-l from-choco to-transparent z-10"></div>

      {/* Marquee Content */}
      <div className="flex animate-marquee whitespace-nowrap">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex items-center">
            {textItems.map((text, j) => (
              <span key={`${i}-${j}`} className="flex items-center text-sm sm:text-base lg:text-lg font-serif uppercase tracking-widest px-8">
                {text}
                <span className="text-choco-light mx-8 text-xl">✦</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
