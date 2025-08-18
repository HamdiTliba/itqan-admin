"use server";

import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const deleteUser = async (id: string) => {
  try {
    const deletedUser = await db
      .delete(users)
      .where(eq(users.id, id))
      .returning();

    return deletedUser;
  } catch (error) {
    console.error("Error deleting user:", error);
    return null;
  }
};
