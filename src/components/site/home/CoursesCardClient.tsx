"use client";

import { useEffect, useRef } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import Link from "next/link";
import { Clock, ArrowRight, Globe, User, CheckCircle } from "lucide-react";
import { getGsap, getScrollTrigger, onGsapReady } from "@/lib/gsap-config";
import type { Course } from "@/types/admin/course";

type CourseTriple = [Course, Course | null, Course | null];

function chunkTriples(courses: Course[]): CourseTriple[] {
  const triples: CourseTriple[] = [];
  for (let i = 0; i < courses.length; i += 3) {
    triples.push([courses[i], courses[i + 1] ?? null, courses[i + 2] ?? null]);
  }
  return triples;
}

export default function CoursesCardClient({ courses }: { courses: Course[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stageRef = useRef<HTMLDivElement | null>(null);
  const triples = chunkTriples(courses);

  useEffect(() => {
    if (!containerRef.current || !stageRef.current) return;
    const container = containerRef.current;
    const stage = stageRef.current;

    const cancel = onGsapReady(() => {
      const gsap = getGsap();
      const ScrollTrigger = getScrollTrigger();
      if (!gsap || !ScrollTrigger) return;

      const ctx = gsap.context(() => {
        const layers = gsap.utils.toArray<HTMLElement>(".triple-layer", stage);
        if (layers.length === 0) return;

        // Entrance: first layer fades up as the stage scrolls into view
        gsap.fromTo(
          layers[0],
          { opacity: 0, y: 30, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: stage, start: "top 75%" },
          }
        );

        // Only wire up pin + swap logic on desktop/tablet — mobile just stacks normally
        const mm = gsap.matchMedia();

        mm.add("(min-width: 681px)", () => {
          if (layers.length < 2) return;

          // All layers occupy the same spot; only the active one is visible/interactive
          layers.forEach((layer, i) => {
            gsap.set(layer, {
              opacity: i === 0 ? 1 : 0,
              scale: i === 0 ? 1 : 0.96,
              filter: i === 0 ? "blur(0px)" : "blur(6px)",
              pointerEvents: i === 0 ? "auto" : "none",
              zIndex: i === 0 ? 2 : 1,
            });
          });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: stage,
              start: "top top",
              end: `+=${(layers.length - 1) * 100}%`,
              scrub: 1,
              pin: true,
              anticipatePin: 1,
            },
          });

          layers.forEach((layer, i) => {
            if (i === 0) return;
            const prevLayer = layers[i - 1];
            const pos = i - 1; // one "unit" of scroll per swap

            tl.set(layer, { zIndex: 2 }, pos)
              .set(prevLayer, { zIndex: 1 }, pos)
              .to(
                prevLayer,
                {
                  opacity: 0,
                  scale: 0.96,
                  filter: "blur(6px)",
                  duration: 0.4,
                  ease: "power2.inOut",
                  onStart:          () => gsap.set(prevLayer, { pointerEvents: "none" }),
                  onReverseComplete: () => gsap.set(prevLayer, { pointerEvents: "auto" }),
                },
                pos
              )
              .fromTo(
                layer,
                { opacity: 0, scale: 0.96, filter: "blur(6px)" },
                {
                  opacity: 1,
                  scale: 1,
                  filter: "blur(0px)",
                  duration: 0.4,
                  ease: "power2.inOut",
                  onStart:          () => gsap.set(layer, { pointerEvents: "auto" }),
                  onReverseComplete: () => gsap.set(layer, { pointerEvents: "none" }),
                },
                pos + 0.15
              );
          });

          requestAnimationFrame(() => ScrollTrigger.refresh());

          return () => {
            // matchMedia cleanup when leaving the breakpoint
            gsap.set(layers, { clearProps: "opacity,scale,filter,pointerEvents,zIndex" });
          };
        });
      }, container);

      (container as any)._gsapCtx = ctx;
    });

    return () => {
      cancel();
      const ctx = (container as any)._gsapCtx;
      if (ctx) ctx.revert();
    };
  }, []);

  return (
    <section ref={containerRef} className="relative overflow-x-hidden bg-white isolate">
      {/* Section Header */}
    <div className="space-y-6 px-6 pt-10 pb-20 text-center">
        <SectionBadge variant="dark">Our Courses</SectionBadge>
        <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">
          Expert-led courses designed to take you{" "}
          <span className="text-violet-600">from fundamentals to mastery.</span>
        </h2>
        <div className="mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
      </div>

      {triples.length === 0 ? (
        <div className="flex justify-center px-20 py-15">
          <div className="w-full max-w-sm">
            <ComingSoonCard cardClass="" textClass="" />
          </div>
        </div>
      ) : (
        <div
          ref={stageRef}
          className="relative w-full px-[3vw] py-8 min-[681px]:min-h-[80vh] min-[1101px]:min-h-[600px] max-[680px]:px-5"
        >
          {/* Noise texture */}
          <div
            className="pointer-events-none absolute inset-0 z-0 opacity-[0.018] [background-size:180px_180px]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />

          {triples.map((triple, i) => (
            <div
              key={i}
              className={`triple-layer relative z-10 mb-12 flex w-full items-center justify-center last:mb-0 min-[681px]:absolute min-[681px]:inset-0 min-[681px]:mb-0 min-[681px]:px-[3vw] min-[681px]:py-8 ${
                i % 2 === 0
                  ? "bg-[radial-gradient(ellipse_at_15%_20%,rgba(139,92,246,0.07)_0%,transparent_50%),radial-gradient(ellipse_at_85%_80%,rgba(124,58,237,0.06)_0%,transparent_45%)]"
                  : "bg-[rgba(248,248,252,0.6)] bg-[radial-gradient(ellipse_at_85%_20%,rgba(124,58,237,0.07)_0%,transparent_50%),radial-gradient(ellipse_at_15%_80%,rgba(59,130,246,0.07)_0%,transparent_45%)]"
              }`}
            >
              <div className="relative z-10 w-full max-w-[1440px]">
                <div className="grid grid-cols-1 gap-8 min-[681px]:grid-cols-2 min-[1101px]:grid-cols-3">
                  {triple.map(
                    (course) =>
                      course && (
                        <CourseCard
                          key={course.id}
                          course={course}
                          cardClass=""
                          textClass=""
                          accentRgb="124,58,237"
                        />
                      )
                  )}
                </div>
              </div>
            </div>
          ))}
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
  const href = course.courseType === "IIT" ? `/courses/iit/${course.id}` : `/courses/mindlyftai/${course.id}`;

  const handleMouseEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const gsap = getGsap();
    if (!gsap) return;
    gsap.to(e.currentTarget, { y: -8, scale: 1.01, duration: 0.5, ease: "power3.out" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const gsap = getGsap();
    if (!gsap) return;
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.5, ease: "power3.out" });
  };

  return (
    <Link
      href={href}
      className={`${cardClass} relative flex min-h-[440px] cursor-pointer flex-col overflow-hidden rounded-[24px] border border-[color:rgba(var(--a),0.15)] bg-white shadow-[0_8px_32px_rgba(var(--a),0.10),0_2px_8px_rgba(0,0,0,0.06)] will-change-transform`}
      style={{ "--a": accentRgb } as React.CSSProperties}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image / gradient */}
      <div className="relative h-[200px] w-full overflow-hidden">
        {/* important-marked height: template-styles.css has an unlayered global
            `img { height: auto }` rule, which beats Tailwind's layered utilities
            regardless of specificity — without `!` this collapses to each
            image's own aspect ratio instead of the fixed 240px container. */}
        {course.image ? (
          <img src={course.image} alt={course.name} className="block h-full! w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-[linear-gradient(135deg,rgba(var(--a),0.85)_0%,rgba(var(--a),0.45)_100%)]" />
        )}

        {/* Top-right: course type badge */}
        {course.courseType === "IIT" && (
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest text-violet-700 shadow-sm">
            IIT
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
      <div className="flex flex-1 flex-col gap-3 p-5">
        {/* Name + stats + highlights — centered as a group in the space above the
            button, so courses with less content (no highlights, short name) don't
            end up top-heavy with one big empty gap before the button. */}
        <div className="flex flex-1 flex-col justify-center gap-3">
          <h3 className={`${textClass} text-[clamp(1rem,1.4vw,1.2rem)] font-bold leading-snug text-[#0f0a1e] [font-family:var(--secondaryFont)]`}>
            {course.name}
          </h3>

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
            <ul className={`${textClass} space-y-1`}>
              {course.highlights.slice(0, 2).map((h, idx) => (
                <li key={idx} className="flex items-start gap-1.5 text-[12px] text-gray-500">
                  <CheckCircle size={12} className="mt-0.5 shrink-0 text-violet-500" />
                  {h}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Button */}
        <div
          className={`${textClass} inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[linear-gradient(135deg,rgba(var(--a),1)_0%,rgba(var(--a),0.75)_100%)] py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95`}
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
  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    const gsap = getGsap();
    if (!gsap) return;
    gsap.to(e.currentTarget, { y: -8, scale: 1.01, duration: 0.5, ease: "power3.out" });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const gsap = getGsap();
    if (!gsap) return;
    gsap.to(e.currentTarget, { y: 0, scale: 1, duration: 0.5, ease: "power3.out" });
  };

  return (
    <div
      className={`${cardClass} relative flex cursor-default flex-col overflow-hidden rounded-[24px] border border-[rgba(139,92,246,0.15)] bg-white shadow-[0_8px_32px_rgba(139,92,246,0.10),0_2px_8px_rgba(0,0,0,0.06)] will-change-transform`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
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
