"use client";

import { useState } from "react";
import { GraduationCap, CheckSquare, Users, type LucideIcon } from "lucide-react";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

const TABS = ["Students", "Working Professionals", "Career Switchers"] as const;
type Tab = typeof TABS[number];

const TAB_META: Record<Tab, { accent: string; bg: string; label: string }> = {
  Students:               { accent: "#8B5CF6", bg: "#f5f3ff", label: "For Students" },
  "Working Professionals":{ accent: "#3B82F6", bg: "#eff6ff", label: "For Professionals" },
  "Career Switchers":     { accent: "#059669", bg: "#ecfdf5", label: "For Switchers" },
};

const CARD_COLORS = [
  { accent: "#8B5CF6", bg: "#f5f3ff", border: "#e9d5ff" },
  { accent: "#3B82F6", bg: "#eff6ff", border: "#bfdbfe" },
  { accent: "#6366F1", bg: "#eef2ff", border: "#c7d2fe" },
];

const CARDS: Record<Tab, { icon: LucideIcon; title: string; desc: string }[]> = {
  Students: [
    { icon: GraduationCap, title: "A credential before your degree",    desc: "Graduate with an IIT-affiliated certificate already on your resume — not just a degree in progress." },
    { icon: CheckSquare,   title: "A real capstone, not a class project",desc: "Build something defensible to a faculty panel — the kind of project that actually survives an internship interview." },
    { icon: Users,         title: "Mentorship beyond your campus",        desc: "Access faculty and industry mentors outside your own college's network — useful no matter where you study." },
  ],
  "Working Professionals": [
    { icon: GraduationCap, title: "Upskill without quitting your job",           desc: "Hybrid scheduling and recorded sessions are built around a working week, not a campus timetable." },
    { icon: CheckSquare,   title: "A credential your manager respects",           desc: "An IIT-affiliated certificate carries weight in a promotion conversation that a generic online badge doesn't." },
    { icon: Users,         title: "Apply it to your current role immediately",    desc: "Capstones can be scoped around a real problem at your own company, with mentor sign-off on the approach." },
  ],
  "Career Switchers": [
    { icon: Users,         title: "Credibility with zero track record",           desc: "When you have no prior AI job history, an IIT-affiliated certificate is the single strongest signal you can offer instead." },
    { icon: CheckSquare,   title: "Placement support built in",                   desc: "Mock interviews, resume reviews, and recruiter introductions are part of the program — not a separate purchase." },
    { icon: GraduationCap, title: "A genuine second chance at a CS background",   desc: "The program assumes no prior coding background and builds it from the ground up, structured the way a degree would." },
  ],
};

export default function IITAudience({ bg = "bg-white" }: { bg?: string }) {
  const [active, setActive] = useState<Tab>("Students");
  const cards = CARDS[active];
  const meta = TAB_META[active];

  return (
    <section className={`${bg} px-6 py-24 md:px-[60px] overflow-hidden`}>
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-14">
          <AnimateIn delay={0} direction="zoom"><LineBadge className="mb-5">Who This Is Built For</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="zoom">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              The same program, <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                three different reasons to join
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="zoom">
            <p className="text-base text-gray-500 leading-relaxed max-w-xl">
              What this credential does for you depends on where you&apos;re standing right now. Pick the one that&apos;s closest to your situation.
            </p>
          </AnimateIn>
        </div>

        {/* Two-column: left tabs + right cards */}
        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8 items-start">

          {/* Tab list */}
          <AnimateIn delay={300} direction="zoom">
            <div className="flex flex-row lg:flex-col gap-2 flex-wrap">
              {TABS.map((tab) => {
                const isActive = active === tab;
                const m = TAB_META[tab];
                return (
                  <button key={tab} onClick={() => setActive(tab)}
                    className="group relative text-left rounded-2xl px-4 py-3.5 transition-all duration-300 w-full"
                    style={isActive ? { background: m.bg, border: `1.5px solid ${m.accent}30` } : { background: "transparent", border: "1.5px solid #e5e7eb" }}
                  >
                    {/* Active accent bar */}
                    {isActive && (
                      <span className="absolute left-0 top-3 bottom-3 w-1 rounded-r-full" style={{ background: m.accent }} />
                    )}
                    <span className="text-sm font-semibold pl-1" style={isActive ? { color: m.accent } : { color: "#6b7280" }}>
                      {m.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </AnimateIn>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {cards.map(({ icon: Icon, title, desc }, i) => {
              const { accent, bg: cardBg, border } = CARD_COLORS[i % CARD_COLORS.length];
              return (
                <AnimateIn key={`${active}-${i}`} delay={i * 100} direction="zoom">
                  <div
                    className="group relative rounded-3xl p-6 overflow-hidden hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 h-full"
                    style={{ background: cardBg, border: `1.5px solid ${border}` }}
                  >
                    {/* Background shape */}
                    <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full opacity-15 group-hover:scale-150 transition-transform duration-500"
                      style={{ background: accent }} />
                    <div className="relative z-10">
                      <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl group-hover:scale-110 transition-transform duration-300" style={{ background: `${accent}20` }}>
                        <Icon className="w-4 h-4" style={{ color: accent }} />
                      </div>
                      <h4 className="text-sm font-bold text-gray-900 mb-2">{title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
