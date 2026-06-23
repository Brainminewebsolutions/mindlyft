"use client";

import { useState } from "react";
import Image from "next/image";
import { MoreHorizontal, Pencil, Trash2, Video, Wifi, MapPin } from "lucide-react";
import { Badge }  from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from "@/components/ui/table";
import type { Webinar } from "@/types/admin/webinar";

type Props = {
  webinars: Webinar[];
  onEdit:   (w: Webinar) => void;
  onDelete: (w: Webinar) => void;
};

type MenuState = { id: string; top: number; right: number } | null;

function TypeBadge({ type }: { type: string }) {
  if (type === "Webinar")
    return (
      <Badge variant="outline" className="gap-1 border-violet-500/30 text-violet-600 dark:text-violet-400">
        <Video className="h-2.5 w-2.5" /> Webinar
      </Badge>
    );
  return (
    <Badge variant="outline" className="gap-1 border-amber-500/30 text-amber-600 dark:text-amber-400">
      <Video className="h-2.5 w-2.5" /> Workshop
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
    <Badge variant="outline" className="gap-1 border-orange-500/30 text-orange-600 dark:text-orange-400">
      <MapPin className="h-2.5 w-2.5" /> Offline
    </Badge>
  );
}

function Thumbnail({ name, src }: { name: string; src?: string }) {
  if (src)
    return (
      <div className="relative h-10 w-16 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
        <Image src={src} alt={name} fill className="object-cover" />
      </div>
    );
  return (
    <div className="flex h-10 w-16 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
      <Video className="h-4 w-4" />
    </div>
  );
}

export function WebinarTable({ webinars, onEdit, onDelete }: Props) {
  const [menu, setMenu] = useState<MenuState>(null);

  const openMenu = (e: React.MouseEvent<HTMLButtonElement>, id: string) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMenu({ id, top: rect.bottom + 4, right: window.innerWidth - rect.right });
  };
  const closeMenu = () => setMenu(null);

  const active = menu ? webinars.find((w) => w.id === menu.id) : null;

  return (
    <>
      <div className="overflow-hidden rounded-xl border border-border">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Mode</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Instructor</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {webinars.map((w) => (
                <TableRow key={w.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Thumbnail name={w.name} src={w.image ?? undefined} />
                      <div className="min-w-0">
                        <p className="truncate font-medium text-foreground max-w-[160px]">{w.name}</p>
                        {w.category && (
                          <p className="truncate text-xs text-muted-foreground max-w-[160px]">{w.category}</p>
                        )}
                      </div>
                    </div>
                  </TableCell>

                  <TableCell><TypeBadge type={w.type} /></TableCell>
                  <TableCell><ModeBadge mode={w.mode} /></TableCell>

                  <TableCell className="hidden text-sm text-muted-foreground sm:table-cell">
                    {w.date} {w.time}
                  </TableCell>

                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                    {w.instructor}
                  </TableCell>

                  <TableCell className="text-sm font-medium text-foreground">
                    {w.price === 0
                      ? <span className="text-emerald-600 dark:text-emerald-400">Free</span>
                      : `₹${w.price.toLocaleString("en-IN")}`}
                  </TableCell>

                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={(e) => menu?.id === w.id ? closeMenu() : openMenu(e, w.id)}
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
