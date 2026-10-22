"use client";

import { MessageCircle } from "lucide-react";

type Props = {
  title:         string;
  playerUrl:     string;
  chatUrl?:      string | null;
};

/** Vimeo live player with Vimeo's live chat beside it (stacked below on mobile). */
export function LiveEventPlayer({ title, playerUrl, chatUrl }: Props) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className={chatUrl ? "lg:col-span-2" : "lg:col-span-3"}>
        <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-slate-100 shadow-sm">
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
        <div className="flex h-[480px] flex-col overflow-hidden rounded-xl border border-border bg-white shadow-sm lg:h-auto">
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
    </div>
  );
}

/** Plain 16:9 Vimeo video player for recordings. */
export function RecordingPlayer({ title, url }: { title: string; url: string }) {
  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-slate-100 shadow-sm">
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
