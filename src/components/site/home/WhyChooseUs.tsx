"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Subheading } from "@/components/ui/Subheading";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { ArrowRight, GraduationCap, BookOpen, Repeat2, FolderKanban, Briefcase, Mic2 } from "lucide-react";

const details = [
  {
    icon: GraduationCap,
    num: "01",
    title: "Expert Faculty with Hands-on Experience",
    desc: "Our faculty is our core strength. Every program is led by practising AI professionals who bring live industry context into the classroom, so you learn how decisions are made on real systems, not just how algorithms work on paper.",
    grad: "from-blue-600 to-violet-500",
    glow: "rgba(37,99,235,0.18)",
  },
  {
    icon: BookOpen,
    num: "02",
    title: "Industry-Based Course Curriculum",
    desc: "Each curriculum is mapped to current hiring requirements and reviewed regularly. You work with the same frameworks, tools and workflows that teams use in production, which keeps your skills relevant as the AI landscape shifts.",
    grad: "from-blue-600 to-violet-500",
    glow: "rgba(37,99,235,0.18)",
  },
  {
    icon: Repeat2,
    num: "03",
    title: "Jumbo Pass: Never Before, Never After",
    desc: "The Jumbo Pass lets you attend multiple live sessions and revisit the same concepts with different instructors over a set period. If a topic does not click the first time, you get another perspective on it at no extra cost.",
    grad: "from-blue-600 to-violet-500",
    glow: "rgba(37,99,235,0.18)",
  },
  {
    icon: FolderKanban,
    num: "04",
    title: "Work on Real Life Data Projects",
    desc: "You build across multiple domains using real datasets and real problem statements. By the end of your program you leave with a portfolio you can walk an interviewer through, not a folder of tutorial exercises.",
    grad: "from-blue-600 to-violet-500",
    glow: "rgba(37,99,235,0.18)",
  },
  {
    icon: Briefcase,
    num: "05",
    title: "Placement Assistance",
    desc: "End-to-end career support covering resume building, LinkedIn optimisation, mock technical and HR interviews, and active job referrals. Our placement team works with you until you are genuinely interview-ready.",
    grad: "from-blue-600 to-violet-500",
    glow: "rgba(37,99,235,0.18)",
  },
  {
    icon: Mic2,
    num: "06",
    title: "Guest Lectures from Industry Experts",
    desc: "Regular sessions and webinars from senior practitioners give you a direct line to how AI is being deployed right now, which roles are opening up, and what hiring managers are actually screening for.",
    grad: "from-blue-600 to-violet-500",
    glow: "rgba(37,99,235,0.18)",
  },
];

export default function WhyChooseUs() {
  return (
    <>
      <div className="relative z-[1] rounded-[20px] bg-[#6366F1] min-[1920px]:mx-[13px]">
        <Image alt="Shape" className="absolute bottom-0 left-0 z-[-1]" src="/assets/img/box-shape-2.png" width={600} height={400} />
        <Image alt="Shape" className="absolute left-[53%] top-0 z-[-1] -translate-x-1/2" src="/assets/img/box-shape-3.png" width={600} height={400} />
        <div className="mx-auto w-full px-3 min-[992px]:pl-[calc((100%-960px)/2+12px)] min-[1200px]:pl-[calc((100%-1140px)/2+12px)] min-[1400px]:pl-[calc((100%-1300px)/2+12px)]">
          <div className="flex flex-wrap items-stretch">
            <div className="w-full lg:w-1/2 xl:w-5/12 flex">
              <div className="max-[991px]:pt-[60px] md:mb-[30px] flex flex-col justify-center items-center text-center md:text-left">
                <SectionBadge variant="dark">Why Choose Mindlyft AI</SectionBadge>
                <AnimateIn direction="up" delay={400}>
                  <Subheading
                    className="!text-white mb-[15px]"
                    text="Why Choose MindLyft AI"
                    highlight="for AI Training in Pune?"
                    highlightClassName="!text-violet-200"
                  />
                </AnimateIn>
                <AnimateIn direction="up" delay={500}>
                  <p className="mb-[30px] text-[#ddd]">
                    We are an AI-first institute in Pune built on three things learners consistently ask for: teachers who have actually done the work, a syllabus that matches what companies are hiring for, and genuine support until you land the role.
                  </p>
                </AnimateIn>
                <Link
                  href="/courses"
                  className="inline-flex items-center gap-3 pl-6 pr-2 py-2 rounded-full font-semibold text-white text-sm bg-[linear-gradient(to_right,#7c3aed,#3b82f6)] transition-opacity hover:opacity-90"
                >
                  Explore Our Courses
                  <span className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20">
                    <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            </div>
            <AnimateIn direction="up" delay={400} className="w-full lg:w-1/2 xl:w-7/12 2xl:pl-12">
              <div className="h-[480px] rounded-[10px] bg-[#ddd] bg-[url('/assets/img/about/wh-img-2.jpg')] bg-cover bg-center bg-no-repeat max-[991px]:bg-top min-[1920px]:my-5 min-[1920px]:mr-[5px]" />
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
                  <div className="px-5 py-4 text-center text-white">
                    <h3 className="text-base font-bold text-white mb-2 leading-snug group-hover:text-violet-200 transition-colors duration-200">
                      {item.title}
                    </h3>
                    <p className="mb-[30px] text-center leading-relaxed text-white">
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
