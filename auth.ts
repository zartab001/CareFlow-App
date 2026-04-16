import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

/** Edge-safe: keep out of `config/env` so middleware can import `auth`. */
const authSecret =
  process.env.AUTH_SECRET ??
  (process.env.NODE_ENV === "development"
    ? "dev-only-change-me-32-characters-min"
    : undefined);

export const { handlers, auth, signIn, signOut } = NextAuth({
  secret: authSecret,
  trustHost: true,
  providers: [
    Credentials({
      id: "demo",
      name: "Demo",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async () => ({
        id: "demo",
        name: "Demo User",
        email: "demo@careflow.test",
      }),
    }),
  ],
});
