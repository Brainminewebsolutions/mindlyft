import { pathNodes } from "./content";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

const NODE_COLORS = ["#8B5CF6", "#6366F1", "#7C3AED", "#5B21B6", "#3B82F6"];

export default function LearningPath({ bg = "bg-violet-50" }: { bg?: string }) {
  return (
    <section id="path" className={`${bg} px-6 py-24 md:px-[60px]`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <AnimateIn delay={0} direction="flip"><LineBadge className="justify-center mb-5">Your Journey</LineBadge></AnimateIn>
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
              A free webinar is just the first step. Here&apos;s where it can lead, if you want to keep going.
            </p>
          </AnimateIn>
        </div>

        {/* Desktop: horizontal path */}
        <div className="hidden md:flex items-start justify-between gap-0 relative">
          <div className="absolute left-[8%] right-[8%] top-[28px] h-[2px] bg-gradient-to-r from-violet-300 to-blue-300 z-0" />
          {pathNodes.map((node, i) => (
            <AnimateIn key={node.title} delay={300 + i * 100} direction="flip">
              <div className="relative z-10 flex flex-col items-center text-center min-w-[140px] px-2">
                <div
                  className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white text-2xl shadow-lg mb-4"
                  style={{ background: NODE_COLORS[i] }}
                >
                  {node.emoji}
                </div>
                <h4 className="text-sm font-bold text-gray-900 mb-1.5">{node.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-2">{node.description}</p>
                {node.flag && (
                  <span className={`inline-block rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide ${
                    node.flag.tone === "start"
                      ? "bg-emerald-50 text-emerald-600"
                      : "bg-violet-100 text-violet-600"
                  }`}>
                    {node.flag.text}
                  </span>
                )}
              </div>
            </AnimateIn>
          ))}
        </div>

        {/* Mobile: vertical */}
        <div className="md:hidden flex flex-col gap-0">
          {pathNodes.map((node, i) => {
            const isLast = i === pathNodes.length - 1;
            return (
              <AnimateIn key={node.title} delay={300 + i * 80} direction="flip">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border-4 border-white text-xl shadow-md shrink-0" style={{ background: NODE_COLORS[i] }}>
                      {node.emoji}
                    </div>
                    {!isLast && <div className="w-px flex-1 mt-1 bg-gradient-to-b from-violet-300 to-blue-300" />}
                  </div>
                  <div className="pb-8 pt-1">
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{node.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed mb-2">{node.description}</p>
                    {node.flag && (
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-[0.68rem] font-bold uppercase tracking-wide ${
                        node.flag.tone === "start" ? "bg-emerald-50 text-emerald-600" : "bg-violet-100 text-violet-600"
                      }`}>
                        {node.flag.text}
                      </span>
                    )}
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
