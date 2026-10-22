"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Check, Copy, Eye, EyeOff, ExternalLink, Loader2, Radio, RefreshCw, Video,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input }  from "@/components/ui/input";
import { Label }  from "@/components/ui/label";
import { notify } from "@/lib/notify";
import { webinarService } from "@/services/admin/webinarService";
import type { StreamDetails } from "@/types/admin/webinar";
import { LiveStateBadge } from "./LiveStateBadge";
import { RecordingPlayer } from "./LiveEventPlayer";

type Props = {
  workshopId: string;
  /** Admin gets "create Vimeo event" and the manual recording override. */
  isAdmin?:   boolean;
  /** Called after details load so the parent can render the live preview. */
  onLoaded?:  (details: StreamDetails) => void;
};

function CopyField({ label, value, secret }: { label: string; value: string | null; secret?: boolean }) {
  const [copied,   setCopied]   = useState(false);
  const [revealed, setRevealed] = useState(!secret);

  const copy = async () => {
    if (!value) return;
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          readOnly
          value={value ?? "—"}
          type={revealed ? "text" : "password"}
          className="font-mono text-xs"
        />
        {secret && (
          <Button type="button" variant="outline" size="icon-lg" onClick={() => setRevealed((r) => !r)}
            aria-label={revealed ? "Hide" : "Show"}>
            {revealed ? <EyeOff /> : <Eye />}
          </Button>
        )}
        <Button type="button" variant="outline" size="icon-lg" onClick={copy} disabled={!value} aria-label="Copy">
          {copied ? <Check className="text-emerald-600" /> : <Copy />}
        </Button>
      </div>
    </div>
  );
}

