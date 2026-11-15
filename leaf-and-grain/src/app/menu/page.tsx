"use client";

import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import Image from "next/image";
import { Button } from "@/components/ui/button";

// Mock Data
const menuData = [
  {
    category: "Coffee",
    id: "coffee",
    items: [
      { name: "Espresso", description: "Rich and bold single shot", priceValue: 120, price: "₹120", image: "/images/menu/espresso_shot_1788889732581.jpg" },
      { name: "Americano", description: "Espresso with hot water", priceValue: 140, price: "₹140", image: "/images/menu/americano_coffee_1788889746473.jpg" },
      { name: "Latte", description: "Smooth espresso with steamed milk", priceValue: 250, price: "₹250", image: "/images/menu/latte_art_1788889759847.jpg" },
      { name: "Cappuccino", description: "Equal parts espresso, milk, and foam", priceValue: 250, price: "₹250", image: "/images/menu/cappuccino_foam_1788889773586.jpg" },
      { name: "Flat White", description: "Espresso with velvety microfoam", priceValue: 260, price: "₹260", image: "/images/menu/flat_white_coffee_1788889786735.jpg" },
      { name: "Mocha", description: "Espresso with chocolate and steamed milk", priceValue: 290, price: "₹290", image: "/images/menu/mocha_chocolate_1788889800691.jpg" },
    ]
  },
  {
    category: "Tea",
    id: "tea",
    items: [
      { name: "Sencha Green Tea", description: "Delicate and grassy Japanese tea", priceValue: 180, price: "₹180", image: "/images/menu/sencha_tea_1788889835975.jpg" },
      { name: "Earl Grey", description: "Classic black tea with bergamot", priceValue: 160, price: "₹160", image: "/images/menu/earl_grey_1788889851486.jpg" },
      { name: "Chamomile", description: "Caffeine-free herbal infusion", priceValue: 160, price: "₹160", image: "/images/menu/chamomile_tea_1788889887454.jpg" },
      { name: "Matcha Latte", description: "Ceremonial matcha with steamed milk", priceValue: 280, price: "₹280", image: "/images/menu/matcha_latte_1788889901064.jpg" },
      { name: "Chai Latte", description: "Spiced black tea with steamed milk", priceValue: 240, price: "₹240", image: "/images/menu/chai_latte_1788889912449.jpg" },
    ]
  },
  {
    category: "Cookies",
    id: "cookies",
    items: [
      { name: "Chocolate Chip Cookie", description: "Warm, soft, and very chocolatey", priceValue: 160, price: "₹160", image: "/images/menu/chocolate_chip_cookie_1788929240917.jpg" },
      { name: "Oatmeal Raisin", description: "Chewy and spiced with cinnamon", priceValue: 150, price: "₹150", image: "/images/menu/oatmeal_raisin_1788929259699.jpg" },
      { name: "Double Chocolate", description: "Rich cocoa cookie with chocolate chunks", priceValue: 170, price: "₹170", image: "/images/menu/double_chocolate_cookie_1788929273843.jpg" },
      { name: "Macadamia Nut", description: "Buttery cookie with white chocolate", priceValue: 190, price: "₹190", image: "/images/menu/macadamia_nut_1788929286296.jpg" },
    ]
  },
  {
    category: "Snacks",
    id: "snacks",
    items: [
      { name: "Avocado Toast", description: "Sourdough, smashed avocado, chili flakes", priceValue: 350, price: "₹350", image: "/images/menu/avocado_toast_1788929439881.jpg" },
      { name: "Croissant", description: "Classic French butter pastry", priceValue: 180, price: "₹180", image: "/images/menu/croissant_1788929457186.jpg" },
      { name: "Almond Croissant", description: "Crispy outside, tender inside", priceValue: 220, price: "₹220", image: "/images/menu/almond_croissant_1788929471296.jpg" },
      { name: "Cheese Danish", description: "Flaky pastry with sweet cheese filling", priceValue: 210, price: "₹210", image: "/images/menu/cheese_danish_1788929486740.jpg" },
      { name: "Ham & Cheese Sandwich", description: "Toasted croissant with ham and gruyere", priceValue: 380, price: "₹380", image: "/images/menu/ham_cheese_sandwich_1788929502859.jpg" },
    ]
  },
  {
    category: "Cakes",
    id: "cakes",
    items: [
      { name: "Berry Cheesecake", description: "Soft dessert with seasonal berries", priceValue: 260, price: "₹260", image: "/images/menu/berry_cheesecake_1788929546909.jpg" },
      { name: "Chocolate Fudge Cake", description: "Decadent multi-layered chocolate cake", priceValue: 280, price: "₹280", image: "/images/menu/chocolate_fudge_cake_1788929562774.jpg" },
      { name: "Carrot Cake", description: "Moist sponge with cream cheese frosting", priceValue: 250, price: "₹250", image: "/images/menu/carrot_cake_1788929577123.jpg" },
      { name: "Lemon Pound Cake", description: "Zesty and buttery with lemon glaze", priceValue: 220, price: "₹220", image: "/images/menu/lemon_pound_cake_1788929594731.jpg" },
    ]
  },
  {
    category: "Desserts",
    id: "desserts",
    items: [
      { name: "Tiramisu", description: "Coffee-soaked ladyfingers and mascarpone", priceValue: 320, price: "₹320", image: "/images/menu/tiramisu_real.png" },
      { name: "Affogato", description: "Vanilla gelato drowned in hot espresso", priceValue: 290, price: "₹290", image: "/images/menu/affogato_real.png" },
      { name: "Brownie", description: "Warm chocolate brownie", priceValue: 180, price: "₹180", image: "/images/menu/brownie_real.png" },
      { name: "Vanilla Panna Cotta", description: "Silky Italian cream dessert", priceValue: 270, price: "₹270", image: "/images/menu/pannacotta_real.png" },
    ]
  }
];

