import Link from "next/link";
import { ArrowRight, Trophy } from "lucide-react";
import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import EventsClient, { type EventItem } from "./_components/EventsClient";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80";

const STATS = [
  { value: "50+",   label: "Events Hosted"  },
  { value: "10K+",  label: "Attendees"       },
  { value: "30+",   label: "Cities Covered"  },
  { value: "200+",  label: "Expert Speakers" },
];

type ApiOurJourneyMedia = {
  id:   string;
  url:  string;
  type: "Image" | "Video";
};

type ApiOurJourney = {
  id:          string;
  name:        string;
  description: string | null;
  date:        string;
  timeSlot:    string | null;
  address:     string | null;
  attendees:   string | null;
  mainImage:   string | null;
  media:       ApiOurJourneyMedia[];
};

type OurJourneyEnvelope = { isSuccess: boolean; data: ApiOurJourney[] };

function formatLongDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
}

async function getEvents(): Promise<EventItem[]> {
  try {
    // API already returns newest-first (ordered by Date desc).
    const envelope = await dotnetFetch<OurJourneyEnvelope>(
      "/v1/our-journey?type=Event&status=Active",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    if (!envelope.isSuccess || !Array.isArray(envelope.data)) return [];
    return envelope.data.map((j) => ({
      id:          j.id,
      title:       j.name,
      date:        formatLongDate(j.date),
      time:        j.timeSlot,
      location:    j.address,
      description: j.description,
      attendees:   j.attendees,
      image:       j.mainImage,
      media:       j.media.map((m) => ({ id: m.id, url: m.url, type: m.type })),
    }));
  } catch {
    return [];
  }
}

export default async function EventsPage() {
  const events = await getEvents();

  return (
    <div className="min-h-screen bg-[#f9f8ff]">

      {/* ── Hero ── */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-screen overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="MindlyftAI Events"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/75 via-violet-900/35 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 px-6 pb-6">
            <div className="bg-gradient-to-r from-violet-600/85 to-blue-600/85 backdrop-blur-sm px-4 py-3 rounded-2xl">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                style={{ color: "#ffffff", textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}
              >
                Our Events
              </h1>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-8 py-6 rounded-2xl md:max-w-sm">
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Every event we've hosted has been a milestone — bringing learners, experts, and innovators together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="max-w-[1100px] mx-auto px-[6vw] py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6 text-center">
              <p className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="text-sm text-gray-500 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-[6vw] pb-20">

        {/* ── Section label ── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold" style={{ color: "#1a1046" }}>Past Events</h2>
          <div className="flex-1 h-px bg-violet-100 ml-2" />
        </div>

        <EventsClient events={events} />
      </div>

      {/* ── CTA banner ── */}
      <div className="mx-[6vw] mb-20 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-500" />
        <div className="relative z-10 px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#ffffff" }}>
              Want to be part of our next event?
            </h2>
            <p className="text-white/80 text-base">Follow our journey and never miss a MindlyftAI event.</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 flex items-center gap-2 bg-white text-violet-700 font-bold px-7 py-3.5 rounded-2xl hover:bg-violet-50 transition-colors shadow-lg"
          >
            Get In Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
