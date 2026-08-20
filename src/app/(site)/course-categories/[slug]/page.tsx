import { notFound, redirect } from "next/navigation";
import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import { isNumericId } from "@/lib/slug";
import CourseCategoryHero from "@/components/site/course-categories/CourseCategoryHero";
import type { CourseCategory } from "@/types/admin/courseCategory";
import type { Course } from "@/types/admin/course";
import type { Employee } from "@/types/admin/employee";
import IITCoursesGrid from "@/components/site/courses/IITCoursesGrid";
import InstructorList from "@/components/site/Instructor/InstructorList";

interface CategoryEnvelope {
  isSuccess: boolean;
  data: CourseCategory;
}

interface CoursesEnvelope {
  isSuccess: boolean;
  data: { courses: Course[] };
}

interface EmployeeEnvelope {
  isSuccess: boolean;
  data: { employees: Employee[] };
}

async function getCategoryBySlug(slug: string): Promise<CourseCategory | null> {
  try {
    const envelope = await dotnetFetch<CategoryEnvelope>(
      `/v1/course-categories/slug/${encodeURIComponent(slug)}`,
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    return envelope.isSuccess ? envelope.data : null;
  } catch {
    return null;
  }
}

async function getCategoryById(id: string): Promise<CourseCategory | null> {
  try {
    const envelope = await dotnetFetch<CategoryEnvelope>(
      `/v1/course-categories/${id}`,
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    return envelope.isSuccess ? envelope.data : null;
  } catch {
    return null;
  }
}

async function getCoursesByCategory(categoryName: string): Promise<Course[]> {
  try {
    const envelope = await dotnetFetch<CoursesEnvelope>(
      `/v1/courses?status=ACTIVE&limit=200`,
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    const all = envelope.isSuccess ? (envelope.data?.courses ?? []) : [];
    return all.filter(c => c.category?.toLowerCase() === categoryName.toLowerCase());
  } catch {
    return [];
  }
}

async function getInstructors(): Promise<Employee[]> {
  try {
    const envelope = await dotnetFetch<EmployeeEnvelope>(
      `/v1/employees?status=ACTIVE&limit=200&category=IIT Instructor`,
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    if (!envelope.isSuccess) return [];
    return (envelope.data?.employees ?? []);
    
  } catch {
    return [];
  }
}

export default async function CourseCategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const [category, instructors] = await Promise.all([
    getCategoryBySlug(slug),
    getInstructors(),
  ]);

  if (!category && isNumericId(slug)) {
    const byId = await getCategoryById(slug);
    if (byId) redirect(`/course-categories/${byId.slug}`);
  }

  if (!category) notFound();

  const courses = await getCoursesByCategory(category.name);

  return (
    <div className="min-h-screen bg-white">

      {/* ── Hero ── */}
      <CourseCategoryHero
        name={category.name}
        description={category.description}
        image={category.image}
      />

      {/* ── Courses ── */}
      <IITCoursesGrid courses={courses} bg="bg-white" />

      {/* ── Instructors ── */}
      <InstructorList
        instructors={instructors.map((e) => ({
          name:        e.name,
          avatar:      e.avatar ?? null,
          designation: e.designation ?? null,
          description: e.description ?? null,
        }))}
        color="#7c3aed"
        bgColor="#f5f3ff"
      />

    </div>
  );
}
