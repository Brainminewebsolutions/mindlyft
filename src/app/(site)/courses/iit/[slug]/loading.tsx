export default function Loading() {
  return (
    <div className="min-h-screen bg-white animate-pulse">
      {/* Hero */}
      <div className="h-[480px] bg-gray-200" />

      {/* Body */}
      <div className="mx-auto max-w-[1200px] px-[5vw] py-12 grid grid-cols-1 gap-10 min-[900px]:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="h-8 w-2/3 rounded bg-gray-200" />
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="h-4 rounded bg-gray-200" style={{ width: `${95 - i * 8}%` }} />
            ))}
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-20 rounded-xl bg-gray-200" />
            ))}
          </div>
          <div className="space-y-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-12 rounded-lg bg-gray-200" />
            ))}
          </div>
        </div>
        <div className="h-96 rounded-2xl bg-gray-200" />
      </div>
    </div>
  );
}
