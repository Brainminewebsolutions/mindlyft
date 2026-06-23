"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Star, Play, MessageSquare, Quote, ChevronLeft, ChevronRight } from "lucide-react";


function AvatarImg({ src, name, accent, fontSize = "1rem" }) {
  if (!src) return (
    <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: (accent || "#6c63ff") + "22", color: accent || "#6c63ff", fontWeight: 700, fontSize }}>
      {(name || "?").slice(0, 2).toUpperCase()}
    </div>
  );
  return <Image src={src} alt={name || ""} fill style={{ objectFit: "cover" }} unoptimized />;
}

function Stars({ count = 5, color = "#f59e0b" }) {
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} size={13} fill={i < count ? color : "#e5e7eb"} color={i < count ? color : "#e5e7eb"} />
      ))}
    </div>
  );
}

function TypeBadge({ type, accent }) {
  const isVideo = type === "video";
  return (
    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold"
      style={{
        background: accent + "18",
        color: accent,
        border: `1px solid ${accent}40`,
      }}>
      {isVideo ? (
        <Play size={9} fill={accent} color={accent} />
      ) : (
        <MessageSquare size={9} color={accent} />
      )}
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
      style={{
        position: "relative",
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        height: 400,
        background: "#fff",
        border: `1.5px solid ${hovered ? item.accent + "55" : "#e5e7eb"}`,
        boxShadow: hovered
          ? `0 20px 50px ${item.accent}22, 0 4px 16px rgba(0,0,0,0.08)`
          : "0 2px 12px rgba(0,0,0,0.06)",
        transition: "border-color 0.4s, box-shadow 0.4s, transform 0.35s",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        flexShrink: 0,
      }}
    >
      {/* ── Avatar bg — fades on hover for video, stays for text ── */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `url(${item.avatar})`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        opacity: hovered ? (isVideo ? 0.1 : 0.06) : 0.12,
        transition: "opacity 0.5s",
      }} />

      {/* ── Light base scrim ── */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(160deg, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0.96) 55%)",
        zIndex: 1,
      }} />

      {/* ── VIDEO overlay ── */}
      {isVideo && (
        <video ref={videoRef} src={item.video} loop muted playsInline
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%", objectFit: "cover",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.55s",
            zIndex: 2,
          }}
        />
      )}

      {/* ── Video scrim for readability ── */}
      {isVideo && (
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(0deg, ${item.accent}ee 0%, rgba(255,255,255,0.08) 55%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.5s",
          zIndex: 3, pointerEvents: "none",
        }} />
      )}

      {/* ── Text hover tint ── */}
      {!isVideo && (
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(145deg, ${item.accent}0d 0%, ${item.accent}22 100%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.45s",
          zIndex: 2, pointerEvents: "none",
        }} />
      )}

      {/* ── Top badges ── */}
     <div
  className="absolute top-4 left-4 flex items-center gap-2"
  style={{ zIndex: 30 }}
