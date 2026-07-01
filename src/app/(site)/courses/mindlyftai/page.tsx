import { dotnetFetch } from "@/lib/api/dotnet-client";
import type { Course } from "@/types/admin/course";
import CoursesHero from "@/components/site/courses/CoursesHero";
import WhyLearn from "@/components/site/courses/WhyLearn";
import CourseOutcomes from "@/components/site/courses/CourseOutcomes";
import LearningJourney from "@/components/site/courses/LearningJourney";
import StudentSuccessPath from "@/components/site/courses/StudentSuccessPath";
import CoursesGrid from "@/components/site/iit/CoursesGrid";

type CoursesEnvelope = {
  isSuccess: boolean;
  data: { courses: Course[] };
};

async function getCourses(): Promise<Course[]> {
  try {
    const envelope = await dotnetFetch<CoursesEnvelope>(
      "/v1/courses?status=ACTIVE&limit=200",
      { next: { revalidate: 300 } } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data?.courses ?? []) : [];
  } catch {
    return [];
  }
}

export default async function MindlyftAICoursesPage() {
  const all = await getCourses();
  const courses = all.filter(c => c.courseType !== "IIT");

  return (
    <div className="min-h-screen bg-white">
      <CoursesHero />
      <WhyLearn           bg="bg-white" />
      <div id="courses"><CoursesGrid courses={courses} bg="bg-violet-50" /></div>
      <CourseOutcomes     bg="bg-white" />
      <LearningJourney    bg="bg-violet-50" />
      <StudentSuccessPath bg="bg-white" />
    </div>
  );
}
