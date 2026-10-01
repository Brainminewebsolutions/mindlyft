import { AnimateIn } from "@/components/ui/AnimateIn";
import { LineBadge } from "@/components/ui/LineBadge";
import { Subheading } from "@/components/ui/Subheading";
import { Section } from "@/components/ui/Section";

export default function WhyWeStarted({ bg = "bg-white" }: { bg?: string }) {
  return (
    <Section bg={bg}>
      <div className="max-w-4xl mx-auto text-center">
        <AnimateIn delay={0} direction="right"><LineBadge className="justify-center mb-5">Our Story</LineBadge></AnimateIn>
        <AnimateIn delay={100} direction="right">
          <Subheading
            as="h2"
            centered
            color="violet"
            size="xl"
            className="leading-tight mb-8"
            text="Why we"
            highlight="started"
          />
        </AnimateIn>

        <AnimateIn delay={200} direction="up">
          <blockquote className="mb-8 rounded-3xl border border-violet-100 bg-white px-6 py-8 sm:px-10 text-lg sm:text-xl font-medium text-gray-800 leading-relaxed shadow-sm">
            Our founder&apos;s starting point was simple: AI is not just a technology, it is a force that can
            raise what people are capable of —{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              but only if they can actually use it.
            </span>
          </blockquote>
        </AnimateIn>

        <AnimateIn delay={300} direction="up">
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            Too much AI education stops at vocabulary. People finish courses able to describe a large language
            model and unable to build anything with one. MindLyft AI was set up to close that gap, with teaching
            built around projects, instructors who practise what they teach, and a campus where you can ask a
            question the moment you are stuck.
          </p>
        </AnimateIn>
      </div>
    </Section>
  );
}
