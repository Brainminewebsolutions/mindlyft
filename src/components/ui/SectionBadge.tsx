import { cn } from "@/lib/utils";
import { SectionDivider } from "@/components/ui/SectionDivider";

interface SectionBadgeProps {
  children:  React.ReactNode;
  variant?:  "light" | "dark";
  className?: string;
}

export function SectionBadge({ children, variant = "light", className }: SectionBadgeProps) {
  return (
    <div className="mb-6 inline-flex max-w-full flex-col items-center gap-1">
      <h3
        className={cn(
          "inline-flex max-w-full items-center gap-1.5 truncate whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wide sm:gap-2 sm:px-5 sm:py-2 sm:text-base sm:tracking-wider md:px-6 md:py-2.5 md:text-2xl md:tracking-widest",
          variant === "light"
            ? "border border-violet-200 bg-violet-50 !text-violet-600"
            : "bg-gradient-to-r from-violet-600 to-blue-500 !text-white shadow-[0_4px_18px_rgba(139,92,246,0.35)]",
          className
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
        {children}
      </h3>
      <SectionDivider />
    </div>
  );
}
