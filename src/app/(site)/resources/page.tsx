import Image from "next/image";
import Link from "next/link";
import {
  GraduationCap, ArrowRight, Newspaper, Globe, Lightbulb,
} from "lucide-react";
import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import ResourcesClient, { type ResourceItem } from "./_components/ResourcesClient";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80";

const QUICK_LINKS = [
  { icon: GraduationCap, label: "Explore Courses",    href: "/courses",   color: "text-violet-600 bg-violet-50" },
  { icon: Globe,         label: "Upcoming Webinars",  href: "/webinars",  color: "text-blue-600 bg-blue-50"    },
  { icon: Lightbulb,     label: "Workshops",          href: "/ai-workshops", color: "text-indigo-600 bg-indigo-50" },
  { icon: Newspaper,     label: "Blog & Insights",    href: "/blogs",     color: "text-violet-600 bg-violet-50" },
];

type ApiResource = {
  id:           number;
  name:         string;
  description:  string | null;
  image:        string | null;
  type:         "File" | "Link";
  displayOrder: number;
  status:       string;
  url:          string | null;
};

type ResourcesEnvelope = { isSuccess: boolean; data: ApiResource[] };

async function getActiveResources(): Promise<ResourceItem[]> {
  try {
    const envelope = await dotnetFetch<ResourcesEnvelope>(
      "/v1/resources?status=Active",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    if (!envelope.isSuccess || !Array.isArray(envelope.data)) return [];
    return envelope.data.map((r) => ({
      id:          r.id,
      name:        r.name,
      description: r.description,
      image:       r.image,
      type:        r.type,
      url:         r.url,
    }));
  } catch {
    return [];
  }
}

export default async function ResourcesPage() {
  const resources = await getActiveResources();

  return (
    <div className="min-h-screen bg-[#f9f8ff]">

      {/* ── Hero ── */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-screen overflow-hidden">
        <Image
          src={HERO_IMAGE}
          alt="Resources"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/75 via-violet-900/35 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 px-6 pb-6">
            <div className="bg-gradient-to-r from-violet-600/85 to-blue-600/85 backdrop-blur-sm px-4 py-3 rounded-2xl">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                style={{ color: "#ffffff", textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}
              >
                Learning Resources
              </h1>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-8 py-6 rounded-2xl md:max-w-sm">
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Free guides, cheatsheets, tools, and career resources to accelerate your AI journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick links ── */}
      <div className="max-w-[1100px] mx-auto px-[6vw] py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {QUICK_LINKS.map(({ icon: Icon, label, href, color }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-5 py-4 bg-white rounded-2xl border border-violet-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="w-4 h-4" />
              </span>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-violet-700 transition-colors">
                {label}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-300 ml-auto group-hover:text-violet-500 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* ── Resources ── */}
      <ResourcesClient resources={resources} />

      {/* ── CTA banner ── */}
      <div className="mx-[6vw] mb-20 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-500" />
        <div className="relative z-10 px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: "#ffffff" }}
            >
              Ready to take the next step?
            </h2>
            <p className="text-white/80 text-base">
              Join thousands of learners building AI careers with MindlyftAI.
            </p>
          </div>
          <Link
            href="/courses"
            className="shrink-0 flex items-center gap-2 bg-white text-violet-700 font-bold px-7 py-3.5 rounded-2xl hover:bg-violet-50 transition-colors shadow-lg"
          >
            Explore Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
