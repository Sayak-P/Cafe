import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { PopularDrinks } from "@/components/sections/popular-drinks";
import { Treats } from "@/components/sections/treats";
import { OurBeans } from "@/components/sections/our-beans";

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <PopularDrinks />
      <Treats />
      <OurBeans />
    </>
  );
}
