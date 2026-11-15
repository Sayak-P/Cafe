import React from "react";
import { Button } from "@/components/ui/button";
import { Coffee, Heart, Sun } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-brand-cream pt-24 pb-32 blob-b-r md:pt-32 md:pb-40">
      {/* Decorative Blob */}
      <div className="absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full bg-brand-sage/40 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-8">
          <div className="max-w-2xl">
            <h1 className="font-heading text-5xl font-bold leading-tight tracking-tight text-brand-charcoal md:text-7xl">
              Coffee you fall in love with from the first sip.
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-brand-brown md:text-xl">
              Specialty coffee, fresh pastries, and a cozy atmosphere in the
              heart of the city.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a href="#menu" className="inline-block">
                <Button>View Menu</Button>
              </a>
            </div>

            <div className="mt-12 flex flex-wrap gap-6 text-sm font-medium text-brand-charcoal">
              <div className="flex items-center gap-2">
                <Coffee className="h-5 w-5 text-brand-forest" />
                <span>Specialty coffee</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="h-5 w-5 text-brand-forest" />
                <span>Made with love</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-brand-forest" />
                <span>Fresh every day</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="relative aspect-square w-full rounded-[2.5rem] bg-brand-sage p-2 md:rounded-[3.5rem] overflow-hidden">
              <Image
                src="/latte_art_croissant_1788843293563.jpg"
                alt="Latte art and croissant"
                fill
                className="object-cover rounded-[2.2rem] md:rounded-[3.2rem]"
              />
            </div>
            
            {/* 100% Arabica Badge */}
            <div className="absolute -bottom-6 -left-6 flex h-32 w-32 items-center justify-center rounded-full border-8 border-brand-cream bg-brand-forest text-center text-white shadow-xl md:-bottom-8 md:-left-8">
              <div className="flex flex-col items-center">
                <Coffee className="mb-1 h-6 w-6" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  100%<br />Arabica
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
