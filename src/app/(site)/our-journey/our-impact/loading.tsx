export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-[#f9f8ff]">
      {/* Hero */}
      <div className="relative h-[60vh] bg-gray-200 sm:h-[70vh] md:h-screen" />

      {/* Stats */}
      <div className="mx-auto max-w-[1100px] px-[6vw] py-8">
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 rounded-xl border border-violet-100 bg-white" />
          ))}
        </div>
      </div>

      {/* Milestones timeline */}
      <div className="mx-auto max-w-[1100px] px-[6vw] pb-16">
        <div className="mb-8 h-6 w-48 rounded bg-gray-200" />
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl border border-violet-100 bg-white" />
          ))}
        </div>
      </div>

      {/* CTA banner */}
      <div className="mx-[6vw] mb-20 h-40 rounded-3xl bg-gray-200" />
    </div>
  );
}
