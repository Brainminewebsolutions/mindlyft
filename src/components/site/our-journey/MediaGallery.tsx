"use client";

import { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronRight, ChevronUp, ImageIcon, Play, X } from "lucide-react";

export type MediaItem = { id: string; url: string; type: "Image" | "Video" };

function Lightbox({
  media, index, onClose, onNavigate,
}: {
  media: MediaItem[];
  index: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}) {
  const item = media[index];
  const hasPrev = index > 0;
  const hasNext = index < media.length - 1;

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onNavigate(index - 1);
      if (e.key === "ArrowRight" && hasNext) onNavigate(index + 1);
    };
    window.addEventListener("keydown", handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [index, hasPrev, hasNext, onClose, onNavigate]);

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 sm:p-8">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" onClick={onClose} />

      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <X className="w-5 h-5" />
      </button>

      {hasPrev && (
        <button
          type="button"
          onClick={() => onNavigate(index - 1)}
          aria-label="Previous"
          className="absolute left-2 sm:left-6 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {hasNext && (
        <button
          type="button"
          onClick={() => onNavigate(index + 1)}
          aria-label="Next"
          className="absolute right-2 sm:right-6 z-10 flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      <div
        className="relative z-[5] flex max-h-[85vh] w-full max-w-5xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        {item.type === "Video" ? (
          <video key={item.id} src={item.url} controls autoPlay className="max-h-[80vh] w-full rounded-xl bg-black" />
        ) : (
          <img key={item.id} src={item.url} alt="" className="max-h-[80vh] w-auto max-w-full rounded-xl object-contain" />
        )}
        <p className="mt-3 text-sm text-white/70">{index + 1} / {media.length}</p>
      </div>
    </div>
  );
}

export function MediaGallery({ media }: { media: MediaItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
        {media.map((m, i) => (
          <button
            key={m.id}
            type="button"
            onClick={() => setOpenIndex(i)}
            className="group/media relative aspect-square rounded-xl overflow-hidden border border-violet-100 bg-violet-50"
          >
            {m.type === "Video" ? (
              <>
                <video src={m.url} className="h-full w-full object-cover" muted />
                <div className="absolute inset-0 flex items-center justify-center bg-black/25 group-hover/media:bg-black/35 transition-colors">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
                    <Play className="w-3.5 h-3.5 text-violet-600 fill-violet-600 ml-0.5" />
                  </span>
                </div>
              </>
            ) : (
              <img
                src={m.url}
                alt=""
                className="h-full w-full object-cover group-hover/media:scale-105 transition-transform duration-300"
              />
            )}
          </button>
        ))}
      </div>

      {openIndex !== null && (
        <Lightbox media={media} index={openIndex} onClose={() => setOpenIndex(null)} onNavigate={setOpenIndex} />
      )}
    </>
  );
}

export function ViewMoreButton({ expanded, count, onClick }: { expanded: boolean; count: number; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-1.5 text-sm font-bold text-violet-600 hover:text-violet-700 transition-colors w-fit"
    >
      <ImageIcon className="w-4 h-4" />
      {expanded ? "Hide Gallery" : `View More (${count})`}
      {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
    </button>
  );
}
