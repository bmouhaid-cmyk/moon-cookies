import type { Metadata } from "next";
import { Playfair_Display, Dancing_Script, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CartDrawer from "@/components/CartDrawer";
import { settings } from "@/data/settings";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const dancing = Dancing_Script({
  variable: "--font-dancing",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Moon Cookies - Menu",
  description: "Fait maison avec amour.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${dancing.variable} ${inter.variable} h-full antialiased scroll-smooth`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-cream text-choco font-sans">
        {settings.showAnnouncement && (
          <div className="bg-choco text-cream text-center py-2 px-4 text-sm font-medium tracking-wide">
            {settings.announcementText}
          </div>
        )}
        <Navbar />
        <main className="flex-1">{children}</main>
        <CartDrawer />
      </body>
    </html>
  );
}
