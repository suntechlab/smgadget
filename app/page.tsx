import { getProducts } from "@/actions/products";
import { ProductCard } from "@/components/Cards";
import { HeroSection } from "@/components/HeroSection";
export default async function Home() {
  const { products } = await getProducts();
  return (
    <main>
      <HeroSection />
      <section className="py-6 md:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 xl:px-8">
          <div className="max-w-xl mx-auto text-center mb-6 md:mb-8">
            <h2 className="text-2xl font-bold mb-4">Featured Products</h2>
            <p className="text-sm text-muted-foreground">
              Discover our most popular gadgets, carefully selected for their
              quality, innovation, and unbeatable value. Each product comes with
              our satisfaction guarantee.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
