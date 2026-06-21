import { Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    content: "Certainement les meilleurs cookies que j'ai pu manger à Paris. Le cœur est incroyablement fondant et les bords croustillants à souhait.",
    author: "Sophie L.",
    role: "Cliente fidèle",
  },
  {
    id: 2,
    content: "Une vraie découverte ! Le cookie au chocolat au lait et fleur de sel est une merveille d'équilibre. On sent vraiment la qualité des ingrédients.",
    author: "Marc D.",
    role: "Amateur de pâtisserie",
  },
  {
    id: 3,
    content: "L'emballage est magnifique, la livraison rapide et les cookies... divins ! C'est devenu mon cadeau de référence pour mes amis.",
    author: "Julie M.",
    role: "Avis vérifié",
  }
];

export default function Testimonials() {
  return (
    <section className="bg-choco text-cream py-24 sm:py-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] bg-choco-light/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-caramel/10 rounded-full blur-3xl pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        <div className="mx-auto max-w-2xl text-center mb-16 lg:mb-24">
          <h2 className="text-base font-semibold leading-7 text-caramel uppercase tracking-widest font-sans mb-2">Avis Clients</h2>
          <p className="text-4xl sm:text-5xl font-serif text-cream">
            Ce qu'ils en pensent
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-cream/10 backdrop-blur-md border border-cream/20 rounded-3xl p-8 sm:p-10 flex flex-col justify-between hover:-translate-y-2 transition-transform duration-300">
              <div>
                <div className="flex gap-1 mb-6 text-caramel">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-current" />
                  ))}
                </div>
                <p className="text-lg font-sans leading-relaxed text-cream/90 italic mb-8">
                  "{testimonial.content}"
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-cream/20 rounded-full flex items-center justify-center font-serif text-xl font-bold text-cream">
                  {testimonial.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-serif text-lg text-cream">{testimonial.author}</h4>
                  <p className="text-sm font-sans text-cream/60">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
