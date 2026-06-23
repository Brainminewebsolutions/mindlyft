import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock, Wifi, MapPin, User, Globe, ArrowLeft,
  ShoppingBag, CheckCircle2, ChevronDown, PlayCircle, FileText, BookOpen,
} from "lucide-react";
import { dotnetFetch } from "@/lib/api/dotnet-client";
import { toUploadUrl } from "@/lib/api/image-url";
import type { Course } from "@/types/admin/course";
import type { CourseChapterItem } from "@/types/student/course";
import IITCourseDetail from "@/components/site/courses/IITCourseDetail";

interface CourseEnvelope {
  isSuccess: boolean;
  data: Course;
}

interface ChaptersEnvelope {
  isSuccess: boolean;
  data: CourseChapterItem[];
}

async function getCourse(id: string): Promise<Course | null> {
  try {
    const envelope = await dotnetFetch<CourseEnvelope>(
      `/v1/courses/${id}`,
      { next: { revalidate: 300 } } as RequestInit,
    );
    return envelope.isSuccess ? envelope.data : null;
  } catch {
    return null;
  }
}

async function getChapters(id: string): Promise<CourseChapterItem[]> {
  try {
    const envelope = await dotnetFetch<ChaptersEnvelope>(
      `/v1/courses/${id}/chapters-with-contents`,
      { next: { revalidate: 300 } } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data ?? []) : [];
  } catch {
    return [];
  }
}

