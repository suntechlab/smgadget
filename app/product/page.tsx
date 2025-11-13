import { getProductDetails } from "@/actions/products";
import { ProductDetails } from "@/components/ProductDetails";

export default async function ProductDetailPage() {
  const product = await getProductDetails();
  return <ProductDetails product={product} />;
}
