"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const drinks = [
  {
    name: "Latte",
    flavor: "Smooth and creamy",
    price: "₹250",
    image: "/latte_top_down_1788844433706.jpg",
    alt: "Cup of latte with beautiful latte art"
  },
  {
    name: "Matcha Latte",
    flavor: "Green harmony",
    price: "₹280",
    image: "/matcha_latte_top_down_1788844446769.jpg",
    alt: "Cup of green matcha latte with latte art"
  },
  {
    name: "Iced Filter",
    flavor: "Refreshing and light",
    price: "₹260",
    image: "/iced_filter_top_down_1788844463247.jpg",
    alt: "Tall glass of iced black filter coffee"
  }
];

export function PopularDrinks() {
  return (
    <section id="menu" className="bg-brand-sage py-20 rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-md">
            <h2 className="font-heading text-4xl font-bold text-brand-charcoal md:text-5xl">
              Popular Drinks
            </h2>
            <p className="mt-4 text-lg text-brand-forest mb-8">
              Classic and signature drinks for every taste.
            </p>
            <div className="flex items-center gap-4">
              <Link href="/menu">
                <Button variant="outline">
                  View Full Menu
                </Button>
              </Link>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 lg:gap-10 mx-auto lg:mx-0 justify-center flex-wrap">
            {drinks.map((drink, idx) => (
              <div 
                key={idx} 
                className="flex flex-col items-center text-center group cursor-pointer w-48"
              >
                <div className="relative flex h-48 w-48 items-center justify-center rounded-full shadow-md mb-6 transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg bg-brand-cream overflow-hidden">
                  <Image
                    src={drink.image}
                    alt={drink.alt}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-heading text-xl font-bold text-brand-charcoal transition-colors group-hover:text-brand-terracotta">
                  {drink.name}
                </h3>
                <p className="mt-1 text-sm text-brand-forest">
                  {drink.flavor}
                </p>
                <p className="mt-3 font-bold text-brand-charcoal">
                  {drink.price}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
