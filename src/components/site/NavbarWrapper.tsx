import { getSession }   from "@/lib/auth/session";
import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import SiteNavbar       from "./SiteNavbar";

type CourseItem      = { id: string; name: string };
type CoursesEnvelope = { isSuccess: boolean; data: { courses: CourseItem[] } };

async function getActiveCourses(): Promise<CourseItem[]> {
  try {
    const env = await dotnetFetch<CoursesEnvelope>(
      "/v1/courses?status=ACTIVE",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    if (!env.isSuccess || !Array.isArray(env.data?.courses)) return [];
    return env.data.courses.map(c => ({ id: c.id, name: c.name }));
  } catch {
    return [];
  }
}

export default async function NavbarWrapper({ height }: { height?: number }) {
  const [session, courses] = await Promise.all([getSession(), getActiveCourses()]);
  return <SiteNavbar user={session?.user ?? null} height={height} courses={courses} />;
}
