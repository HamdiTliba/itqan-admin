"use server";

import { db } from "@/db/db";
import { NewOrder, orders } from "@/db/schema";

export const addOrder = async (formData: NewOrder) => {
  const {
    fullName,
    email,
    phone,
    address,
    totalPrice,
    status,
    userId,
    orderProducts,
  } = formData;
  try {
    const order = await db
      .insert(orders)
      .values({
        fullName,
        email,
        phone,
        address,
        totalPrice,
        orderProducts,
        status,
        userId,
      })
      .returning();
    return order;
  } catch (error) {
    console.error("Error adding order:", error);
    return { success: false, message: "Failed to add order." };
  }
};
