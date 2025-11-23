import { getProductDetails } from "@/actions/products";
import { AddProduct } from "@/components/admin/AddProduct";

export default async function ProductDetailPage() {
  const product = await getProductDetails();
  return <main>
    <AddProduct product={product} />
  </main>;
}