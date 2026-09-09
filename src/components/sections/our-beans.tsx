"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Truck, Star } from "lucide-react";

export function OurBeans() {
  const [showShopSoon, setShowShopSoon] = useState(false);

  return (
    <section id="beans" className="bg-brand-sage py-16 rounded-[3rem] mx-4 sm:mx-6 lg:mx-8 mb-16 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="font-heading text-4xl font-bold text-brand-charcoal md:text-5xl">
              Beans We're Proud Of
            </h2>
            <p className="mt-6 text-lg text-brand-forest/90">
              We travel, select the best, roast with attention to detail, and reveal the flavor in every cup.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Button variant="secondary" onClick={() => setShowShopSoon(true)}>Choose Your Beans</Button>
              {showShopSoon && (
                <span className="text-sm font-medium text-brand-charcoal animate-pulse">
                  Online shop opening soon!
                </span>
              )}
            </div>

            <div className="mt-16 flex flex-col sm:flex-row gap-8">
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <Truck className="mb-3 h-8 w-8 text-brand-forest" />
                <span className="text-sm font-bold text-brand-charcoal">Direct from farmers</span>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <CheckCircle2 className="mb-3 h-8 w-8 text-brand-forest" />
                <span className="text-sm font-bold text-brand-charcoal">Roasted to order</span>
              </div>
              <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                <Star className="mb-3 h-8 w-8 text-brand-forest" />
                <span className="text-sm font-bold text-brand-charcoal">Freshness in every bag</span>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/5] w-full max-w-lg mx-auto overflow-hidden rounded-[3rem] shadow-2xl">
              <Image
                src="/coffee_bag_plant_1788843307970.jpg"
                alt="A specialty coffee bag with a clean, modern minimalist label sitting next to a small potted plant and raw coffee beans"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
