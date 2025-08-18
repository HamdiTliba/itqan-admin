import {
  pgTable,
  varchar,
  timestamp,
  text,
  uuid,
  integer,
  unique,
} from "drizzle-orm/pg-core";
import { users } from "./users";
import { sql } from "drizzle-orm";

export const accounts = pgTable(
  "accounts",
  {
    id: uuid("id")
      .default(sql`gen_random_uuid()`)
      .primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: varchar("type", { length: 50 }).notNull(),
    provider: varchar("provider", { length: 50 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 50 }),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  // UNIQUE CONSTRAINTS
  (account) => [
    unique("unique_provider").on(account.provider, account.providerAccountId),
  ]
);

// Export types
export type Account = typeof accounts.$inferSelect; // Type for SELECT queries
export type NewAccount = typeof accounts.$inferInsert; // Type for INSERT queries
