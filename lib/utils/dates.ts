/** ISO-8601 UTC timestamp for API payloads and logs. */
export function nowIso(): string {
  return new Date().toISOString();
}
