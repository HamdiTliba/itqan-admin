import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/db/db";
import { users } from "@/db/schema";

import Credentials from "next-auth/providers/credentials";

import type { Session, DefaultSession } from "next-auth";
import type { NextRequest } from "next/server";
import { getUserByEmail } from "@/actions/user/getUser";

// ✅ Extended user
export type ExtendedUser = DefaultSession["user"] & {
  id: string;
  role: "USER" | "EDITOR" | "ADMIN";
  firstName: string;
  lastName: string;
  // status: AppStatus;
  image: string;
};

// ✅ Extend next-auth types
declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    sub?: string;
    name?: string;
    email?: string;
    picture?: string;
    role?: string;
    firstName?: string;
    lastName?: string;
    // status?: string;
  }
}

const authConfig = {
  pages: {
    signIn: "/login",
  },

  events: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async linkAccount({ user }: { user: any }) {
      await db
        .update(users)
        .set({ emailVerified: new Date() })
        .where(eq(users.id, user.id));
    },
  },

  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await getUserByEmail(email);
        if (!user || !user.password) return null;

        const passwordMatch = await bcrypt.compare(password, user.password);
        return passwordMatch ? user : null;
      },
    }),
  ],

  callbacks: {
    async session({
      session,
      token,
    }: {
      session: Session;
      token: import("next-auth/jwt").JWT;
    }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.firstName = token.firstName as string;
        session.user.lastName = token.lastName as string;
        session.user.role = token.role as ExtendedUser["role"];
        session.user.name =
          token.name || `${session.user.firstName} ${session.user.lastName}`;
        // session.user.status = token.status as AppStatus;
        session.user.image = token.picture || "";
      }

      return session;
    },

    async jwt({ token }: { token: import("next-auth/jwt").JWT }) {
      if (!token.sub) return token;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/getUserById`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: token.sub }),
        }
      );

      if (!response.ok) return token;

      const existingUser = await response.json();
      if (!existingUser) return token;

      token.firstName = existingUser.firstName;
      token.lastName = existingUser.lastName;
      token.name = existingUser.name;
      token.role = existingUser.role;
      // token.status = existingUser.status;
      token.picture = existingUser.image || "";

      return token;
    },

    authorized({
      auth,
      request,
    }: {
      auth: { user?: ExtendedUser };
      request: NextRequest;
    }) {
      const user = auth?.user;
      const pathname = request.nextUrl.pathname;

      const isOnLoginPage = pathname.startsWith("/login");
      const isOnSignUpPage = pathname.startsWith("/register");
      const isOrdersPage = pathname.startsWith("/commandes");
      const isProfilePage = pathname.startsWith("/profil");

      if (!user && (isOrdersPage || isProfilePage)) {
        return Response.redirect(new URL("/login", request.nextUrl));
      }

      if (user && (isOnLoginPage || isOnSignUpPage)) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};

export default authConfig;
