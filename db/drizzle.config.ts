import { defineConfig } from "drizzle-kit";

const url = Deno.env.get("DATABASE_URL");
if (!url) throw new Error("DATABASE_URL env var is required");

// https://orm.drizzle.team/learn/tutorials/drizzle-with-neon#create-a-new-neon-project
export default defineConfig({
  schema: "./schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: { url },
});
