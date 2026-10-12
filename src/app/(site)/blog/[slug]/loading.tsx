export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-white">
      {/* Article header */}
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 pt-28 pb-8">
        <div className="h-4 w-28 rounded bg-gray-200" />
        <div className="h-10 w-3/4 rounded bg-gray-200" />
        <div className="h-4 w-1/2 rounded bg-gray-200" />
        <div className="flex gap-3">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>
      </div>

      {/* Cover image */}
      <div className="mx-auto max-w-5xl px-6">
        <div className="aspect-[16/9] rounded-2xl bg-gray-200" />
      </div>

      {/* Article body */}
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="max-w-3xl space-y-3">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 rounded bg-gray-200" style={{ width: `${95 - (i % 4) * 12}%` }} />
          ))}
        </div>
      </div>
    </main>
  );
}
