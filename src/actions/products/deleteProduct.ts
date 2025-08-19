"use server";

import { db } from "@/db/db";
import { products } from "@/db/schema"; // ta table
import { eq } from "drizzle-orm";

export const deleteProduct = async (id: string) => {
  try {
    const deleted = await db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    return deleted;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Failed to delete product.");
  }
};
