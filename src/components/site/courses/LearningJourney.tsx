 "use client";

import { Compass, CalendarCheck, BookOpen, Hammer, Award, Flag } from "lucide-react";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

const STEPS = [
  { icon: Compass,       mile: "01", title: "Discover",           desc: "Explore programs mapped to real industry roles.",         accent: "#4A7856" },
  { icon: CalendarCheck, mile: "02", title: "Enroll",             desc: "Pick a flexible cohort that fits your schedule.",          accent: "#8B6F47" },
  { icon: BookOpen,      mile: "03", title: "Learn",              desc: "Live sessions and self-paced modules with mentors.",       accent: "#4C7A96" },
  { icon: Hammer,        mile: "04", title: "Build Projects",     desc: "Apply every concept to portfolio-ready builds.",           accent: "#C1652F" },
  { icon: Award,         mile: "05", title: "Earn Certification", desc: "Validate skills with an industry-recognized credential.",  accent: "#B8912F" },
  { icon: Flag,          mile: "06", title: "Career Growth",      desc: "Get matched with placement support and hiring partners.", accent: "#2F6B4F" },
];

export default function LearningJourney({ bg = "bg-[#FBF7EF]" }: { bg?: string }) {
  return (
    <section className={`${bg} relative px-6 md:px-[60px] py-24 overflow-hidden`}>
      {/* topographic contour texture */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.06] pointer-events-none" preserveAspectRatio="none">
        <defs>
          <pattern id="contours" width="120" height="120" patternUnits="userSpaceOnUse">
            <path d="M0,60 Q30,20 60,60 T120,60" fill="none" stroke="#8B6F47" strokeWidth="1" />
            <path d="M0,90 Q30,50 60,90 T120,90" fill="none" stroke="#8B6F47" strokeWidth="1" />
            <path d="M0,30 Q30,-10 60,30 T120,30" fill="none" stroke="#8B6F47" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#contours)" />
      </svg>

      <div className="max-w-6xl mx-auto relative">

        <div className="text-center mb-20">
          <AnimateIn delay={0} direction="flip">
            <LineBadge className="justify-center mb-5">The Trail Ahead</LineBadge>
          </AnimateIn>
          <AnimateIn delay={100} direction="flip">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              From trailhead to{" "}
              <span style={{ color: "#2F6B4F" }}>summit</span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="flip">
            <p className="text-base text-gray-500 leading-relaxed max-w-md mx-auto">
              Six waypoints, one route. Every cohort climbs the same trail — from first step to first offer.
            </p>
          </AnimateIn>
        </div>

        {/* Desktop: zigzag ascending trail */}
        <div className="hidden lg:block">
          <div className="relative" style={{ height: 340 }}>
            <svg className="absolute inset-0 w-full pointer-events-none" style={{ height: 340 }} viewBox="0 0 1100 340" preserveAspectRatio="none">
              <path
                d="M 60,250 C 180,250 140,90 275,90 C 410,90 370,250 550,250 C 730,250 690,90 825,90 C 960,90 920,250 1040,250"
                fill="none" stroke="#8B6F47" strokeWidth="2" strokeDasharray="1 9" strokeLinecap="round" opacity="0.5"
              />
            </svg>

            {STEPS.map((step, i) => {
              const Icon = step.icon;
              const isTop = i % 2 === 0;
              const xPercents = [8, 25, 50, 58, 75, 92];
              return (
                <AnimateIn key={step.title} delay={300 + i * 100} direction="flip">
                  <div className="absolute flex flex-col items-center" style={{ left: `${xPercents[i]}%`, top: isTop ? 0 : 160, transform: "translateX(-50%)" }}>
                    {isTop ? (
                      <>
                        <div
                          className="group w-44 rounded-md bg-white shadow-sm hover:-translate-y-1 hover:shadow-md transition-all duration-300 mb-3"
                          style={{ borderLeft: `3px solid ${step.accent}`, borderTop: "1px solid #EDE7D9", borderRight: "1px solid #EDE7D9", borderBottom: "1px solid #EDE7D9" }}
                        >
                          <div className="flex items-center justify-between px-3 pt-3">
                            <span className="font-mono text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-sm" style={{ color: step.accent, background: `${step.accent}14` }}>
                              MI {step.mile}
                            </span>
                            <Icon className="w-4 h-4" style={{ color: step.accent }} />
                          </div>
                          <div className="px-3 pb-3 pt-1.5">
                            <h4 className="text-xs font-bold text-gray-900 mb-1 leading-snug">{step.title}</h4>
                            <p className="text-[10px] text-gray-500 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-px h-5" style={{ background: `${step.accent}55` }} />
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-[#FBF7EF] shadow-sm" style={{ background: step.accent }} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col items-center">
                          <div className="w-3.5 h-3.5 rounded-full border-2 border-[#FBF7EF] shadow-sm" style={{ background: step.accent }} />
                          <div className="w-px h-5" style={{ background: `${step.accent}55` }} />
                        </div>
                        <div
                          className="group w-44 rounded-md bg-white shadow-sm hover:translate-y-1 hover:shadow-md transition-all duration-300 mt-3"
                          style={{ borderLeft: `3px solid ${step.accent}`, borderTop: "1px solid #EDE7D9", borderRight: "1px solid #EDE7D9", borderBottom: "1px solid #EDE7D9" }}
                        >
                          <div className="flex items-center justify-between px-3 pt-3">
                            <span className="font-mono text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-sm" style={{ color: step.accent, background: `${step.accent}14` }}>
                              MI {step.mile}
                            </span>
                            <Icon className="w-4 h-4" style={{ color: step.accent }} />
                          </div>
                          <div className="px-3 pb-3 pt-1.5">
                            <h4 className="text-xs font-bold text-gray-900 mb-1 leading-snug">
                              {i === STEPS.length - 1 ? `${step.title} — Summit` : step.title}
                            </h4>
                            <p className="text-[10px] text-gray-500 leading-relaxed">{step.desc}</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical ascent */}
        <div className="lg:hidden flex flex-col gap-0">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === STEPS.length - 1;
            return (
              <AnimateIn key={step.title} delay={300 + i * 80} direction="flip">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-3.5 h-3.5 rounded-full border-2 border-[#FBF7EF] shadow-sm mt-4 shrink-0" style={{ background: step.accent }} />
                    {!isLast && <div className="w-px flex-1 mt-1" style={{ background: `${step.accent}40` }} />}
                  </div>
                  <div
                    className="rounded-md p-5 mb-4 flex-1 bg-white shadow-sm"
                    style={{ borderLeft: `3px solid ${step.accent}`, borderTop: "1px solid #EDE7D9", borderRight: "1px solid #EDE7D9", borderBottom: "1px solid #EDE7D9" }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-[9px] font-bold tracking-wider px-1.5 py-0.5 rounded-sm" style={{ color: step.accent, background: `${step.accent}14` }}>
                        MI {step.mile}
                      </span>
                      <Icon className="w-4 h-4" style={{ color: step.accent }} />
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">
                      {isLast ? `${step.title} — Summit` : step.title}
                    </h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>

      </div>
    </section>
  );
}