import { pgTable, varchar, timestamp, uuid, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const contacts = pgTable("contacts", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  fullName: varchar("full_name", { length: 50 }),
  email: varchar("email", { length: 50 }),
  phone: varchar("phone", { length: 50 }),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Export types
export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
