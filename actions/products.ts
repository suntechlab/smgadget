import { Product, Products } from "@/types";


export async function getProducts(): Promise<Products> {
  const response = await fetch('https://dummyjson.com/products');
  const data: Products = await response.json();
  return data;
}
export async function getProductDetails(): Promise<Product> {
  const response = await fetch('https://dummyjson.com/products/6');
  const data: Product = await response.json();
  return data;
}
export async function getProductsCustom(): Promise<Products> {
  const response = await fetch('https://dummyjson.com/products');
  const data: Products = await response.json();
  return data;
}