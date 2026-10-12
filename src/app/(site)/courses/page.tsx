import type { Metadata } from "next";
import Link from "next/link";
import { BadgeIndianRupee, CreditCard, Percent } from "lucide-react";
import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import type { Course } from "@/types/admin/course";
import CoursesGrid from "@/components/site/iit/CoursesGrid";
import WhyLearn from "@/components/site/courses/WhyLearn";
import CourseOutcomes from "@/components/site/courses/CourseOutcomes";
import LearningJourney from "@/components/site/courses/LearningJourney";
import StudentSuccessPath from "@/components/site/courses/StudentSuccessPath";
import CoursesLandingHero from "@/components/site/courses/landing/CoursesLandingHero";
import InfoSection, { SectionHeader } from "@/components/site/courses/landing/InfoSection";
import CoursesFaq from "@/components/site/courses/landing/CoursesFaq";
import CoursesCta from "@/components/site/courses/landing/CoursesCta";
import {
  SPECIALISATIONS, AUDIENCES, FORMATS, INCLUDES, PLACEMENT, ENROL_STEPS,
} from "@/components/site/courses/landing/content";

export const metadata: Metadata = {
  title: { absolute: "AI Courses in Pune | Certification Programs — MindLyft AI" },
  description:
    "AI courses in Pune — Generative AI, Agentic AI, Data Analytics and Cybersecurity. IIT Kanpur certification, live projects, placement support. Book a demo.",
  keywords: [
    "AI courses in Pune",
    "AI certification courses in Pune",
    "Gen AI course in Pune",
    "Agentic AI course in Pune",
    "Data Analytics courses in Pune",
    "cyber security course in Pune",
    "AI course fees in Pune",
  ],
  alternates: { canonical: "/courses" },
};

const FEE_POINTS = [
  { icon: BadgeIndianRupee, title: "From ₹45,000",        desc: "Full program cost, published openly on every course page." },
  { icon: CreditCard,       title: "No-cost EMI",         desc: "Available across all programs." },
  { icon: Percent,          title: "Early & group offers", desc: "Discounts on selected batches — ask a counsellor what is running." },
];

type CoursesEnvelope = {
  isSuccess: boolean;
  data: Course[];
};

async function getCourses(): Promise<Course[]> {
  try {
    const envelope = await dotnetFetch<CoursesEnvelope>(
      "/v1/courses/public?courseType=Mindlyftai",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data ?? []) : [];
  } catch {
    return [];
  }
}

export default async function CoursesPage() {
  const courses = await getCourses();

  return (
    <div className="min-h-screen bg-white">

      <CoursesLandingHero />
      <WhyLearn bg="bg-white" />

      <InfoSection
        bg="bg-violet-50"
        badge="Specialisations"
        heading="Browse AI Courses by Specialisation"
        intro={<p>Not sure where to start? Pick the track that matches where you want to end up.</p>}
        items={SPECIALISATIONS}
        columns={3}
      />

      <section id="courses" className="bg-white scroll-mt-24">
        <div className="px-6 md:px-[60px] pt-20">
          <div className="max-w-6xl mx-auto">
            <SectionHeader
              badge="Explore Our Courses"
              heading="All AI Certification Courses in Pune"
              intro={<p>Offline, online and hybrid formats. Fees from ₹45,000.</p>}
              centered
            />
          </div>
        </div>
        <CoursesGrid courses={courses} bg="bg-white" showBadge={false} />
      </section>

      <CourseOutcomes     bg="bg-violet-50" />
      <LearningJourney    bg="bg-white" />
      <StudentSuccessPath bg="bg-violet-50" />

      <InfoSection
        bg="bg-white"
        badge="Find Your Fit"
        heading="Which AI Course in Pune Is Right for You?"
        items={AUDIENCES}
        columns={4}
      />

      <InfoSection
        bg="bg-violet-50"
        badge="Learning Formats"
        heading="Online, Offline and Hybrid Batches in Pune"
        items={FORMATS}
        columns={2}
      />

      <InfoSection
        bg="bg-white"
        badge="Included"
        heading="What Every MindLyft AI Course Includes"
        items={INCLUDES}
        columns={4}
      />

      <InfoSection
        bg="bg-violet-50"
        badge="Placement Support"
        heading="Placement Assistance with Every Course"
        intro={<p>Placement support is not a paid add-on. It is included in every program and it starts before you finish.</p>}
        items={PLACEMENT}
        columns={3}
      />

      {/* Fees */}
      <section id="fees" className="bg-white px-6 md:px-[60px] py-20 scroll-mt-24">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Fees & EMI"
            heading="Course Fees, EMI Options and Scholarships"
            centered
          />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-3 text-base text-gray-600 leading-relaxed text-center md:text-left">
            <p>
              Our programs start from ₹45,000, with cost varying by duration and specialisation. We publish
              AI course fees in Pune openly on every course page rather than holding them behind an enquiry
              form, so you can compare properly before you speak to anyone.
            </p>
            <p>
              No-cost EMI is available across all programs. Early-enrolment and group discounts apply to
              selected batches — <Link href="/contact" className="font-semibold text-violet-600 hover:underline">ask a counsellor</Link> what
              is currently running.
            </p>
          </div>
          <div className="grid gap-4">
            {FEE_POINTS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="flex items-start gap-4 rounded-2xl border border-violet-100 bg-white p-5 shadow-sm">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 text-white">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-base font-bold text-gray-900">{title}</p>
                  <p className="text-sm text-gray-600">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          </div>
        </div>
      </section>

      <InfoSection
        bg="bg-violet-50"
        badge="Admissions"
        heading="How to Enrol in an AI Course at MindLyft AI"
        items={ENROL_STEPS}
        columns={4}
        numbered
      />

      <CoursesFaq bg="bg-white" centered />

      <CoursesCta />

    </div>
  );
}
