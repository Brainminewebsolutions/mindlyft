"use client";

import { useState, useEffect, useRef } from "react";
import { TrendingUp } from "lucide-react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Subheading } from "@/components/ui/Subheading";

/**
 * Each step carries pre-composed Tailwind class strings instead of raw color
 * values. They must be written as complete literal strings (not concatenated
 * at runtime) so Tailwind's JIT scanner can find and generate them.
 */
const steps = [
  {
    number: "01",
    tag: "Focused Learning",
    headline: "Learning Services –",
    headlineBold: "Transforming Education into Industry-Ready Excellence",
    video: "/Fir1.mp4",
    features: [
      {
        title: "Focused Learning",
        desc: "Industry-aligned programs designed to bridge the gap between academic knowledge and real-world application.",
      },
      {
        title: "Future-Ready Curriculum",
        desc: "Courses built around emerging technologies, AI, and evolving industry standards to ensure long-term relevance.",
      },
      {
        title: "Career Enablement Ecosystem",
        desc: "Integrated mentorship, live projects, certifications, and placement support to accelerate learner outcomes.",
      },
    ],
    accent: {
      text: "text-violet-600",
      bg: "bg-violet-600",
      sectionBg: "bg-violet-50",
      iconShadow: "shadow-[0_4px_18px_#8B5CF655]",
      cardShadow: "shadow-[0_32px_72px_rgba(0,0,0,0.18),0_0_60px_#8B5CF622]",
      innerRing: "shadow-[inset_0_0_0_1px_#8B5CF644]",
      border: "border-violet-300",
      progress: "bg-gradient-to-r from-violet-600 to-violet-400",
    },
    image: "/images/home/whatwedo/Learning.jpg",
    imageAlt: "Students learning",

  },
  {
    number: "02",
    tag: "AI Services",
    headline: "AI Services –",
    headlineBold: "Building Intelligent Solutions That Drive Business Impact",
    video: "/Fir2.mp4",
    features: [
      {
        title: "AI Strategy & Consulting",
        desc: "Helping organizations identify, design, and adopt AI use cases aligned with their business goals.",
      },
      {
        title: "Custom AI Development",
        desc: "End-to-end development of AI, ML, automation, and data-driven solutions tailored to enterprise needs.",
      },
      {
        title: "Data & Intelligence Solutions",
        desc: "Transforming raw data into actionable insights through analytics, predictive models, and intelligent dashboards.",
      },
    ],
    accent: {
      text: "text-indigo-500",
      bg: "bg-indigo-500",
      sectionBg: "bg-indigo-50",
      iconShadow: "shadow-[0_4px_18px_#6366F155]",
      cardShadow: "shadow-[0_32px_72px_rgba(0,0,0,0.18),0_0_60px_#6366F122]",
      innerRing: "shadow-[inset_0_0_0_1px_#6366F144]",
      border: "border-indigo-300",
      progress: "bg-gradient-to-r from-indigo-500 to-indigo-400",
    },
    image: "/images/home/whatwedo/AI.jpg",
    imageAlt: "AI services",
  },
  {
    number: "03",
    tag: "Innovative Products",
    headline: "Innovative Products –",
    headlineBold: "Creating Scalable Products for Tomorrow's Challenges",
    video: "/Fir3.mp4",
    features: [
      {
        title: "AI-Powered Platforms",
        desc: "Next-generation digital products leveraging AI to enhance efficiency, personalization, and decision-making.",
      },
      {
        title: "Problem-Driven Innovation",
        desc: "Products designed by deeply understanding real-world problems across education, business, and technology.",
      },
      {
        title: "Scalable & Sustainable Design",
        desc: "Built with modular architecture to scale across industries while ensuring long-term adaptability.",
      },
    ],
    accent: {
      text: "text-blue-500",
      bg: "bg-blue-500",
      sectionBg: "bg-blue-50",
      iconShadow: "shadow-[0_4px_18px_#3B82F655]",
      cardShadow: "shadow-[0_32px_72px_rgba(0,0,0,0.18),0_0_60px_#3B82F622]",
      innerRing: "shadow-[inset_0_0_0_1px_#3B82F644]",
      border: "border-blue-300",
      progress: "bg-gradient-to-r from-blue-500 to-blue-400",
    },
    image: "/images/home/whatwedo/InnovativeProducts.jpeg",
    imageAlt: "Innovative products",
  },
];

type Accent = (typeof steps)[number]["accent"];

