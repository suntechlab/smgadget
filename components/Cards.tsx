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
  CardHeader,
  CardDescription,
  CardTitle,
  CardFooter,
  CardContent,
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
        <CardTitle className="px-6 pt-6">{product.title}</CardTitle>
        <CardDescription className="flex items-center gap-2 px-6">
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
      <CardContent>
        <p>{product.description.slice(0, 80)}</p>
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
  const removeFromCart = useCartStore(state => state.removeFromCart)
  const incrementQuantity = useCartStore(state => state.incrementQuantity)
  const decrementQuantity = useCartStore(state => state.decrementQuantity)
  return (
    <Card key={product.id} className="p-0">
      <CardContent className="p-0">
        <div className="flex">
          <div className="relative h-auto w-24 shrink-0">
            <Image
              src={product.thumbnail}
              alt={product.title}
              className="object-cover"
              width={120}
              height={120}
            />
          </div>
          <div className="flex-1 p-4">
            <div className="flex justify-between">
              <div>
                <h3 className="font-medium text-sm">{product.title}</h3>
                <p className="text-muted-foreground text-xs">
                  {product.description.slice(0, 20)}
                </p>
              </div>
              <Button variant={"ghost"} onClick={()=> removeFromCart(product)}>
                <Trash2Icon />
              </Button>
            </div>
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1">
                <Button variant={"outline"} onClick={()=> decrementQuantity(product)}>
                  <MinusIcon />
                </Button>
                <span className="w-6 text-center text-sm">{product.quantity}</span>
                <Button variant={"outline"} onClick={()=> incrementQuantity(product)}>
                  <PlusIcon />
                </Button>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium">{product.price}</div>
                <div className="text-muted-foreground text-xs line-through">
                  $399.99
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export { ProductCard, CartCard };
