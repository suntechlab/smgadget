"use client";
import { UseContext } from "@/context";
import { ShoppingCartIcon, SearchIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const ButtonCart = () => {
  const { handleSetOpen, cart } = UseContext();
  return (
    <div className="relative w-fit">
      <Button
        onClick={handleSetOpen}
        size={"icon"}
        variant={"ghost"}
        className="relative"
      >
        <ShoppingCartIcon className="size-5" />
        <Badge
          variant="destructive"
          className="absolute -top-0.5 -right-0.5 h-5 min-w-5 rounded-full px-1 tabular-nums"
        >
          {cart.length}
        </Badge>
      </Button>
    </div>
  );
};
export const ButtonSearch = () => {
  const { handleSetSearch } = UseContext();
  return (
    <Button onClick={handleSetSearch} variant={"ghost"} size={"icon"}>
      <SearchIcon className="size-5" />
    </Button>
  );
};
