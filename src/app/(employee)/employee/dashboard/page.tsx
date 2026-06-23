"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, BookOpen, GraduationCap, User, Briefcase } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { employeeProfileService } from "@/services/employee/employeeProfileService";
import type { Employee } from "@/types/admin/employee";

export default function EmployeeDashboardPage() {
  const [employee, setEmployee] = useState<Employee | null>(null);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    employeeProfileService.get()
      .then(setEmployee)
      .catch(() => { /* show defaults on error */ })
      .finally(() => setLoading(false));
  }, []);

  const name     = employee?.name        ?? "Employee";
  const role     = employee?.designation ?? employee?.role ?? "Employee";
  const dept     = employee?.department  ?? "";

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const stats = [
    {
      label: "Assigned Courses",
      value: employee?.assignedCourses ?? 0,
      icon:  BookOpen,
      color: "text-violet-600 dark:text-violet-400",
    },
    {
      label: "Total Students",
      value: employee?.totalStudents ?? 0,
      icon:  GraduationCap,
      color: "text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="space-y-8">

      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-primary/5 p-6">
        <div className="relative z-10">
          <p className="text-sm font-medium text-primary">Welcome back 👋</p>
          <h1 className="mt-1 text-2xl font-bold text-foreground">{name}</h1>
          <div className="mt-3 flex flex-wrap gap-2">
            <Badge variant="outline" className="gap-1.5 border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {employee?.status ?? "Active"}
            </Badge>
            {role && (
              <Badge variant="outline" className="gap-1.5 border-primary/30 text-primary">
                {role}
              </Badge>
            )}
            {dept && (
              <Badge variant="outline" className="gap-1.5 text-muted-foreground">
                {dept}
              </Badge>
            )}
          </div>
        </div>
        <div className="absolute -right-6 -top-6 flex h-32 w-32 items-center justify-center rounded-full bg-primary/10">
          <Briefcase className="h-16 w-16 text-primary/20" />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map(({ label, value, icon: Icon, color }) => (
          <Card key={label}>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">{label}</p>
                <Icon className={`size-4 ${color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Links */}
      <div>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Quick Access
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {[
            { label: "My Courses",  href: "/employee/courses",  icon: BookOpen,      color: "text-violet-600 dark:text-violet-400"  },
            { label: "My Students", href: "/employee/students", icon: GraduationCap, color: "text-emerald-600 dark:text-emerald-400" },
            { label: "Profile",     href: "/employee/profile",  icon: User,          color: "text-primary"                          },
          ].map(({ label, href, icon: Icon, color }) => (
            <Link key={href} href={href}>
              <Card className="flex flex-col items-center justify-center gap-2 py-5 text-center transition hover:ring-1 hover:ring-primary/30">
                <Icon className={`size-5 ${color}`} />
                <span className="text-xs font-medium text-muted-foreground">{label}</span>
              </Card>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
