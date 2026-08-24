export default function Loading() {
  return (
    <div className="min-h-screen animate-pulse bg-[#f9f9fb]">
      <div className="mx-auto max-w-[680px] px-[6vw] pb-20 pt-10">
        <div className="mb-6 h-4 w-24 rounded bg-gray-200" />

        <div className="mb-8 flex flex-col items-center gap-3 text-center">
          <div className="h-7 w-56 rounded bg-gray-200" />
          <div className="h-4 w-72 rounded bg-gray-200" />
          <div className="h-6 w-40 rounded-full bg-gray-200" />
        </div>

        <div className="overflow-hidden rounded-[20px] border border-gray-100 bg-white">
          <div className="h-[180px] w-full bg-gray-200" />
          <div className="space-y-4 p-6">
            <div className="h-5 w-2/3 rounded bg-gray-200" />
            <div className="space-y-2 border-t border-gray-100 pt-4">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 w-24 rounded bg-gray-200" />
                  <div className="h-4 w-16 rounded bg-gray-200" />
                </div>
              ))}
            </div>
            <div className="h-12 w-full rounded-xl bg-gray-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
