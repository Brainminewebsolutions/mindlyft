"use client";

import { AlertTriangle, X } from "lucide-react";
import { Button }    from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Testimonial } from "@/types/admin/testimonial";

type Props = {
  testimonial: Testimonial | null;
  isOpen:      boolean;
  isLoading:   boolean;
  onClose:     () => void;
  onConfirm:   () => void;
};

export function DeleteConfirmModal({ testimonial, isOpen, isLoading, onClose, onConfirm }: Props) {
  if (!isOpen || !testimonial) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-xl border border-border bg-background shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-destructive/10">
              <AlertTriangle className="h-4 w-4 text-destructive" />
            </div>
            <h2 className="text-base font-semibold text-foreground">Delete Testimonial</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        <div className="space-y-4 px-6 py-5">
          <p className="text-sm text-muted-foreground">
            Are you sure you want to delete the testimonial from{" "}
            <span className="font-semibold text-foreground">{testimonial.name}</span>?
            This action cannot be undone.
          </p>

          <div className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-4 py-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
              {testimonial.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-foreground">{testimonial.name}</p>
              <p className="truncate text-xs text-muted-foreground">{testimonial.designation ?? testimonial.tag ?? testimonial.type}</p>
            </div>
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-end gap-3 px-6 py-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isLoading}>
            {isLoading ? "Deleting…" : "Yes, Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
