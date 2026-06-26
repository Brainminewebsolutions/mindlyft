import Link from "next/link";
import { heroStats } from "./content";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function Hero() {
  return (
    <section
      className="relative h-screen flex items-center overflow-hidden px-6 pb-16 pt-28 md:px-[60px]"
      style={{
        backgroundImage: "url('/assets/img/hero/hero-bg-3.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30 pointer-events-none" />

      <div className="relative z-10 max-w-2xl">
        <AnimateIn delay={0}>
          <LineBadge className="mb-6">Live &amp; On-Demand Webinars</LineBadge>
        </AnimateIn>

        <AnimateIn delay={100}>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
            Learn, Grow &amp;{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              Level Up Together
            </span>
          </h1>
        </AnimateIn>

        <AnimateIn delay={200}>
          <p className="text-lg text-gray-600 leading-relaxed max-w-md mb-10">
            Real sessions, real insights — from knowledge deep-dives to career
            guidance, our community webinars are built to spark your next big breakthrough.
          </p>
        </AnimateIn>

        <AnimateIn delay={300}>
          <div className="flex flex-wrap gap-3 mb-14">
            <Link
              href="#sessions"
              className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition shadow-lg shadow-violet-200"
            >
              Browse Sessions
            </Link>
            <Link
              href="#archive"
              className="rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-gray-700 hover:border-violet-300 hover:text-violet-600 transition"
            >
              Watch Highlights
            </Link>
          </div>
        </AnimateIn>

        <AnimateIn delay={400}>
          <div className="flex flex-wrap gap-x-10 gap-y-5">
            {heroStats.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                  {stat.num}
                </div>
                <div className="text-xs font-medium text-gray-400 mt-0.5">{stat.label}</div>
              </div>
            ))}
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
