import { dotnetFetch } from "@/lib/api/dotnet-client";
import type { Course } from "@/types/admin/course";
import ServiceStack from "@/components/site/home/ServiceStack";

interface CoursesEnvelope {
  isSuccess: boolean;
  data: { courses: Course[] };
}

async function getIITCourses(): Promise<Course[]> {
  try {
    const envelope = await dotnetFetch<CoursesEnvelope>(
      "/v1/courses?status=ACTIVE&courseType=IIT&limit=8",
      { cache: "no-store" } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data?.courses ?? []) : [];
  } catch {
    return [];
  }
}

export default async function IITExpertiseSection() {
  const courses = await getIITCourses();
  return <ServiceStack iitCourses={courses} />;
}
