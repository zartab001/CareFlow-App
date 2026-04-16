export default function FamilyPortalLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-full bg-slate-50">
      <header className="border-b border-slate-200 bg-white px-4 py-3">
        <p className="text-sm font-semibold text-slate-900">Family portal</p>
        <p className="text-xs text-slate-500">
          Stub layout — separate auth and shell later.
        </p>
      </header>
      <main className="mx-auto max-w-3xl p-4">{children}</main>
    </div>
  );
}
