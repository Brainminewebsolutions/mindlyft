import Link from "next/link";
import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import type { Webinar } from "@/types/admin/webinar";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

type Envelope = { isSuccess: boolean; data: Webinar[] };

async function getUpcomingWebinars(): Promise<Webinar[]> {
  try {
    const envelope = await dotnetFetch<Envelope>(
      "/v1/workshopWebinar?status=Active&type=Webinar",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    const items = envelope.isSuccess ? (envelope.data ?? []) : [];

    const todayStr = new Date().toISOString().slice(0, 10);
    return items
      .filter((w) => w.date >= todayStr)
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, 4);
  } catch {
    return [];
  }
}

export default async function Upcoming({ bg = "bg-violet-50" }: { bg?: string }) {
  const webinars = await getUpcomingWebinars();

  return (
    <section id="upcoming" className={`${bg} px-6 py-24 md:px-[60px]`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        <div>
          <AnimateIn delay={0} direction="left"><LineBadge className="mb-5">What&apos;s Next</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="left">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Upcoming{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                Sessions
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="left">
            <p className="text-base text-gray-500 leading-relaxed max-w-sm">
              Save your spot before they fill up — our sessions sell out fast.
            </p>
          </AnimateIn>
        </div>

        <div className="flex flex-col gap-4">
          {webinars.length === 0 ? (
            <AnimateIn delay={200} direction="right">
              <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-10 text-center">
                <p className="text-sm font-semibold text-gray-700">No upcoming sessions right now</p>
                <p className="mt-1 text-xs text-gray-500">Check back soon — new webinars are added regularly.</p>
              </div>
            </AnimateIn>
          ) : (
            webinars.map((item, i) => {
              const d = new Date(item.date);
              const day = String(d.getUTCDate()).padStart(2, "0");
              const month = MONTHS[d.getUTCMonth()];

              return (
                <AnimateIn key={item.id} delay={200 + i * 80} direction="right">
                  <Link
                    href={`/workshops/${item.slug}`}
                    className="group flex flex-wrap items-center gap-5 rounded-2xl border border-gray-100 bg-white px-6 py-5 hover:translate-x-1.5 hover:shadow-md hover:border-violet-200 transition-all duration-300"
                  >
                    <div className="min-w-[60px] rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 px-2.5 py-3 text-center text-white shrink-0">
                      <div className="text-2xl font-extrabold leading-none">{day}</div>
                      <div className="text-[0.72rem] font-semibold uppercase tracking-wider opacity-85">{month}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="mb-1 text-sm font-bold text-gray-900 group-hover:text-violet-600 transition-colors">{item.name}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{item.description}</p>
                    </div>
                    <span className="whitespace-nowrap rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 px-4 py-1.5 text-xs font-bold text-white group-hover:opacity-90 transition shrink-0">
                      Register →
                    </span>
                  </Link>
                </AnimateIn>
              );
            })
          )}
        </div>

      </div>
    </section>
  );
}
