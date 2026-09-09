import React from "react";
import { Leaf, Flame, Users, Coffee } from "lucide-react";

export function Features() {
  const features = [
    {
      icon: <Leaf className="h-8 w-8" />,
      title: "Selected beans",
      description: "We work only with trusted farms and specialty lots.",
    },
    {
      icon: <Flame className="h-8 w-8" />,
      title: "Fresh roasting",
      description: "Small batches roasted every week.",
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Skilled baristas",
      description: "Professionals who pour with care and attention.",
    },
    {
      icon: <Coffee className="h-8 w-8" />,
      title: "Cozy space",
      description: "Bright, calm, and full of flavor — your place of strength.",
    },
  ];

  return (
    <section id="about" className="bg-brand-cream pb-16 md:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center px-4">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-brand-sage/30 text-brand-forest">
                {feature.icon}
              </div>
              <h3 className="font-heading text-xl font-bold text-brand-charcoal">
                {feature.title}
              </h3>
              <p className="mt-3 text-brand-brown">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
