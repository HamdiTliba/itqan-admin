"use server";

import { db } from "@/db/db";
import { products } from "@/db/schema";

import { eq } from "drizzle-orm";

export const updateProductStatus = async (id: string, newStatus: boolean) => {
  try {
    const [updatedProduct] = await db
      .update(products)
      .set({ status: newStatus })
      .where(eq(products.id, id))
      .returning();

    return { success: true, product: updatedProduct };
  } catch (error) {
    console.error("Error updating product status:", error);
    return { success: false };
  }
};
