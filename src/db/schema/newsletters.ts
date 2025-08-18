import { pgTable, timestamp, uuid, text } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const newsletters = pgTable("newsletters", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  phone: text("phone").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Newsletter = typeof newsletters.$inferSelect;
export type NewNewsletter = typeof newsletters.$inferInsert;
