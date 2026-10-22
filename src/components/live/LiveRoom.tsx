"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CalendarPlus, ExternalLink, Loader2, Lock, Radio, Video } from "lucide-react";
import {
  studentWorkshopService, type LiveAccess,
} from "@/services/student/studentWorkshopService";
import { CountdownBlocks } from "./Countdown";
import { LiveEventPlayer, RecordingPlayer } from "./LiveEventPlayer";
import { LiveStateBadge } from "./LiveStateBadge";
import { googleCalendarUrl } from "./liveUtils";

// Re-check periodically so the waiting room flips to the player, and the player to the recording, on its own.
// While live, check more often so the chat closes soon after the instructor stops streaming.
const POLL_MS      = 30_000;
const LIVE_POLL_MS = 15_000;

function sameRoom(a: LiveAccess | null, b: LiveAccess) {
  return !!a &&
    a.state             === b.state &&
    a.playerEmbedUrl    === b.playerEmbedUrl &&
    a.chatEmbedUrl      === b.chatEmbedUrl &&
    a.recordingEmbedUrl === b.recordingEmbedUrl;
}

type Props = {
  workshopId: string;
  /** Hide the page header when the parent already shows one (instructor studio). */
  hideHeader?: boolean;
};

export function LiveRoom({ workshopId, hideHeader }: Props) {
  const [access,  setAccess]  = useState<LiveAccess | null>(null);
  const [error,   setError]   = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const accessRef = useRef<LiveAccess | null>(null);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const next = await studentWorkshopService.getLiveAccess(workshopId);
        if (cancelled) return;
        // Only re-render when something visible changed, so the playing iframe isn't reloaded
        if (!sameRoom(accessRef.current, next)) {
          accessRef.current = next;
          setAccess(next);
        }
        setError(null);
      } catch (err) {
        if (!cancelled && !accessRef.current) setError(err instanceof Error ? err.message : "Could not load this session");
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    let timer: ReturnType<typeof setTimeout>;
    const tick = async () => {
      await load();
      if (cancelled) return;
      const s = accessRef.current;
      // Stop polling once the recording is in place, as nothing else changes after that
      if (s?.state === "Ended" && (s.recordingEmbedUrl || !s.recordingProcessing)) return;
      timer = setTimeout(tick, s?.state === "Live" ? LIVE_POLL_MS : POLL_MS);
    };
    tick();

    return () => { cancelled = true; clearTimeout(timer); };
  }, [workshopId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (error || !access) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-border bg-white px-6 py-14 text-center shadow-sm">
        <Lock className="mb-4 size-10 text-violet-300" />
        <p className="text-sm font-semibold text-foreground">{error ?? "Session unavailable"}</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Only registered students can join the live session and watch its recording.
        </p>
        <Link href="/ai-workshops" className="mt-4 text-xs font-semibold text-violet-600 hover:text-violet-700">
          Browse workshops →
        </Link>
      </div>
    );
  }

  const startLabel = new Date(access.startsAt).toLocaleString("en-IN", {
    weekday: "short", day: "numeric", month: "short", hour: "numeric", minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });

  return (
    <div className="space-y-5">
      {!hideHeader && (
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <LiveStateBadge state={access.state} />
              <span className="text-xs text-muted-foreground">{access.type}</span>
            </div>
            <h1 className="mt-1.5 text-xl font-bold text-foreground sm:text-2xl">{access.name}</h1>
            <p className="mt-0.5 text-sm text-muted-foreground">
              with <span className="font-medium text-foreground">{access.instructor}</span> · {startLabel} IST
            </p>
          </div>
        </div>
      )}

      {/* Legacy session with an external link (Zoom/Meet) */}
      {access.externalLink && (
        <a href={access.externalLink} target="_blank" rel="noopener noreferrer"
          className="flex items-center justify-between rounded-xl border border-violet-200 bg-violet-50 px-5 py-4 text-sm font-semibold text-violet-700 transition hover:bg-violet-100">
          This session is hosted on an external platform. Open the link to join.
          <ExternalLink className="size-4" />
        </a>
      )}

      {access.state === "Upcoming" && !access.externalLink && (
        <div className="rounded-2xl border border-violet-100 bg-gradient-to-br from-violet-50 to-blue-50 px-5 py-8 text-center sm:px-10">
          <Radio className="mx-auto mb-3 size-8 text-violet-500" />
          <p className="text-sm font-semibold text-foreground">The session hasn&apos;t started yet</p>
          <p className="mt-1 text-xs text-muted-foreground">
            This page opens automatically 15 minutes before the start. No need to refresh.
          </p>
          <div className="mx-auto mt-6 max-w-md">
            <CountdownBlocks target={access.startsAt} />
          </div>
          <a
            href={googleCalendarUrl(access.name, access.startsAt,
              (new Date(access.endsAt).getTime() - new Date(access.startsAt).getTime()) / 3_600_000,
              `Join here: ${typeof window !== "undefined" ? window.location.href : ""}`)}
            target="_blank" rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-1.5 rounded-lg border border-blue-200 bg-white px-3 py-1.5 text-xs font-semibold text-blue-600 transition hover:bg-blue-50"
          >
            <CalendarPlus className="size-3.5" /> Add to Google Calendar
          </a>
        </div>
      )}

      {access.state === "Live" && access.playerEmbedUrl && (
        <>
          <LiveEventPlayer
            title={access.name}
            playerUrl={access.playerEmbedUrl}
            chatUrl={access.chatEmbedUrl}
            chatClosed={!access.chatEmbedUrl}
          />
          <p className="text-xs text-muted-foreground">
            If the video shows &quot;event not started&quot;, the instructor hasn&apos;t started streaming yet. It will
            begin playing on its own.
          </p>
        </>
      )}

      {access.state === "Ended" && !access.externalLink && (
        access.recordingEmbedUrl ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Video className="size-4 text-violet-600" /> Session recording
            </div>
            <RecordingPlayer title={`${access.name} recording`} url={access.recordingEmbedUrl} />
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-white px-6 py-14 text-center shadow-sm">
            <Video className="mx-auto mb-3 size-9 text-violet-300" />
            <p className="text-sm font-semibold text-foreground">
              {access.recordingProcessing ? "The recording will be available shortly" : "This session has ended"}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {access.recordingProcessing
                ? "Vimeo is still processing the stream. Check back in a little while."
                : "No recording is available for this session."}
            </p>
          </div>
        )
      )}
    </div>
  );
}
