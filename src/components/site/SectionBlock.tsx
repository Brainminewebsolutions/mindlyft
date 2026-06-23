import { cn } from "@/lib/utils";

const BG_PRESETS: Record<string, string> = {
  white: "bg-white",
  gray:  "bg-gray-50",
};

type SectionBlockProps = {
  badge?:     string;
  title:      React.ReactNode;
  subtitle?:  string;
  align?:     "center" | "left";
  bg?:        string;            // preset ("white"|"gray") or any Tailwind bg class e.g. "bg-violet-50"
  children?:  React.ReactNode;
  className?: string;
};

export default function SectionBlock({
  badge,
  title,
  subtitle,
  align     = "center",
  bg        = "gray",
  children,
  className,
}: SectionBlockProps) {
  const isCenter = align === "center";
  const bgClass  = BG_PRESETS[bg] ?? bg;

  return (
    <section className={cn("px-6 py-20", bgClass)}>
      <div className="max-w-6xl mx-auto space-y-14">

        {/* Header */}
        <div className={cn("space-y-4", isCenter ? "text-center" : "text-left")}>
          {badge && (
            <span className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 via-violet-500 to-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg shadow-violet-500/30 ring-1 ring-white/20">
              <span className="w-1.5 h-1.5 rounded-full bg-white/80 flex-shrink-0 animate-pulse" />
              {badge}
            </span>
          )}

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            {title}
          </h2>

          <div className={cn("w-16 h-1 bg-gradient-to-r from-violet-500 to-blue-500 rounded-full", isCenter && "mx-auto")} />

          {subtitle && (
            <p className={cn("text-gray-500 text-lg max-w-2xl", isCenter && "mx-auto")}>
              {subtitle}
            </p>
          )}
        </div>

        {/* Content */}
        {children && (
          <div className={className}>
            {children}
          </div>
        )}

      </div>
    </section>
  );
}
