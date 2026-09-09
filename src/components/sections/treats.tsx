"use client";

import React from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { Card, CardContent } from "@/components/ui/card";

const treats = [
  {
    name: "Almond Croissant",
    description: "Crispy outside, tender inside",
    price: "₹220",
    priceValue: 220,
    image: "/almond_croissant_1788843322412.jpg",
    alt: "Almond croissant topped with sliced almonds"
  },
  {
    name: "Berry Cheesecake",
    description: "Soft dessert with seasonal berries",
    price: "₹260",
    priceValue: 260,
    image: "/berry_cheesecake_1788844477550.jpg",
    alt: "Slice of cheesecake topped with mixed berries"
  },
  {
    name: "Chocolate Chip Cookie",
    description: "Warm, soft, and very chocolatey",
    price: "₹160",
    priceValue: 160,
    image: "/chocolate_chip_cookie_1788844491500.jpg",
    alt: "Single round chocolate-chip cookie"
  },
  {
    name: "Cinnamon Roll",
    description: "Freshly baked with white icing glaze",
    price: "₹190",
    priceValue: 190,
    image: "/cinnamon_roll_top_down_1788880661661.jpg",
    alt: "Cinnamon roll with white icing glaze"
  },
  {
    name: "Blueberry Muffin",
    description: "Moist and bursting with fresh berries",
    price: "₹150",
    priceValue: 150,
    image: "/blueberry_muffin_top_down_1788880702986.jpg",
    alt: "Freshly baked blueberry muffin"
  }
];

export function Treats() {
  const { addToCart } = useCart();

  return (
    <section id="delivery" className="bg-brand-cream py-16 md:py-24 blob-t-l">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="font-heading text-2xl font-bold text-brand-charcoal md:text-3xl flex items-center justify-center gap-4">
            <span className="text-brand-sage">✦</span>
            Recommend Trying
            <span className="text-brand-sage">✦</span>
          </h2>
          <p className="mt-3 text-brand-brown">
            Sweet treats to pair with your coffee.
          </p>
        </div>

        <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          {treats.map((treat, idx) => (
            <Card key={idx} className="overflow-hidden group min-w-[280px] sm:min-w-[320px] max-w-[350px] shrink-0 snap-center flex-1">
              <div className="relative h-64 w-full bg-brand-sage/20">
                <Image
                  src={treat.image}
                  alt={treat.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <CardContent className="relative flex flex-col pt-6 pb-8 px-8">
                <h3 className="font-heading text-xl font-bold text-brand-charcoal">
                  {treat.name}
                </h3>
                <p className="mt-2 text-sm text-brand-brown">
                  {treat.description}
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <span className="font-bold text-brand-charcoal">
                    {treat.price}
                  </span>
                  
                  <button
                    onClick={() => addToCart({ id: treat.name, name: treat.name, price: treat.priceValue })}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-forest text-white transition-transform hover:scale-110 active:scale-95 shadow-sm"
                    aria-label={`Add ${treat.name} to cart`}
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
