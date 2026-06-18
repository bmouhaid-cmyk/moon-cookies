export interface SiteSettings {
  whatsappNumber: string;
  heroTitle1: string;
  heroTitle2: string;
  heroSubtitle: string;
  heroDescription: string;
  heroButtonText: string;
  heroImageUrl: string;
  instagramLink: string;
  instagramHandle: string;
  contactAddress: string;
  footerDescription: string;
}

export const settings: SiteSettings = {
  whatsappNumber: "212631639229",
  heroTitle1: "L'Art du",
  heroTitle2: "Cookie",
  heroSubtitle: "Fait Maison",
  heroDescription: "Des ingrédients premium, une cuisson parfaite chaque matin. Plongez dans une expérience gourmande inoubliable.",
  heroButtonText: "Commander",
  heroImageUrl: "/hero-cookie.png",
  instagramLink: "https://www.instagram.com/mooncookies71",
  instagramHandle: "@mooncookies71",
  contactAddress: "Casablanca, Maroc",
  footerDescription: "L'art du cookie artisanal. Fait avec passion, cuit à la perfection pour votre plus grand plaisir."
};
