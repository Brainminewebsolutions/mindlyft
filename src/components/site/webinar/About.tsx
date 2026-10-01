import { aboutChips } from "./content";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function About({ bg = "bg-violet-50" }: { bg?: string }) {
  return (
    <section id="community" className={`${bg} px-6 py-24 md:px-[60px]`}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        <div className="text-center md:text-left">
          <AnimateIn delay={0} direction="left"><LineBadge className="mb-5">About Our Community</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="left">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Built by learners,{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                for learners
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="left">
            <p className="text-base text-gray-500 leading-relaxed mb-4">
              MindLyft AI started with a simple idea: great knowledge shouldn&apos;t
              be locked behind paywalls or jargon. We bring curious minds together
              with people who&apos;ve already been there — and create conversations
              that actually matter.
            </p>
          </AnimateIn>
          <AnimateIn delay={300} direction="left">
            <p className="text-base text-gray-400 leading-relaxed">
              From a small community to thousands of learners — our sessions
              have helped people land jobs, build products, make connections, and
              find their direction.
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-2 gap-3.5">
          {aboutChips.map((chip, i) => (
            <AnimateIn key={chip.label} delay={200 + i * 60} direction="right">
              <div className="group rounded-2xl border border-gray-100 bg-white px-5 py-5 hover:-translate-y-1 hover:shadow-md hover:border-violet-200 transition-all duration-300">
                <span className="mb-2 block text-2xl">{chip.emoji}</span>
                <span className="text-sm font-semibold text-gray-800">{chip.label}</span>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  );
}
