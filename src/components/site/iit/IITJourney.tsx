"use client";

import { Fragment } from "react";
import { Phone, BookOpen, FlaskConical, Award, ArrowRight, ArrowDown } from "lucide-react";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

const STEPS = [
  { icon: Phone,        num: "01", title: "Apply and get assessed",       desc: "A short counselling call to match your background to the right track. There is no point putting a beginner in Level 2.", accent: "#8B5CF6" },
  { icon: BookOpen,     num: "02", title: "Learn in a mixed format",      desc: "Classroom sessions at Akurdi with a C3iHub instructor, recorded material for revision, and live online sessions. The split varies by programme — the table above shows each.", accent: "#6366F1" },
  { icon: FlaskConical, num: "03", title: "Work on labs and case studies", desc: "Simulated attacks, forensic exercises and real incident scenarios rather than closed-book assessment.", accent: "#3B82F6" },
  { icon: Award,        num: "04", title: "Certify",                      desc: "A joint MindLyft AI and C3iHub, IIT Kanpur certificate on successful completion.", accent: "#7C3AED" },
];

export default function IITJourney({ bg = "bg-violet-50" }: { bg?: string }) {
  return (
    <section className={`${bg} min-h-screen px-6 py-24 md:px-[60px] flex items-center overflow-hidden`}>
      <div className="max-w-6xl mx-auto w-full">

        {/* Header */}
        <div className="text-center mb-20">
          <AnimateIn delay={0} direction="flip">
            <LineBadge className="justify-center mb-5">The IIT Learning Journey</LineBadge>
          </AnimateIn>
          <AnimateIn delay={100} direction="flip">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-4">
              How the{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                programme runs
              </span>
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="flip">
            <p className="text-base text-gray-500 leading-relaxed max-w-xl mx-auto">
              Every IIT program follows a structured journey — designed so you always know where you are and what comes next.
            </p>
          </AnimateIn>
        </div>

        {/* Desktop: horizontal card flow connected by arrows */}
        <div className="hidden lg:flex items-stretch gap-3">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Fragment key={step.title}>
                <AnimateIn delay={300 + i * 120} direction="up" className="flex-1">
                  <div
                    className="group h-full rounded-2xl bg-white p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    style={{ borderTop: `4px solid ${step.accent}` }}
                  >
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className="flex h-11 w-11 items-center justify-center rounded-xl group-hover:scale-110 transition-transform duration-300"
                        style={{ background: `${step.accent}18` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: step.accent }} />
                      </div>
                      <span className="text-3xl font-black" style={{ color: `${step.accent}30` }}>{step.num}</span>
                    </div>
                    <h4 className="text-sm font-bold text-gray-900 mb-1.5">{step.title}</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </AnimateIn>
                {i < STEPS.length - 1 && (
                  <div className="flex items-center justify-center shrink-0">
                    <ArrowRight className="h-5 w-5 text-gray-300" />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>

        {/* Mobile: vertical card flow connected by arrows */}
        <div className="lg:hidden flex flex-col items-stretch gap-2">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            return (
              <Fragment key={step.title}>
                <AnimateIn delay={300 + i * 100} direction="up">
                  <div
                    className="rounded-2xl bg-white p-5 shadow-sm"
                    style={{ borderLeft: `4px solid ${step.accent}` }}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl shrink-0" style={{ background: `${step.accent}18` }}>
                        <Icon className="h-4 w-4" style={{ color: step.accent }} />
                      </div>
                      <div>
                        <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: step.accent }}>Step {step.num}</span>
                        <h4 className="text-sm font-bold text-gray-900">{step.title}</h4>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 leading-relaxed">{step.desc}</p>
                  </div>
                </AnimateIn>
                {i < STEPS.length - 1 && (
                  <div className="flex justify-center">
                    <ArrowDown className="h-4 w-4 text-gray-300" />
                  </div>
                )}
              </Fragment>
            );
          })}
        </div>

      </div>
    </section>
  );
}
