import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function CtaSection({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section className={`${bg} px-6 py-24 md:px-[60px]`}>
      <div className="max-w-2xl mx-auto text-center">
        <AnimateIn delay={0} direction="fade"><LineBadge className="justify-center mb-5">Stay in the Loop</LineBadge></AnimateIn>
        <AnimateIn delay={100} direction="fade">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Don&apos;t miss{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              the next one
            </span>
          </h2>
        </AnimateIn>
        <AnimateIn delay={200} direction="fade">
          <p className="text-base text-gray-500 leading-relaxed mb-10">
            Join thousands of curious minds who&apos;ve already made MindLyft AI their go-to for growth. Drop your email and we&apos;ll save you a seat.
          </p>
        </AnimateIn>
        <AnimateIn delay={300} direction="fade">
          <div className="flex flex-wrap justify-center gap-3">
            <input
              type="email"
              placeholder="your@email.com"
              aria-label="Email address"
              className="min-w-[220px] flex-1 max-w-xs rounded-xl border border-gray-200 bg-white px-5 py-3 text-sm text-gray-900 outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 placeholder:text-gray-400 shadow-sm"
            />
            <button className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-bold text-white hover:opacity-90 transition shadow-lg shadow-violet-200 whitespace-nowrap">
              Get Notified ✨
            </button>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
