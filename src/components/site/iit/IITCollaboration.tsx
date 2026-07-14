import Image from "next/image";
import { GraduationCap, Shield, Briefcase, Zap } from "lucide-react";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SITE_CONFIG } from "@/constants/siteConfig";

const FEATURES = [
  { icon: GraduationCap, title: "Academic Excellence",     desc: "Learn through programs aligned with world-class academic standards.",                  accent: "#8B5CF6", bg: "#ede9fe" },
  { icon: Shield,        title: "Cybersecurity Expertise", desc: "Focused training in high-demand cybersecurity domains.",                                 accent: "#3B82F6", bg: "#eff6ff" },
  { icon: Briefcase,     title: "Industry-Relevant Skills",desc: "Practical learning designed to meet current industry requirements.",                      accent: "#6366F1", bg: "#eef2ff" },
  { icon: Zap,           title: "Future-Ready Learning",   desc: "Programs built around emerging technologies and future workforce needs.",                  accent: "#059669", bg: "#ecfdf5" },
];

export default function IITCollaboration({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section className={`${bg} px-6 py-24 md:px-[60px] overflow-hidden`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left — text */}
        <div>
          <AnimateIn delay={0} direction="left"><LineBadge className="mb-5">The Collaboration</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="left">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Why This <br />
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                Collaboration Matters
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="left">
            <p className="text-base text-gray-500 leading-relaxed mb-8">
              By bringing together Mindlyft AI&apos;s industry-facing learning platform and IIT Bombay C3iHub&apos;s research depth in cybersecurity, this partnership bridges academic excellence and industry-ready skills.
            </p>
          </AnimateIn>
          <AnimateIn delay={300} direction="left">
            <div className="flex flex-wrap items-center justify-center gap-4 px-6 py-4 rounded-2xl w-full sm:justify-start sm:gap-5">
              {/* MindLyft AI */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-20 h-20 shrink-0 sm:w-28 sm:h-28 lg:w-40 lg:h-40">
                  <Image src={SITE_CONFIG.logo1} alt="MindLyft AI" fill className="object-contain object-center" />
                </div>
                <span className="text-sm font-semibold text-gray-800 tracking-wide whitespace-nowrap sm:text-base lg:text-[20px]">{SITE_CONFIG.name}</span>
              </div>

              <span className="text-gray-200 text-xl select-none pb-4">×</span>

              {/* C3iHub */}
              <div className="flex flex-col items-center gap-2">
                <div className="relative w-20 h-20 shrink-0 sm:w-28 sm:h-28 lg:w-40 lg:h-40">
                  <Image src={SITE_CONFIG.c3iHubLogo} alt="C3iHub IIT Kanpur" fill className="object-contain object-center" />
                </div>
                <span className="text-sm font-semibold text-gray-800 tracking-wide whitespace-nowrap sm:text-base lg:text-[20px]">{SITE_CONFIG.C3ihub}</span>
              </div>
            </div>
          </AnimateIn>
        </div>

        {/* Right — 2×2 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc, accent, bg: cardBg }, i) => (
            <AnimateIn key={title} delay={200 + i * 80} direction="up">
              <div
                className="group relative rounded-3xl p-5 overflow-hidden hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 h-full"
                style={{ background: cardBg }}
              >
                {/* Decorative circle */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full opacity-20 transition-transform duration-500 group-hover:scale-150"
                  style={{ background: accent }} />
                <div className="relative z-10">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl group-hover:scale-110 transition-transform duration-300"
                    style={{ background: `${accent}25` }}>
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1.5">{title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  );
}
