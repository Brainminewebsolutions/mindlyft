"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import {
  PlayCircle, FileText, ChevronDown, ChevronLeft, ChevronRight,
  BookOpen, Lock, CheckCircle2, Loader2,
} from "lucide-react";
import { LessonVideo } from "@/components/student/LessonVideo";
import { CourseCertificateBanner } from "@/components/student/CourseCertificateBanner";
import { COMPLETION_PERCENT } from "@/hooks/useWatchProgress";
import { studentCoursesService } from "@/services/student/studentCoursesService";
import type {
  PlayerChapterItem, PlayerContentItem, LessonProgressResult, PurchasedCourse,
} from "@/types/student/course";

interface Props {
  course:   PurchasedCourse;
  chapters: PlayerChapterItem[];
}

export function CourseViewer({ course, chapters: initialChapters }: Props) {
  /* chapters live in state so progress responses can unlock lessons in place */
  const [chapters, setChapters] = useState<PlayerChapterItem[]>(initialChapters);
  const chaptersRef = useRef(chapters);
  chaptersRef.current = chapters;

  /* sorted chapters + lessons (course-wide order — same as the server) */
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

  const allLessons     = useMemo(() => sorted.flatMap((ch) => ch.contents), [sorted]);
  const completedCount = allLessons.filter((l) => l.isCompleted).length;
  const courseDone     = allLessons.length > 0 && completedCount === allLessons.length;

  /* start on the first unlocked lesson that isn't finished yet */
  const [activeId, setActiveId] = useState<string | null>(() => {
    const flat = initialChapters
      .slice().sort((a, b) => a.order - b.order)
      .flatMap((ch) => ch.contents.slice().sort((a, b) => a.order - b.order));
    return (flat.find((l) => !l.isLocked && !l.isCompleted) ?? flat[0] ?? null)?.id ?? null;
  });

  const [expanded, setExpanded] = useState<Set<string>>(() => {
    const parent = initialChapters.find((ch) => ch.contents.some((l) => l.id === activeId));
    return new Set(parent ? [parent.id] : initialChapters[0] ? [initialChapters[0].id] : []);
  });

  const [completing, setCompleting] = useState(false);

  /* derived active + navigation */
  const active      = allLessons.find((l) => l.id === activeId) ?? null;
  const activeIndex = allLessons.findIndex((l) => l.id === activeId);
  const prevLesson  = activeIndex > 0 ? allLessons[activeIndex - 1] : null;
  const nextLesson  = activeIndex >= 0 && activeIndex < allLessons.length - 1 ? allLessons[activeIndex + 1] : null;
  const canGoNext   = !!nextLesson && !nextLesson.isLocked;

  function selectLesson(lesson: PlayerContentItem) {
    if (lesson.isLocked) return;
    setActiveId(lesson.id);
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

  /* merge a progress response: update this lesson + unlock the next one */
  const applyResult = useCallback((result: LessonProgressResult) => {
    const before = chaptersRef.current
      .flatMap((ch) => ch.contents)
      .find((l) => l.id === result.contentId);
    const justCompleted = result.isCompleted && !!before && !before.isCompleted;

    setChapters((prev) =>
      prev.map((ch) => ({
        ...ch,
        contents: ch.contents.map((l) => {
          if (l.id === result.contentId) {
            return {
              ...l,
              watchedPercent: Math.max(l.watchedPercent, result.watchedPercent),
              isCompleted:    l.isCompleted || result.isCompleted,
            };
          }
          if (result.nextLesson && l.id === result.nextLesson.id) return result.nextLesson;
          return l;
        }),
      })),
    );

    if (justCompleted) {
      toast.success(result.courseCompleted
        ? "Course completed — your certificate is ready!"
        : "Next lesson unlocked");
    }
  }, []);

  const reportProgress = useCallback(
    async (contentId: string, percent: number) => {
      try {
        const result = await studentCoursesService.updateProgress(course.courseId, contentId, percent);
        applyResult(result);
        return true;
      } catch {
        return false;
      }
    },
    [course.courseId, applyResult],
  );

  async function markTextLessonComplete() {
    if (!active) return;
    setCompleting(true);
    try {
      applyResult(await studentCoursesService.completeLesson(course.courseId, active.id));
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not mark lesson as complete");
    } finally {
      setCompleting(false);
    }
  }

  const nextHint =
    !nextLesson || canGoNext
      ? null
      : active?.hasVideo
        ? `Watch ${COMPLETION_PERCENT}% to continue`
        : "Mark complete to continue";

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
        disabled={!canGoNext}
        title={nextHint ?? undefined}
        onClick={() => nextLesson && selectLesson(nextLesson)}
        className={cn(
          "flex items-center gap-1.5 text-sm font-medium rounded-lg px-3 py-1.5 transition-colors",
          canGoNext ? "text-violet-700 hover:bg-violet-100" : "text-gray-300 cursor-not-allowed",
        )}
      >
        {nextHint ? (
          <>
            <Lock size={13} />
            {nextHint}
          </>
        ) : (
          <>
            Next
            <ChevronRight size={15} />
          </>
        )}
      </button>
    </div>
  );

  return (
    <div className="space-y-4">
    {courseDone && <CourseCertificateBanner courseId={course.courseId} />}

    <div className="flex flex-col lg:flex-row gap-4 items-start">

      {/* ══════════════════════════════════════════════════════
          LEFT — Chapter / lesson navigation (own card)
      ══════════════════════════════════════════════════════ */}
      <aside className="w-full lg:w-72 xl:w-80 shrink-0 rounded-xl border border-border flex flex-col bg-white shadow-sm lg:sticky lg:top-[104px] lg:max-h-[calc(100vh-120px)] lg:overflow-hidden">

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

          {/* Overall progress */}
          <div className="mt-2.5 pl-5">
            <div className="flex items-center justify-between text-[10px] text-gray-500 mb-1">
              <span>{completedCount} of {allLessons.length} completed</span>
              <span className="font-semibold text-violet-600">
                {allLessons.length ? Math.round((completedCount / allLessons.length) * 100) : 0}%
              </span>
            </div>
            <progress
              value={completedCount}
              max={Math.max(allLessons.length, 1)}
              className="block h-1.5 w-full overflow-hidden rounded-full appearance-none bg-gray-200 [&::-webkit-progress-bar]:bg-gray-200 [&::-webkit-progress-value]:bg-gradient-to-r [&::-webkit-progress-value]:from-violet-500 [&::-webkit-progress-value]:to-blue-500 [&::-moz-progress-bar]:bg-violet-500"
            />
          </div>
        </div>

        {/* Chapter list — scrolls inside the sticky sidebar */}
        <div className="flex-1 overflow-y-auto divide-y divide-border">
          {sorted.map((chapter, chIdx) => {
            const isOpen      = expanded.has(chapter.id);
            const hasActive   = chapter.contents.some((l) => l.id === activeId);
            const chapterDone = chapter.contents.length > 0 && chapter.contents.every((l) => l.isCompleted);

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
                      chapterDone
                        ? "bg-emerald-500 text-white"
                        : hasActive
                          ? "bg-violet-600 text-white"
                          : "bg-gray-200 text-gray-600",
                    )}
                  >
                    {chapterDone ? <CheckCircle2 size={12} /> : chIdx + 1}
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
                      {chapter.contents.filter((l) => l.isCompleted).length}/{chapter.contents.length} lesson
                      {chapter.contents.length !== 1 ? "s" : ""}
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

                {/* Lesson list */}
                {isOpen && (
                  <ul className="bg-gray-50/60">
                    {chapter.contents.map((lesson, lIdx) => {
                      const isActive = lesson.id === activeId;
                      return (
                        <li key={lesson.id}>
                          <button
                            type="button"
                            disabled={lesson.isLocked}
                            title={lesson.isLocked ? "Complete the previous lesson to unlock" : undefined}
                            onClick={() => selectLesson(lesson)}
                            className={cn(
                              "w-full flex items-start gap-2.5 px-4 py-2.5 pl-9 text-left transition-colors border-l-2",
                              isActive
                                ? "bg-violet-50 border-l-violet-500"
                                : "border-l-transparent",
                              lesson.isLocked
                                ? "cursor-not-allowed opacity-60"
                                : !isActive && "hover:bg-gray-100",
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
                                isActive ? "text-violet-900" : lesson.isLocked ? "text-gray-400" : "text-gray-700",
                              )}
                            >
                              {lesson.title}
                            </p>

                            {/* Status / content type icon */}
                            {lesson.isLocked ? (
                              <Lock size={13} className="shrink-0 mt-0.5 text-gray-400" />
                            ) : lesson.isCompleted ? (
                              <CheckCircle2 size={13} className="shrink-0 mt-0.5 text-emerald-500" />
                            ) : lesson.hasVideo ? (
                              <PlayCircle
                                size={13}
                                className={cn("shrink-0 mt-0.5", isActive ? "text-violet-600" : "text-gray-400")}
                              />
                            ) : (
                              <FileText
                                size={13}
                                className={cn("shrink-0 mt-0.5", isActive ? "text-violet-600" : "text-gray-400")}
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

        <div>
          {/* Video player or placeholder */}
          {active?.videoUrl ? (
            <LessonVideo
              key={active.id}
              videoUrl={active.videoUrl}
              title={active.title}
              initialPercent={active.watchedPercent}
              isCompleted={active.isCompleted}
              report={(percent) => reportProgress(active.id, percent)}
            />
          ) : (
            <div className="w-full aspect-video flex items-center justify-center bg-gray-100 border-b border-border">
              <div className="text-center px-6">
                <FileText className="mx-auto mb-2.5 size-12 text-gray-300" />
                <p className="text-sm font-medium text-gray-500">No video for this lesson</p>
                <p className="text-xs text-gray-400 mt-1">Read the description below</p>

                {active && !active.hasVideo && (
                  active.isCompleted ? (
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600">
                      <CheckCircle2 size={14} />
                      Lesson completed
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={markTextLessonComplete}
                      disabled={completing}
                      className="mt-4 inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-60"
                    >
                      {completing ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle2 size={14} />}
                      Mark as complete
                    </button>
                  )
                )}
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
    </div>
  );
}
