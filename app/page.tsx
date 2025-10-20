import { HeroSection } from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { Data } from "@/lib/Data";
export default function Home() {
  return (
      <main>
        <HeroSection/>
        <section className="py-12">
          <div className="mx-auto max-w-screen-xl 2xl:max-w-screen-2xl px-4 xl:px-8">
            <ProductCard product={Data.products[0]} />
          </div>
        </section>
      </main>
  );
}
