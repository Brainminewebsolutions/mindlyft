export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-[#f9f8ff]">
      {/* Hero */}
      <div className="bg-blue-200/60 px-6 pb-14 pt-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
          <div className="h-8 w-40 rounded-full bg-white/50" />
          <div className="h-9 w-72 rounded bg-white/50" />
          <div className="h-4 w-56 rounded bg-white/40" />
        </div>
      </div>

      {/* Filters + grid */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex gap-2">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-9 w-20 rounded-full bg-gray-100" />
            ))}
          </div>
          <div className="h-10 w-72 rounded-xl bg-gray-100" />
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-blue-100 bg-white">
              <div className="h-48 w-full bg-gray-200" />
              <div className="space-y-2 p-5">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-full rounded bg-gray-200" />
                <div className="h-3 w-2/3 rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
