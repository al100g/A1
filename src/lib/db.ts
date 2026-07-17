import { Pool } from "pg";

declare global {
  var __a1Pool: Pool | undefined;
}

function hasSslEnabled() {
  return process.env.DATABASE_SSL === "true" || process.env.NODE_ENV === "production";
}

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error("Missing required environment variable: DATABASE_URL");
  }

  if (!global.__a1Pool) {
    global.__a1Pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: hasSslEnabled() ? { rejectUnauthorized: false } : false,
    });
  }

  return global.__a1Pool;
}
