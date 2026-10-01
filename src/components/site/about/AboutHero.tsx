import Image from "next/image";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Subheading } from "@/components/ui/Subheading";
import { Section } from "@/components/ui/Section";

const ABOUT_IMAGE = "/images/about/hero.jpeg";

type AboutHeroProps = {
  paragraphs: string[];
  imageUrl?: string;
};

export default function AboutHero({ paragraphs }: AboutHeroProps) {
  return (
    <Section className="pt-24 md:pt-32">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-12">

        {/* Image Left */}
        <div className="flex-1 text-center md:text-left space-y-6">
          <Image
            src={ABOUT_IMAGE}
            alt="Learners working together at MindLyft AI"
            width={2836}
            height={2115}
            sizes="(min-width: 768px) 448px, 100vw"
            priority
            className="w-full h-auto max-w-md mx-auto rounded-2xl shadow-lg"
          />
          <div className="w-16 h-1 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 md:mx-0 mx-auto" />
        </div>

        {/* Content Right */}
        <div className="flex-1">
          <AnimateIn delay={100} direction="right">
            <Subheading
              as="h1"
              color="violet"
              size="xl"
              className="leading-tight mb-6 text-center md:text-left"
              text="About"
              highlight="MindLyft AI"
            />
          </AnimateIn>
          <div className="space-y-5">
            {paragraphs.map((p) => (
              <p key={p} className="text-gray-600 text-base md:text-lg leading-relaxed">
                {p}
              </p>
            ))}
          </div>
        </div>

      </div>
    </Section>
  );
}
