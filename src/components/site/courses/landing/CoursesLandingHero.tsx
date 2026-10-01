import Image from "next/image";
import Link from "next/link";
import { CalendarCheck, Download, PhoneCall } from "lucide-react";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function CoursesLandingHero() {
  return (
    <section className="relative flex items-center px-6 pt-32 pb-20 md:px-[60px]">
      <div className="absolute inset-0 bg-gradient-to-r from-white via-white/95 to-violet-50 pointer-events-none" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        <div className="text-center md:text-left">
          <AnimateIn delay={0}>
            <LineBadge className="mb-6">Joint certification with C3iHub, IIT Kanpur</LineBadge>
          </AnimateIn>
          <AnimateIn delay={100}>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-[1.15] tracking-tight mb-6">
              AI Courses in Pune —{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                IIT Kanpur-Backed
              </span>{" "}
              Certification Programs
            </h1>
          </AnimateIn>
          <AnimateIn delay={200}>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-10">
              AI certification courses in Pune spanning beginner foundations to advanced Agentic AI and
              AI Engineering. Every program is project-based, taught by practising industry professionals,
              and carries joint certification with C3iHub, IIT Kanpur. Fees are published openly on every
              course page — no enquiry form required to find out what you will pay. Choose offline batches
              at our Akurdi campus, or hybrid and online formats built around a working week.
            </p>
          </AnimateIn>
          <AnimateIn delay={300}>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <CalendarCheck className="h-4 w-4" /> Book a Free Demo Class
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors"
              >
                <Download className="h-4 w-4" /> Download Syllabus
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors"
              >
                <PhoneCall className="h-4 w-4" /> Talk to a Counsellor
              </Link>
            </div>
          </AnimateIn>
        </div>

        <AnimateIn delay={200} direction="right">
          <div className="relative w-full h-[360px] lg:h-[480px]">
            <Image
              src="/assets/img/projects/single-project-1.jpg"
              alt="Students in an AI course at the MindLyft AI Akurdi campus, Pune"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover object-center rounded-3xl shadow-2xl"
              priority
            />
          </div>
        </AnimateIn>

      </div>
    </section>
  );
}
