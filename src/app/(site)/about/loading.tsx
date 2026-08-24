function Band({ bg, children }: { bg: string; children: React.ReactNode }) {
  return <div className={`${bg} px-6 py-16 md:px-14`}>{children}</div>;
}

function Heading() {
  return (
    <div className="mx-auto mb-10 flex max-w-xl flex-col items-center gap-3 text-center">
      <div className="h-6 w-40 rounded-full bg-gray-200" />
      <div className="h-8 w-64 rounded bg-gray-200" />
    </div>
  );
}

export default function Loading() {
  return (
    <main className="animate-pulse">
      {/* Hero */}
      <div className="flex flex-col items-center gap-6 px-6 py-20 md:flex-row md:px-14">
        <div className="h-64 w-full rounded-3xl bg-gray-200 md:w-1/2" />
        <div className="w-full space-y-3 md:w-1/2">
          <div className="h-4 w-full rounded bg-gray-200" />
          <div className="h-4 w-11/12 rounded bg-gray-200" />
          <div className="h-4 w-4/5 rounded bg-gray-200" />
        </div>
      </div>

      {/* A few alternating content bands */}
      {["bg-white", "bg-blue-50", "bg-violet-50", "bg-white"].map((bg, i) => (
        <Band key={i} bg={bg}>
          <Heading />
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="h-40 rounded-2xl bg-gray-200" />
            ))}
          </div>
        </Band>
      ))}

      {/* Leaders grid */}
      <Band bg="bg-white">
        <Heading />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-[350px] rounded-3xl bg-gray-200" />
          ))}
        </div>
      </Band>
    </main>
  );
}