>
        <TypeBadge type={item.type} accent={item.accent} />
        <div className="px-2.5 py-1 rounded-full text-xs font-semibold"
          style={{ background: "#f3f4f6", color: "#6b7280", border: "1px solid #e5e7eb" }}>
          {item.tag}
        </div>
      </div>

      {/* ── DEFAULT: avatar + name + hint ── */}
      <div className="absolute flex flex-col items-center" style={{
        inset: 0, justifyContent: "flex-end", padding: "1.5rem", zIndex: 5,
        opacity: hovered ? 0 : 1,
        transform: hovered ? "translateY(8px)" : "translateY(0)",
        transition: "opacity 0.3s, transform 0.3s",
        pointerEvents: "none",
      }}>
        <div style={{
          position: "relative", width: 72, height: 72, borderRadius: "50%",
          overflow: "hidden", flexShrink: 0,
          border: `3px solid ${item.accent}`,
          boxShadow: `0 0 0 4px ${item.accent}22`,
          marginBottom: 12,
        }}>
          <AvatarImg src={item.avatar} name={item.name} accent={item.accent} fontSize="1.25rem" />
        </div>
        <p style={{ color: "#111827", fontWeight: 700, fontSize: "1rem", margin: 0, textAlign: "center" }}>
          {item.name}
        </p>
        <p style={{ color: "#6b7280", fontSize: "0.8rem", margin: "4px 0 8px", textAlign: "center" }}>
          {item.designation}
        </p>
        <Stars color={item.accent} />
        <p style={{ marginTop: 12, fontSize: "0.72rem", color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          {isVideo ? "Hover to watch" : "Hover to read"}
        </p>
      </div>

      {/* ── HOVER VIDEO: quote ── */}
      {isVideo && (
        <div className="absolute flex flex-col justify-end" style={{
          inset: 0, padding: "1.5rem", zIndex: 10,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
          pointerEvents: "none",
        }}>
          <Stars color="#fff" />
          <Quote size={24} color="rgba(255,255,255,0.5)" style={{ margin: "10px 0 8px" }} />
          <p style={{ color: "#fff", fontWeight: 600, fontSize: "1rem", lineHeight: 1.5, margin: 0 }}>
            "{item.quote}"
          </p>
          <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              position: "relative", width: 36, height: 36, borderRadius: "50%",
              overflow: "hidden", flexShrink: 0,
              border: "2px solid rgba(255,255,255,0.6)",
            }}>
              <AvatarImg src={item.avatar} name={item.name} accent="#fff" fontSize="0.65rem" />
            </div>
            <div>
              <p style={{ color: "#fff", fontWeight: 700, fontSize: "0.85rem", margin: 0 }}>{item.name}</p>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", margin: 0 }}>{item.designation}</p>
            </div>
          </div>
        </div>
      )}

      {/* ── HOVER TEXT: full review ── */}
      {!isVideo && (
        <div className="absolute flex flex-col justify-between" style={{
          inset: 0, padding: "4.5rem 1.5rem 1.5rem", zIndex: 10,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s",
          pointerEvents: "none",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: "2.5rem" }}>
            <div style={{
              position: "relative", width: 48, height: 48, borderRadius: "50%",
              overflow: "hidden", flexShrink: 0,
              border: `2px solid ${item.accent}`,
            }}>
              <AvatarImg src={item.avatar} name={item.name} accent={item.accent} fontSize="0.75rem" />
            </div>
            <div>
              <p style={{ color: "#111827", fontWeight: 700, fontSize: "0.95rem", margin: 0 }}>{item.name}</p>
              <p style={{ color: "#6b7280", fontSize: "0.78rem", margin: "2px 0 0" }}>{item.designation}</p>
            </div>
          </div>

          <div>
            <Quote size={28} color={item.accent} style={{ marginBottom: 10, opacity: 0.6 }} />
            <p style={{
              color: "#374151", fontSize: "0.875rem", lineHeight: 1.75, margin: 0,
              display: "-webkit-box", WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical", overflow: "hidden",
            }}>
              {item.review}
            </p>
          </div>

          <Stars color={item.accent} />
        </div>
      )}

      {/* ── Accent bottom bar ── */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 3,
        background: item.accent,
        transform: hovered ? "scaleX(1)" : "scaleX(0)",
        transformOrigin: "left",
        transition: "transform 0.4s cubic-bezier(.4,0,.2,1)",
        zIndex: 20,
        borderRadius: "0 0 20px 20px",
      }} />
    </div>
  );
}

