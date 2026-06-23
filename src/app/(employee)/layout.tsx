"use client";

import { useEffect, useState } from "react";
import { EmployeeSidebar } from "@/components/layout/employee/EmployeeSidebar";
import { EmployeeHeader }  from "@/components/layout/employee/EmployeeHeader";
import { cn } from "@/lib/utils";

const STORAGE_KEY = "employee-sidebar-collapsed";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed,   setCollapsed]   = useState(false);

  useEffect(() => {
    setCollapsed(localStorage.getItem(STORAGE_KEY) === "true");
  }, []);

  const toggleCollapse = () => {
    setCollapsed((prev) => {
      const next = !prev;
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <EmployeeSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
      />

      <div
        className={cn(
          "flex flex-col transition-[padding] duration-300 ease-in-out",
          collapsed ? "lg:pl-16" : "lg:pl-64",
        )}
      >
        <EmployeeHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
