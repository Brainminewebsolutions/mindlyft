import { cn } from "@/lib/utils";

type SubheadingColor = "mixed" | "black" | "violet";
type SubheadingSize  = "sm" | "md" | "lg" | "xl";

interface SubheadingProps {
  text:                React.ReactNode;
  highlight?:          React.ReactNode;
  centered?:           boolean;
  className?:          string;
  highlightClassName?: string;
  as?:                 "h1" | "h2" | "h3";
  color?:              SubheadingColor;
  size?:               SubheadingSize;
}

const TEXT_COLOR: Record<SubheadingColor, string> = {
  mixed:  "!text-gray-900",
  black:  "!text-gray-900",
  violet: "!text-violet-600",
};

const HIGHLIGHT_COLOR: Record<SubheadingColor, string> = {
  mixed:  "!text-violet-600",
  black:  "!text-gray-900",
  violet: "!text-violet-600",
};

const SIZE: Record<SubheadingSize, string> = {
  sm: "text-xl md:text-2xl",
  md: "text-2xl md:text-3xl",
  lg: "text-3xl md:text-4xl",
  xl: "text-4xl md:text-5xl",
};

export function Subheading({
  text,
  highlight,
  centered = false,
  className,
  highlightClassName,
  as: Tag = "h3",
  color = "mixed",
  size = "md",
}: SubheadingProps) {
  return (
    <Tag
      className={cn(
        "font-bold",
        SIZE[size],
        TEXT_COLOR[color],
        // Non-centred headings still centre on mobile; className can override.
        centered ? "mx-auto text-center" : "text-center md:text-left",
        className
      )}
    >
      {text}
      {highlight && (
        <span className={cn(HIGHLIGHT_COLOR[color], highlightClassName)}> {highlight}</span>
      )}
    </Tag>
  );
}
