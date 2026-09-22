import { AnimateIn } from "@/components/ui/AnimateIn";
import { Subheading } from "@/components/ui/Subheading";
import { Section } from "@/components/ui/Section";

const ITEMS = [
  {
    title: "AI & Machine Learning Solutions",
    description:
      "We build intelligent models that deliver actionable insights, predict trends, and enable faster, smarter decision-making.",
  },
  {
    title: "Intelligent Automation",
    description:
      "We streamline complex and repetitive processes, reducing manual effort and empowering teams to focus on high-value work.",
  },
  {
    title: "Custom Software Development",
    description:
      "We design and deliver secure, scalable, high-performance software tailored to modern business needs.",
  },
  {
    title: "Data-Driven Intelligence",
    description:
      "We transform raw data into strategic intelligence that drives smarter decisions and future-ready growth.",
  },
];

export default function WhoWeAre({ bg = "bg-white" }: { bg?: string }) {
  return (
    <Section bg={bg}>
      <div className="text-center mb-10 md:mb-16">
                <AnimateIn delay={100} direction="right">
                  <Subheading
                    as="h2"
                    centered
                    color="violet"
                    size="xl"
                    className="leading-tight mb-4"
                    text="Who we"
                    highlight="are"
                  />
                </AnimateIn>
              </div>
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 text-center lg:text-left items-center  ">

        {/* Image */}
        <div className="w-full lg:w-[45%] shrink-0">
          <img
            src="/images/Whoweare.png"
            alt="Who we are"
            className="w-full h-[480px] object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* Content */}
        <div className="flex-1">
            
          
          <div className="flex flex-col gap-6">
            {ITEMS.map((item) => (
              <div key={item.title}>
                <h3 className="text-base font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-500">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
}
