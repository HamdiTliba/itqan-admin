"use server";

import { db } from "@/db/db";
import { contacts } from "@/db/schema";

export const getContacts = async () => {
  try {
    const getContacts = await db.select().from(contacts);

    return getContacts;
  } catch (error) {
    console.error("Error getting contact:", error);
  }
};
