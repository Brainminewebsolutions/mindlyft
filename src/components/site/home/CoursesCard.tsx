import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import type { Course } from "@/types/admin/course";
import CoursesCardClient from "./CoursesCardClient";

interface CoursesEnvelope {
  isSuccess: boolean;
  data: Course[];
}

async function getPublicCourses(): Promise<Course[]> {
  try {
    const envelope = await dotnetFetch<CoursesEnvelope>(
      "/v1/courses/public?courseType=Mindlyftai",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data ?? []) : [];
  } catch {
    return [];
  }
}

export default async function CoursesCard() {
  const courses = await getPublicCourses();
  // Only the cards that are displayed go to the client; the total feeds the "N programs" line.
  return <CoursesCardClient courses={courses.slice(0, 6)} total={courses.length} />;
}
