"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { BookOpen, Plus, Search, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button }    from "@/components/ui/button";
import { Input }     from "@/components/ui/input";
import { Badge }     from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CourseTable } from "@/components/admin/courses/CourseTable";
import { useCourses }  from "@/hooks/useCourses";
import type { Course } from "@/types/admin/course";

// ─── Delete confirm modal ──────────────────────────────────────────────────────
function DeleteConfirmModal({
  course,
  onConfirm,
  onCancel,
}: {
  course:    Course;
  onConfirm: () => void;
  onCancel:  () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm rounded-xl border border-border bg-background p-6 shadow-2xl">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-destructive/10 mx-auto">
          <Trash2 className="h-5 w-5 text-destructive" />
        </div>
        <h3 className="mt-4 text-center text-base font-semibold text-foreground">Delete Course</h3>
        <p className="mt-1.5 text-center text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-medium text-foreground">"{course.name}"</span>?
          This action cannot be undone.
        </p>
        <Separator className="my-4" />
        <div className="flex gap-3">
          <Button variant="outline"     className="flex-1" onClick={onCancel}>Cancel</Button>
          <Button variant="destructive" className="flex-1" onClick={onConfirm}>Delete</Button>
        </div>
      </div>
    </div>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────
export default function AdminCoursesPage() {
  const router = useRouter();
  const [search, setSearch] = useState("");

  const { courses, loading, error, deleteCourse, toggleCourseStatus } = useCourses({ search });

  const [deleteTarget, setDeleteTarget] = useState<Course | null>(null);

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    await deleteCourse(deleteTarget.id);
    setDeleteTarget(null);
  };

  const onlineCount  = courses.filter((c) => c.mode === "Online").length;
  const offlineCount = courses.filter((c) => c.mode === "Offline").length;

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">Courses</h1>
          <p className="mt-0.5 text-sm text-muted-foreground">Manage your course catalog</p>
        </div>
        <Button onClick={() => router.push("/admin/courses/add")}>
          <Plus className="mr-2 h-4 w-4" />
          Add Course
        </Button>
      </div>

      {/* Error banner */}
      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Stats row */}
      {courses.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {[
            { label: "Total Courses", value: courses.length, color: "text-foreground"                     },
            { label: "Online",        value: onlineCount,    color: "text-sky-600 dark:text-sky-400"     },
            { label: "Offline",       value: offlineCount,   color: "text-amber-600 dark:text-amber-400" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl border border-border bg-card px-4 py-3">
              <p className="text-xs text-muted-foreground">{s.label}</p>
              <p className={`mt-1 text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Table card */}
      <Card>
        <CardHeader className="border-b pb-4">
          <div className="flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <BookOpen className="size-4 text-violet-600 dark:text-violet-400" />
              <CardTitle className="text-sm">All Courses</CardTitle>
              {courses.length > 0 && (
                <Badge variant="secondary" className="text-xs">{courses.length}</Badge>
              )}
            </div>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search courses…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-8 h-8 text-sm"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
            </div>
          ) : courses.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <BookOpen className="mb-3 size-10 text-muted-foreground/30" />
              <p className="text-sm font-medium text-foreground">No courses yet</p>
              <p className="mt-1 text-xs text-muted-foreground">Create your first course to get started</p>
              <Button className="mt-5" onClick={() => router.push("/admin/courses/add")}>
                Create Course
              </Button>
            </div>
          ) : (
            <div className="p-4">
              <CourseTable
                courses={courses}
                onEdit={(c) => router.push(`/admin/courses/${c.id}/edit`)}
                onDelete={(c) => setDeleteTarget(c)}
                onToggleStatus={toggleCourseStatus}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Delete confirm */}
      {deleteTarget && (
        <DeleteConfirmModal
          course={deleteTarget}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
