import { notFound, permanentRedirect } from "next/navigation";
import { dotnetFetch, COURSE_DETAIL_REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import { isNumericId } from "@/lib/slug";
import type { Course } from "@/types/admin/course";

interface CourseEnvelope {
  isSuccess: boolean;
  data: Course;
}

async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const envelope = await dotnetFetch<CourseEnvelope>(
      `/v1/courses/slug/${encodeURIComponent(slug)}`,
      { next: { revalidate: COURSE_DETAIL_REVALIDATE_SECONDS } } as RequestInit,
    );
    return envelope.isSuccess ? envelope.data : null;
  } catch {
    return null;
  }
}

async function getCourseById(id: string): Promise<Course | null> {
  try {
    const envelope = await dotnetFetch<CourseEnvelope>(
      `/v1/courses/${id}`,
      { next: { revalidate: COURSE_DETAIL_REVALIDATE_SECONDS } } as RequestInit,
    );
    return envelope.isSuccess ? envelope.data : null;
  } catch {
    return null;
  }
}

// `/courses/[slug]` predates the IIT/MindlyftAI course split and is no
// longer linked to from anywhere in the app — every card now builds a
// branded URL directly. Kept only as a permanent redirect so old
// bookmarks/backlinks to this form still land on the real page, without
// duplicating the actual detail page's markup a third time.
export default async function CourseDetailRedirect({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let course = await getCourseBySlug(slug);
  if (!course && isNumericId(slug)) {
    course = await getCourseById(slug);
  }
  if (!course) notFound();

  permanentRedirect(
    course.courseType === "IIT" ? `/courses/iit/${course.slug}` : `/courses/mindlyftai/${course.slug}`,
  );
}
