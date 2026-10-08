"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Wrench, Video, GraduationCap, ArrowRight } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";

const PILLARS = [
  {
    num: "01", icon: GraduationCap, name: "IIT Programs",
    tagline: "World-class IIT education",
    description: "Premium programs developed in collaboration with IIT faculty and industry experts. Gain credentials that set you apart.",
    description2: "Certificate programs, research tracks, and live IIT-backed sessions — all in one place.",
    href: "/iit-kanpur-cyber-security-course",
    pill: "from-violet-500 to-blue-500", dot: "#8B5CF6", card: "from-violet-600 to-blue-500",
  },
  {
    num: "02", icon: BookOpen, name: "Courses",
    tagline: "Structure your learning journey",
    description: "Structured, self-paced programs built around AI, technology, and emerging skills. Industry-aligned curriculum from beginner to advanced.",
    description2: "Certificate programs, IIT collaborations, and live tracks — all in one place.",
    href: "/courses",
    pill: "from-blue-500 to-indigo-600", dot: "#3B82F6", card: "from-blue-600 to-indigo-600",
  },
  {
    num: "03", icon: Wrench, name: "Workshops",
    tagline: "Hands-on, expert-led sessions",
    description: "Short intensive sessions focused on practical skill building with industry experts. Learn by doing.",
    description2: "Small cohorts, live practice, and immediate real-world results.",
    href: "/ai-workshops",
    pill: "from-indigo-500 to-violet-600", dot: "#6366F1", card: "from-indigo-600 to-violet-600",
  },
  {
    num: "04", icon: Video, name: "Webinars",
    tagline: "Learn from anywhere, anytime",
    description: "Live online sessions on trending topics — AI, innovation, career growth. Interactive Q&A with speakers in real time.",
    description2: "Free and premium sessions with recorded replays available.",
    href: "/webinars",
    pill: "from-violet-400 to-blue-400", dot: "#A78BFA", card: "from-violet-500 to-blue-400",
  },
];

// The only interactive part of the Academy page — kept as its own client
// component so the rest of the page can render on the server.
export default function AcademyPillars() {
  const [active, setActive] = useState(0);
  const pillar = PILLARS[active];

  return (
    <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
      {/* Info card */}
      <AnimateIn key={active} delay={0} direction="fade" className="w-full lg:w-[370px] shrink-0">
        <div className={`rounded-3xl p-8 bg-gradient-to-br ${pillar.card} text-white shadow-xl`}>
          <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Pillar {pillar.num}</p>
          <h3 className="text-[2rem] font-black leading-tight mb-1">{pillar.name}</h3>
          <p className="text-white/70 text-sm font-medium mb-5">{pillar.tagline}</p>
          <div className="h-px bg-white/20 mb-5" />
          <p className="text-white/85 text-[0.92rem] leading-relaxed mb-3">{pillar.description}</p>
          <p className="text-white/60 text-[0.88rem] leading-relaxed mb-8">{pillar.description2}</p>
          <Link href={pillar.href} className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors duration-200">
            Explore {pillar.name} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </AnimateIn>

      {/* Bar chart + dots */}
      <div className="flex-1 flex flex-col items-center w-full">
        <div className="flex items-end justify-center gap-6 sm:gap-10 lg:gap-12">
          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            const isActive = i === active;
            return (
              <div key={i} className="flex flex-col items-center cursor-pointer" onClick={() => setActive(i)}>
                <div className={`w-[60px] sm:w-[68px] rounded-full bg-gradient-to-b ${p.pill} flex items-end justify-center pb-5 transition-all duration-500 ease-in-out ${isActive ? "h-[260px] sm:h-[300px] opacity-100 shadow-lg" : "h-[160px] sm:h-[200px] opacity-30 hover:opacity-50"}`}>
                  <Icon className="w-6 h-6 text-white/80" />
                </div>
                <span className={`mt-3 text-[11px] font-bold transition-colors duration-300 ${isActive ? "text-violet-600" : "text-gray-400"}`}>
                  {p.name.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
        <div className="relative flex items-center justify-center gap-6 sm:gap-10 lg:gap-12 mt-4 px-2 w-full">
          <div className="absolute h-px bg-gray-200 inset-x-0" />
          {PILLARS.map((p, i) => (
            <button key={i} onClick={() => setActive(i)}
              className="relative z-10 w-[18px] h-[18px] rounded-full transition-all duration-300 outline-none"
              style={{ background: i === active ? p.dot : "#D1D5DB", boxShadow: i === active ? `0 0 16px ${p.dot}88` : "none", transform: i === active ? "scale(1.35)" : "scale(1)" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