function StepIcon({ accent }: { accent: Accent }) {
  return (
    <div
      className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${accent.bg} ${accent.iconShadow}`}
    >
      <TrendingUp size={22} color="white" strokeWidth={2.2} />
    </div>
  );
}

export default function WhatWeDo() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const totalHeight = section.offsetHeight - window.innerHeight;
      const scrolled = -rect.top;
      const pct = Math.max(0, Math.min(1, scrolled / totalHeight));
      setProgress(pct);

      let closest = 0;
      let minDist = Infinity;
      stepRefs.current.forEach((el, i) => {
        if (!el) return;
        const r = el.getBoundingClientRect();
        const center = r.top + r.height / 2;
        const dist = Math.abs(center - window.innerHeight * 0.45);
        if (dist < minDist) {
          minDist = dist;
          closest = i;
        }
      });
      setActiveIndex(closest);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Only the active step's video plays — the other two stay paused so the
  // section doesn't autoplay/download 3 videos at once.
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeIndex) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex]);

  const active = steps[activeIndex];

  return (
    <section ref={sectionRef} className="relative bg-white">
      {/* Section Header */}
      <div className="mx-auto max-w-[1200px] px-6 pt-16 text-center lg:px-12">
        <SectionBadge variant = "dark">What We Do</SectionBadge>
        <Subheading
          className="m-0 leading-[1.2] tracking-[-0.03em]"
          text="Explore Our Top-Class Services and"
          highlight="Unlock Your True Potential."
          highlightClassName="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text !text-transparent"
        />
      </div>

      <div className="relative mx-auto flex max-w-[1200px] flex-col items-start gap-10 px-4 lg:flex-row lg:gap-16 lg:px-12">
        {/* LEFT — scrolling content */}
        <div className="w-full flex-1 py-[6vh]">
          {steps.map((step, i) => {
            const isActive = i === activeIndex;
            return (
              <div
                key={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className={`flex min-h-0 items-center py-8 transition-opacity duration-[450ms] ease-out lg:min-h-[80vh] ${
                  isActive ? "opacity-100" : "opacity-[0.22]"
                }`}
              >
                <div className={`max-w-[500px] rounded-3xl px-4 py-8 ${step.accent.sectionBg}`}>
                  {/* Image — shown per-step on mobile/tablet; desktop uses the shared sticky image on the right */}
                  <div className="mb-6 overflow-hidden rounded-2xl lg:hidden">
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      className="aspect-[4/3] w-full object-cover"
                    />
                  </div>

                  {/* Headline */}
                  <h2 className="mb-8 text-[clamp(1.6rem,3vw,2.4rem)] font-black leading-[1.18] tracking-[-0.02em]">
                    <span className={step.accent.text}>{step.headline} </span>
                    <span className="text-[#111]">{step.headlineBold}</span>
                  </h2>

                  {/* Features */}
                  <div className="mb-[2.4rem] flex flex-col gap-[1.6rem]">
                    {step.features.map((feat, fi) => (
                      <div key={fi} className="flex items-start gap-4">
                        <StepIcon accent={step.accent} />
                        <div>
                          <p className="mb-[0.35rem] text-base font-bold tracking-[-0.01em] text-[#111]">
                            {feat.title}
                          </p>
                          <p className="text-[0.92rem] font-normal leading-[1.7] text-[#5a5a72]">
                            {feat.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <button
                    className={`cursor-pointer rounded-full border-none px-8 py-[0.85rem] text-[0.95rem] font-bold text-white transition-[filter,transform,box-shadow] duration-200 hover:-translate-y-px hover:brightness-110 hover:shadow-[0_8px_28px_rgba(0,0,0,0.25)] ${step.accent.bg}`}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* RIGHT — sticky shared image, desktop only; mobile/tablet show each step's own image inline instead */}
        <div className="hidden lg:flex h-fit flex-col gap-4 lg:w-[460px] lg:flex-shrink-0 lg:sticky lg:top-[30vh] lg:py-8 lg:pb-20">
          <div
            className={`relative overflow-hidden rounded-2xl border border-violet-900/20 bg-[#0d0f1e] transition-shadow duration-[650ms] ease-in-out ${active.accent.cardShadow}`}
          >
            <div
              className={`pointer-events-none absolute inset-0 z-10 rounded-2xl transition-shadow duration-[650ms] ease-in-out ${active.accent.innerRing}`}
            />

            <div className="relative aspect-[4/3]">
              {steps.map((step, i) => (
                <img
                  key={i}
                  src={step.image}
                  alt={step.imageAlt}
                  className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[550ms] ease-in-out ${
                    i === activeIndex
                      ? "z-[2] translate-y-0 scale-100 opacity-100"
                      : "z-[1] translate-y-[14px] scale-[0.97] opacity-0"
                  }`}
                />
              ))}
              {/* {steps.map((step, i) => (
  <video
    key={i}
    ref={(el) => {
      videoRefs.current[i] = el;
    }}
    muted
    loop
    playsInline
    preload={Math.abs(i - activeIndex) <= 1 ? "auto" : "none"}
    className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[550ms] ease-in-out ${
      i === activeIndex
        ? "z-[2] translate-y-0 scale-100 opacity-100"
        : "z-[1] translate-y-[14px] scale-[0.97] opacity-0"
    }`}
  >
    <source src={step.video} type="video/mp4" />
  </video>
))} */}

              {/* Tag pill */}
              {/* <div
                className={`absolute left-3 top-3 z-20 rounded-full border border-white/[0.08] bg-[rgba(5,6,15,0.72)] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide backdrop-blur-sm transition-colors duration-500 ${active.accent.text}`}
              >
                ● {active.tag}
              </div> */}

              {/* Step counter */}
              {/* <div
                className={`absolute right-3 top-3 z-20 rounded-full border bg-[rgba(5,6,15,0.72)] px-3 py-1 text-xs font-semibold backdrop-blur-sm transition-colors duration-500 ${active.accent.text} ${active.accent.border}`}
              >
                {active.number} / {String(steps.length).padStart(2, "0")}
              </div> */}

              {/* Bottom gradient */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-10 h-[45%] bg-gradient-to-t from-[rgba(13,15,30,0.78)] to-transparent" />

              {/* Title overlay */}
              {/* <div className="absolute bottom-4 left-4 right-4 z-20">
                <p className="text-[1.05rem] font-extrabold leading-[1.35] tracking-[-0.01em] text-white [text-shadow:0_2px_10px_rgba(0,0,0,0.5)]">
                  {active.headlineBold}
                </p>
              </div> */}
            </div>
          </div>
 
        </div>
      </div>
    </section>
  );
}