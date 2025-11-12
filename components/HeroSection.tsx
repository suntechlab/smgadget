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
    image: "/banner.jpg",
  },
  {
    title: "Latest gaming tech essentials",
    description:
      "Level up your gaming experience with premium keyboards, controllers, and headphones.",
    image: "/banner1.jpg",
  },
  {
    title: "Powerful computing components",
    description:
      "Build your dream PC with high-performance processors, motherboards, and components.",
    image: "/banner2.jpg",
  },
];
export function HeroSection() {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );

  return (
    <section className="mt-5">
      <div className="mx-auto max-w-screen-2xl px-4 xl:px-8">
        <div className="grid grid-cols-10 gap-5">
          <div className="col-span-full lg:col-span-7 row-span-2">
            <Carousel
              plugins={[plugin.current, Fade()]}
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {slider.map((item, index) => (
                  <CarouselItem key={index}>
                    {/* <div className="absolute size-full p-4 md:p-8">
                  <div className="max-w-2xl space-y-4">
                    <h1 className="text-[clamp(1.75rem,5vw,4rem)] font-black tracking-tight leading-tight">
                      {item.title}
                    </h1>
                    <p className="text-[clamp(1rem,2vw,1.125rem)]">
                      {item.description}
                    </p>
                  </div>
                </div> */}
                    <Image
                      className="rounded-lg"
                      src={item.image}
                      alt={item.title}
                      width={1920}
                      height={960}
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselDots />
            </Carousel>
          </div>
          <div className="col-span-full sm:col-span-5 lg:col-span-3">
            <Image
              className="rounded-lg h-full object-cover"
              src={slider[0].image}
              alt={slider[0].title}
              width={1920}
              height={960}
            />
          </div>
          <div className="col-span-full sm:col-span-5 lg:col-span-3">
            <Image
              className="rounded-lg h-full object-cover"
              src={slider[1].image}
              alt={slider[1].title}
              width={1920}
              height={960}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
