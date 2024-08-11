import { type Config } from "drizzle-kit";

import { env } from "~/env";

export default {
  schema: "./src/server/db/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  // NOTE: you can filter tables via a prefix
  // tablesFilter: ["scrabble_*"],
} satisfies Config;
