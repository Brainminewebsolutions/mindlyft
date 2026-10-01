import Image from "next/image";
import { Handshake } from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";

type Size = "sm" | "md" | "lg" | "responsive";
type Layout = "stacked" | "inline";

interface CollaborationLogosProps {
  size?: Size;
  layout?: Layout;
  showLabels?: boolean;
  className?: string;
}

// Mobile-first: every size fits a ~310px content width (375px phone minus
// gutters) on one row. Labels may wrap under the logo on small screens and
// only go single-line from `sm` up.
const SIZE_CLASSES: Record<Size, { box: string; separator: string; icon: string; gap: string; label: string }> = {
  sm: {
    box: "h-12 w-12 sm:h-[100px] sm:w-[100px]",
    separator: "h-6 w-6 sm:h-8 sm:w-8",
    icon: "h-3 w-3 sm:h-4 sm:w-4",
    gap: "gap-2 sm:gap-3",
    label: "text-[11px] sm:text-sm font-bold text-gray-700 tracking-wide sm:whitespace-nowrap",
  },
  md: {
    box: "h-12 w-24 sm:h-16 sm:w-32",
    separator: "h-9 w-9 sm:h-12 sm:w-12",
    icon: "h-4 w-4 sm:h-6 sm:w-6",
    gap: "gap-3 sm:gap-5",
    label: "text-sm sm:text-base font-semibold text-gray-800",
  },
  lg: {
    box: "h-20 w-24 sm:h-32 sm:w-40 lg:h-40 lg:w-48",
    separator: "h-10 w-10 sm:h-14 sm:w-14 lg:h-16 lg:w-16",
    icon: "h-5 w-5 sm:h-7 sm:w-7 lg:h-8 lg:w-8",
    gap: "gap-3 sm:gap-6 lg:gap-10",
    label: "text-sm sm:text-lg lg:text-xl font-semibold text-gray-800",
  },
  responsive: {
    box: "w-16 h-16 sm:w-28 sm:h-28 lg:w-40 lg:h-40",
    separator: "h-9 w-9 sm:h-12 sm:w-12",
    icon: "h-4 w-4 sm:h-6 sm:w-6",
    gap: "gap-3 sm:gap-5",
    label: "text-sm sm:text-base lg:text-[20px] font-semibold text-gray-800 tracking-wide sm:whitespace-nowrap",
  },
};

export default function CollaborationLogos({
  size = "sm",
  layout = "stacked",
  showLabels = false,
  className = "",
}: CollaborationLogosProps) {
  const s = SIZE_CLASSES[size];

  return (
    <div className={`flex flex-nowrap items-center ${s.gap} ${className}`}>
      <LogoItem
        src={SITE_CONFIG.logo1}
        alt="MindLyft AI"
        label={showLabels ? "MindLyft AI" : undefined}
        boxClass={s.box}
        labelClass={s.label}
        layout={layout}
      />
      <div className={`flex shrink-0 items-center justify-center rounded-full bg-violet-50 text-violet-600 ${s.separator}`}>
        <Handshake className={s.icon} />
      </div>
      <LogoItem
        src={SITE_CONFIG.c3iHubLogo}
        alt="C3iHub IIT Kanpur"
        label={showLabels ? "C3iHub IIT Kanpur" : undefined}
        boxClass={s.box}
        labelClass={s.label}
        layout={layout}
      />
    </div>
  );
}

function LogoItem({
  src,
  alt,
  label,
  boxClass,
  labelClass,
  layout,
}: {
  src: string;
  alt: string;
  label?: string;
  boxClass: string;
  labelClass: string;
  layout: Layout;
}) {
  return (
    // min-w-0 lets the label wrap instead of pushing the row wider than the screen;
    // the inline layout stacks below `sm`, where a side-by-side label can't fit.
    <div className={`flex min-w-0 items-center gap-2 ${layout === "stacked" ? "flex-col" : "flex-col sm:flex-row"}`}>
      <div className={`relative shrink-0 ${boxClass}`}>
        <Image src={src} alt={alt} fill sizes="200px" className="object-contain object-center" />
      </div>
      {label && <p className={`text-center ${layout === "inline" ? "sm:text-left" : ""} ${labelClass}`}>{label}</p>}
    </div>
  );
}
