"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreHorizontal, Pencil, Trash2, Tag } from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { BlogCategoryDto } from "@/types/admin/blog";

type Props = {
  categories: BlogCategoryDto[];
  onEdit:     (c: BlogCategoryDto) => void;
  onDelete:   (c: BlogCategoryDto) => void;
};

type MenuState = { id: string; top: number; right: number } | null;

function CategoryThumbnail({ name, src }: { name: string; src?: string | null }) {
  if (src) {
    return (
      <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
        <Image src={src} alt={name} fill className="object-cover" unoptimized />
      </div>
    );
  }
  return (
    <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Tag className="h-4 w-4" />
    </div>
  );
}

export function BlogCategoryTable({ categories, onEdit, onDelete }: Props) {
  const [menu, setMenu] = useState<MenuState>(null);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenu({ id, top: rect.bottom + 4, right: window.innerWidth - rect.right });
  };

  const closeMenu = () => setMenu(null);

  if (categories.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <Tag className="h-5 w-5 text-muted-foreground" />
        </div>
        <p className="mt-3 text-sm font-medium text-foreground">No categories yet</p>
        <p className="mt-1 text-xs text-muted-foreground">Add your first blog category to get started</p>
      </div>
    );
  }

  const active = menu ? categories.find((c) => c.id === menu.id) : null;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Description</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {categories.map((cat) => (
                <TableRow key={cat.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <CategoryThumbnail name={cat.name} src={cat.coverImageUrl} />
                      <p className="font-medium text-foreground">{cat.name}</p>
                    </div>
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell max-w-[300px]">
                    <p className="truncate">{cat.description ?? "—"}</p>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={cat.status === "Active"
                        ? "border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                        : "border-gray-300 text-gray-500"}
                    >
                      {cat.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => menu?.id === cat.id ? closeMenu() : openMenu(e, cat.id)}
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

      {menu && active && (
        <>
          <div className="fixed inset-0 z-40" onClick={closeMenu} />
          <div
            className="fixed z-50 w-40 overflow-hidden rounded-lg border border-border bg-popover shadow-xl"
            style={{ top: menu.top, right: menu.right }}
          >
            <button
              onClick={() => { onEdit(active); closeMenu(); }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-foreground transition hover:bg-accent"
            >
              <Pencil className="h-3.5 w-3.5 text-muted-foreground" /> Edit
            </button>
            <div className="mx-2 my-1 border-t border-border" />
            <button
              onClick={() => { onDelete(active); closeMenu(); }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-destructive transition hover:bg-destructive/10"
            >
              <Trash2 className="h-3.5 w-3.5" /> Delete
            </button>
          </div>
        </>
      )}
    </>
  );
}
