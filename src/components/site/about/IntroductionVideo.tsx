import { AnimateIn } from "@/components/ui/AnimateIn";
import { Subheading } from "@/components/ui/Subheading";
import { Section } from "@/components/ui/Section";

export default function IntroductionVideo({ bg = "bg-white" }: { bg?: string }) {
  return (
    <Section bg={bg}>
      <div className="max-w-5xl mx-auto">
 <div className="text-center mb-10 md:mb-16">
          <AnimateIn delay={100} direction="right">
            <Subheading
              as="h2"
              centered
              color="violet"
              size="xl"
              className="leading-tight mb-4"
              text="Watch a Short Introduction"
              highlight="Video About Our Company."
            />
          </AnimateIn>
          <AnimateIn delay={200} direction="right">
            <p className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
  Discover who we are, what we do, and how we create value for our customers.            </p>
          </AnimateIn>
        </div>

      

        <div className="rounded-2xl overflow-hidden shadow-xl border border-violet-100">
          <video
            controls
            playsInline
            preload="none"
            className="w-full h-96"
          >
            <source src="/introvideo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

      </div>
    </Section>
  );
}
