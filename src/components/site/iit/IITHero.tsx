import Link from "next/link";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function IITHero({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden px-6 pt-28 pb-16 md:px-[60px]"
      style={{
        backgroundImage: "url('/assets/img/hero/hero-bg-3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Light overlay — keeps brand light-theme */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-2xl">
        <AnimateIn delay={0}>
          <LineBadge className="mb-6">IIT Kanpur · C3iHub · Mindlyft AI</LineBadge>
        </AnimateIn>
        <AnimateIn delay={100}>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
            Your roadmap to a career{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              shaped by IIT
            </span>
          </h1>
        </AnimateIn>
        <AnimateIn delay={200}>
          <p className="text-lg text-gray-600 leading-relaxed max-w-xl mb-10">
            Explore careers, placement stats, key facts, and opportunities available to
            students through India&apos;s most prestigious technical institute — IIT Kanpur.
          </p>
        </AnimateIn>
        <AnimateIn delay={300}>
          <div className="flex flex-wrap gap-3">
            <Link
              href="#courses"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition shadow-lg shadow-violet-200"
            >
              Explore Opportunities
            </Link>
            <Link
              href="#placement"
              className="rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-gray-700 hover:border-violet-300 hover:text-violet-600 transition"
            >
              View Placement Data
            </Link>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
