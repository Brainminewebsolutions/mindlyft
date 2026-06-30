export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse">
      {/* Hero */}
      <div className="h-[60vh] bg-gray-200" />

      {/* Courses grid */}
      <div className="mx-auto max-w-[1280px] px-[5vw] py-16">
        <div className="h-8 w-48 rounded bg-gray-200 mb-8" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-72 rounded-2xl bg-gray-200" />
          ))}
        </div>
      </div>
    </div>
  );
}
