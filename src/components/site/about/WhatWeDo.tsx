import Image from "next/image";
import { GraduationCap, ShieldCheck, Cpu } from "lucide-react";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { Subheading } from "@/components/ui/Subheading";
import { Section } from "@/components/ui/Section";

const ITEMS = [
  {
    icon: GraduationCap,
    title: "AI education and training",
    description:
      "Classroom programmes in agentic AI and LLMs, machine learning, data analytics and applied AI tools, from beginner level to advanced. Every programme is built around real projects, so learners leave with a portfolio rather than only a certificate.",
  },
  {
    icon: ShieldCheck,
    title: "IIT Kanpur programmes, with C3iHub",
    description:
      "A dedicated track delivered in collaboration with C3iHub at IIT Kanpur, running from beginner through advanced levels, with instructors drawn from C3iHub's own team. The cybersecurity programmes cover ethical hacking, threat intelligence, digital forensics and incident response. Programmes on this track carry a joint MindLyft AI and C3iHub IIT Kanpur certification.",
  },
  {
    icon: Cpu,
    title: "AI solutions for business",
    description:
      "For organisations, we build machine learning models, intelligent automation, data analytics systems and custom software — designed around a measurable business outcome rather than technology for its own sake.",
  },
];

export default function WhatWeDo({ bg = "bg-white" }: { bg?: string }) {
  return (
    <Section bg={bg}>
      <div className="text-center mb-10 md:mb-16">
        <AnimateIn delay={100} direction="right">
          <Subheading
            as="h2"
            centered
            color="violet"
            size="xl"
            className="leading-tight mb-4"
            text="What we"
            highlight="do"
          />
        </AnimateIn>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">

        {/* Image */}
        <div className="w-full lg:w-[45%] shrink-0">
          <Image
            src="/images/Whoweare.png"
            alt="MindLyft AI education and AI solutions"
            width={0}
            height={0}
            sizes="(max-width: 1024px) 100vw, 45vw"
            className="w-full h-[480px] object-cover rounded-2xl shadow-md"
          />
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col gap-6">
          {ITEMS.map(({ icon: Icon, title, description }, i) => (
            <AnimateIn key={title} delay={150 + i * 80} direction="up">
              <div className="flex gap-4 rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
                  <p className="text-sm leading-relaxed text-gray-600">{description}</p>
                </div>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </Section>
  );
}
