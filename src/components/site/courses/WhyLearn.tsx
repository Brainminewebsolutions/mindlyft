import { BookOpen, Hammer, Users, Briefcase } from "lucide-react";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

const FEATURES = [
  { icon: BookOpen,  title: "Industry-Relevant Curriculum", desc: "Built with practitioners and updated every cohort to track what employers actually hire for.", accent: "#8B5CF6", bg: "#f5f3ff" },
  { icon: Hammer,    title: "Hands-On Projects",            desc: "Every module ends in a real build — not a quiz — so your portfolio grows as you learn.",  accent: "#6366F1", bg: "#eef2ff" },
  { icon: Users,     title: "Expert Mentors",               desc: "Learn directly from engineers and researchers working in AI and security today.",           accent: "#3B82F6", bg: "#eff6ff" },
  { icon: Briefcase, title: "Career-Focused Learning",      desc: "Resume reviews, mock interviews, and hiring-partner intros built into every track.",        accent: "#059669", bg: "#ecfdf5" },
];

export default function WhyLearn({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section className={`${bg} px-6 md:px-[60px] py-24 overflow-hidden`}>
      <div className="max-w-6xl mx-auto">

        <div className="mb-14 text-center md:text-left">
          <AnimateIn delay={0} direction="left"><LineBadge className="mb-5">Why Learn With Us</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="left">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Built like a university.{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                Run like a startup.
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="left">
            <p className="text-base text-gray-500 leading-relaxed max-w-xl mx-auto md:mx-0">
              The structure of academic rigor, the speed of an applied lab.
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {FEATURES.map(({ icon: Icon, title, desc, accent, bg: cardBg }, i) => (
            <AnimateIn key={title} delay={300 + i * 80} direction="up">
              <div
                className="group relative rounded-3xl p-6 overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 h-full"
                style={{ background: cardBg }}
              >
                <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full opacity-15 group-hover:scale-150 transition-transform duration-500" style={{ background: accent }} />
                <div className="h-1 w-10 rounded-full mb-5" style={{ background: accent }} />
                <div className="relative z-10">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl group-hover:scale-110 transition-transform duration-300" style={{ background: `${accent}20` }}>
                    <Icon className="w-5 h-5" style={{ color: accent }} />
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-2">{title}</h4>
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
