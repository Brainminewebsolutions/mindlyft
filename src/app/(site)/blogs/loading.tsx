export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-[#f9f8ff]">
      {/* Hero */}
      <div className="bg-violet-200/60 px-6 pb-12 pt-28">
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-4">
          <div className="h-8 w-40 rounded-full bg-white/50" />
          <div className="h-9 w-72 rounded bg-white/50" />
          <div className="h-4 w-56 rounded bg-white/40" />
        </div>
      </div>

      {/* Sidebar + grid */}
      <div className="flex flex-col gap-0 lg:flex-row">
        {/* Sidebar */}
        <aside className="hidden w-72 shrink-0 border-r border-violet-100 bg-white px-4 py-6 lg:block xl:w-80">
          <div className="mb-6 h-4 w-24 rounded bg-gray-200" />
          <div className="space-y-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-10 rounded-xl bg-gray-100" />
            ))}
          </div>
        </aside>

        {/* Blog grid */}
        <main className="flex-1 px-6 py-8 lg:px-8">
          <div className="mb-8 flex items-center justify-between gap-4">
            <div className="h-7 w-40 rounded bg-gray-200" />
            <div className="h-10 w-72 rounded-xl bg-gray-100" />
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
                <div className="h-44 w-full bg-gray-200" />
                <div className="space-y-2 p-5">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-full rounded bg-gray-200" />
                  <div className="h-3 w-2/3 rounded bg-gray-200" />
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
