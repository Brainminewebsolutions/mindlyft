"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mouse } from "lucide-react";
import { cn } from "@/lib/utils";

// Banner carousel — add more images here and the hero rotates through them.
const HERO_SLIDES = [
  {
    src: "/images/home/homehero.jpeg",
    alt: "Human and AI hands reaching toward each other, symbolizing AI-powered learning",
  },
];
const SLIDE_INTERVAL_MS = 5000;

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
        className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent drop-shadow-[0_2px_18px_rgba(0,0,0,0.85)]"
        style={{
          display:    "inline-block",
          transition: "opacity 0.4s ease, transform 0.4s ease",
          opacity:    visible ? 1 : 0,
          transform:  visible ? "translateY(0)" : "translateY(-12px)",
          WebkitTextStroke: "1px rgba(0,0,0,0.35)",
        }}
      >
        {PARTS[idx]}
      </span>
    </span>
  );
}

export default function VideoHeroSection() {
  const [loaded, setLoaded] = useState(false);
  const [slide,  setSlide]  = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (HERO_SLIDES.length < 2) return;
    const t = setInterval(() => setSlide((i) => (i + 1) % HERO_SLIDES.length), SLIDE_INTERVAL_MS);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex flex-col bg-[#040610]">

      {/* Background image */}
      {HERO_SLIDES.map((s, i) => (
        <Image
          key={s.src}
          src={s.src}
          alt={s.alt}
          fill
          priority={i === 0}
          sizes="100vw"
          className={cn(
            "absolute inset-0 object-cover object-center z-0 transition-opacity duration-1000 ease-in-out",
            i === slide ? "opacity-100" : "opacity-0"
          )}
        />
      ))}

      {/* Dark overlay for headline legibility */}
      <div className="absolute inset-0 z-[1] bg-black/40 pointer-events-none" />

      {/* Purple radial tint */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(108,99,255,.10) 0%, transparent 70%)" }}
      />

      {/* Scan line */}
      <div
        className="absolute left-0 right-0 h-0.5 z-[2] pointer-events-none animate-[mlScan_8s_linear_infinite]"
        style={{ background: "linear-gradient(90deg,transparent,rgba(108,99,255,.45),rgba(56,217,245,.45),transparent)" }}
      />

      {/* Hero content */}
      <div
        className={cn(
          "relative z-[3] flex flex-1 flex-col px-6 pt-[120px] pb-12 max-w-[1300px] w-full mx-auto text-center lg:text-left transition-all duration-[900ms] ease-in-out",
          loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
        )}
      >
        {/* Heading (left) + description (right) */}
        <div className="grid flex-1 grid-cols-1 lg:grid-cols-2 items-center gap-8 lg:gap-14">
          <h1 className="font-extrabold tracking-[-0.02em] !text-white text-3xl sm:text-4xl lg:text-5xl leading-tight w-full drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
            <span className="bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
              AI course in Pune
            </span>{" "}
            — IIT Kanpur-backed training in AI, data analytics and cybersecurity
          </h1>

          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-white/90 drop-shadow-[0_1px_10px_rgba(0,0,0,0.6)]">
            Looking for the right AI course in Pune? MindLyft AI offers hands-on, project-based training in Data Analytics, Generative AI, Agentic AI, and Cybersecurity, backed by a joint certification with IIT Kanpur&apos;s C3iHub and mentorship from working industry experts. Whether you are starting your career or upskilling into AI, every program is built around real projects and outcomes that actually matter to employers, not just a certificate to add to your profile. Learn offline at our Akurdi campus in Pimpri-Chinchwad, or choose a hybrid batch that fits around your working week.
          </p>
        </div>

        {/* Buttons — pinned to the bottom of the hero */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4">
          <Link
            href="/contact"
            className="px-6 py-3 rounded-xl text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-violet-500 to-blue-500 hover:from-violet-600 hover:to-blue-600 shadow-lg transition-colors"
          >
            Book a Free Demo Class
          </Link>
          <Link
            href="/courses"
            className="px-6 py-3 rounded-xl text-sm sm:text-base font-semibold text-white border border-white/70 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          >
            Download Course Syllabus
          </Link>
        </div>

        {/* <div className="w-full">
          <AnimatedParts />
        </div> */}
      </div>

      {/* Scroll hint ("Three Pillars, One Vision") — hidden
      <div
        className={cn(
          "absolute bottom-8 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-2 pointer-events-none animate-[mlBounce_2s_ease-in-out_infinite]",
          loaded ? "opacity-100" : "opacity-0"
        )}
        style={{ transition: "opacity 1s ease 1.4s" }}
      >
        <div className="flex items-center justify-center gap-2 sm:gap-2.5 px-4">
          <span className="hidden h-px w-8 shrink-0 bg-gradient-to-r from-transparent to-violet-400/70 sm:block" />
          <span className="whitespace-nowrap text-center font-bold tracking-[0.1em] sm:tracking-[0.18em] uppercase text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-blue-400 text-[13px] sm:text-[24px]">
            Three Pillars, One Vision
          </span>
          <span className="hidden h-px w-8 shrink-0 bg-gradient-to-l from-transparent to-blue-400/70 sm:block" />
        </div>
        <Mouse size={20} color="rgba(180,200,255,.5)" strokeWidth={1.5} />
      </div> */}

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-[140px] bg-gradient-to-t from-[#040610] to-transparent z-[2] pointer-events-none" />

    </section>
  );
}
