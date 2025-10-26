"use client";
import { useCartStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { CartCard } from "./Cards";
import { CreditCardIcon, PackageIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

export function CartModal() {
  const isOpenCart = useCartStore((state) => state.isOpenCart);
  const toggleCart = useCartStore((state) => state.toggleCart);
  const cart = useCartStore((state) => state.cart);
  const total = cart.reduce(
    (acc, product) => acc + product.price * (product.quantity as number),
    0
  );
  return (
    <Sheet open={isOpenCart} onOpenChange={toggleCart}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>{cart.length} items in your cart</SheetDescription>
        </SheetHeader>
        <div className="px-4 space-y-6">
          <ul className="space-y-4">
            {cart.map((product) => (
              <CartCard key={product.id} product={product} />
            ))}
          </ul>
          {cart.length > 0 && (
            <Card>
              <CardHeader className="px-4">
                <CardTitle className="text-lg">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="px-4 space-y-4 pt-0">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>{total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>0.00</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Total</span>
                    <span>{total.toFixed(2)}</span>
                  </div>
                </div>
                <div className="text-muted-foreground flex items-center gap-2 text-sm">
                  <PackageIcon size={16} />
                  <span>Free shipping on orders over $200</span>
                </div>
                <button
                  data-slot="button"
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive bg-primary text-primary-foreground shadow-xs hover:bg-primary/90 h-9 px-4 py-2 has-[>svg]:px-3 w-full"
                >
                  <CreditCardIcon size={16} />
                  Checkout
                </button>
              </CardContent>
            </Card>
          )}
        </div>

        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
