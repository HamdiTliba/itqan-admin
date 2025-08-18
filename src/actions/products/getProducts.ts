"use server";

import { db } from "@/db/db";
import { products } from "@/db/schema";

export const getProducts = async () => {
  try {
    const product = await db.select().from(products);
    return product;
  } catch (error) {
    console.error("Error fetching prouduct", error);
    throw new Error("Failed to fetch products");
  }
};
