import { dotnetFetch } from "@/lib/api/dotnet-client";
import type { Course } from "@/types/admin/course";
import CoursesCardClient from "./CoursesCardClient";

interface CoursesEnvelope {
  isSuccess: boolean;
  data: { courses: Course[] };
}

async function fetchCoursesByStatus(status: string): Promise<Course[]> {
  try {
    const envelope = await dotnetFetch<CoursesEnvelope>(
      `/v1/courses?status=${status}`,
      { next: { revalidate: 300 } } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data?.courses ?? []) : [];
  } catch {
    return [];
  }
}

async function getPublicCourses(): Promise<Course[]> {
  const [active, upcoming] = await Promise.all([
    fetchCoursesByStatus("ACTIVE"),
    fetchCoursesByStatus("UPCOMING"),
  ]);
  return [...active, ...upcoming]
    .filter((c) => c.courseType === "Mindlyftai")
    .sort((a, b) => a.displayOrder - b.displayOrder);
}

export default async function CoursesCard() {
  const courses = await getPublicCourses();
  return <CoursesCardClient courses={courses} />;
}
