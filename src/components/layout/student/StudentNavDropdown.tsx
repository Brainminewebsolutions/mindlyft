"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, User, LogOut, BookOpen, Video, Wrench } from "lucide-react";
import { cn } from "@/lib/utils";

const STUDENT_NAV = [
  { href: "/student/courses",   label: "My Courses", icon: BookOpen        },
  { href: "/student/workshops", label: "Workshops",  icon: Wrench          },
  { href: "/student/webinars",  label: "Webinars",   icon: Video           },
  { href: "/student/profile",   label: "Profile",    icon: User            },
];

interface DropdownProps {
  name:      string;
  initials:  string;
  firstName: string;
  onLogout:  () => void;
}

interface MobileProps {
  name:     string;
  initials: string;
  isOpen:   boolean;
  onClose:  () => void;
  onLogout: () => void;
}

/* ─── Desktop click-controlled dropdown ─── */
export function StudentNavDropdown({ name, initials, firstName, onLogout }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref             = useRef<HTMLDivElement>(null);
  const pathname        = usePathname();

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on route change
  useEffect(() => { setOpen(false); }, [pathname]);

  return (
    <div ref={ref} className="relative">

      {/* Pill trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2 py-[5px] pr-3 pl-[5px] rounded-full bg-white border border-black/10 shadow-sm cursor-pointer transition-all duration-200 hover:shadow-md hover:border-black/[0.18]"
      >
        <div className="w-[30px] h-[30px] rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-[10px] font-extrabold text-white shrink-0">
          {initials}
        </div>
        <span className="text-[13.5px] font-semibold text-gray-800">{firstName}</span>
        <ChevronDown
          size={12}
          strokeWidth={2}
          className={cn("text-gray-400 transition-transform duration-200", open && "rotate-180")}
        />
      </button>

      {/* Dropdown panel */}
      <div
        className={cn(
          "absolute top-[calc(100%+8px)] right-0 w-[250px] bg-white border border-black/[0.08] rounded-2xl overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.14),0_2px_8px_rgba(0,0,0,0.06)] z-[9999] transition-all duration-[180ms] ease-in-out",
          open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1.5 pointer-events-none"
        )}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 bg-gradient-to-br from-violet-50 to-blue-50 border-b border-black/[0.06]">
          <div className="w-11 h-11 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-base font-extrabold text-white shrink-0 shadow-[0_2px_8px_rgba(139,92,246,0.35)]">
            {initials}
          </div>
          <div>
            <p className="m-0 mb-1 text-[13.5px] font-bold text-gray-900 leading-none">{name}</p>
            <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-violet-100 text-violet-700 tracking-wider uppercase">
              Student
            </span>
          </div>
        </div>

        {/* Nav items */}
        <div className="p-1.5">
          {STUDENT_NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13.5px] no-underline transition-colors",
                  active
                    ? "bg-violet-100 text-violet-900 font-semibold"
                    : "text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <Icon
                  size={15}
                  strokeWidth={2}
                  className={active ? "text-violet-600 shrink-0" : "text-gray-400 shrink-0"}
                />
                {label}
              </Link>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-1.5 border-t border-black/[0.06]">
          <button
            onClick={() => { setOpen(false); onLogout(); }}
            className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-[10px] text-[13.5px] font-medium text-red-500 bg-transparent border-none cursor-pointer hover:bg-red-50 transition-colors text-left"
          >
            <LogOut size={15} strokeWidth={2} />
            Logout
          </button>
        </div>
      </div>

    </div>
  );
}

/* ─── Mobile panel (parent-state controlled) ─── */
export function StudentMobileMenu({ name, initials, isOpen, onClose, onLogout }: MobileProps) {
  const pathname = usePathname();

  if (!isOpen) return null;

  return (
    <div className="absolute top-[calc(100%+12px)] right-0 w-[240px] bg-white border border-black/[0.09] rounded-2xl overflow-hidden shadow-[0_10px_36px_rgba(0,0,0,0.14)] z-[9999]">

      {/* Header */}
      <div className="flex items-center gap-2.5 px-3.5 py-3 bg-gradient-to-br from-violet-50 to-blue-50 border-b border-black/[0.06]">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-xs font-extrabold text-white shrink-0">
          {initials}
        </div>
        <div>
          <p className="m-0 mb-1 text-[13px] font-bold text-gray-900 leading-none">{name}</p>
          <span className="inline-block px-1.5 py-0.5 rounded-full text-[9.5px] font-bold bg-violet-100 text-violet-700 tracking-wider uppercase">
            Student
          </span>
        </div>
      </div>

      {/* Nav items */}
      <div className="p-1.5">
        {STUDENT_NAV.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2.5 rounded-[10px] text-[13px] no-underline transition-colors",
                active
                  ? "bg-[#d4ff12]/20 text-[#3a4800] font-semibold"
                  : "text-gray-600 font-medium hover:bg-gray-100 hover:text-gray-900"
              )}
            >
              <Icon
                size={15}
                strokeWidth={2}
                className={active ? "text-violet-600 shrink-0" : "text-gray-400 shrink-0"}
              />
              {label}
            </Link>
          );
        })}
      </div>

      {/* Footer */}
      <div className="p-1.5 border-t border-black/[0.06]">
        <button
          onClick={() => { onClose(); onLogout(); }}
          className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-[10px] text-[13px] font-medium text-red-500 bg-transparent border-none cursor-pointer hover:bg-red-50 transition-colors text-left"
        >
          <LogOut size={15} strokeWidth={2} />
          Logout
        </button>
      </div>

    </div>
  );
}
