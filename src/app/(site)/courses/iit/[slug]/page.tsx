import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { dotnetFetch, COURSE_DETAIL_REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import { toUploadUrl } from "@/lib/api/image-url";
import { isNumericId } from "@/lib/slug";
import type { Course } from "@/types/admin/course";
import type { CourseChapterItem } from "@/types/student/course";
import IITCourseDetail from "@/components/site/courses/iit/IITCourseDetail";
import MindlyftCourseDetail from "@/components/site/courses/mindlyftai/MindlyftCourseDetail";

interface CourseEnvelope { isSuccess: boolean; data: Course; }
interface ChaptersEnvelope { isSuccess: boolean; data: CourseChapterItem[]; }

async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const envelope = await dotnetFetch<CourseEnvelope>(`/v1/courses/slug/${encodeURIComponent(slug)}`, { next: { revalidate: COURSE_DETAIL_REVALIDATE_SECONDS } } as RequestInit);
    return envelope.isSuccess ? envelope.data : null;
  } catch { return null; }
}

async function getCourseById(id: string): Promise<Course | null> {
  try {
    const envelope = await dotnetFetch<CourseEnvelope>(`/v1/courses/${id}`, { next: { revalidate: COURSE_DETAIL_REVALIDATE_SECONDS } } as RequestInit);
    return envelope.isSuccess ? envelope.data : null;
  } catch { return null; }
}

async function getChapters(id: string): Promise<CourseChapterItem[]> {
  try {
    const envelope = await dotnetFetch<ChaptersEnvelope>(`/v1/courses/${id}/chapters-with-contents`, { next: { revalidate: COURSE_DETAIL_REVALIDATE_SECONDS } } as RequestInit);
    return envelope.isSuccess ? (envelope.data ?? []) : [];
  } catch { return []; }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return {};

  const title       = course.metaTitle ? { absolute: course.metaTitle } : course.name;
  const description = course.metaDescription ?? course.description ?? undefined;
  const canonical   = course.courseType === "IIT" ? `/courses/iit/${course.slug}` : `/courses/mindlyftai/${course.slug}`;
  // Link previews (WhatsApp, LinkedIn, X…) show the course image, or the logo when it has none.
  const shareImage  = toUploadUrl(course.image) ?? "/MINDLYF_LOGO_new.png";

  return {
    title,
    description,
    alternates:  { canonical },
    openGraph:   { type: "website", url: canonical, siteName: "MindLyft AI", title, description, images: [{ url: shareImage, alt: course.name }] },
    twitter:     { card: "summary_large_image", title, description, images: [shareImage] },
  };
}

export default async function IITCourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course && isNumericId(slug)) {
    const byId = await getCourseById(slug);
    if (byId) redirect(`/courses/iit/${byId.slug}`);
  }
  if (!course) notFound();
  const rawChapters = await getChapters(course.id);

  const chapters = rawChapters.slice().sort((a, b) => a.order - b.order).map((ch) => ({ ...ch, contents: ch.contents.slice().sort((a, b) => a.order - b.order) }));
  const proxiedImage = toUploadUrl(course.image);

  // The design follows the course type, whichever of the two routes it was opened on.
  return course.courseType === "IIT"
    ? <IITCourseDetail course={course} chapters={chapters} proxiedImage={proxiedImage} />
    : <MindlyftCourseDetail course={course} chapters={chapters} proxiedImage={proxiedImage} />;
}
