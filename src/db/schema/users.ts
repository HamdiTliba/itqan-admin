import {
  pgTable,
  varchar,
  timestamp,
  text,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

// USERS TABLE
export const roleStatus = pgEnum("role", ["USER", "EDITOR", "ADMIN"]);

// export const userStatus = pgEnum("status", [
//   "under-review",
//   "accepted",
//   "deleted",
// ]);

export const users = pgTable("users", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  firstName: varchar("first_name", { length: 255 }),
  lastName: varchar("last_name", { length: 255 }),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).unique(),
  role: roleStatus("role").default("USER").notNull(),
  // status: userStatus("status").default("under-review").notNull(),
  emailVerified: timestamp("email_verified"),
  image: text("image"),
  password: text("password"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Export types
export type User = typeof users.$inferSelect; // Type for SELECT queries
export type NewUser = typeof users.$inferInsert; // Type for INSERT queries
