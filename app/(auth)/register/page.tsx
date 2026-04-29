import { RegisterForm } from "./register-form";

export default function RegisterPage() {
  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-[1.75rem] font-bold tracking-tight text-zinc-900">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-zinc-500">
          Start your free 14-day trial. No credit card required.
        </p>
      </div>
      <RegisterForm />
    </div>
  );
}
