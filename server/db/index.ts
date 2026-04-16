import "server-only";

import { env } from "@/config/env";

/** Drizzle client — wire when `DATABASE_URL` is available. */
export async function assertDbConfigured(): Promise<void> {
  if (!env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured");
  }
}
