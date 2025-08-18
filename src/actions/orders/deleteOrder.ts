"use server";

import { db } from "@/db/db";
import { orders } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteOrder = async (id: string) => {
  try {
    const deleteOrder = await db
      .delete(orders)
      .where(eq(orders.id, id))
      .returning();

    return deleteOrder;
  } catch (error) {
    console.error("Error deleting order:", error);
    return null;
  }
};
