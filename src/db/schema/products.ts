import {
  pgTable,
  timestamp,
  uuid,
  text,
  jsonb,
  boolean,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export interface ProductColor {
  id: string;
  color: string;
  hex?: string;
  texture?: string;
  sizes: ProductSize[];
  status: boolean;
  description: string;
  materials: string;
  name: string;
}

export interface ProductSize {
  id: string;
  width: string;
  length: string;
  height: string;
  price: string;
  promotionPrice?: string;
  images: string[];
  dimensionImage?: string;
  dimensions: string;
}

export const products = pgTable("products", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  productName: text("productName").notNull(),
  status: boolean("status").notNull().default(true), //En stock ou En rupture
  // materials: text("materials"),
  book: text("book"),
  category: text("category"),
  isActiveCoupon: boolean("coupon").default(false),
  colors: jsonb("colors").$type<ProductColor[]>().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type NewProduct = typeof products.$inferInsert;
