"use server";

import { db } from "@/db/db";
import { users } from "@/db/schema";

export const getUsers = async () => {
  try {
    const getUsers = await db.select().from(users);
    return getUsers;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw new Error("Failed to fetch users");
  }
};
