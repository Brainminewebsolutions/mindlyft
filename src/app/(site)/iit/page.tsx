import { dotnetFetch } from "@/lib/api/dotnet-client";
import type { Course } from "@/types/admin/course";
import IITCoursesGrid from "./_components/IITCoursesGrid";

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

export default async function IITPage() {
  const courses = await getIITCourses();

  return (
    <div className="min-h-screen bg-[#f9f8ff]">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-500 to-blue-500 pt-28 pb-14 px-6 text-center">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 60%, white 1px, transparent 1px), radial-gradient(circle at 75% 40%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="relative max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2 rounded-full ring-1 ring-white/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            IIT Programs
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
            World-Class IIT Education
          </h1>
          <p className="text-white/80 text-lg">
            Premium programs developed in collaboration with IIT faculty and industry experts.
          </p>
          <p className="text-white/60 text-sm mt-2">
            {courses.length} program{courses.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      {/* ── Grid ── */}
      <IITCoursesGrid courses={courses} />

    </div>
  );
}
