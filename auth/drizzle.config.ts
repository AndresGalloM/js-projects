import { env } from "@/env";
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/drizzle/schema.ts",
  out: "./src/drizzle/migrations",
  dialect: "postgresql",
  verbose: true,
  strict: true,
  dbCredentials: {
    database: env.DB_NAME,
    host: env.DB_HOST,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
    ssl: false,
  },
  casing: "snake_case",
});
