import { Skeleton } from "@/components/ui/skeleton";

function SectionHeading() {
  return (
    <div className="flex flex-col items-center gap-4 text-center mb-3">
      <Skeleton className="h-6 w-40 rounded-full" />
      <Skeleton className="h-9 w-72 sm:w-96" />
      <Skeleton className="h-1 w-16 rounded-full" />
    </div>
  );
}

// Matches CoursesCardClient's 3-column grid of tall course cards.
export function CoursesSkeleton() {
  return (
    <div className="px-6 py-20 md:px-[60px]">
      <SectionHeading />
      <div className="mx-auto grid max-w-[1440px] grid-cols-1 gap-8 min-[681px]:grid-cols-2 min-[1101px]:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex min-h-[440px] flex-col overflow-hidden rounded-[24px] border border-violet-100 bg-white shadow-sm">
            <Skeleton className="h-48 w-full rounded-none" />
            <div className="flex flex-1 flex-col gap-3 p-5">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <div className="mt-auto flex gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <Skeleton className="h-10 w-full rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Matches WorkshopsCardClient's horizontal card carousel.
export function WorkshopsSkeleton() {
  return (
    <div className="px-6 py-20 md:px-[60px]">
      <SectionHeading />
      <div className="mx-auto flex max-w-6xl gap-5 overflow-hidden px-6">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-[480px] w-[320px] shrink-0 overflow-hidden rounded-2xl border border-violet-100 bg-white sm:w-[360px]">
            <Skeleton className="h-56 w-full rounded-none" />
            <div className="flex flex-col gap-3 p-5">
              <Skeleton className="h-6 w-24 rounded-full" />
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <Skeleton className="mt-4 h-10 w-10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Tools carousel is a circular orbital layout — approximated with a centered
// hub since replicating the exact orbit geometry isn't worth it for a loader.
export function ToolsSkeleton() {
  return (
    <div className="flex flex-col items-center gap-8 px-6 py-20">
      <SectionHeading />
      <Skeleton className="h-[280px] w-[280px] rounded-full sm:h-[360px] sm:w-[360px]" />
      <div className="flex gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-2 w-2 rounded-full" />
        ))}
      </div>
    </div>
  );
}

// Matches Testimonials' row of avatar + quote cards.
export function TestimonialsSkeleton() {
  return (
    <div className="px-6 py-20 md:px-[60px]">
      <SectionHeading />
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex flex-col gap-4 rounded-2xl border border-violet-100 bg-white p-6">
            <div className="flex items-center gap-3">
              <Skeleton className="h-11 w-11 shrink-0 rounded-full" />
              <div className="flex flex-1 flex-col gap-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

// Matches OurClients' row of partner logo tiles.
export function OurClientsSkeleton() {
  return (
    <div className="px-6 py-14 md:px-14 lg:px-24">
      <SectionHeading />
      <div className="flex flex-wrap justify-center gap-8 rounded-2xl bg-violet-50 py-14">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32 w-32 rounded-xl bg-white" />
        ))}
      </div>
    </div>
  );
}

// Matches IITExpertiseSection's centered intro copy + logo row.
export function IITExpertiseSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-20 sm:px-10 lg:px-20">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-5 text-center">
        <Skeleton className="h-7 w-64 rounded-full" />
        <Skeleton className="h-10 w-full max-w-xl" />
        <Skeleton className="h-10 w-2/3 max-w-md" />
        <Skeleton className="h-4 w-full max-w-lg" />
        <Skeleton className="h-4 w-3/4 max-w-md" />
        <div className="mt-4 flex flex-wrap justify-center gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-12 w-28 rounded-lg" />
          ))}
        </div>
      </div>
    </div>
  );
}
