export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#f9f8ff]">
      {/* Hero */}
      <div className="relative h-[60vh] bg-gray-200 sm:h-[70vh] md:h-screen" />

      {/* Article body */}
      <div className="mx-auto max-w-4xl space-y-4 px-6 py-12">
        <div className="h-8 w-3/4 rounded bg-gray-200" />
        <div className="flex gap-3">
          <div className="h-4 w-24 rounded bg-gray-200" />
          <div className="h-4 w-24 rounded bg-gray-200" />
        </div>
        <div className="space-y-3 pt-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="h-4 rounded bg-gray-200" style={{ width: `${95 - (i % 4) * 12}%` }} />
          ))}
        </div>
        <div className="flex gap-2 pt-6">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-6 w-16 rounded-full bg-gray-200" />
          ))}
        </div>
      </div>
    </main>
  );
}
