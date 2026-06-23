import { dotnetFetch } from "@/lib/api/dotnet-client";
import type { Webinar } from "@/types/admin/webinar";
import WorkshopsList from "./_components/WorkshopsList";

type Envelope = { isSuccess: boolean; data: Webinar[] };

async function getWorkshops(): Promise<Webinar[]> {
  try {
    const envelope = await dotnetFetch<Envelope>(
      "/v1/workshopWebinar?status=Active&type=Workshop",
      { cache: "no-store" } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data ?? []) : [];
  } catch {
    return [];
  }
}

export default async function WorkshopsPage() {
  const items = await getWorkshops();

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
            Workshops
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
            Hands-on Workshops
          </h1>
          <p className="text-white/80 text-lg">
            Practical, instructor-led sessions designed to sharpen real-world skills.
          </p>
          <p className="text-white/60 text-sm mt-2">
            {items.length} workshop{items.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      <WorkshopsList items={items} />
    </div>
  );
}
