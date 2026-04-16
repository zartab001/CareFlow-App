# Data layer

Choose **one** primary path per deployment:

1. **DB in Next (`server/db`)** — Drizzle + `DATABASE_URL`; use in Server Components and Server Actions only. Mark modules with `import "server-only"`.
2. **HTTP to Express (`server/http`)** — Typed client to the existing `backend/` API; keeps persistence in one place until you consolidate.

Do not mix both for the same entity without a deliberate BFF boundary.
