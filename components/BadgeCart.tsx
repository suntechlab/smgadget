"use client";
import { UseContext } from "@/context";
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const BadgeCart = () => {
  const { handleSetOpen, cart } = UseContext();
  return (
    <div className="relative w-fit">
      <Button onClick={handleSetOpen} variant="outline" size="icon" className="relative">
        <ShoppingCartIcon className="size-5" />
        <Badge
          variant="destructive"
          className="absolute -top-2.5 -right-2.5 h-5 min-w-5 rounded-full px-1 tabular-nums"
        >
          {cart.length}
        </Badge>
      </Button>
    </div>
  );
};
