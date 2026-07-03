"use client";

import { useRef, useEffect, useCallback, useState } from "react";
import Image from "next/image";
import { SectionBadge } from "@/components/ui/SectionBadge";
import type { Partner } from "@/types/admin/partner";

// ─── Tooltip ─────────────────────────────────────────────────────────────────

interface TooltipProps {
  partner: Partner;
  anchorX: number;
  anchorY: number;
}

function PartnerTooltip({ partner, anchorX, anchorY }: TooltipProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ left: anchorX, top: anchorY });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const { width } = el.getBoundingClientRect();
    const half = width / 2;
    const vw = window.innerWidth;
    setPos({ left: Math.min(Math.max(anchorX, half + 8), vw - half - 8), top: anchorY });
  }, [anchorX, anchorY]);

  return (
    <div
      ref={ref}
      style={{ left: pos.left, top: pos.top - 12 }}
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-full animate-tooltip-in"
    >
      <div className="bg-white border border-neutral-200/80 rounded-2xl shadow-[0_20px_60px_-10px_rgba(0,0,0,0.18)] w-64 p-5">
        <div className="flex items-center gap-3 mb-3">
          {/* Logo or initial */}
          <div className="w-11 h-11 rounded-xl bg-neutral-100 flex items-center justify-center shrink-0 overflow-hidden">
            {partner.image
              ? <Image src={partner.image} alt={partner.name} width={44} height={44} className="h-full w-full object-contain p-1" />
              : <span className="text-base font-bold text-neutral-600">{partner.name.charAt(0)}</span>
            }
          </div>
          <div>
            <p className="text-sm font-semibold text-neutral-900 leading-tight">{partner.name}</p>
            <span className="inline-flex items-start gap-1 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-[3px]" />
              <span className="text-[10px] font-medium text-emerald-600 uppercase tracking-wide leading-tight">
                {partner.sector}
              </span>
            </span>
          </div>
        </div>

        <p className="text-xs text-neutral-500 leading-relaxed">{partner.overview}</p>

         
      </div>
      <div className="absolute -bottom-[7px] left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-white border-r border-b border-neutral-200/80 rotate-45" />
    </div>
  );
}

// ─── Logo card ────────────────────────────────────────────────────────────────

function PartnerLogo({ partner }: { partner: Partner }) {
  return (
    <div className="relative flex flex-col items-center justify-center gap-2 select-none">
      <div className="w-20 h-20 rounded-2xl bg-white group-hover:bg-white group-hover:shadow-md transition-all duration-300 flex items-center justify-center overflow-hidden border border-neutral-200/60">
        {partner.image
          ? <Image src={partner.image} alt={partner.name} width={80} height={80} className="h-full w-full object-contain p-2" />
          : <span className="text-lg font-bold text-neutral-600 group-hover:text-violet-600 transition-colors duration-300">
              {partner.name.charAt(0)}
            </span>
        }
      </div>
      <span className="text-[10px] tracking-widest uppercase  group-hover:text-neutral-700 transition-colors duration-300 font-semibold whitespace-nowrap">
        {partner.name}
      </span>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────

export default function OurClientsClient({ partners }: { partners: Partner[] }) {
  const [marqueeHovered, setMarqueeHovered] = useState(false);
  const [hovered, setHovered] = useState<{
    partner: Partner;
    anchorX: number;
    anchorY: number;
  } | null>(null);

  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = useCallback(
    (partner: Partner, e: React.MouseEvent<HTMLDivElement>) => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
      const rect = e.currentTarget.getBoundingClientRect();
      setHovered({ partner, anchorX: rect.left + rect.width / 2, anchorY: rect.top });
    },
    []
  );

  const handleMouseLeave = useCallback(() => {
    hideTimer.current = setTimeout(() => setHovered(null), 80);
  }, []);

  useEffect(() => () => { if (hideTimer.current) clearTimeout(hideTimer.current); }, []);

  // Duplicate for infinite scroll
  const slides = [...partners, ...partners];

  if (partners.length === 0) return null;

  return (
    <>
      <section className="relative w-full py-20 bg-[#F8F7F4]">

        {/* Badge + divider */}
        <div className="flex flex-col items-center justify-center mb-14 gap-3">
          <SectionBadge variant="dark">Our Recruiting Partners</SectionBadge>
          
        </div>

        {/* Marquee */}
<div className="relative overflow-hidden">
  <div className="pointer-events-none absolute inset-y-0 left-0 w-28 z-10 bg-gradient-to-r from-[#F8F7F4] to-transparent" />
  <div className="pointer-events-none absolute inset-y-0 right-0 w-28 z-10 bg-gradient-to-l from-[#F8F7F4] to-transparent" />

  <div
    className="flex w-max gap-0 animate-marquee"
    style={{
      animationPlayState: marqueeHovered ? "paused" : "running",
      animationDuration: `${partners.length * 3}s`,
    }}
    onMouseEnter={() => setMarqueeHovered(true)}
    onMouseLeave={() => setMarqueeHovered(false)}
  >
    {slides.map((partner, idx) => (
      <div
        key={`${partner.id}-${idx}`}
        className="group relative flex-shrink-0 w-48 h-32 flex items-center justify-center cursor-pointer transition-transform duration-200 hover:scale-105"
        onMouseEnter={(e) => {
          setMarqueeHovered(true);   // ← keep strip paused
          handleMouseEnter(partner, e);
        }}
        onMouseLeave={() => {
          setMarqueeHovered(false);  // ← resume when leaving logo
          handleMouseLeave();
        }}
      >
        <div className="absolute inset-3 rounded-xl bg-white/0 group-hover:bg-white/80 group-hover:shadow-sm transition-all duration-200" />
        <div className="relative z-10">
          <PartnerLogo partner={partner} />
        </div>
      </div>
    ))}
  </div>
</div>
      </section>

      {hovered && (
        <PartnerTooltip
          partner={hovered.partner}
          anchorX={hovered.anchorX}
          anchorY={hovered.anchorY}
        />
      )}
    </>
  );
}
