import { Heart, Sparkles, Clock } from "lucide-react";

const features = [
  {
    name: "100% Artisanal",
    description: "Chaque cookie est façonné à la main avec passion et minutie, garantissant une texture et un goût uniques.",
    icon: Heart,
  },
  {
    name: "Ingrédients Premium",
    description: "Du beurre de baratte au chocolat belge d'exception, nous ne faisons aucun compromis sur la qualité.",
    icon: Sparkles,
  },
  {
    name: "Cuit le jour même",
    description: "Sortis du four quelques heures avant votre dégustation pour un cœur toujours fondant.",
    icon: Clock,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-cream-dark/20 py-24 sm:py-32 border-b border-choco/10 relative overflow-hidden">
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-choco/20 to-transparent"></div>
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl lg:text-center animate-fade-in-up">
          <h2 className="text-base font-semibold leading-7 text-choco-light uppercase tracking-widest font-sans">Notre Promesse</h2>
          <p className="mt-2 text-4xl font-serif text-choco sm:text-5xl">
            L'Excellence dans chaque détail
          </p>
          <p className="mt-6 text-lg leading-8 text-choco/70 font-sans">
            Nous croyons que le secret d'un grand cookie réside dans la simplicité des meilleurs ingrédients et le respect du temps.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature, index) => (
              <div key={feature.name} className="flex flex-col items-center text-center group">
                <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-cream shadow-xl border border-choco/10 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
                  <feature.icon className="h-8 w-8 text-choco" aria-hidden="true" />
                </div>
                <dt className="text-2xl font-serif leading-7 text-choco mb-4">
                  {feature.name}
                </dt>
                <dd className="text-base leading-7 text-choco/70 font-sans max-w-sm">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
