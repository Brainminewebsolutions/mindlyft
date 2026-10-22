"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Loader2, Wifi, MapPin, Clock, User, Calendar, ExternalLink,
  IndianRupee, PlayCircle, Radio, CalendarPlus, type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toUploadUrl } from "@/lib/api/image-url";
import {
  studentWorkshopService, type LiveState, type RegisteredWorkshop,
} from "@/services/student/studentWorkshopService";
import { InlineCountdown } from "@/components/live/Countdown";
import { LiveStateBadge } from "@/components/live/LiveStateBadge";
import { formatEventDate, formatEventTime, googleCalendarUrl } from "@/components/live/liveUtils";

type Props = {
  type:  "Workshop" | "Webinar";
  title: string;
  icon:  LucideIcon;
};

const TABS: { state: LiveState; label: string }[] = [
  { state: "Live",     label: "Live now" },
  { state: "Upcoming", label: "Upcoming" },
  { state: "Ended",    label: "Past recordings" },
];

export function RegisteredEventsView({ type, title, icon: Icon }: Props) {
  const noun = type.toLowerCase();

  const [events,  setEvents]  = useState<RegisteredWorkshop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState<string | null>(null);
  const [tab,     setTab]     = useState<LiveState | null>(null);

  useEffect(() => {
    studentWorkshopService
      .getMyWorkshops(type)
      .then((data) => setEvents(Array.isArray(data) ? data : []))
      .catch((err: Error) => setError(err.message))
      .finally(() => setLoading(false));
  }, [type]);

  const byState = useMemo(() => {
    const groups: Record<LiveState, RegisteredWorkshop[]> = { Live: [], Upcoming: [], Ended: [] };
    for (const e of events) groups[e.state]?.push(e);
    groups.Upcoming.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
    groups.Ended.sort((a, b) => b.startsAt.localeCompare(a.startsAt));
    return groups;
  }, [events]);

  // Default to the most relevant tab: live first, then upcoming, then past
  const activeTab: LiveState =
    tab ?? (byState.Live.length ? "Live" : byState.Upcoming.length ? "Upcoming" : "Ended");
  const visible = byState[activeTab];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">{title}</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {error
            ? error
            : events.length > 0
              ? `${events.length} ${noun}${events.length !== 1 ? "s" : ""} registered`
              : `You haven't registered for any ${noun}s yet`}
        </p>
      </div>

      {events.length > 0 && (
        <div className="flex gap-1 overflow-x-auto rounded-xl border border-border bg-muted/40 p-1">
          {TABS.map((t) => (
            <button
              key={t.state}
              type="button"
              onClick={() => setTab(t.state)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition",
                activeTab === t.state
                  ? "bg-white text-violet-700 shadow-sm"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.state === "Live" && byState.Live.length > 0 && (
                <span className="size-1.5 animate-pulse rounded-full bg-red-500" />
              )}
              {t.label}
              <span className="rounded-full bg-muted px-1.5 text-[10px] tabular-nums">
                {byState[t.state].length}
              </span>
            </button>
          ))}
        </div>
      )}

      {visible.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16 text-center">
            <Icon className="mb-4 size-12 text-muted-foreground/30" />
            <p className="text-sm font-medium text-foreground">
              {events.length === 0 ? `No ${noun}s yet` : `Nothing in "${TABS.find((t) => t.state === activeTab)?.label}"`}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {events.length === 0
                ? `Browse available ${noun}s and register to see them here`
                : "Check the other tabs"}
            </p>
            {events.length === 0 && (
              <Link href="/ai-workshops/schedule" className="mt-4 text-xs font-semibold text-violet-600 hover:text-violet-700">
                View the schedule →
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((e) => <RegisteredEventCard key={e.orderId} event={e} fallbackIcon={Icon} />)}
        </div>
      )}
    </div>
  );
}

