import { sessions } from "./content";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function Sessions({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section id="sessions" className={`${bg} px-6 py-24 md:px-[60px]`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <AnimateIn delay={0} direction="fade"><LineBadge className="justify-center mb-5">What We Offer</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="fade">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Sessions for every{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                stage of your journey
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="fade">
            <p className="text-base text-gray-500 leading-relaxed max-w-md mx-auto">
              Whether you&apos;re just starting out or looking to sharpen your edge, we&apos;ve got a session for you.
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {sessions.map((s, i) => {
            const isUpcoming = s.status === "Upcoming";
            return (
              <AnimateIn key={s.title} delay={300 + i * 70} direction="up">
                <div className="group relative overflow-hidden rounded-3xl border border-gray-100 bg-white p-7 hover:-translate-y-1.5 hover:shadow-xl hover:border-violet-200 transition-all duration-300 h-full">
                  <div className="absolute inset-x-0 top-0 h-1 rounded-t-3xl bg-gradient-to-r from-violet-600 to-blue-500" />
                  <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-violet-100 opacity-0 group-hover:opacity-30 group-hover:scale-150 transition-all duration-500" />
                  <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-2xl text-2xl ${s.iconBg}`}>
                    {s.icon}
                  </div>
                  <span className={`mb-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                    isUpcoming ? "bg-emerald-50 text-emerald-600" : "bg-violet-50 text-violet-600"
                  }`}>
                    <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    {s.status}
                  </span>
                  <h3 className="mb-2 text-base font-bold text-gray-900">{s.title}</h3>
                  <p className="text-sm leading-relaxed text-gray-500 mb-5">{s.description}</p>
                  <div className="flex flex-wrap items-center gap-2 border-t border-gray-100 pt-4 mt-auto">
                    {s.meta.map((m) => (
                      <span key={m} className="rounded-full bg-gray-50 px-3 py-1 text-xs font-medium text-gray-500">
                        {m}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimateIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}
