"use server";

import { db } from "@/db/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { FieldValues } from "react-hook-form";
import { getUserByEmail } from "./getUser";

export const register = async (values: FieldValues) => {
  const { email, password, firstName, lastName } = values;
  const hashedPassword = await bcrypt.hash(password ?? "", 10);

  // Using query to check if user already exists
  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already exists" };
  }

  try {
    await db.insert(users).values({
      email,
      firstName,
      lastName,
      password: hashedPassword,
    });

    return {
      success: "Email and password have been saved successfully",
      user: { email, firstName, lastName },
    };
  } catch (error) {
    console.error("Error while registering user:", error);
    return { error: "An error occurred while registering the user" };
  }
};
