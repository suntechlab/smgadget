"use client";
import { useCartStore } from "@/lib/store";
import { ShoppingCartIcon, SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const ButtonCart = () => {
  const cartItem = useCartStore(state => state.cart.length);
  const toggleCart = useCartStore(state => state.toggleCart);
  return (
    <div className="relative w-fit">
      <Button
        onClick={toggleCart}
        size={"icon"}
        variant={"ghost"}
        className="relative"
      >
        <ShoppingCartIcon className="size-5" />
        <Badge
          variant="destructive"
          className="absolute -top-0.5 -right-0.5 h-5 min-w-5 rounded-full px-1 tabular-nums"
        >
          {cartItem}
        </Badge>
      </Button>
    </div>
  );
};
export const ButtonSearch = () => {
  const toggleSearch = useCartStore(state => state.toggleSearch);
  return (
    <Button onClick={toggleSearch} variant={"ghost"} size={"icon"}>
      <SearchIcon className="size-5" />
    </Button>
  );
};
