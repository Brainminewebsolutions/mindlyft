"use client";

import React, { useEffect, useRef } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Subheading } from "@/components/ui/Subheading";
import Link from "next/link";
import Image from "next/image";
import { Clock, Globe, Monitor, User, ArrowUpRight, Tag } from "lucide-react";
import { getGsap, getScrollTrigger, onGsapReady } from "@/lib/gsap-config";
import type { Course } from "@/types/admin/course";
import CollaborationLogos from "@/components/site/CollaborationLogos";

// NOTE: no `import gsap from "gsap"` — we use window.gsap so we share the same
// GSAP instance that main.js integrated with Lenis.  The npm bundle creates a
// second, independent instance whose ScrollTrigger reads window.scrollY
// directly; Lenis keeps that value at 0, so scrub animations never fire.

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

interface Props {
  iitCourses?: Course[];
}

export default function ServiceStack({ iitCourses }: Props) {
  const courses = iitCourses ?? [];
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const cancel = onGsapReady(() => {
      const gsap = getGsap();
      const ScrollTrigger = getScrollTrigger();
      if (!gsap || !ScrollTrigger) return;

      const ctx = gsap.context(() => {
        const cards = Array.from(
          wrapper.querySelectorAll<HTMLElement>(".ss-card")
        );
        if (cards.length === 0) return;

      gsap.set(cards, {
  opacity: 0,
  y: 80,
  scale: 0.96,
  pointerEvents: "none",
});

gsap.set(cards[0], {
  opacity: 1,
  y: 0,
  scale: 1,
  pointerEvents: "auto",
});

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: "top top",
            end: `+=${cards.length * 100}%`,
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        // First card animates in at position 0
        tl.to(cards[0], { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "power2.inOut" }, 0);

        cards.forEach((card, i) => {
          if (i === 0) return;
          const t = i;
        tl.to(cards[i - 1], {
  opacity: 0,
  y: -50,
  scale: 0.92,
  pointerEvents: "none",
  duration: 0.8,
}, t);
       tl.to(card, {
  opacity: 1,
  y: 0,
  scale: 1,
  pointerEvents: "auto",
  duration: 0.8,
}, t);
        });

        requestAnimationFrame(() => ScrollTrigger.refresh());
      }, wrapper);

      (wrapper as any)._gsapCtx = ctx;
    });

    return () => {
      cancel();
      const ctx = (wrapper as any)._gsapCtx;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section className="relative bg-white overflow-x-hidden">
      {/* ── IIT Collaboration Intro ── */}
    <div className="h-screen bg-white flex items-center justify-center px-6 sm:px-10 lg:px-20 overflow-hidden">
      <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-5 text-center">

        {/* Badge */}
        <SectionBadge variant="dark">Powered by Research. Backed by Innovation.</SectionBadge>

        {/* Heading */}
        <Subheading
          centered
          className="leading-tight tracking-tight"
          text="Strategic collaboration with"
          highlight="C3iHub, IIT Kanpur"
          highlightClassName="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text !text-transparent"
        />

        {/* Subtitle */}
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
          Industry-leading courses developed in collaboration with IIT experts — designed to take you from fundamentals to mastery.
        </p>

        {/* Collaboration logos */}
        <CollaborationLogos size="lg" showLabels className="justify-center" />
        <div>
           
          <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
            Elevate your credentials with industry-recognised programs engineered at the forefront of technology.
          </p>
        </div>
      </div>
    </div>


      {/* ── Stacking course cards ── */}
      <div
        ref={wrapperRef}
        className="relative h-screen overflow-hidden bg-gradient-to-b from-violet-50 to-white"
      >
        {courses.length === 0 && (
          <div
            className="ss-card absolute top-0 left-0 w-full h-full flex items-center justify-center pt-[98px] px-[18px] pb-[18px] md:pt-[116px] md:px-9 md:pb-9 [will-change:transform,opacity]"
            style={{ zIndex: 1 }}
          >
            <div
              className="relative overflow-hidden w-full max-w-[1280px] h-[60vh] md:h-[70vh] lg:h-[78vh] rounded-3xl md:rounded-[36px] border border-white/80 shadow-[0_12px_50px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-col justify-between p-8 md:p-10 lg:p-14"
              style={{ background: PALETTE[0].bg }}
            >
              {/* Ambient blob */}
              <div
                className="absolute w-[600px] h-[600px] rounded-full blur-[120px] top-[-25%] right-[-15%] pointer-events-none"
                style={{ background: `radial-gradient(circle, ${PALETTE[0].accent}25, transparent 65%)` }}
              />

              {/* Top row */}
              <div className="relative z-[1] flex items-center justify-between">
                <span className="text-[11px] tracking-[6px] font-extrabold uppercase" style={{ color: PALETTE[0].accent }}>
                  01
                </span>
                <span
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[2px] uppercase border"
                  style={{ borderColor: `${PALETTE[0].accent}44`, color: PALETTE[0].accent, background: `${PALETTE[0].accent}0d` }}
                >
                  <Monitor className="w-3 h-3" />
                  Coming Soon
                </span>
              </div>

              {/* Middle */}
              <div className="relative z-[1] flex items-center gap-8 lg:gap-12">
                <div className="flex flex-col gap-4 flex-1 min-w-0">
                  <span
                    className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full border text-[11px] font-bold tracking-[2px] uppercase"
                    style={{ borderColor: `${PALETTE[0].accent}44`, color: PALETTE[0].accent }}
                  >
                    <Tag className="w-3 h-3" />
                    IIT Collaboration
                  </span>
                  <h2 className="m-0 text-[clamp(1.8rem,4vw,3.2rem)] leading-[1.05] font-secondary text-[var(--titleColor,#111827)] tracking-[-2px]">
                    New IIT Course Coming Soon
                  </h2>
                  <p className="m-0 text-sm md:text-base leading-[1.8] text-[var(--paraColor,#6b7280)]">
                    Our experts are crafting a new industry-leading course in collaboration with IIT faculty. Stay tuned for the launch.
                  </p>
                </div>
              </div>

              {/* Bottom */}
              <div className="relative z-[1] flex flex-col gap-5">
                <div className="flex flex-wrap gap-2 md:gap-3">
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/60 border border-white/80 text-xs font-semibold text-gray-700">
                    <Clock className="w-3.5 h-3.5" style={{ color: PALETTE[0].accent }} />
                    Duration TBA
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/60 border border-white/80 text-xs font-semibold text-gray-700">
                    <Globe className="w-3.5 h-3.5" style={{ color: PALETTE[0].accent }} />
                    Language TBA
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/60 border border-white/80 text-xs font-semibold text-gray-700">
                    <User className="w-3.5 h-3.5" style={{ color: PALETTE[0].accent }} />
                    Instructor TBA
                  </span>
                </div>

                <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${PALETTE[0].accent}40, transparent)` }} />

                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <span className="text-2xl md:text-3xl font-bold text-[var(--titleColor,#111827)] opacity-40">
                    Price TBA
                  </span>
                  <div
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold tracking-wide text-white opacity-50 cursor-default"
                    style={{ background: PALETTE[0].accent }}
                  >
                    Coming Soon
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}



        {courses.map((course, i) => {
          const { accent, bg } = PALETTE[i % PALETTE.length];
          const discounted =
            course.discount && course.discount > 0
              ? Math.round(course.price * (1 - course.discount / 100))
              : null;

          return (
            <div
              key={course.id}
              className="ss-card absolute top-0 left-0 w-full h-full flex items-center justify-center pt-[98px] px-[18px] pb-[18px] md:pt-[116px] md:px-9 md:pb-9 [will-change:transform,opacity]"
              style={{ zIndex: i + 1 }}
            >
              <div
                className="relative overflow-hidden w-full max-w-[1280px] h-[60vh] md:h-[70vh] lg:h-[78vh] rounded-3xl md:rounded-[36px] border border-white/80 shadow-[0_12px_50px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-row"
                style={{ background: bg }}
              >
                {/* ── Right: full-height background image ── */}
                {course.image && (
                  <div className="absolute right-0 top-0 w-[48%] h-full hidden md:block pointer-events-none">
                    <Image
                      src={course.image}
                      alt={course.name}
                      fill
                      sizes="48vw"
                      className="object-cover"
                    />
                    {/* fade from card bg color on left edge */}
                    <div
                      className="absolute inset-0"
                      style={{ background: `linear-gradient(to right, ${bg} 0%, ${bg}cc 10%, ${bg}55 35%, transparent 65%)` }}
                    />
                  </div>
                )}

                {/* Ambient blob */}
                <div
                  className="absolute w-[500px] h-[500px] rounded-full blur-[120px] top-[-20%] left-[30%] pointer-events-none"
                  style={{ background: `radial-gradient(circle, ${accent}18, transparent 65%)` }}
                />

                {/* ── Left: all content ── */}
                <div className="relative z-[1] flex flex-col justify-between w-full md:w-[56%] p-8 md:p-10 lg:p-14 h-full">

                  {/* Top row: counter + mode badge */}
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[11px] tracking-[6px] font-extrabold uppercase"
                      style={{ color: accent }}
                    >
                      0{i + 1}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold tracking-[2px] uppercase border"
                      style={{ borderColor: `${accent}44`, color: accent, background: `${accent}0d` }}
                    >
                      <Monitor className="w-3 h-3" />
                      {course.mode}
                    </span>
                  </div>

                  {/* Middle: category + title + description */}
                  <div className="flex flex-col gap-4">
                    {course.category && (
                      <span
                        className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full border text-[11px] font-bold tracking-[2px] uppercase"
                        style={{ borderColor: `${accent}44`, color: accent }}
                      >
                        <Tag className="w-3 h-3" />
                        {course.category}
                      </span>
                    )}
                    <h2
                      className="m-0 text-[clamp(1.6rem,3.5vw,3rem)] leading-[1.05] font-secondary text-[var(--titleColor,#111827)] tracking-[-2px]"
                    >
                      {course.name}
                    </h2>
                    {course.description && (
                      <p className="m-0 text-sm md:text-base leading-[1.8] text-[var(--paraColor,#6b7280)] line-clamp-3">
                        {course.description}
                      </p>
                    )}
                  </div>

                  {/* Bottom: stats + price + button */}
                  <div className="flex flex-col gap-5">
                    {/* Stat chips */}
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {course.duration > 0 && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/60 border border-white/80 text-xs font-semibold text-gray-700">
                          <Clock className="w-3.5 h-3.5" style={{ color: accent }} />
                          {course.duration}h Duration
                        </span>
                      )}
                      {course.language && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/60 border border-white/80 text-xs font-semibold text-gray-700">
                          <Globe className="w-3.5 h-3.5" style={{ color: accent }} />
                          {course.language}
                        </span>
                      )}
                      {course.instructor && (
                        <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/60 border border-white/80 text-xs font-semibold text-gray-700">
                          <User className="w-3.5 h-3.5" style={{ color: accent }} />
                          {course.instructor}
                        </span>
                      )}
                    </div>

                    <div
                      className="h-px w-full"
                      style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }}
                    />

                    {/* Price + button */}
                   <div className="flex flex-col gap-5">
  {/* Price Row */}
  <div className="flex items-baseline gap-3 flex-wrap">
    {discounted !== null ? (
      <>
        <span className="text-2xl md:text-3xl font-bold text-[var(--titleColor,#111827)]">
          ₹{discounted.toLocaleString("en-IN")}
        </span>

        <span className="text-sm font-medium text-gray-400 line-through">
          ₹{course.price.toLocaleString("en-IN")}
        </span>

        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full"
          style={{
            color: accent,
            background: `${accent}15`,
          }}
        >
          {course.discount}% OFF
        </span>
      </>
    ) : (
      <span className="text-2xl md:text-3xl font-bold text-[var(--titleColor,#111827)]">
        ₹{course.price.toLocaleString("en-IN")}
      </span>
    )}
  </div>

  {/* Button Below */}
  <Link
    href={course.courseType === "IIT" ? `/courses/iit/${course.slug}` : `/courses/mindlyftai/${course.slug}`}
    className="inline-flex w-fit items-center gap-2 px-8 py-3 rounded-full text-sm font-bold tracking-wide text-white transition-all hover:scale-105 hover:shadow-lg"
    style={{
      background: accent,
      boxShadow: `0 4px 20px ${accent}40`,
    }}
  >
    View Details
    <ArrowUpRight className="w-4 h-4" />
  </Link>
</div>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </div> 
    </section>
  );
}
