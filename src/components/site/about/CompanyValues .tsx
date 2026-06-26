import {
  Lightbulb,
  ShieldCheck,
  Users,
  TrendingUp,
  Sparkles,
  Brain,
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "We explore bold ideas and smarter ways to build.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "Transparency, trust, and ethical practice guide everything we do.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Brain,
    title: "Human Centred Technology",
    description:
      "We build tech that serves people, not just processes.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: Sparkles,
    title: "Outcome-Driven",
    description:
      "We focus on solutions that deliver measurable results.",
    color: "from-indigo-500 to-violet-500",
  },
];

export default function CompanyValues({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section className={`py-24 px-6 ${bg}`}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-[4px] uppercase text-violet-600">
            Our Values
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-gray-900">
            The Principles That Drive Us
          </h2>

          <p className="mt-6 text-lg text-gray-600 leading-8">
            We combine bold innovation, responsible AI practices, and a
            relentless focus on human impact to create technology that delivers
            meaningful results.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="group bg-white rounded-3xl p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  {value.title}
                </h3>

                <p className="text-gray-600 leading-7">
                  {value.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}