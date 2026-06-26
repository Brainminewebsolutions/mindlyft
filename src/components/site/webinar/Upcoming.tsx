import { upcomingItems } from "./content";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function Upcoming({ bg = "bg-violet-50" }: { bg?: string }) {
  return (
    <section id="upcoming" className={`${bg} px-6 py-24 md:px-[60px]`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

        <div>
          <AnimateIn delay={0} direction="left"><LineBadge className="mb-5">What&apos;s Next</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="left">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Upcoming{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                Sessions
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="left">
            <p className="text-base text-gray-500 leading-relaxed max-w-sm">
              Save your spot before they fill up — our sessions sell out fast.
            </p>
          </AnimateIn>
        </div>

        <div className="flex flex-col gap-4">
          {upcomingItems.map((item, i) => (
            <AnimateIn key={item.title} delay={200 + i * 80} direction="right">
              <div className="group flex flex-wrap items-center gap-5 rounded-2xl border border-gray-100 bg-white px-6 py-5 hover:translate-x-1.5 hover:shadow-md hover:border-violet-200 transition-all duration-300">
                <div className="min-w-[60px] rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 px-2.5 py-3 text-center text-white shrink-0">
                  <div className="text-2xl font-extrabold leading-none">{item.day}</div>
                  <div className="text-[0.72rem] font-semibold uppercase tracking-wider opacity-85">{item.month}</div>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="mb-1 text-sm font-bold text-gray-900 group-hover:text-violet-600 transition-colors">{item.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{item.description}</p>
                </div>
                <button className="whitespace-nowrap rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 px-4 py-1.5 text-xs font-bold text-white hover:opacity-90 transition shrink-0">
                  Register →
                </button>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  );
}
