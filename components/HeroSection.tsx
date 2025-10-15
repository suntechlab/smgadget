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
    title: "Slide One",
    description: "This is content one",
    image:
      "https://images.unsplash.com/photo-1573739022854-abceaeb585dc?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2070",
  },
  {
    title: "Slide Two",
    description: "This is content two",
    image:
      "https://images.unsplash.com/photo-1535432715554-75d3f522ab18?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=2071",
  },
  {
    title: "Slide Three",
    description: "This is content three",
    image:
      "https://images.unsplash.com/photo-1626446636985-c583c1d5b237?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
  },
];
export function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <Carousel
      plugins={[plugin.current,Fade()]}
      className="container mx-auto"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {slider.map((item, index) => (
          <CarouselItem
            key={index}
            className="relative flex justify-center items-center"
          >
            <div className="absolute">
              <h1>{item.title}</h1>
            </div>
            <Image
              className="w-full h-[600px] object-cover"
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
  );
}
