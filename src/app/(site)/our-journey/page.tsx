import Link from "next/link";
import { Calendar, TrendingUp, ArrowRight, Users, BookOpen, Globe, Award } from "lucide-react";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

const MILESTONES = [
  { year: "Jan 2024", title: "MindLyft AI Founded",        desc: "Launched with a mission to make AI education accessible across India." },
  { year: "Mar 2024", title: "First IIT Collaboration",    desc: "Partnered with IIT Kanpur C3iHub to deliver AI workshops for 150 graduate students." },
  { year: "May 2024", title: "500 Students Enrolled",      desc: "Crossed our first major milestone — 500 learners in just 4 months." },
  { year: "Jul 2024", title: "EdTech Expo Recognition",    desc: "Featured among top 10 EdTech startups at the Bengaluru Innovation Expo." },
  { year: "Sep 2024", title: "ML Bootcamp Batch 3",        desc: "Completed our 3rd bootcamp with 94% placement rate for graduates." },
  { year: "Nov 2024", title: "AI Summit — 300 Attendees",  desc: "Hosted our largest event — the AI in Education Summit in Mumbai." },
];

const STATS = [
  { icon: Users,     value: "500+",  label: "Students Enrolled",    accent: "#8B5CF6", bg: "#f5f3ff" },
  { icon: BookOpen,  value: "10+",   label: "Courses Delivered",    accent: "#3B82F6", bg: "#eff6ff" },
  { icon: Globe,     value: "5+",    label: "Cities Reached",       accent: "#6366F1", bg: "#eef2ff" },
  { icon: Award,     value: "95%",   label: "Learner Satisfaction", accent: "#059669", bg: "#ecfdf5" },
];

const EXPLORE = [
  {
    icon: Calendar,
    title: "Our Events",
    desc: "Every event we've hosted has been a milestone — bringing learners, experts, and innovators together.",
    href: "/our-journey/events",
    accent: "#8B5CF6", bg: "#f5f3ff", border: "#e9d5ff",
    cta: "View All Events",
  },
  {
    icon: TrendingUp,
    title: "Our Impact",
    desc: "Real numbers, real stories — see how MindLyft AI has transformed careers and communities across India.",
    href: "/our-journey/our-impact",
    accent: "#3B82F6", bg: "#eff6ff", border: "#bfdbfe",
    cta: "See Our Impact",
  },
];

export default function OurJourneyPage() {
  return (
    <div className="min-h-screen bg-white">

      {/* Hero */}
      <section
        className="relative min-h-screen flex items-center px-6 pt-28 pb-16 md:px-[60px]"
        style={{ backgroundImage: "url('/assets/img/hero/hero-bg-3.jpg')", backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/30 pointer-events-none" />
        <div className="relative z-10 max-w-2xl">
          <AnimateIn delay={0}><LineBadge className="mb-6">Our Journey</LineBadge></AnimateIn>
          <AnimateIn delay={100}>
            <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 leading-[1.1] tracking-tight mb-6">
              Built with purpose.{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                Driven by impact.
              </span>
            </h1>
          </AnimateIn>
          <AnimateIn delay={200}>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md mb-10">
              From a small idea in Pune to a growing national platform — here&apos;s the story of how MindLyft AI came to be and where it&apos;s headed.
            </p>
          </AnimateIn>
          <AnimateIn delay={300}>
            <div className="flex flex-wrap gap-x-10 gap-y-4">
              {STATS.map(({ icon: Icon, value, label, accent, bg }) => (
                <div key={label} className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl shrink-0" style={{ background: bg }}>
                    <Icon className="w-4 h-4" style={{ color: accent }} />
                  </div>
                  <div>
                    <div className="text-lg font-extrabold bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent leading-none">{value}</div>
                    <div className="text-[10px] font-medium text-gray-400">{label}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimateIn>
        </div>
      </section>

      {/* Explore sections */}
      <section className="bg-white px-6 py-24 md:px-[60px]">
        <div className="max-w-6xl mx-auto">
          <AnimateIn delay={0} direction="fade"><LineBadge className="justify-center mb-5">Explore</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="fade">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center leading-tight mb-14">
              Two ways to follow{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">our story</span>
            </h2>
          </AnimateIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {EXPLORE.map(({ icon: Icon, title, desc, href, accent, bg, border, cta }, i) => (
              <AnimateIn key={title} delay={200 + i * 100} direction="up">
                <Link href={href} className="group relative rounded-3xl p-8 overflow-hidden flex flex-col h-full hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300"
                  style={{ background: bg, border: `1.5px solid ${border}` }}>
                  <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full opacity-15 group-hover:scale-150 transition-transform duration-500" style={{ background: accent }} />
                  <div className="h-1 w-10 rounded-full mb-6" style={{ background: accent }} />
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl mb-5" style={{ background: `${accent}20` }}>
                    <Icon className="w-6 h-6" style={{ color: accent }} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed flex-1 mb-6">{desc}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-bold group-hover:gap-3 transition-all" style={{ color: accent }}>
                    {cta} <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </AnimateIn>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="bg-violet-50 px-6 py-24 md:px-[60px]">
        <div className="max-w-3xl mx-auto">
          <AnimateIn delay={0} direction="fade"><LineBadge className="justify-center mb-5">Timeline</LineBadge></AnimateIn>
          <AnimateIn delay={100} direction="fade">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 text-center leading-tight mb-14">
              Key{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">milestones</span>
            </h2>
          </AnimateIn>

          <div className="relative">
            <div className="absolute left-[88px] top-0 bottom-0 w-px bg-violet-200 hidden sm:block" />
            <div className="flex flex-col gap-4">
              {MILESTONES.map((m, i) => (
                <AnimateIn key={m.year} delay={200 + i * 70} direction="left">
                  <div className="flex gap-4 items-start">
                    <div className="shrink-0 w-[80px] text-right hidden sm:block pt-3">
                      <span className="text-xs font-bold text-violet-600 bg-white border border-violet-200 px-2 py-1 rounded-full whitespace-nowrap">
                        {m.year}
                      </span>
                    </div>
                    <div className="shrink-0 hidden sm:flex flex-col items-center pt-[14px]">
                      <div className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 ring-4 ring-violet-100" />
                    </div>
                    <div className="flex-1 bg-white rounded-2xl border border-gray-100 shadow-sm px-5 py-4 hover:shadow-md hover:border-violet-200 transition-all duration-300">
                      <span className="text-xs font-bold text-violet-600 sm:hidden mb-1 block">{m.year}</span>
                      <p className="text-sm font-bold text-gray-900 mb-1">{m.title}</p>
                      <p className="text-xs text-gray-500 leading-relaxed">{m.desc}</p>
                    </div>
                  </div>
                </AnimateIn>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
