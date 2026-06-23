"use client";

import { useEffect } from "react";
import { X } from "lucide-react";
import { EmployeeForm } from "./EmployeeForm";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import type { Employee } from "@/types/admin/employee";

type Props = {
  mode:       "create" | "edit";
  employee?:  Employee;
  isOpen:     boolean;
  isLoading:  boolean;
  onClose:    () => void;
  onSubmit:   (data: FormData) => Promise<void>;
};

export function EmployeeModal({ mode, employee, isOpen, isLoading, onClose, onSubmit }: Props) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal — fixed height with internal scroll */}
      <div className="relative flex w-full max-w-5xl flex-col rounded-xl border border-border bg-background shadow-2xl max-h-[92vh]">

        {/* Header — always visible */}
        <div className="flex shrink-0 items-center justify-between px-6 py-4">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              {mode === "create" ? "Add New Employee" : "Edit Employee"}
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {mode === "create"
                ? "Fill in the details to create a new employee account"
                : `Editing details for ${employee?.name}`}
            </p>
          </div>
          <Button variant="ghost" size="icon" className="shrink-0" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Separator className="shrink-0" />

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
          <EmployeeForm
            mode={mode}
            defaultValues={employee}
            onSubmit={onSubmit}
            onCancel={onClose}
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
