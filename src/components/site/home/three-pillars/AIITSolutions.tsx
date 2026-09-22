"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import HeroBlock from "@/components/site/HeroBlock";
import { useState } from "react";

// ── Services data — fill in your own content ─────────────────────────────────

type Service = {
  srno: string;
  image: string;
  title: string;
  subtitle: string;
  items: string[];
  tags: string[];
};

const SERVICES: Service[] = [
  {
    srno: "01",
    image: "images/Ai_and_advance_intelligence.jpeg",
    title: "AI & Advanced Intelligence",
    subtitle: "AI-led transformation, intelligence, and innovation",
    items: [
      "AI-First Strategy",
      "Artificial Intelligence Solutions",
      "Generative AI",
     ],
    tags: ["Enterprise", "Startups", "BFSI","Healthcare"],
  },
  {
    srno: "02",
    image: "images/Data_analytics.jpeg",
    title: "Data, Analytics & Insights",
    subtitle: "Turning data into business intelligence",
    items: [
      "Data & Analytics",
      "Data Transformation Services",
      "Data Operations",
     ],
    tags: ["Enterprise", "Manufacturing", "Finance", "Healthcare"],
  },
  {
    srno: "03",
    image: "images/software.jpeg",
    title: "Software & Application Engineering",
    subtitle: "Building scalable, modern digital products",
    items: [
      "Software Development",
      "Application Development & Management",
      "Web, Mobile & App Development",
     ],
    tags: ["Enterprise", "Startups", "EdTech", "FinTech"],
  },
  {
    srno: "04",
    image: "images/Ai_products.jpeg",
    title: "Process Optimisation & Automation",
    subtitle: "Efficiency, productivity, and cost optimisation",
    items: [
      "Process Improvement & Automation",
      "Intelligent Workflow Automation",
      "Operational Optimisation",
     ],
    tags: ["Manufacturing", "Enterprises", "IT Services" ],
  },
  {
    srno: "05",
    image: "images/Cybersecurity.jpeg",
    title: "Cybersecurity & IT Security",
    subtitle: "Protection, compliance, and risk mitigation",
    items: [
      "Enterprise IT Security",
      "Security Architecture & Compliance",
      ],
    tags: ["BFSI", "Healthcare", "Government","Enterprises" ],
  },
];

// ── Service card ──────────────────────────────────────────────────────────────

