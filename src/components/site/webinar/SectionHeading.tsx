import { SectionBadge } from "@/components/ui/SectionBadge";

interface SectionHeadingProps {
  tag: string;
  heading: React.ReactNode;
  sub?: string;
  centered?: boolean;
  headingClassName?: string;
}

export default function SectionHeading({
  tag,
  heading,
  sub,
  centered = false,
  headingClassName,
}: SectionHeadingProps) {
  return (
    <div className={centered ? "text-center flex flex-col items-center" : ""}>
      <SectionBadge variant="dark">{tag}</SectionBadge>
      <h2 className={headingClassName ?? "mt-4 text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 leading-tight"}>
        {heading}
      </h2>
      {sub && (
        <p className={`mt-3 text-base text-gray-500 leading-relaxed max-w-xl${centered ? " mx-auto" : ""}`}>
          {sub}
        </p>
      )}
    </div>
  );
}
