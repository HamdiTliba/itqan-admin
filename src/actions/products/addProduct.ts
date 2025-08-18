"use server";

import { db } from "@/db/db";
import { NewProduct, products } from "@/db/schema";

export const addProduct = async (formData: NewProduct) => {
  const { status, book, category, colors, productName } = formData;
  try {
    const product = await db
      .insert(products)
      .values({
        status,
        book,
        category,
        colors,
        productName,
      })
      .returning();
    return product;
  } catch (error) {
    console.error("Error adding product:", error);
    throw new Error("Failed to add product.");
  }
};
