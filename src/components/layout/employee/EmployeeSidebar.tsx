"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { employeeNavGroups } from "@/config/employee-nav";
import { cn } from "@/lib/utils";
import { ChevronsLeft, ChevronsRight, LogOut, X } from "lucide-react";
import { Separator } from "@/components/ui/separator";

type Props = {
  isOpen:           boolean;
  onClose:          () => void;
  collapsed:        boolean;
  onToggleCollapse: () => void;
};

export function EmployeeSidebar({ isOpen, onClose, collapsed, onToggleCollapse }: Props) {
  const pathname = usePathname();
  const router   = useRouter();

  const handleSignOut = async () => {
    try { await fetch("/api/auth/logout", { method: "POST" }); } catch { /* ignore */ }
    router.push("/login");
  };

  useEffect(() => { onClose(); /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, [pathname]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar overflow-hidden",
          "transition-all duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "w-72",
          collapsed ? "lg:w-16 lg:translate-x-0" : "lg:w-64 lg:translate-x-0",
        )}
      >
        {/* Collapsed: just logo + expand button */}
        {collapsed && (
          <div className="hidden lg:flex h-16 shrink-0 items-center justify-between border-b border-border px-2">
            <Image src="/mindlyftai_logo.png" alt="Mindlyft AI" width={32} height={32} className="rounded-lg shrink-0" priority />
            <button
              onClick={onToggleCollapse}
              title="Expand sidebar"
              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground"
            >
              <ChevronsRight className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Expanded: logo + name + badge + collapse/close */}
        <div className={cn("flex h-16 shrink-0 items-center border-b border-border px-3 gap-2.5", collapsed && "lg:hidden")}>
          <Image src="/mindlyftai_logo.png" alt="Mindlyft AI" width={36} height={36} className="rounded-xl shrink-0" priority />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-sidebar-foreground leading-tight truncate">Mindlyft AI</p>
            <span className="inline-block mt-0.5 rounded-full bg-violet-500/15 px-2 py-0.5 text-[10px] font-semibold text-violet-600 dark:text-violet-400 leading-none">
              Employee
            </span>
          </div>
          <button
            onClick={onToggleCollapse}
            title="Collapse sidebar"
            className="hidden lg:flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-muted-foreground transition hover:bg-accent hover:text-foreground"
          >
            <ChevronsLeft className="h-4 w-4" />
          </button>
          <button
            onClick={onClose}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition hover:bg-accent hover:text-foreground lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className={cn("flex-1 overflow-y-auto overflow-x-hidden py-4", collapsed ? "lg:px-2 px-3" : "px-3", "space-y-5")}>
          {employeeNavGroups.map((group) => (
            <div key={group.label}>
              <p className={cn("mb-1.5 px-3 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground", collapsed && "lg:hidden")}>
                {group.label}
              </p>
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
                          collapsed ? "lg:justify-center lg:px-0 lg:py-2.5 gap-3 px-3 py-2" : "gap-3 px-3 py-2",
                          active
                            ? "bg-primary/10 text-primary"
                            : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                        )}
                      >
                        <Icon className={cn("h-4 w-4 shrink-0", active ? "text-primary" : "text-muted-foreground group-hover:text-accent-foreground")} />
                        <span className={cn("flex-1", collapsed && "lg:hidden")}>{item.label}</span>
                        {item.badge && (
                          <span className={cn("rounded-full bg-primary/15 px-1.5 py-0.5 text-[10px] font-semibold text-primary", collapsed && "lg:hidden")}>
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

        {/* Sign out */}
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
