"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogForm } from "@/components/admin/blog/BlogForm";
import { blogService } from "@/services/admin/blogService";

export default function AddBlogPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const handleSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);

    // Debug: log every FormData field being sent to the API
    console.group("📝 Create Blog — FormData payload");
    for (const [key, value] of data.entries()) {
      if (value instanceof File) {
        console.log(`  ${key}:`, `File(${value.name}, ${value.size}b, ${value.type})`);
      } else {
        console.log(`  ${key}:`, value);
      }
    }
    console.groupEnd();

    try {
      const result = await blogService.create(data);
      console.log("✅ Blog created:", result);
      router.push("/admin/blog");
    } catch (err) {
      console.error("❌ Blog create failed:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          className="-ml-1 shrink-0"
          onClick={() => router.push("/admin/blog")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Add New Article</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Fill in the details to create a blog article
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-border bg-card p-6">
        <BlogForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/blog")}
          isLoading={submitting}
        />
      </div>
    </div>
  );
}
