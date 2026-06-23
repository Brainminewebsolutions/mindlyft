"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { adminNavGroups } from "@/config/admin-nav";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight, LogOut, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Props = {
  isOpen:           boolean;
  onClose:          () => void;
  collapsed:        boolean;
  onToggleCollapse: () => void;
};

export function AdminSidebar({ isOpen, onClose, collapsed, onToggleCollapse }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    try { await fetch("/api/auth/logout", { method: "POST" }); } catch { /* ignore */ }
    router.push("/login");
  };

  // Close drawer on mobile when route changes
  useEffect(() => { onClose(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [pathname]);

  // Escape closes mobile drawer
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar panel */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar overflow-hidden",
          "transition-all duration-300 ease-in-out",
          // Mobile: open = slide in, closed = off-screen; always full width on mobile
          isOpen ? "translate-x-0" : "-translate-x-full",
          "w-72",
          // Desktop: always visible; width switches on collapse
          collapsed ? "lg:w-16 lg:translate-x-0" : "lg:w-64 lg:translate-x-0",
        )}
      >
        {/* ── Logo row ───────────────────────────────────────────────────────── */}

        {/* Desktop collapsed: logo left + expand button right, no padding, justify-between */}
        {collapsed && (
          <div className="hidden lg:flex h-16 shrink-0 items-center justify-between border-b border-border px-1">
            <Image
              src="/mindlyftai_logo.png"
              alt="Mindlyft AI"
              width={32}
              height={32}
              className="rounded-lg shrink-0"
              priority
            />
            <button
              onClick={onToggleCollapse}
              title="Expand sidebar"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Desktop expanded + mobile: full logo row */}
        <div className={cn(
          "flex h-16 shrink-0 items-center border-b border-border px-3 gap-2",
          collapsed && "lg:hidden",
        )}>
          <Image
            src="/mindlyftai_logo.png"
            alt="Mindlyft AI"
            width={32}
            height={32}
            className="rounded-lg shrink-0"
            priority
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-sidebar-foreground truncate">Mindlyft AI</p>
            
          </div>
          {/* Desktop collapse toggle */}
          <button
            onClick={onToggleCollapse}
            title="Collapse sidebar"
            className="hidden lg:flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          {/* Mobile close */}
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* ── Nav ────────────────────────────────────────────────────────────── */}
        <nav className={cn("flex-1 overflow-y-auto overflow-x-hidden py-4", collapsed ? "lg:px-2 px-3" : "px-3", "space-y-5")}>
          {adminNavGroups.map((group) => (
            <div key={group.label}>
              {/* Group label hidden when collapsed */}
              <p className={cn(
                "mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground",
                collapsed && "lg:hidden",
              )}>
                {group.label}
              </p>

              {/* Divider shown instead of label when collapsed */}
              {collapsed && <div className="hidden lg:block mb-2 border-t border-border" />}

              <ul className="space-y-0.5" style={{ paddingLeft: collapsed ? 0 : 8 }}>
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  const Icon   = item.icon;
                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        title={collapsed ? item.label : undefined}
                        className={cn(
                          "group flex items-center rounded-lg text-sm font-medium transition-all",
                          collapsed
                            ? "lg:justify-center lg:px-0 lg:py-2.5 gap-3 px-3 py-2"
                            : "gap-3 px-3 py-2",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        )}
                      >
                        <Icon className={cn(
                          "h-4 w-4 shrink-0",
                          active ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground",
                        )} />

                        {/* Label — hidden in collapsed desktop mode */}
                        <span className={cn("flex-1", collapsed && "lg:hidden")}>
                          {item.label}
                        </span>

                        {/* Badge */}
                        {item.badge && (
                          <span className={cn(
                            "rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary",
                            collapsed && "lg:hidden",
                          )}>
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>

        {/* ── Bottom ─────────────────────────────────────────────────────────── */}
        <div className={cn("shrink-0 py-3", collapsed ? "lg:px-2 px-3" : "px-3")}>
          <Separator className="mb-2" />

          <button
            onClick={handleSignOut}
            title={collapsed ? "Sign Out" : undefined}
            className={cn(
              "flex w-full items-center rounded-lg py-2 text-sm font-medium",
              "text-muted-foreground transition hover:bg-destructive/10 hover:text-destructive",
              collapsed ? "lg:justify-center lg:px-0 gap-3 px-3" : "gap-3 px-3",
            )}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span className={cn(collapsed && "lg:hidden")}>Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
}
