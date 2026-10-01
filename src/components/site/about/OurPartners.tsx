import Image from "next/image";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Subheading } from "@/components/ui/Subheading";
import { Section } from "@/components/ui/Section";

const PARTNERS = [
  { name: "HOMI Lab",      logo: "/images/ourpartner/partner1.png" },
  { name: "Kalam Centre",  logo: "/images/ourpartner/partner2.png" },
];

export default function OurPartners({ bg = "bg-white" }: { bg?: string }) {
  return (
    <Section bg={bg} centered>
       <div className="text-center mb-10 md:mb-16">
          <AnimateIn delay={100} direction="right">
            <Subheading
              as="h2"
              centered
              color="violet"
              size="xl"
              className="leading-tight mb-4"
              text="Our"
              highlight="Partners"
            />
          </AnimateIn>
          <AnimateIn delay={200} direction="right">
            <p className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
              With Acknowledgement &amp; Support From
            </p>
          </AnimateIn>
        </div>


      <div className="bg-violet-50 rounded-2xl py-14 px-6">
        <div className="flex flex-wrap justify-center gap-8">
          {PARTNERS.map((p) => (
            <div
              key={p.name}
              className="flex items-center justify-center bg-white rounded-xl shadow-sm border border-violet-100 w-50 h-50 p-4"
            >
              <Image
                src={p.logo}
                alt={p.name}
                width={0}
                height={0}
                sizes="200px"
                className="h-auto w-auto max-h-full max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>


    </Section>


  );
}
