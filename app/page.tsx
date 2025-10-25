import { getProducts } from "@/actions/products";
import { HeroSection } from "@/components/HeroSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon, ShoppingCartIcon } from "lucide-react";
import Image from "next/image";
export default async function Home() {
  const products = await getProducts();
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
            {products.slice(0, 24).map((product) => (
              <Card
                key={product.id}
                className="flex flex-col justify-between pt-0 shadow-none"
              >
                <CardHeader className="relative p-0">
                  <Image
                    src={
                      product.images[0].startsWith("http")
                        ? product.images[0]
                        : `https://i.imgur.com/${product.images[0]}`
                    }
                    alt={product.title}
                    width={300}
                    height={300}
                    className="size-full object-cover rounded-tl-lg rounded-tr-lg"
                  />
                  <CardTitle className="px-6 pt-6">{product.title}</CardTitle>
                  <CardDescription className="flex items-center gap-2 px-6">
                    <Badge variant="outline">EU38</Badge>
                    <Badge variant="outline">Black and White</Badge>
                  </CardDescription>
                  <Button
                    size={"icon"}
                    className="bg-primary/10 hover:bg-primary/20 rounded-full absolute right-2 top-2"
                  >
                    <HeartIcon className="size-4 stroke-white" />
                  </Button>
                </CardHeader>
                <CardContent>
                  <p>{product.description.slice(0, 80)}</p>
                </CardContent>
                <CardFooter>
                  <Button>
                    <ShoppingCartIcon />
                    Add to cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
