 "use client";

import { useEffect, useRef, useState } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
import { Subheading } from "@/components/ui/Subheading";
import Image from "next/image";
import { Star, Play, MessageSquare, Quote, ChevronLeft, ChevronRight } from "lucide-react";

function AvatarImg({ src, name, accent, fontSize = "1rem" }) {
  if (!src)
    return (
      <div
        className="flex h-full w-full items-center justify-center font-bold"
        style={{ background: (accent || "#6c63ff") + "22", color: accent || "#6c63ff", fontSize }}
      >
        {(name || "?").slice(0, 2).toUpperCase()}
      </div>
    );
  return <Image src={src} alt={name || ""} fill style={{ objectFit: "cover" }} unoptimized />;
}

function Stars({ count = 5, color = "#f59e0b" }) {
  return (
    <div className="flex gap-[3px]">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} fill={i < count ? color : "#e5e7eb"} color={i < count ? color : "#e5e7eb"} />
      ))}
    </div>
  );
}

function TypeBadge({ type, accent }) {
  const isVideo = type === "video";
  return (
    <div
      className="flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ background: accent + "18", color: accent, border: `1px solid ${accent}40` }}
    >
      {isVideo ? <Play size={9} fill={accent} color={accent} /> : <MessageSquare size={9} color={accent} />}
      {isVideo ? "Video" : "Review"}
    </div>
  );
}

