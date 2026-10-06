export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-white">
      {/* Hero */}
      <div className="flex flex-col items-center gap-4 bg-violet-50 px-6 py-24 text-center">
        <div className="h-8 w-48 rounded-full bg-gray-200" />
        <div className="h-10 w-80 rounded bg-gray-200" />
        <div className="h-4 w-96 rounded bg-gray-200" />
      </div>

      {/* Filters + grid */}
      <div className="px-6 py-20 md:px-[60px]">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="h-7 w-48 rounded bg-gray-200" />
            <div className="flex gap-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-9 w-20 rounded-full bg-gray-100" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
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

      {/* Audience band */}
      <div className="bg-violet-50 px-6 py-16">
        <div className="mx-auto max-w-6xl space-y-4">
          <div className="mx-auto h-6 w-56 rounded bg-gray-200" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="h-24 rounded-xl bg-white" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
