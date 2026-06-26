import { Lightbulb, TrendingUp } from "lucide-react";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

const CARDS = [
  {
    icon: Lightbulb,
    title: "Academic Excellence Meets Industry Relevance",
    desc: "Our programs are designed to bridge the gap between traditional education and rapidly evolving industry requirements. Learners gain practical knowledge that can be applied immediately in professional environments.",
    accent: "#8B5CF6", bg: "#f5f3ff",
  },
  {
    icon: TrendingUp,
    title: "Designed for Career Growth",
    desc: "Whether you are a student, working professional, entrepreneur, or aspiring technologist, our programs are structured to help you build expertise in high-growth technology domains.",
    accent: "#3B82F6", bg: "#eff6ff",
  },
];

export default function IITEcosystem({ bg = "bg-violet-50" }: { bg?: string }) {
  return (
    <section className={`${bg} px-6 py-24 md:px-[60px] overflow-hidden`}>
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <AnimateIn delay={0} direction="right"><LineBadge className="justify-center mb-5">The Ecosystem</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="right">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Learn From an Ecosystem <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                Built for Innovation
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="right">
            <p className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Mindlyft AI collaborates with C3iHub IIT Kanpur to create high-impact learning experiences that combine academic excellence, industry relevance, and practical skill development.
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {CARDS.map(({ icon: Icon, title, desc, accent, bg: cardBg }, i) => (
            <AnimateIn key={title} delay={300 + i * 100} direction="right">
              <div
                className="group relative rounded-3xl p-8 overflow-hidden hover:-translate-y-2 hover:shadow-xl transition-all duration-300 h-full"
                style={{ background: cardBg }}
              >
                {/* Big background icon watermark */}
                <div className="absolute -bottom-6 -right-6 opacity-[0.06] group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-40 h-40" style={{ color: accent }} />
                </div>
                {/* Top accent line */}
                <div className="h-1 w-12 rounded-full mb-6" style={{ background: accent }} />
                <div className="relative z-10">
                  <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl group-hover:scale-110 transition-transform duration-300" style={{ background: `${accent}20` }}>
                    <Icon className="w-6 h-6" style={{ color: accent }} />
                  </div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3">{title}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed">{desc}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  );
}
