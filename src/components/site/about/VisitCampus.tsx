import Link from "next/link";
import { CalendarCheck, MapPin } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Subheading } from "@/components/ui/Subheading";
import { Section } from "@/components/ui/Section";
import { SITE_CONFIG } from "@/constants/siteConfig";

export default function VisitCampus({ bg = "bg-white" }: { bg?: string }) {
  return (
    <Section bg={bg}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        <div className="text-center md:text-left">
          <AnimateIn delay={100} direction="right">
            <Subheading
              as="h2"
              color="violet"
              size="xl"
              className="leading-tight mb-5"
              text="Visit our"
              highlight="campus"
            />
          </AnimateIn>
          <AnimateIn delay={200} direction="right">
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-6">
              Our Learning and Innovation Centre in Pimpri-Chinchwad is two minutes from Akurdi Railway Station.
              Come in, meet the faculty, see where classes actually happen, and sit down with a counsellor before
              you decide anything.
            </p>
          </AnimateIn>
          <AnimateIn delay={250} direction="right">
            <p className="mb-8 inline-flex items-start gap-2 text-sm text-gray-500 text-left">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-violet-500" />
              {SITE_CONFIG.address}
            </p>
          </AnimateIn>
          <AnimateIn delay={300} direction="right">
            <div>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <CalendarCheck className="h-4 w-4" /> Book a free counselling session
              </Link>
            </div>
          </AnimateIn>
        </div>

        <AnimateIn delay={200} direction="left">
          <div className="overflow-hidden rounded-3xl border border-violet-100 shadow-md">
            <iframe
              src={SITE_CONFIG.mapEmbedUrl}
              title="MindLyft AI campus location"
              className="block h-72 w-full border-0 sm:h-[360px]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </AnimateIn>

      </div>
    </Section>
  );
}
