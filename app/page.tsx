import { getProducts } from "@/actions/products";
import { ProductCard } from "@/components/Cards";
import { HeroSection } from "@/components/HeroSection";
import {
  ArrowRightIcon,
  MessageCircleHeartIcon,
  RefreshCwIcon,
  RocketIcon,
  ShieldCheckIcon,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
export default async function Home() {
  const { products } = await getProducts();
  return (
    <main>
      <HeroSection />
            <section className="pt-12 hidden min-[940]:block">
        <div className="mx-auto max-w-screen-2xl px-4 xl:px-8">
          <div className="grid grid-cols-4 gap-3">
            <div className="flex items-center gap-3">
              <RocketIcon size={40} />
              <div>
                <h3 className="text-lg font-semibold">Free Shipping</h3>
                <p className="text-sm">For all orders Tk1000</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <RefreshCwIcon size={40} />
              <div>
                <h3 className="text-lg font-semibold">Easy Returns</h3>
                <p className="text-sm">Cancellation after 1 day</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <ShieldCheckIcon size={40} />
              <div>
                <h3 className="text-lg font-semibold">Secure Payments</h3>
                <p className="text-sm">Gurantee secure payments</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <MessageCircleHeartIcon size={40} />
              <div>
                <h3 className="text-lg font-semibold">
                  24/7 Support
                </h3>
                <p className="text-sm">Anywhere &amp; anytime</p>
              </div>
            </div>
          </div>
        </div>
      </section>
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
    </main>
  );
}
