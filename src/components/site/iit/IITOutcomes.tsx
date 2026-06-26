import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

const STATS = [
  { num: "82%",   title: "Career advancement within 6 months",      desc: "Over 8 in 10 IIT program alumni report a promotion, role change, or new job within 6 months of completing their program.",                                                                   accent: "#8B5CF6", bg: "#f5f3ff", border: "#e9d5ff" },
  { num: "3×",    title: "More interview calls with IIT credential", desc: "Alumni report significantly more recruiter responses and interview shortlisting after adding the IIT-affiliated certificate to LinkedIn.",                                                              accent: "#3B82F6", bg: "#eff6ff", border: "#bfdbfe" },
  { num: "₹18L+", title: "Average salary of placed alumni",         desc: "IIT program alumni placed in AI and ML roles report average annual compensation of ₹18 lakh — up from ₹9–12L before the program.",                                                                    accent: "#6366F1", bg: "#eef2ff", border: "#c7d2fe" },
  { num: "100%",  title: "Certificate completion rate",             desc: "Every learner who completes the program requirements receives both certificates — no hidden criteria, no surprise rejections.",                                                                         accent: "#7C3AED", bg: "#faf5ff", border: "#ddd6fe" },
  { num: "20+",   title: "Companies that have hired our alumni",    desc: "From AI-first startups to enterprise tech companies and BFSI firms — our IIT alumni are placed across industries and cities.",                                                                          accent: "#2563EB", bg: "#eff6ff", border: "#bfdbfe" },
  { num: "4.9★",  title: "Average program rating from learners",   desc: "Consistently the highest-rated programs at MindlyftAI — learners cite mentor quality, curriculum depth, and career impact as top reasons.",                                                           accent: "#059669", bg: "#ecfdf5", border: "#a7f3d0" },
];

export default function IITOutcomes({ bg = "bg-white" }: { bg?: string }) {
  const [featured, ...rest] = STATS;

  return (
    <section className={`${bg} px-6 py-24 md:px-[60px]`}>
      <div className="max-w-6xl mx-auto">

        <AnimateIn delay={0} direction="fade"><LineBadge className="justify-center mb-6">Proven Outcomes</LineBadge></AnimateIn>
        <AnimateIn delay={100} direction="fade">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight text-center mb-4">
            What happens after you complete{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              an IIT program
            </span>
          </h2>
        </AnimateIn>
        <AnimateIn delay={200} direction="fade">
          <p className="text-base text-gray-500 text-center leading-relaxed max-w-md mx-auto mb-14">
            Numbers from our IIT program alumni — tracked 6 months after completion.
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
              <p className="absolute -right-4 -bottom-6 text-[130px] font-black opacity-[0.05] leading-none select-none" style={{ color: featured.accent }}>
                {featured.num}
              </p>
              <div className="relative z-10">
                <div className="h-1 w-10 rounded-full mb-5" style={{ background: featured.accent }} />
                <p className="text-7xl font-extrabold mb-4 transition-transform duration-300 group-hover:scale-105 origin-left" style={{ color: featured.accent }}>
                  {featured.num}
                </p>
                <h4 className="text-xl font-bold text-gray-900 mb-2">{featured.title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed max-w-sm">{featured.desc}</p>
              </div>
            </div>
          </AnimateIn>

          {/* 5 smaller cards */}
          {rest.map(({ num, title, desc, accent, bg: cardBg, border }, i) => (
            <AnimateIn key={title} delay={380 + i * 70} direction="fade">
              <div
                className="group relative rounded-3xl p-6 overflow-hidden hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 h-full"
                style={{ background: cardBg, border: `1.5px solid ${border}` }}
              >
                <div className="absolute -right-3 -bottom-4 text-[80px] font-black opacity-[0.05] leading-none select-none" style={{ color: accent }}>
                  {num}
                </div>
                <div className="relative z-10">
                  <div className="h-1 w-8 rounded-full mb-4" style={{ background: accent }} />
                  <p className="text-4xl font-extrabold mb-2 group-hover:scale-105 transition-transform duration-300 origin-left" style={{ color: accent }}>{num}</p>
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
