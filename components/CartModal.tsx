"use client";
import * as React from "react";
import { useCartStore } from "@/lib/store";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartCard } from "./Cards";
import Link from "next/link";

export function CartModal() {
  const isOpenCart = useCartStore((state) => state.isOpenCart);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const closeCart = useCartStore((state) => state.closeCart);
  const cart = useCartStore((state) => state.cart);
  const total = cart.reduce(
    (acc, product) => acc + product.price * (product.quantity as number),
    0
  );
  const pathname = usePathname();

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1023) {
        closeCart();
      }
    };
    closeCart();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname,closeCart]);
  return (
    <Sheet open={isOpenCart} onOpenChange={toggleCart}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>{cart.length} items in your cart</SheetDescription>
        </SheetHeader>
        <div className="px-4 h-full overflow-y-auto">
          <ul className="space-y-6">
            {cart.map((product) => (
              <CartCard key={product.id} product={product} />
            ))}
          </ul>
        </div>
        <SheetFooter className="border-t">
          <div className="flex justify-between text-base font-medium text-gray-900">
            <p>Subtotal</p>
            <p>{total.toFixed(2)}</p>
          </div>
          <p className="mt-0.5 text-sm text-gray-500">
            Shipping and taxes calculated at checkout.
          </p>
          <div className="mt-6">
            <Button asChild className="w-full" size={"lg"}>
              <Link href="/checkout">Checkout</Link>
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
