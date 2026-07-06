"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { notify } from "@/lib/notify";
import { ArrowLeft } from "lucide-react";
import { Button }          from "@/components/ui/button";
import { EmployeeForm }    from "@/components/admin/employees/EmployeeForm";
import { employeeService } from "@/services/admin/employeeService";

export default function AddEmployeePage() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await employeeService.create(data);
      notify.success("Employee created successfully.");
      router.push("/admin/employees");
    } catch (err) {
      notify.error(err instanceof Error ? err.message : "Failed to create employee.");
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="-ml-1 shrink-0" onClick={() => router.push("/admin/employees")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">Add New Employee</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Fill in the details to create a new employee account
          </p>
        </div>
      </div>

      <EmployeeForm
        mode="create"
        onSubmit={handleSubmit}
        onCancel={() => router.push("/admin/employees")}
        isLoading={submitting}
      />
    </div>
  );
}
