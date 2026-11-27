"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  Loader2, Clock, User, Globe, Wifi, MapPin, ChevronLeft,
} from "lucide-react";

import { Badge }        from "@/components/ui/badge";
import { CourseViewer } from "@/components/student/CourseViewer";

import { studentCoursesService }                   from "@/services/student/studentCoursesService";
import type { PurchasedCourse, PlayerChapterItem } from "@/types/student/course";

export default function CoursePage() {
  const { courseId: rawId } = useParams<{ courseId: string }>();
  const courseId = parseInt(rawId, 10);

  const [course,   setCourse]   = useState<PurchasedCourse | null>(null);
  const [chapters, setChapters] = useState<PlayerChapterItem[]>([]);
  const [loading,  setLoading]  = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (isNaN(courseId)) { setNotFound(true); setLoading(false); return; }

    Promise.all([
      studentCoursesService.getMyCourses(),
      studentCoursesService.getCourseChapters(courseId),
    ])
      .then(([purchases, chapterData]) => {
        const found = purchases.find((p) => p.courseId === courseId);
        if (!found) { setNotFound(true); return; }
        setCourse(found);
        setChapters(chapterData);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [courseId]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  /* ── Not found ── */
  if (notFound || !course) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-sm font-medium text-foreground">Course not found</p>
        <Link href="/student/courses" className="mt-3 text-xs text-primary hover:underline">
          Back to My Courses
        </Link>
      </div>
    );
  }

  const hasContent = chapters.some((ch) => ch.contents.length > 0);

  return (
    <div className="space-y-4">
      {/* ── Compact course header ── */}
      <header className="flex flex-wrap items-start justify-between gap-3">

        {/* Left: back + title */}
        <div>
          <Link
            href="/student/courses"
            className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition mb-1.5"
          >
            <ChevronLeft size={13} />
            My Courses
          </Link>
          <h1 className="text-xl font-bold text-foreground leading-tight">
            {course.courseName}
          </h1>
        </div>

        {/* Right: meta chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
          <span className="flex items-center gap-1">
            <User size={12} className="shrink-0" />
            {course.instructor}
          </span>
          <span className="flex items-center gap-1">
            <Globe size={12} className="shrink-0" />
            {course.language}
          </span>
          <span className="flex items-center gap-1">
            <Clock size={12} className="shrink-0" />
            {course.duration}h
          </span>
          <Badge variant="outline" className="gap-1 text-[10px] py-0">
            {course.mode === "Online"
              ? <Wifi size={9} />
              : <MapPin size={9} />}
            {course.mode}
          </Badge>
        </div>
      </header>

      {/* ── Viewer ── */}
      <div>
        {hasContent ? (
          <CourseViewer course={course} chapters={chapters} />
        ) : (
          <div className="h-full flex flex-col items-center justify-center rounded-xl border border-border bg-muted text-center">
            <p className="text-sm font-medium text-foreground">No content yet</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Course content will appear here once it is added.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
