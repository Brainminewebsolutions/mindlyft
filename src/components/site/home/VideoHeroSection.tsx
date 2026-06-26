"use client";

import { useEffect, useRef, useState } from "react";
import { Mouse } from "lucide-react";
import { cn } from "@/lib/utils";

const PARTS = [
  "Elevating Learning",
  "Engineering Intelligence",
  "Building the Future",
];

function AnimatedParts() {
  const [idx,     setIdx]     = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const pause = setTimeout(() => setVisible(false), 2600);
    return () => clearTimeout(pause);
  }, [idx]);

  useEffect(() => {
    if (visible) return;
    const swap = setTimeout(() => {
      setIdx((i) => (i + 1) % PARTS.length);
      setVisible(true);
    }, 400);
    return () => clearTimeout(swap);
  }, [visible]);

  return (
    <span
      className="block leading-tight"
      style={{ fontSize: "clamp(28px, 4.5vw, 60px)", minHeight: "1.2em" }}
    >
      <span
        className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent"
        style={{
          display:    "inline-block",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          opacity:    visible ? 1 : 0,
          transform:  visible ? "translateY(0)" : "translateY(-12px)",
        }}
      >
        {PARTS[idx]}
      </span>
    </span>
  );
}

export default function VideoHeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    v.play().catch(() => {});
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center justify-center">

      {/* Background video */}
      <video
        ref={videoRef}
        src="/Mindlyftai_hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover object-center z-0"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[rgba(4,6,16,0.72)] via-[rgba(4,6,16,0.52)] to-[rgba(4,6,16,0.80)] z-[1]" />

      {/* Purple radial tint */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(108,99,255,.18) 0%, transparent 70%)" }}
      />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-0.5 z-[2] pointer-events-none animate-[mlScan_8s_linear_infinite]"
        style={{ background: "linear-gradient(90deg,transparent,rgba(108,99,255,.45),rgba(56,217,245,.45),transparent)" }}
      />

      {/* Hero content */}
      <div
        className={cn(
          "relative z-[3] flex flex-col items-center text-center px-6 pt-[120px] pb-20 max-w-[1100px] w-full transition-all duration-[900ms] ease-in-out",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
        )}
      >
        <h1 className="font-extrabold tracking-[-0.02em] text-white mb-[22px] w-full">
          <AnimatedParts />
        </h1>
      </div>

      {/* Scroll hint */}
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2 pointer-events-none animate-[mlBounce_2s_ease-in-out_infinite]",
          loaded ? "opacity-100" : "opacity-0"
        )}
        style={{ transition: "opacity 1s ease 1.4s" }}
      >
        <div className="flex items-center gap-2.5">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-violet-400/70" />
          <span className="font-bold tracking-[0.18em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-emerald-300 text-[24px] sm:text-[24px]">
  Three Pillars, One Vision
</span>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-blue-400/70" />
        </div>
        <Mouse size={20} color="rgba(180,200,255,.5)" strokeWidth={1.5} />
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[140px] bg-gradient-to-t from-[#040610] to-transparent z-[2] pointer-events-none" />

    </section>
  );
}
