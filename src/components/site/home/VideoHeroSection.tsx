"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Banner carousel — add more images here and the hero rotates through them.
const HERO_SLIDES = [
  {
    src: "/images/home/homehero.jpeg",
    alt: "Human and AI hands reaching toward each other, symbolizing AI-powered learning",
  },
];
const SLIDE_INTERVAL_MS = 5000;

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
    <>
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex flex-col bg-[#040610]">

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

          {/* Hero content */}
          <div
            className={cn(
              "relative z-[3] flex flex-1 flex-col items-center justify-between px-6 pt-[120px] pb-12 lg:pb-16 w-full max-w-[1300px] mx-auto text-center transition-all duration-[900ms] ease-in-out",
              loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-[30px]"
            )}
          >
            <h1 className="font-extrabold tracking-[-0.02em] !text-white text-3xl sm:text-4xl lg:text-5xl leading-tight w-full max-w-5xl drop-shadow-[0_2px_18px_rgba(0,0,0,0.6)]">
              <span className="block mb-6 lg:mb-10 bg-gradient-to-r from-violet-300 to-blue-300 bg-clip-text text-transparent">
                AI course in Pune
              </span>
              C3iHub IIT Kanpur-backed training in AI, data analytics and cybersecurity
            </h1>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
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
          </div>
      </section>

      {/* Intro paragraph below the hero */}
      <section className="w-full px-4 sm:px-6 py-10 lg:py-14 bg-white">
        <div className="container mx-auto max-w-[1300px] px-6">
          <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700 text-center">
            Looking for the right AI course in Pune? MindLyft AI offers hands-on, project-based training in Data Analytics, Generative AI, Agentic AI, and Cybersecurity, backed by a joint certification with IIT Kanpur&apos;s C3iHub and mentorship from working industry experts. Whether you are starting your career or upskilling into AI, every program is built around real projects and outcomes that actually matter to employers, not just a certificate to add to your profile. Learn offline at our Akurdi campus in Pimpri-Chinchwad, or choose a hybrid batch that fits around your working week.
          </p>
        </div>
      </section>
    </>
  );
}
