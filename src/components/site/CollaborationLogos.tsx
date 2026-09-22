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

const SIZE_CLASSES: Record<Size, { box: string; separator: string; icon: string; gap: string; label: string }> = {
  sm: {
    box: "h-14 w-14 sm:h-[100px] sm:w-[100px]",
    separator: "h-6 w-6 sm:h-8 sm:w-8",
    icon: "h-3 w-3 sm:h-4 sm:w-4",
    gap: "gap-2 sm:gap-3",
    label: "text-xs sm:text-sm font-bold text-gray-700 tracking-wide whitespace-nowrap",
  },
  md: {
    box: "h-16 w-32",
    separator: "h-12 w-12",
    icon: "h-6 w-6",
    gap: "gap-5",
    label: "text-base font-semibold text-gray-800",
  },
  lg: {
    box: "h-40 w-48",
    separator: "h-16 w-16",
    icon: "h-8 w-8",
    gap: "gap-10",
    label: "text-xl font-semibold text-gray-800",
  },
  responsive: {
    box: "w-20 h-20 sm:w-28 sm:h-28 lg:w-40 lg:h-40",
    separator: "h-10 w-10 sm:h-12 sm:w-12",
    icon: "h-5 w-5 sm:h-6 sm:w-6",
    gap: "gap-4 sm:gap-5",
    label: "text-sm sm:text-base lg:text-[20px] font-semibold text-gray-800 tracking-wide whitespace-nowrap",
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
    <div className={`flex items-center ${layout === "inline" ? "flex-nowrap" : "flex-wrap"} ${s.gap} ${className}`}>
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
    <div className={`flex shrink-0 items-center gap-2 ${layout === "stacked" ? "flex-col" : "flex-row"}`}>
      <div className={`relative shrink-0 ${boxClass}`}>
        <Image src={src} alt={alt} fill className="object-contain object-center" />
      </div>
      {label && <p className={labelClass}>{label}</p>}
    </div>
  );
}
