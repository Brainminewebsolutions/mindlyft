"use client";

import { Bell, Menu } from "lucide-react";
import { Button }      from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Separator }   from "@/components/ui/separator";

type Props = {
  onMenuClick: () => void;
};

export function AdminHeader({ onMenuClick }: Props) {
  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-2 border-b border-border bg-background/95 px-4 backdrop-blur-sm sm:px-6">

      {/* Hamburger — mobile only */}
      <Button
        variant="ghost"
        size="icon"
        className="shrink-0 lg:hidden"
        onClick={onMenuClick}
        aria-label="Open menu"
      >
        <Menu className="size-5" />
      </Button>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right controls */}
      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="relative" aria-label="Notifications">
          <Bell className="size-4" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
        </Button>

        <Separator orientation="vertical" className="mx-1 h-5" />

        <ThemeToggle />

        <Separator orientation="vertical" className="mx-1 h-5" />

        <div className="flex size-8 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
          AD
        </div>
      </div>
    </header>
  );
}
