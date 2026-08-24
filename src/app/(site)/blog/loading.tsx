export default function Loading() {
  return (
    <main className="min-h-screen animate-pulse bg-[#f9f8ff]">
      {/* Hero */}
      <div className="bg-violet-200/60 px-6 pb-20 pt-28">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4">
          <div className="h-8 w-48 rounded-full bg-white/50" />
          <div className="h-9 w-80 rounded bg-white/50" />
          <div className="h-4 w-64 rounded bg-white/40" />
        </div>
      </div>

      {/* Categories, each with a heading row + card grid */}
      <div className="mx-auto max-w-7xl space-y-16 px-6 py-16">
        {Array.from({ length: 2 }).map((_, s) => (
          <section key={s}>
            <div className="mb-8 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gray-200" />
              <div className="h-6 w-40 rounded bg-gray-200" />
              <div className="ml-2 h-px flex-1 bg-gray-200" />
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
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
          </section>
        ))}
      </div>
    </main>
  );
}
