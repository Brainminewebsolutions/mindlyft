import { dotnetFetch } from "@/lib/api/dotnet-client";
import type { CourseCategory } from "@/types/admin/courseCategory";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Subheading } from "@/components/ui/Subheading";
import CollaborationLogos from "@/components/site/CollaborationLogos";
import CourseCategorySection from "@/components/site/home/CourseCategory";

interface CategoriesEnvelope {
  isSuccess: boolean;
  data: CourseCategory[];
}

async function getCourseCategories(): Promise<CourseCategory[]> {
  try {
    const envelope = await dotnetFetch<CategoriesEnvelope>(
      "/v1/course-categories?status=Active",
      { next: { revalidate: 300 } } as RequestInit,
    );
    const raw = envelope.isSuccess ? (envelope.data ?? []) : [];
    return Array.isArray(raw) ? raw : [];
  } catch {
    return [];
  }
}

export default async function IITExpertiseSection() {
  const categories = await getCourseCategories();

  return (
    <>
      {/* ── IIT Collaboration Intro ── */}
      <div className="h-screen bg-white flex items-center justify-center px-6 sm:px-10 lg:px-20 overflow-hidden">
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center gap-5 text-center">

          <SectionBadge variant="dark">Powered by Research. Backed by Innovation.</SectionBadge>

          <Subheading
            centered
            className="leading-tight tracking-tight"
            text="Strategic collaboration with"
            highlight="C3iHub, IIT Kanpur"
            highlightClassName="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text !text-transparent"
          />

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
            Industry-leading courses developed in collaboration with IIT experts — designed to take you from fundamentals to mastery.
          </p>

          <CollaborationLogos size="lg" showLabels className="justify-center" />

          <p className="text-gray-400 text-sm leading-relaxed max-w-xs mx-auto">
            Elevate your credentials with industry-recognised programs engineered at the forefront of technology.
          </p>
        </div>
      </div>

      {/* ── Stacking category cards ── */}
      <CourseCategorySection categories={categories} />
    </>
  );
}
