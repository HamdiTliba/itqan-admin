"use server";

import { db } from "@/db/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";
type orderStatusEnum = "EnAttente" | "EnCours" | "Terminé" | "Annulé";

export const updateOrderStatus = async (
  id: string,
  status: orderStatusEnum
) => {
  try {
    const updated = await db
      .update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();

    return updated[0]; // Returning the first result
  } catch (error) {
    console.error(error);
    throw new Error("Failed to update status");
  }
};