function RegisteredEventCard({ event, fallbackIcon: Icon }: { event: RegisteredWorkshop; fallbackIcon: LucideIcon }) {
  const imageUrl = toUploadUrl(event.image);
  const isFree   = event.subscriptionType === "Free";
  const isOnline = event.mode !== "Offline";
  const liveHref = `/student/workshops/${event.workshopId}/live`;

  return (
    <Card className="overflow-hidden transition hover:shadow-md flex flex-col">
      <div className="relative h-40 w-full bg-muted shrink-0">
        {imageUrl ? (
          <Image src={imageUrl} alt={event.name} fill className="object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-violet-100 to-blue-100 flex items-center justify-center">
            <Icon className="size-10 text-violet-300" />
          </div>
        )}
        <Badge className="absolute right-2 top-2 gap-1 text-[10px]" variant="secondary">
          {isOnline ? <Wifi className="size-2.5" /> : <MapPin className="size-2.5" />}
          {event.mode}
        </Badge>
        <div className="absolute left-2 top-2 flex gap-1.5">
          {isOnline && <LiveStateBadge state={event.state} className="bg-white/95" />}
          {isFree && (
            <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">Free</span>
          )}
        </div>
      </div>

      <CardContent className="p-4 space-y-3 flex flex-col flex-1">
        <h4 className="line-clamp-2 text-sm font-semibold text-foreground leading-snug">{event.name}</h4>

        <div className="grid grid-cols-2 gap-y-1.5 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><User className="size-3 shrink-0" />{event.instructor}</span>
          <span className="flex items-center gap-1.5"><Clock className="size-3 shrink-0" />{event.duration}h</span>
          <span className="flex items-center gap-1.5"><Calendar className="size-3 shrink-0" />{formatEventDate(event.date)}</span>
          <span className="flex items-center gap-1.5 font-medium text-foreground">{formatEventTime(event.time)} IST</span>
        </div>

        {isOnline && event.state === "Upcoming" && (
          <div className="flex items-center justify-between rounded-lg bg-violet-50 px-3 py-2 text-xs">
            <span className="font-medium text-violet-700"><InlineCountdown target={event.startsAt} /></span>
            <a
              href={googleCalendarUrl(event.name, event.startsAt, event.duration, `Join from your MindlyftAI dashboard: ${typeof window !== "undefined" ? window.location.origin : ""}${liveHref}`)}
              target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-1 font-semibold text-blue-600 hover:text-blue-700"
            >
              <CalendarPlus className="size-3.5" /> Add
            </a>
          </div>
        )}

        <div className="flex items-center justify-between border-t border-border pt-2 mt-auto">
          <span className="flex items-center gap-0.5 text-sm font-semibold text-violet-600">
            {isFree ? "Free" : (<><IndianRupee className="size-3.5" />{event.amount.toLocaleString("en-IN")}</>)}
          </span>

          {isOnline ? (
            <EventAction event={event} liveHref={liveHref} />
          ) : (
            event.address && (
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="size-3 shrink-0" />{event.address}
              </span>
            )
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function EventAction({ event, liveHref }: { event: RegisteredWorkshop; liveHref: string }) {
  // Legacy sessions without a Vimeo event keep the external join link
  if (!event.hasLiveEvent) {
    return event.link ? (
      <a href={event.link} target="_blank" rel="noopener noreferrer"
        className="flex items-center gap-1 text-xs font-semibold text-violet-600 hover:text-violet-700 transition-colors">
        Join <ExternalLink className="size-3" />
      </a>
    ) : null;
  }

  if (event.state === "Live") {
    return (
      <Link href={liveHref}
        className="flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition hover:opacity-90">
        <Radio className="size-3.5" /> Join live
      </Link>
    );
  }

  if (event.state === "Ended") {
    return (
      <Link href={liveHref}
        className={cn(
          "flex items-center gap-1 text-xs font-semibold transition-colors",
          event.hasRecording ? "text-violet-600 hover:text-violet-700" : "text-muted-foreground hover:text-foreground",
        )}>
        <PlayCircle className="size-3.5" />
        {event.hasRecording ? "Watch recording" : "Recording processing"}
      </Link>
    );
  }

  return (
    <Link href={liveHref} className="text-xs font-semibold text-violet-600 hover:text-violet-700">
      Waiting room →
    </Link>
  );
}
