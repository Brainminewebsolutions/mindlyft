"use client";

import { MessageCircle, MessageCircleOff } from "lucide-react";

type Props = {
  title:         string;
  playerUrl:     string;
  chatUrl?:      string | null;
  /** Event isn't streaming right now: show a "chat closed" panel instead of the chat. */
  chatClosed?:   boolean;
  /** Fixed 60vh-tall video with the chat stacked below, for embedding in a narrow column. */
  compact?:      boolean;
};

const VIDEO_BOX = "relative w-full overflow-hidden rounded-xl border border-border bg-slate-100 shadow-sm";
const videoBox  = (compact?: boolean) => `${VIDEO_BOX} ${compact ? "h-[min(60vh,calc(100vh-16rem))]" : "aspect-video"}`;

/** Vimeo live player with Vimeo's live chat beside it (stacked below on mobile). */
export function LiveEventPlayer({ title, playerUrl, chatUrl, chatClosed, compact }: Props) {
  const showSide = !!chatUrl || !!chatClosed;

  return (
    <div className={compact ? "grid gap-4" : "grid gap-4 lg:grid-cols-3"}>
      <div className={compact ? "" : showSide ? "lg:col-span-2" : "lg:col-span-3"}>
        <div className={videoBox(compact)}>
          <iframe
            src={playerUrl}
            title={title}
            className="absolute inset-0 h-full w-full"
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>

      {chatUrl && (
        <div className={`flex h-[480px] flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm ${compact ? "" : "lg:h-auto"}`}>
          <div className="flex items-center gap-2 border-b border-border bg-gradient-to-r from-violet-50 to-blue-50 px-4 py-2.5">
            <MessageCircle className="size-4 text-violet-600" />
            <span className="text-sm font-semibold text-foreground">Live chat</span>
          </div>
          <iframe
            src={chatUrl}
            title={`${title} chat`}
            className="min-h-0 w-full flex-1"
          />
        </div>
      )}

      {!chatUrl && chatClosed && (
        <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-white px-6 py-10 text-center shadow-sm">
          <MessageCircleOff className="mb-3 size-8 text-muted-foreground/50" />
          <p className="text-sm font-semibold text-foreground">Chat is closed</p>
          <p className="mt-1 text-xs text-muted-foreground">
            The chat is open only while the session is live. It opens here automatically when the instructor
            starts streaming.
          </p>
        </div>
      )}
    </div>
  );
}

/** Plain 16:9 Vimeo video player for recordings. */
export function RecordingPlayer({ title, url, compact }: { title: string; url: string; compact?: boolean }) {
  return (
    <div className={videoBox(compact)}>
      <iframe
        src={url}
        title={title}
        className="absolute inset-0 h-full w-full"
        allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
        allowFullScreen
      />
    </div>
  );
}
