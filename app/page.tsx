import { getProducts } from "@/actions/products";
import { ProductCard } from "@/components/Cards";
import { HeroSection } from "@/components/HeroSection";
import {
  ArrowRightIcon,
  CableIcon,
  EvChargerIcon,
  HeadphonesIcon,
  LaptopIcon,
  PowerIcon,
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
            <Link href="/shop">
              <div className="flex space-x-2 items-center">
                <p className="font-semibold">View More</p>
                <ArrowRightIcon size={20} className="mt-1.5" />
              </div>
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-8 gap-5">
            <Link href="/shop" className="border rounded-lg p-5 text-center">
              <SmartphoneIcon size={64} className="mx-auto mb-3" />
              Smart Phone
            </Link>
            <Link href="/shop" className="border rounded-lg p-5 text-center">
              <TabletIcon size={64} className="mx-auto mb-3" />
              Tablet
            </Link>
            <Link href="/shop" className="border rounded-lg p-5 text-center">
              <LaptopIcon size={64} className="mx-auto mb-3" />
              Laptop
            </Link>
            <Link href="/shop" className="border rounded-lg p-5 text-center">
              <HeadphonesIcon size={64} className="mx-auto mb-3" />
              Headphone
            </Link>
            <Link href="/shop" className="border rounded-lg p-5 text-center">
              <EvChargerIcon size={64} className="mx-auto mb-3" />
              Charger
            </Link>
            <Link href="/shop" className="border rounded-lg p-5 text-center">
              <SpeakerIcon size={64} className="mx-auto mb-3" />
              Speaker
            </Link>
            <Link href="/shop" className="border rounded-lg p-5 text-center">
              <CableIcon size={64} className="mx-auto mb-3" />
              Cable
            </Link>
            <Link href="/shop" className="border rounded-lg p-5 text-center">
              <SpeakerIcon size={64} className="mx-auto mb-3" />
              Speaker
            </Link>
          </div>
        </div>
      </section>
      <section className="py-6 md:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 xl:px-8">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
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
