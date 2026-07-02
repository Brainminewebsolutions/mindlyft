"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreHorizontal, Pencil, Trash2, BookOpen, Wifi, MapPin, Power, PowerOff } from "lucide-react";
import { Badge }   from "@/components/ui/badge";
import { Button }  from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { Course } from "@/types/admin/course";

type Props = {
  courses:        Course[];
  onEdit:         (c: Course) => void;
  onDelete:       (c: Course) => void;
  onToggleStatus: (c: Course) => void;
};

type MenuState = { id: string; top?: number; bottom?: number; right: number } | null;

function CourseTypeBadge({ type }: { type: string }) {
  if (type === "IIT")
    return (
      <Badge variant="outline" className="border-violet-400/40 text-violet-600 dark:text-violet-400">
        IIT
      </Badge>
    );
  return (
    <Badge variant="outline" className="border-blue-400/40 text-blue-600 dark:text-blue-400">
      Mindlyftai
    </Badge>
  );
}

function StatusBadge({ status }: { status: string }) {
  if (status === "INACTIVE")
    return <Badge variant="secondary">Inactive</Badge>;
  return (
    <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">
      Active
    </Badge>
  );
}

function ModeBadge({ mode }: { mode: string }) {
  if (mode === "Online")
    return (
      <Badge variant="outline" className="gap-1 border-sky-500/30 text-sky-600 dark:text-sky-400">
        <Wifi className="h-2.5 w-2.5" /> Online
      </Badge>
    );
  return (
    <Badge variant="outline" className="gap-1 border-amber-500/30 text-amber-600 dark:text-amber-400">
      <MapPin className="h-2.5 w-2.5" /> Offline
    </Badge>
  );
}

function CourseThumbnail({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
        <Image src={src} alt={name} fill className="object-cover" />
      </div>
    );
  }
  return (
    <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <BookOpen className="h-4 w-4" />
    </div>
  );
}

export function CourseTable({ courses, onEdit, onDelete, onToggleStatus }: Props) {
  const [menu, setMenu] = useState<MenuState>(null);

  const MENU_HEIGHT = 130;

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const right = window.innerWidth - rect.right;
    const spaceBelow = window.innerHeight - rect.bottom;

    if (spaceBelow < MENU_HEIGHT + 8) {
      setMenu({ id, bottom: window.innerHeight - rect.top + 4, right });
    } else {
      setMenu({ id, top: rect.bottom + 4, right });
    }
  };

  const closeMenu = () => setMenu(null);

  if (courses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <BookOpen className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="mt-3 text-sm font-medium text-foreground">No courses yet</p>
        <p className="mt-1 text-xs text-muted-foreground">Add your first course to get started</p>
      </div>
    );
  }

  const activeCourse = menu ? courses.find((c) => c.id === menu.id) : null;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Course</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden sm:table-cell">Duration</TableHead>
                <TableHead className="hidden md:table-cell">Instructor</TableHead>
                <TableHead className="hidden lg:table-cell">Language</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {courses.map((course) => (
                <TableRow key={course.id}>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <CourseThumbnail name={course.name} src={course.image ?? undefined} />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground max-w-[180px]">{course.name}</p>
                        {course.description && (
                          <p className="truncate text-xs text-muted-foreground max-w-[180px]">
                            {course.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <ModeBadge mode={course.mode} />
                  </TableCell>

                  <TableCell className="hidden sm:table-cell">
                    <CourseTypeBadge type={course.courseType} />
                  </TableCell>

                  <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                    {course.duration}h
                  </TableCell>

                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                    {course.instructor}
                  </TableCell>

                  <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                    {course.language}
                  </TableCell>

                  <TableCell className="text-sm font-medium text-foreground">
                    {course.price === 0
                      ? <span className="text-emerald-600 dark:text-emerald-400">Free</span>
                      : `₹${course.price.toLocaleString("en-IN")}`}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={course.status} />
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => menu?.id === course.id ? closeMenu() : openMenu(e, course.id)}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {menu && activeCourse && (
        <>
          <div className="fixed inset-0 z-40" onClick={closeMenu} />
          <div
            className="fixed z-50 w-40 overflow-hidden rounded-lg border border-border bg-popover shadow-xl"
            style={{ top: menu.top, bottom: menu.bottom, right: menu.right }}
          >
            <button
              onClick={() => { onEdit(activeCourse); closeMenu(); }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-foreground transition hover:bg-accent"
            >
              <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
              Edit
            </button>
            <button
              onClick={() => { onToggleStatus(activeCourse); closeMenu(); }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-foreground transition hover:bg-accent"
            >
              {activeCourse.status === "INACTIVE" ? (
                <>
                  <Power className="h-3.5 w-3.5 text-emerald-600 dark:text-emerald-400" />
                  Activate
                </>
              ) : (
                <>
                  <PowerOff className="h-3.5 w-3.5 text-muted-foreground" />
                  Deactivate
                </>
              )}
            </button>
            <div className="mx-2 my-1 border-t border-border" />
            <button
              onClick={() => { onDelete(activeCourse); closeMenu(); }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-destructive transition hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
              Delete
            </button>
          </div>
        </>
      )}
    </>
  );
}
