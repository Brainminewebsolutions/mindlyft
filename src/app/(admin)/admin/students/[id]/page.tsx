"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft, Mail, Phone, BookOpen,
  Calendar, ShieldCheck, Pencil,
} from "lucide-react";
import { Badge }   from "@/components/ui/badge";
import { Button }  from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { StudentEditModal }  from "@/components/admin/students/StudentEditModal";
import { studentService }    from "@/services/admin/studentService";
import type { Student, UpdateStudentInput } from "@/types/admin/student";

function StatusBadge({ status }: { status: string }) {
  if (status === "ACTIVE")    return <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">Active</Badge>;
  if (status === "INACTIVE")  return <Badge variant="secondary">Inactive</Badge>;
  if (status === "SUSPENDED") return <Badge variant="destructive">Suspended</Badge>;
  return <Badge variant="outline">{status}</Badge>;
}

export default function StudentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [student,  setStudent]  = useState<Student | null>(null);
  const [loading,  setLoading]  = useState(true);
  const [editOpen, setEditOpen] = useState(false);
  const [saving,   setSaving]   = useState(false);

  useEffect(() => {
    studentService.getById(id)
      .then(setStudent)
      .finally(() => setLoading(false));
  }, [id]);

  const handleSave = async (studentId: string, data: UpdateStudentInput) => {
    setSaving(true);
    try {
      const updated = await studentService.update(studentId, data);
      setStudent(updated);
      setEditOpen(false);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="h-8 w-32 animate-pulse rounded-lg bg-muted" />
        <div className="h-40 animate-pulse rounded-xl bg-muted" />
        <div className="h-48 animate-pulse rounded-xl bg-muted" />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="text-muted-foreground">Student not found</p>
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
        Back to Students
      </Button>

      {/* Profile card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/15 text-xl font-bold text-emerald-700 dark:text-emerald-400">
                {student.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <h1 className="text-xl font-semibold text-foreground">{student.name}</h1>
                  <StatusBadge status={student.status} />
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{student.email}</p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setEditOpen(true)}
              className="shrink-0"
            >
              <Pencil className="mr-2 h-3.5 w-3.5" />
              Edit
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {[
          { icon: Mail,        label: "Email",          value: student.email },
          { icon: Phone,       label: "Phone",          value: student.phone           || "Not provided" },
          { icon: BookOpen,    label: "Course Interest", value: student.courseInterest  || "Not specified" },
          { icon: ShieldCheck, label: "Status",         value: student.status },
          {
            icon: Calendar,
            label: "Registered",
            value: new Date(student.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit", month: "long", year: "numeric",
            }),
          },
          {
            icon: Calendar,
            label: "Last Updated",
            value: new Date(student.updatedAt).toLocaleDateString("en-IN", {
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

      {/* Edit modal */}
      <StudentEditModal
        student={student}
        isOpen={editOpen}
        isLoading={saving}
        onClose={() => setEditOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}
