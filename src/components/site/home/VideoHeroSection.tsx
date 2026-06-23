"use client";

import { useEffect, useRef, useState } from "react"; // useState kept for loaded state
import { Mouse } from "lucide-react";
import { cn } from "@/lib/utils";

const PARTS = [
  "Empowering Students, Professionals & Businesses",
  "with Industry-Ready AI Skills,",
  "Intelligent Solutions,",
  "and Future-Focused Innovation.",
];

function TypewriterParts() {
  const [partIdx, setPartIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = PARTS[partIdx];
    if (charIdx < current.length) {
      const id = setTimeout(() => setCharIdx((c) => c + 1), 200);
      return () => clearTimeout(id);
    }
    // Part done — pause then clear and move to next
    const id = setTimeout(() => {
      setPartIdx((p) => (p + 1) % PARTS.length);
      setCharIdx(0);
    }, 1400);
    return () => clearTimeout(id);
  }, [charIdx, partIdx]);

  return (
    <span className="block leading-[1.8]" style={{ fontSize: "clamp(22px, 3.5vw, 48px)" }}>
      <span className="text-white">
        {PARTS[partIdx].slice(0, charIdx)}
        <span className="inline-block w-[2px] h-[0.9em] bg-violet-400 ml-0.5 align-middle animate-pulse" />
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
          <TypewriterParts />
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
          <span className="font-bold tracking-[0.18em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-500 text-[24px] sm:text-[24px]">
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
