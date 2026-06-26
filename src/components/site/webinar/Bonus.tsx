import { bonusItems } from "./content";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function Bonus({ bg = "bg-violet-50" }: { bg?: string }) {
  return (
    <section className={`${bg} px-6 py-24 md:px-[60px]`}>
      <div className="max-w-6xl mx-auto text-center">
        <AnimateIn delay={0} direction="fade"><LineBadge className="justify-center mb-5">Sign-Up Perks</LineBadge></AnimateIn>
        <AnimateIn delay={100} direction="fade">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
            Register and get{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              5 free resources
            </span>
          </h2>
        </AnimateIn>
        <AnimateIn delay={200} direction="fade">
          <p className="text-base text-gray-500 leading-relaxed max-w-md mx-auto mb-12">
            No catch — these land in your inbox the moment you register for any session.
          </p>
        </AnimateIn>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {bonusItems.map((item, i) => (
            <AnimateIn key={item.title} delay={300 + i * 70} direction="up">
              <div className="group rounded-3xl border border-gray-100 bg-white px-5 py-7 text-center hover:-translate-y-1.5 hover:shadow-lg hover:border-violet-200 transition-all duration-300">
                <div className="mb-3 text-3xl">{item.icon}</div>
                <h4 className="text-xs font-bold text-gray-800 leading-snug">{item.title}</h4>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn delay={600} direction="fade">
          <button className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-8 py-3.5 text-sm font-bold text-white hover:opacity-90 transition shadow-lg shadow-violet-200">
            Claim My Free Bonuses ✨
          </button>
          <p className="mt-4 text-sm text-gray-400">
            Delivered instantly after registration — no spam, ever.
          </p>
        </AnimateIn>
      </div>
    </section>
  );
}
