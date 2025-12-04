"use server";
import fs from "fs/promises";
import { Product, Products } from "@/types";
import prisma from "@/lib/prisma";
import { ProductFormData } from "@/lib/zod";

export const createProduct = async (data: ProductFormData) => {
  const thumbnail = data.thumbnail;
  const images = data.images.map((file: any) => file.file);
  const imagesName = images.map((image: any) => image.name);
  if (thumbnail instanceof File) {
    const bytes = await thumbnail.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const filePath = `public/${thumbnail.name}`;
    await fs.writeFile(filePath, buffer);
    // return { success: true, message: "File uploaded successfully!" };
  }
  // return { error: "No file uploaded." };
  for (const image of images as File[]) {
    const arrayBuffer = await image.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);
    await fs.writeFile(`public/${image.name}`, buffer);
    // Alternatively, upload to a cloud service like S3 here
  }
  try {
    await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        basePrice: data.basePrice,
        tags: data.tags,
        discountType: data.discountType,
        taxClass: data.taxClass,
        status: data.status,
        thumbnail: thumbnail.name,
        images: imagesName,
        template: data.template,
        vatAmount: data.vatAmount,
        variations: data.variations,
        categories: {
          connectOrCreate: {
            where: data.categories[0],
            create: data.categories[0],
          },
        },
        brands: {
          connectOrCreate: { where: data.brands[0], create: data.brands[0] },
        },
      },
    });
    return {
      success: true,
      message: "Your product has been created successfully",
    };
  } catch (error) {
    throw error;
  }
};

export async function getProducts(): Promise<Products> {
  const response = await fetch("https://dummyjson.com/products");
  const data: Products = await response.json();
  return data;
}
export async function getProductDetails(): Promise<Product> {
  const response = await fetch("https://dummyjson.com/products/6");
  const data: Product = await response.json();
  return data;
}
export async function getProductsCustom(): Promise<Products> {
  const response = await fetch("https://dummyjson.com/products");
  const data: Products = await response.json();
  return data;
}
