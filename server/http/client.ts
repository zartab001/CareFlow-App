import "server-only";

import { env } from "@/config/env";

export function getApiBaseUrl(): string {
  return env.API_URL ?? "";
}

export async function apiFetch(
  path: string,
  init?: RequestInit,
): Promise<Response> {
  const base = getApiBaseUrl();
  if (!base) {
    throw new Error("API_URL is not configured");
  }
  return fetch(`${base.replace(/\/$/, "")}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });
}
