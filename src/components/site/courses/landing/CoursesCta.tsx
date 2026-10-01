import Link from "next/link";
import { CalendarCheck, MapPin, MessageCircle } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SITE_CONFIG } from "@/constants/siteConfig";
import { CAMPUS_MAP_URL } from "./content";

export default function CoursesCta() {
  return (
    <section className="bg-white px-6 md:px-[60px] py-20">
      <AnimateIn direction="zoom">
        <div className="max-w-5xl mx-auto rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-8 sm:p-12 text-center shadow-sm">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Book a Free Demo Class or Speak to a Counsellor
          </h2>
          <p className="mx-auto max-w-2xl text-base text-gray-600 leading-relaxed mb-8">
            Tell us your background and where you want to get to. We will recommend the right program,
            walk you through fees and batch timings, and arrange a free demo class. No obligation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              <CalendarCheck className="h-4 w-4" /> Book Free Counselling
            </Link>
            <a
              href={SITE_CONFIG.social.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-white px-6 py-3 text-sm font-semibold text-emerald-700 hover:bg-emerald-50 transition-colors"
            >
              <MessageCircle className="h-4 w-4" /> WhatsApp Us
            </a>
            <a
              href={CAMPUS_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors"
            >
              <MapPin className="h-4 w-4" /> Visit Our Akurdi Campus
            </a>
          </div>
        </div>
      </AnimateIn>
    </section>
  );
}
