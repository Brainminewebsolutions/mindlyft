import { getSession }   from "@/lib/auth/session";
import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import SiteNavbar       from "./SiteNavbar";

type CourseItem      = { id: string; name: string };
type CoursesEnvelope = { isSuccess: boolean; data: CourseItem[] };

async function getActiveCourses(): Promise<CourseItem[]> {
  try {
    const env = await dotnetFetch<CoursesEnvelope>(
      "/v1/courses/public",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    if (!env.isSuccess || !Array.isArray(env.data)) return [];
    return env.data.map(c => ({ id: c.id, name: c.name }));
  } catch {
    return [];
  }
}

export default async function NavbarWrapper({ height }: { height?: number }) {
  const [session, courses] = await Promise.all([getSession(), getActiveCourses()]);
  return <SiteNavbar user={session?.user ?? null} height={height} courses={courses} />;
}