function TestimonialCard({ item }) {
  const videoRef = useRef(null);
  const isVideo = item.type === "video";

  const onEnter = () => { if (isVideo && videoRef.current) videoRef.current.play().catch(() => {}); };
  const onLeave = () => {
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group relative h-[400px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[20px] bg-white transition-[border-color,box-shadow,transform] duration-[400ms] hover:-translate-y-[6px]"
      style={{
        border: `1.5px solid ${item.accent}55`,
        boxShadow: `0 8px 30px ${item.accent}18, 0 2px 10px rgba(0,0,0,0.06)`,
      }}
    >
      {/* ── Avatar bg ── */}
      <div
        className="absolute inset-0 bg-cover bg-top"
        style={{ backgroundImage: `url(${item.avatar})`, opacity: isVideo ? 0.1 : 0.06 }}
      />

      {/* ── Light base scrim ── */}
      <div
        className="absolute inset-0 z-[1]"
        style={{ background: "linear-gradient(160deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.96) 55%)" }}
      />

      {/* ── VIDEO overlay ── */}
      {isVideo && (
        <video
          ref={videoRef}
          src={item.video}
          loop muted playsInline
          className="absolute inset-0 z-[2] h-full w-full object-cover opacity-0 transition-opacity duration-[550ms] group-hover:opacity-100"
        />
      )}

      {/* ── Video scrim ── */}
      {isVideo && (
        <div
          className="pointer-events-none absolute inset-0 z-[3]"
          style={{ background: `linear-gradient(0deg, ${item.accent}ee 0%, rgba(255,255,255,0.08) 55%)` }}
        />
      )}

      {/* ── Text tint ── */}
      {!isVideo && (
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{ background: `linear-gradient(145deg, ${item.accent}0d 0%, ${item.accent}22 100%)` }}
        />
      )}

      {/* ── Top badges ── */}
      <div className="absolute left-4 top-4 z-30 flex items-center gap-2">
        <TypeBadge type={item.type} accent={item.accent} />
        <div className="rounded-full border border-[#e5e7eb] bg-[#f3f4f6] px-2.5 py-1 text-xs font-semibold text-[#6b7280]">
          {item.tag}
        </div>
      </div>

      {/* ── VIDEO content ── */}
      {isVideo && (
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-6">
          <Stars color="#fff" />
          <Quote size={24} color="rgba(255,255,255,0.5)" style={{ margin: "10px 0 8px" }} />
          <p className="m-0 text-base font-semibold leading-[1.5] text-white">"{item.quote}"</p>
          <div className="mt-3.5 flex items-center gap-2.5">
            <div className="relative h-9 w-9 flex-shrink-0 overflow-hidden rounded-full border-2 border-white/60">
              <AvatarImg src={item.avatar} name={item.name} accent="#fff" fontSize="0.65rem" />
            </div>
            <div>
              <p className="m-0 text-[0.85rem] font-bold text-white">{item.name}</p>
              <p className="m-0 text-xs text-white/70">{item.designation}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── TEXT review content ── */}
      {!isVideo && (
        <div className="pointer-events-none absolute inset-0 z-10 flex flex-col gap-4 px-6 pb-3 pt-[2.5rem]">
          <div className="mt-4 flex items-center gap-3">
            <div
              className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-full"
              style={{ border: `2px solid ${item.accent}` }}
            >
              <AvatarImg src={item.avatar} name={item.name} accent={item.accent} fontSize="0.75rem" />
            </div>
            <div>
              <p className="m-0 text-[0.95rem] font-bold text-[#111827]">{item.name}</p>
              <p className="mx-0 mb-0 mt-0.5 text-[0.78rem] text-[#6b7280]">{item.designation}</p>
            </div>
          </div>

          <div>
            <Quote size={20} color={item.accent} className="mb-2.5 opacity-60" />
            <p className="m-0 line-clamp-8 text-justify text-[0.875rem] leading-[1.75] text-[#374151]">
              {item.review}
            </p>
          </div>

          <div className="mt-auto">
            <Stars color={item.accent} />
          </div>
        </div>
      )}

      {/* ── Accent bottom bar ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-[3px] rounded-b-[20px]"
        style={{ background: item.accent }}
      />
    </div>
  );
}

const AUTO_SCROLL_INTERVAL = 3000;
const CARD_STEP = 320;

export default function Testimonials({ testimonials = [] }) {
  const scrollRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  // Paused while the user is dragging or hovering the track — a ref (not state)
  // so pausing/resuming doesn't reset the auto-scroll interval's own timer.
  const pausedRef = useRef(false);

  const onMouseDown = (e) => {
    setDragging(true);
    pausedRef.current = true;
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };
  const onMouseMove = (e) => {
    if (!dragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    scrollRef.current.scrollLeft = scrollLeft - (x - startX);
  };
  const onMouseUp = () => setDragging(false);
  const onTrackEnter = () => { pausedRef.current = true; };
  const onTrackLeave = () => { setDragging(false); pausedRef.current = false; };
  const scrollBy = (dir) => scrollRef.current?.scrollBy({ left: dir * CARD_STEP, behavior: "smooth" });

  useEffect(() => {
    if (testimonials.length === 0) return;

    const id = setInterval(() => {
      const el = scrollRef.current;
      if (!el || pausedRef.current) return;

      const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 5;
      if (atEnd) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: CARD_STEP, behavior: "smooth" });
      }
    }, AUTO_SCROLL_INTERVAL);

    return () => clearInterval(id);
  }, [testimonials.length]);

  return (
    <>
      <style>{`
        .t-scroll::-webkit-scrollbar { display: none; }
        .t-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .nav-btn:hover { transform: scale(1.08); background: #f3f4f6 !important; }
      `}</style>

      <section className="relative overflow-hidden bg-[#f9fafb] pb-24 pt-20">
        {/* Soft bg blobs */}
        <div
          className="pointer-events-none absolute left-[15%] top-[-8%] h-[500px] w-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(108,99,255,0.07) 0%, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute bottom-[-8%] right-[10%] h-[400px] w-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)" }}
        />

        {/* ── Header ── */}
        <div className="mb-12 px-6 text-center">
          <SectionBadge variant="dark">Testimonials</SectionBadge>

          <Subheading
            centered
            className="max-w-[560px] py-4 leading-[1.12] tracking-tight"
            text={
              <>
                What Our Students
                <br />
                <span className="text-[#6c63ff]">Say About Us</span>
              </>
            }
          />

          <p className="mx-auto mt-4 max-w-[400px] text-sm leading-[1.7] text-[#6b7280]">
            Real stories from real people who transformed their careers with MindLyft AI.
          </p>

          {/* Legend */}
          <div className="mt-5 flex items-center justify-center gap-6">
            {[
              { Icon: Play, label: "Video Review", filled: true },
              { Icon: MessageSquare, label: "Text Review", filled: false },
            ].map(({ Icon, label, filled }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[rgba(108,99,255,0.1)]">
                  <Icon size={9} fill={filled ? "#6c63ff" : "none"} color="#6c63ff" strokeWidth={filled ? 0 : 2.5} />
                </div>
                <span className="text-xs text-[#6b7280]">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Cards row ── */}
        <div className="relative">
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-6 bg-gradient-to-r from-[#f9fafb] to-transparent sm:w-12 md:w-20" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-6 bg-gradient-to-l from-[#f9fafb] to-transparent sm:w-12 md:w-20" />

          <div
            ref={scrollRef}
            className="t-scroll flex select-none gap-5 overflow-x-auto px-6 pb-8 pt-4 sm:px-12 md:px-20"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseEnter={onTrackEnter}
            onMouseLeave={onTrackLeave}
            style={{ cursor: dragging ? "grabbing" : "grab" }}
          >
            {testimonials.map((item) => (
              <div key={item.id} className="w-[300px] flex-shrink-0">
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Nav ── */}
        <div className="mt-4 flex items-center justify-center gap-4">
          <button
            className="nav-btn flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-[#e5e7eb] bg-white text-[#374151] transition-[transform,background,border-color] duration-200"
            onClick={() => scrollBy(-1)}
          >
            <ChevronLeft size={16} strokeWidth={2.2} />
          </button>

          <div className="flex gap-1.5">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="h-1.5 rounded-full transition-[width] duration-300"
                style={{
                  width: i === 0 ? 20 : 6,
                  background: i === 0 ? "#6c63ff" : "#d1d5db",
                }}
              />
            ))}
          </div>

          <button
            className="nav-btn flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border-[1.5px] border-[#e5e7eb] bg-white text-[#374151] transition-[transform,background,border-color] duration-200"
            onClick={() => scrollBy(1)}
          >
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </section>
    </>
  );
}