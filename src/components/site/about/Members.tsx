import { AnimateIn } from "@/components/ui/AnimateIn";
import { Subheading } from "@/components/ui/Subheading";
import { Section } from "@/components/ui/Section";

export default function Members() {
  return (
   <Section>
     <div className="text-center mb-16">
          <AnimateIn delay={100} direction="right">
            <Subheading
              as="h2"
              centered
              color="violet"
              size="xl"
              className="leading-tight mb-4"
              text="Our Members"
              highlight="Work With"
            />
          </AnimateIn>
          <AnimateIn delay={200} direction="right">
            <p className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
               Strategic collaborations driving AI innovation
            </p>
          </AnimateIn>
        </div>

      

      <div className="bg-violet-50 py-8 overflow-hidden">
        <div className="flex animate-scroll">
          <img
            src="/images/clieimg.png"
            alt="Members Work With"
            className="h-40 w-auto shrink-0"
          />

          {/* duplicate image for seamless loop */}
          <img
            src="/images/clieimg.png"
            alt="Members Work With"
            className="h-40 w-auto shrink-0"
          />
        </div>
      </div>


    </Section>
  );
}