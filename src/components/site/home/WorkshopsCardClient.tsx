"use client";

import { useRef } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Subheading } from "@/components/ui/Subheading";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock, Sparkles, GraduationCap } from "lucide-react";
import { toUploadUrl } from "@/lib/api/image-url";
import type { Webinar } from "@/types/admin/webinar";

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${((h % 12) || 12)}:${String(m).padStart(2, "0")} ${ampm}`;
}

function ProjectCard({ webinar, index }: { webinar: Webinar | null; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  const imgSrc = webinar ? toUploadUrl(webinar.image ?? "") : null;

  return (
    // Desktop height = viewport − 60px fixed navbar (SiteNavbar) − 9.25rem for
    // the prev/next arrows and breathing room, so cards and arrows fit in a
    // single viewport together.
    <div className="flex flex-col w-[320px] sm:w-[360px] flex-shrink-0 h-[480px] lg:h-[calc(100vh-60px-9.25rem)] lg:min-h-[440px] overflow-hidden rounded-2xl group cursor-pointer bg-white border border-violet-100 transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1.5 hover:border-violet-300 hover:shadow-[0_12px_24px_rgba(124,58,237,0.18)] motion-reduce:transition-none motion-reduce:hover:translate-y-0">

      {/* Image — 40% of card height */}
      <div className="relative h-[40%] w-full shrink-0 overflow-hidden">
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={webinar?.name ?? "Coming Soon"}
            fill
            sizes="(max-width: 640px) 320px, 360px"
            className="object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,rgba(139,92,246,0.85)_0%,rgba(59,130,246,0.60)_100%)]">
            <GraduationCap size={40} className="text-white/40" strokeWidth={1.5} />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Counter */}
        <span className="absolute top-3 left-3 text-[64px] font-black leading-none select-none pointer-events-none text-white/20">
          {num}
        </span>

        {/* Upcoming highlight */}
        {webinar?.status === "Upcoming" && (
          <span className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,#f59e0b_0%,#f97316_100%)] px-3 py-1.5 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_2px_10px_rgba(245,158,11,0.5)] animate-pulse">
            <Sparkles size={10} strokeWidth={2.5} />
            Upcoming
          </span>
        )}

        <span className="absolute bottom-3 left-3 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-violet-600 text-white">
          {webinar?.type ?? "Workshop"}
        </span>
      </div>

      {/* Content — remaining 60% */}
      <div className="flex flex-1 flex-col justify-between p-4">
        <div>
          <h3 className="font-bold text-[1.3rem] leading-snug line-clamp-2 mb-1 text-gray-900 min-h-[3.6rem] transition-colors duration-300 group-hover:text-violet-700">
            {webinar?.name ?? "New Session Coming Soon"}
          </h3>

          {webinar?.description && (
            <p className="text-sm text-gray-500 leading-relaxed line-clamp-5 mb-1">
              {webinar.description}
            </p>
          )}

          {webinar && (
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-gray-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {webinar.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatTime(webinar.time)}
              </span>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-xs font-medium">
            {webinar?.instructor ?? ""}
          </span>
          {webinar ? (
            <Link
              href={`/ai-workshops/${webinar.slug}`}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-600 group-hover:bg-blue-500 text-white transition-colors duration-300 shadow-md"
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight size={17} />
            </Link>
          ) : (
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-violet-100 text-violet-300 cursor-default">
              <ArrowUpRight size={17} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function WorkshopsCardClient({ webinars }: { webinars: Webinar[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 380 : -380, behavior: "smooth" });
  };

  const cards: (Webinar | null)[] = webinars.length > 0
    ? webinars
    : [null];

  return (
    <div className="bg-white py-16 overflow-hidden">

      {/* Section Header — matches Project layout */}
      <div className="max-w-6xl mx-auto px-6 mb-14 md:mb-20">
        <div className="flex justify-center">
          <div className="w-full text-center">
            <SectionBadge variant="dark">Workshops &amp; Webinars</SectionBadge>
            <p className="text-sm sm:text-base font-semibold uppercase tracking-wide text-violet-600">
              Free AI Workshops and Webinars in Pune
            </p>
            <Subheading
              centered
              className="py-4 max-w-xl"
              text="Hands-on sessions to"
              highlight="accelerate your skills."
            />
            <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full mt-4 mx-auto" />
            <p className="mt-4 text-gray-600">
              Not sure which program is right for you? Start with a free workshop. These are
              hands-on sessions led by the same faculty who teach our full programs, so you get a
              real sense of our teaching style, our labs and our pace before you commit to
              anything. Attend at our Akurdi campus or join live online.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/ai-workshops"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:opacity-90 active:scale-95"
              >
                Register for a Free Workshop
              </Link>
              {/* <Link
                href="/ai-workshops"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-violet-200 px-6 py-3 text-sm font-semibold text-violet-700 transition-colors duration-200 hover:border-violet-500 hover:bg-violet-50"
              >
                View Upcoming Dates
              </Link> */}
            </div>
          </div>
        </div>
      </div>

      {/* Cards row — vertical padding leaves room for the hover lift and shadow,
          which the horizontal scroller would otherwise clip */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth px-6 max-w-6xl mx-auto pt-2 pb-6"
        style={{ scrollbarWidth: "none" }}
      >
        {cards.map((w, i) => (
          <ProjectCard key={w?.id ?? i} webinar={w} index={i} />
        ))}
      </div>

      {/* Prev / Next buttons — bottom */}
      <div className="flex items-center justify-center gap-3 mt-4 lg:mt-0">
        <button
          onClick={() => scroll("left")}
          className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-gray-200 text-gray-500 hover:border-violet-500 hover:text-violet-600 transition-colors duration-200"
        >
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="flex items-center justify-center w-11 h-11 rounded-full border-2 border-gray-200 text-gray-500 hover:border-violet-500 hover:text-violet-600 transition-colors duration-200"
        >
          <ArrowRight size={18} />
        </button>
      </div>

      {/* View all — the row above is capped, the full lists live on their own pages */}
      <div className="mt-10 flex flex-wrap items-center justify-center gap-4 px-6">
        <Link
          href="/ai-workshops"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-8 py-3 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:opacity-90 active:scale-95"
        >
          View All Workshops
          <ArrowRight size={16} strokeWidth={2.5} />
        </Link>
        <Link
          href="/webinars"
          className="inline-flex items-center gap-2 rounded-full border-2 border-violet-200 px-8 py-3 text-sm font-semibold text-violet-700 transition-colors duration-200 hover:border-violet-500 hover:bg-violet-50"
        >
          View All Webinars
          <ArrowRight size={16} strokeWidth={2.5} />
        </Link>
      </div>

    </div>
  );
}
