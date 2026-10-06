import { ChevronDown } from "lucide-react";
import { SectionHeader } from "./InfoSection";
import { FAQS } from "./content";

interface CoursesFaqProps {
  bg?:      string;
  heading?: string;
  faqs?:    { q: string; a: string }[];
}

// Native <details> keeps every answer in the server-rendered HTML (indexable)
// while staying collapsed by default — no client JS needed.
export default function CoursesFaq({
  bg = "bg-white",
  heading = "Frequently Asked Questions About AI Courses in Pune",
  faqs = FAQS,
}: CoursesFaqProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };

  return (
    <section id="faq" className={`${bg} px-6 md:px-[60px] py-20 scroll-mt-24`}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <div className="max-w-4xl mx-auto">
        <SectionHeader badge="FAQ" heading={heading} />

        <div className="space-y-3">
          {faqs.map(({ q, a }) => (
            <details
              key={q}
              className="group rounded-2xl border border-violet-100 bg-white shadow-sm open:shadow-md transition-shadow"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 [&::-webkit-details-marker]:hidden">
                <h3 className="text-base font-semibold text-gray-900">{q}</h3>
                <ChevronDown className="h-5 w-5 shrink-0 text-violet-500 transition-transform duration-300 group-open:rotate-180" />
              </summary>
              <p className="px-6 pb-5 text-sm text-gray-600 leading-relaxed">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
