"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Subheading } from "@/components/ui/Subheading";
import { useRouter } from "next/navigation";
import Image from "next/image";

const COLOR_PALETTE = [
  { color: "#8B5CF6", accent: "rgba(139,92,246,0.15)" },
  { color: "#3B82F6", accent: "rgba(59,130,246,0.15)" },
  { color: "#6366F1", accent: "rgba(99,102,241,0.15)" },
  { color: "#7C3AED", accent: "rgba(124,58,237,0.15)" },
  { color: "#2563EB", accent: "rgba(37,99,235,0.15)" },
  { color: "#818CF8", accent: "rgba(129,140,248,0.15)" },
];

const RADIUS = 310;
const CARD_W = 300;
const CARD_H = 200;
const AUTO_SPEED = 0.008; // radians per frame

export default function OurTools({ cards: cardsProp }) {
  const router = useRouter();
  const cards = (cardsProp ?? []).map((c, i) => ({
    ...c,
    ...COLOR_PALETTE[i % COLOR_PALETTE.length],
  }));
  const [angle, setAngle] = useState(0);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const dragStart = useRef(null);
  const angleRef = useRef(0);
  const rafRef = useRef(null);
  const containerRef = useRef(null);

  const total = cards.length;
  const angleStep = (Math.PI * 2) / total;

  // Auto-rotate
  useEffect(() => {
    const tick = () => {
      if (!paused && !dragging) {
        angleRef.current += AUTO_SPEED;
        setAngle(angleRef.current);
        // find closest card to front
        const front = Math.round(-angleRef.current / angleStep) % total;
        setActive(((front % total) + total) % total);
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [paused, dragging, angleStep, total]);

  // Drag / pointer handlers
  const onPointerDown = useCallback((e) => {
    setDragging(true);
    dragStart.current = { x: e.clientX, angle: angleRef.current };
    e.currentTarget.setPointerCapture(e.pointerId);
  }, []);

  const onPointerMove = useCallback(
    (e) => {
      if (!dragging || !dragStart.current) return;
      const dx = e.clientX - dragStart.current.x;
      angleRef.current = dragStart.current.angle + dx * 0.008;
      setAngle(angleRef.current);
      const front = Math.round(-angleRef.current / angleStep) % total;
      setActive(((front % total) + total) % total);
    },
    [dragging, angleStep, total]
  );

  const onPointerUp = useCallback(() => {
    setDragging(false);
    dragStart.current = null;
  }, []);

  // Click a card → rotate it to front
  const goTo = (idx) => {
    const target = -idx * angleStep;
    let diff = target - angleRef.current;
    // normalize to shortest path
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    angleRef.current += diff;
    setAngle(angleRef.current);
    setActive(idx);
  };

  return (
    <>
      {/* Keyframes only — everything else is Tailwind.
          Optionally move these into tailwind.config (theme.extend.keyframes/animation)
          and replace the arbitrary animate-[...] classes with named ones. */}
      <style>{`
        @keyframes ccPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.35; }
        }
        @keyframes hubSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>

      <div style={{background: "radial-gradient(ellipse at center, white 30%, #ddd6fe 100%)"}} className="relative flex flex-col items-center justify-center overflow-hidden py-20">

        {/* Header */}
        <div className="relative z-[5] mb-0 text-center px-6">
          <SectionBadge variant="dark">Our Tools</SectionBadge>
          <Subheading
            centered
            className="mt-4 mb-3 leading-[1.1] tracking-[-0.04em]"
            text={
              <>
                Powerful tools to
                <br />
                <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                  accelerate your growth
                </span>
              </>
            }
          />
          <p className="mx-auto max-w-[400px] text-[15px] font-normal leading-[1.7] text-gray-500">
            Drag to explore or click any card — tools powering smarter learning and outcomes.
          </p>
        </div>

        {/* Stage — orbit math below is fixed to a 560×560 coordinate space, so on
            small screens we scale the whole thing down with a CSS transform rather
            than recomputing RADIUS/CARD_W/CARD_H per breakpoint. The outer wrapper
            reserves the visually-scaled footprint so layout doesn't leave a gap. */}
        <div className="relative -mt-6 h-[280px] w-[280px] sm:-mt-10 sm:h-[364px] sm:w-[364px] md:-mt-12 md:h-[448px] md:w-[448px] lg:-mt-16 lg:h-[560px] lg:w-[560px]">
        <div
          className="absolute left-1/2 top-1/2 h-[560px] w-[560px] origin-center -translate-x-1/2 -translate-y-1/2 scale-[0.5] sm:scale-[0.65] md:scale-[0.8] lg:scale-100 cursor-grab select-none touch-none active:cursor-grabbing"
          ref={containerRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Orbit ring */}
          <div className="pointer-events-none absolute inset-0" />

          {/* Cards */}
          {cards.map((card, i) => {
            const theta = angle + i * angleStep;
            const cx = 280 + Math.sin(theta) * RADIUS;
            const cy = 280 + Math.cos(theta) * RADIUS * 0.38; // flatten Y for 3D feel
            const cosT = Math.cos(theta);
            // depth: 0 (back) → 1 (front)
            const depth = (cosT + 1) / 2;
            const scale = 0.62 + depth * 0.48;
            const opacity = 0.25 + depth * 0.75;
            const zIndex = Math.round(depth * 10);
            const isFront = i === active;

            return (
              <div
                key={card.id ?? i}
                className="absolute flex h-[200px] w-[300px] cursor-pointer flex-col gap-2.5 rounded-[20px] px-5 py-[22px] backdrop-blur-2xl transition-[box-shadow,transform] duration-[350ms] ease-out will-change-[transform,opacity]"
                onClick={() => {
                  goTo(i);
                  if (isFront && card.link) router.push(card.link);
                }}
                style={{
                  left: cx - CARD_W / 2,
                  top: cy - CARD_H / 2,
                  transform: `scale(${scale})`,
                  opacity,
                  zIndex,
                  background: isFront
                    ? `linear-gradient(145deg, #ffffff, ${card.accent})`
                    : "rgba(255,255,255,0.85)",
                  border: isFront
                    ? `1.5px solid ${card.color}55`
                    : "1.5px solid rgba(196,181,253,0.35)",
                  boxShadow: isFront
                    ? `0 0 32px ${card.color}28, 0 16px 48px rgba(139,92,246,0.12)`
                    : "0 4px 20px rgba(139,92,246,0.06)",
                  transformOrigin: "center center",
                }}
              >
                <div className="flex items-center gap-3">
                  {card.image ? (
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={48}
                      height={48}
                      className="h-12 w-12 shrink-0 rounded-[10px] object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="h-12 w-12 shrink-0 rounded-[10px] bg-violet-50" />
                  )}
                  <div className="text-base font-bold tracking-[-0.02em] text-gray-900">
                    {card.title}
                  </div>
                </div>
                <div className="flex-1 text-[12.5px] font-normal leading-[1.65] text-gray-500">
                  {card.desc}
                </div>
                <div
                  className="h-0.5 w-[30px] rounded-[2px]"
                  style={{ background: `linear-gradient(90deg, ${card.color}, transparent)` }}
                />
              </div>
            );
          })}

          {/* Center hub */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-[5] flex h-[90px] w-[90px] -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[1.5px] border-violet-200 bg-[radial-gradient(circle,rgba(139,92,246,0.10),rgba(59,130,246,0.05))] shadow-[0_0_32px_rgba(139,92,246,0.15)]">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-500 text-xl shadow-[0_4px_24px_rgba(139,92,246,0.45)] animate-[hubSpin_12s_linear_infinite]">
              ✦
            </div>
          </div>
        </div>
        </div>

        {/* Dot indicators */}
        <div className="relative z-[5] mt-5 flex gap-2">
          {cards.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={
                i === active
                  ? "h-2 w-6 cursor-pointer rounded border-none bg-gradient-to-r from-violet-600 to-blue-500 p-0 shadow-[0_0_10px_rgba(139,92,246,0.4)] transition-all duration-300"
                  : "h-2 w-2 cursor-pointer rounded-full border-none bg-violet-100 p-0 transition-all duration-300"
              }
            />
          ))}
        </div>

        {/* Prev / Pause / Next */}
        <div className="relative z-[5] mt-5 flex gap-3">
          {[
            { label: "‹", action: () => goTo((active - 1 + total) % total) },
            { label: paused ? "▶" : "⏸", action: () => setPaused((p) => !p) },
            { label: "›", action: () => goTo((active + 1) % total) },
          ].map((btn, i) => (
            <button
              key={i}
              onClick={btn.action}
              className="flex h-[42px] w-[42px] cursor-pointer items-center justify-center rounded-full border-[1.5px] border-violet-200 bg-white text-base text-gray-400 shadow-[0_2px_8px_rgba(139,92,246,0.08)] transition-all duration-200 hover:border-transparent hover:bg-gradient-to-br hover:from-violet-600 hover:to-blue-500 hover:text-white hover:shadow-[0_4px_16px_rgba(139,92,246,0.35)]"
            >
              {btn.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}