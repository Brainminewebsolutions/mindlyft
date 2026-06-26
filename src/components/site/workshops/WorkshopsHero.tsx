import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function WorkshopsHero({ count = 0 }: { count?: number }) {
  return (
    <section className="relative h-screen flex items-center overflow-hidden px-6 pt-28 pb-16 md:px-[60px]">
      {/* Soft gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-violet-50 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left — content */}
        <div>
          <AnimateIn delay={0}>
            <LineBadge className="mb-6">Hands-On Workshops</LineBadge>
          </AnimateIn>
          <AnimateIn delay={100}>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
              Build skills by{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                doing, not watching
              </span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={200}>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md mb-10">
              Practical, instructor-led sessions designed to sharpen real-world skills.{" "}
              {count > 0 && <span className="font-semibold text-violet-600">{count} workshops available.</span>}
            </p>
          </AnimateIn>
          <AnimateIn delay={300}>
            <div className="flex flex-wrap gap-3">
              <Link
                href="#workshops"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition shadow-lg shadow-violet-200"
              >
                Browse Workshops <ArrowDown className="w-4 h-4" />
              </Link>
            </div>
          </AnimateIn>
        </div>

        {/* Right — image */}
        <AnimateIn delay={200} direction="right">
          <div className="relative w-full h-[420px] lg:h-[520px]">
            <Image
              src="/assets/img/hero/hero-img-3.png"
              alt="Workshop"
              fill
              className="object-contain object-center drop-shadow-xl"
              priority
            />
          </div>
        </AnimateIn>

      </div>
    </section>
  );
}
