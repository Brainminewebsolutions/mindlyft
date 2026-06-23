"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button }           from "@/components/ui/button";
import { TestimonialForm }  from "@/components/admin/testimonials/TestimonialForm";
import { testimonialService } from "@/services/admin/testimonialService";

export default function AddTestimonialPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await testimonialService.create(data);
      toast.success("Testimonial created successfully.");
      router.push("/admin/testimonials");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create testimonial.");
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
          <h1 className="text-xl font-semibold text-foreground">Add New Testimonial</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Fill in the details to add a client testimonial
          </p>
        </div>
      </div>

      <TestimonialForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/testimonials")}
        isLoading={submitting}
      />
    </div>
  );
}
