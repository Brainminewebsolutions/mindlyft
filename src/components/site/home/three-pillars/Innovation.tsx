"use client";

import Link from "next/link";
import ContactForm from "@/components/site/contact/ContactForm";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Cloud, ShieldCheck, Zap, ChevronLeft, ChevronRight, UserRound } from "lucide-react";
import HeroBlock from "@/components/site/HeroBlock";

// ── Products data ─────────────────────────────────────────────────────────────

type Product = {
  image: string;
  name: string;
  tag: string;
  description: string;
};

const PRODUCTS: Product[] = [
  {
    // Social media analytics / sentiment
    image: "images/Sent_ai.jpeg",
    name: "SentixAI",
    tag: "(Social Media Sentiment Intelligence)",
    description: "Add your product description here. Describe what this product does and the value it delivers to customers.",
  },
  {
    // Document processing / scanning
    image: "images/Document_ai.jpeg",
    name: "DocuMind AI",
    tag: "(Intelligent Document Processing)",
    description: "Add your product description here. Describe what this product does and the value it delivers to customers.",
  },
  {
    // Recruitment / hiring / people
    image: "images/Hir_ genius_ai.jpeg",
    name: "HireGenius AI",
    tag: "(Intelligent Talent Acquisition)",
    description: "Add your product description here. Describe what this product does and the value it delivers to customers.",
  },
  {
    // Interview / coaching / preparation
    image: "images/Prep_smart_ai.jpeg",
    name: "Prep Smart AI",
    tag: "(Intelligent Interview Coach)",
    description: "Add your product description here. Describe what this product does and the value it delivers to customers.",
  },
  {
    // Performance / resource dashboard
    image: "images/Optic ore_ai.jpeg",
    name: "OptiCore AI",
    tag: "(Resource & Performance Intelligence)",
    description: "Add your product description here. Describe what this product does and the value it delivers to customers.",
  },
];

// ── Testimonials data ─────────────────────────────────────────────────────────

const TESTIMONIALS = [
  {
    quote: "Mindlyft AI transformed how we approach our digital challenges. Their solutions delivered measurable outcomes within weeks.",
    name: "Sarah Johnson",
    role: "CTO",
    company: "TechCorp Global",
    gradient: "from-violet-500 to-indigo-500",
  },
  {
    quote: "The innovation and expertise the Mindlyft AI team brings is unmatched. We saw a 40% improvement in operational efficiency.",
    name: "Rajiv Mehta",
    role: "Head of Operations",
    company: "Nexgen Solutions",
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    quote: "Working with Mindlyft AI felt like having a world-class tech partner embedded within our team. Truly exceptional.",
    name: "Emily Clarke",
    role: "CEO",
    company: "FutureScale Inc.",
    gradient: "from-blue-500 to-cyan-500",
  },
];

// ── Animated avatar ───────────────────────────────────────────────────────────

const DOTS = [
  { top: "-8px",  left: "50%",  delay: 0    },
  { top: "50%",   left: "-8px", delay: 0.4  },
  { top: "100%",  left: "50%",  delay: 0.8  },
  { top: "50%",   left: "100%", delay: 1.2  },
];

