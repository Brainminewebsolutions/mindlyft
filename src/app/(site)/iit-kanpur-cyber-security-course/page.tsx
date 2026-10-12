import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck } from "lucide-react";
import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import type { Course } from "@/types/admin/course";
import type { Employee } from "@/types/admin/employee";
import { AnimateIn } from "@/components/ui/AnimateIn";
import IITHero from "@/components/site/iit/IITHero";
import IITCollaboration from "@/components/site/iit/IITCollaboration";
import IITEcosystem from "@/components/site/iit/IITEcosystem";
import IITProgrammes from "@/components/site/iit/IITProgrammes";
import IITAudience from "@/components/site/iit/IITAudience";
import IITJourney from "@/components/site/iit/IITJourney";
import IITOutcomes from "@/components/site/iit/IITOutcomes";
import { IIT_FAQS } from "@/components/site/iit/content";
import IITCoursesGrid from "@/components/site/courses/IITCoursesGrid";
import CoursesFaq from "@/components/site/courses/landing/CoursesFaq";
import InstructorList from "@/components/site/Instructor/InstructorList";

export const metadata: Metadata = {
  title: { absolute: "IIT Kanpur Cyber Security Course in Pune | C3iHub Certified" },
  description:
    "Cyber security and AI programs in Pune delivered with C3iHub, IIT Kanpur. Five tracks from beginner to advanced, with a joint IIT Kanpur certification.",
  alternates: { canonical: "/iit-kanpur-cyber-security-course" },
};

const CTA_CLASS =
  "inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all";

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

      {/* About the collaboration */}
      <section className="bg-white px-6 md:px-[60px] py-20">
        <AnimateIn direction="up">
          <div className="max-w-4xl mx-auto text-center md:text-left">
            <div className="space-y-4 text-base sm:text-lg text-gray-600 leading-relaxed mb-8">
              <p>
                MindLyft AI runs these programmes in collaboration with C3iHub, the cybersecurity
                technology innovation hub at IIT Kanpur, established under India&apos;s National Mission
                on Interdisciplinary Cyber-Physical Systems. The instructors are C3iHub&apos;s own —
                people who have delivered training for government departments, defence and public sector
                organisations, and who work on live security engagements. On completion you receive a
                certificate issued jointly by MindLyft AI and C3iHub, IIT Kanpur.
              </p>
              <p>
                Five programmes, from a non-technical starting point through to advanced practitioner
                level. All of them are taught from our Akurdi campus in Pimpri-Chinchwad, with online and
                hybrid options depending on the track.
              </p>
            </div>
            <Link href="/contact" className={CTA_CLASS}>
              <CalendarCheck className="h-4 w-4" /> Book a free counselling call
            </Link>
          </div>
        </AnimateIn>
      </section>

      <IITCollaboration bg="bg-violet-50" />
      <IITEcosystem    bg="bg-white" />

      <IITProgrammes   bg="bg-violet-50" />
      <IITCoursesGrid  bg="bg-violet-50" courses={courses} />

      <IITAudience     bg="bg-white" />
      <IITJourney      bg="bg-violet-50" />
      <IITOutcomes     bg="bg-white" />

      <InstructorList
        instructors={instructors.map((e) => ({
          name:        e.name,
          avatar:      e.avatar ?? null,
          designation: e.designation ?? null,
          description: e.description ?? null,
        }))}
        title="Your instructors"
        subtitle="The cybersecurity faculty are drawn from C3iHub at IIT Kanpur: instructors, forensic analysts and programme managers who have delivered training across government, defence and public sector organisations, and who work on live security engagements."
        altSuffix="cyber security instructor, C3iHub IIT Kanpur"
        color="#7c3aed"
        bgColor="#e8eaeb"
        centered
      />

      <CoursesFaq bg="bg-violet-50" heading="Common questions" faqs={IIT_FAQS} centered />

      {/* Final CTA */}
      <section className="bg-white px-6 md:px-[60px] py-20">
        <AnimateIn direction="zoom">
          <div className="max-w-5xl mx-auto rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-8 sm:p-12 text-center shadow-sm">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Talk to a counsellor before you choose
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600 leading-relaxed mb-8">
              Five programmes at five price points is a genuinely difficult choice to make from a web
              page. A short call will place you correctly, and there is no cost or obligation.
            </p>
            <Link href="/contact" className={CTA_CLASS}>
              <CalendarCheck className="h-4 w-4" /> Book a free counselling call
            </Link>
          </div>
        </AnimateIn>
      </section>
    </div>
  );
}
