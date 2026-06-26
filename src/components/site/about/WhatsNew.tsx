import Link from "next/link";

const ITEMS = [
  {
    title:       "New Skills. New Courses. Smarter Learning.",
    description: "We've introduced brand-new design courses and added two powerful learning modules to our bot — making your learning experience faster, smarter, and more practical than ever.",
    href:        "/courses",
  },
  {
    title:       "Big Updates Are Here",
    description: "We've added fresh design courses and upgraded our bot with two new learning capabilities — giving you more tools to learn, build, and succeed.",
    href:        "/courses",
  },
];

export default function WhatsNew({ bg = "bg-white" }: { bg?: string }) {
  return (
    <section className={`${bg} py-16 px-6 md:px-14 lg:px-24 text-center`}>
      <h2 className="text-3xl md:text-4xl font-black text-violet-600 mb-3">What&apos;s New</h2>
      <p className="text-sm font-semibold text-gray-700 max-w-2xl mx-auto mb-12">
        This Will Contain Details About Mindlyft AI&apos;s New Project, Partnership, Workshops, News
        And Engagement Across Global Including The Social And Media News.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {ITEMS.map((item) => (
          <div
            key={item.title}
            className="flex flex-col gap-4 rounded-3xl p-8 text-left"
            style={{ background: "linear-gradient(135deg, #7c3aed, #a855f7)" }}
          >
            <h3 className="text-xl font-black text-white leading-snug">{item.title}</h3>
            <p className="text-sm leading-relaxed text-white/80 flex-1">{item.description}</p>
            <Link
              href={item.href}
              className="self-start inline-flex items-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors"
            >
              Learn More <span>→</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
