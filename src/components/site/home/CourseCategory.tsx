"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, BadgeCheck, Check } from "lucide-react";
import { getGsap, getScrollTrigger, onGsapReady } from "@/lib/gsap-config";
import type { CourseCategory as CourseCategoryItem } from "@/types/admin/courseCategory";

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

// interface Props {
//   iitCourses?: Course[];
// }

interface Props {
  categories?: CourseCategoryItem[];
}

export default function CourseCategory({ categories }: Props) {
  const items = categories ?? [];
  // const courses = iitCourses ?? [];
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
    <section className="relative bg-white overflow-x-hidden isolate">
        
      {/* ── Stacking category cards ── */}
      <div
        ref={wrapperRef}
        className="relative h-screen overflow-hidden bg-gradient-to-b from-violet-50 to-white isolate"
      >
        {/* Floating badge above the stacking cards — needs its own z-index and a
            centering wrapper since it's a static sibling of the absolute, full-screen
            card layers below (plain text-center on the pill alone has no effect,
            it's not the pill that needs centering, it's the pill within its row). */}
        <div className="pointer-events-none absolute top-6 left-0 z-50 flex w-full justify-center">
          <span className="text-[10px] font-black uppercase tracking-[3px] px-3 py-1 rounded-full border border-violet-200 bg-violet-100 text-violet-700">
            C3iHub IIT Kanpur Certification Program
          </span>
        </div>
        {/* Empty state */}
        {items.length === 0 && (
          <div
            className="ss-card absolute top-0 left-0 w-full h-full flex items-center justify-center pt-[98px] px-[18px] pb-[18px] md:pt-[116px] md:px-9 md:pb-9 [will-change:transform,opacity]"
            style={{ zIndex: 1 }}
          >
            <div
              className="relative overflow-hidden w-full max-w-[1280px] h-[60vh] md:h-[70vh] lg:h-[78vh] rounded-3xl md:rounded-[36px] border border-white/80 shadow-[0_12px_50px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-col justify-center items-center gap-4 p-8 md:p-10 lg:p-14"
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
              className="ss-card absolute top-0 left-0 w-full h-full flex items-center justify-center pt-[98px] px-[18px] pb-[18px] md:pt-[116px] md:px-9 md:pb-9 [will-change:transform,opacity]"
              style={{ zIndex: i + 1 }}
            >
              <div
                className="relative overflow-hidden w-full max-w-[1280px] h-[60vh] md:h-[70vh] lg:h-[78vh] rounded-3xl md:rounded-[36px] border border-white/80 shadow-[0_12px_50px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-row"
                style={{ background: bg }}
              >
                {/* Right: full-height background image */}
                {cat.image && (
                  <div className="absolute right-0 top-0 w-[48%] h-full hidden md:block pointer-events-none">
                    <Image
                      src={cat.image}
                      alt={cat.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
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

                {/* Left: content */}
                <div className="relative z-[1] flex flex-col justify-between w-full md:w-[56%] p-8 md:p-10 lg:p-14 h-full">

                  {/* Top: counter + program label */}
                  <div className="flex items-center gap-3 py-1">
                    <span className="text-[11px] tracking-[6px] font-extrabold uppercase" style={{ color: accent }}>
                      0{i + 1}
                    </span>
                    <span
                      className="text-[10px] font-black uppercase tracking-[3px] px-3 py-1 rounded-full border"
                      style={{ color: accent, borderColor: `${accent}40`, backgroundColor: `${accent}10` }}
                    >
                     C3iHub IIT Kanpur Certification Program
                    </span>
                  </div>

                  {/* Name + tagline + description */}
                  <div className="flex flex-col gap-3">
                    <h2 className="m-0 text-[clamp(1.8rem,3.5vw,3.2rem)] font-extrabold leading-tight tracking-tight text-gray-900 [font-family:var(--primaryFont,sans-serif)]">
                      {cat.name}
                    </h2>
                    {/* <p className="m-0 text-sm md:text-base font-medium italic leading-snug" style={{ color: accent }}>
                      Future-Proof Your Career with AI-Powered Cybersecurity
                    </p> */}
                    {cat.description && (
                      <p className="m-0 text-sm md:text-base leading-[1.8] text-gray-500 line-clamp-3">
                        {cat.description}
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="flex flex-col gap-5">
                    <div className="h-px w-full" style={{ background: `linear-gradient(to right, ${accent}40, transparent)` }} />
                    <Link
                      href={`/course-categories/${cat.id}`}
                      className="inline-flex w-fit items-center gap-2 px-8 py-3 rounded-full text-sm font-bold tracking-wide text-white transition-all hover:scale-105 hover:shadow-lg"
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
          className="ss-card absolute top-0 left-0 w-full h-full flex items-center justify-center pt-[98px] px-[18px] pb-[18px] md:pt-[116px] md:px-9 md:pb-9 [will-change:transform,opacity]"
          style={{ zIndex: items.length + 1 }}
        >
          <div
            className="relative overflow-hidden w-full max-w-[1280px] h-[60vh] md:h-[70vh] lg:h-[78vh] rounded-3xl md:rounded-[36px] border border-white/80 shadow-[0_12px_50px_rgba(0,0,0,0.07),inset_0_1px_0_rgba(255,255,255,0.9)] flex flex-row"
            style={{ background: "#F5F3FF" }}
          >
            {/* Right Image */}
            <div className="absolute right-0 top-0 p-2 w-[48%] h-full hidden md:block pointer-events-none">
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
              <div className="absolute top-6 right-6 z-[2] flex items-center gap-2 rounded-full border border-white/60 bg-white/90 px-4 py-2 shadow-[0_8px_24px_rgba(139,92,246,0.25)] backdrop-blur-sm">
                <BadgeCheck className="h-4 w-4 text-violet-600" />
                <span className="text-xs font-bold text-gray-800">Verified &amp; Shareable</span>
              </div>
            </div>

            

            {/* Left Content */}
            <div className="relative z-[1] flex flex-col justify-between w-full md:w-[56%] p-8 md:p-10 lg:p-14 h-full">

              {/* Top: counter + badge */}
              <div className="flex items-center gap-3 py-1">
                 
                <span className="text-[10px] font-black uppercase tracking-[3px] px-3 py-1 rounded-full border border-violet-200 bg-violet-100 text-violet-700">
                  Joint Certification
                </span>
              </div>

              {/* Main Content */}
              <div className="flex flex-col gap-4">
                <h2 className="m-0 text-[clamp(2rem,4vw,4rem)] font-extrabold leading-tight tracking-tight text-gray-900 [font-family:'Playfair_Display',Georgia,serif]">
                  Certificate of <span className="text-violet-600">Completion</span>
                </h2>
                <p className="m-0 text-sm md:text-base leading-[1.8] text-gray-500">
                  Earn a Joint Certification from MindLyft AI and C3iHub IIT Kanpur upon successful completion of the program.
                </p>
                <ul className="m-0 flex flex-col gap-2.5 pt-1">
                  {[
                    "Jointly issued by MindLyft AI & IIT Kanpur",
                    "Digitally verifiable certificate",
                   ].map((point) => (
                    <li key={point} className="flex items-center gap-2.5 text-sm text-gray-600">
                      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-violet-100">
                        <Check className="h-3 w-3 text-violet-600" strokeWidth={3} />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <div className="flex flex-col gap-5">
                <div className="h-px w-full bg-gradient-to-r from-violet-400/40 to-transparent" />
                <Link
                  href="/courses"
                  className="inline-flex w-fit items-center gap-2 px-8 py-3 rounded-full text-sm font-bold tracking-wide text-white transition-all hover:scale-105 hover:shadow-lg"
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
