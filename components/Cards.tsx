"use client";

import { useState } from "react";

import { HeartIcon, ShoppingCartIcon } from "lucide-react";

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
        <Button>
          <ShoppingCartIcon />
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  );
}

export { ProductCard };
