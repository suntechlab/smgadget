import { getProducts } from "@/actions/products";
import { ProductCard } from "@/components/Cards";
import { HeroSection } from "@/components/HeroSection";
import { Button } from "@/components/ui/button";
import {
  ArrowRightIcon,
  CableIcon,
  EvChargerIcon,
  HeadphonesIcon,
  LaptopIcon,
  MessageCircleHeartIcon,
  PowerIcon,
  RefreshCwIcon,
  RocketIcon,
  ShieldCheckIcon,
  SmartphoneIcon,
  SpeakerIcon,
  TabletIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default async function Home() {
  const { products } = await getProducts();
  return (
    <main>
      <HeroSection />
      <section className="pt-12">
        <div className="mx-auto max-w-screen-2xl px-4 xl:px-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
            <Link href="/shop" className="hidden sm:block">
              <div className="flex space-x-2 items-center">
                <p className="font-semibold">View More</p>
                <ArrowRightIcon size={20} className="mt-1.5" />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-5">
            <Link href="/shop" className="group flex flex-col items-center justify-center gap-3">
              <div className="bg-muted p-6 rounded-full">
                <Image src={'/mobile.webp'} alt="Mobile" width={200} height={200} className="size-24 object-contain"/>
              </div>
              <span className="group-hover:font-semibold">Mobile</span>
            </Link>
            <Link href="/shop" className="group flex flex-col items-center justify-center gap-3">
              <div className="bg-muted p-6 rounded-full">
                <Image src={'/laptop.webp'} alt="Laptop" width={200} height={200} className="size-24 object-contain"/>
              </div>
              <span className="group-hover:font-semibold">Laptop</span>
            </Link>
            <Link href="/shop" className="group flex flex-col items-center justify-center gap-3">
              <div className="bg-muted p-6 rounded-full">
                <Image src={'/watch.webp'} alt="Watch" width={200} height={200} className="size-24 object-contain"/>
              </div>
              <span className="group-hover:font-semibold">Watches</span>
            </Link>
            <Link href="/shop" className="group flex flex-col items-center justify-center gap-3">
              <div className="bg-muted p-6 rounded-full">
                <Image src={'/mobile.webp'} alt="Mobile" width={200} height={200} className="size-24 object-contain"/>
              </div>
              <span className="group-hover:font-semibold">Mobile</span>
            </Link>
            <Link href="/shop" className="group flex flex-col items-center justify-center gap-3">
              <div className="bg-muted p-6 rounded-full">
                <Image src={'/laptop.webp'} alt="Laptop" width={200} height={200} className="size-24 object-contain"/>
              </div>
              <span className="group-hover:font-semibold">Laptop</span>
            </Link>
            <Link href="/shop" className="group flex flex-col items-center justify-center gap-3">
              <div className="bg-muted p-6 rounded-full">
                <Image src={'/watch.webp'} alt="Watch" width={200} height={200} className="size-24 object-contain"/>
              </div>
              <span className="group-hover:font-semibold">Watches</span>
            </Link>
            <Link href="/shop" className="group flex flex-col items-center justify-center gap-3">
              <div className="bg-muted p-6 rounded-full">
                <Image src={'/mobile.webp'} alt="Mobile" width={200} height={200} className="size-24 object-contain"/>
              </div>
              <span className="group-hover:font-semibold">Mobile</span>
            </Link>
            <Link href="/shop" className="group flex flex-col items-center justify-center gap-3">
              <div className="bg-muted p-6 rounded-full">
                <Image src={'/laptop.webp'} alt="Laptop" width={200} height={200} className="size-24 object-contain"/>
              </div>
              <span className="group-hover:font-semibold">Laptop</span>
            </Link>
          </div>
        </div>
      </section>
      <section className="py-6 md:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 xl:px-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
            <Link href="/shop" className="hidden sm:block">
              <div className="flex space-x-2 items-center">
                <p className="font-semibold">View More</p>
                <ArrowRightIcon size={20} className="mt-1.5" />
              </div>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {products.slice(0, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 xl:px-8">
          <div className="grid grid-cols-2 gap-5">
            <div className="flex flex-col lg:flex-row items-center justify-between col-span-full bg-muted rounded-lg">
              <div className="max-w-lg space-y-5 p-10">
                <span className="block">Apple iPhone 14 Plus</span>
                <h3 className="text-4xl font-semibold">UP TO 30% OFF</h3>
                <p>
                  iPhone 14 has the same superspeedy chip that's in iPhone 13
                  Pro, A15 Bionic, with a 5‑core GPU, powers all the latest
                  features.
                </p>
                <Button>Order Now</Button>
              </div>
              <Image
                src={"/promo-01.webp"}
                alt="promo-1"
                width={420}
                height={370}
                className="mt-auto"
              />
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between col-span-full lg:col-span-1 bg-muted rounded-lg">
              <div className="max-w-lg space-y-5 p-10">
                <span className="block">Apple iPhone 14 Plus</span>
                <h3 className="text-2xl font-semibold">UP TO 30% OFF</h3>
                <p>iPhone 14 has the same superspeedy.</p>
                <Button>Order Now</Button>
              </div>
              <Image
                src={"/promo-01.webp"}
                alt="promo-1"
                width={420}
                height={370}
                className="mt-auto w-64"
              />
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between col-span-full lg:col-span-1 bg-muted rounded-lg">
              <div className="max-w-lg space-y-5 p-10">
                <span className="block">Apple iPhone 14 Plus</span>
                <h3 className="text-2xl font-semibold">UP TO 30% OFF</h3>
                <p>iPhone 14 has the same superspeedy.</p>
                <Button>Order Now</Button>
              </div>
              <Image
                src={"/promo-01.webp"}
                alt="promo-1"
                width={420}
                height={370}
                className="mt-auto w-64"
              />
            </div>
          </div>
        </div>
      </section>
      <section className="pb-12">
        <div className="mx-auto max-w-screen-2xl px-4 xl:px-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold mb-4">Best Selling Products</h2>
            <Link href="/shop">
              <div className="flex space-x-2 items-center">
                <p className="font-semibold">View More</p>
                <ArrowRightIcon size={20} className="mt-1.5" />
              </div>
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
            {products.slice(0, 10).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <section className="py-12 border-t">
        <div className="mx-auto max-w-screen-2xl px-4 xl:px-8">
          <div className="flex flex-wrap items-center justify-between gap-10">
            <div className="flex items-center gap-4">
              <RocketIcon size={40} />
              <div>
                <h3 className="text-lg font-semibold">Free Shipping</h3>
                <p className="text-sm">For all orders Tk1000</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <RefreshCwIcon size={40} />
              <div>
                <h3 className="text-lg font-semibold">1 &amp; 1 Returns</h3>
                <p className="text-sm">Cancellation after 1 day</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <ShieldCheckIcon size={40} />
              <div>
                <h3 className="text-lg font-semibold">100% Secure Payments</h3>
                <p className="text-sm">Gurantee secure payments</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MessageCircleHeartIcon size={40} />
              <div>
                <h3 className="text-lg font-semibold">
                  24/7 Dedicated Support
                </h3>
                <p className="text-sm">Anywhere &amp; anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