export default function TestimonialSection({ testimonials = [] }) {
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
        * { box-sizing: border-box; }
        .t-scroll::-webkit-scrollbar { display: none; }
        .t-scroll { -ms-overflow-style: none; scrollbar-width: none; }
        .nav-btn { transition: transform 0.2s, background 0.2s, border-color 0.2s; }
        .nav-btn:hover { transform: scale(1.08); background: #f3f4f6 !important; }
      `}</style>

      <section style={{ background: "#f9fafb", padding: "5rem 0 6rem", position: "relative", overflow: "hidden" }}>

        {/* Soft bg blobs */}
        <div style={{
          position: "absolute", top: "-8%", left: "15%",
          width: 500, height: 500, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(108,99,255,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <div style={{
          position: "absolute", bottom: "-8%", right: "10%",
          width: 400, height: 400, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(14,165,233,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* ── Header ── */}
        <div className="text-center px-6 mb-12">
          <span className="inline-flex items-center gap-2 bg-gradient-to-r from-violet-600 via-violet-500 to-blue-500 text-white text-sm font-semibold px-5 py-2 rounded-full shadow-lg shadow-violet-500/30 ring-1 ring-white/20"
            >
            Testimonials
          </span>

          <h2 className="py-4 font-black tracking-tight" style={{
            fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
            color: "#111827", lineHeight: 1.12,
            letterSpacing: "-0.03em",
            margin: "0 auto", maxWidth: 560,
          }}>
            What Our Clients<br />
            <span style={{ color: "#6c63ff" }}>Say About Us</span>
          </h2>

          <p className="text-sm" style={{ color: "#6b7280", maxWidth: 400, margin: "1rem auto 0", lineHeight: 1.7 }}>
            Real stories from real people — hover a card to watch their video or read their full review.
          </p>

          {/* Legend */}
          <div className="flex items-center justify-center gap-6 mt-5">
            {[
              { Icon: Play, label: "Video Review", filled: true },
              { Icon: MessageSquare, label: "Text Review", filled: false },
            ].map(({ Icon, label, filled }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex items-center justify-center rounded-full w-6 h-6"
                  style={{ background: "rgba(108,99,255,0.1)" }}>
                  <Icon size={9} fill={filled ? "#6c63ff" : "none"} color="#6c63ff" strokeWidth={filled ? 0 : 2.5} />
                </div>
                <span className="text-xs" style={{ color: "#6b7280" }}>{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Cards row ── */}
        <div className="relative">
          <div style={{
            position: "absolute", left: 0, top: 0, bottom: 0, width: 80, zIndex: 10,
            background: "linear-gradient(to right, #f9fafb, transparent)", pointerEvents: "none",
          }} />
          <div style={{
            position: "absolute", right: 0, top: 0, bottom: 0, width: 80, zIndex: 10,
            background: "linear-gradient(to left, #f9fafb, transparent)", pointerEvents: "none",
          }} />

          <div ref={scrollRef} className="t-scroll flex gap-5"
            onMouseDown={onMouseDown} onMouseMove={onMouseMove}
            onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
            style={{
              overflowX: "auto", padding: "1rem 5rem 2rem",
              cursor: dragging ? "grabbing" : "grab", userSelect: "none",
            }}>
            {testimonials.map((item) => (
              <div key={item.id} style={{ width: 300, flexShrink: 0 }}>
                <TestimonialCard item={item} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Nav ── */}
        <div className="flex items-center justify-center gap-4 mt-4">
          <button className="nav-btn flex items-center justify-center rounded-full"
            onClick={() => scrollBy(-1)}
            style={{ width: 44, height: 44, background: "#fff", border: "1.5px solid #e5e7eb", cursor: "pointer", color: "#374151" }}>
            <ChevronLeft size={16} strokeWidth={2.2} />
          </button>

          <div className="flex gap-1.5">
            {testimonials.map((t, i) => (
              <div key={i} style={{
                height: 6, borderRadius: 9999,
                width: i === 0 ? 20 : 6,
                background: i === 0 ? "#6c63ff" : "#d1d5db",
                transition: "width 0.3s",
              }} />
            ))}
          </div>

          <button className="nav-btn flex items-center justify-center rounded-full"
            onClick={() => scrollBy(1)}
            style={{ width: 44, height: 44, background: "#fff", border: "1.5px solid #e5e7eb", cursor: "pointer", color: "#374151" }}>
            <ChevronRight size={16} strokeWidth={2.2} />
          </button>
        </div>
      </section>
    </>
  );
}