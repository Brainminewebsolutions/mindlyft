export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-[#f9f8ff]">
      {/* Hero */}
      <div className="relative h-[60vh] bg-gray-200 sm:h-[70vh] md:h-screen" />

      {/* Quick links */}
      <div className="mx-auto max-w-[1100px] px-[6vw] py-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-16 rounded-2xl border border-violet-100 bg-white" />
          ))}
        </div>
      </div>

      {/* Resources grid */}
      <div className="mx-auto max-w-[1100px] px-[6vw] pb-20">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div className="h-6 w-40 rounded bg-gray-200" />
          <div className="h-9 w-48 rounded-full bg-gray-100" />
        </div>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-violet-100 bg-white">
              <div className="h-36 w-full bg-gray-200" />
              <div className="space-y-2 p-5">
                <div className="h-4 w-3/4 rounded bg-gray-200" />
                <div className="h-3 w-full rounded bg-gray-200" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div className="mx-[6vw] mb-20 h-40 rounded-3xl bg-gray-200" />
    </div>
  );
}
