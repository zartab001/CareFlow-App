export function SectionPlaceholder({ title }: { title: string }) {
  return (
    <div>
      <h1 className="text-xl font-semibold text-foreground">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Module scaffold.</p>
    </div>
  );
}
