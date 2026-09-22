import { cn } from "@/lib/utils";

interface SectionProps {
  children:   React.ReactNode;
  bg?:        string;
  wide?:      boolean;
  centered?:  boolean;
  className?: string;
}

export function Section({
  children,
  bg = "bg-white",
  wide = false,
  centered = false,
  className,
}: SectionProps) {
  return (
    <section
      className={cn(
        bg,
        "px-6 py-12 md:py-12",
        wide && "md:px-14 lg:px-24",
        centered && "text-center",
        className
      )}
    >
      {children}
    </section>
  );
}
