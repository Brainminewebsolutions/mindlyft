import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function CoursesHero() {
  return (
    <section className="relative h-screen flex items-center overflow-hidden px-6 pt-28 pb-16 md:px-[60px]">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-violet-50 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left — content */}
        <div>
          <AnimateIn delay={0}>
            <LineBadge className="mb-6">India&apos;s fastest-growing skill platform</LineBadge>
          </AnimateIn>
          <AnimateIn delay={100}>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
              Learn skills that get you{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                hired
              </span>{" "}
              —<br className="hidden sm:block" />
              not just certified
            </h1>
          </AnimateIn>
          <AnimateIn delay={200}>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md mb-10">
              Project-based courses taught by industry professionals. From zero to
              job-ready in weeks, not years.
            </p>
          </AnimateIn>
          <AnimateIn delay={300}>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#courses"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition shadow-lg shadow-violet-200"
              >
                Browse Courses <ArrowDown className="w-4 h-4" />
              </Link>
              <Link
                href="/webinar"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 border border-gray-200 bg-white px-6 py-3 rounded-xl hover:border-violet-400 hover:text-violet-600 transition-all"
              >
                How it works <span className="text-base">↗</span>
              </Link>
            </div>
          </AnimateIn>
        </div>

        {/* Right — image */}
        <AnimateIn delay={200} direction="right">
          <div className="relative w-full h-[420px] lg:h-[520px]">
            <Image
              src="/assets/img/projects/single-project-1.jpg"
              alt="Courses"
              fill
              className="object-cover object-center rounded-3xl shadow-2xl"
              priority
            />
          </div>
        </AnimateIn>

      </div>
    </section>
  );
}
