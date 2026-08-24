export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-white">
      {/* Hero */}
      <div className="flex min-h-screen items-center px-6 pb-16 pt-28 md:px-[60px]">
        <div className="max-w-2xl space-y-6">
          <div className="h-6 w-32 rounded-full bg-gray-200" />
          <div className="h-16 w-full rounded bg-gray-200" />
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="flex flex-wrap gap-x-10 gap-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-xl bg-gray-200" />
                <div className="h-8 w-16 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Explore cards */}
      <div className="px-6 py-24 md:px-[60px]">
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-14 h-10 w-72 rounded bg-gray-200" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="h-56 rounded-3xl bg-gray-100" />
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-violet-50 px-6 py-24 md:px-[60px]">
        <div className="mx-auto max-w-3xl">
          <div className="mx-auto mb-14 h-10 w-56 rounded bg-gray-200" />
          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 rounded-2xl bg-white" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
