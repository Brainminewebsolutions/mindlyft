"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Wrench, Video, GraduationCap, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";

const PILLARS = [
  {
    num: "01",
    icon: GraduationCap,
    name: "IIT Programs",
    tagline: "World-class IIT education",
    description:
      "Premium programs developed in collaboration with IIT faculty and industry experts. Gain credentials that set you apart.",
    description2:
      "Certificate programs, research tracks, and live IIT-backed sessions — all in one place.",
    href: "/iit",
    pill: "from-violet-500 to-blue-500",
    dot: "#8B5CF6",
    card: "from-violet-600 to-blue-500",
  },
  {
    num: "02",
    icon: BookOpen,
    name: "Courses",
    tagline: "Structure your learning journey",
    description:
      "Structured, self-paced programs built around AI, technology, and emerging skills. Industry-aligned curriculum from beginner to advanced.",
    description2:
      "Certificate programs, IIT collaborations, and live tracks — all in one place.",
    href: "/courses",
    pill: "from-blue-500 to-indigo-600",
    dot: "#3B82F6",
    card: "from-blue-600 to-indigo-600",
  },
  {
    num: "03",
    icon: Wrench,
    name: "Workshops",
    tagline: "Hands-on, expert-led sessions",
    description:
      "Short intensive sessions focused on practical skill building with industry experts. Learn by doing.",
    description2:
      "Small cohorts, live practice, and immediate real-world results.",
    href: "/workshops",
    pill: "from-indigo-500 to-violet-600",
    dot: "#6366F1",
    card: "from-indigo-600 to-violet-600",
  },
  {
    num: "04",
    icon: Video,
    name: "Webinars",
    tagline: "Learn from anywhere, anytime",
    description:
      "Live online sessions on trending topics — AI, innovation, career growth. Interactive Q&A with speakers in real time.",
    description2:
      "Free and premium sessions with recorded replays available.",
    href: "/webinars",
    pill: "from-violet-400 to-blue-400",
    dot: "#A78BFA",
    card: "from-violet-500 to-blue-400",
  },
];
const stats = [
  { value: "500+", label: "Learners Trained" },
  { value: "95%", label: "Program Completion Rate" },
  { value: "4.8★", label: "Average Learner Rating" },
  { value: "10+", label: "Industry Expert Mentors" },
  { value: "3", label: "IIT-Affiliated Programs" },
];
export default function Academy() {
  const [active, setActive] = useState(0);
  const pillar = PILLARS[active];

  return (
    <div className="min-h-screen bg-[#f9f8ff]">

      {/* Hero */}
     <div className="relative overflow-hidden bg-[#02030d] py-20 text-center">
  {/* Background glow */}
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
    <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[120px]" />
  </div>

  {/* Content */}
  <div className="relative z-10 mx-auto max-w-4xl">
    {/* Badge */}
    <div className="mb-8">
      <span className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-8 py-3 text-sm font-medium uppercase tracking-[0.25em] text-violet-300 backdrop-blur-xl">
      India's AI-First Learning Academy · Pune

      </span>
    </div>

    {/* Heading */}
    <h1 style={{color:"white"}} className="py-10 mx-auto max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-7xl">
     Don't just learn AI.
<br/>
      <span className="bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
          Build your future with it.
      </span>
    </h1>

    {/* Description */}
    <p className="mx-auto mt-10 max-w-3xl text-lg leading-9 text-zinc-400 md:text-1xl">
      Structured programs in Artificial Intelligence, Data Science, and Generative AI — designed for professionals, freshers, and IIT aspirants who want real outcomes, not just certificates.
    </p>
  </div>
  <div className="mx-auto max-w-7xl border-t border-violet-500/10 pt-12">
    <div className="flex flex-wrap items-center justify-between gap-8">

      <div className="flex-1 text-center border-r border-violet-500/10">
        <p className="mt-2 text-zinc-400">500+ Learners Trained</p>
      </div>
       <div className="flex-1 text-center">
        <p className="mt-2 text-zinc-400">IIT-Affiliated Programs</p>
      </div>

  <div className="flex-1 text-center border-r border-violet-500/10">
        <p className="mt-2 text-zinc-400">Industry Expert Mentors</p>
      </div>
      <div className="flex-1 text-center border-r border-violet-500/10">
        <p className="mt-2 text-zinc-400">Recognized Certification</p>
      </div>

    </div>
  </div>
</div>
 
<section className="relative overflow-hidden bg-white py-24">
  {/* Background Effects */}
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-100 blur-[120px]" />
    <div className="absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-blue-100 blur-[120px]" />
  </div>

  <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
    <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
      
      {/* Left Content */}
      <div>
        <div className="mb-8 flex items-center gap-4">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-violet-600">
           THE CHALLENGE
          </span>
          <div className="h-px w-20 bg-violet-300" />
        </div>

        <h2 className="max-w-2xl text-5xl font-bold leading-tight text-slate-900 md:text-5xl">
         Your AI ambitions are stuck 
          <br />
          <span className="text-violet-600">
            in the wrong classroom.
          </span>
        </h2>

        <p className="mt-8 max-w-xl text-lg leading-9 text-slate-600">
         Generic online courses give you theory without context. University programs take years without guaranteeing relevance. Bootcamps rush you through without depth.
         <br/>
         You know AI is the future of your career — but you're blocked by the very tools that were supposed to help you get there.
        </p>

        <p className="mt-8 text-lg font-semibold text-violet-700">
         MindlytAI Academy is built differently.
        </p>

        {/* Cards */}
        <div className="mt-12 space-y-5">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <h3 className="font-semibold text-slate-900">
              Real-World Projects
            </h3>
            <p className="mt-2 text-slate-600">
              Build portfolio-worthy AI applications with practical,
              hands-on learning.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <h3 className="font-semibold text-slate-900">
              Industry Mentorship
            </h3>
            <p className="mt-2 text-slate-600">
              Learn directly from professionals working in AI,
              Data Science and GenAI.
            </p>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md">
            <h3 className="font-semibold text-slate-900">
              Career Support
            </h3>
            <p className="mt-2 text-slate-600">
              Resume reviews, interview preparation, and guidance
              for job opportunities.
            </p>
          </div>
        </div>
      </div>

      {/* Right Stats Card */}
      <div className="rounded-[36px] border border-slate-200 bg-white p-10 shadow-xl">
        <div className="space-y-10">
          <div>
            <h3 className="text-6xl font-bold text-violet-600">87%</h3>
            <p className="mt-3 text-slate-600">
              of AI job listings require hands-on project experience —
              not just certifications.
            </p>
          </div>

          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-6xl font-bold text-violet-600">3×</h3>
            <p className="mt-3 text-slate-600">
              faster career progression with structured,
              mentor-led learning.
            </p>
          </div>

          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-6xl font-bold text-violet-600">1M+</h3>
            <p className="mt-3 text-slate-600">
              AI-ready professionals needed in India by 2026.
            </p>
          </div>

          <div className="border-t border-slate-200 pt-8">
            <h3 className="text-6xl font-bold text-violet-600">₹18L</h3>
            <p className="mt-3 text-slate-600">
              Average annual salary for skilled AI & Data Science
              professionals.
            </p>
          </div>
        </div>
      </div>

    </div>
  </div>
   <div className="relative overflow-hidden bg-[#02030d] py-20 text-center">
 <div className="relative z-10 mx-auto max-w-4xl">
    {/* Badge */}
    <div className="mb-8">
      <span className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-8 py-3 text-sm font-medium uppercase tracking-[0.25em] text-violet-300 backdrop-blur-xl">
     WHAT WE OFFER
      </span>
    </div>

    {/* Heading */}
    <h1 style={{color:"white"}} className="py-3 mx-auto max-w-4xl text-5xl font-bold leading-[1.05] tracking-tight text-white md:text-5xl">
    See how structured learning builds your 
<br/>
      <span className="bg-gradient-to-r from-violet-400 to-violet-600 bg-clip-text text-transparent">
          AI-ready career foundation.
      </span>
    </h1>

    {/* Description */}
    <p className="mx-auto mt-10 max-w-3xl text-lg leading-9 text-zinc-400 md:text-1xl">
      Our Academy is built around four learning pillars — each designed to meet you where you are and take you where you want to go.
    </p>
  </div>
  </div>
</section>
      {/* Pillars section */}
      <div className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

          {/* Left: info card */}
          <div
            key={active}
            className={`w-full lg:w-[370px] shrink-0 rounded-3xl p-8 bg-gradient-to-br ${pillar.card} text-white shadow-xl`}
          >
            <p className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2">
              Pillar {pillar.num}
            </p>
            <h3 className="text-[2rem] font-black leading-tight mb-1">{pillar.name}</h3>
            <p className="text-white/70 text-sm font-medium mb-5">{pillar.tagline}</p>
            <div className="h-px bg-white/20 mb-5" />
            <p className="text-white/85 text-[0.92rem] leading-relaxed mb-3">
              {pillar.description}
            </p>
            <p className="text-white/60 text-[0.88rem] leading-relaxed mb-8">
              {pillar.description2}
            </p>
            <Link
              href={pillar.href}
              className="inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors duration-200"
            >
              Explore {pillar.name}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Right: pills + dot track */}
          <div className="flex-1 flex flex-col items-center w-full">

            {/* Pills */}
            <div className="flex items-end justify-center gap-6 sm:gap-10 lg:gap-12">
              {PILLARS.map((p, i) => {
                const Icon = p.icon;
                const isActive = i === active;
                return (
                  <div
                    key={i}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => setActive(i)}
                  >
                    <div
                      className={`w-[60px] sm:w-[68px] rounded-full bg-gradient-to-b ${p.pill} flex items-end justify-center pb-5 transition-all duration-500 ease-in-out ${
                        isActive
                          ? "h-[260px] sm:h-[300px] opacity-100 shadow-lg"
                          : "h-[160px] sm:h-[200px] opacity-30 hover:opacity-50"
                      }`}
                    >
                      <Icon className="w-6 h-6 text-white/80" />
                    </div>
                    <span className={`mt-3 text-[11px] font-bold transition-colors duration-300 ${isActive ? "text-violet-600" : "text-gray-400"}`}>
                      {p.name.split(" ")[0]}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Dot track */}
            <div className="relative flex items-center justify-center gap-6 sm:gap-10 lg:gap-12 mt-4 px-2 w-full">
              <div className="absolute h-px bg-gray-200 inset-x-0" />
              {PILLARS.map((p, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="relative z-10 w-[18px] h-[18px] rounded-full transition-all duration-300 outline-none"
                  style={{
                    background: i === active ? p.dot : "#D1D5DB",
                    boxShadow: i === active ? `0 0 16px ${p.dot}88` : "none",
                    transform: i === active ? "scale(1.35)" : "scale(1)",
                  }}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
<section className="relative overflow-hidden bg-white py-24">
  {/* Background Glow */}
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-100 blur-[120px]" />
    <div className="absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-blue-100 blur-[120px]" />
  </div>

  <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
    {/* Section Header */}
    <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 via-violet-500 to-blue-500 text-white text-lg font-semibold px-6 py-2 rounded-full shadow-lg shadow-violet-500/30 ring-1 ring-white/20">
          Why Mindlyft AI Academy Is Different
        </span>
    </div>
      

      <h2 className="py-3 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
        Not a course platform.
        <br />
        <span className="text-violet-600">
          A career-transformation system.
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
        Five things that separate us from every other AI learning
        option in India.
      </p>
    </div>

    {/* Cards Grid */}
    <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Card 1 */}
      <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-6 h-12 w-12 rounded-xl bg-violet-100" />

        <h3 className="mb-4 text-xl font-semibold text-slate-900">
          AI-ready, industry-aligned curriculum
        </h3>

        <p className="leading-8 text-slate-600">
          Learn the skills employers actually demand today through
          practical projects, real datasets, and modern AI workflows.
        </p>
      </div>

      {/* Card 2 */}
      <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-6 h-12 w-12 rounded-xl bg-violet-100" />

        <h3 className="mb-4 text-xl font-semibold text-slate-900">
          Hybrid by design
        </h3>

        <p className="leading-8 text-slate-600">
          Combine live mentorship sessions with flexible learning
          resources to balance quality and convenience.
        </p>
      </div>

      {/* Card 3 */}
      <div className="group rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-6 h-12 w-12 rounded-xl bg-violet-100" />

        <h3 className="mb-4 text-xl font-semibold text-slate-900">
          IIT-grade academic credibility
        </h3>

        <p className="leading-8 text-slate-600">
          Built on rigorous academic foundations while staying deeply
          connected to industry expectations.
        </p>
      </div>

      {/* Wide Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm md:col-span-2">
        <div className="mb-6 h-12 w-12 rounded-xl bg-violet-100" />

        <h3 className="mb-4 text-xl font-semibold text-slate-900">
          One ecosystem from beginner to expert
        </h3>

        <p className="leading-8 text-slate-600">
          From foundational concepts to advanced AI applications,
          every stage of your journey happens inside a single learning
          ecosystem with mentorship, projects, and community support.
        </p>
      </div>

      {/* Wide Card */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <div className="mb-6 h-12 w-12 rounded-xl bg-violet-100" />

        <h3 className="mb-4 text-xl font-semibold text-slate-900">
          Placement support included
        </h3>

        <p className="leading-8 text-slate-600">
          Resume reviews, portfolio building, mock interviews,
          networking opportunities, and career guidance are built
          directly into your program.
        </p>
      </div>
    </div>
  </div>
</section>

<section className="relative overflow-hidden bg-white py-24">
  {/* Background Glow */}
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-100 blur-[120px]" />
    <div className="absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-blue-100 blur-[120px]" />
  </div>

 <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
    {/* Section Header */}
    <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8">
           <span className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 via-violet-500 to-blue-500 text-white text-lg font-semibold px-6 py-2 rounded-full shadow-lg shadow-violet-500/30 ring-1 ring-white/20">
          Proven In The Field
        </span>
    </div>
      

      <h2 className="py-3 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
         Proven in the field —
        <br />
        <span className="text-violet-600">
        and powering real AI careers
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
         Real learner journeys across every program type — showing what
        practical AI education can achieve when paired with mentorship,
        projects, and career-focused guidance.
      </p>
    </div>

    {/* Cards Grid */}
    <div className="mt-16 grid gap-6 md:grid-cols-2">
      {/* Card 1 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-3 w-3 rounded-sm bg-violet-500" />
          <h3 className="font-semibold text-slate-900">
            Data Science: Career Switch in 5 Months
          </h3>
        </div>

        <p className="leading-8 text-slate-600">
          A marketing professional transitioned into Data Science
          through hands-on projects, portfolio building, and mentorship,
          securing a role at a fast-growing technology company.
        </p>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <span className="font-medium text-emerald-600">
            Placed as Junior Data Analyst
          </span>
        </div>
      </div>

      {/* Card 2 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-3 w-3 rounded-sm bg-violet-500" />
          <h3 className="font-semibold text-slate-900">
            Generative AI: Manager to AI Strategist
          </h3>
        </div>

        <p className="leading-8 text-slate-600">
          A mid-career IT manager leveraged Generative AI and Agentic AI
          skills to lead enterprise AI initiatives and secure a strategic
          promotion within months.
        </p>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <span className="font-medium text-emerald-600">
            Promoted to AI Lead
          </span>
        </div>
      </div>

      {/* Card 3 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-3 w-3 rounded-sm bg-violet-500" />
          <h3 className="font-semibold text-slate-900">
            IIT Program: Research-Grade Credibility
          </h3>
        </div>

        <p className="leading-8 text-slate-600">
          Learners completed advanced AI projects under academic
          guidance, strengthening research capabilities and enhancing
          opportunities in AI product organizations.
        </p>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <span className="font-medium text-emerald-600">
            Shortlisted at AI Product Startups
          </span>
        </div>
      </div>

      {/* Card 4 */}
      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="mb-5 flex items-center gap-3">
          <div className="h-3 w-3 rounded-sm bg-violet-500" />
          <h3 className="font-semibold text-slate-900">
            Workshop: Business Intelligence in One Weekend
          </h3>
        </div>

        <p className="leading-8 text-slate-600">
          A finance professional built a complete Power BI dashboard
          during the workshop and immediately applied it to improve
          reporting efficiency at work.
        </p>

        <div className="mt-6 border-t border-slate-100 pt-5">
          <span className="font-medium text-emerald-600">
            30% Faster Reporting Cycle
          </span>
        </div>
      </div>
    </div>
  </div>
 
</section>
<section className="relative overflow-hidden bg-white py-24">
  {/* Background Glow */}
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-100 blur-[120px]" />
    <div className="absolute right-0 top-10 h-[250px] w-[250px] rounded-full bg-blue-100 blur-[100px]" />
  </div>

  <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
    {/* Header */}
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8">
     
         <span className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 via-violet-500 to-blue-500 text-white text-lg font-semibold px-6 py-2 rounded-full shadow-lg shadow-violet-500/30 ring-1 ring-white/20">
          The Learning Journey
        </span>
    </div>
      

      <h2 className="py-3 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
         The reason career transformation is possible.
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
         Real learner journeys across every program type — showing what
        practical AI education can achieve when paired with mentorship,
        projects, and career-focused guidance.
      </p>
    </div>
   

    {/* Journey Steps */}
    <div className="mt-20">
      <div className="grid gap-10 md:grid-cols-5">
        
        {/* Step 1 */}
        <div className="relative text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-500 shadow-lg shadow-blue-100">
            <span className="text-white font-bold">1</span>
          </div>

          <h3 className="mt-6 font-semibold text-slate-900">
            Choose your path
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Counselors help you pick the right program for your goal
          </p>
        </div>

        {/* Step 2 */}
        <div className="relative text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-500 shadow-lg shadow-violet-100">
            <span className="text-white font-bold">2</span>
          </div>

          <h3 className="mt-6 font-semibold text-slate-900">
            Learn with structure
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Live sessions, labs, and mentored projects
          </p>
        </div>

        {/* Step 3 */}
        <div className="relative text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-500 shadow-lg shadow-violet-100">
            <span className="text-white font-bold">3</span>
          </div>

          <h3 className="mt-6 font-semibold text-slate-900">
            Build real projects
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Industry capstones for your portfolio
          </p>
        </div>

        {/* Step 4 */}
        <div className="relative text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-violet-500 shadow-lg shadow-violet-100">
            <span className="text-white font-bold">4</span>
          </div>

          <h3 className="mt-6 font-semibold text-slate-900">
            Get certified
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Mindlyft AI + IIT partner certificates
          </p>
        </div>

        {/* Step 5 */}
        <div className="relative text-center">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-100">
            <span className="text-white font-bold">5</span>
          </div>

          <h3 className="mt-6 font-semibold text-slate-900">
            Launch your career
          </h3>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Placement support, mock interviews, alumni network
          </p>
        </div>
      </div>

      {/* Connecting Line */}
      <div className="pointer-events-none absolute left-0 right-0 top-[58%] hidden md:block">
        <div className="mx-auto max-w-5xl border-t border-slate-200" />
      </div>
    </div>
  </div>
</section>
<section className="relative overflow-hidden bg-[#02030d] py-24">
  {/* Background Glow */}
  <div className="absolute inset-0">
    <div className="absolute left-1/2 top-0 h-[400px] w-[400px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
    <div className="absolute right-0 top-20 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[120px]" />
  </div>

  <div className="relative z-10 mx-auto max-w-6xl px-6">
    {/* Heading */}
      <div className="mx-auto max-w-4xl text-center">
        <div className="mb-8">
      <span className="inline-flex items-center rounded-full border border-violet-500/20 bg-violet-500/10 px-8 py-3 text-sm font-medium uppercase tracking-[0.25em] text-violet-300 backdrop-blur-xl">
        Frequently Asked Questions
      </span>
    </div>
      

      <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', lineHeight: '1.2', color: '#ffffff' }}>
          Everything you need to know before enrolling.
      </h2>

    </div>
   
    {/* FAQ Cards */}
    <div className="mt-16 space-y-6">
      <div className="rounded-3xl border border-violet-500/10 bg-[#070a1d] p-8 backdrop-blur-xl">
        <h3 className="text-lg font-semibold text-white"  style={{  color: '#ffffff' }}>
          Do I need prior programming experience to join?
        </h3>

        <p className="mt-4 leading-8 text-zinc-400">
          No prior coding experience is required for most programs.
          Our foundational courses are designed for complete beginners.
          For advanced programs like Full Stack AI or Agentic AI Stack,
          basic Python familiarity is helpful — and we provide
          preparation guidance before the cohort begins.
        </p>
      </div>

      <div className="rounded-3xl border border-violet-500/10 bg-[#070a1d] p-8 backdrop-blur-xl">
        <h3 className="text-lg font-semibold text-white"  style={{  color: '#ffffff' }}>
          Are classes available online or only in Pune?
        </h3>

        <p className="mt-4 leading-8 text-zinc-400">
          We offer both. Our Pune center runs offline batches with
          in-person mentorship and lab access. Most programs are also
          available through live interactive online sessions for learners
          across India and internationally.
        </p>
      </div>

      <div className="rounded-3xl border border-violet-500/10 bg-[#070a1d] p-8 backdrop-blur-xl">
        <h3 className="text-lg font-semibold text-white"  style={{  color: '#ffffff' }}>
          What makes the IIT-affiliated programs different from regular courses?
        </h3>

        <p className="mt-4 leading-8 text-zinc-400">
          IIT-affiliated programs are co-designed with academic partners
          and follow research-grade learning frameworks. The certification
          carries additional credibility while maintaining strong
          application-focused learning through projects and mentorship.
        </p>
      </div>
    </div>
  </div>
</section>
    {/* Final CTA Section */}
    <section className="relative overflow-hidden bg-white h-screen flex flex-col items-center justify-center text-center">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100 blur-[120px]" />
        <div className="absolute right-0 top-0 h-[300px] w-[300px] rounded-full bg-blue-100 blur-[120px]" />
        <div className="absolute left-0 bottom-0 h-[250px] w-[250px] rounded-full bg-violet-100 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl px-6">
        <h2 className="text-4xl font-bold leading-tight text-slate-900 md:text-5xl lg:text-6xl">
          Your{" "}
          <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
            AI career
          </span>{" "}
          begins
          <br />
          with one decision.
        </h2>

        <p className="mx-auto mt-8 max-w-xl text-base leading-8 text-slate-600 md:text-lg">
          Whether you're a student, working professional, or business leader —
          MindlyftAI Academy has a program designed to take you exactly where
          you want to go.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/courses"
            className="rounded-full bg-violet-600 px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/20 transition hover:bg-violet-500"
          >
            Explore All Programs
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-800 transition hover:border-violet-400 hover:text-violet-600"
          >
            Book Free Counselling Session
          </Link>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-slate-200 px-6 py-6">
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <span>{SITE_CONFIG.address}</span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span>{SITE_CONFIG.email}</span>
          <span className="hidden sm:inline text-slate-300">|</span>
          <span>{SITE_CONFIG.phone}</span>
        </div>
      </div>
    </section>
    </div>
  );
}
