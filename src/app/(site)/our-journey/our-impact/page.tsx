import Link from "next/link";
import { Users, BookOpen, Globe, TrendingUp, Award, Heart, ArrowRight } from "lucide-react";
import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import MilestonesTimeline, { type Milestone } from "./_components/MilestonesTimeline";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80";

const STATS = [
  { icon: Users,      value: "500+",  label: "Students Enrolled",    color: "from-violet-600 to-violet-400" },
  { icon: BookOpen,   value: "10",    label: "Courses Delivered",    color: "from-blue-600 to-blue-400"    },
  { icon: Globe,      value: "5+",    label: "Cities Reached",       color: "from-indigo-600 to-blue-500"  },
  { icon: TrendingUp, value: "85%",   label: "Placement Rate",       color: "from-violet-500 to-blue-600"  },
  { icon: Award,      value: "10+",   label: "Industry Awards",      color: "from-blue-500 to-violet-500"  },
  { icon: Heart,      value: "95%",   label: "Learner Satisfaction", color: "from-violet-600 to-blue-500"  },
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
  media:       ApiOurJourneyMedia[];
};

type OurJourneyEnvelope = { isSuccess: boolean; data: ApiOurJourney[] };

function formatMonthYear(dateStr: string): string {
  const d = new Date(dateStr);
  if (Number.isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

async function getMilestones(): Promise<Milestone[]> {
  try {
    const envelope = await dotnetFetch<OurJourneyEnvelope>(
      "/v1/our-journey?type=OurImpact&status=Active",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    if (!envelope.isSuccess || !Array.isArray(envelope.data)) return [];
    // API returns newest-first; a growth timeline reads best oldest-to-newest.
    return envelope.data
      .slice()
      .reverse()
      .map((j) => ({
        id:    j.id,
        label: formatMonthYear(j.date),
        title: j.name,
        desc:  j.description,
        media: j.media.map((m) => ({ id: m.id, url: m.url, type: m.type })),
      }));
  } catch {
    return [];
  }
}

export default async function OurImpactPage() {
  const milestones = await getMilestones();

  return (
    <div className="min-h-screen bg-[#f9f8ff]">

      {/* ── Hero ── */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-screen overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Our Impact"
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
                Our Impact
              </h1>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-8 py-6 rounded-2xl md:max-w-sm">
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Every number represents a life changed, a career launched, and a future built with AI.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="max-w-[1100px] mx-auto px-[6vw] py-8">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {STATS.map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="bg-white rounded-xl border border-violet-100 shadow-sm px-3 py-3 flex flex-col items-center text-center">
              <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-2`}>
                <Icon className="w-3.5 h-3.5 text-white" />
              </div>
              <p className="text-lg font-extrabold bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent leading-none mb-0.5">
                {value}
              </p>
              <p className="text-[10px] text-gray-500 font-medium leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Milestones timeline ── */}
      {milestones.length > 0 && (
        <div className="max-w-[1100px] mx-auto px-[6vw] pb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shrink-0">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold" style={{ color: "#1a1046" }}>Our Journey So Far</h2>
            <div className="flex-1 h-px bg-violet-100 ml-2" />
          </div>

          <MilestonesTimeline milestones={milestones} />
        </div>
      )}
 
      {/* ── CTA banner ── */}
      <div className="mx-[6vw] mb-20 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-500" />
        <div className="relative z-10 px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#ffffff" }}>
              Become our next success story
            </h2>
            <p className="text-white/80 text-base">Join 25,000+ learners transforming their careers with AI.</p>
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
