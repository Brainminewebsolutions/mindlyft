"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { ArrowRight, GraduationCap, BookOpen, Repeat2, FolderKanban, Briefcase, Mic2, TextAlignCenter } from "lucide-react";

const reasons = [
  { icon: GraduationCap, label: "Expert Faculty with Hands-on Experience" },
  { icon: BookOpen,       label: "Industry-Based Course Curriculum"         },
  { icon: Repeat2,        label: "Jumbo Pass: Never Before, Never After"    },
  { icon: FolderKanban,   label: "Work on Real Life Data Projects"           },
  { icon: Briefcase,      label: "Placement Assistance"                      },
  { icon: Mic2,           label: "Guest Lectures from Industry Experts"      },
];

const details = [
  {
    icon: GraduationCap,
    num: "01",
    title: "Expert Faculty with Hands-on Experience",
    desc: "Our faculty is one of our core strengths. At Mindlyft AI, learners are guided by experienced AI professionals who bring real-world industry knowledge along with a strong passion for teaching. This ensures a learning experience that is both practical and highly engaging.",
    grad: "from-blue-600 to-violet-500",
    glow: "rgba(37,99,235,0.18)",
  },
  {
    icon: BookOpen,
    num: "02",
    title: "Industry-Based Course Curriculum",
    desc: "Our curriculum is carefully designed to align with current industry demands and emerging AI trends. It covers not only core concepts but also modern tools, frameworks & technologies required to build real-world AI systems, ensuring learners stay relevant in a rapidly evolving landscape.",
    grad: "from-blue-600 to-violet-500",
    glow: "rgba(37,99,235,0.18)",
  },
  {
    icon: Repeat2,
    num: "03",
    title: "Jumbo Pass: Never Before, Never After",
    desc: "With Mindlyft AI's Jumbo Pass, learners can attend multiple live sessions and revisit concepts with different instructors over a set period. This flexible approach improves clarity, strengthens retention and supports learning at your own pace.",
    grad: "from-blue-600 to-violet-500",
    glow: "rgba(37,99,235,0.18)",
  },
  {
    icon: FolderKanban,
    num: "04",
    title: "Work on Real Life Data Projects",
    desc: "Learners will work on real-world projects across multiple domains, gaining hands-on experience in solving practical problems. These projects are designed to simulate industry scenarios, helping learners build a strong portfolio and develop problem-solving skills.",
    grad: "from-blue-600 to-violet-500",
    glow: "rgba(37,99,235,0.18)",
  },
  {
    icon: Briefcase,
    num: "05",
    title: "Placement Assistance",
    desc: "We provide end-to-end career support from resume building and LinkedIn optimization to mock interviews, interview preparation and job opportunities. Our goal is to ensure that learners are fully prepared to enter the job market with confidence, clarity and the right career opportunities.",
    grad: "from-blue-600 to-violet-500",
    glow: "rgba(37,99,235,0.18)",
  },
  {
    icon: Mic2,
    num: "06",
    title: "Guest Lectures from Industry Experts",
    desc: "Regular sessions and webinars conducted by industry professionals provide insights into current trends, real-world applications and emerging technologies. These interactions help learners stay updated and gain valuable industry perspectives.",
    grad: "from-blue-600 to-violet-500",
    glow: "rgba(37,99,235,0.18)",
  },
];

export default function WhyChooseUs() {
  return (
    <>
      <div className="wh-area style-two bg_primary relative z-[1] round-20">
        <Image alt="Shape" className="section-shape-one absolute bottom-0 left-0 z-[-1]" src="/assets/img/box-shape-2.png" width={600} height={400} />
        <Image alt="Shape" className="section-shape-two absolute top-0 z-[-1]" src="/assets/img/box-shape-3.png" width={600} height={400} />
        <div className="container-fluid style-one">
          <div className="flex flex-wrap items-center">
            <div className="w-full lg:w-1/2 xl:w-5/12">
              <div className="wh-content md:mb-[30px]">
                <SectionBadge variant="dark">Why Choose Mindlyft AI</SectionBadge>
                <AnimateIn direction="up" delay={400}>
                  <h2 className="section-title style-one font-secondary font-medium text-white mb-15">
                    Why Mindlyft AI?
                  </h2>
                </AnimateIn>
                <AnimateIn direction="up" delay={500}>
                  <p className="text-offwhite mb-30">
                    At Mindlyft AI, we are dedicated to empowering students, professionals, and businesses with industry-ready AI skills, intelligent solutions, and future-focused innovation.
                  </p>
                </AnimateIn>
                <AnimateIn direction="up" delay={600}>
                  <ul className="feature-list flex flex-wrap list-none p-0 mb-10 2xl:w-3/4">
                    {reasons.map(({ icon: Icon, label }) => (
                      <li key={label} className="relative font-semibold text-white">
                        <span className="flex flex-col items-center justify-center rounded-full">
                          <Icon size={16} />
                        </span>
                        {label}
                      </li>
                    ))}
                  </ul>
                </AnimateIn>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-white text-sm transition-opacity hover:opacity-90"
                  style={{ background: "linear-gradient(to right, #7c3aed, #3b82f6)" }}
                >
                  Explore Our Courses
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </div>
            <AnimateIn direction="up" delay={400} className="w-full lg:w-1/2 xl:w-7/12 2xl:pl-12">
              <div className="wh-bg bg-f bg-1 round-10" />
            </AnimateIn>
          </div>

          {/* ── Detailed cards — sub-part of wh-area ── */}
          <div className="relative mt-16 pb-10">

            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <div className="absolute top-0 left-1/4 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
              <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-blue-400/10 blur-3xl" />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {details.map((item, i) => (
                <motion.div
                  key={item.title}
                  className="group relative bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl overflow-hidden hover:bg-white/20 transition-all duration-300"
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  {/* Gradient header */}
                  <div className={`relative h-[80px]  flex items-end justify-between px-5 pb-3`}>
                    <span className="absolute top-2 right-3 text-[3rem] font-black text-white/10 leading-none select-none">
                      {item.num}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                      <item.icon className="w-5 h-5 text-white" strokeWidth={1.8} />
                    </div>
                    <span className="text-[10px] font-bold text-white/60 tracking-widest">{item.num}</span>
                  </div>

                  {/* Content */}
                  <div className="px-5 py-4" style={{ textAlign: "center", color: "white" }}>
                    <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-violet-200 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="mb-30 leading-relaxed"  style={{ textAlign: "center", color: "white" }}>
                      {item.desc}
                    </p>
                  </div>

                  {/* Bottom accent line */}
                  <div className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${item.grad} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
