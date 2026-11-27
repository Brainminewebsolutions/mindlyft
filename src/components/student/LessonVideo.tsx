"use client";

import { useEffect, useRef } from "react";
import { CheckCircle2, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import { COMPLETION_PERCENT, useWatchProgress } from "@/hooks/useWatchProgress";

interface Props {
  videoUrl:       string;
  title:          string;
  initialPercent: number;
  isCompleted:    boolean;
  report:         (percent: number) => Promise<boolean>;
}

/**
 * Plays one lesson video (Vimeo iframe or HTML5) and reports watch progress.
 * Render with `key={lesson.id}` so tracking resets per lesson.
 */
export function LessonVideo({ videoUrl, title, initialPercent, isCompleted, report }: Props) {
  const { percent, onTime, flush } = useWatchProgress({ initialPercent, report });
  const isVimeo   = videoUrl.includes("player.vimeo.com");
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /* Vimeo: attach the Player SDK to the existing iframe */
  useEffect(() => {
    if (!isVimeo || !iframeRef.current) return;
    let cancelled = false;
    let player: import("@vimeo/player").default | null = null;

    const handleTime = (e: { seconds: number; duration: number }) => onTime(e.seconds, e.duration);

    import("@vimeo/player").then(({ default: Player }) => {
      if (cancelled || !iframeRef.current) return;
      player = new Player(iframeRef.current);
      player.on("timeupdate", handleTime);
      player.on("ended",      handleTime);
      player.on("pause",      flush);
    });

    return () => {
      cancelled = true;
      if (player) {
        player.off("timeupdate");
        player.off("ended");
        player.off("pause");
      }
    };
  }, [isVimeo, onTime, flush]);

  const done = isCompleted || percent >= COMPLETION_PERCENT;

  return (
    <div>
      {isVimeo ? (
        <div className="bg-black w-full aspect-video">
          <iframe
            ref={iframeRef}
            src={videoUrl}
            className="w-full h-full"
            frameBorder="0"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            allowFullScreen
            title={title}
          />
        </div>
      ) : (
        <div className="bg-black w-full">
          <video
            src={videoUrl}
            controls
            controlsList="nodownload"
            className="w-full aspect-video"
            onTimeUpdate={(e) => onTime(e.currentTarget.currentTime, e.currentTarget.duration)}
            onEnded={(e) => onTime(e.currentTarget.currentTime, e.currentTarget.duration)}
            onPause={flush}
          />
        </div>
      )}

      {/* Watch-progress strip */}
      <div className="flex items-center gap-3 px-6 py-2.5 border-b border-border bg-white">
        {done ? (
          <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <CheckCircle2 size={14} />
            Lesson completed
          </span>
        ) : (
          <span className="flex items-center gap-1.5 text-xs text-gray-500">
            <Eye size={14} className="text-violet-500" />
            {percent}% watched &middot; {COMPLETION_PERCENT}% needed to unlock the next lesson
          </span>
        )}
        <progress
          value={done ? 100 : percent}
          max={100}
          className={cn(
            "ml-auto h-1.5 w-32 overflow-hidden rounded-full appearance-none bg-gray-100",
            "[&::-webkit-progress-bar]:bg-gray-100 [&::-webkit-progress-bar]:rounded-full",
            done
              ? "[&::-webkit-progress-value]:bg-emerald-500 [&::-moz-progress-bar]:bg-emerald-500"
              : "[&::-webkit-progress-value]:bg-violet-500 [&::-moz-progress-bar]:bg-violet-500",
          )}
        />
      </div>
    </div>
  );
}
