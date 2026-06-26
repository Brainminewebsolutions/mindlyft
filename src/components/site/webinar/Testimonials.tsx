import { testimonials } from "./content";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function Testimonials({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section className={`${bg} px-6 py-24 md:px-[60px]`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <AnimateIn delay={0} direction="fade"><LineBadge className="justify-center mb-5">Community Voices</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="fade">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              What our community{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                says
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="fade">
            <p className="text-base text-gray-500 leading-relaxed max-w-md mx-auto">
              Real feedback from real people who showed up, engaged, and walked away with something valuable.
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <AnimateIn key={t.name} delay={300 + i * 80} direction="up">
              <div className="rounded-3xl border border-gray-100 bg-white p-7 hover:-translate-y-1.5 hover:shadow-lg hover:border-violet-200 transition-all duration-300 h-full flex flex-col">
                <div className="mb-4 text-base tracking-[2px] text-amber-400">★★★★★</div>
                <blockquote className="mb-5 text-sm italic leading-relaxed text-gray-500 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-white bg-gradient-to-br from-violet-600 to-blue-500">
                    {t.initials}
                  </div>
                  <div>
                    <strong className="block text-sm font-bold text-gray-900">{t.name}</strong>
                    <span className="text-xs text-gray-400">{t.role}</span>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
