import {
  pgTable,
  timestamp,
  uuid,
  text,
  jsonb,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
export const orderStatusEnum = pgEnum("order_status", [
  "EnAttente",
  "EnCours",
  "Terminé",
  "Annulé",
]);
export interface CartItem {
  id: string;
  title: string;
  price: number;
  promotionPrice?: number;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
  image: string;
}
export const orders = pgTable("orders", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  fullName: text("fullName").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  address: text("address"),
  totalPrice: text("total_price").notNull(),
  orderProducts: jsonb("orderProducts").$type<CartItem[]>().notNull(),
  status: orderStatusEnum("status").default("EnAttente").notNull(),
  userId: text("user_id"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
