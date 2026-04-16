import Link from "next/link";

import { LoginForm } from "./login-form";

export default function LoginPage() {
  return (
    <div className="space-y-4 rounded-lg border border-border bg-card p-6 shadow-sm">
      <div>
        <h1 className="text-lg font-semibold text-card-foreground">Sign in</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Demo credentials provider — replace with real auth.
        </p>
      </div>
      <LoginForm />
      <Link
        href="/"
        className="block text-center text-sm font-medium text-primary underline"
      >
        Back to home
      </Link>
    </div>
  );
}
