"use client";

import { SectionBadge } from "@/components/ui/SectionBadge";
import { Subheading } from "@/components/ui/Subheading";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight, Globe, User, CheckCircle, Sparkles, MessageCircle, MapPin } from "lucide-react";
import type { Course } from "@/types/admin/course";
import { SITE_CONFIG } from "@/constants/siteConfig";

export default function CoursesCardClient({ courses }: { courses: Course[] }) {
  return (
    <section className="relative overflow-x-hidden bg-white isolate">
      {/* Section Header */}
    <div className="space-y-6 px-6 pt-10 pb-20 text-center">
        <SectionBadge variant="dark">Our AI Courses in Pune</SectionBadge>
        <Subheading
          centered
          text="Expert-led courses designed to take you"
          highlight="from fundamentals to mastery."
        />
        <p className="mx-auto max-w-2xl text-gray-600">
          {courses.length} programs spanning foundations to advanced specialisations, available in offline, online and hybrid formats.
        </p>
        <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-md transition-transform duration-200 hover:opacity-90 active:scale-95"
          >
            Book Free Counselling
          </Link>
          <a
            href={SITE_CONFIG.social.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-violet-200 px-6 py-3 text-sm font-semibold text-violet-700 transition-colors duration-200 hover:border-violet-500 hover:bg-violet-50"
          >
            <MessageCircle size={16} />
            WhatsApp Us
          </a>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(SITE_CONFIG.address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-violet-200 px-6 py-3 text-sm font-semibold text-violet-700 transition-colors duration-200 hover:border-violet-500 hover:bg-violet-50"
          >
            <MapPin size={16} />
            Visit Us in Akurdi, Pune
          </a>
        </div>
      </div>

      {courses.length === 0 ? (
        <div className="flex justify-center px-20 py-15">
          <div className="w-full max-w-sm">
            <ComingSoonCard cardClass="" textClass="" />
          </div>
        </div>
      ) : (
        <div className="relative w-full px-[3vw] py-8 max-[680px]:px-5">
          {/* Noise texture */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.018] [background-size:180px_180px]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 mx-auto w-full max-w-[1440px]">
            <div className="grid grid-cols-1 gap-8 min-[681px]:grid-cols-2 min-[1101px]:grid-cols-3">
              {courses.map((course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  cardClass=""
                  textClass=""
                  accentRgb="124,58,237"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

// ─── CourseCard ───────────────────────────────────────────────────────────────

type CourseCardProps = {
  course: Course;
  cardClass: string;
  textClass: string;
  accentRgb: string;
};

function CourseCard({ course, cardClass, textClass, accentRgb }: CourseCardProps) {
  const href = course.courseType === "IIT" ? `/courses/iit/${course.slug}` : `/courses/mindlyftai/${course.slug}`;

  return (
    <Link
      href={href}
      className={`${cardClass} relative flex h-[500px] cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[color:rgba(var(--a),0.15)] bg-white shadow-[0_8px_32px_rgba(var(--a),0.10),0_2px_8px_rgba(0,0,0,0.06)]`}
      style={{ "--a": accentRgb } as React.CSSProperties}
    >
      {/* Image / gradient — 40% of card height */}
      <div className="relative h-[40%] w-full shrink-0 overflow-hidden">
        {course.image ? (
          <Image
            src={course.image}
            alt={course.name}
            fill
            sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 33vw"
            className="object-cover"
          />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(135deg,rgba(var(--a),0.85)_0%,rgba(var(--a),0.45)_100%)]" />
        )}

        {/* Top-right: course type badge */}
        {course.courseType === "IIT" && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-violet-700 shadow-sm">
            IIT
          </span>
        )}

        {/* Top-left: Upcoming highlight */}
        {course.status === "UPCOMING" && (
          <span className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-[linear-gradient(135deg,#f59e0b_0%,#f97316_100%)] px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-[0_2px_10px_rgba(245,158,11,0.5)] animate-pulse">
            <Sparkles size={10} strokeWidth={2.5} />
            Upcoming
          </span>
        )}

        {/* Bottom: mode + category badges */}
        <div className={`${textClass} absolute bottom-3 left-3 right-3 flex flex-wrap items-center gap-1.5`}>
          <span className="rounded-full bg-[color:rgba(var(--a),0.85)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-[8px]">
            {course.mode}
          </span>
          {course.category && (
            <span className="rounded-full bg-black/40 px-2.5 py-1 text-[10px] font-semibold text-white/90 backdrop-blur-[8px]">
              {course.category}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-2 p-3">
        {/* Name + stats + highlights — top-aligned so titles line up across
            cards regardless of how much description/highlight content a
            course has; leftover space collects above the button. */}
        <div className="flex flex-1 flex-col gap-1">
          <h3 className={`${textClass} text-[clamp(1rem,1.4vw,1.2rem)] font-bold leading-snug text-[#0f0a1e] [font-family:var(--secondaryFont)]`}>
            {course.name}
          </h3>

          {course.description && (
            <p className={`${textClass} max-h-[100px] overflow-hidden text-[13px] leading-relaxed text-gray-500`}>
              {course.description}
            </p>
          )}

          {/* Stats row */}
          <div className={`${textClass} flex flex-wrap gap-x-3 gap-y-1 text-[12px] text-gray-400`}>
            <span className="flex items-center gap-1">
              <Clock size={12} className="shrink-0" style={{ color: `rgba(${accentRgb},0.8)` }} />
              {course.duration}h
            </span>
            <span className="flex items-center gap-1">
              <Globe size={12} className="shrink-0" style={{ color: `rgba(${accentRgb},0.8)` }} />
              {course.language}
            </span>
            <span className="flex items-center gap-1 max-w-[130px] truncate">
              <User size={12} className="shrink-0" style={{ color: `rgba(${accentRgb},0.8)` }} />
              {course.instructor}
            </span>
          </div>
 
          {/* Highlights */}
          {course.highlights && course.highlights.length > 0 && (
            <ul className={`${textClass} flex flex-nowrap items-center gap-x-3 overflow-hidden`}>
              {course.highlights.slice(0, 2).map((h, idx) => (
                <li key={idx} className="flex items-center gap-1.5 text-[12px] text-gray-500 truncate">
                  <CheckCircle size={12} className="shrink-0 text-violet-500" />
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Button */}
        <div
          className={`${textClass} inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,rgba(var(--a),1)_0%,rgba(var(--a),0.75)_100%)] py-2 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95`}
        >
          View Course
          <ArrowRight size={14} strokeWidth={2.5} />
        </div>
      </div>
    </Link>
  );
}

// ─── ComingSoonCard ───────────────────────────────────────────────────────────

function ComingSoonCard({ cardClass, textClass }: { cardClass: string; textClass: string }) {
  return (
    <div
      className={`${cardClass} relative flex cursor-default flex-col overflow-hidden rounded-[24px] border border-[rgba(139,92,246,0.15)] bg-white shadow-[0_8px_32px_rgba(139,92,246,0.10),0_2px_8px_rgba(0,0,0,0.06)]`}
    >
      {/* Image area */}
      <div className="relative flex h-[200px] w-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(139,92,246,0.85)_0%,rgba(59,130,246,0.60)_100%)]">
        <span
          className={`${textClass} rounded-full bg-white/[0.18] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-[8px]`}
        >
          Coming Soon
        </span>
        {/* Mode-style badge */}
        <span
          className={`${textClass} absolute bottom-3 left-3 rounded-full bg-[rgba(139,92,246,0.80)] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-[8px]`}
        >
          New Course
        </span>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3
          className={`${textClass} text-[clamp(1rem,1.4vw,1.25rem)] font-bold leading-snug text-[#0f0a1e] [font-family:var(--secondaryFont)]`}
        >
          More Courses Coming Soon
        </h3>

        <div
          className={`${textClass} flex items-center gap-1.5 text-[13px] text-[rgba(15,10,30,0.50)] [font-family:var(--primaryFont)]`}
        >
          <Clock size={14} />
          Duration TBA
        </div>

        <div className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,rgba(139,92,246,0.45)_0%,rgba(59,130,246,0.35)_100%)] py-2.5 text-sm font-semibold text-white/70 [font-family:var(--primaryFont)]">
          Coming Soon
          <ArrowRight size={14} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
}
