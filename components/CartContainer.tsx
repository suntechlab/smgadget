"use client";
import * as React from "react";
import { useCartStore } from "@/lib/store";
import {
  CheckIcon,
  ExternalLinkIcon,
  GiftIcon,
  MinusIcon,
  PlusIcon,
  TrashIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";

function CartList({ className, ...props }: React.ComponentProps<"div">) {
  const cart = useCartStore((state) => state.cart);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const incrementQuantity = useCartStore((state) => state.incrementQuantity);
  const decrementQuantity = useCartStore((state) => state.decrementQuantity);
  return (
    <div className={className} {...props}>
      <div className="flex justify-between mb-6">
        <h2 className="text-foreground text-2xl font-semibold">
          Shopping Cart
        </h2>
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

function PaymentMethods() {
  const [selectedPayment, setSelectedPayment] = React.useState("cash");
  const [formData, setFormData] = React.useState({
    cardName: "John Cena",
    cardNumber: "1234 5678 9012 3456",
    expiryDate: "09/27",
    cvc: "123",
    agreeTerms: true,
  });

  const paymentMethods = [
    {
      id: "Bkash",
      name: "Bkash",
      logos: ["Bkash"],
      component: "external",
    },
    {
      id: "Rocket",
      name: "Rocket",
      logos: ["Rocket"],
      component: "external",
    },
    {
      id: "card",
      name: "Credit/Debit Card",
      logos: ["Visa", "Mastercard"],
      component: "card",
    },
    {
      id: "cash",
      name: "Cash on Delivery",
      logos: ["Cash"],
      component: "external",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const cart = useCartStore((state) => state.cart);
  const subTotal = cart.reduce(
    (acc, product) => acc + product.price * (product.quantity as number),
    0
  );
  const discountPrice = cart.reduce(
    (acc, product) =>
      acc +
      product.price *
        (((product.quantity as number) * product.discountPercentage) / 100),
    0
  );
  let shippingCharge = 0;
  if (subTotal > 0) {
    shippingCharge = 100;
  }
  const total = subTotal - discountPrice + shippingCharge;
  return (
    <div className="space-y-3">
      <h2 className="text-foreground text-2xl font-semibold mb-6">
        Payment Method
      </h2>

      <div className="space-y-3">
        {paymentMethods.map((method) => (
          <Card
            key={method.id}
            className={`cursor-pointer transition-all duration-200 shadow-none rounded-lg ${
              selectedPayment === method.id
                ? "border-primary/30"
                : "hover:border-muted-foreground/20"
            }`}
            onClick={() => setSelectedPayment(method.id)}
          >
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div
                    className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                      selectedPayment === method.id
                        ? "border-primary bg-primary"
                        : "border-muted-foreground"
                    }`}
                  >
                    {selectedPayment === method.id && (
                      <div className="bg-primary-foreground h-2 w-2 rounded-full"></div>
                    )}
                  </div>
                  <span className="text-foreground font-medium">
                    {method.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  {method.logos.map((logo) => (
                    <div
                      key={logo}
                      className="bg-muted text-muted-foreground rounded px-2 py-1 text-xs font-semibold"
                    >
                      {logo}
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Form */}
              {selectedPayment === "card" && method.id === "card" && (
                <div className="mt-6 space-y-4">
                  <div>
                    <Label
                      htmlFor="cardName"
                      className="text-foreground text-sm font-medium"
                    >
                      Name on Card{" "}
                      <span className="text-muted-foreground">*Required</span>
                    </Label>
                    <Input
                      id="cardName"
                      value={formData.cardName}
                      onChange={(e) =>
                        handleInputChange("cardName", e.target.value)
                      }
                      className="mt-1"
                      placeholder="John Cena"
                    />
                  </div>

                  <div>
                    <Label
                      htmlFor="cardNumber"
                      className="text-foreground text-sm font-medium"
                    >
                      Card Number{" "}
                      <span className="text-muted-foreground">*Required</span>
                    </Label>
                    <Input
                      id="cardNumber"
                      value={formData.cardNumber}
                      onChange={(e) =>
                        handleInputChange("cardNumber", e.target.value)
                      }
                      className="mt-1"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="expiryDate"
                        className="text-foreground text-sm font-medium"
                      >
                        Expiry Date{" "}
                        <span className="text-muted-foreground">*Required</span>
                      </Label>
                      <Input
                        id="expiryDate"
                        value={formData.expiryDate}
                        onChange={(e) =>
                          handleInputChange("expiryDate", e.target.value)
                        }
                        className="mt-1"
                        placeholder="09/27"
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor="cvc"
                        className="text-foreground text-sm font-medium"
                      >
                        CVC/CVV{" "}
                        <span className="text-muted-foreground">*Required</span>
                      </Label>
                      <Input
                        id="cvc"
                        value={formData.cvc}
                        onChange={(e) =>
                          handleInputChange("cvc", e.target.value)
                        }
                        className="ring-primary/20 border-primary/30 mt-1 ring-2"
                        placeholder="123"
                      />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="shadow-none rounded-lg">
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <GiftIcon className="text-muted-foreground h-5 w-5" />
              <span className="text-foreground font-medium">Gift</span>
            </div>
            <div className="bg-primary flex h-6 w-6 items-center justify-center rounded-full">
              <CheckIcon className="text-primary-foreground h-4 w-4" />
            </div>
          </div>
          <p className="text-primary mt-2 text-sm">
            Hi, you got Tk{discountPrice.toFixed(2)} discount!
          </p>
        </CardContent>
      </Card>
      <Card className="shadow-none rounded-lg">
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-foreground">Price</span>
            <span className="text-foreground">Tk{subTotal.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground">Discount</span>
            <span className="text-foreground">
              Tk{discountPrice.toFixed(2)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-foreground">Shipping</span>
            <span className="text-foreground">
              Tk{shippingCharge.toFixed(2)}
            </span>
          </div>
          <Separator />
          <div className="flex items-center justify-between text-lg font-semibold">
            <span className="text-foreground">Total</span>
            <span className="text-foreground">Tk{total.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
      <div className="space-y-4">
        <div className="flex items-start space-x-2">
          <Checkbox
            id="terms"
            checked={formData.agreeTerms}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({ ...prev, agreeTerms: checked === true }))
            }
            className="mt-1"
          />
          <Label htmlFor="terms" className="text-sm">
            By clicking this you are agree to our
            <Link className="font-semibold hover:underline" href="#">
              Terms
            </Link>
            <span>and</span>
            <Link className="font-semibold hover:underline" href="#">
              Privacy Policy
            </Link>{" "}
            .
          </Label>
        </div>

        <Button size="lg" className="w-full" disabled={!formData.agreeTerms}>
          Place Order
        </Button>
      </div>
    </div>
  );
}
function CartContainder() {
  const cart = useCartStore((state) => state.cart);
  return (
    <div className="mx-auto max-w-screen-2xl px-4 xl:px-8">
      <div className="grid md:grid-cols-3 gap-5">
        <CartList className="col-span-full lg:col-span-2" />
        <div>
          <PaymentMethods />
        </div>
      </div>
    </div>
  );
}
export { CartContainder };
