import { dotnetFetch } from "@/lib/api/dotnet-client";
import type { Course } from "@/types/admin/course";
import CoursesCardClient from "./CoursesCardClient";

interface CoursesEnvelope {
  isSuccess: boolean;
  data: { courses: Course[] };
}

async function getPublicCourses(): Promise<Course[]> {
  try {
    const envelope = await dotnetFetch<CoursesEnvelope>(
      "/v1/courses?status=ACTIVE",
      { cache: "no-store" } as RequestInit,
    );
    const all = envelope.isSuccess ? (envelope.data?.courses ?? []) : [];
    return all.filter((c) => c.courseType === "Mindlyftai");
  } catch {
    return [];
  }
}

export default async function CoursesCard() {
  const courses = await getPublicCourses();
  return <CoursesCardClient courses={courses} />;
}
