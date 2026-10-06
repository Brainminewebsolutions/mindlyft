"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, Globe, User, ArrowRight, Wifi, MapPin, BookOpen, GraduationCap, BriefcaseBusiness, RefreshCw, CheckCircle, Sparkles, ShieldCheck, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";
import type { Course } from "@/types/admin/course";


const GRADIENTS = [
  "from-violet-500 to-blue-500",
  "from-fuchsia-500 to-violet-600",
  "from-blue-500 to-cyan-400",
  "from-indigo-500 to-purple-600",
  "from-violet-600 to-indigo-500",
  "from-blue-600 to-violet-500",
];

// Icon keys the admin can pick for a course card chip.
const CHIP_ICONS: Record<string, LucideIcon> = {
  briefcase:  BriefcaseBusiness,
  shield:     ShieldCheck,
  user:       User,
  graduation: GraduationCap,
  refresh:    RefreshCw,
};

const DEFAULT_CHIPS = [
  { label: "Students",        icon: "graduation" },
  { label: "Professionals",   icon: "briefcase"  },
  { label: "Career Changers", icon: "refresh"    },
];

function CourseCard({ course, index }: { course: Course; index: number }) {
  const img      = course.image ?? null;
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const ModeIcon = course.mode === "Online" ? Wifi : MapPin;
  const isFree   = course.price === 0;

  return (
    <div className="group flex flex-col rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      {/* Thumbnail */}
      <div className="relative h-44 overflow-hidden shrink-0">
        {img ? (
          <Image
            src={img}
            alt={course.name}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <BookOpen className="w-10 h-10 text-white/40" />
          </div>
        )}
        {/* Price */}
        <span className={cn(
          "absolute top-3 right-3 text-xs font-extrabold px-2.5 py-1 rounded-full",
          isFree ? "bg-emerald-500 text-white" : "bg-white text-violet-700 shadow-sm"
        )}>
          {isFree ? "Free" : `₹${course.price.toLocaleString("en-IN")}`}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">
          {course.name}
        </h3>
        {course.description && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
            {course.description}
          </p>
        )}
        {/* Meta */}
        <div className="flex flex-wrap gap-x-3 gap-y-1.5 text-xs text-gray-400 mb-4 mt-auto">
          <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-violet-400" />{course.duration}h</span>
          <span className="flex items-center gap-1"><Globe className="w-3 h-3 text-violet-400" />{course.language}</span>
          <span className="flex items-center gap-1"><ModeIcon className="w-3 h-3 text-violet-400" />{course.mode}</span>
          <span className="flex items-center gap-1 truncate max-w-[110px]"><User className="w-3 h-3 text-violet-400 shrink-0" />{course.instructor}</span>
        </div>
        {/* Highlights */}
        {course.highlights && course.highlights.length > 0 && (
          <ul className="space-y-1">
            {course.highlights.slice(0, 3).map((h, idx) => (
              <li key={idx} className="flex items-start gap-1.5 text-[12px] text-gray-500">
                <CheckCircle className="mt-0.5 w-3 h-3 shrink-0 text-violet-500" />
                {h}
              </li>
            ))}
          </ul>
        )}

        {/* Who this is for */}
        <div className="rounded-xl bg-violet-50 px-3 py-2.5">
          <p className="mb-2 text-[10px] font-black uppercase tracking-widest text-violet-500">Who This Is For</p>
          <div className="flex flex-wrap gap-1">
            {(course.cardChips?.length ? course.cardChips : DEFAULT_CHIPS).map(({ label, icon }) => {
              const Icon = icon ? CHIP_ICONS[icon] : undefined;
              return (
                <span key={label} className="inline-flex items-center gap-1 rounded-full border border-violet-200 bg-white px-1.5 py-1 text-[11px] font-medium text-violet-600">
                  {Icon && <Icon className="w-3 h-3" />}{label}
                </span>
              );
            })}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 pt-3 border-t border-gray-100">
          <Link
            href={`/courses/mindlyftai/${course.slug}`}
            className="flex flex-1 items-center justify-center gap-1 rounded-xl border border-violet-300 py-2 text-xs font-semibold text-violet-600 transition-all hover:bg-violet-50 active:scale-95"
          >
            View Program <ArrowRight className="w-3 h-3" />
          </Link>
          {course.status === "UPCOMING" ? (
            <div className="flex flex-1 items-center justify-center gap-1 rounded-xl bg-[linear-gradient(135deg,#f59e0b_0%,#f97316_100%)] py-2 text-xs font-semibold text-white">
              <Sparkles className="w-3 h-3" />Coming Soon
            </div>
          ) : (
            <Link
              href={`/courses/mindlyftai/${course.slug}?action=buy`}
              className="flex flex-1 items-center justify-center rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 py-2 text-xs font-semibold text-white transition-all hover:opacity-90 active:scale-95"
            >
              Buy Now
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default function IITCoursesGrid({
  courses, bg = "bg-white", showHeader = true,
}: { courses: Course[]; bg?: string; showHeader?: boolean }) {
  const filtered = courses;

  return (
    <section className={cn(bg, "px-6 md:px-[60px]", showHeader ? "py-20" : "pt-10 pb-20")}>
      <div className="max-w-7xl mx-auto">

        {/* Section header */}
        {showHeader && (
          <>
            <AnimateIn delay={0} direction="left">
              <LineBadge className="mb-5">Explore Our Courses</LineBadge>
            </AnimateIn>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
              <div className="text-center md:text-left">
                <AnimateIn delay={100} direction="left">
                  <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                    Find your{" "}
                    <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                      next skill
                    </span>
                  </h2>
                </AnimateIn>
                <AnimateIn delay={200} direction="left">
                  <p className="text-base text-gray-500 mt-2">
                    {courses.length} courses across AI, cybersecurity, technology, and more.
                  </p>
                </AnimateIn>
              </div>

            </div>

            <div className="border-b border-gray-100 mb-8" />
          </>
        )}

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-violet-400" />
            </div>
            <p className="text-gray-700 font-semibold text-base">
              No courses available
            </p>
            <p className="text-sm text-gray-400 mt-1">Check back soon!</p>
          </div>
        )}

      </div>
    </section>
  );
}
