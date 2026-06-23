"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreHorizontal, Pencil, Trash2, Star, Play, MessageSquare, Eye } from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { Testimonial } from "@/types/admin/testimonial";
import { TestimonialPreviewModal } from "./TestimonialPreviewModal";

type Props = {
  testimonials: Testimonial[];
  onEdit:       (t: Testimonial) => void;
  onDelete:     (t: Testimonial) => void;
};

type MenuState = { id: number; top: number; right: number } | null;

function StatusBadge({ status }: { status: string }) {
  if (status === "ACTIVE")   return <Badge variant="outline" className="border-emerald-500/30 text-emerald-600 dark:text-emerald-400">Active</Badge>;
  if (status === "INACTIVE") return <Badge variant="secondary">Inactive</Badge>;
  return <Badge variant="outline">{status}</Badge>;
}

function TypeBadge({ type }: { type: string }) {
  const isVideo = type === "video";
  return (
    <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium"
      style={{ background: isVideo ? "#6c63ff18" : "#0ea5e918", color: isVideo ? "#6c63ff" : "#0ea5e9" }}>
      {isVideo ? <Play className="h-3 w-3" /> : <MessageSquare className="h-3 w-3" />}
      {isVideo ? "Video" : "Text"}
    </span>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className="h-3 w-3" fill={i < rating ? "#f59e0b" : "#e5e7eb"} color={i < rating ? "#f59e0b" : "#e5e7eb"} />
      ))}
    </span>
  );
}

function Avatar({ name, src }: { name: string; src?: string }) {
  if (src) {
    return (
      <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full border border-border">
        <Image src={src} alt={name} fill className="object-cover" unoptimized />
      </div>
    );
  }
  return (
    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
      {name.slice(0, 2).toUpperCase()}
    </div>
  );
}

export function TestimonialTable({ testimonials, onEdit, onDelete }: Props) {
  const [menu,    setMenu]    = useState<MenuState>(null);
  const [preview, setPreview] = useState<Testimonial | null>(null);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>, id: number) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenu({ id, top: rect.bottom + 4, right: window.innerWidth - rect.right });
  };

  const closeMenu = () => setMenu(null);

  if (testimonials.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-border bg-card py-20">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <MessageSquare className="h-6 w-6 text-muted-foreground" />
        </div>
        <p className="mt-3 text-sm font-medium text-foreground">No testimonials found</p>
        <p className="mt-1 text-xs text-muted-foreground">Add your first testimonial to get started</p>
      </div>
    );
  }

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Person</TableHead>
                <TableHead className="hidden sm:table-cell">Type</TableHead>
                <TableHead className="hidden md:table-cell">Rating</TableHead>
                <TableHead className="hidden lg:table-cell">Tag</TableHead>
                <TableHead className="hidden lg:table-cell">Order</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {testimonials.map((t) => (
                <TableRow
                  key={t.id}
                  className="cursor-pointer"
                  onClick={() => setPreview(t)}
                >
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar name={t.name} src={t.avatar} />
                      <div>
                        <p className="font-medium text-foreground">{t.name}</p>
                        <p className="text-xs text-muted-foreground">{t.designation || <span className="opacity-40">—</span>}</p>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell className="hidden sm:table-cell">
                    <TypeBadge type={t.type} />
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    <StarRating rating={t.rating} />
                  </TableCell>

                  <TableCell className="hidden text-xs text-muted-foreground lg:table-cell">
                    {t.tag || <span className="opacity-40">—</span>}
                  </TableCell>

                  <TableCell className="hidden text-xs text-muted-foreground lg:table-cell">
                    {t.order}
                  </TableCell>

                  <TableCell>
                    <StatusBadge status={t.status} />
                  </TableCell>

                  <TableCell className="text-right" onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => menu?.id === t.id ? closeMenu() : openMenu(e, t.id)}
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

      {/* Dropdown */}
      {menu && (
        <>
          <div className="fixed inset-0 z-40" onClick={closeMenu} />
          <div
            className="fixed z-50 w-40 overflow-hidden rounded-lg border border-border bg-popover shadow-xl"
            style={{ top: menu.top, right: menu.right }}
          >
            {testimonials.filter((t) => t.id === menu.id).map((t) => (
              <div key={t.id}>
                <button
                  onClick={() => { setPreview(t); closeMenu(); }}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-foreground transition hover:bg-accent"
                >
                  <Eye className="h-3.5 w-3.5 text-muted-foreground" />
                  View
                </button>
                <button
                  onClick={() => { onEdit(t); closeMenu(); }}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-foreground transition hover:bg-accent"
                >
                  <Pencil className="h-3.5 w-3.5 text-muted-foreground" />
                  Edit
                </button>
                <div className="mx-2 my-1 border-t border-border" />
                <button
                  onClick={() => { onDelete(t); closeMenu(); }}
                  className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-destructive transition hover:bg-destructive/10"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  Delete
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Preview modal */}
      <TestimonialPreviewModal
        testimonial={preview}
        onClose={() => setPreview(null)}
      />
    </>
  );
}
