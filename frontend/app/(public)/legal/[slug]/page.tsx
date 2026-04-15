type LegalPageProps = { params: Promise<{ slug: string }> };

export default async function LegalPage(props: LegalPageProps) {
  const { slug } = await props.params;
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-semibold capitalize text-zinc-900">
        {slug.replace(/-/g, " ")}
      </h1>
      <p className="mt-4 text-sm text-zinc-600">
        Legal copy placeholder for <code className="rounded bg-zinc-100 px-1">{slug}</code>
        .
      </p>
    </div>
  );
}
