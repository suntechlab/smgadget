"use client";

import { useCartStore } from "@/lib/store";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import Link from "next/link";

function CartList({ className, ...props }: React.ComponentProps<"div">) {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  return (
    <div className={className} {...props}>
      <div className="flex justify-between mb-5">
        <h2 className="font-bold text-xl">Shopping Cart</h2>
        <h3 className="font-bold text-xl text-muted-foreground">
          {cart.length} Items
        </h3>
      </div>
      <div className="space-y-3">
        {cart.map((product, index) => (
          <div
            key={index}
            className="flex flex-col min-[400]:flex-row sm:items-center gap-2"
          >
            <div className="w-full min-[400]:max-w-[110px]">
              <Image
                src={product.thumbnail}
                alt={product.title}
                className="border rounded-lg max-[400]:aspect-4/3"
                width={500}
                height={500}
              />
            </div>
            <div className="grid grid-cols-4 gap-2 w-full">
              <div className="col-span-full sm:col-span-2">
                <div className="flex flex-col gap-2">
                  <h4 className="font-bold">{product.title}</h4>
                  <div className="flex sm:flex-col gap-2">
                    <h5>White</h5>
                    <h5>2XL</h5>
                  </div>
                </div>
              </div>
              <div className="col-span-full sm:col-span-2 flex items-center justify-between">
                <div className="flex items-center border rounded-lg order-2">
                  <Button
                    variant={"ghost"}
                    onClick={() => decrementQuantity(product)}
                  >
                    <MinusIcon />
                  </Button>
                  <Input
                    type="button"
                    value={product.quantity}
                    className="w-10 border-t-0 border-b-0 rounded-none shadow-none"
                  />
                  <Button
                    variant={"ghost"}
                    onClick={() => incrementQuantity(product)}
                  >
                    <PlusIcon />
                  </Button>
                </div>
                <div className="order-1">{product.price}</div>
                <div className="order-3">
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    onClick={() => removeFromCart(product)}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
function CartSummary({ className, ...props }: React.ComponentProps<"div">) {
  const cart = useCartStore((state) => state.cart);
  const subTotal = cart.reduce(
    (acc, product) => acc + product.price * (product.quantity as number),
    0
  );
  let shippingCharge = 0;
  if (subTotal > 0) {
    shippingCharge = 100;
  }
  const total = (subTotal + shippingCharge).toFixed(2);
  return (
    <div className={className} {...props}>
      <div className="flex justify-between mb-5">
        <h2 className="font-bold text-xl">Order Summary</h2>
      </div>
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-lg">{cart.length} Items</p>
          <p className="text-lg font-bold">Tk{subTotal.toFixed(2)}</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-lg">Shipping</p>
          <p className="text-lg">Tk{shippingCharge.toFixed(2)}</p>
        </div>
        <Separator />
        <div className="flex items-center justify-between font-bold">
          <p className="text-lg">Total</p>
          <p className="text-lg">Tk{total}</p>
        </div>
        <Button asChild className="w-full" size={"lg"}>
          <Link href={"/checkout"}>Checkout</Link>
        </Button>
      </div>
    </div>
  );
}

function CartContainder() {
  const cart = useCartStore((state) => state.cart);
  return (
    <div className="mx-auto max-w-screen-2xl px-4 xl:px-8">
      {cart.length > 0 ? (
        <div className="grid md:grid-cols-3 gap-5">
          <CartList className="col-span-full lg:col-span-2 p-6 rounded-lg border" />
          <div>
            <CartSummary className="p-6 rounded-lg border" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center min-h-[calc(100vh-500px)]">
          <h2 className="text-3xl font-bold text-muted-foreground">
            Cart is Empty
          </h2>
        </div>
      )}
    </div>
  );
}
export { CartList, CartSummary, CartContainder };
