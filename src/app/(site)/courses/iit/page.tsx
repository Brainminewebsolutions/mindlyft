import { dotnetFetch } from "@/lib/api/dotnet-client";
import type { Course } from "@/types/admin/course";
import IITHero from "@/components/site/iit/IITHero";
import IITCollaboration from "@/components/site/iit/IITCollaboration";
import IITEcosystem from "@/components/site/iit/IITEcosystem";
import IITAudience from "@/components/site/iit/IITAudience";
import IITJourney from "@/components/site/iit/IITJourney";
import IITOutcomes from "@/components/site/iit/IITOutcomes";
import IITCoursesGrid from "@/components/site/courses/IITCoursesGrid";

type CoursesEnvelope = {
  isSuccess: boolean;
  data: { courses: Course[] };
};

async function getIITCourses(): Promise<Course[]> {
  try {
    const envelope = await dotnetFetch<CoursesEnvelope>(
      "/v1/courses?status=ACTIVE&limit=200",
      { cache: "no-store" } as RequestInit,
    );
    const all = envelope.isSuccess ? (envelope.data?.courses ?? []) : [];
    return all.filter(c => c.courseType === "IIT");
  } catch {
    return [];
  }
}

export default async function IITCoursesPage() {
  const courses = await getIITCourses();

  return (
    <div className="min-h-screen">
      <IITHero         bg="bg-white" />
      <IITCollaboration bg="bg-violet-50" />
      <IITEcosystem    bg="bg-white" />
      <IITCoursesGrid  courses={courses} bg="bg-violet-50" />
      <IITAudience     bg="bg-white" />
      <IITJourney      bg="bg-violet-50" />
      <IITOutcomes     bg="bg-white" />
    </div>
  );
}
