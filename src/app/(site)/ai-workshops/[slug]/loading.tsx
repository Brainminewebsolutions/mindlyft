export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-[#f5f3ff]">
      {/* Hero */}
      <div className="relative h-[60vh] bg-gray-200 sm:h-[70vh] md:h-screen" />

      {/* Meta bar */}
      <div className="flex gap-5 border-b border-violet-100 bg-white px-[6vw] py-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-4 w-20 rounded bg-gray-200" />
        ))}
      </div>

      {/* Body */}
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 px-[6vw] py-12 lg:grid-cols-[1fr_340px]">
        <div className="space-y-8">
          <div className="space-y-3">
            <div className="h-5 w-40 rounded bg-gray-200" />
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-12 rounded-xl bg-gray-200" />
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <div className="h-5 w-24 rounded bg-gray-200" />
            <div className="h-4 w-full rounded bg-gray-200" />
            <div className="h-4 w-5/6 rounded bg-gray-200" />
          </div>
          <div className="space-y-3">
            <div className="h-5 w-32 rounded bg-gray-200" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-16 rounded-xl bg-gray-200" />
              ))}
            </div>
          </div>
        </div>
        <div className="h-80 rounded-2xl bg-gray-200" />
      </div>
    </div>
  );
}
