import Link from "next/link";
import type { ReactElement, ReactNode } from "react";

import { buttonVariants } from "variants";
import { cn } from "lib";

const nav = [
  { href: "/", label: "Home" },
  { href: "/patients", label: "Patients" },
  { href: "/scheduling", label: "Scheduling" },
  { href: "/live-monitoring", label: "Live" },
  { href: "/staff", label: "Staff" },
  { href: "/medications", label: "Medications" },
  { href: "/incidents", label: "Incidents" },
  { href: "/compliance", label: "Compliance" },
  { href: "/finance", label: "Finance" },
  { href: "/reports", label: "Reports" },
  { href: "/settings", label: "Settings" },
] as const;

export function DashboardShell({
  children,
}: Readonly<{ children: ReactNode }>): ReactElement {
  return (
    <div className="flex min-h-full bg-muted/30">
      <aside className="hidden w-56 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
        <div className="border-b border-sidebar-border px-4 py-4 text-sm font-semibold tracking-tight">
          CareFlow
        </div>
        <nav className="flex flex-1 flex-col gap-0.5 p-2">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm text-sidebar-foreground/90 transition hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="border-t border-sidebar-border p-2">
          <Link
            href="/family"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "flex w-full justify-center",
            )}
          >
            Family portal
          </Link>
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col bg-background">
        <header className="flex h-14 items-center border-b border-border px-4 md:px-6">
          <span className="text-sm font-medium text-foreground">
            Agency dashboard
          </span>
        </header>
        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  );
}
