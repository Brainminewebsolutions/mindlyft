"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MoreHorizontal, Pencil, Trash2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { Employee } from "@/types/admin/employee";

type Props = {
  employees: Employee[];
  onEdit:    (emp: Employee) => void;
  onDelete:  (emp: Employee) => void;
};

type MenuState = { id: string; top?: number; bottom?: number; right: number } | null;

function StatusBadge({ status }: { status: string }) {
  if (status === "ACTIVE")    return <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">Active</Badge>;
  if (status === "INACTIVE")  return <Badge variant="secondary">Inactive</Badge>;
  if (status === "SUSPENDED") return <Badge variant="destructive">Suspended</Badge>;
  return <Badge variant="outline">{status}</Badge>;
}

function EmployeeAvatar({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border">
        <Image src={src} alt={name} fill className="object-cover" />
      </div>
    );
  }
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function EmployeeTable({ employees, onEdit, onDelete }: Props) {
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

  if (employees.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <span className="text-2xl">👤</span>
        </div>
        <p className="mt-3 text-sm font-medium text-foreground">No employees found</p>
        <p className="mt-1 text-xs text-muted-foreground">Add your first employee to get started</p>
      </div>
    );
  }

  const activeEmp = menu ? employees.find((e) => e.id === menu.id) : null;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead className="hidden lg:table-cell">Designation</TableHead>
                <TableHead className="hidden xl:table-cell">Category</TableHead>
                <TableHead>Department</TableHead>
                <TableHead className="hidden sm:table-cell">Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden md:table-cell">Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {employees.map((emp) => (
                <TableRow key={emp.id}>

                  <TableCell>
                    <div className="flex items-center gap-3">
                      <EmployeeAvatar name={emp.name} src={emp.avatar} />
                      <div>
                        <p className="font-medium text-foreground">{emp.name}</p>
                        <p className="text-xs text-muted-foreground">{emp.email}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                    {emp.designation || <span className="text-muted-foreground/40">—</span>}
                  </TableCell>

                  <TableCell className="hidden xl:table-cell">
                    {emp.category
                      ? <Badge variant="outline" className="text-xs">{emp.category}</Badge>
                      : <span className="text-muted-foreground/40">—</span>}
                  </TableCell>

                  <TableCell className="text-muted-foreground">
                    {emp.department || <span className="text-muted-foreground/40">—</span>}
                  </TableCell>

                  <TableCell className="hidden text-muted-foreground sm:table-cell">
                    {emp.phone || <span className="text-muted-foreground/40">—</span>}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={emp.status} />
                  </TableCell>

                  <TableCell className="hidden text-xs text-muted-foreground md:table-cell">
                    {new Date(emp.createdAt).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => menu?.id === emp.id ? closeMenu() : openMenu(e, emp.id)}
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

      {menu && activeEmp && (
        <>
          <div className="fixed inset-0 z-40" onClick={closeMenu} />
          <div
            className="fixed z-50 w-44 overflow-hidden rounded-lg border border-border bg-popover shadow-xl"
            style={{ top: menu.top, bottom: menu.bottom, right: menu.right }}
          >
            <Link
              href={`/admin/employees/${activeEmp.id}`}
              onClick={closeMenu}
              className="flex items-center gap-2.5 px-3 py-2 text-xs text-foreground transition hover:bg-accent"
            >
              <Eye className="h-3.5 w-3.5 text-muted-foreground" />
              View Details
            </Link>
            <button
              onClick={() => { onEdit(activeEmp); closeMenu(); }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-foreground transition hover:bg-accent"
            >
              <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
              Edit
            </button>
            <div className="mx-2 my-1 border-t border-border" />
            <button
              onClick={() => { onDelete(activeEmp); closeMenu(); }}
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
