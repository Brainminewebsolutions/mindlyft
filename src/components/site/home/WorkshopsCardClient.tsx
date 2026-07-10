"use client";

import { useRef } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Subheading } from "@/components/ui/Subheading";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Calendar, Clock } from "lucide-react";
import { toUploadUrl } from "@/lib/api/image-url";
import type { Webinar } from "@/types/admin/webinar";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
  "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=800&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80",
  "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80",
];

function ProjectCard({ webinar, index }: { webinar: Webinar | null; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  const imgSrc = webinar
    ? (toUploadUrl(webinar.image ?? "") || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length])
    : FALLBACK_IMAGES[index % FALLBACK_IMAGES.length];

  return (
    <div className="relative w-[320px] sm:w-[360px] flex-shrink-0 h-[480px] overflow-hidden rounded-2xl group cursor-pointer bg-violet-50/60 border border-violet-100">

      {/* Image — slides in over the full card on hover */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-in-out">
        <img
          src={imgSrc}
          alt={webinar?.name ?? "Coming Soon"}
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/10" />
      </div>

      {/* Counter */}
      <span className="absolute top-5 left-5 text-[128px] font-black leading-none select-none pointer-events-none text-violet-200 group-hover:text-white/10 transition-colors duration-500">
        {num}
      </span>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <span className="inline-block mb-3 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest bg-violet-600 text-white transition-colors duration-300">
          {webinar?.type ?? "Workshop"}
        </span>

        <h3 className="font-semibold text-[1.3rem] leading-snug line-clamp-2 mb-3 text-gray-900 group-hover:text-white transition-colors duration-300 min-h-[3.6rem]">
          {webinar?.name ?? "New Session Coming Soon"}
        </h3>

        {webinar && (
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] mb-4 text-gray-400 group-hover:text-violet-200/70 transition-colors duration-300">
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {webinar.date}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {webinar.time}
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-gray-400 group-hover:text-violet-200/70 text-xs font-medium transition-colors duration-300">
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
            <Subheading
              className="py-4 max-w-xl"
              text="Hands-on sessions to"
              highlight="accelerate your skills."
            />
            <div className="w-16 h-1 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full mt-4" />
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
