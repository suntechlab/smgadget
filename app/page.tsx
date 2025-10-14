import { HeroSection } from "@/components/HeroSection";
import ProductCard from "@/components/ProductCard";
import { Data } from "@/lib/Data";
export default function Home() {
  return (
      <main>
        <HeroSection/>
        <section className="py-12">
          <div className="container mx-auto">
            <ProductCard product={Data.products[0]} />
          </div>
        </section>
      </main>
  );
}
