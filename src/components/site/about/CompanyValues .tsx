import { AnimateIn } from "@/components/ui/AnimateIn";
import { LineBadge } from "@/components/ui/LineBadge";
import { Subheading } from "@/components/ui/Subheading";
import { Section } from "@/components/ui/Section";
import {
  Lightbulb,
  ShieldCheck,
  Users,
  TrendingUp,
} from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Practical over theoretical",
    description:
      "If it can't be built, deployed or demonstrated, it isn't finished.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description:
      "We say what our programmes include and what they don't. No inflated promises about jobs or outcomes.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Users,
    title: "People first",
    description:
      "Technology should serve the people using it, not the other way round.",
    color: "from-orange-500 to-amber-500",
  },
  {
    icon: TrendingUp,
    title: "Outcomes that can be measured",
    description:
      "For learners, that means a portfolio. For clients, it means a result they can point to.",
    color: "from-indigo-500 to-violet-500",
  },
];

export default function CompanyValues({ bg = "bg-white" }: { bg?: string }) {
  return (
    <Section bg={bg}>
      <div className="max-w-7xl mx-auto">
         <div className="text-center mb-10 md:mb-16">
          <AnimateIn delay={0} direction="right"><LineBadge className="justify-center mb-5"> Our Values</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="right">
            <Subheading
              as="h2"
              centered
              color="violet"
              size="xl"
              className="leading-tight mb-4"
              text="What we"
              highlight="stand for"
            />
          </AnimateIn>
        </div>

        

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <div
                key={value.title}
                className="group bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${value.color} flex items-center justify-center mb-6`}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
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
    </Section>
  );
}