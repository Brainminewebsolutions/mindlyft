"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { X, Star, Play, MessageSquare, Quote } from "lucide-react";
import type { Testimonial } from "@/types/admin/testimonial";

type Props = {
  testimonial: Testimonial | null;
  onClose:     () => void;
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3.5 w-3.5" fill={i < rating ? "#f59e0b" : "#e5e7eb"} color={i < rating ? "#f59e0b" : "#e5e7eb"} />
      ))}
    </span>
  );
}

export function TestimonialPreviewModal({ testimonial, onClose }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!testimonial) {
      setPlaying(false);
      videoRef.current?.pause();
    }
  }, [testimonial]);

  if (!testimonial) return null;

  const isVideo = testimonial.type === "video";
  const accent  = testimonial.accent || "#6c63ff";

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setPlaying(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.55)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg rounded-2xl bg-card shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Accent top bar */}
        <div className="h-1 w-full" style={{ background: accent }} />

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full bg-muted text-muted-foreground transition hover:bg-accent hover:text-foreground"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        <div className="p-6 space-y-5">
          {/* Person header */}
          <div className="flex items-center gap-4">
            {testimonial.avatar ? (
              <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2"
                style={{ borderColor: accent }}>
                <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" unoptimized />
              </div>
            ) : (
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
                style={{ background: accent }}>
                {testimonial.name.slice(0, 2).toUpperCase()}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground">{testimonial.name}</p>
              {testimonial.designation && (
                <p className="text-xs text-muted-foreground">{testimonial.designation}</p>
              )}
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                <Stars rating={testimonial.rating} />
                <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
                  style={{ background: accent + "18", color: accent }}>
                  {isVideo ? <Play className="h-2.5 w-2.5" /> : <MessageSquare className="h-2.5 w-2.5" />}
                  {isVideo ? "Video" : "Text"}
                </span>
                {testimonial.tag && (
                  <span className="rounded-full border border-border bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                    {testimonial.tag}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Content */}
          {isVideo && testimonial.video ? (
            <div className="space-y-3">
              {/* Video player */}
              <div className="relative overflow-hidden rounded-xl bg-black aspect-video cursor-pointer"
                onClick={togglePlay}>
                <video
                  ref={videoRef}
                  src={testimonial.video}
                  className="h-full w-full object-contain"
                  onEnded={() => setPlaying(false)}
                />
                {!playing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full text-white"
                      style={{ background: accent }}>
                      <Play className="h-6 w-6 translate-x-0.5" fill="white" />
                    </div>
                  </div>
                )}
              </div>

              {/* Quote */}
              {testimonial.quote && (
                <div className="rounded-lg border border-border bg-muted/40 px-4 py-3">
                  <Quote className="h-4 w-4 mb-1.5" style={{ color: accent }} />
                  <p className="text-sm text-foreground leading-relaxed italic">"{testimonial.quote}"</p>
                </div>
              )}
            </div>
          ) : testimonial.review ? (
            <div className="rounded-lg border border-border bg-muted/40 px-4 py-3">
              <Quote className="h-4 w-4 mb-1.5" style={{ color: accent }} />
              <p className="text-sm text-foreground leading-relaxed">{testimonial.review}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">No content added yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
