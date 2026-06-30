export default function Loading() {
  return (
    <div className="min-h-screen bg-[#f5f3ff] animate-pulse">
      {/* Hero */}
      <div className="relative h-screen bg-gray-200" />

      {/* Meta bar */}
      <div className="bg-white border-b border-violet-100 px-[6vw] py-4 flex gap-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-4 w-24 rounded bg-gray-200" />
        ))}
      </div>

      {/* Body */}
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 px-[6vw] py-10 min-[901px]:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="h-5 w-40 rounded bg-gray-200" />
          <div className="space-y-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-4 rounded bg-gray-200" style={{ width: `${90 - i * 10}%` }} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 rounded-[14px] bg-gray-200" />
            ))}
          </div>
        </div>
        <div className="h-80 rounded-[20px] bg-gray-200" />
      </div>
    </div>
  );
}
