"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen, Wrench, Video, GraduationCap, ArrowRight,
  Lightbulb, Users, Award, Layers, TrendingUp,
  Compass, Code2, Rocket,
} from "lucide-react";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

/* ─── Data ─────────────────────────────────────────────── */

const PILLARS = [
  {
    num: "01", icon: GraduationCap, name: "IIT Programs",
    tagline: "World-class IIT education",
    description: "Premium programs developed in collaboration with IIT faculty and industry experts. Gain credentials that set you apart.",
    description2: "Certificate programs, research tracks, and live IIT-backed sessions — all in one place.",
    href: "/iit",
    pill: "from-violet-500 to-blue-500", dot: "#8B5CF6", card: "from-violet-600 to-blue-500",
  },
  {
    num: "02", icon: BookOpen, name: "Courses",
    tagline: "Structure your learning journey",
    description: "Structured, self-paced programs built around AI, technology, and emerging skills. Industry-aligned curriculum from beginner to advanced.",
    description2: "Certificate programs, IIT collaborations, and live tracks — all in one place.",
    href: "/courses",
    pill: "from-blue-500 to-indigo-600", dot: "#3B82F6", card: "from-blue-600 to-indigo-600",
  },
  {
    num: "03", icon: Wrench, name: "Workshops",
    tagline: "Hands-on, expert-led sessions",
    description: "Short intensive sessions focused on practical skill building with industry experts. Learn by doing.",
    description2: "Small cohorts, live practice, and immediate real-world results.",
    href: "/workshops",
    pill: "from-indigo-500 to-violet-600", dot: "#6366F1", card: "from-indigo-600 to-violet-600",
  },
  {
    num: "04", icon: Video, name: "Webinars",
    tagline: "Learn from anywhere, anytime",
    description: "Live online sessions on trending topics — AI, innovation, career growth. Interactive Q&A with speakers in real time.",
    description2: "Free and premium sessions with recorded replays available.",
    href: "/webinars",
    pill: "from-violet-400 to-blue-400", dot: "#A78BFA", card: "from-violet-500 to-blue-400",
  },
];

const STATS = [
  { value: "87%",  label: "of AI job listings require hands-on project experience — not just certifications." },
  { value: "3×",   label: "faster career progression with structured, mentor-led learning." },
  { value: "1M+",  label: "AI-ready professionals needed in India by 2026." },
  { value: "₹18L", label: "Average annual salary for skilled AI & Data Science professionals." },
];

const WHY_CARDS = [
  { icon: Lightbulb, title: "AI-ready, industry-aligned curriculum",    desc: "Learn the skills employers actually demand today through practical projects, real datasets, and modern AI workflows.", accent: "#8B5CF6", bg: "#f5f3ff", border: "#e9d5ff" },
  { icon: Layers,    title: "Hybrid by design",                          desc: "Combine live mentorship sessions with flexible learning resources to balance quality and convenience.",                   accent: "#3B82F6", bg: "#eff6ff", border: "#bfdbfe" },
  { icon: Award,     title: "IIT-grade academic credibility",             desc: "Built on rigorous academic foundations while staying deeply connected to industry expectations.",                          accent: "#6366F1", bg: "#eef2ff", border: "#c7d2fe" },
  { icon: Users,     title: "One ecosystem from beginner to expert",      desc: "From foundational concepts to advanced AI applications, every stage of your journey happens inside a single ecosystem.", accent: "#7C3AED", bg: "#faf5ff", border: "#ddd6fe", wide: true },
  { icon: TrendingUp,title: "Placement support included",                 desc: "Resume reviews, portfolio building, mock interviews, networking opportunities, and career guidance built into your program.", accent: "#059669", bg: "#ecfdf5", border: "#a7f3d0" },
];

