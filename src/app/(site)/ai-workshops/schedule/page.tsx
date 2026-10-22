import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, MapPin, User, Wifi } from "lucide-react";
import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import { toUploadUrl } from "@/lib/api/image-url";
import { formatEventTime } from "@/components/live/liveUtils";

export const metadata: Metadata = {
  title: { absolute: "Workshop & Webinar Schedule | MindLyft AI" },
  description:
    "Upcoming AI workshops and live webinars at MindLyft AI. See dates and times, then register to join live online or in person.",
  alternates: { canonical: "/ai-workshops/schedule" },
};

type ScheduleItem = {
  id:               number;
  name:             string;
  slug:             string;
  image:            string | null;
  type:             "Workshop" | "Webinar";
  mode:             string;
  instructor:       string;
  language:         string;
  duration:         number;
  subscriptionType: string;
  finalPrice:       number;
  category:         string | null;
  date:             string; // YYYY-MM-DD (IST)
  time:             string; // HH:mm (IST)
  startsAt:         string;
};

type Envelope = { isSuccess: boolean; data: ScheduleItem[] };

async function getSchedule(): Promise<ScheduleItem[]> {
  try {
    const envelope = await dotnetFetch<Envelope>(
      "/v1/workshopWebinar/schedule",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data ?? []) : [];
  } catch {
    return [];
  }
}

function groupByMonth(items: ScheduleItem[]) {
  const groups = new Map<string, ScheduleItem[]>();
  for (const item of items) {
    const key = item.date.slice(0, 7); // YYYY-MM
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }
  return [...groups.entries()].map(([key, list]) => ({
    label: new Date(`${key}-01T00:00:00`).toLocaleDateString("en-IN", { month: "long", year: "numeric" }),
    items: list,
  }));
}

export default async function SchedulePage() {
  const items  = await getSchedule();
  const months = groupByMonth(items);

  return (
    <div className="min-h-screen bg-white">
      <section className="bg-gradient-to-br from-violet-50 via-white to-blue-50 px-6 pb-14 pt-16 md:px-[60px]">
        <div className="mx-auto max-w-5xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-200 bg-white px-3 py-1 text-xs font-semibold text-violet-700">
            <CalendarDays className="size-3.5" /> Schedule
          </span>
          <h1 className="mt-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Upcoming workshops &amp; live webinars
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-gray-600">
            Register for a session and it appears in your dashboard. Online sessions stream live inside MindLyft AI
            with a chat for questions, and the recording stays available to you afterwards.
          </p>
        </div>
      </section>

      <section className="px-6 py-14 md:px-[60px]">
        <div className="mx-auto max-w-5xl space-y-12">
          {months.length === 0 ? (
            <div className="rounded-2xl border border-violet-100 bg-violet-50/50 px-6 py-16 text-center">
              <CalendarDays className="mx-auto mb-3 size-10 text-violet-300" />
              <p className="text-base font-semibold text-gray-900">No sessions scheduled right now</p>
              <p className="mt-1 text-sm text-gray-600">New dates are announced regularly. Check back soon.</p>
              <Link href="/ai-workshops#notify"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-700">
                Notify me <ArrowRight className="size-4" />
              </Link>
            </div>
          ) : (
            months.map((month) => (
              <div key={month.label}>
                <h2 className="mb-4 text-lg font-bold text-gray-900">{month.label}</h2>
                <ul className="space-y-3">
                  {month.items.map((item) => <ScheduleRow key={item.id} item={item} />)}
                </ul>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

function ScheduleRow({ item }: { item: ScheduleItem }) {
  const day      = new Date(`${item.date}T00:00:00`);
  const imageUrl = toUploadUrl(item.image);
  const isOnline = item.mode !== "Offline";
  const isFree   = item.subscriptionType === "Free" || item.finalPrice === 0;

  return (
    <li>
      <Link href={`/ai-workshops/${item.slug}`}
        className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm transition hover:border-violet-200 hover:shadow-md sm:flex-row sm:items-center">
        <div className="flex items-center gap-4 sm:w-auto">
          {/* Date chip */}
          <div className="flex w-16 shrink-0 flex-col items-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 py-2 text-white">
            <span className="text-[10px] font-semibold uppercase tracking-wide">
              {day.toLocaleDateString("en-IN", { weekday: "short" })}
            </span>
            <span className="text-2xl font-bold leading-none">{day.getDate()}</span>
            <span className="text-[10px] font-medium">{day.toLocaleDateString("en-IN", { month: "short" })}</span>
          </div>
          {imageUrl && (
            <div className="relative hidden h-16 w-24 shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:block">
              <Image src={imageUrl} alt={item.name} fill className="object-cover" />
            </div>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="rounded-full bg-violet-50 px-2 py-0.5 text-[10px] font-semibold text-violet-700">{item.type}</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
              {isOnline ? <Wifi className="size-2.5" /> : <MapPin className="size-2.5" />}
              {isOnline ? "Live online" : "In person"}
            </span>
            {item.category && <span className="text-[10px] text-gray-500">{item.category}</span>}
          </div>
          <h3 className="mt-1.5 line-clamp-2 text-base font-semibold text-gray-900 group-hover:text-violet-700">
            {item.name}
          </h3>
          <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
            <span className="flex items-center gap-1"><Clock className="size-3" />{formatEventTime(item.time)} IST · {item.duration}h</span>
            <span className="flex items-center gap-1"><User className="size-3" />{item.instructor}</span>
            <span>{item.language}</span>
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
          <span className="text-sm font-bold text-violet-600">
            {isFree ? "Free" : `₹${item.finalPrice.toLocaleString("en-IN")}`}
          </span>
          <span className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 group-hover:text-blue-700">
            Register <ArrowRight className="size-3.5" />
          </span>
        </div>
      </Link>
    </li>
  );
}
