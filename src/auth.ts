import NextAuth, { type DefaultSession } from "next-auth";

import authConfig from "./auth.config";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/db/db";

export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  role: "USER" | "EDITOR" | "ADMIN";
  firstName: string;
  lastName: string;
  // status: AppStatus;
  image: string;
};
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: { strategy: "jwt" },
  adapter: DrizzleAdapter(db),
  ...authConfig,
  pages: {
    ...authConfig.pages,
  },
  providers: [...authConfig.providers],
  events: {
    ...authConfig.events,
  },
  callbacks: {
    ...authConfig.callbacks,
  },
});
