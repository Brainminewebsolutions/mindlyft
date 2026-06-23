"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button }           from "@/components/ui/button";
import { TestimonialForm }  from "@/components/admin/testimonials/TestimonialForm";
import { testimonialService } from "@/services/admin/testimonialService";
import type { Testimonial } from "@/types/admin/testimonial";

export default function EditTestimonialPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  const [testimonial, setTestimonial] = useState<Testimonial | null>(null);
  const [fetching,    setFetching]    = useState(true);
  const [fetchError,  setFetchError]  = useState<string | null>(null);
  const [submitting,  setSubmitting]  = useState(false);

  useEffect(() => {
    testimonialService.getById(Number(id))
      .then(setTestimonial)
      .catch(() => setFetchError("Testimonial not found."))
      .finally(() => setFetching(false));
  }, [id]);

  const handleSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await testimonialService.update(Number(id), data);
      toast.success("Testimonial updated successfully.");
      router.push("/admin/testimonials");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update testimonial.");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0" onClick={() => router.push("/admin/testimonials")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Edit Testimonial</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {testimonial ? `Editing testimonial from ${testimonial.name}` : "Loading…"}
          </p>
        </div>
      </div>

      {fetching ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
        </div>
      ) : fetchError ? (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="text-sm text-muted-foreground">{fetchError}</p>
          <Button variant="link" className="mt-2" onClick={() => router.push("/admin/testimonials")}>
            Back to testimonials
          </Button>
        </div>
      ) : testimonial ? (
        <TestimonialForm
          mode="edit"
          defaultValues={testimonial}
          onSubmit={handleSubmit}
          onCancel={() => router.push("/admin/testimonials")}
          isLoading={submitting}
        />
      ) : null}
    </div>
  );
}