function AnimatedAvatar({ gradient }: { gradient: string }) {
  return (
    <div className="relative w-16 h-16 shrink-0">
      {/* Spinning gradient ring */}
      <motion.div
        className={`absolute -inset-2 rounded-full bg-gradient-to-br ${gradient} opacity-20`}
        animate={{ rotate: 360 }}
        transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className={`absolute -inset-1 rounded-full border-2 border-transparent bg-gradient-to-br ${gradient} opacity-40`}
        style={{ borderRadius: "50%" }}
        animate={{ rotate: -360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      {/* Floating orbit dots */}
      {DOTS.map((d, i) => (
        <motion.span
          key={i}
          className={`absolute w-2 h-2 rounded-full bg-gradient-to-br ${gradient}`}
          style={{ top: d.top, left: d.left, translateX: "-50%", translateY: "-50%" }}
          animate={{ scale: [1, 1.6, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: d.delay, ease: "easeInOut" }}
        />
      ))}

      {/* Icon circle */}
      <div className={`relative w-16 h-16 rounded-full bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
        {/* Pulsing glow */}
        <motion.div
          className={`absolute inset-0 rounded-full bg-gradient-to-br ${gradient}`}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0.2, 0.6] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <UserRound size={28} className="relative z-10 text-white" strokeWidth={1.5} />
      </div>
    </div>
  );
}

// ── Testimonials spotlight ────────────────────────────────────────────────────

function TestimonialsSpotlight() {
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);

  function go(n: number) {
    setDir(n > active ? 1 : -1);
    setActive(n);
  }
  const prev = () => go(active === 0 ? TESTIMONIALS.length - 1 : active - 1);
  const next = () => go(active === TESTIMONIALS.length - 1 ? 0 : active + 1);
  const t = TESTIMONIALS[active];

  return (
    <section className="relative overflow-hidden bg-white py-24">

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-white to-blue-50/50 pointer-events-none" />

      {/* Giant decorative quote mark */}
      <div className="absolute top-8 left-8 text-[14rem] leading-none font-black text-violet-100 select-none pointer-events-none">&ldquo;</div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 sm:px-10 lg:px-16">

        {/* Label */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 mb-12"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-violet-200" />
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-600 text-[12px] font-semibold uppercase tracking-widest">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
            What Our Customers Say
          </span>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-blue-200" />
        </motion.div>

        {/* Quote area */}
        <div className="relative min-h-[180px] flex items-center">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={active}
              custom={dir}
              initial={{ opacity: 0, y: dir * 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: dir * -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="w-full"
            >
              {/* Quote */}
              <p className="text-[clamp(1.2rem,2.8vw,2rem)] font-semibold text-gray-800 leading-relaxed mb-10">
                &ldquo;{t.quote}&rdquo;
              </p>

              {/* Author row */}
              <div className="flex items-center gap-5">

                <AnimatedAvatar gradient={t.gradient} />

                <div>
                  <p className="text-[15px] font-bold text-gray-900">{t.name}</p>
                  <p className="text-[13px] text-gray-400">{t.role} &middot; {t.company}</p>
                </div>

                <div className={`ml-4 h-0.5 flex-1 bg-gradient-to-r ${t.gradient} opacity-25 hidden sm:block`} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="mt-12 flex items-center justify-between">
          {/* Avatar thumbnails */}
          <div className="flex items-center gap-3">
            {TESTIMONIALS.map((item, i) => (
              <button
                key={i}
                onClick={() => go(i)}
                className={`relative rounded-full flex items-center justify-center transition-all duration-300 bg-gradient-to-br ${item.gradient} ${
                  i === active
                    ? "w-10 h-10 shadow-md opacity-100 ring-2 ring-offset-2 ring-violet-400"
                    : "w-8 h-8 opacity-40 hover:opacity-70"
                }`}
              >
                <UserRound size={i === active ? 18 : 14} className="text-white" strokeWidth={1.5} />
              </button>
            ))}
          </div>

          {/* Counter + arrows */}
          <div className="flex items-center gap-3">
            <span className="text-[13px] text-gray-400 font-medium tabular-nums">
              {String(active + 1).padStart(2, "0")} / {String(TESTIMONIALS.length).padStart(2, "0")}
            </span>
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-violet-300 hover:text-violet-600 hover:bg-violet-50 transition-all"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-violet-500 to-blue-500 flex items-center justify-center text-white hover:from-violet-600 hover:to-blue-600 transition-all shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}

// ── Pillars data ──────────────────────────────────────────────────────────────

const PILLARS = [
  {
    icon: Cloud,
    label: "01",
    title: "Cloud Architecture",
    gradient: "from-violet-500 to-indigo-500",
    lightBg: "bg-violet-50",
    border: "border-violet-100",
    iconColor: "text-violet-500",
    description:
      "Design and deploy scalable, resilient cloud infrastructure tailored to your business needs — from multi-cloud strategies to serverless architectures.",
  },
  {
    icon: ShieldCheck,
    label: "02",
    title: "Cybersecurity",
    gradient: "from-indigo-500 to-blue-500",
    lightBg: "bg-indigo-50",
    border: "border-indigo-100",
    iconColor: "text-indigo-500",
    description:
      "Protect your digital assets with end-to-end security frameworks, threat intelligence, and compliance-ready solutions built for the modern enterprise.",
  },
  {
    icon: Zap,
    label: "03",
    title: "Automation",
    gradient: "from-blue-500 to-cyan-500",
    lightBg: "bg-blue-50",
    border: "border-blue-100",
    iconColor: "text-blue-500",
    description:
      "Eliminate manual effort with intelligent workflow automation — from robotic process automation to AI-driven decision systems that scale with you.",
  },
];

export default function Innovation() {
  return (
    <>
      <HeroBlock
        badge="Innovation"
        title={
          <>
            AI Products Built to Solve Real{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              Business Challenges
            </span>
          </>
        }
        subtitle="Practical AI solutions designed to deliver measurable impact across your business."
        sideImage="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=90"
        bg="light"
      >
        <div className="flex flex-wrap gap-4 pt-2">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 text-white font-semibold text-[15px] hover:from-violet-600 hover:to-blue-600 transition-all duration-200 shadow-md shadow-violet-200"
          >
            Start Innovating <ArrowRight size={15} />
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-violet-200 text-violet-700 font-semibold text-[15px] hover:bg-violet-50 hover:border-violet-300 transition-all duration-200"
          >
            Learn More
          </Link>
        </div>
      </HeroBlock>

      {/* ── PILLARS SECTION ── */}
      <section className="relative overflow-hidden bg-white py-20">

        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/60 via-white to-blue-50/60 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          {PILLARS.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-center gap-6 py-8 ${i !== PILLARS.length - 1 ? "border-b border-gray-100" : ""}`}
              >
                {/* Number */}
                <span className={`shrink-0 text-[1rem] font-black bg-gradient-to-r ${p.gradient} bg-clip-text text-transparent w-8`}>
                  {p.label}
                </span>

                {/* Icon */}
                <div className={`shrink-0 flex items-center justify-center w-11 h-11 rounded-xl ${p.lightBg}`}>
                  <Icon size={20} className={p.iconColor} />
                </div>

                {/* Title */}
                <h3 className="flex-1 text-[clamp(1.4rem,3vw,2rem)] font-extrabold text-gray-900 tracking-tight">
                  {p.title}
                </h3>

                {/* Gradient accent line */}
                <div className={`shrink-0 hidden sm:block h-0.5 w-24 rounded-full bg-gradient-to-r ${p.gradient}`} />
              </motion.div>
            );
          })}

        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="relative overflow-hidden bg-white py-24">

        <div className="absolute inset-0 bg-gradient-to-br from-violet-50/50 via-white to-blue-50/50 pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-16"
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-violet-200 bg-violet-50 text-violet-600 text-[12px] font-semibold uppercase tracking-widest mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-500" />
              Our Products
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,2.8rem)] font-extrabold leading-tight tracking-tight text-gray-900 max-w-xl">
              Built for{" "}
              <span className="bg-gradient-to-r from-violet-500 to-blue-500 bg-clip-text text-transparent">
                real-world
              </span>{" "}
              impact
            </h2>
          </motion.div>

          {/* Product cards */}
          <div className="flex flex-col gap-8">
            {PRODUCTS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className={`group flex flex-col ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-10 bg-gray-50 rounded-3xl border border-gray-100 overflow-hidden hover:shadow-lg hover:border-violet-100 transition-all duration-300`}
              >
                {/* Image */}
                <div className="relative w-full md:w-[45%] shrink-0 aspect-[16/10] overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/15 via-transparent to-blue-500/15" />

                  {/* Tag over image */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm text-[11px] font-bold uppercase tracking-widest text-violet-600 shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-500 to-blue-500" />
                      {p.tag}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-4 p-8 md:p-10 flex-1 min-w-0">
                  <h3 className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-extrabold text-gray-900 leading-snug">
                    {p.name}
                  </h3>
                  <p className="text-[15px] text-gray-500 leading-relaxed">
                    {p.description}
                  </p>
                  <div className="mt-2">
                    <Link
                      href="/contact"
                      className="inline-flex items-center gap-2 text-[14px] font-semibold text-violet-600 hover:text-blue-600 transition-colors duration-200"
                    >
                      Learn more <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <TestimonialsSpotlight />

      {/* ── CONTACT FORM ── */}
      <ContactForm />
    </>
  );
}
