import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

const url = Deno.env.get("DATABASE_URL");
if (!url) throw new Error("DATABASE_URL env var is required");
const sql = neon(url);
const db = drizzle(sql);

export default db;
