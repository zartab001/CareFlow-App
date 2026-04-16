import Link from "next/link";

export default function DashboardHomePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
          Agency overview
        </h1>
        <p className="text-sm text-zinc-600">
          KPIs and shortcuts will live here.
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <DashboardLink href="/patients" label="Patients" />
        <DashboardLink href="/scheduling" label="Scheduling" />
        <DashboardLink href="/staff" label="Staff" />
      </ul>
    </div>
  );
}

function DashboardLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="rounded-lg border border-zinc-200 bg-white p-4 text-sm font-medium text-zinc-900 shadow-sm transition hover:border-zinc-300"
    >
      {label}
    </Link>
  );
}
