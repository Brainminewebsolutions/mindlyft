"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button }     from "@/components/ui/button";
import { CourseForm }    from "@/components/admin/courses/CourseForm";
import { ChapterSection } from "@/components/admin/courses/ChapterSection";
import { courseService }        from "@/services/admin/courseService";
import type { Course }          from "@/types/admin/course";

export default function EditCoursePage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();

  const [course,     setCourse]     = useState<Course | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  useEffect(() => {
    courseService.getById(id)
      .then((data) => setCourse(data))
      .catch(() => setError("Failed to load course"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);
    try {
      await courseService.update(id, data);
      router.push("/admin/courses");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-[560px] animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-sm text-muted-foreground">Course not found</p>
        <Button variant="link" className="mt-2" onClick={() => router.push("/admin/courses")}>
          Back to courses
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0" onClick={() => router.push("/admin/courses")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Edit Course</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Editing <span className="font-medium text-foreground">"{course.name}"</span>
          </p>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Form card */}
      <div className="rounded-xl border border-border bg-card p-6">
        <CourseForm
          mode="edit"
          defaultValues={course}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/courses")}
          isLoading={submitting}
        />
      </div>

      {/* Course curriculum */}
      <ChapterSection courseId={id} />
    </div>
  );
}
