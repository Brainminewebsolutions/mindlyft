 "use client";

import { useRef, useState } from "react";
import { SectionBadge } from "@/components/ui/SectionBadge";
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
  const [hovered, setHovered] = useState(false);
  const isVideo = item.type === "video";

  const onEnter = () => {
    setHovered(true);
    if (isVideo && videoRef.current) videoRef.current.play().catch(() => {});
  };
  const onLeave = () => {
    setHovered(false);
    if (isVideo && videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="relative h-[400px] flex-shrink-0 cursor-pointer overflow-hidden rounded-[20px] bg-white transition-[border-color,box-shadow,transform] duration-[400ms]"
      style={{
        border: `1.5px solid ${hovered ? item.accent + "55" : "#e5e7eb"}`,
        boxShadow: hovered
          ? `0 20px 50px ${item.accent}22, 0 4px 16px rgba(0,0,0,0.08)`
          : "0 2px 12px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* ── Avatar bg ── */}
      <div
        className="absolute inset-0 bg-cover bg-top transition-opacity duration-500"
        style={{
          backgroundImage: `url(${item.avatar})`,
          opacity: hovered ? (isVideo ? 0.1 : 0.06) : 0.12,
        }}
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
          loop
          muted
          playsInline
          className="absolute inset-0 z-[2] h-full w-full object-cover transition-opacity duration-[550ms]"
          style={{ opacity: hovered ? 1 : 0 }}
        />
      )}

      {/* ── Video scrim for readability ── */}
      {isVideo && (
        <div
          className="pointer-events-none absolute inset-0 z-[3] transition-opacity duration-500"
          style={{
            background: `linear-gradient(0deg, ${item.accent}ee 0%, rgba(255,255,255,0.08) 55%)`,
            opacity: hovered ? 1 : 0,
          }}
        />
      )}

      {/* ── Text hover tint ── */}
      {!isVideo && (
        <div
          className="pointer-events-none absolute inset-0 z-[2] transition-opacity duration-[450ms]"
          style={{
            background: `linear-gradient(145deg, ${item.accent}0d 0%, ${item.accent}22 100%)`,
            opacity: hovered ? 1 : 0,
          }}
        />
      )}

      {/* ── Top badges ── */}
      <div className="absolute left-4 top-4 z-30 flex items-center gap-2">
        <TypeBadge type={item.type} accent={item.accent} />
        <div className="rounded-full border border-[#e5e7eb] bg-[#f3f4f6] px-2.5 py-1 text-xs font-semibold text-[#6b7280]">
          {item.tag}
        </div>
      </div>

      {/* ── DEFAULT: avatar + name + hint ── */}
      <div
        className="pointer-events-none absolute inset-0 z-[5] flex flex-col items-center justify-end p-6 transition-[opacity,transform] duration-300"
        style={{
          opacity: hovered ? 0 : 1,
          transform: hovered ? "translateY(8px)" : "translateY(0)",
        }}
      >
        <div
          className="relative mb-3 h-[72px] w-[72px] flex-shrink-0 overflow-hidden rounded-full"
          style={{ border: `3px solid ${item.accent}`, boxShadow: `0 0 0 4px ${item.accent}22` }}
        >
          <AvatarImg src={item.avatar} name={item.name} accent={item.accent} fontSize="1.25rem" />
        </div>
        <p className="m-0 text-center text-base font-bold text-[#111827]">{item.name}</p>
        <p className="mx-0 mb-2 mt-1 text-center text-[0.8rem] text-[#6b7280]">{item.designation}</p>
        <Stars color={item.accent} />
        <p className="mt-3 text-[0.72rem] uppercase tracking-[0.08em] text-[#9ca3af]">
          {isVideo ? "Hover to watch" : "Hover to read"}
        </p>
      </div>

      {/* ── HOVER VIDEO: quote ── */}
      {isVideo && (
        <div
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-end p-6 transition-[opacity,transform] delay-100 duration-[400ms] ease-out"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(12px)",
          }}
        >
          <Stars color="#fff" />
          <Quote size={24} color="rgba(255,255,255,0.5)" className="my-2" style={{ margin: "10px 0 8px" }} />
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

      {/* ── HOVER TEXT: full review ── */}
      {!isVideo && (
        <div
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between px-6 pb-6 pt-[4.5rem] transition-[opacity,transform] delay-[50ms] duration-[400ms] ease-out"
          style={{
            opacity: hovered ? 1 : 0,
            transform: hovered ? "translateY(0)" : "translateY(14px)",
          }}
        >
          <div className="mt-10 flex items-center gap-3">
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
            <Quote size={28} color={item.accent} className="mb-2.5 opacity-60" />
            <p className="m-0 line-clamp-5 text-[0.875rem] leading-[1.75] text-[#374151]">{item.review}</p>
          </div>

          <Stars color={item.accent} />
        </div>
      )}

      {/* ── Accent bottom bar ── */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 h-[3px] origin-left rounded-b-[20px] transition-transform duration-[400ms] ease-[cubic-bezier(.4,0,.2,1)]"
        style={{
          background: item.accent,
          transform: hovered ? "scaleX(1)" : "scaleX(0)",
        }}
      />
    </div>
  );
}

export default function Testimonials({ testimonials = [] }) {
  const scrollRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const onMouseDown = (e) => {
    setDragging(true);
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
  const scrollBy = (dir) => scrollRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });

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

          <h2
            className="mx-auto max-w-[560px] py-4 font-black leading-[1.12] tracking-tight text-[#111827]"
            style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)", letterSpacing: "-0.03em" }}
          >
            What Our Students
            <br />
            <span className="text-[#6c63ff]">Say About Us</span>
          </h2>

          <p className="mx-auto mt-4 max-w-[400px] text-sm leading-[1.7] text-[#6b7280]">
            Real stories from real people — hover a card to watch their video or read their full review.
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
          <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-20 bg-gradient-to-r from-[#f9fafb] to-transparent" />
          <div className="pointer-events-none absolute bottom-0 right-0 top-0 z-10 w-20 bg-gradient-to-l from-[#f9fafb] to-transparent" />

          <div
            ref={scrollRef}
            className="t-scroll flex select-none gap-5 overflow-x-auto px-20 pb-8 pt-4"
            onMouseDown={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            onMouseLeave={onMouseUp}
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