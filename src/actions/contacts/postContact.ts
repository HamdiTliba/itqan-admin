"use server";

import { db } from "@/db/db";
import { contacts } from "@/db/schema/contact";
import { FieldValues } from "react-hook-form";

export const postContact = async (formData: FieldValues) => {
  const { fullName, phone, email, message } = formData;
  try {
    const postContact = await db
      .insert(contacts)
      .values({
        fullName,
        email,
        phone,
        message,
      })
      .returning();
    return postContact;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to send contact form");
  }
};
