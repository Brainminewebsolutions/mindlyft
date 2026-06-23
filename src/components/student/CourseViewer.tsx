"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import {
  PlayCircle, FileText, ChevronDown,
  ChevronLeft, ChevronRight, BookOpen,
} from "lucide-react";
import type { CourseChapterItem, CourseContentItem, PurchasedCourse } from "@/types/student/course";

interface Props {
  course:   PurchasedCourse;
  chapters: CourseChapterItem[];
}

export function CourseViewer({ chapters }: Props) {
  /* sorted chapters + lessons */
  const sorted = useMemo(
    () =>
      chapters
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((ch) => ({
          ...ch,
          contents: ch.contents.slice().sort((a, b) => a.order - b.order),
        })),
    [chapters],
  );

  const allLessons = useMemo(() => sorted.flatMap((ch) => ch.contents), [sorted]);

  const firstLesson = allLessons.find((l) => l.videoUrl) ?? allLessons[0] ?? null;

  const [activeId, setActiveId] = useState<string | null>(firstLesson?.id ?? null);

  /* chapters that are open in the accordion */
  const initialExpanded = useMemo<Set<string>>(() => {
    const s = new Set<string>();
    const parent = sorted.find((ch) => ch.contents.some((l) => l.id === firstLesson?.id));
    if (parent) s.add(parent.id);
    else if (sorted[0]) s.add(sorted[0].id);
    return s;
  }, [sorted, firstLesson]);

  const [expanded, setExpanded] = useState<Set<string>>(initialExpanded);

  /* derived active + navigation */
  const active      = allLessons.find((l) => l.id === activeId) ?? null;
  const activeIndex = allLessons.findIndex((l) => l.id === activeId);
  const prevLesson  = activeIndex > 0 ? allLessons[activeIndex - 1] : null;
  const nextLesson  = activeIndex < allLessons.length - 1 ? allLessons[activeIndex + 1] : null;

  function selectLesson(lesson: CourseContentItem) {
    setActiveId(lesson.id);
    /* auto-expand the chapter that contains this lesson */
    const parent = sorted.find((ch) => ch.contents.some((l) => l.id === lesson.id));
    if (parent) setExpanded((prev) => new Set([...prev, parent.id]));
  }

  function toggleChapter(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  /* shared prev/next bar rendered in both top and bottom slots */
  const NavBar = ({ border }: { border: "bottom" | "top" }) => (
    <div
      className={cn(
        "shrink-0 bg-gray-50 px-6 py-2.5 flex items-center justify-between",
        border === "bottom" ? "border-t border-border" : "border-b border-border",
      )}
    >
      <button
        type="button"
        disabled={!prevLesson}
        onClick={() => prevLesson && selectLesson(prevLesson)}
        className={cn(
          "flex items-center gap-1.5 text-sm font-medium rounded-lg px-3 py-1.5 transition-colors",
          prevLesson ? "text-gray-700 hover:bg-gray-200" : "text-gray-300 cursor-not-allowed",
        )}
      >
        <ChevronLeft size={15} />
        Previous
      </button>

      <span className="text-xs text-gray-400 tabular-nums">
        {activeIndex >= 0 ? activeIndex + 1 : "—"} / {allLessons.length}
      </span>

      <button
        type="button"
        disabled={!nextLesson}
        onClick={() => nextLesson && selectLesson(nextLesson)}
        className={cn(
          "flex items-center gap-1.5 text-sm font-medium rounded-lg px-3 py-1.5 transition-colors",
          nextLesson ? "text-gray-700 hover:bg-gray-200" : "text-gray-300 cursor-not-allowed",
        )}
      >
        Next
        <ChevronRight size={15} />
      </button>
    </div>
  );

  return (
    <div className="flex gap-4 items-start">

      {/* ══════════════════════════════════════════════════════
          LEFT — Chapter / lesson navigation (own card)
      ══════════════════════════════════════════════════════ */}
      <aside className="w-72 lg:w-80 shrink-0 rounded-xl border border-border flex flex-col bg-white shadow-sm sticky top-[104px] max-h-[calc(100vh-120px)] overflow-hidden">

        {/* Sidebar header */}
        <div className="px-4 py-3.5 border-b border-border bg-gray-50 shrink-0">
          <div className="flex items-center gap-2">
            <BookOpen size={14} className="text-muted-foreground" />
            <p className="text-sm font-semibold text-foreground">Course Content</p>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5 pl-5">
            {sorted.length} chapter{sorted.length !== 1 ? "s" : ""} &middot;{" "}
            {allLessons.length} lesson{allLessons.length !== 1 ? "s" : ""}
          </p>
        </div>

        {/* Chapter list — scrolls inside the sticky sidebar */}
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {sorted.map((chapter, chIdx) => {
            const isOpen      = expanded.has(chapter.id);
            const hasActive   = chapter.contents.some((l) => l.id === activeId);

            return (
              <div key={chapter.id}>

                {/* Chapter header row */}
                <button
                  type="button"
                  onClick={() => toggleChapter(chapter.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 text-left transition-colors",
                    hasActive ? "bg-violet-50" : "hover:bg-gray-50",
                  )}
                >
                  {/* Chapter number bubble */}
                  <div
                    className={cn(
                      "w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0",
                      hasActive
                        ? "bg-violet-600 text-white"
                        : "bg-gray-200 text-gray-600",
                    )}
                  >
                    {chIdx + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <p
                      className={cn(
                        "text-[12.5px] font-semibold truncate",
                        hasActive ? "text-violet-900" : "text-gray-800",
                      )}
                    >
                      {chapter.title}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {chapter.contents.length} lesson{chapter.contents.length !== 1 ? "s" : ""}
                    </p>
                  </div>

                  <ChevronDown
                    size={14}
                    className={cn(
                      "shrink-0 text-gray-400 transition-transform duration-200",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>

                {/* Lesson list (animated accordion) */}
                {isOpen && (
                  <ul className="bg-gray-50/60">
                    {chapter.contents.map((lesson, lIdx) => {
                      const isActive = lesson.id === activeId;
                      return (
                        <li key={lesson.id}>
                          <button
                            type="button"
                            onClick={() => selectLesson(lesson)}
                            className={cn(
                              "w-full flex items-start gap-2.5 px-4 py-2.5 pl-9 text-left transition-colors border-l-2",
                              isActive
                                ? "bg-violet-50 border-l-violet-500"
                                : "border-l-transparent hover:bg-gray-100",
                            )}
                          >
                            {/* Lesson number */}
                            <span
                              className={cn(
                                "text-[10px] font-semibold shrink-0 mt-[3px] w-4 text-right",
                                isActive ? "text-violet-600" : "text-gray-400",
                              )}
                            >
                              {lIdx + 1}
                            </span>

                            {/* Lesson title */}
                            <p
                              className={cn(
                                "flex-1 min-w-0 text-[12px] font-medium leading-snug",
                                isActive ? "text-violet-900" : "text-gray-700",
                              )}
                            >
                              {lesson.title}
                            </p>

                            {/* Content type icon */}
                            {lesson.videoUrl ? (
                              <PlayCircle
                                size={13}
                                className={cn(
                                  "shrink-0 mt-0.5",
                                  isActive ? "text-violet-600" : "text-gray-400",
                                )}
                              />
                            ) : (
                              <FileText
                                size={13}
                                className={cn(
                                  "shrink-0 mt-0.5",
                                  isActive ? "text-violet-600" : "text-gray-400",
                                )}
                              />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

              </div>
            );
          })}
        </div>
      </aside>

      {/* ══════════════════════════════════════════════════════
          RIGHT — Content viewer (own card)
      ══════════════════════════════════════════════════════ */}
      <div className="flex-1 min-w-0 rounded-xl border border-border flex flex-col shadow-sm bg-white">

        {/* ── TOP navigation bar ── */}
        <NavBar border="bottom" />

        {/* Content area — grows with content */}
        <div>

          {/* Video player or placeholder */}
          {active?.videoUrl ? (
            active.videoUrl.includes("player.vimeo.com") ? (
              <div className="bg-black w-full aspect-video">
                <iframe
                  key={active.videoUrl}
                  src={active.videoUrl}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
                  allowFullScreen
                  title={active.title}
                />
              </div>
            ) : (
              <div className="bg-black w-full">
                <video
                  key={active.videoUrl}
                  src={active.videoUrl}
                  controls
                  controlsList="nodownload"
                  className="w-full aspect-video"
                />
              </div>
            )
          ) : (
            <div className="w-full aspect-video flex items-center justify-center bg-gray-100 border-b border-border">
              <div className="text-center">
                <FileText className="mx-auto mb-2.5 size-12 text-gray-300" />
                <p className="text-sm font-medium text-gray-500">No video for this lesson</p>
                <p className="text-xs text-gray-400 mt-1">Read the description below</p>
              </div>
            </div>
          )}

          {/* Lesson details */}
          {active ? (
            <div className="px-6 py-5 space-y-3">
              <h2 className="text-lg font-bold text-gray-900">{active.title}</h2>
              {active.description ? (
                <p className="text-sm text-gray-600 leading-relaxed">{active.description}</p>
              ) : (
                <p className="text-sm text-gray-400 italic">No description for this lesson.</p>
              )}
            </div>
          ) : (
            <div className="px-6 py-12 text-center">
              <p className="text-sm text-muted-foreground">Select a lesson to begin</p>
            </div>
          )}

        </div>

        {/* ── BOTTOM navigation bar ── */}
        <NavBar border="top" />

      </div>
    </div>
  );
}
