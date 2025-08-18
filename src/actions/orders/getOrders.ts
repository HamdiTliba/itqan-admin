"use server";

import { db } from "@/db/db";
import { orders } from "@/db/schema";

export const getOrders = async () => {
  try {
    const allOrders = await db.select().from(orders);
    console.log("all orders", allOrders);
    return allOrders;
  } catch (error) {
    console.error("Error fetching order:", error);
    throw new Error("Failed to fetch orders");
  }
};
