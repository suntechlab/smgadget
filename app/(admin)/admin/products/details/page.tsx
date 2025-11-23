import { getProductDetails } from "@/actions/products";
import { ProductDetails } from "@/components/admin/ProductDetails";

export default async function ProductDetailPage() {
  const product = await getProductDetails();
  return <main>
    <ProductDetails product={product} />
  </main>;
}