import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-heading",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Leaf & Grain | Specialty Coffee",
  description: "Coffee you fall in love with from the first sip. Specialty coffee, fresh pastries, and a cozy atmosphere in the heart of the city.",
  openGraph: {
    title: "Leaf & Grain | Specialty Coffee",
    description: "Coffee you fall in love with from the first sip. Specialty coffee, fresh pastries, and a cozy atmosphere in the heart of the city.",
    url: "https://leafandgrain.cafe",
    siteName: "Leaf & Grain",
    images: [
      {
        url: "/images/menu/espresso_shot_1788889732581.jpg",
        width: 1200,
        height: 630,
        alt: "Leaf & Grain Specialty Coffee",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leaf & Grain | Specialty Coffee",
    description: "Coffee you fall in love with from the first sip. Specialty coffee, fresh pastries, and a cozy atmosphere in the heart of the city.",
    images: ["/images/menu/espresso_shot_1788889732581.jpg"],
  },
};

import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/sections/footer";
import { CartProvider } from "@/lib/cart-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} ${outfit.variable} antialiased selection:bg-brand-sage/50 flex flex-col min-h-screen`}>
        <CartProvider>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
