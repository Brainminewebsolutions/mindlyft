"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { Button }         from "@/components/ui/button";
import { WebinarForm }    from "@/components/admin/webinars/WebinarForm";
import { webinarService } from "@/services/admin/webinarService";
import type { Webinar }   from "@/types/admin/webinar";

export default function EditWebinarPage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();

  const [webinar,    setWebinar]    = useState<Webinar | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error,      setError]      = useState<string | null>(null);

  useEffect(() => {
    webinarService.getById(id)
      .then((data) => setWebinar(data))
      .catch(() => setError("Failed to load session"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: FormData) => {
    setSubmitting(true);
    setError(null);
    try {
      await webinarService.update(id, data);
      router.push("/admin/webinars");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="h-[600px] animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (!webinar) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-sm text-muted-foreground">Session not found</p>
        <Button variant="link" className="mt-2" onClick={() => router.push("/admin/webinars")}>
          Back to sessions
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0"
          onClick={() => router.push("/admin/webinars")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Edit {webinar.type}</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Editing <span className="font-medium text-foreground">"{webinar.name}"</span>
          </p>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <div className="rounded-xl border border-border bg-card p-6">
        <WebinarForm
          mode="edit"
          defaultValues={webinar}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/webinars")}
          isLoading={submitting}
        />
      </div>
    </div>
  );
}
