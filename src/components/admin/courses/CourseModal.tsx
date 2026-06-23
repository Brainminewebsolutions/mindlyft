"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { CourseForm } from "./CourseForm";
import { Button }    from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Course } from "@/types/admin/course";

type Props = {
  mode:      "create" | "edit";
  course?:   Course;
  isOpen:    boolean;
  isLoading: boolean;
  onClose:   () => void;
  onSubmit:  (data: FormData) => Promise<void>;
};

export function CourseModal({ mode, course, isOpen, isLoading, onClose, onSubmit }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal panel */}
      <div className="relative flex w-full max-w-lg flex-col rounded-xl border border-border bg-background shadow-2xl max-h-[90vh]">

        {/* Header */}
        <div className="flex shrink-0 items-center justify-between px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              {mode === "create" ? "Add New Course" : "Edit Course"}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {mode === "create"
                ? "Fill in the details to add a course to your catalog"
                : `Editing "${course?.name}"`}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Separator className="shrink-0" />

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          <CourseForm
            mode={mode}
            defaultValues={course}
            onSubmit={onSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
