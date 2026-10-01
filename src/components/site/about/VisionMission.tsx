import { AnimateIn } from "@/components/ui/AnimateIn";
import { LineBadge } from "@/components/ui/LineBadge";
import { Subheading } from "@/components/ui/Subheading";
import { Section } from "@/components/ui/Section";

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
    <Section bg={bg}>
      <div className="text-center mb-10 md:mb-16">
                <AnimateIn delay={0} direction="right"><LineBadge className="justify-center mb-5"> Our Purpose</LineBadge></AnimateIn>
                <AnimateIn delay={100} direction="right">
                  <Subheading
                    as="h2"
                    centered
                    color="violet"
                    size="xl"
                    className="leading-tight mb-4"
                    text="Vision &"
                    highlight="Mission"
                  />
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
              To make artificial intelligence practical, accessible and genuinely
              useful — for the people learning it and the organisations adopting it.
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
                <span>Teach AI through building, not memorising</span>
              </li>

              <li className="flex gap-3">
                <span className="text-violet-500">✓</span>
                <span>Keep curriculum aligned with what the industry actually hires for</span>
              </li>

              <li className="flex gap-3">
                <span className="text-violet-500">✓</span>
                <span>Build secure, scalable AI solutions that deliver measurable results</span>
              </li>

              <li className="flex gap-3">
                <span className="text-violet-500">✓</span>
                <span>
                  Make quality AI education available outside the usual metro and
                  elite-institution routes
                </span>
              </li>
            </ul>
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
    </Section>
  );
}