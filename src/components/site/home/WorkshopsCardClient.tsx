"use client";

import { useRef } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Subheading } from "@/components/ui/Subheading";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock, Sparkles } from "lucide-react";
import { toUploadUrl } from "@/lib/api/image-url";
import type { Webinar } from "@/types/admin/webinar";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
];

function formatTime(time: string) {
  const [h, m] = time.split(":").map(Number);
  const ampm = h >= 12 ? "PM" : "AM";
  return `${((h % 12) || 12)}:${String(m).padStart(2, "0")} ${ampm}`;
}

function ProjectCard({ webinar, index }: { webinar: Webinar | null; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  const imgSrc = webinar
    ? (toUploadUrl(webinar.image ?? "") || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length])
    : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

  return (
    <div className="flex flex-col w-[320px] sm:w-[360px] flex-shrink-0 h-[480px] overflow-hidden rounded-2xl group cursor-pointer bg-white border border-violet-100">

      {/* Image — 40% of card height */}
      <div className="relative h-[40%] w-full shrink-0 overflow-hidden">
        <img
          src={imgSrc}
          alt={webinar?.name ?? "Coming Soon"}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
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
          <h3 className="font-semibold text-[1.3rem] leading-snug line-clamp-2 mb-1 text-gray-900 min-h-[3.6rem]">
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
              href={`/workshops/${webinar.slug}`}
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
      <div className="max-w-6xl mx-auto px-6 mb-10">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <SectionBadge variant="dark">Workshops &amp; Webinars</SectionBadge>
            <p className="text-sm sm:text-base font-semibold uppercase tracking-wide text-violet-600">
              Free AI Workshops and Webinars in Pune
            </p>
            <Subheading
              className="py-4 max-w-xl"
              text="Hands-on sessions to"
              highlight="accelerate your skills."
            />
            <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full mt-4" />
            <p className="mt-4 max-w-xl text-gray-600">
              Not sure which program is right for you? Start with a free workshop. These are
              hands-on sessions led by the same faculty who teach our full programs, so you get a
              real sense of our teaching style, our labs and our pace before you commit to
              anything. Attend at our Akurdi campus or join live online.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-4">
              <Link
                href="/workshops"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:opacity-90 active:scale-95"
              >
                Register for a Free Workshop
              </Link>
              <Link
                href="/workshops"
                className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-violet-200 px-6 py-3 text-sm font-semibold text-violet-700 transition-colors duration-200 hover:border-violet-500 hover:bg-violet-50"
              >
                View Upcoming Dates
              </Link>
            </div>
          </div>

          {/* Prev / Next buttons */}
          <div className="flex items-center gap-3">
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
        </div>
      </div>

      {/* Cards row */}
      <div
        ref={scrollRef}
        className="flex gap-5 overflow-x-auto scroll-smooth px-6 max-w-6xl mx-auto pb-2"
        style={{ scrollbarWidth: "none" }}
      >
        {cards.map((w, i) => (
          <ProjectCard key={w?.id ?? i} webinar={w} index={i} />
        ))}
      </div>

      {/* Prev / Next buttons — bottom */}
      <div className="flex items-center justify-center gap-3 mt-8">
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

    </div>
  );
}
