"use client";

import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Product } from "@/types";
import { Star, Share2, Minus, Plus, ShoppingBagIcon } from "lucide-react";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export function ProductDetails({ product }: { product: Product }) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [api1, setApi1] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api || !api1) {
      return;
    }
    setCurrent(api.selectedScrollSnap());

    const handleTopSelect = () => {
      const selected = api.selectedScrollSnap();
      setCurrent(selected);
      api1.scrollTo(selected);
    };
    const handleBottomSelect = () => {
      const selected = api1.selectedScrollSnap();
      setCurrent(selected);
      api.scrollTo(selected);
    };
    api.on("select", handleTopSelect);
    api1.on("select", handleBottomSelect);
    return () => {
      api.off("select", handleTopSelect);
      api1.off("select", handleBottomSelect);
    };
  }, [api, api1]);

  return (
    <div className="mx-auto max-w-screen-2xl px-4 xl:px-8 py-6">
      <div className="flex items-start justify-between mb-5">
        <div className="grid gap-2">
          <div className="text-sm text-gray-500">Jacket</div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <Star className="h-4 w-4 fill-gray-300 text-gray-300" />
            </div>
            <span className="text-sm text-gray-500">4.9</span>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Share2 className="h-5 w-5" />
          <span className="sr-only">Share</span>
        </Button>
      </div>
      <div className="grid items-start gap-8 md:grid-cols-2 lg:gap-12">
        <div className="space-y-4">
          <Carousel setApi={setApi} opts={{ loop: true }}>
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem key={index}>
                  <Image
                    src={image}
                    alt="Stonewind Trekker Jacket"
                    className="aspect-4/3 h-[410px] w-full rounded-lg border object-cover"
                    width={500}
                    height={500}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="top-[calc(50%+0.5rem)] left-2" />
            <CarouselNext className="top-[calc(50%+0.5rem)] right-2" />
          </Carousel>
          <Carousel setApi={setApi1} opts={{ loop: true }}>
            <CarouselContent>
              {product.images.map((image, index) => (
                <CarouselItem
                  key={index}
                  onClick={() => api?.scrollTo(index)}
                  className="basis-1/3 sm:basis-1/5"
                >
                  <Image
                    src={image}
                    alt="Product thumbnail 1"
                    className={`aspect-4/3 object-cover border rounded-lg ${
                      index === current && "border-primary"
                    }`}
                    width={500}
                    height={500}
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>

        {/* Product Details Section */}
        <div className="grid gap-6">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold">Tk{product.price}</span>
            <span className="text-lg text-gray-500 line-through">Tk102.97</span>
          </div>
          <div className="text-sm text-gray-500">498 products sold out</div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="color" className="text-base font-medium">
                Colors
              </Label>
              <RadioGroup
                id="color"
                defaultValue="ocean-blue"
                className="flex items-center gap-3"
              >
                <Label
                  htmlFor="color-ocean-blue"
                  className="relative cursor-pointer rounded-full border-2 border-transparent data-[state=checked]:border-gray-900"
                >
                  <RadioGroupItem
                    id="color-ocean-blue"
                    value="ocean-blue"
                    className="sr-only"
                  />
                  <Image
                    src={product.images[0]}
                    alt="Ocean Blue color"
                    className="aspect-square w-20 rounded-md object-cover"
                    width={500}
                    height={500}
                  />
                  <span className="sr-only">Ocean Blue</span>
                </Label>
                <Label
                  htmlFor="color-black"
                  className="relative cursor-pointer rounded-full border-2 border-transparent data-[state=checked]:border-gray-900"
                >
                  <RadioGroupItem
                    id="color-black"
                    value="black"
                    className="sr-only"
                  />
                  <Image
                    src={product.images[0]}
                    alt="Black color"
                    className="aspect-square w-20 rounded-md object-cover"
                    width={500}
                    height={500}
                  />
                  <span className="sr-only">Black</span>
                </Label>
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="size" className="text-base font-medium">
                Size
                <a
                  href="#"
                  className="ml-2 text-sm text-gray-500 hover:underline"
                >
                  Size Guide
                </a>
              </Label>
              <RadioGroup
                id="size"
                defaultValue="m"
                className="flex items-center gap-2"
              >
                <Label
                  htmlFor="size-s"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium ring-offset-white hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:outline-none data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 dark:data-[state=checked]:bg-gray-50 dark:data-[state=checked]:text-gray-900"
                >
                  <RadioGroupItem id="size-s" value="s" className="sr-only" />S
                </Label>
                <Label
                  htmlFor="size-m"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium ring-offset-white hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:outline-none data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 dark:data-[state=checked]:bg-gray-50 dark:data-[state=checked]:text-gray-900"
                >
                  <RadioGroupItem id="size-m" value="m" className="sr-only" />M
                </Label>
                <Label
                  htmlFor="size-l"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium ring-offset-white hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:outline-none data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 dark:data-[state=checked]:bg-gray-50 dark:data-[state=checked]:text-gray-900"
                >
                  <RadioGroupItem id="size-l" value="l" className="sr-only" />L
                </Label>
                <Label
                  htmlFor="size-xl"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium ring-offset-white hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:outline-none data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 dark:data-[state=checked]:bg-gray-50 dark:data-[state=checked]:text-gray-900"
                >
                  <RadioGroupItem id="size-xl" value="xl" className="sr-only" />
                  XL
                </Label>
                <Label
                  htmlFor="size-2xl"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium ring-offset-white hover:bg-gray-100 hover:text-gray-900 focus-visible:ring-2 focus-visible:ring-gray-950 focus-visible:ring-offset-2 focus-visible:outline-none data-[state=checked]:bg-gray-900 data-[state=checked]:text-gray-50 dark:border-gray-800 dark:bg-gray-950 dark:ring-offset-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 dark:data-[state=checked]:bg-gray-50 dark:data-[state=checked]:text-gray-900"
                >
                  <RadioGroupItem
                    id="size-2xl"
                    value="2xl"
                    className="sr-only"
                  />
                  2XL
                </Label>
              </RadioGroup>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="composition" className="text-base font-medium">
                Composition
              </Label>
              <p className="text-sm text-gray-500">
                Premium Fabric Blend: 70% Merino Wool & 30% Acrylic
              </p>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="quantity" className="text-base font-medium">
                Quantity
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease quantity</span>
                </Button>
                <div className="flex h-8 w-12 items-center justify-center rounded-md border border-gray-200 bg-white text-sm font-medium dark:border-gray-800 dark:bg-gray-950">
                  1
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                  <span className="sr-only">Increase quantity</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button className="h-12 flex-1 text-lg">
                <ShoppingBagIcon />
                Add to Cart
              </Button>
              <Button className="h-12 flex-1 bg-[#D9FF66] text-lg text-gray-900 hover:bg-[#c6eb5e]">
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
