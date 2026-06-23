"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Button }          from "@/components/ui/button";
import { EmployeeForm }    from "@/components/admin/employees/EmployeeForm";
import { employeeService } from "@/services/admin/employeeService";
import type { Employee }   from "@/types/admin/employee";

export default function EditEmployeePage() {
  const { id }   = useParams<{ id: string }>();
  const router   = useRouter();

  const [employee,   setEmployee]   = useState<Employee | null>(null);
  const [loading,    setLoading]    = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    employeeService.getById(id)
      .then(setEmployee)
      .catch(() => toast.error("Failed to load employee."))
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await employeeService.update(id, data);
      toast.success("Employee updated successfully.");
      router.push("/admin/employees");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to update employee.");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted" />
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-5 lg:col-span-2">
            <div className="h-48 animate-pulse rounded-xl bg-muted" />
            <div className="h-64 animate-pulse rounded-xl bg-muted" />
          </div>
          <div className="space-y-5">
            <div className="h-56 animate-pulse rounded-xl bg-muted" />
            <div className="h-40 animate-pulse rounded-xl bg-muted" />
          </div>
        </div>
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-sm text-muted-foreground">Employee not found</p>
        <Button variant="link" className="mt-2" onClick={() => router.push("/admin/employees")}>
          Back to employees
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0" onClick={() => router.push("/admin/employees")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Edit Employee</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Editing details for <span className="font-medium text-foreground">{employee.name}</span>
          </p>
        </div>
      </div>

      <EmployeeForm
        mode="edit"
        defaultValues={employee}
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/employees")}
        isLoading={submitting}
      />
    </div>
  );
}