function ServicesCarousel() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);

  function go(next: number) {
    setDirection(next > active ? 1 : -1);
    setActive(next);
  }
  function prev() { go(active === 0 ? SERVICES.length - 1 : active - 1); }
  function next() { go(active === SERVICES.length - 1 ? 0 : active + 1); }

  const service = SERVICES[active];

  return (
    <div className="flex flex-col gap-6">
      {/* Card */}
      <div className="relative overflow-hidden rounded-3xl">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={active}
            custom={direction}
            initial={{ opacity: 0, x: direction * 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: direction * -60 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="group flex flex-col sm:flex-row bg-white border border-gray-100 shadow-sm rounded-3xl overflow-hidden"
          >
            {/* Image — left */}
            <div className="relative w-full sm:w-72 lg:w-[420px] shrink-0 aspect-[4/3] sm:aspect-auto overflow-hidden">
              <Image
                src={service.image}
                alt={service.title}
                fill
                sizes="(max-width: 640px) 100vw, 420px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-blue-500/10" />
              {/* Serial number */}
              <div className="absolute top-4 left-4">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-[14px] font-extrabold text-violet-600 shadow-sm">
                  {service.srno}
                </span>
              </div>
            </div>

            {/* Content — right */}
            <div className="flex flex-col flex-1 p-8 gap-5">
              <div>
                <h3 className="text-[1.4rem] font-extrabold text-gray-900 leading-snug">
                  {service.title}
                </h3>
                <p className="mt-2 text-[14.5px] text-gray-500 leading-relaxed">
                  {service.subtitle}
                </p>
              </div>

              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {service.items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-[13.5px] text-gray-600">
                    <CheckCircle2 size={15} className="text-violet-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-5 border-t border-gray-100 flex flex-wrap gap-2">
                {service.tags.map(tag => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-semibold bg-violet-50 text-violet-600 border border-violet-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {SERVICES.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i)}
              className={`transition-all duration-300 rounded-full ${
                i === active
                  ? "w-6 h-2 bg-gradient-to-r from-violet-500 to-blue-500"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        {/* Prev / Next */}
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-200 text-gray-500 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 transition-all duration-200"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 text-white hover:from-violet-600 hover:to-blue-600 transition-all duration-200 shadow-sm"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Page component ────────────────────────────────────────────────────────────

export default function AIITSolutions() {
  return (
    <>
      {/* ── HERO ── */}
      <HeroBlock
        badge="AI & IT Solutions"
        title={
          <>
            Discover how{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              Mindlyft AI&apos;s
            </span>{" "}
            services and solutions.
          </>
        }
        subtitle="We help organisations transform digital challenges into measurable business outcomes."
        sideImage="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1200&q=90"
        bg="light"
        reverse
      />

      {/* ── SERVICES & CAPABILITIES ── */}
      <section className="relative overflow-hidden bg-gray-50 py-24">

        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/60 via-gray-50 to-blue-50/60 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* Section header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <motion.span
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-600 text-[12px] font-semibold uppercase tracking-widest mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              Services &amp; Capabilities
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-tight tracking-tight text-gray-900"
            >
              Explore our{" "}
              <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                AI Services
              </span>{" "}
              to learn better and improve your results.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="mt-4 text-[clamp(0.95rem,1.6vw,1.1rem)] text-gray-500 leading-relaxed"
            >
              Leverage intelligent solutions designed to enhance learning, streamline decisions,
              and drive measurable outcomes.
            </motion.p>
          </div>

          <ServicesCarousel />

        </div>
      </section>

      {/* ── SECTION 3 ── */}
      <section className="relative overflow-hidden bg-white py-24">

        {/* Background accents */}
        <div className="absolute inset-0 bg-gradient-to-bl from-blue-50 via-white to-violet-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[350px] h-[350px] rounded-full bg-violet-100 opacity-50 blur-[100px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[350px] h-[350px] rounded-full bg-blue-100 opacity-50 blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">

            {/* Image — right (reversed row puts it on the right) */}
            <motion.div
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex-1 min-w-0 w-full"
            >
              <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl shadow-violet-100">
                {/* ── REPLACE src with your image ── */}
                <Image
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=90"
                  alt="Section image"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-tl from-blue-500/15 via-transparent to-violet-500/15" />
              </div>
            </motion.div>

            {/* Text — left */}
            <div className="flex-1 min-w-0">

              {/* Badge */}
              <motion.span
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45 }}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-600 text-[12px] font-semibold uppercase tracking-widest mb-6"
              >
                {/* ── REPLACE label ── */}
                <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
                Your Badge Label
              </motion.span>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.08 }}
                className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-tight tracking-tight text-gray-900"
              >
                {/* ── REPLACE title ── */}
               Upskill your {" "}
                <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                   team 
                </span>{" "}with our
courses
               </motion.h2>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.16 }}
                className="mt-5 text-[clamp(1rem,1.6vw,1.1rem)] text-gray-500 leading-relaxed"
              >
                {/* ── REPLACE description ── */}
                Prepare your workforce for the future with cutting-edge learning in Artificial Intelligence and Data-driven technologies. Our EdTech platform features 5 specialized categories and 30+ industry-focused courses designed to help teams master the skills that power today’s digital world. From AI fundamentals and machine learning to data analysis and intelligent automation, each course combines practical knowledge, real-world applications, and hands-on learning. Whether you're building technical expertise or strengthening data-driven decision-making, our programs enable your team to innovate, adapt, and stay ahead in a rapidly evolving industry.
              </motion.p>

              {/* Divider accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 h-1 w-16 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 origin-left"
              />

            </div>
          </div>
        </div>
      </section>
    </>
  );
}
