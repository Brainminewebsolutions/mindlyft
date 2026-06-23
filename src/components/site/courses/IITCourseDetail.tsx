import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft, Clock, Globe, User, Wifi, MapPin, ShoppingBag,
  CheckCircle2, BookOpen, ChevronDown, PlayCircle, FileText, Award, Shield,
} from "lucide-react";
import type { Course } from "@/types/admin/course";
import type { CourseChapterItem } from "@/types/student/course";

interface Props {
  course:       Course;
  chapters:     CourseChapterItem[];
  proxiedImage: string | null;
}

export default function IITCourseDetail({ course, chapters, proxiedImage }: Props) {
  const totalLessons = chapters.reduce((sum, ch) => sum + ch.contents.length, 0);
  const ModeIcon     = course.mode === "Online" ? Wifi : MapPin;
  const highlights   = course.highlights ?? [];
  const discounted   = course.discount && course.discount > 0
    ? Math.round(course.price * (1 - course.discount / 100))
    : null;

  const h2 = "text-base font-extrabold text-gray-900 mb-5 pb-3 border-b border-violet-100 tracking-tight";

  return (
    <div className="min-h-screen text-gray-900 [font-family:var(--primaryFont,sans-serif)]">

      {/* ── HERO ── */}
      <div className="relative flex h-screen overflow-hidden" style={{ background: "linear-gradient(135deg, #ffffff 0%, #fce8ff 60%, #f0d4ff 100%)" }}>

        {/* LEFT — content */}
        <div className="relative z-10 flex w-full flex-col justify-center gap-6 px-8 py-24 md:w-[54%] md:px-14 lg:px-20">

          {/* Collaboration badges */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 bg-white/80 border border-violet-200 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
              <Image src="/mindlyftai_logo.png" alt="Mindlyft AI" width={18} height={18} className="rounded" />
              <span className="text-xs font-bold text-gray-700 tracking-wide">Mindlyft AI</span>
            </div>
            <span className="text-gray-400 text-sm font-light">×</span>
            <div className="flex items-center gap-2 bg-white/80 border border-violet-200 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm">
              <img src="/C3ihub.jpeg" alt="C3iHub" className="w-4 h-4 rounded object-contain" />
              <span className="text-xs font-bold text-gray-700 tracking-wide">C3iHub, IIT Kanpur</span>
            </div>
          </div>

          {/* IIT badge */}
          <div className="inline-flex w-fit items-center gap-2 px-4 py-1.5 rounded-full border border-violet-300 bg-violet-100 shadow-sm">
            <Award className="w-3.5 h-3.5 text-violet-600" />
            <span className="text-[11px] font-bold uppercase tracking-[3px] text-violet-600">IIT Collaboration Course</span>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-tight text-gray-900">
            {course.name}
          </h1>

        </div>

        {/* RIGHT — image as background */}
        <div className="absolute right-0 top-0 hidden h-full w-[50%] md:block pt-16">
          {proxiedImage ? (
            <img src={proxiedImage} alt={course.name} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-violet-200 via-violet-100 to-blue-100" />
          )}
          {/* Left-edge fade blending into the gradient left panel */}
          {/* <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #ffffff 0%, #fce8ffcc 10%, #fce8ff55 28%, transparent 55%)" }} /> */}
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 pointer-events-none" style={{ background: "linear-gradient(to top, #ffffff, transparent)" }} />
      </div>

      {/* ── INFO SECTION ── */}
      <div className="bg-white border-t border-violet-100">
        <div className="mx-auto max-w-[1100px] px-6">

          {/* Stats bar */}
          <div className="flex flex-wrap items-center gap-6 py-5 border-b border-violet-100 text-sm">
            {[
              { Icon: User,     val: course.instructor },
              { Icon: ModeIcon, val: course.mode        },
              { Icon: Clock,    val: `${course.duration}h` },
              { Icon: Globe,    val: course.language    },
              { Icon: Award,    val: "IIT Kanpur Certified" },
              { Icon: BookOpen, val: `${chapters.length} Ch · ${totalLessons} Lessons` },
            ].map(({ Icon, val }) => (
              <span key={val} className="flex items-center gap-1.5 text-gray-600">
                <Icon className="w-4 h-4 text-violet-500 shrink-0" />
                {val}
              </span>
            ))}
          </div>

          {/* Body grid */}
          <div className="py-14 grid grid-cols-1 min-[900px]:grid-cols-[1fr_320px] gap-12 items-start">

            {/* LEFT */}
            <div className="space-y-14">

              {/* What you'll learn */}
              {highlights.length > 0 && (
                <section>
                  <h2 className={h2}>What You&apos;ll Learn</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {highlights.map((hl, i) => (
                      <div key={i} className="flex items-start gap-3 p-4 rounded-xl border border-violet-100 bg-violet-50/50 hover:bg-violet-50 transition-colors">
                        <CheckCircle2 className="w-4 h-4 shrink-0 text-violet-500 mt-0.5" />
                        <span className="text-sm text-gray-700 leading-relaxed">{hl}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* About */}
              {course.description && (
                <section>
                  <h2 className={h2}>About This Course</h2>
                  <p className="text-sm text-gray-600 leading-[1.9]">{course.description}</p>
                </section>
              )}

              {/* Syllabus */}
              {chapters.length > 0 && (
                <section>
                  <div className="flex items-center justify-between mb-5 pb-3 border-b border-violet-100">
                    <h2 className="text-base font-extrabold text-gray-900 tracking-tight m-0">Course Syllabus</h2>
                    <span className="text-xs font-semibold text-violet-600 bg-violet-100 border border-violet-200 px-3 py-1 rounded-full">
                      {chapters.length} chapters · {totalLessons} lessons
                    </span>
                  </div>
                  <div className="space-y-2">
                    {chapters.map((ch, chIdx) => (
                      <details
                        key={ch.id}
                        open={chIdx === 0}
                        className="group overflow-hidden rounded-xl border border-violet-100"
                      >
                        <summary className="flex cursor-pointer select-none list-none items-center gap-3 bg-violet-50/60 px-5 py-4 transition-colors hover:bg-violet-50 group-open:border-b group-open:border-violet-100 group-open:bg-violet-50 [&::-webkit-details-marker]:hidden">
                          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-violet-600 text-[11px] font-black text-white">
                            {chIdx + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="m-0 truncate text-sm font-bold text-gray-900">{ch.title}</p>
                            {ch.description && (
                              <p className="m-0 mt-0.5 truncate text-xs text-gray-400">{ch.description}</p>
                            )}
                          </div>
                          <span className="text-xs font-semibold text-violet-500 shrink-0">
                            {ch.contents.length} lesson{ch.contents.length !== 1 ? "s" : ""}
                          </span>
                          <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                        </summary>

                        {ch.contents.length > 0 ? (
                          <ul className="m-0 list-none p-0 bg-white">
                            {ch.contents.map((lesson, lIdx) => (
                              <li
                                key={lesson.id}
                                className="flex items-center gap-3 border-b border-violet-50 py-3 pl-14 pr-5 text-sm text-gray-500 last:border-b-0 hover:text-gray-800 hover:bg-violet-50/40 transition-colors"
                              >
                                {lesson.videoUrl
                                  ? <PlayCircle className="h-3.5 w-3.5 shrink-0 text-violet-500" />
                                  : <FileText   className="h-3.5 w-3.5 shrink-0 text-gray-300" />}
                                <span className="min-w-[20px] shrink-0 text-[11px] font-semibold text-gray-400">{lIdx + 1}.</span>
                                <span className="flex-1">{lesson.title}</span>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="m-0 px-5 py-3 text-xs text-gray-400 bg-white">No lessons yet</p>
                        )}
                      </details>
                    ))}
                  </div>
                </section>
              )}

            </div>

            {/* RIGHT — sticky card */}
            <div className="sticky top-20">
              <div className="overflow-hidden rounded-2xl border border-violet-200 shadow-[0_16px_48px_rgba(139,92,246,0.10)]">
                <div className="h-1 w-full bg-gradient-to-r from-violet-500 to-blue-500" />
                <div className="p-6 space-y-5 bg-white">

                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-violet-200 bg-violet-50">
                    <Award className="w-3 h-3 text-violet-600" />
                    <span className="text-[10px] font-bold uppercase tracking-widest text-violet-600">IIT Collaboration</span>
                  </div>

                  <div>
                    {discounted !== null ? (
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="text-3xl font-black text-violet-700">₹{discounted.toLocaleString("en-IN")}</span>
                          <span className="text-sm text-gray-400 line-through">₹{course.price.toLocaleString("en-IN")}</span>
                        </div>
                        <span className="text-xs font-bold text-violet-600 bg-violet-50 border border-violet-200 px-2 py-0.5 rounded-full">
                          {course.discount}% OFF
                        </span>
                      </div>
                    ) : (
                      <span className="text-3xl font-black text-violet-700">
                        {course.price === 0 ? "Free" : `₹${course.price.toLocaleString("en-IN")}`}
                      </span>
                    )}
                    <p className="text-xs text-gray-400 mt-1">One-time payment · Lifetime access</p>
                  </div>

                  <Link
                    href={`/checkout/${course.id}`}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-violet-600 hover:bg-violet-700 px-5 py-3.5 text-sm font-bold text-white transition-all hover:scale-[1.02] shadow-[0_4px_20px_rgba(139,92,246,0.3)] no-underline"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    {course.price === 0 ? "Enrol for Free" : "Enrol Now"}
                  </Link>

                </div>
              </div>
            </div>

          </div>

          {/* Back link */}
          <div className="pb-16 pt-2">
            <Link
              href="/courses"
              className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Courses
            </Link>
          </div>

        </div>
      </div>

    </div>
  );
}
