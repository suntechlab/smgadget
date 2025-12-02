import { AddProduct } from "@/components/admin/AddProduct";
import prisma from "@/lib/prisma";
export default async function AddNewProduct() {
  const categories = await prisma.category.findMany();
  const brands = await prisma.brand.findMany();
  return <main>
    <AddProduct category={categories} brand={brands}  />
  </main>;
}