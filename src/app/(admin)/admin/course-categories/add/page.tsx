"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button }              from "@/components/ui/button";
import { CourseCategoryForm }  from "@/components/admin/course-categories/CourseCategoryForm";
import { courseCategoryService } from "@/services/admin/courseCategoryService";

export default function AddCourseCategoryPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const handleSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);
    try {
      await courseCategoryService.create(data);
      router.push("/admin/course-categories");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0" onClick={() => router.push("/admin/course-categories")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Add Course Category</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Fill in the details to create a new category</p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-border bg-card p-6">
        <CourseCategoryForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/course-categories")}
          isLoading={submitting}
        />
      </div>
    </div>
  );
}
