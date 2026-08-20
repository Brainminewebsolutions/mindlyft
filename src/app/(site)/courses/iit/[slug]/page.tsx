import Link from "next/link";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { Clock, Wifi, MapPin, User, Globe, ArrowLeft, ShoppingBag, BookOpen } from "lucide-react";
import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import { toUploadUrl } from "@/lib/api/image-url";
import { isNumericId } from "@/lib/slug";
import type { Course } from "@/types/admin/course";
import type { CourseChapterItem } from "@/types/student/course";
import IITCourseDetail from "@/components/site/courses/iit/IITCourseDetail";
import Syllabus from "@/components/site/courses/Syllabus";
import Skills from "@/components/site/courses/Skills";
import InstructorProfile from "@/components/site/Instructor/InstructorProfile";

interface CourseEnvelope { isSuccess: boolean; data: Course; }
interface ChaptersEnvelope { isSuccess: boolean; data: CourseChapterItem[]; }

async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const envelope = await dotnetFetch<CourseEnvelope>(`/v1/courses/slug/${encodeURIComponent(slug)}`, { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit);
    return envelope.isSuccess ? envelope.data : null;
  } catch { return null; }
}

async function getCourseById(id: string): Promise<Course | null> {
  try {
    const envelope = await dotnetFetch<CourseEnvelope>(`/v1/courses/${id}`, { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit);
    return envelope.isSuccess ? envelope.data : null;
  } catch { return null; }
}

async function getChapters(id: string): Promise<CourseChapterItem[]> {
  try {
    const envelope = await dotnetFetch<ChaptersEnvelope>(`/v1/courses/${id}/chapters-with-contents`, { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit);
    return envelope.isSuccess ? (envelope.data ?? []) : [];
  } catch { return []; }
}

const COLOR    = "#6c63ff";
const BG_COLOR = "#f5f3ff";
const sectionTitle = "text-[1.1rem] font-extrabold text-[#1a1046] tracking-[0.3px] mb-[18px] pb-3 border-b-2 border-[#f0eeff] [font-family:var(--secondaryFont,sans-serif)]";

export default async function IITCourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  let course = await getCourseBySlug(slug);
  if (!course && isNumericId(slug)) {
    const byId = await getCourseById(slug);
    if (byId) redirect(`/courses/iit/${byId.slug}`);
  }
  if (!course) notFound();
  const rawChapters = await getChapters(course.id);

  const instructor = course.instructorDetail;
  const chapters = rawChapters.slice().sort((a, b) => a.order - b.order).map((ch) => ({ ...ch, contents: ch.contents.slice().sort((a, b) => a.order - b.order) }));
  const totalLessons = chapters.reduce((sum, ch) => sum + ch.contents.length, 0);
  const proxiedImage = toUploadUrl(course.image);
  const priceLabel   = course.price === 0 ? "Free" : `₹${course.price.toLocaleString("en-IN")}`;
  const highlights   = course.highlights ?? [];
  const ModeIcon     = course.mode === "Online" ? Wifi : MapPin;

  if (course.courseType === "IIT") {
    return <IITCourseDetail course={course} chapters={chapters} proxiedImage={proxiedImage} />;
  }

  return (
    <div className="min-h-screen bg-[#f5f3ff] [font-family:var(--primaryFont,sans-serif)]">
      <div className="relative h-[60vh] sm:h-[70vh] md:h-screen overflow-hidden">
        {proxiedImage ? (
          <Image src={proxiedImage} alt={course.name} fill priority sizes="100vw" className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-violet-500 to-blue-500" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/40 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="px-8 pb-4 pt-6">
            <h1 className="text-xl md:text-2xl font-bold leading-snug max-w-3xl" style={{ color: "#ffffff", textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}>{course.name}</h1>
          </div>
        </div>
      </div>
      <div className="bg-white border-b border-violet-100">
        <div className="mx-auto max-w-[1100px] px-[6vw] py-4 flex flex-wrap gap-5 text-sm text-gray-600">
          <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-violet-500" />{course.instructor}</span>
          <span className="flex items-center gap-1.5"><ModeIcon className="w-4 h-4 text-violet-500" />{course.mode}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-violet-500" />{course.duration}h</span>
          <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-violet-500" />{course.language}</span>
        </div>
      </div>
      <div className="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-10 px-[6vw] py-10 min-[901px]:grid-cols-[1fr_340px]">
        <div>
          {highlights.length > 0 && <div className="mb-10"><Skills highlights={highlights} color={COLOR} bgColor={BG_COLOR} /></div>}
          {course.description && (
            <div className="mb-10">
              <p className={sectionTitle}>About This Course</p>
              <p className="m-0 text-[0.95rem] leading-[1.85] text-[#555]">{course.description}</p>
            </div>
          )}
          <div className="mb-10">
            <p className={sectionTitle}>Course Info</p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3.5">
              {[{ Icon: User, label: "Instructor", value: course.instructor }, { Icon: Globe, label: "Language", value: course.language }, { Icon: Clock, label: "Duration", value: `${course.duration} hours` }, { Icon: ModeIcon, label: "Mode", value: course.mode }].map(({ Icon, label, value }) => (
                <div key={label} className="rounded-[14px] border border-[#6c63ff]/10 bg-white p-[18px] shadow-[0_2px_12px_rgba(108,99,255,0.05)]">
                  <div className="mb-1.5 flex items-center gap-[7px]"><Icon className="h-[13px] w-[13px] text-[#6c63ff]" /><span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#999]">{label}</span></div>
                  <p className="m-0 text-sm font-bold text-[#1a1046]">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="sticky top-20 overflow-hidden rounded-[20px] border border-[#6c63ff]/15 bg-white shadow-[0_16px_48px_rgba(108,99,255,0.10)]">
          <div className="p-6">
            <p className="m-0 mb-1 text-[2rem] font-extrabold text-[#1a1046] [font-family:var(--secondaryFont,sans-serif)]">
              {course.price === 0 ? <span className="text-[#22c55e]">Free</span> : <span className="text-[#6c63ff]">{priceLabel}</span>}
            </p>
            
            <Link href={`/checkout/${course.id}`} className="mb-3 box-border flex w-full items-center justify-center gap-2 rounded-[14px] bg-[#6c63ff] p-[15px] text-[15px] font-bold text-white no-underline transition-[background,transform] duration-200 hover:-translate-y-px hover:bg-[#5b52e0] hover:text-white [font-family:var(--primaryFont,sans-serif)]">
              <ShoppingBag className="h-4 w-4" />{course.price === 0 ? "Enrol for Free" : "Buy Now"}
            </Link>
            {chapters.length > 0 && (
              <div className="mb-4 flex items-center gap-2 rounded-[10px] bg-[#f5f3ff] px-3 py-2.5">
                <BookOpen className="h-[13px] w-[13px] shrink-0 text-[#6c63ff]" />
                <span className="text-[12.5px] text-[#555]"><strong className="text-[#1a1046]">{chapters.length}</strong> chapters &middot; <strong className="text-[#1a1046]">{totalLessons}</strong> lessons</span>
              </div>
            )}
            <div className="mt-1 flex flex-col gap-2.5 border-t border-[#f0eeff] pt-[18px]">
              {[{ Icon: Clock, text: `${course.duration} hours of content` }, { Icon: ModeIcon, text: `${course.mode} mode` }, { Icon: Globe, text: `In ${course.language}` }, { Icon: User, text: `By ${course.instructor}` }].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5"><Icon className="h-3.5 w-3.5 shrink-0 text-[#6c63ff]" /><span className="text-[13px] text-[#666]">{text}</span></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {chapters.length > 0 && <div className="mx-auto max-w-[1100px] px-[6vw] pb-10"><Syllabus chapters={chapters} totalLessons={totalLessons} color={COLOR} bgColor={BG_COLOR} /></div>}
      {instructor && (
        <div className="mx-auto max-w-[1100px] px-[6vw] pb-[100px]">
          <div className="mb-6 border-b-2 pb-3.5" style={{ borderColor: `${COLOR}22` }}><p className={`${sectionTitle} m-0 border-none p-0`}>Meet Your Instructor</p></div>
          <InstructorProfile instructor={instructor} color={COLOR} bgColor="#ffffff" />
        </div>
      )}
      <div className="mx-auto max-w-[1100px] px-[6vw] pb-16 pt-4">
        <Link href="/courses/iit" className="inline-flex items-center gap-2 rounded-xl border border-[#6c63ff]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#6c63ff] shadow-sm hover:bg-[#f0eeff] transition-colors">
          <ArrowLeft className="w-4 h-4" />Back to Courses
        </Link>
      </div>
    </div>
  );
}
