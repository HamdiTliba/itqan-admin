import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

const queryClient = neon(process.env.DATABASE_URL!);
export const db = drizzle(queryClient, { schema });
