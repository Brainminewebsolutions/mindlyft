"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button }      from "@/components/ui/button";
import { WebinarForm } from "@/components/admin/webinars/WebinarForm";
import { webinarService } from "@/services/admin/webinarService";

export default function AddWebinarPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  const handleSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);
    try {
      await webinarService.create(data);
      router.push("/admin/webinars");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0"
          onClick={() => router.push("/admin/webinars")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Add Workshop / Webinar</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Schedule a new live session</p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-border bg-card p-6">
        <WebinarForm
          mode="create"
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/webinars")}
          isLoading={submitting}
        />
      </div>
    </div>
  );
}
