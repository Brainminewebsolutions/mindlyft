"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreHorizontal, Pencil, Trash2, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { BlogDto } from "@/types/admin/blog";

type Props = {
  blogs:    BlogDto[];
  onEdit:   (b: BlogDto) => void;
  onDelete: (b: BlogDto) => void;
};

type MenuState = { id: string; top: number; right: number } | null;

function StatusBadge({ status }: { status: string }) {
  if (status === "Active")
    return <Badge className="bg-emerald-600 dark:bg-emerald-500 text-white">Published</Badge>;
  if (status === "Pending")
    return <Badge variant="secondary">Draft</Badge>;
  return <Badge variant="outline" className="text-muted-foreground">Archived</Badge>;
}

function Thumbnail({ title, src }: { title: string; src?: string }) {
  if (src) {
    return (
      <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
        <Image src={src} alt={title} fill className="object-cover" unoptimized />
      </div>
    );
  }
  return (
    <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg bg-violet-50 dark:bg-violet-950/30">
      <Newspaper className="h-4 w-4 text-violet-500" />
    </div>
  );
}

export function BlogTable({ blogs, onEdit, onDelete }: Props) {
  const [menu, setMenu] = useState<MenuState>(null);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenu({ id, top: rect.bottom + 4, right: window.innerWidth - rect.right });
  };

  const closeMenu = () => setMenu(null);
  const activeBlog = menu ? blogs.find((b) => b.id === menu.id) : null;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Article</TableHead>
                <TableHead className="hidden sm:table-cell">Category</TableHead>
                <TableHead className="hidden md:table-cell">Author</TableHead>
                <TableHead className="hidden lg:table-cell">Read time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>

            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Thumbnail title={blog.title} src={blog.coverImageUrl ?? undefined} />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground max-w-[180px]">{blog.title}</p>
                        {blog.excerpt && (
                          <p className="truncate text-xs text-muted-foreground max-w-[180px]">{blog.excerpt}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                    {blog.categoryName}
                  </TableCell>

                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                    {blog.authorName ?? "—"}
                  </TableCell>

                  <TableCell className="hidden text-sm text-muted-foreground lg:table-cell">
                    {blog.readTimeMinutes > 0 ? `${blog.readTimeMinutes} min` : "—"}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={blog.status} />
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => (menu?.id === blog.id ? closeMenu() : openMenu(e, blog.id))}
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

      {menu && activeBlog && (
        <>
          <div className="fixed inset-0 z-40" onClick={closeMenu} />
          <div
            className="fixed z-50 w-40 overflow-hidden rounded-lg border border-border bg-popover shadow-xl"
            style={{ top: menu.top, right: menu.right }}
          >
            <button
              onClick={() => { onEdit(activeBlog); closeMenu(); }}
              className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-foreground transition hover:bg-accent"
            >
              <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
              Edit
            </button>
            <div className="mx-2 my-1 border-t border-border" />
            <button
              onClick={() => { onDelete(activeBlog); closeMenu(); }}
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
