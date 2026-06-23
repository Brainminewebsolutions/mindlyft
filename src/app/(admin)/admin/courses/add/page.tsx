"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button }       from "@/components/ui/button";
import { CourseForm }   from "@/components/admin/courses/CourseForm";
import { courseService } from "@/services/admin/courseService";

export default function AddCoursePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const handleSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);
    try {
      await courseService.create(data);
      router.push("/admin/courses");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0" onClick={() => router.push("/admin/courses")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Add New Course</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Fill in the details to add a course to your catalog
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
          mode="create"
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/courses")}
          isLoading={submitting}
        />
      </div>
    </div>
  );
}
