export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-[#f9f8ff]">
      {/* Hero */}
      <div className="relative h-[60vh] bg-gray-200 sm:h-[70vh] md:h-screen" />

      {/* Stats */}
      <div className="mx-auto max-w-[1100px] px-[6vw] py-12">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-24 rounded-2xl border border-violet-100 bg-white" />
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1100px] px-[6vw] pb-20">
        <div className="mb-8 h-6 w-40 rounded bg-gray-200" />

        {/* Featured event */}
        <div className="mb-8 overflow-hidden rounded-3xl border border-violet-100 bg-white">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-64 bg-gray-200 lg:h-auto lg:min-h-[280px]" />
            <div className="space-y-3 p-8">
              <div className="h-6 w-3/4 rounded bg-gray-200" />
              <div className="h-4 w-full rounded bg-gray-200" />
              <div className="h-4 w-2/3 rounded bg-gray-200" />
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="overflow-hidden rounded-2xl border border-violet-100 bg-white">
              <div className="h-44 w-full bg-gray-200" />
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