const OUTCOMES = [
  { tag: "Data Science", title: "Career Switch in 5 Months",           body: "A marketing professional transitioned into Data Science through hands-on projects, portfolio building, and mentorship, securing a role at a fast-growing technology company.",       result: "Placed as Junior Data Analyst" },
  { tag: "Generative AI", title: "Manager to AI Strategist",           body: "A mid-career IT manager leveraged Generative AI and Agentic AI skills to lead enterprise AI initiatives and secure a strategic promotion within months.",                           result: "Promoted to AI Lead" },
  { tag: "IIT Program",   title: "Research-Grade Credibility",          body: "Learners completed advanced AI projects under academic guidance, strengthening research capabilities and enhancing opportunities in AI product organizations.",                       result: "Shortlisted at AI Product Startups" },
  { tag: "Workshop",      title: "Business Intelligence in One Weekend", body: "A finance professional built a complete Power BI dashboard during the workshop and immediately applied it to improve reporting efficiency at work.",                                 result: "30% Faster Reporting Cycle" },
];

const JOURNEY_STEPS = [
  { num: "1", icon: Compass,   title: "Choose your path",       desc: "Counselors help you pick the right program for your goal",           accent: "#8B5CF6" },
  { num: "2", icon: BookOpen,  title: "Learn with structure",   desc: "Live sessions, labs, and mentored projects",                          accent: "#6366F1" },
  { num: "3", icon: Code2,     title: "Build real projects",    desc: "Industry capstones for your portfolio",                               accent: "#3B82F6" },
  { num: "4", icon: Award,     title: "Get certified",          desc: "MindLyft AI + IIT partner certificates",                              accent: "#2563EB" },
  { num: "5", icon: Rocket,    title: "Launch your career",     desc: "Placement support, mock interviews, alumni network",                  accent: "#059669" },
];

const FAQS = [
  { q: "Do I need prior programming experience to join?",                     a: "No prior coding experience is required for most programs. Our foundational courses are designed for complete beginners. For advanced programs like Full Stack AI or Agentic AI Stack, basic Python familiarity is helpful — and we provide preparation guidance before the cohort begins." },
  { q: "Are classes available online or only in Pune?",                        a: "We offer both. Our Pune center runs offline batches with in-person mentorship and lab access. Most programs are also available through live interactive online sessions for learners across India and internationally." },
  { q: "What makes the IIT-affiliated programs different from regular courses?", a: "IIT-affiliated programs are co-designed with academic partners and follow research-grade learning frameworks. The certification carries additional credibility while maintaining strong application-focused learning through projects and mentorship." },
];

/* ─── Component ─────────────────────────────────────────── */

