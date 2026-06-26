import { steps } from "./content";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

export default function HowItWorks({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section id="how" className={`${bg} px-6 py-24 md:px-[60px]`}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <AnimateIn delay={0} direction="flip"><LineBadge className="justify-center mb-5">How It Works</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="flip">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              Four steps to your{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                next big insight
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="flip">
            <p className="text-base text-gray-500 leading-relaxed max-w-md mx-auto">
              No complicated setup, no subscription traps. Just sign up, show up, and grow.
            </p>
          </AnimateIn>
        </div>

        <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <AnimateIn key={step.num} delay={300 + i * 90} direction="up">
              <div className="group relative rounded-3xl border border-gray-100 bg-white p-7 text-center hover:-translate-y-1.5 hover:shadow-lg hover:border-violet-200 transition-all duration-300 h-full">
                {i < steps.length - 1 && (
                  <span className="absolute -right-3.5 top-12 hidden text-violet-200 font-bold text-xl lg:block z-10">→</span>
                )}
                <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-500 text-lg font-extrabold text-white shadow-lg shadow-violet-200 group-hover:scale-110 transition-transform duration-300">
                  {step.num}
                </div>
                <h4 className="mb-2 text-sm font-bold text-gray-900">{step.title}</h4>
                <p className="text-xs leading-relaxed text-gray-500">{step.description}</p>
              </div>
            </AnimateIn>
          ))}
        </div>
      </div>
    </section>
  );
}
