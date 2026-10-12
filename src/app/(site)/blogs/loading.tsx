export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-white">
      {/* Page header */}
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 px-6 pb-10 pt-28">
        <div className="h-4 w-32 rounded bg-gray-200" />
        <div className="h-10 w-80 max-w-full rounded bg-gray-200" />
        <div className="h-4 w-64 rounded bg-gray-200" />
      </div>

      <div className="mx-auto max-w-6xl px-6 pb-20">
        {/* Filters */}
        <div className="flex items-center justify-between gap-4 border-b border-violet-100 pb-6">
          <div className="flex gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-8 w-20 rounded-full bg-gray-100" />
            ))}
          </div>
          <div className="hidden h-9 w-64 rounded-full bg-gray-100 md:block" />
        </div>

        {/* Blog grid */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-12 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i}>
              <div className="aspect-[16/9] w-full rounded-2xl bg-gray-200" />
              <div className="mt-4 space-y-2">
                <div className="h-3 w-20 rounded bg-gray-200" />
                <div className="h-5 w-3/4 rounded bg-gray-200" />
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