export default function Academy() {
  const [active, setActive] = useState(0);
  const pillar = PILLARS[active];

  return (
    <div className="min-h-screen bg-white">

      {/* ── 1. Hero ── */}
      <section
        className="relative h-screen flex items-center overflow-hidden px-6 pt-28 pb-16 md:px-[60px]"
        style={{ backgroundImage: "url('/assets/img/hero/hero-bg-3.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30 pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <AnimateIn delay={0}>
            <LineBadge className="mb-6">India&apos;s AI-First Learning Academy · Pune</LineBadge>
          </AnimateIn>
          <AnimateIn delay={100}>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
              Don&apos;t just learn AI.{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                Build your future with it.
              </span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={200}>
            <p className="text-lg text-gray-600 leading-relaxed max-w-lg mb-10">
              Structured programs in Artificial Intelligence, Data Science, and Generative AI — designed for professionals, freshers, and IIT aspirants who want real outcomes, not just certificates.
            </p>
          </AnimateIn>
          <AnimateIn delay={300}>
            <div className="flex flex-wrap gap-3 mb-14">
              <Link href="/courses" className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition shadow-lg shadow-violet-200">
                Explore Programs
              </Link>
              <Link href="/contact" className="rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm px-6 py-3 text-sm font-semibold text-gray-700 hover:border-violet-300 hover:text-violet-600 transition">
                Book Free Counselling
              </Link>
            </div>
          </AnimateIn>
        </div>

        {/* Stat cards — floating on the right */}
        <div className="hidden lg:grid absolute right-10 xl:right-16 top-1/2 -translate-y-1/2 z-10 grid-cols-2 gap-4">
          {[["500+","Learners Trained"],["IIT","Affiliated Programs"],["10+","Expert Mentors"],["Certified","Recognized Credentials"]].map(([v, l], i) => (
            <AnimateIn key={l} delay={400 + i * 80} direction="right" className="h-full">
              <div className="flex h-full w-[160px] min-h-[108px] flex-col justify-center rounded-2xl border border-gray-100 bg-white/90 backdrop-blur-sm shadow-lg shadow-violet-100/60 px-6 py-5">
                <div className="text-2xl font-extrabold bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">{v}</div>
                <div className="text-xs font-medium text-gray-400 mt-0.5">{l}</div>
              </div>
            </AnimateIn>
          ))}
        </div>
      </section>

      {/* ── 2. Challenge ── */}
      <section className="bg-violet-50 px-6 py-24 md:px-[60px]">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <div>
            <AnimateIn delay={0} direction="left"><LineBadge className="mb-5">The Challenge</LineBadge></AnimateIn>
            <AnimateIn delay={100} direction="left">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Your AI ambitions are stuck{" "}
                <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                  in the wrong classroom.
                </span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={200} direction="left">
              <p className="text-base text-gray-500 leading-relaxed mb-4">
                Generic online courses give you theory without context. University programs take years without guaranteeing relevance. Bootcamps rush you through without depth.
              </p>
              <p className="text-base text-gray-500 leading-relaxed mb-8">
                You know AI is the future of your career — but you&apos;re blocked by the very tools that were supposed to help you get there.
              </p>
              <p className="text-sm font-bold text-violet-600 mb-10">MindLyft AI Academy is built differently.</p>
            </AnimateIn>
            <div className="flex flex-col gap-4">
              {[
                { t: "Real-World Projects",   d: "Build portfolio-worthy AI applications with practical, hands-on learning." },
                { t: "Industry Mentorship",    d: "Learn directly from professionals working in AI, Data Science and GenAI." },
                { t: "Career Support",         d: "Resume reviews, interview preparation, and guidance for job opportunities." },
              ].map(({ t, d }, i) => (
                <AnimateIn key={t} delay={300 + i * 80} direction="left">
                  <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                    <h3 className="font-bold text-gray-900 mb-1.5">{t}</h3>
                    <p className="text-sm text-gray-500 leading-relaxed">{d}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-gray-100 bg-white p-10 shadow-xl">
            <div className="flex flex-col gap-0">
              {STATS.map(({ value, label }, i) => (
                <AnimateIn key={value} delay={200 + i * 80} direction="right">
                  <div className={`py-8 ${i > 0 ? "border-t border-gray-100" : ""}`}>
                    <div className="text-5xl font-extrabold bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent mb-3">{value}</div>
                    <p className="text-sm text-gray-500 leading-relaxed">{label}</p>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. Pillars ── */}
      <section className="bg-white px-6 py-24 md:px-[60px]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimateIn delay={0} direction="fade"><LineBadge className="justify-center mb-5">What We Offer</LineBadge></AnimateIn>
            <AnimateIn delay={100} direction="fade">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
                See how structured learning builds your{" "}
                <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                  AI-ready career foundation.
                </span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={200} direction="fade">
              <p className="text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
                Our Academy is built around four learning pillars — each designed to meet you where you are and take you where you want to go.
              </p>
            </AnimateIn>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Info card */}
            <AnimateIn key={active} delay={0} direction="fade" className="w-full lg:w-[370px] shrink-0">
              <div className={`rounded-3xl p-8 bg-gradient-to-br ${pillar.card} text-white shadow-xl`}>
                <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">Pillar {pillar.num}</p>
                <h3 className="text-[2rem] font-black leading-tight mb-1">{pillar.name}</h3>
                <p className="text-white/70 text-sm font-medium mb-5">{pillar.tagline}</p>
                <div className="h-px bg-white/20 mb-5" />
                <p className="text-white/85 text-[0.92rem] leading-relaxed mb-3">{pillar.description}</p>
                <p className="text-white/60 text-[0.88rem] leading-relaxed mb-8">{pillar.description2}</p>
                <Link href={pillar.href} className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors duration-200">
                  Explore {pillar.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </AnimateIn>

            {/* Bar chart + dots */}
            <div className="flex-1 flex flex-col items-center w-full">
              <div className="flex items-end justify-center gap-6 sm:gap-10 lg:gap-12">
                {PILLARS.map((p, i) => {
                  const Icon = p.icon;
                  const isActive = i === active;
                  return (
                    <div key={i} className="flex flex-col items-center cursor-pointer" onClick={() => setActive(i)}>
                      <div className={`w-[60px] sm:w-[68px] rounded-full bg-gradient-to-b ${p.pill} flex items-end justify-center pb-5 transition-all duration-500 ease-in-out ${isActive ? "h-[260px] sm:h-[300px] opacity-100 shadow-lg" : "h-[160px] sm:h-[200px] opacity-30 hover:opacity-50"}`}>
                        <Icon className="w-6 h-6 text-white/80" />
                      </div>
                      <span className={`mt-3 text-[11px] font-bold transition-colors duration-300 ${isActive ? "text-violet-600" : "text-gray-400"}`}>
                        {p.name.split(" ")[0]}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="relative flex items-center justify-center gap-6 sm:gap-10 lg:gap-12 mt-4 px-2 w-full">
                <div className="absolute h-px bg-gray-200 inset-x-0" />
                {PILLARS.map((p, i) => (
                  <button key={i} onClick={() => setActive(i)}
                    className="relative z-10 w-[18px] h-[18px] rounded-full transition-all duration-300 outline-none"
                    style={{ background: i === active ? p.dot : "#D1D5DB", boxShadow: i === active ? `0 0 16px ${p.dot}88` : "none", transform: i === active ? "scale(1.35)" : "scale(1)" }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. Why Different ── */}
      <section className="bg-blue-50 px-6 py-24 md:px-[60px]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <AnimateIn delay={0} direction="fade"><LineBadge className="justify-center mb-5">Why MindLyft AI Academy Is Different</LineBadge></AnimateIn>
            <AnimateIn delay={100} direction="fade">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Not a course platform.{" "}
                <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                  A career-transformation system.
                </span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={200} direction="fade">
              <p className="text-base text-gray-500 leading-relaxed max-w-md mx-auto">
                Five things that separate us from every other AI learning option in India.
              </p>
            </AnimateIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {WHY_CARDS.map(({ icon: Icon, title, desc, accent, bg, border, wide }, i) => (
              <AnimateIn key={title} delay={300 + i * 70} direction="up">
                <div
                  className={`group relative rounded-3xl p-7 overflow-hidden hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 h-full ${wide ? "lg:col-span-2" : ""}`}
                  style={{ background: bg, border: `1.5px solid ${border}` }}
                >
                  <div className="absolute -bottom-5 -right-5 w-20 h-20 rounded-full opacity-15 group-hover:scale-150 transition-transform duration-500" style={{ background: accent }} />
                  <div className="h-1 w-8 rounded-full mb-5" style={{ background: accent }} />
                  <div className="relative z-10">
                    <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-2xl group-hover:scale-110 transition-transform duration-300" style={{ background: `${accent}20` }}>
                      <Icon className="w-5 h-5" style={{ color: accent }} />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">{desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Proven in the Field ── */}
      <section className="bg-violet-50 px-6 py-24 md:px-[60px]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <AnimateIn delay={0} direction="fade"><LineBadge className="justify-center mb-5">Proven In The Field</LineBadge></AnimateIn>
            <AnimateIn delay={100} direction="fade">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
                Proven in the field —{" "}
                <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                  and powering real AI careers
                </span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={200} direction="fade">
              <p className="text-base text-gray-500 leading-relaxed max-w-lg mx-auto">
                Real learner journeys across every program type — showing what practical AI education can achieve when paired with mentorship, projects, and career-focused guidance.
              </p>
            </AnimateIn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {OUTCOMES.map(({ tag, title, body, result }, i) => (
              <AnimateIn key={title} delay={300 + i * 80} direction="up">
                <div className="rounded-3xl border border-gray-100 bg-white p-8 hover:-translate-y-1 hover:shadow-lg transition-all duration-300 h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-3 w-3 rounded-sm bg-violet-500 shrink-0" />
                    <span className="text-xs font-bold uppercase tracking-wider text-violet-500">{tag}</span>
                  </div>
                  <h3 className="text-base font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1">{body}</p>
                  <div className="mt-6 border-t border-gray-100 pt-4">
                    <span className="text-sm font-semibold text-emerald-600">{result}</span>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Learning Journey ── */}
      <section className="bg-white px-6 py-24 md:px-[60px]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <AnimateIn delay={0} direction="flip"><LineBadge className="justify-center mb-5">The Learning Journey</LineBadge></AnimateIn>
            <AnimateIn delay={100} direction="flip">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
                The reason career transformation{" "}
                <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                  is possible.
                </span>
              </h2>
            </AnimateIn>
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-start justify-between relative">
            <div className="absolute left-[8%] right-[8%] top-[38px] h-[2px] bg-gradient-to-r from-violet-300 to-blue-300 z-0" />
            {JOURNEY_STEPS.map((step, i) => (
              <AnimateIn key={step.num} delay={300 + i * 90} direction="flip">
                <div className="relative z-10 flex flex-col items-center text-center min-w-[140px] px-2">
                  <div className="relative flex h-[76px] w-[76px] items-center justify-center rounded-full border-4 border-white text-white shadow-lg mb-5" style={{ background: step.accent }}>
                    <step.icon className="h-7 w-7" />
                    <span
                      className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-white text-[11px] font-extrabold shadow"
                      style={{ color: step.accent }}
                    >
                      {step.num}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-gray-900 mb-1.5">{step.title}</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                </div>
              </AnimateIn>
            ))}
          </div>

          {/* Mobile */}
          <div className="md:hidden flex flex-col gap-0">
            {JOURNEY_STEPS.map((step, i) => (
              <AnimateIn key={step.num} delay={300 + i * 80} direction="up">
                <div className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-4 border-white text-white shadow-md shrink-0" style={{ background: step.accent }}>
                      <step.icon className="h-5 w-5" />
                      <span
                        className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[8px] font-extrabold shadow"
                        style={{ color: step.accent }}
                      >
                        {step.num}
                      </span>
                    </div>
                    {i < JOURNEY_STEPS.length - 1 && <div className="w-px flex-1 mt-1" style={{ background: `${step.accent}40` }} />}
                  </div>
                  <div className="pb-8 pt-1">
                    <h4 className="text-sm font-bold text-gray-900 mb-1">{step.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. Final CTA ── */}
      <section className="bg-blue-50 px-6 py-24 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-50 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-6xl mx-auto flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-16">
          <div className="flex-1 text-center lg:text-left">
            <AnimateIn delay={0} direction="fade"><LineBadge className="justify-center lg:justify-start mb-6">Start Your Journey</LineBadge></AnimateIn>
            <AnimateIn delay={100} direction="fade">
              <h2 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Your{" "}
                <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                  AI career
                </span>{" "}
                begins with one decision.
              </h2>
            </AnimateIn>
            <AnimateIn delay={200} direction="fade">
              <p className="text-lg text-gray-500 leading-relaxed max-w-xl mx-auto lg:mx-0 mb-10">
                Whether you&apos;re a student, working professional, or business leader — MindLyft AI Academy has a program designed to take you exactly where you want to go.
              </p>
            </AnimateIn>
            <AnimateIn delay={300} direction="fade">
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <Link href="/courses" className="rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-8 py-3.5 text-sm font-semibold text-white hover:opacity-90 transition shadow-lg shadow-violet-200">
                  Explore All Programs
                </Link>
              </div>
            </AnimateIn>
          </div>
          <AnimateIn delay={100} direction="right" className="flex-1 flex justify-center lg:justify-end">
            <Image
              src="/assets/img/cta-img-1.png"
              alt=""
              width={340}
              height={340}
              className="h-auto w-56 object-contain sm:w-72 lg:w-80"
            />
          </AnimateIn>
        </div>
      </section>

      {/* ── 8. FAQ ── */}
      <section className="bg-violet-50 px-6 py-24 md:px-[60px]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <AnimateIn delay={0} direction="fade"><LineBadge className="justify-center mb-5">Frequently Asked Questions</LineBadge></AnimateIn>
            <AnimateIn delay={100} direction="fade">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight">
                Everything you need to know{" "}
                <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                  before enrolling.
                </span>
              </h2>
            </AnimateIn>
          </div>
          <div className="flex flex-col gap-4">
            {FAQS.map(({ q, a }, i) => (
              <AnimateIn key={q} delay={300 + i * 80} direction="up">
                <div className="rounded-2xl border border-gray-100 bg-white p-7 hover:shadow-md hover:border-violet-200 transition-all duration-300">
                  <h3 className="text-sm font-bold text-gray-900 mb-3">{q}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{a}</p>
                </div>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
