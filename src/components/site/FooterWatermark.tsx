"use client";

import { useEffect, useRef, useState } from "react";

function RoboMascot({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size * 1.2}
      viewBox="0 0 100 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Antenna pole */}
      <rect x="48" y="2" width="4" height="14" rx="2" fill="#a78bfa" />
      {/* Antenna ball */}
      <circle cx="50" cy="2" r="5" fill="#f97316" />
      <circle cx="50" cy="2" r="3" fill="#fdba74" />

      {/* Head — white so it pops on violet bg */}
      <rect x="14" y="16" width="72" height="54" rx="14" fill="#ffffff" />
      <rect x="18" y="20" width="30" height="8" rx="4" fill="#e0e7ff" opacity="0.7" />

      {/* Eye housings */}
      <rect x="22" y="30" width="24" height="20" rx="6" fill="#1e1b4b" />
      <rect x="54" y="30" width="24" height="20" rx="6" fill="#1e1b4b" />

      {/* Eye irises */}
      <circle cx="34" cy="40" r="7" fill="#3b82f6" />
      <circle cx="66" cy="40" r="7" fill="#3b82f6" />

      {/* Pupils */}
      <circle cx="34" cy="40" r="4" fill="#1d4ed8" />
      <circle cx="66" cy="40" r="4" fill="#1d4ed8" />

      {/* Eye shines */}
      <circle cx="37" cy="37" r="2" fill="white" />
      <circle cx="69" cy="37" r="2" fill="white" />

      {/* Mouth panel */}
      <rect x="24" y="56" width="52" height="10" rx="5" fill="#e0e7ff" />
      <circle cx="36" cy="61" r="2.5" fill="#f97316" />
      <circle cx="50" cy="61" r="2.5" fill="#34d399" />
      <circle cx="64" cy="61" r="2.5" fill="#60a5fa" />

      {/* Side ears */}
      <rect x="4" y="30" width="10" height="22" rx="4" fill="#f0f0ff" />
      <rect x="86" y="30" width="10" height="22" rx="4" fill="#f0f0ff" />
      <circle cx="9" cy="41" r="2.5" fill="#f97316" />
      <circle cx="91" cy="41" r="2.5" fill="#60a5fa" />

      {/* Neck */}
      <rect x="40" y="70" width="20" height="8" rx="4" fill="#e0e7ff" />

      {/* Body — white */}
      <rect x="16" y="78" width="68" height="38" rx="12" fill="#ffffff" />
      <rect x="24" y="84" width="52" height="26" rx="8" fill="#f5f3ff" />
      <rect x="28" y="88" width="44" height="5" rx="2.5" fill="#c4b5fd" />
      <circle cx="38" cy="102" r="5" fill="#f97316" />
      <circle cx="50" cy="102" r="5" fill="#3b82f6" />
      <circle cx="62" cy="102" r="5" fill="#a78bfa" />

      {/* Arms */}
      <rect x="2" y="80" width="14" height="28" rx="7" fill="#f0f0ff" />
      <circle cx="9" cy="111" r="5" fill="#e0e7ff" />
      <rect x="84" y="80" width="14" height="28" rx="7" fill="#f0f0ff" />
      <circle cx="91" cy="111" r="5" fill="#e0e7ff" />
    </svg>
  );
}

export default function FooterWatermark() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const textStyle: React.CSSProperties = {
    fontSize: "clamp(4rem, 13.5vw, 220px)",
    fontFamily: "'Playfair Display', Georgia, serif",
    letterSpacing: "-0.02em",
    lineHeight: 1,
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@900&display=swap');
        @keyframes wmSlideUp {
          from { transform: translateY(60px); opacity: 0; }
          to   { transform: translateY(0);    opacity: 1; }
        }
        @keyframes wmBobble {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }
      `}</style>

      {/* Outer: no overflow-clip so robot isn't cut; pt gives headroom */}
      <div ref={ref} className="pb-14 pt-6 mt-10 w-full overflow-hidden">
        <div
          className="flex items-end justify-center w-full select-none pointer-events-none"
          style={{
            opacity: 0,
            ...(visible && {
              animation: "wmSlideUp 1s cubic-bezier(0.22,1,0.36,1) forwards",
            }),
          }}
        >
          {/* "M" */}
          <span className="text-white font-black" style={textStyle}>M</span>

          {/* Dotless "i" with orange glowing dot */}
          <span className="relative text-white font-black" style={textStyle}>
            <span
              className="absolute left-1/2 rounded-full"
              style={{
                background: "#ffffff",
                width: "0.18em",
                height: "0.18em",
                top: "0.07em",
                transform: "translateX(-50%)",
                boxShadow: "0 0 16px 4px rgba(255,255,255,0.9), 0 0 32px rgba(255,255,255,0.5)",
              }}
            />
            ı
          </span>

          {/* "ndlyft" */}
          <span className="text-white font-black" style={textStyle}>ndlyft</span>

          {/* Word gap */}
          <span style={{ width: "clamp(0.6rem, 1.8vw, 1.4rem)", display: "inline-block" }} />

          {/* "A" */}
          <span className="text-white font-black" style={textStyle}>A</span>

          {/* Robot above "I" */}
          <div className="flex flex-col items-center" style={{ gap: "2px" }}>
            <div
              style={{
                animation: "wmBobble 3.2s ease-in-out infinite",
                filter: "drop-shadow(0 6px 18px rgba(109,40,217,0.75))",
                lineHeight: 0,
              }}
            >
              <RoboMascot size={68} />
            </div>
            <span className="text-white font-black" style={textStyle}>I</span>
          </div>
        </div>
      </div>
    </>
  );
}
