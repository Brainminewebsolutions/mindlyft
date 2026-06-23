"use client";

import { useState } from "react";
import Link from "next/link";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { Student } from "@/types/admin/student";

type Props = {
  students: Student[];
  onEdit:   (s: Student) => void;
  onDelete: (s: Student) => void;
};

type MenuState = { id: string; top: number; right: number } | null;

function StatusBadge({ status }: { status: string }) {
  if (status === "ACTIVE")    return <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">Active</Badge>;
  if (status === "INACTIVE")  return <Badge variant="secondary">Inactive</Badge>;
  if (status === "SUSPENDED") return <Badge variant="destructive">Suspended</Badge>;
  return <Badge variant="outline">{status}</Badge>;
}

function Avatar({ name }: { name: string }) {
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-bold text-emerald-700 dark:text-emerald-400">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function StudentTable({ students, onEdit, onDelete }: Props) {
  const [menu, setMenu] = useState<MenuState>(null);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenu({ id, top: rect.bottom + 4, right: window.innerWidth - rect.right });
  };

  const closeMenu = () => setMenu(null);

  if (students.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <span className="text-2xl">🎓</span>
        </div>
        <p className="mt-3 text-sm font-medium text-foreground">No students found</p>
        <p className="mt-1 text-xs text-muted-foreground">Students appear here once they register</p>
      </div>
    );
  }

  const activeStudent = menu ? students.find((s) => s.id === menu.id) : null;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead className="hidden sm:table-cell">Phone</TableHead>
                <TableHead className="hidden md:table-cell">Course Interest</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {students.map((s) => (
                <TableRow key={s.id}>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar name={s.name} />
                      <div>
                        <p className="font-medium text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">{s.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {s.phone || <span className="text-muted-foreground/40">—</span>}
                  </TableCell>

                  <TableCell className="hidden text-muted-foreground md:table-cell">
                    {s.courseInterest || <span className="text-muted-foreground/40">—</span>}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={s.status} />
                  </TableCell>

                  <TableCell className="hidden text-xs text-muted-foreground lg:table-cell">
                    {new Date(s.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => menu?.id === s.id ? closeMenu() : openMenu(e, s.id)}
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

      {menu && activeStudent && (
        <>
          <div className="fixed inset-0 z-40" onClick={closeMenu} />
          <div
            className="fixed z-50 w-44 overflow-hidden rounded-lg border border-border bg-popover shadow-xl"
            style={{ top: menu.top, right: menu.right }}
          >
            <Link
              href={`/admin/students/${activeStudent.id}`}
              onClick={closeMenu}
              className="flex items-center gap-2.5 px-3 py-2 text-xs text-foreground transition hover:bg-accent"
            >
              <Eye className="h-3.5 w-3.5 text-muted-foreground" />
              View Details
            </Link>
            <button
              onClick={() => { onEdit(activeStudent); closeMenu(); }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-foreground transition hover:bg-accent"
            >
              <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
              Edit
            </button>
            <div className="mx-2 my-1 border-t border-border" />
            <button
              onClick={() => { onDelete(activeStudent); closeMenu(); }}
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
