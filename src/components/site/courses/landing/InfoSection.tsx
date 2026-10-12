import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { cn } from "@/lib/utils";
import type { InfoItem } from "./content";

const COLS = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
  5: "sm:grid-cols-2 lg:grid-cols-5",
} as const;

interface InfoSectionProps {
  badge:     string;
  heading:   string;
  intro?:    React.ReactNode;
  items:     InfoItem[];
  columns?:  keyof typeof COLS;
  numbered?: boolean;
  bg?:       string;
  id?:       string;
  children?: React.ReactNode;
}

export function SectionHeader({
  badge, heading, intro, centered = false,
}: { badge: string; heading: string; intro?: React.ReactNode; centered?: boolean }) {
  return (
    <div className={cn("mb-12 max-w-3xl mx-auto text-center", !centered && "md:mx-0 md:text-left")}>
      <AnimateIn delay={0} direction="left"><LineBadge className={cn("mb-5", centered && "justify-center")}>{badge}</LineBadge></AnimateIn>
      <AnimateIn delay={100} direction="left">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">{heading}</h2>
      </AnimateIn>
      {intro && (
        <AnimateIn delay={200} direction="left">
          <div className="space-y-3 text-base text-gray-600 leading-relaxed">{intro}</div>
        </AnimateIn>
      )}
    </div>
  );
}

export default function InfoSection({
  badge, heading, intro, items, columns = 3, numbered = false, bg = "bg-white", id, children,
}: InfoSectionProps) {
  return (
    <section id={id} className={cn(bg, "px-6 md:px-[60px] py-20 scroll-mt-24")}>
      <div className="max-w-6xl mx-auto">
        <SectionHeader badge={badge} heading={heading} intro={intro} />

        <div className={cn("grid grid-cols-1 gap-5", COLS[columns])}>
          {items.map(({ icon: Icon, title, desc }, i) => (
            <AnimateIn key={title} delay={150 + i * 70} direction="up">
              <div className="group relative h-full rounded-2xl border border-violet-100 bg-white p-6 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-300">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow-md group-hover:scale-110 transition-transform duration-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  {numbered && (
                    <span className="text-xs font-bold uppercase tracking-widest text-violet-500">Step {i + 1}</span>
                  )}
                </div>
                <h3 className="text-base font-bold text-gray-900 mb-2 leading-snug">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

        {children}
      </div>
    </section>
  );
}
