import { cn } from "@/lib/utils";
import { SectionDivider } from "@/components/ui/SectionDivider";

interface SectionBadgeProps {
  children:  React.ReactNode;
  variant?:  "light" | "dark";
  className?: string;
}

export function SectionBadge({ children, variant = "light", className }: SectionBadgeProps) {
  return (
    <div className="mb-6 inline-flex flex-col items-center gap-1">
      <span
        className={cn(
          "inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-sm font-bold uppercase tracking-widest",
          variant === "light"
            ? "border border-violet-200 bg-violet-50 text-violet-600"
            : "bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-[0_4px_18px_rgba(139,92,246,0.35)]",
          className
        )}
      >
        <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
        {children}
      </span>
      <SectionDivider />
    </div>
  );
}
