import { DashboardShell } from "@/features/layout";
import { requireSession } from "@/server/auth/session";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await requireSession();
  return <DashboardShell>{children}</DashboardShell>;
}
