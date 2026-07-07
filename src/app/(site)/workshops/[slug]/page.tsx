import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Clock, Wifi, MapPin, User, Globe, Calendar,
  CheckCircle2, Tag, ExternalLink, ArrowLeft,
} from "lucide-react";
import { dotnetFetch } from "@/lib/api/dotnet-client";
import { toUploadUrl } from "@/lib/api/image-url";
import type { Webinar } from "@/types/admin/webinar";
import WorkshopRegisterButton from "./_components/WorkshopRegisterButton";

const GRADIENTS = [
  "linear-gradient(135deg,#667eea,#764ba2)",
  "linear-gradient(135deg,#11998e,#38ef7d)",
  "linear-gradient(135deg,#f093fb,#f5576c)",
  "linear-gradient(135deg,#4facfe,#00f2fe)",
  "linear-gradient(135deg,#fa709a,#fee140)",
  "linear-gradient(135deg,#a18cd1,#fbc2eb)",
];

interface WebinarEnvelope { isSuccess: boolean; data: Webinar; }

async function getWebinar(id: string): Promise<Webinar | null> {
  try {
    const envelope = await dotnetFetch<WebinarEnvelope>(
      `/v1/workshopWebinar/${id}`,
      { next: { revalidate: 300 } } as RequestInit,
    );
    return envelope.isSuccess ? envelope.data : null;
  } catch {
    return null;
  }
}

