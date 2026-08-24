import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import type { Course } from "@/types/admin/course";
import type { Employee } from "@/types/admin/employee";
import IITHero from "@/components/site/iit/IITHero";
import IITCollaboration from "@/components/site/iit/IITCollaboration";
import IITEcosystem from "@/components/site/iit/IITEcosystem";
import IITAudience from "@/components/site/iit/IITAudience";
import IITJourney from "@/components/site/iit/IITJourney";
import IITOutcomes from "@/components/site/iit/IITOutcomes";
import IITCoursesGrid from "@/components/site/courses/IITCoursesGrid";
import InstructorList from "@/components/site/Instructor/InstructorList";

type CoursesEnvelope = {
  isSuccess: boolean;
  data: Course[];
};

type EmployeeEnvelope = {
  isSuccess: boolean;
  data: { employees: Employee[] };
};

async function getIITCourses(): Promise<Course[]> {
  try {
    const envelope = await dotnetFetch<CoursesEnvelope>(
      "/v1/courses/public?courseType=IIT",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data ?? []) : [];
  } catch {
    return [];
  }
}

async function getIITInstructors(): Promise<Employee[]> {
  try {
    const envelope = await dotnetFetch<EmployeeEnvelope>(
      "/v1/employees?status=ACTIVE&limit=200&category=IIT Instructor",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    if (!envelope.isSuccess) return [];
    return envelope.data?.employees ?? [];
  } catch {
    return [];
  }
}

export default async function IITPage() {
  const [courses, instructors] = await Promise.all([
    getIITCourses(),
    getIITInstructors(),
  ]);

  return (
    <div className="min-h-screen">
      <IITHero         bg="bg-white" />
      <IITCollaboration bg="bg-violet-50" />
      <IITEcosystem    bg="bg-white" />
      <IITCoursesGrid  bg="bg-violet-50" courses={courses} />
      <InstructorList
        instructors={instructors.map((e) => ({
          name:        e.name,
          avatar:      e.avatar ?? null,
          designation: e.designation ?? null,
          description: e.description ?? null,
        }))}
        title="IIT Instructor"
        color="#7c3aed"
        bgColor="#e8eaeb"
      />
      <IITAudience     bg="bg-white" />
      <IITJourney      bg="bg-violet-50" />
      <IITOutcomes     bg="bg-white" />
    </div>
  );
}
