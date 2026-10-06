import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function WorkshopsHero() {
  return (
    <section className="relative min-h-screen flex items-center px-6 pt-28 pb-16 md:px-[60px] bg-blue-50">
      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left — content */}
        <div className="text-center md:text-left">
          <AnimateIn delay={0}>
            <LineBadge className="mb-6">Free · In person at Akurdi, Pune</LineBadge>
          </AnimateIn>
          <AnimateIn delay={100}>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
              Free AI workshops{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                in Pune
              </span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={200}>
            <div className="space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed max-w-xl mx-auto md:mx-0 mb-10">
              <p>
                Every few weeks we open our Akurdi classroom for a free, hands-on AI workshop. Two to three
                hours, taught in person by the same faculty who run our full programmes, with a laptop open
                in front of you rather than slides playing at you.
              </p>
              <p>
                No fee, no prior experience assumed, and no obligation to enrol in anything afterwards. Most
                people come to find out whether this field is for them before spending money on it. That is
                exactly what these sessions are for.
              </p>
            </div>
          </AnimateIn>
          <AnimateIn delay={300}>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <Link
                href="#upcoming"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                See upcoming dates <ArrowDown className="h-4 w-4" />
              </Link>
            </div>
          </AnimateIn>
        </div>

        {/* Right — image */}
        <AnimateIn delay={200} direction="right">
          <div className="relative w-full h-[420px] lg:h-[520px]">
            <Image
              src="/assets/img/hero/hero-img-3.png"
              alt="A free hands-on AI workshop at the MindLyft AI Akurdi campus, Pune"
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
