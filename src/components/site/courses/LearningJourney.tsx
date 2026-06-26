"use client";

import { Compass, CalendarCheck, BookOpen, Hammer, Award, TrendingUp } from "lucide-react";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

const STEPS = [
  { icon: Compass,       num: "01", title: "Discover",           desc: "Explore programs mapped to real industry roles.",                       accent: "#8B5CF6", bg: "#f5f3ff" },
  { icon: CalendarCheck, num: "02", title: "Enroll",             desc: "Pick a flexible cohort that fits your schedule.",                       accent: "#6366F1", bg: "#eef2ff" },
  { icon: BookOpen,      num: "03", title: "Learn",              desc: "Live sessions and self-paced modules with mentors.",                    accent: "#3B82F6", bg: "#eff6ff" },
  { icon: Hammer,        num: "04", title: "Build Projects",     desc: "Apply every concept to portfolio-ready builds.",                        accent: "#7C3AED", bg: "#f5f3ff" },
  { icon: Award,         num: "05", title: "Earn Certification", desc: "Validate skills with an industry-recognized credential.",               accent: "#2563EB", bg: "#eff6ff" },
  { icon: TrendingUp,    num: "06", title: "Career Growth",      desc: "Get matched with placement support and hiring partners.",               accent: "#059669", bg: "#ecfdf5" },
];

export default function LearningJourney({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section className={`${bg} px-6 md:px-[60px] py-24 overflow-hidden`}>
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-20">
          <AnimateIn delay={0} direction="flip"><LineBadge className="justify-center mb-5">The Learning Journey</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="flip">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              From curious to{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                career-ready
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="flip">
            <p className="text-base text-gray-500 leading-relaxed max-w-md mx-auto">
              Every program follows the same proven path — from first click to first offer.
            </p>
          </AnimateIn>
        </div>

        {/* Desktop: zigzag SVG path */}
        <div className="hidden lg:block">
          <div className="relative" style={{ height: 340 }}>
            <svg className="absolute inset-0 w-full pointer-events-none" style={{ height: 340 }} viewBox="0 0 1100 340" preserveAspectRatio="none">
              <defs>
                <linearGradient id="journeyGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#8B5CF6" />
                  <stop offset="60%"  stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              <path
                d="M 90,90 C 180,90 140,250 275,250 C 410,250 370,90 550,90 C 730,90 690,250 825,250 C 960,250 920,90 1010,90"
                fill="none" stroke="url(#journeyGrad)" strokeWidth="2" strokeDasharray="8 6" opacity="0.45"
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
                        <div className="group w-44 rounded-3xl p-4 bg-white shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300 mb-3"
                          style={{ border: `1.5px solid ${step.accent}25` }}>
                          <div className="h-0.5 w-8 rounded-full mb-3" style={{ background: step.accent }} />
                          <div className="flex h-8 w-8 items-center justify-center rounded-xl mb-2 group-hover:scale-110 transition-transform" style={{ background: `${step.accent}18` }}>
                            <Icon className="w-4 h-4" style={{ color: step.accent }} />
                          </div>
                          <p className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: step.accent }}>Step {step.num}</p>
                          <h4 className="text-xs font-bold text-gray-900 mb-1 leading-snug">{step.title}</h4>
                          <p className="text-[10px] text-gray-500 leading-relaxed">{step.desc}</p>
                        </div>
                        <div className="flex flex-col items-center">
                          <div className="w-px h-5" style={{ background: `${step.accent}40` }} />
                          <div className="w-4 h-4 rounded-full border-[3px] border-white shadow-md" style={{ background: step.accent }} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex flex-col items-center">
                          <div className="w-4 h-4 rounded-full border-[3px] border-white shadow-md" style={{ background: step.accent }} />
                          <div className="w-px h-5" style={{ background: `${step.accent}40` }} />
                        </div>
                        <div className="group w-44 rounded-3xl p-4 bg-white shadow-sm hover:translate-y-1 hover:shadow-lg transition-all duration-300 mt-3"
                          style={{ border: `1.5px solid ${step.accent}25` }}>
                          <div className="h-0.5 w-8 rounded-full mb-3" style={{ background: step.accent }} />
                          <div className="flex h-8 w-8 items-center justify-center rounded-xl mb-2 group-hover:scale-110 transition-transform" style={{ background: `${step.accent}18` }}>
                            <Icon className="w-4 h-4" style={{ color: step.accent }} />
                          </div>
                          <p className="text-[9px] font-black uppercase tracking-widest mb-0.5" style={{ color: step.accent }}>Step {step.num}</p>
                          <h4 className="text-xs font-bold text-gray-900 mb-1 leading-snug">{step.title}</h4>
                          <p className="text-[10px] text-gray-500 leading-relaxed">{step.desc}</p>
                        </div>
                      </>
                    )}
                  </div>
                </AnimateIn>
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="lg:hidden flex flex-col gap-0">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === STEPS.length - 1;
            return (
              <AnimateIn key={step.title} delay={300 + i * 80} direction="flip">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="w-4 h-4 rounded-full border-[3px] border-white shadow-md mt-4 shrink-0" style={{ background: step.accent }} />
                    {!isLast && <div className="w-px flex-1 mt-1" style={{ background: `${step.accent}40` }} />}
                  </div>
                  <div className="rounded-3xl p-5 mb-4 flex-1 bg-white shadow-sm" style={{ border: `1.5px solid ${step.accent}25` }}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex h-7 w-7 items-center justify-center rounded-lg" style={{ background: `${step.accent}18` }}>
                        <Icon className="w-3.5 h-3.5" style={{ color: step.accent }} />
                      </div>
                      <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: step.accent }}>Step {step.num}</span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{step.title}</h4>
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
