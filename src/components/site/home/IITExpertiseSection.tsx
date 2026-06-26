import { dotnetFetch } from "@/lib/api/dotnet-client";
import type { CourseCategory } from "@/types/admin/courseCategory";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { SITE_CONFIG } from "@/constants/siteConfig";
import CourseCategorySection from "@/components/site/home/CourseCategory";

interface CategoriesEnvelope {
  isSuccess: boolean;
  data: CourseCategory[];
}

async function getCourseCategories(): Promise<CourseCategory[]> {
  try {
    const envelope = await dotnetFetch<CategoriesEnvelope>(
      "/v1/course-categories?status=Active",
      { cache: "no-store" } as RequestInit,
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

          <h2 className="text-lg sm:text-5xl font-bold leading-tight tracking-tight text-gray-900">
            Strategic collaboration with{" "}
            <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
              C3iHub, IIT Kanpur
            </span>
          </h2>

          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-xl">
            Industry-leading courses developed in collaboration with IIT experts — designed to take you from fundamentals to mastery.
          </p>

          <div className="flex items-center justify-center gap-10 flex-wrap">
            <div className="flex flex-col items-center shrink-0">
              <div className="flex items-center justify-center w-48 h-40">
                <img src={SITE_CONFIG?.logo1 ?? "/logo.png"} alt="MindLyft AI" className="object-contain w-full h-full" />
              </div>
              <p className="text-xl font-semibold text-gray-800">MindLyft AI</p>
            </div>

            <span className="text-3xl font-light text-gray-300 select-none shrink-0">×</span>

            <div className="flex flex-col items-center shrink-0">
              <div className="flex items-center justify-center w-48 h-40">
                <img src="/C3ihub.jpeg" alt="C3iHub IIT Kanpur" className="object-contain w-full h-full" />
              </div>
              <p className="text-xl font-semibold text-gray-800">C3iHub IIT Kanpur</p>
            </div>
          </div>

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
