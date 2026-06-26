import { BarChart2, TrendingUp, Monitor, Brain, FolderKanban, UserCheck } from "lucide-react";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

const OUTCOMES = [
  { icon: BarChart2,    title: "Clean and model real datasets",  desc: "Take messy, real-world data through cleaning, transformation, documentation, and exploratory analysis using Python and SQL.", accent: "#8B5CF6", bg: "#f5f3ff", border: "#e9d5ff" },
  { icon: TrendingUp,   title: "Build forecasting & ML models",  desc: "Train, validate, and tune regression and classification models, and explain their results to non-technical stakeholders.",   accent: "#3B82F6", bg: "#eff6ff", border: "#bfdbfe" },
  { icon: Monitor,      title: "Ship a live BI dashboard",       desc: "Design and deploy an interactive Power BI / Tableau dashboard that a hiring manager could use on day one.",                   accent: "#6366F1", bg: "#eef2ff", border: "#c7d2fe" },
  { icon: Brain,        title: "Apply AI tools to analysis",     desc: "Use LLM-assisted workflows to speed up data exploration, documentation, and insight generation responsibly.",                  accent: "#7C3AED", bg: "#faf5ff", border: "#ddd6fe" },
  { icon: FolderKanban, title: "Structure a complete project",   desc: "Scope, plan, and document a data project end-to-end the way it's actually run inside a company.",                              accent: "#2563EB", bg: "#eff6ff", border: "#bfdbfe" },
  { icon: UserCheck,    title: "Interview like an analyst",      desc: "Walk through your portfolio confidently, answer case-study questions, and negotiate your first offer.",                        accent: "#059669", bg: "#ecfdf5", border: "#a7f3d0" },
];

export default function CourseOutcomes({ bg = "bg-violet-50" }: { bg?: string }) {
  const [featured, ...rest] = OUTCOMES;

  return (
    <section className={`${bg} px-6 md:px-[60px] py-24`}>
      <div className="max-w-6xl mx-auto">

        <AnimateIn delay={0} direction="fade"><LineBadge className="justify-center mb-6">Course Outcomes</LineBadge></AnimateIn>
        <AnimateIn delay={100} direction="fade">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight text-center mb-4">
            What you&apos;ll actually{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              be able to do
            </span>
          </h2>
        </AnimateIn>
        <AnimateIn delay={200} direction="fade">
          <p className="text-base text-gray-500 text-center leading-relaxed max-w-lg mx-auto mb-14">
            Not just concepts you&apos;ve heard of — skills you can put directly to work, demonstrated through real deliverables in your portfolio.
          </p>
        </AnimateIn>

        {/* Bento layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Featured card — spans 2 cols */}
          <AnimateIn delay={300} direction="fade">
            <div
              className="group relative rounded-3xl p-8 overflow-hidden hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 h-full lg:col-span-2"
              style={{ background: featured.bg, border: `1.5px solid ${featured.border}` }}
            >
              <div className="absolute -right-4 -bottom-6 opacity-[0.06] group-hover:scale-110 transition-transform duration-500">
                <featured.icon className="w-40 h-40" style={{ color: featured.accent }} />
              </div>
              <div className="relative z-10">
                <div className="h-1 w-10 rounded-full mb-5" style={{ background: featured.accent }} />
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: `${featured.accent}20` }}>
                  <featured.icon className="w-6 h-6" style={{ color: featured.accent }} />
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-2">{featured.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-sm">{featured.desc}</p>
              </div>
            </div>
          </AnimateIn>

          {/* 5 smaller cards */}
          {rest.map(({ icon: Icon, title, desc, accent, bg: cardBg, border }, i) => (
            <AnimateIn key={title} delay={380 + i * 70} direction="fade">
              <div
                className="group relative rounded-3xl p-6 overflow-hidden hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 h-full"
                style={{ background: cardBg, border: `1.5px solid ${border}` }}
              >
                <div className="absolute -right-3 -bottom-4 opacity-[0.05] group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-24 h-24" style={{ color: accent }} />
                </div>
                <div className="relative z-10">
                  <div className="h-1 w-8 rounded-full mb-4" style={{ background: accent }} />
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: `${accent}20` }}>
                    <Icon className="w-4 h-4" style={{ color: accent }} />
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