export default function MenuPage() {
  const { addToCart, setIsCartOpen } = useCart();
  const [activeCategory, setActiveCategory] = useState(menuData[0].id);

  // Setup intersection observer to highlight active tab
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { rootMargin: "-150px 0px -60% 0px" }
    );

    menuData.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToCategory = (id: string) => {
    setActiveCategory(id);
    const element = document.getElementById(id);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-brand-cream min-h-screen py-12 md:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-heading text-4xl font-bold text-brand-charcoal md:text-6xl">
            Full Menu
          </h1>
          <p className="mt-4 text-lg text-brand-brown">
            Explore our wide variety of specialty beverages, fresh pastries, and delicious food.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 relative">
          
          {/* Sticky Sidebar Navigation */}
          <aside className="lg:w-64 shrink-0 hidden lg:block">
            <div className="sticky top-28 bg-white/50 backdrop-blur-md rounded-3xl p-6 border border-brand-sage/20 shadow-sm">
              <h3 className="font-heading text-xl font-bold text-brand-charcoal mb-6">Categories</h3>
              <nav className="flex flex-col gap-2">
                {menuData.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => scrollToCategory(category.id)}
                    className={`text-left px-4 py-3 rounded-xl transition-all duration-300 font-medium ${
                      activeCategory === category.id 
                        ? "bg-brand-forest text-white shadow-md" 
                        : "text-brand-brown hover:bg-brand-sage/20 hover:text-brand-charcoal"
                    }`}
                  >
                    {category.category}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Mobile Categories Dropdown / Horizontal Scroll */}
          <div className="lg:hidden flex overflow-x-auto gap-3 pb-4 snap-x [scrollbar-width:none]">
            {menuData.map((category) => (
              <button
                key={category.id}
                onClick={() => scrollToCategory(category.id)}
                className={`shrink-0 px-5 py-2 rounded-full snap-center transition-all duration-300 text-sm font-bold border-2 ${
                  activeCategory === category.id 
                    ? "bg-brand-forest border-brand-forest text-white shadow-md" 
                    : "border-brand-sage/30 text-brand-brown hover:border-brand-sage"
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>

          {/* Menu Items Content */}
          <div className="flex-1 pb-24">
            <div className="flex flex-col gap-16">
              {menuData.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-32">
                  <h2 className="font-heading text-3xl font-bold text-brand-charcoal mb-8 border-b-2 border-brand-sage/30 pb-4">
                    {section.category}
                  </h2>
                  
                  <div className="grid gap-6 sm:grid-cols-2">
                    {section.items.map((item: any, idx) => (
                      <div 
                        key={idx} 
                        className="group flex flex-col justify-between bg-white rounded-3xl p-6 shadow-sm border border-brand-sage/10 transition-all hover:shadow-md hover:-translate-y-1 duration-300 overflow-hidden"
                      >
                        {item.image && (
                          <div className="relative h-48 -mx-6 -mt-6 mb-6">
                            <Image src={item.image} alt={item.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                          </div>
                        )}
                        <div>
                          <div className="flex justify-between items-start gap-4">
                            <h3 className="font-heading text-xl font-bold text-brand-charcoal group-hover:text-brand-terracotta transition-colors">
                              {item.name}
                            </h3>
                            <span className="font-bold text-brand-forest shrink-0">
                              {item.price}
                            </span>
                          </div>
                          <p className="mt-2 text-brand-brown text-sm">
                            {item.description}
                          </p>
                        </div>
                        
                        <div className="mt-6 flex justify-end">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="rounded-full gap-2 border-brand-sage text-brand-charcoal hover:bg-brand-forest hover:text-white hover:border-brand-forest"
                            onClick={() => {
                              addToCart({ id: item.name, name: item.name, price: item.priceValue });
                              setIsCartOpen(true);
                            }}
                          >
                            <Plus className="h-4 w-4" />
                            Add to Order
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
