import { AnimateIn } from "@/components/ui/AnimateIn";
import {
  Brain,
  Briefcase,
  Handshake,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Technology Leadership",
    description:
      "We work at the forefront of AI, ML, and automation.",
    featured: false,
  },
  {
    icon: Briefcase,
    title: "Business-First Thinking",
    description:
      "Every product is designed for real business impact.e.",
  },
  {
    icon: Handshake,
    title: "Collaborative Approach",
    description:
      "We partner closely with clients to co-create outcomes.",
  },
  {
    icon: BadgeCheck,
    title: "Reliable Delivery",
    description:
      "Secure, scalable solutions built for long-term success.",
  },
];

export default function WhyChooseMindlyft({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section className={`py-12 md:py-18 px-6 ${bg}`}>
      <div className="max-w-7xl mx-auto">
         <div className="text-center mb-10 md:mb-16">
          <AnimateIn delay={100} direction="right">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
               Mindlyft AI stands&nbsp;
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
               out because we blend
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="right">
            <p className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
                Cutting-edge artificial intelligence with human insight to deliver
            solutions that are smart, practical, and built for real-world
            impact.
            </p>
          </AnimateIn>
        </div>

       

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((item) => {
            const Icon = item.icon;

            return (
             <div
  key={item.title}
  className={`group rounded-[30px] p-8 text-center transition-all duration-300 hover:-translate-y-2 ${
    item.featured
      ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white"
      : "bg-gray-100 hover:bg-gradient-to-br hover:from-violet-500 hover:to-purple-600"
  }`}
>
                <div
                  className={`w-18 h-18 mx-auto mb-6 rounded-full flex items-center justify-center ${
                    item.featured
                      ? "bg-white/20"
                      : "bg-white"
                  }`}
                >
                  <Icon
                    className={`w-8 h-8 ${
                      item.featured
                        ? "text-white"
                        : "text-violet-600"
                    }`}
                  />
                </div>

                <h3
                  className={`text-2xl font-bold mb-4 ${
                    item.featured ? "text-white" : "text-gray-900"
                  }`}
                >
                  {item.title}
                </h3>

                <p
                  className={`leading-8 ${
                    item.featured
                      ? "text-violet-100"
                      : "text-gray-600"
                  }`}
                >
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      
    </section>
    
  );
}