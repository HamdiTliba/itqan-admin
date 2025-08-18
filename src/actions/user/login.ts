"use server";

import { FieldValues } from "react-hook-form";
import { DEFAULT_LOGIN_REDIRECT } from "../../../routes";
import { signIn } from "../../../auth";

export const login = async (values: FieldValues) => {
  const { email, password } = values;
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
  } catch (error) {
    if (error) {
      switch (error) {
        case "CredentialsSignin":
          return { error: "Invalid email or password" };
        default:
          return { error: "An error occurred during login" };
      }
    }
    throw error;
  }
};
