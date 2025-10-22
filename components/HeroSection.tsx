"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
} from "@/components/ui/carousel";
import Image from "next/image";
const slider: { title: string; description: string; image: string }[] = [
  {
    title: "Get premium gadgets without breaking the bank ",
    description:
      "Discover cutting-edge electronics and accessories at unbeatable prices.",
    image:
      "https://images.unsplash.com/photo-1498049860654-af1a5c566876?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  },
  {
    title: "Latest gaming tech essentials",
    description:
      "Level up your gaming experience with premium keyboards, controllers, and headphones.",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2072",
  },
  {
    title: "Powerful computing components",
    description:
      "Build your dream PC with high-performance processors, motherboards, and components.",
    image:
      "https://images.unsplash.com/photo-1502945015378-0e284ca1a5be?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  },
];
export function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <section>
      <div className="mx-auto max-w-screen-2xl px-4 xl:px-8">
        <Carousel
          plugins={[plugin.current, Fade()]}
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {slider.map((item, index) => (
              <CarouselItem
                key={index}
                className="relative flex justify-center items-center"
              >
                <div className="absolute size-full p-4 md:p-8 bg-white/50 backdrop-blur-2xl">
                  <div className="max-w-2xl space-y-4">
                    <h1 className="text-[clamp(1.75rem,5vw,4rem)] font-black tracking-tight leading-tight">
                      {item.title}
                    </h1>
                    <p className="text-[clamp(1rem,2vw,1.125rem)]">
                      {item.description}
                    </p>
                  </div>
                </div>
                <Image
                  className="aspect-4/3 sm:aspect-7/3 object-cover"
                  src={item.image}
                  alt={item.title}
                  width={1500}
                  height={1000}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselDots />
        </Carousel>
      </div>
    </section>
  );
}
