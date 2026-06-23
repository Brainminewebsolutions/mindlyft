"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Mail, Phone, Building2, Calendar, ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { employeeService } from "@/services/admin/employeeService";
import type { Employee }   from "@/types/admin/employee";

function StatusBadge({ status }: { status: string }) {
  if (status === "ACTIVE")    return <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">Active</Badge>;
  if (status === "INACTIVE")  return <Badge variant="secondary">Inactive</Badge>;
  if (status === "SUSPENDED") return <Badge variant="destructive">Suspended</Badge>;
  return <Badge variant="outline">{status}</Badge>;
}

export default function EmployeeDetailPage() {
  const { id }   = useParams();
  const router   = useRouter();
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    employeeService.getById(String(id))
      .then((data) => setEmployee(data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-muted" />
        <div className="h-40 animate-pulse rounded-xl bg-muted" />
        <div className="h-48 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (!employee) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">Employee not found</p>
        <Button variant="link" className="mt-2" onClick={() => router.back()}>
          Go back
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Back */}
      <Button variant="ghost" size="sm" onClick={() => router.back()} className="-ml-2">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Employees
      </Button>

      {/* Profile card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/15 text-xl font-bold text-primary">
              {employee.name.slice(0, 2).toUpperCase()}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-xl font-semibold text-foreground">{employee.name}</h1>
                <StatusBadge status={employee.status} />
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{employee.email}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Info grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { icon: Mail,        label: "Email",        value: employee.email },
          { icon: Phone,       label: "Phone",        value: employee.phone      || "Not provided" },
          { icon: Building2,   label: "Department",   value: employee.department || "Not assigned" },
          { icon: ShieldCheck, label: "Role",         value: employee.role },
          {
            icon: Calendar,
            label: "Joined",
            value: new Date(employee.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit", month: "long", year: "numeric",
            }),
          },
          {
            icon: Calendar,
            label: "Last Updated",
            value: new Date(employee.updatedAt).toLocaleDateString("en-IN", {
              day: "2-digit", month: "long", year: "numeric",
            }),
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.label}
              className="flex items-start gap-3 rounded-xl border border-border bg-card p-4"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="mt-0.5 text-sm font-medium text-foreground">{item.value}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
