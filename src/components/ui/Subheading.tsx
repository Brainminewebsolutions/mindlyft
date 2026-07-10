import { cn } from "@/lib/utils";

interface SubheadingProps {
  text:                React.ReactNode;
  highlight?:          React.ReactNode;
  centered?:           boolean;
  className?:          string;
  highlightClassName?: string;
}

export function Subheading({
  text,
  highlight,
  centered = false,
  className,
  highlightClassName,
}: SubheadingProps) {
  return (
    <h3
      className={cn(
        "text-2xl font-bold !text-gray-900 md:text-3xl",
        centered && "mx-auto text-center",
        className
      )}
    >
      {text}
      {highlight && (
        <span className={cn("!text-violet-600", highlightClassName)}> {highlight}</span>
      )}
    </h3>
  );
}
