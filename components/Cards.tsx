"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";
import {
  HeartIcon,
  MinusIcon,
  PlusIcon,
  ShoppingCartIcon,
  Trash2Icon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { Product } from "@/types";

function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState<boolean>(false);
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <Card
      key={product.id}
      className="flex flex-col justify-between pt-0 shadow-none"
    >
      <CardHeader className="relative p-0">
        <Image
          src={product.thumbnail}
          alt={product.title}
          width={300}
          height={300}
          className="size-full object-cover rounded-tl-lg rounded-tr-lg"
        />
        <CardTitle className="px-4 pt-4 line-clamp-1">
          {product.title}
        </CardTitle>
        <CardDescription className="flex items-center gap-2 px-4">
          <Badge variant="outline">EU38</Badge>
          <Badge variant="outline">Black and White</Badge>
        </CardDescription>
        <Button
          size={"icon"}
          onClick={() => setLiked(!liked)}
          className="bg-primary/10 hover:bg-primary/20 rounded-full absolute right-2 top-2"
        >
          <HeartIcon
            className={cn(
              "size-4",
              liked ? "fill-destructive stroke-destructive" : "stroke-white"
            )}
          />
        </Button>
      </CardHeader>
      <CardContent className="flex gap-2">
        <ins className="font-semibold no-underline">Tk {product.price.toFixed(2)}</ins>
        <del className="font-semibold text-muted-foreground">Tk {product.price.toFixed(2)}</del>
      </CardContent>
      <CardFooter>
        <Button onClick={() => addToCart(product)}>
          <ShoppingCartIcon />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}

function CartCard({ product }: { product: Product }) {
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  return (
    <Card
      key={product.id}
      className="p-0 border-none shadow-none min-[360]:flex-row gap-4"
    >
      <Image
        src={product.thumbnail}
        alt={product.title}
        width={120}
        height={120}
        className="border size-full min-[360]:size-[5.5rem] rounded aspect-video"
      />
      <div className="flex flex-col gap-4 h-auto min-[360]:gap-0 min-[360]:w-full">
        <CardHeader className="p-0">
          <CardTitle className="line-clamp-1">{product.title}</CardTitle>
          <CardDescription>{product.category}</CardDescription>
          <CardAction>
            <Button
              variant={"ghost"}
              size={"icon"}
              onClick={() => removeFromCart(product)}
            >
              <Trash2Icon />
            </Button>
          </CardAction>
        </CardHeader>
        <CardFooter className="p-0 mt-auto">
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => decrementQuantity(product)}
            className="shadow-none rounded size-8"
          >
            <MinusIcon />
          </Button>
          <span className="w-6 text-center text-sm">{product.quantity}</span>
          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => incrementQuantity(product)}
            className="shadow-none rounded size-8"
          >
            <PlusIcon />
          </Button>
          <span className="ml-auto text-sm">{product.price}</span>
        </CardFooter>
      </div>
    </Card>
  );
}

export { ProductCard, CartCard };
