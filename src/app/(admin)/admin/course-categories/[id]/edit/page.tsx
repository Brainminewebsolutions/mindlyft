"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button }              from "@/components/ui/button";
import { CourseCategoryForm }  from "@/components/admin/course-categories/CourseCategoryForm";
import { courseCategoryService } from "@/services/admin/courseCategoryService";
import type { CourseCategory } from "@/types/admin/courseCategory";

export default function EditCourseCategoryPage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();
  const numId    = Number(id);

  const [category,   setCategory]   = useState<CourseCategory | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  useEffect(() => {
    courseCategoryService.getById(numId)
      .then((data) => setCategory(data))
      .catch(() => setError("Failed to load category"))
      .finally(() => setLoading(false));
  }, [numId]);

  const handleSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);
    try {
      await courseCategoryService.update(numId, data);
      router.push("/admin/course-categories");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center">
        <p className="text-sm font-medium text-foreground">Category not found</p>
        <Button className="mt-4" variant="outline" onClick={() => router.push("/admin/course-categories")}>
          Back to Categories
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0" onClick={() => router.push("/admin/course-categories")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Edit Category</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Update details for "{category.name}"</p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-border bg-card p-6">
        <CourseCategoryForm
          mode="edit"
          defaultValues={category}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/course-categories")}
          isLoading={submitting}
        />
      </div>
    </div>
  );
}