export default async function WorkshopDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const webinar = await getWebinar(id);
  if (!webinar) notFound();

  const highlights: string[] = (() => {
    try { return webinar.highlightsJson ? JSON.parse(webinar.highlightsJson) : []; }
    catch { return []; }
  })();

  const gradient     = GRADIENTS[Number(id) % GRADIENTS.length] ?? GRADIENTS[0];
  const proxiedImage = toUploadUrl(webinar.image);
  const priceLabel   = webinar.price === 0 ? "Free" : `₹${webinar.price.toLocaleString("en-IN")}`;
  const ModeIcon     = webinar.mode === "Online" ? Wifi : MapPin;
  const isOnline     = webinar.mode === "Online";

  const discountedPrice =
    webinar.discount && webinar.price > 0
      ? webinar.price - (webinar.price * webinar.discount) / 100
      : null;

  const displayPrice =
    webinar.price === 0 ? "Free"
    : discountedPrice   ? `₹${Math.round(discountedPrice).toLocaleString("en-IN")}`
    : priceLabel;

  const dateFormatted = new Date(webinar.date).toLocaleDateString("en-IN", {
    day: "2-digit", month: "long", year: "numeric",
  });
  const dateShort = new Date(webinar.date).toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });
  const durationLabel = `${webinar.duration} hr${webinar.duration === 1 ? "" : "s"}`;

  return (
    <div className="min-h-screen bg-[#f5f3ff]">

      {/* ── Hero ── */}
      <div className="relative h-screen overflow-hidden">
        {proxiedImage ? (
          <img src={proxiedImage} alt={webinar.name} className="absolute inset-0 w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0" style={{ background: gradient }} />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/40 via-transparent to-transparent" />

        {/* Back link */}
        <Link
          href="/workshops"
          className="absolute top-24 left-8 inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors z-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Workshops
        </Link>

        {/* Title — bottom */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="px-8 pb-4 pt-6 bg-gradient-to-r from-violet-600/80 to-blue-500/80 backdrop-blur-sm">
            <h1
              className="text-xl md:text-2xl font-bold leading-snug max-w-3xl"
              style={{ color: "#ffffff", textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
            >
              {webinar.name}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Quick info bar ── */}
      <div className="bg-white border-b border-violet-100">
        <div className="max-w-[1100px] mx-auto px-[6vw] py-4 flex flex-wrap gap-5 text-sm text-gray-600">
          <span className="flex items-center gap-1.5"><User className="w-4 h-4 text-violet-500" />{webinar.instructor}</span>
          <span className="flex items-center gap-1.5"><ModeIcon className="w-4 h-4 text-violet-500" />{webinar.mode}</span>
          <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-violet-500" />{durationLabel}</span>
          <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4 text-violet-500" />{dateShort}</span>
          <span className="flex items-center gap-1.5"><Globe className="w-4 h-4 text-violet-500" />{webinar.language}</span>
        </div>
      </div>

      {/* ── Two-column body ── */}
      <div className="max-w-[1100px] mx-auto px-[6vw] py-12 grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10 items-start">

        {/* ── LEFT ── */}
        <div>

          {/* What You'll Learn */}
          {highlights.length > 0 && (
            <div className="mb-10">
              <p className="text-[1.1rem] font-extrabold text-[#1a1046] tracking-wide mb-4 pb-3 border-b-2 border-[#f0eeff]">
                What You&apos;ll Learn
              </p>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl bg-[#f5f3ff] border border-violet-100 hover:shadow-md transition-shadow">
                    <CheckCircle2 className="w-4 h-4 text-[#6c63ff] shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* About */}
          {webinar.description && (
            <div className="mb-10">
              <p className="text-[1.1rem] font-extrabold text-[#1a1046] tracking-wide mb-4 pb-3 border-b-2 border-[#f0eeff]">
                About This {webinar.type}
              </p>
              <p className="text-gray-600 text-[0.95rem] leading-relaxed">{webinar.description}</p>
            </div>
          )}

          {/* Session Info */}
          <div className="mb-10">
            <p className="text-[1.1rem] font-extrabold text-[#1a1046] tracking-wide mb-4 pb-3 border-b-2 border-[#f0eeff]">
              Session Info
            </p>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3.5">
              {[
                { Icon: User,     label: "Instructor", value: webinar.instructor },
                { Icon: Globe,    label: "Language",   value: webinar.language   },
                { Icon: Clock,    label: "Duration",   value: durationLabel      },
                { Icon: ModeIcon, label: "Mode",       value: webinar.mode       },
                { Icon: Calendar, label: "Date",       value: dateShort          },
                { Icon: Clock,    label: "Time",       value: webinar.time       },
                ...(webinar.category ? [{ Icon: Tag,    label: "Category",  value: webinar.category }] : []),
                ...(webinar.link    ? [{ Icon: Wifi,   label: "Join Link", value: webinar.link     }] : []),
                ...(webinar.address ? [{ Icon: MapPin, label: "Venue",     value: webinar.address  }] : []),
              ].map(({ Icon, label, value }) => (
                <div key={label} className="p-4 rounded-xl bg-white border border-violet-100 shadow-sm">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <Icon className="w-3.5 h-3.5 text-[#6c63ff]" />
                    <span className="text-gray-400 text-[10px] font-bold tracking-[1.5px] uppercase">{label}</span>
                  </div>
                  <p className="text-[#1a1046] text-sm font-bold break-words">{value}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* ── RIGHT: sticky card ── */}
        <div className="sticky top-[100px] rounded-2xl bg-white border border-violet-100 shadow-xl overflow-hidden">

          <div className="p-6 flex flex-col gap-4">

            {/* Price */}
            <div>
              <p className="text-[2rem] font-extrabold leading-none mb-1">
                {webinar.price === 0
                  ? <span className="text-green-500">Free</span>
                  : <span className="text-[#6c63ff]">{displayPrice}</span>}
              </p>
              {discountedPrice && webinar.price > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm line-through">{priceLabel}</span>
                  <span className="text-green-600 text-xs font-bold bg-green-50 px-2 py-0.5 rounded-full">
                    {webinar.discount}% off
                  </span>
                </div>
              )}
              {webinar.price > 0 && !discountedPrice && (
                <p className="text-gray-400 text-xs">One-time payment</p>
              )}
            </div>

            {/* Register CTA */}
            <WorkshopRegisterButton
              webinarId={webinar.id}
              productType={webinar.type}
              price={webinar.price}
            />

            {/* Join link — online sessions */}
            {webinar.link && (
              <a
                href={webinar.link}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border-2 border-[#6c63ff] text-[#6c63ff] text-sm font-semibold hover:bg-[#f5f3ff] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Join Online Session
              </a>
            )}

            {/* Venue — offline sessions */}
            {webinar.address && (
              <div className="flex gap-2 px-3 py-2.5 rounded-xl bg-[#f5f3ff]">
                <MapPin className="w-4 h-4 text-[#6c63ff] shrink-0 mt-0.5" />
                <span className="text-gray-600 text-[13px] leading-relaxed">{webinar.address}</span>
              </div>
            )}

            {/* Quick facts */}
            <div className="flex flex-col gap-2.5 pt-3 border-t border-[#f0eeff]">
              {[
                { Icon: Calendar, text: dateFormatted },
                { Icon: Clock,    text: webinar.time },
                { Icon: Clock,    text: `${durationLabel} duration` },
                { Icon: ModeIcon, text: `${webinar.mode} session` },
                { Icon: Globe,    text: `In ${webinar.language}` },
                { Icon: User,     text: `By ${webinar.instructor}` },
              ].map(({ Icon, text }) => (
                <div key={text} className="flex items-center gap-2.5">
                  <Icon className="w-3.5 h-3.5 text-[#6c63ff] shrink-0" />
                  <span className="text-gray-500 text-sm">{text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
