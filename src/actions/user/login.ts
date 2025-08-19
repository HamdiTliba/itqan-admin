"use server";

import { signIn } from "../../auth";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";
import { AuthError } from "next-auth";
import { FieldValues } from "react-hook-form";

export const login = async (values: FieldValues) => {
  const { email, password } = values;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "An error occurred during login" };
      }
    }
    throw error;
  }
};
