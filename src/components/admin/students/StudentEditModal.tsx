"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button }    from "@/components/ui/button";
import { Input }     from "@/components/ui/input";
import { Label }     from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Student, UpdateStudentInput } from "@/types/admin/student";

type Props = {
  student:   Student | null;
  isOpen:    boolean;
  isLoading: boolean;
  onClose:   () => void;
  onSave:    (id: string, data: UpdateStudentInput) => Promise<void>;
};

const STATUS_OPTIONS: Array<{ value: UpdateStudentInput["status"]; label: string }> = [
  { value: "ACTIVE",    label: "Active"    },
  { value: "INACTIVE",  label: "Inactive"  },
  { value: "SUSPENDED", label: "Suspended" },
];

export function StudentEditModal({ student, isOpen, isLoading, onClose, onSave }: Props) {
  const [phone,          setPhone]          = useState("");
  const [courseInterest, setCourseInterest] = useState("");
  const [status,         setStatus]         = useState<UpdateStudentInput["status"]>("ACTIVE");
  const [error,          setError]          = useState<string | null>(null);

  useEffect(() => {
    if (student) {
      setPhone(student.phone ?? "");
      setCourseInterest(student.courseInterest ?? "");
      setStatus(student.status);
      setError(null);
    }
  }, [student]);

  if (!isOpen || !student) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await onSave(student.id, {
        phone:          phone.trim()          || undefined,
        courseInterest: courseInterest.trim() || undefined,
        status,
      });
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update student");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-md rounded-xl border border-border bg-background shadow-2xl">

        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-foreground">Edit Student</h2>
            <p className="mt-0.5 text-xs text-muted-foreground">{student.name}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Separator />

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4 px-6 py-5">

            {error && (
              <div className="rounded-lg border border-destructive/20 bg-destructive/10 px-3 py-2 text-xs text-destructive">
                {error}
              </div>
            )}

            {/* Status */}
            <div className="space-y-1.5">
              <Label className="text-xs font-medium text-muted-foreground">Status</Label>
              <div className="flex gap-2">
                {STATUS_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setStatus(opt.value)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                      status === opt.value
                        ? opt.value === "ACTIVE"
                          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400"
                          : opt.value === "SUSPENDED"
                          ? "border-destructive/40 bg-destructive/10 text-destructive"
                          : "border-border bg-muted text-foreground"
                        : "border-border bg-background text-muted-foreground hover:bg-accent"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-1.5">
              <Label htmlFor="phone" className="text-xs font-medium text-muted-foreground">
                Phone Number
              </Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="e.g. +91 98765 43210"
              />
            </div>

            {/* Course Interest */}
            <div className="space-y-1.5">
              <Label htmlFor="courseInterest" className="text-xs font-medium text-muted-foreground">
                Course Interest
              </Label>
              <Input
                id="courseInterest"
                value={courseInterest}
                onChange={(e) => setCourseInterest(e.target.value)}
                placeholder="e.g. Data Science, AI"
              />
            </div>
          </div>

          <Separator />

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 px-6 py-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
