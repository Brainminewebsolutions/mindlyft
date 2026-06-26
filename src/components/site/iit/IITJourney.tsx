"use client";

import { FileText, Phone, BookOpen, Award, Rocket } from "lucide-react";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

const STEPS = [
  { icon: FileText, num: "01", title: "Apply online",     desc: "Submit your profile and goals — no entrance exam required.", accent: "#8B5CF6", bg: "#f5f3ff" },
  { icon: Phone,    num: "02", title: "Counselling call", desc: "20-min session to confirm fit and batch details.",            accent: "#6366F1", bg: "#eef2ff" },
  { icon: BookOpen, num: "03", title: "Learn + build",    desc: "Live sessions, labs, and IIT-grade projects.",                accent: "#3B82F6", bg: "#eff6ff" },
  { icon: Award,    num: "04", title: "Get certified",    desc: "Dual certificates from MindLyft AI and IIT Kanpur.",         accent: "#7C3AED", bg: "#f5f3ff" },
  { icon: Rocket,   num: "05", title: "Launch career",    desc: "Placement support, alumni network, recruiter access.",        accent: "#059669", bg: "#ecfdf5" },
];

export default function IITJourney({ bg = "bg-violet-50" }: { bg?: string }) {
  return (
    <section className={`${bg} min-h-screen px-6 py-24 md:px-[60px] flex items-center overflow-hidden`}>
      <div className="max-w-6xl mx-auto w-full">

        {/* Header */}
        <div className="text-center mb-20">
          <AnimateIn delay={0} direction="flip">
            <LineBadge className="justify-center mb-5">The IIT Learning Journey</LineBadge>
          </AnimateIn>
          <AnimateIn delay={100} direction="flip">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              From application to{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                career transformation.
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="flip">
            <p className="text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
              Every IIT program follows a structured journey — designed so you always know where you are and what comes next.
            </p>
          </AnimateIn>
        </div>

        {/* Path — desktop: horizontal zigzag; mobile: vertical */}
        <div className="hidden lg:block">
          <div className="relative">

            {/* SVG path line */}
            <svg
              className="absolute inset-0 w-full pointer-events-none"
              style={{ height: 320 }}
              viewBox="0 0 1000 320"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="pathGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%"   stopColor="#8B5CF6" />
                  <stop offset="50%"  stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#059669" />
                </linearGradient>
              </defs>
              {/* Smooth S-curve through all 5 nodes */}
              <path
                d="M 100,80 C 200,80 150,240 300,240 C 450,240 400,80 500,80 C 600,80 550,240 700,240 C 850,240 800,80 900,80"
                fill="none"
                stroke="url(#pathGrad)"
                strokeWidth="3"
                strokeDasharray="10 6"
                opacity="0.5"
              />
            </svg>

            {/* 5 nodes positioned along the curve */}
            <div className="relative" style={{ height: 320 }}>
              {STEPS.map((step, i) => {
                const Icon = step.icon;
                const isTop = i % 2 === 0;
                // x positions: 100,300,500,700,900 → as % of 1000
                const xPercents = [10, 30, 50, 70, 90];
                const xPct = xPercents[i];
                const yTop = isTop ? 0 : 160; // top node vs bottom node (in px within 320px height)

                return (
                  <AnimateIn key={step.title} delay={300 + i * 120} direction="flip">
                    <div
                      className="absolute flex flex-col items-center"
                      style={{ left: `${xPct}%`, top: yTop, transform: "translateX(-50%)" }}
                    >
                      {/* Card above or below the dot */}
                      {isTop ? (
                        <>
                          {/* Card */}
                          <div
                            className="group w-48 rounded-2xl p-4 shadow-md hover:-translate-y-1 hover:shadow-lg transition-all duration-300 mb-3 bg-white"
                            style={{ border: `1.5px solid ${step.accent}40` }}
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300" style={{ background: `${step.accent}18` }}>
                              <Icon className="w-4 h-4" style={{ color: step.accent }} />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: step.accent }}>Step {step.num}</p>
                            <h4 className="text-sm font-bold text-gray-900 mb-1.5 leading-snug">{step.title}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                          </div>
                          {/* Dot with stem down */}
                          <div className="flex flex-col items-center">
                            <div className="w-px h-6 bg-gradient-to-b from-gray-300 to-transparent" />
                            <div className="w-5 h-5 rounded-full border-4 border-white shadow-md" style={{ background: step.accent }} />
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Dot with stem up */}
                          <div className="flex flex-col items-center">
                            <div className="w-5 h-5 rounded-full border-4 border-white shadow-md" style={{ background: step.accent }} />
                            <div className="w-px h-6 bg-gradient-to-b from-transparent to-gray-300" />
                          </div>
                          {/* Card */}
                          <div
                            className="group w-48 rounded-2xl p-4 shadow-md hover:translate-y-1 hover:shadow-lg transition-all duration-300 mt-3 bg-white"
                            style={{ border: `1.5px solid ${step.accent}40` }}
                          >
                            <div className="flex h-8 w-8 items-center justify-center rounded-xl mb-3 group-hover:scale-110 transition-transform duration-300" style={{ background: `${step.accent}18` }}>
                              <Icon className="w-4 h-4" style={{ color: step.accent }} />
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-widest mb-1" style={{ color: step.accent }}>Step {step.num}</p>
                            <h4 className="text-sm font-bold text-gray-900 mb-1.5 leading-snug">{step.title}</h4>
                            <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                          </div>
                        </>
                      )}
                    </div>
                  </AnimateIn>
                );
              })}
            </div>

          </div>
        </div>

        {/* Mobile: vertical path */}
        <div className="lg:hidden flex flex-col gap-0">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const isLast = i === STEPS.length - 1;
            return (
              <AnimateIn key={step.title} delay={300 + i * 100} direction="flip">
                <div className="flex gap-4">
                  {/* Left: dot + line */}
                  <div className="flex flex-col items-center">
                    <div className="w-5 h-5 rounded-full border-4 border-white shadow-md shrink-0 mt-4" style={{ background: step.accent }} />
                    {!isLast && (
                      <div className="w-px flex-1 mt-1" style={{ background: `linear-gradient(to bottom, ${step.accent}60, ${STEPS[i + 1].accent}60)` }} />
                    )}
                  </div>
                  {/* Right: card */}
                  <div
                    className="group rounded-2xl p-5 mb-4 flex-1 hover:shadow-md transition-all duration-300"
                    style={{ background: step.bg, border: `1.5px solid ${step.accent}30` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl" style={{ background: `${step.accent}20` }}>
                        <Icon className="w-4 h-4" style={{ color: step.accent }} />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: step.accent }}>Step {step.num}</span>
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
