"use server";

import { db } from "@/db/db";
import { User, users } from "@/db/schema";

import { eq } from "drizzle-orm";

export const updateUserStatus = async (id: string, role: User["role"]) => {
  try {
    const updateUserStatus = await db
      .update(users)
      .set({ role, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();
    return updateUserStatus;
  } catch (error) {
    console.error(error);
    return null;
  }
};
