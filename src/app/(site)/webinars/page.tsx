import { dotnetFetch } from "@/lib/api/dotnet-client";
import type { Webinar } from "@/types/admin/webinar";
import WebinarsList from "./_components/WebinarsList";

type Envelope = { isSuccess: boolean; data: Webinar[] };

async function getWebinars(): Promise<Webinar[]> {
  try {
    const envelope = await dotnetFetch<Envelope>(
      "/v1/workshopWebinar?status=Active&type=Webinar",
      { next: { revalidate: 300 } } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data ?? []) : [];
  } catch {
    return [];
  }
}

export default async function WebinarsPage() {
  const items = await getWebinars();

  return (
    <div className="min-h-screen bg-[#f9f8ff]">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-500 to-violet-500 pt-28 pb-14 px-6 text-center">
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
            Webinars
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-3">
            Live Online Webinars
          </h1>
          <p className="text-white/80 text-lg">
            Join thought leaders and domain experts — live sessions from anywhere.
          </p>
          <p className="text-white/60 text-sm mt-2">
            {items.length} webinar{items.length !== 1 ? "s" : ""} available
          </p>
        </div>
      </div>

      <WebinarsList items={items} />
    </div>
  );
}