export function StreamSetupPanel({ workshopId, isAdmin, onLoaded }: Props) {
  const [details,   setDetails]   = useState<StreamDetails | null>(null);
  const [loading,   setLoading]   = useState(true);
  const [busy,      setBusy]      = useState<"create" | "link" | "sync" | "save" | null>(null);
  const [manualId,  setManualId]  = useState("");
  const [eventLink, setEventLink] = useState("");
  const [editEvent, setEditEvent] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const d = await webinarService.getStreamDetails(workshopId);
      setDetails(d);
      setManualId(d.recordingVideoId ?? "");
      setEventLink(d.eventLink ?? "");
      onLoaded?.(d);
    } catch (err) {
      notify.error(err instanceof Error ? err.message : "Could not load stream details");
    } finally {
      setLoading(false);
    }
  }, [workshopId, onLoaded]);

  useEffect(() => { load(); }, [load]);

  const createEvent = async () => {
    setBusy("create");
    try {
      await webinarService.createVimeoEvent(workshopId);
      notify.success("Vimeo live event created");
      await load();
    } catch (err) {
      notify.error(err instanceof Error ? err.message : "Could not create the Vimeo event");
    } finally {
      setBusy(null);
    }
  };

  const linkEvent = async (value: string | null) => {
    setBusy("link");
    try {
      await webinarService.setVimeoEvent(workshopId, value);
      notify.success(value ? "Vimeo event linked" : "Vimeo event unlinked");
      setEditEvent(false);
      await load();
    } catch (err) {
      notify.error(err instanceof Error ? err.message : "Could not link the Vimeo event");
    } finally {
      setBusy(null);
    }
  };

  const syncRecording = async () => {
    setBusy("sync");
    try {
      const id = await webinarService.syncRecording(workshopId);
      if (id) notify.success("Recording linked");
      else    notify.info("Vimeo hasn't finished processing the recording yet. Try again in a few minutes.");
      await load();
    } catch (err) {
      notify.error(err instanceof Error ? err.message : "Could not sync the recording");
    } finally {
      setBusy(null);
    }
  };

  const saveManual = async () => {
    setBusy("save");
    try {
      await webinarService.setRecording(workshopId, manualId.trim() || null);
      notify.success(manualId.trim() ? "Recording saved" : "Recording cleared");
      await load();
    } catch (err) {
      notify.error(err instanceof Error ? err.message : "Could not save the recording");
    } finally {
      setBusy(null);
    }
  };

  if (loading && !details) {
    return <div className="h-64 animate-pulse rounded-xl bg-muted" />;
  }

  if (!details) return null;

  const hasEvent = !!details.vimeoLiveEventId;

  return (
    <div className="space-y-6 rounded-xl border border-border bg-card p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500 text-white">
            <Radio className="size-4" />
          </div>
          <div>
            <h2 className="text-base font-semibold text-foreground">Live streaming (Vimeo)</h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Students watch the stream and chat inside MindlyftAI. You broadcast to the Vimeo event.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LiveStateBadge state={details.state} />
          <Button type="button" variant="ghost" size="icon-sm" onClick={load} disabled={loading} aria-label="Refresh">
            <RefreshCw className={loading ? "animate-spin" : ""} />
          </Button>
        </div>
      </div>

      {(!hasEvent || editEvent) && (
        <div className="space-y-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-4 text-sm text-amber-900">
          {!hasEvent && <p className="font-medium">No Vimeo live event is linked to this session yet.</p>}
          {isAdmin ? (
            <>
              <ol className="list-decimal space-y-0.5 pl-5 text-xs text-amber-800">
                <li>On vimeo.com, go to <span className="font-semibold">New video → Create live event</span> (or open an existing event).</li>
                <li>In the event&apos;s settings, turn on <span className="font-semibold">Chat</span>, and under embed privacy allow only mindlyftai.com.</li>
                <li>Copy the event link from the browser address bar (for example https://vimeo.com/event/1234567) and paste it below.</li>
              </ol>
              <div className="flex flex-col gap-2 sm:flex-row">
                <Input value={eventLink} onChange={(e) => setEventLink(e.target.value)}
                  placeholder="https://vimeo.com/event/1234567" className="bg-white" />
                <Button type="button" onClick={() => linkEvent(eventLink.trim() || null)}
                  disabled={busy !== null || !eventLink.trim()}>
                  {busy === "link" && <Loader2 className="animate-spin" />}
                  Link event
                </Button>
                {editEvent && (
                  <Button type="button" variant="ghost" onClick={() => { setEditEvent(false); setEventLink(details.eventLink ?? ""); }}>
                    Cancel
                  </Button>
                )}
              </div>
              {details.liveApiEnabled && !hasEvent && (
                <Button type="button" size="sm" variant="outline" onClick={createEvent} disabled={busy !== null}>
                  {busy === "create" ? <Loader2 className="animate-spin" /> : <Radio />}
                  Or create one automatically
                </Button>
              )}
            </>
          ) : (
            <p className="text-xs">Ask an admin to link the Vimeo event from the session&apos;s edit page.</p>
          )}
        </div>
      )}

      {hasEvent && !editEvent && (
        <>
          {details.error && (
            <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
              {details.error}
            </div>
          )}

          {details.eventLink && (
            <div className="flex flex-wrap items-center gap-2">
              <a href={details.eventLink} target="_blank" rel="noopener noreferrer"
                className="flex flex-1 items-center justify-between gap-3 rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 text-sm transition hover:bg-violet-100">
                <span>
                  <span className="block font-semibold text-violet-700">Open event on Vimeo</span>
                  <span className="text-xs text-violet-600/80">{details.eventLink}</span>
                </span>
                <ExternalLink className="size-4 shrink-0 text-violet-600" />
              </a>
              {isAdmin && (
                <div className="flex gap-1">
                  <Button type="button" variant="outline" size="sm" onClick={() => setEditEvent(true)}>Change</Button>
                  <Button type="button" variant="ghost" size="sm" className="text-destructive"
                    onClick={() => linkEvent(null)} disabled={busy !== null}>
                    Unlink
                  </Button>
                </div>
              )}
            </div>
          )}

          {details.liveApiEnabled ? (
            <>
              <div className="grid gap-4 md:grid-cols-2">
                <CopyField label="RTMP server URL" value={details.rtmpLink} />
                <CopyField label="Stream key" value={details.streamKey} secret />
              </div>
              {details.rtmpsLink && <CopyField label="RTMPS server URL (secure)" value={details.rtmpsLink} />}
              <p className="text-xs text-muted-foreground">
                Keep the stream key private: anyone who has it can broadcast to this event. Students can enter the
                room 15 minutes before the start time.
              </p>
            </>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 px-4 py-3">
              <p className="text-sm font-semibold text-foreground">How to go live</p>
              <ol className="mt-1.5 list-decimal space-y-1 pl-5 text-xs text-muted-foreground">
                <li>Log in to vimeo.com with the MindlyftAI team account and open the event above.</li>
                <li>
                  Click <span className="font-semibold text-foreground">Go live</span> and choose{" "}
                  <span className="font-semibold text-foreground">Camera / browser</span> to stream from your webcam
                  with no software. For OBS, copy the RTMP URL and stream key from the event&apos;s stream settings.
                </li>
                <li>Students can enter the room 15 minutes before the start. The video plays as soon as you go live.</li>
              </ol>
            </div>
          )}
        </>
      )}

      {/* Recording */}
      <div className="space-y-3 border-t border-border pt-5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Video className="size-4 text-violet-600" />
            <h3 className="text-sm font-semibold text-foreground">Recording</h3>
          </div>
          {hasEvent && details.liveApiEnabled && (
            <Button type="button" variant="outline" size="sm" onClick={syncRecording} disabled={busy !== null}>
              {busy === "sync" ? <Loader2 className="animate-spin" /> : <RefreshCw />}
              Sync from Vimeo
            </Button>
          )}
        </div>

        {details.recordingEmbedUrl ? (
          <RecordingPlayer title={`${details.name} recording`} url={details.recordingEmbedUrl} />
        ) : (
          <p className="text-sm text-muted-foreground">
            {details.liveApiEnabled
              ? "No recording yet. Vimeo saves the stream automatically, and registered students will see it once processing finishes."
              : isAdmin
                ? "No recording linked yet. After the session, Vimeo saves the stream as a video in your library. Paste its link below so registered students can watch it."
                : "No recording yet. An admin will link it after the session."}
          </p>
        )}

        {isAdmin && (
          <div className="space-y-1.5">
            <Label htmlFor="recordingId">Recording video link or ID</Label>
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input id="recordingId" value={manualId} onChange={(e) => setManualId(e.target.value)}
                placeholder="https://vimeo.com/912345678" className="sm:max-w-md" />
              <Button type="button" variant="outline" onClick={saveManual} disabled={busy !== null}>
                {busy === "save" && <Loader2 className="animate-spin" />}
                Save
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              You can also link an edited version of the stream. Leave the field empty and save to clear it. Set the
              video&apos;s embed privacy to mindlyftai.com only, so it can only be watched here.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
