import { archiveItems } from "./content";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function Archive({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section id="archive" className={`${bg} px-6 py-24 md:px-[60px]`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <AnimateIn delay={0} direction="fade"><LineBadge className="justify-center mb-5">Catch Up</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="fade">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Missed a session?{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                It&apos;s still here.
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="fade">
            <p className="text-base text-gray-500 leading-relaxed max-w-md mx-auto">
              Every webinar gets recorded — browse the archive and watch on your own time.
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {archiveItems.map((item, i) => (
            <AnimateIn key={item.title} delay={300 + i * 70} direction="up">
              <div className="group overflow-hidden rounded-3xl border border-gray-100 bg-white hover:-translate-y-1.5 hover:border-violet-200 hover:shadow-xl transition-all duration-300">
                <div className={`relative flex h-36 items-center justify-center ${item.thumb}`}>
                  <span className="absolute left-3 top-3 rounded-full bg-black/35 px-2.5 py-1 text-[0.72rem] font-semibold text-white backdrop-blur-sm">
                    {item.tag}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-violet-600 shadow-md group-hover:scale-110 transition-transform text-base">
                    ▶
                  </div>
                </div>
                <div className="px-6 pb-6 pt-5">
                  <h4 className="mb-3 text-sm font-bold text-gray-900 leading-snug group-hover:text-violet-600 transition-colors">{item.title}</h4>
                  <div className="flex items-center gap-3 border-t border-gray-100 pt-3.5 text-xs text-gray-400">
                    <span className="rounded-full bg-gray-50 px-3 py-1">👁 {item.views}</span>
                    <span className="rounded-full bg-gray-50 px-3 py-1">⏱ {item.duration}</span>
                  </div>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={600} direction="fade">
          <div className="mt-10 text-center">
            <button className="rounded-xl border-2 border-gray-200 bg-white px-8 py-3 text-sm font-semibold text-gray-700 hover:border-violet-400 hover:text-violet-600 transition">
              Browse Full Archive →
            </button>
          </div>
        </AnimateIn>
      </div>
    </section>
  );
}
