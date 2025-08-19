import { NextAuthConfig } from "next-auth";
import { ExtendedUser } from "./auth";

import { eq } from "drizzle-orm";
import Credentials from "next-auth/providers/credentials";
import google from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/actions/user/getUser";
import { db } from "@/db/db";
import { users } from "@/db/schema";
const isAdmin = (role: string) => role === "ADMIN" || role === "EDITOR";
export default {
  pages: {
    signIn: "/login",
  },
  events: {
    async linkAccount({ user }) {
      await db
        .update(users)
        .set({ emailVerified: new Date() })
        .where(eq(users.id, user.id!));
    },
  },

  providers: [
    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        const user = await getUserByEmail(email);

        if (!user || !user.password) return null;
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (passwordMatch) {
          return user;
        }
        return null;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.role = token.role as ExtendedUser["role"];
        session.user.name = token.name as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token;
      }
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/auth/getUserById`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id: token.sub }),
        }
      );
      if (!response.ok) {
        return token;
      }
      const existingUser: ExtendedUser = await response.json();

      if (!existingUser) return token;
      token.firstName = existingUser.firstName;
      token.lastName = existingUser.lastName;
      token.name = existingUser.name;
      token.role = existingUser.role;
      // token.status = existingUser.status;
      token.picture = existingUser.image || "";

      return {
        ...token,
        firstName: existingUser.firstName,
        lastName: existingUser.lastName,
        name: existingUser.name,
        role: existingUser.role,
        picture: existingUser.image || "",
        fetchedAt: Date.now(),
      };
    },
    authorized({ auth, request }) {
      const user = auth?.user;
      console.log("user", user);
      const path = request.nextUrl?.pathname;

      const isRoot = path === "/";
      const isAdminPage = path.startsWith("/admin");
      const isUnderReviewPage = path.startsWith("/under-review");

      if (!user && isAdminPage) {
        return Response.redirect(new URL("/", request.nextUrl));
      }
      if (!user && isUnderReviewPage) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      if (user) {
        if (isRoot) {
          return Response.redirect(
            new URL(
              user.role === "USER" ? "/under-review" : "/admin/products",
              request.nextUrl
            )
          );
        }

        if (path === "/admin" || (user.role === "USER" && isAdminPage)) {
          return Response.redirect(new URL("/under-review", request.nextUrl));
        }

        if (isUnderReviewPage && isAdmin(user.role)) {
          return Response.redirect(new URL("/admin/products", request.nextUrl));
        }
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
