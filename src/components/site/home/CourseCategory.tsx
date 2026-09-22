"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BadgeCheck, Check } from "lucide-react";
import type { CourseCategory as CourseCategoryItem } from "@/types/admin/courseCategory";

const PALETTE = [
  {
    accent: "#8B5CF6",
    bg: "linear-gradient(135deg, rgba(139,92,246,0.12) 0%, rgba(248,246,255,0.97) 100%)",
  },
  {
    accent: "#3B82F6",
    bg: "linear-gradient(135deg, rgba(59,130,246,0.12) 0%, rgba(245,249,255,0.97) 100%)",
  },
  {
    accent: "#6366F1",
    bg: "linear-gradient(135deg, rgba(99,102,241,0.12) 0%, rgba(246,246,255,0.97) 100%)",
  },
  {
    accent: "#7C3AED",
    bg: "linear-gradient(135deg, rgba(124,58,237,0.12) 0%, rgba(249,246,255,0.97) 100%)",
  },
];

// interface Props {
//   iitCourses?: Course[];
// }
  
interface Props {
  categories?: CourseCategoryItem[];
}

export default function CourseCategory({ categories }: Props) {
  const items = categories ?? [];

  return (
    <section className="relative bg-white overflow-x-hidden isolate">

      {/* ── Category cards ── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-violet-50 to-white isolate py-9 md:py-12">
        <div className="flex w-full justify-center px-4 mb-8">
          <span className="max-w-full truncate whitespace-nowrap text-[10px] sm:text-sm md:text-base lg:text-[20px] font-black uppercase tracking-[1px] sm:tracking-[2px] lg:tracking-[3px] px-3 py-1 rounded-full border border-violet-200 bg-violet-100 text-violet-700">
            C3iHub IIT Kanpur Certification Program
          </span>
        </div>
        {/* Empty state */}
        {items.length === 0 && (
          <div
            className="flex items-center justify-center px-[18px] pb-[18px] md:px-9 md:pb-9"
          >
            <div
              className="relative overflow-hidden w-full max-w-[1280px] min-h-[50vh] lg:h-[78vh] rounded-3xl md:rounded-[36px] border border-white/80 shadow-[0_12px_50px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-col justify-center items-center gap-4 p-8 md:p-10 lg:p-14"
              style={{ background: PALETTE[0].bg }}
            >
              <div
                className="absolute w-[600px] h-[600px] rounded-full blur-[120px] top-[-25%] right-[-15%] pointer-events-none"
                style={{ background: `radial-gradient(circle, ${PALETTE[0].accent}25, transparent 65%)` }}
              />
              <h2 className="relative z-[1] text-[clamp(1.8rem,4vw,3.2rem)] font-bold text-gray-800 text-center">
                Categories Coming Soon
              </h2>
              <p className="relative z-[1] text-gray-500 text-center max-w-sm">
                We&apos;re setting up our course categories. Check back soon!
              </p>
            </div>
          </div>
        )}

        {/* Category cards */}
        {items.map((cat, i) => {
          const { accent, bg } = PALETTE[i % PALETTE.length];
          return (
            <div
              key={cat.id}
              className="flex items-center justify-center px-[18px] pb-[18px] md:px-9 md:pb-9"
            >
              <div
                className="relative overflow-hidden w-full max-w-[1280px] lg:h-[80vh] rounded-3xl md:rounded-[36px] border border-white/80 shadow-[0_12px_50px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-col lg:flex-row"
                style={{ background: bg }}
              >
                {/* Image — stacked block on mobile/tablet, absolute side panel from lg up */}
                {cat.image && (
                  <div className="relative w-full aspect-[16/9] shrink-0 lg:absolute lg:right-0 lg:top-0 lg:aspect-auto lg:h-full lg:w-[48%] lg:shrink pointer-events-none">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      sizes="(max-width: 1023px) 100vw, 48vw"
                      className="object-cover"
                    />
                    <div
                      className="absolute inset-0 hidden lg:block"
                      style={{ background: `linear-gradient(to right, ${bg} 0%, ${bg}cc 10%, ${bg}55 35%, transparent 65%)` }}
                    />
                  </div>
                )}

                {/* Ambient blob */}
                <div
                  className="absolute w-[500px] h-[500px] rounded-full blur-[120px] top-[-20%] left-[30%] pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${accent}18, transparent 65%)` }}
                />

                {/* Left: content */}
                <div className="relative z-[1] flex flex-1 lg:flex-none min-h-0 min-w-0 flex-col justify-between gap-2 overflow-hidden w-full lg:w-[52%] p-5 md:p-7 lg:p-8 lg:h-full">

                  {/* Name + tagline + description */}
                  <div className="flex flex-col gap-1.5 md:gap-2.5">
                    <h2 className="m-0 text-[clamp(1.6rem,5vw,3.5rem)] font-extrabold leading-tight tracking-tight text-gray-900 [font-family:var(--primaryFont,sans-serif)]">
                      {cat.name}
                    </h2>

                     <p className="text-base md:text-lg font-medium italic text-violet-500">
          Future-Proof Your Career with AI-Powered Cybersecurity
            </p>
                    {/* <p className="m-0 text-sm md:text-base font-medium italic leading-snug" style={{ color: accent }}>
                      Future-Proof Your Career with AI-Powered Cybersecurity
                    </p> */}
                    {cat.description && (
                      <p className="m-0 text-base md:text-lg leading-[1.5] md:leading-[1.6] text-gray-500 line-clamp-3 md:line-clamp-4 lg:line-clamp-5">
                        {cat.description}
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col gap-2 md:gap-3">
                    <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }} />
                    <Link
                      href={`/course-categories/${cat.slug}`}
                      className="inline-flex w-fit items-center gap-2 px-8 py-2.5 rounded-full text-base font-bold tracking-wide text-white transition-all hover:scale-105 hover:shadow-lg"
                      style={{ background: accent, boxShadow: `0 4px 20px ${accent}40` }}
                    >
                      Explore Courses
                      <ArrowUpRight className="w-4 h-4" />
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
        {/* Final Certificate Card */}
        <div
          className="flex items-center justify-center px-[18px] pb-[18px] md:px-9 md:pb-9"
        >
          <div
            className="relative overflow-hidden w-full max-w-[1280px] lg:h-[80vh] rounded-3xl md:rounded-[36px] border border-white/80 shadow-[0_12px_50px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-col lg:flex-row"
            style={{ background: "#F5F3FF" }}
          >
            {/* Image — stacked block on mobile/tablet, absolute side panel from lg up */}
            <div className="relative w-full aspect-[16/9] shrink-0 lg:absolute lg:right-0 lg:top-0 lg:aspect-auto lg:h-full lg:w-[48%] lg:p-2 lg:shrink pointer-events-none">
              <Image
                src="/images/Certifcate.jpeg"
                alt="Certificate of Completion"
                fill
                className="object-cover  "
              />
              {/* Only a thin edge vignette — the certificate itself has text
                  that needs to stay legible, unlike the ambient category photos. */}

              {/* Floating verified badge — kept near the top so it doesn't sit over
                  the certificate's own signature/footer text or the page's fixed
                  chat widgets in the bottom-right corner of the viewport. */}
              <div className="absolute top-3 right-3 md:top-6 md:right-6 z-[2] flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-3 py-1.5 md:px-4 md:py-2 shadow-[0_8px_24px_rgba(139,92,246,0.25)] backdrop-blur-sm">
                <BadgeCheck className="h-4 w-4 text-violet-600" />
                <span className="text-xs font-bold text-gray-800">Verified &amp; Shareable</span>
              </div>
            </div>



            {/* Left Content */}
            <div className="relative z-[1] flex flex-1 lg:flex-none min-h-0 min-w-0 flex-col justify-between gap-1.5 overflow-hidden w-full lg:w-[52%] p-5 md:p-7 lg:p-8 lg:h-full">

              {/* Top: counter + badge */}
              <div className="flex items-center gap-3">

                <span className="text-xs font-black uppercase tracking-[3px] px-3 py-1 rounded-full border border-violet-200 bg-violet-100 text-violet-700">
                  Joint Certification
                </span>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-1.5 md:gap-3">
                <h2 className="m-0 text-[clamp(1.6rem,4.5vw,3.5rem)] font-extrabold leading-tight tracking-tight text-gray-900 [font-family:'Playfair_Display',Georgia,serif]">
                  Certificate of <span className="text-violet-600">Completion</span>
                </h2>
                <p className="m-0 text-base md:text-lg leading-[1.5] md:leading-[1.6] text-gray-500">
                  Earn a Joint Certification from MindLyft AI and C3iHub IIT Kanpur upon successful completion of the program.
                </p>
                <ul className="m-0 flex flex-col gap-1.5">
                  {[
                    "Every skill earned, every hour counted",
                    "Sealed with authority, built on real learning",
                   ].map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-base text-gray-600">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100">
                        <Check className="h-3 w-3 text-violet-600" strokeWidth={3} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-2 md:gap-3">
                <div className="h-px w-full bg-gradient-to-r from-violet-400/40 to-transparent" />
                <Link
                  href="/courses"
                  className="inline-flex w-fit items-center gap-2 px-8 py-2.5 rounded-full text-base font-bold tracking-wide text-white transition-all hover:scale-105 hover:shadow-lg"
                  style={{ background: "#8B5CF6", boxShadow: "0 4px 20px #8B5CF640" }}
                >
                  Get Certified
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>

            </div>
          </div>
        </div>
        
      </div>
    </section>
  );
}
