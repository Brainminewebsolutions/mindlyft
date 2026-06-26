import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

const STAGES = [
  { num: "01", title: "Foundation",  desc: "Master core concepts and build a strong technical base through our introductory modules.",                              accent: "#8B5CF6", bg: "#f5f3ff", border: "#e9d5ff" },
  { num: "02", title: "Expertise",   desc: "Deepen your skills with advanced projects and industry-standard tools covered in our curriculum.",                       accent: "#6366F1", bg: "#eef2ff", border: "#c7d2fe" },
  { num: "03", title: "Placement",   desc: "Secure your first role with our exclusive career counseling and professional networking support.",                        accent: "#3B82F6", bg: "#eff6ff", border: "#bfdbfe" },
  { num: "04", title: "Leadership",  desc: "Lead with confidence as you transition into senior roles and high-impact industry projects.",                             accent: "#059669", bg: "#ecfdf5", border: "#a7f3d0" },
];

export default function StudentSuccessPath({ bg = "bg-violet-50" }: { bg?: string }) {
  return (
    <section className={`${bg} px-6 md:px-[60px] py-24 overflow-hidden`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left */}
        <div>
          <AnimateIn delay={0} direction="left"><LineBadge className="mb-5">Success Path</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="left">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Student{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                Success Path
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="left">
            <p className="text-base text-gray-500 leading-relaxed max-w-md">
              Our structured curriculum is designed to accelerate your career trajectory from foundational knowledge to industry-ready expertise.
            </p>
          </AnimateIn>
        </div>

        {/* Right — stage cards */}
        <div className="flex flex-col gap-4">
          {STAGES.map(({ num, title, desc, accent, bg: cardBg, border }, i) => (
            <AnimateIn key={title} delay={200 + i * 100} direction="right">
              <div
                className="group relative flex gap-4 rounded-2xl p-5 overflow-hidden hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                style={{ background: cardBg, border: `1.5px solid ${border}` }}
              >
                {/* Left accent bar */}
                <div className="absolute left-0 top-4 bottom-4 w-1 rounded-r-full" style={{ background: accent }} />
                {/* Number */}
                <span className="text-2xl font-black opacity-15 shrink-0 pt-0.5 group-hover:opacity-25 transition-opacity duration-300" style={{ color: accent }}>{num}</span>
                {/* Content */}
                <div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1.5 group-hover:text-gray-700 transition-colors duration-300">{title}</h4>
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