const sectionTitle =
  "text-[1.1rem] font-extrabold text-[#1a1046] tracking-[0.3px] mb-[18px] pb-3 border-b-2 border-[#f0eeff] [font-family:var(--secondaryFont,sans-serif)]";

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [course, rawChapters] = await Promise.all([getCourse(id), getChapters(id)]);

  if (!course) notFound();

  // Sort chapters once — reused by both layouts
  const chapters = rawChapters
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((ch) => ({
      ...ch,
      contents: ch.contents.slice().sort((a, b) => a.order - b.order),
    }));

  const totalLessons = chapters.reduce((sum, ch) => sum + ch.contents.length, 0);

  const proxiedImage = toUploadUrl(course.image);
  const priceLabel   = course.price === 0 ? "Free" : `₹${course.price.toLocaleString("en-IN")}`;
  const highlights   = course.highlights ?? [];
  const ModeIcon     = course.mode === "Online" ? Wifi : MapPin;

  // IIT courses get a dedicated premium page
  if (course.courseType === "IIT") {
    return <IITCourseDetail course={course} chapters={chapters} proxiedImage={proxiedImage} />;
  }

  return (
    <div className="min-h-screen bg-[#f5f3ff] [font-family:var(--primaryFont,sans-serif)]">

      {/* ── Hero ── */}
      <div className="relative h-screen overflow-hidden">
        {proxiedImage ? (
          <img src={proxiedImage} alt={course.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-violet-500 to-blue-500" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/40 via-transparent to-transparent" />

        {/* Back link */}
        <Link
          href="/courses"
          className="absolute top-24 left-8 inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors z-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Courses
        </Link>

        {/* Title — bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="px-8 pb-4 pt-6">
            <h1
              className="text-xl md:text-2xl font-bold leading-snug max-w-3xl"
              style={{ color: "#ffffff", textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
            >
              {course.name}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Quick info bar ── */}
      <div className="bg-white border-b border-violet-100">
        <div className="mx-auto max-w-[1100px] px-[6vw] py-4 flex flex-wrap gap-5 text-sm text-gray-600">
          <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-violet-500" />{course.instructor}</span>
          <span className="flex items-center gap-1.5"><ModeIcon className="w-4 h-4 text-violet-500" />{course.mode}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-violet-500" />{course.duration}h</span>
          <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-violet-500" />{course.language}</span>
        </div>
      </div>

      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-10 px-[6vw] py-10 min-[901px]:grid-cols-[1fr_340px]">

        {/* ── LEFT: content ── */}
        <div>

          {/* What You'll Learn */}
          {highlights.length > 0 && (
            <div className="mb-10">
              <p className={sectionTitle}>What You&apos;ll Learn</p>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
                {highlights.map((h, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2.5 rounded-xl border border-[#6c63ff]/15 bg-[#f5f3ff] px-4 py-3.5 transition-shadow duration-200 hover:shadow-[0_4px_16px_rgba(108,99,255,0.10)]"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-[#6c63ff]" />
                    <span className="text-[13.5px] font-medium text-[#333]">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About */}
          {course.description && (
            <div className="mb-10">
              <p className={sectionTitle}>About This Course</p>
              <p className="m-0 text-[0.95rem] leading-[1.85] text-[#555]">
                {course.description}
              </p>
            </div>
          )}

          {/* Course Info */}
          <div className="mb-10">
            <p className={sectionTitle}>Course Info</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3.5">
              {[
                { Icon: User,     label: "Instructor", value: course.instructor },
                { Icon: Globe,    label: "Language",   value: course.language   },
                { Icon: Clock,    label: "Duration",   value: `${course.duration} hours` },
                { Icon: ModeIcon, label: "Mode",       value: course.mode },
              ].map(({ Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-[14px] border border-[#6c63ff]/10 bg-white p-[18px] shadow-[0_2px_12px_rgba(108,99,255,0.05)]"
                >
                  <div className="mb-1.5 flex items-center gap-[7px]">
                    <Icon className="h-[13px] w-[13px] text-[#6c63ff]" />
                    <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#999]">
                      {label}
                    </span>
                  </div>
                  <p className="m-0 text-sm font-bold text-[#1a1046]">{value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── RIGHT: sticky purchase card ── */}
        <div className="sticky top-20 overflow-hidden rounded-[20px] border border-[#6c63ff]/15 bg-white shadow-[0_16px_48px_rgba(108,99,255,0.10)]">
          <div className="p-6">
            {/* Price */}
            <p className="m-0 mb-1 text-[2rem] font-extrabold text-[#1a1046] [font-family:var(--secondaryFont,sans-serif)]">
              {course.price === 0
                ? <span className="text-[#22c55e]">Free</span>
                : <span className="text-[#6c63ff]">{priceLabel}</span>}
            </p>
            <p className="mb-5 text-xs text-[#999]">
              One-time payment · Lifetime access
            </p>

            {/* CTA */}
            <Link
              href={`/checkout/${course.id}`}
              className="mb-3 box-border flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#6c63ff] p-[15px] text-[15px] font-bold text-white no-underline transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-[#5b52e0] hover:text-white [font-family:var(--primaryFont,sans-serif)]"
            >
              <ShoppingBag className="h-4 w-4" />
              {course.price === 0 ? "Enrol for Free" : "Buy Now"}
            </Link>

            {/* Quick stats */}
            {chapters.length > 0 && (
              <div className="mb-4 flex items-center gap-2 rounded-[10px] bg-[#f5f3ff] px-3 py-2.5">
                <BookOpen className="h-[13px] w-[13px] shrink-0 text-[#6c63ff]" />
                <span className="text-[12.5px] text-[#555]">
                  <strong className="text-[#1a1046]">{chapters.length}</strong> chapters &middot; <strong className="text-[#1a1046]">{totalLessons}</strong> lessons
                </span>
              </div>
            )}

            {/* Divider */}
            <div className="mt-1 flex flex-col gap-2.5 border-t border-[#f0eeff] pt-[18px]">
              {[
                { Icon: Clock,    text: `${course.duration} hours of content` },
                { Icon: ModeIcon, text: `${course.mode} mode` },
                { Icon: Globe,    text: `In ${course.language}` },
                { Icon: User,     text: `By ${course.instructor}` },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon className="h-3.5 w-3.5 shrink-0 text-[#6c63ff]" />
                  <span className="text-[13px] text-[#666]">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* ── Syllabus — full-width below the grid ── */}
      {chapters.length > 0 && (
        <div className="mx-auto max-w-[1100px] px-[6vw] pb-[100px]">

          {/* Section header */}
          <div className="mb-6 flex items-center justify-between border-b-2 border-[#f0eeff] pb-3.5">
            <p className={`${sectionTitle} m-0 border-none p-0`}>
              Course Syllabus
            </p>
            <span className="rounded-[20px] bg-[#f0eeff] px-2.5 py-1 text-xs font-semibold text-[#6c63ff]">
              {chapters.length} chapter{chapters.length !== 1 ? "s" : ""} &middot; {totalLessons} lesson{totalLessons !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Chapter accordion — two columns on wide screens */}
          <div className="grid grid-cols-[repeat(auto-fill,minmax(480px,1fr))] gap-3">
            {chapters.map((ch, chIdx) => (
              <details
                key={ch.id}
                open={chIdx === 0}
                className="group overflow-hidden rounded-xl border border-[#6c63ff]/15 bg-white"
              >

                <summary className="flex cursor-pointer select-none list-none items-center gap-3 bg-[#faf9ff] px-4 py-3.5 transition-colors duration-150 hover:bg-[#f0eeff] group-open:border-b group-open:border-[#6c63ff]/10 group-open:bg-[#f0eeff] [&::-webkit-details-marker]:hidden">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#6c63ff] text-[11px] font-bold text-white">
                    {chIdx + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="m-0 truncate text-[13.5px] font-bold text-[#1a1046]">
                      {ch.title}
                    </p>
                    {ch.description && (
                      <p className="m-0 mt-0.5 truncate text-[11.5px] text-[#888]">
                        {ch.description}
                      </p>
                    )}
                  </div>

                  <span className="shrink-0 text-[11px] font-semibold text-[#6c63ff]">
                    {ch.contents.length} lesson{ch.contents.length !== 1 ? "s" : ""}
                  </span>

                  <ChevronDown className="h-4 w-4 shrink-0 text-[#6c63ff] transition-transform duration-200 ease-out group-open:rotate-180" />
                </summary>

                {ch.contents.length > 0 ? (
                  <ul className="m-0 list-none p-0">
                    {ch.contents.map((lesson, lIdx) => (
                      <li
                        key={lesson.id}
                        className="flex items-center gap-2.5 border-b border-[#6c63ff]/5 py-2.5 pl-11 pr-4 text-[13px] text-[#444] last:border-b-0"
                      >
                        {lesson.videoUrl
                          ? <PlayCircle className="h-[13px] w-[13px] shrink-0 text-[#6c63ff]" />
                          : <FileText   className="h-[13px] w-[13px] shrink-0 text-[#aaa]" />}
                        <span className="min-w-[18px] shrink-0 text-[11px] font-semibold text-[#777]">
                          {lIdx + 1}.
                        </span>
                        <span className="flex-1 text-[13px] text-[#333]">{lesson.title}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="m-0 px-4 py-3 text-[12.5px] text-[#aaa]">
                    No lessons yet
                  </p>
                )}

              </details>
            ))}
          </div>

        </div>
      )}

    </div>
  );
}