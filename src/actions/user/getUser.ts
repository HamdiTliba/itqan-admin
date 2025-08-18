"use server";

import { db } from "@/db/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getUserByEmail = async (email: string) => {
  try {
    const getUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    return getUser.length > 0 ? getUser[0] : null;
  } catch (error) {
    console.log("Error fetching user by email:", error);
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user.length > 0 ? user[0] : null;
  } catch (error) {
    console.error("Error fetching user by id:", error);
    return null;
  }
};
