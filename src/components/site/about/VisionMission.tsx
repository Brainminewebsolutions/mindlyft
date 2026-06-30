import { AnimateIn } from "@/components/ui/AnimateIn";
import { LineBadge } from "@/components/ui/LineBadge";

export default function VisionMission({ bg = "bg-white" }: { bg?: string }) {
    const stats = [
  {
    value: "100+",
    label: "Industries Served",
  },
  {
    value: "50+",
    label: "AI Solutions Delivered",
  },
  {
    value: "80+",
    label: "Global Clients",
  },
];

  return (
    <section className={`${bg} py-10 px-6`}>
      <div className="text-center mb-16">
                <AnimateIn delay={0} direction="right"><LineBadge className="justify-center mb-5"> Our Purpose</LineBadge></AnimateIn>
                <AnimateIn delay={100} direction="right">
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
                    Vision &&nbsp;
                    <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                      Mission
                    </span>
                  </h2>
                </AnimateIn>
              </div>
      <div className="max-w-6xl mx-auto">
        
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Vision */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-violet-100">
            <div className="text-5xl mb-5">🚀</div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Vision
            </h3>

            <p className="text-gray-600 leading-8">
              To transform how businesses think, act, and grow by making
              intelligent technology accessible, practical, and empowering.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-blue-100">
            <div className="text-5xl mb-5">🎯</div>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Mission
            </h3>

            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3">
                <span className="text-violet-500">✓</span>
                <span>
                  Simplify complex business challenges with intelligent
                  automation
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-violet-500">✓</span>
                <span>
                  Build secure, scalable, and user-centric AI solutions
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-violet-500">✓</span>
                <span>
                  Deliver products that drive measurable outcomes
                </span>
              </li>

              <li className="flex gap-3">
                <span className="text-violet-500">✓</span>
                <span>
                  Enable organisations to thrive in the age of smart technology
                </span>
              </li>
            </ul>

            <p className="mt-6 text-gray-600 leading-7 border-t pt-5">
              Every product we build aims to amplify human potential through
              practical AI innovation.
            </p>
          </div>
        </div>
        {/* Stats Section */}

      </div>
     <br />
      <div className="mb-16 rounded-[32px] bg-violet-50 px-8 py-12">
  <div className="grid grid-cols-1 md:grid-cols-3">
    {stats.map((stat, index) => (
      <div
        key={stat.label}
        className={`text-center py-4 ${
          index !== stats.length - 1
            ? "md:border-r border-violet-200"
            : ""
        }`}
      >
        <h3 className="text-5xl md:text-6xl font-bold text-black mb-4">
          {stat.value}
        </h3>

        <p className="text-gray-600 text-xl">
          {stat.label}
        </p>
      </div>
    ))}
  </div>
</div>
    </section>
  );
}