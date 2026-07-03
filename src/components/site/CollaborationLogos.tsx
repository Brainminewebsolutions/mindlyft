import Image from "next/image";
import { SITE_CONFIG } from "@/constants/siteConfig";

type Size = "sm" | "md" | "lg";

interface CollaborationLogosProps {
  size?: Size;
  showLabels?: boolean;
  className?: string;
}

const SIZE_CLASSES: Record<Size, { box: string; separator: string; gap: string }> = {
  sm: { box: "h-8 w-[100px]", separator: "text-lg", gap: "gap-3" },
  md: { box: "h-16 w-32", separator: "text-2xl", gap: "gap-5" },
  lg: { box: "h-40 w-48", separator: "text-3xl", gap: "gap-10" },
};

export default function CollaborationLogos({ size = "sm", showLabels = false, className = "" }: CollaborationLogosProps) {
  const s = SIZE_CLASSES[size];

  return (
    <div className={`flex items-center flex-wrap ${s.gap} ${className}`}>
      <LogoItem src={SITE_CONFIG.logo1} alt="MindLyft AI" label={showLabels ? "MindLyft AI" : undefined} boxClass={s.box} />
      <span className={`${s.separator} font-light text-gray-300 select-none shrink-0`}>×</span>
      <LogoItem src={SITE_CONFIG.c3iHubLogo} alt="C3iHub IIT Kanpur" label={showLabels ? "C3iHub IIT Kanpur" : undefined} boxClass={s.box} />
    </div>
  );
}

function LogoItem({ src, alt, label, boxClass }: { src: string; alt: string; label?: string; boxClass: string }) {
  return (
    <div className="flex flex-col items-center gap-2 shrink-0">
      <div className={`relative ${boxClass}`}>
        <Image src={src} alt={alt} fill className="object-contain" />
      </div>
      {label && <p className="text-xl font-semibold text-gray-800">{label}</p>}
    </div>
  );
}
