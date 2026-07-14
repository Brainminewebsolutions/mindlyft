import { AnimateIn } from "@/components/ui/AnimateIn";
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
    <section className={`${bg} py-12 md:py-16 px-6 md:px-14 lg:px-24 text-center`}>
       <div className="text-center mb-10 md:mb-16">
          <AnimateIn delay={100} direction="right">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
            What&apos;s&nbsp;
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
               New
              </span>
            </h2>
          </AnimateIn>
           <AnimateIn delay={200} direction="right">
            <p className="text-base text-gray-500 leading-relaxed max-w-2xl mx-auto">
                This Will Contain Details About Mindlyft AI&apos;s New Project, Partnership, Workshops, News
        And Engagement Across Global Including The Social And Media News.
            </p>
          </AnimateIn>
        </div>


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
