"use server";
import { Product, Products } from "@/types";
import prisma from "@/lib/prisma";
import { ProductFormData } from "@/lib/zod";

export const createProduct = async (data: ProductFormData) => {
  try {
    await prisma.product.create({data:{name:data.name,description:data.description,basePrice:data.basePrice,tags:data.tags,discountType:data.discountType,taxClass:data.taxClass,status:data.status,thumbnail:data.thumbnail.name,template:data.template,vatAmount:data.vatAmount,variations:data.variations,categories:{create:[{name:data.categories[0].name}]}}});
    return {
      success: true,
      message: "Your product has been created successfully",
    };
  } catch (error) {
    throw error;
  }
};

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