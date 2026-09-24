"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { ChevronDown, Menu, X, LogOut, User, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { StudentNavDropdown } from "@/components/layout/student/StudentNavDropdown";
import { SITE_CONFIG } from "@/constants/siteConfig";

// ── Types ────────────────────────────────────────────────────────────────────

type NavChild  = { label: string; href: string };
type NavItem   = { label: string; href: string; children?: NavChild[] };
type NavCourse = { id: string; name: string; slug: string; courseType: string };

const courseHref = (c: NavCourse) =>
  c.courseType === "IIT" ? `/courses/iit/${c.slug}` : `/courses/mindlyftai/${c.slug}`;

// Closing on mouseleave immediately makes the dropdown vanish while the
// cursor is still crossing the small gap between the trigger and the panel
// (especially on a diagonal path) — a short delay gives it time to land on
// the dropdown before it closes.
function useHoverDropdown(delay = 150) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  return {
    open,
    onMouseEnter: () => {
      if (timer.current) clearTimeout(timer.current);
      setOpen(true);
    },
    onMouseLeave: () => {
      timer.current = setTimeout(() => setOpen(false), delay);
    },
    close: () => {
      if (timer.current) clearTimeout(timer.current);
      setOpen(false);
    },
  };
}

interface NavUser { name: string; email: string; role: string; }
interface Props    { user?: NavUser | null; height?: number; courses?: NavCourse[]; }

// ── Navigation structure ─────────────────────────────────────────────────────

const NAV: NavItem[] = [
  { label: "Home",       href: "/"           },
  { label: "Academy",   href: "/academy", children: [
    { label: "IIT Programs", href: "/iit"       },
    { label: "Workshops",    href: "/workshops" },
    { label: "Webinars",     href: "/webinars"  },
  ]},
  { label: "Courses",   href: "/courses"    }, // rendered via CoursesDesktopItem / mobile accordion
  { label: "Blogs",      href: "/blogs"      },
  { label: "Resources",  href: "/resources"  },
  { label: "About Us",   href: "/about", children: [
    { label: "Our Journey", href: "/our-journey" },
  ]},
  { label: "Contact",   href: "/contact"    },
];

// ── Courses dropdown (desktop) ────────────────────────────────────────────────

function CoursesDesktopItem({ pathname, courses }: { pathname: string; courses: NavCourse[] }) {
  const { open, onMouseEnter, onMouseLeave, close } = useHoverDropdown();
  const isActive = pathname === "/courses" || pathname.startsWith("/courses/");

  return (
    <div
      className="relative"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <Link
        href="/courses"
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 rounded-lg text-[15px] font-semibold transition-colors",
          open || isActive
            ? "text-indigo-600 bg-indigo-50"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        )}
      >
        Courses
        <ChevronDown
          size={13}
          strokeWidth={2.2}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </Link>

      <div className={cn(
        "absolute top-[calc(100%+4px)] left-0 w-[300px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] z-50 transition-all duration-200",
        open ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2 pointer-events-none"
      )}>
        <div className="p-1.5 max-h-[70vh] overflow-y-auto">
          <Link
            href="/courses"
            onClick={close}
            className={cn(
              "block px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors",
              pathname === "/courses"
                ? "text-indigo-600 bg-indigo-50"
                : "text-gray-900 hover:bg-gray-50"
            )}
          >
            All Courses
          </Link>
          {courses.length > 0 && <div className="h-px bg-gray-100 my-1 mx-1.5" />}
          {courses.map(course => {
            const href = courseHref(course);
            return (
              <Link
                key={course.id}
                href={href}
                onClick={close}
                className={cn(
                  "block px-3 py-2 rounded-lg text-[13px] transition-colors",
                  pathname === href
                    ? "text-indigo-600 bg-indigo-50 font-medium"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                )}
              >
                {course.name}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Desktop dropdown item ─────────────────────────────────────────────────────

function DesktopItem({ item, pathname, scrolled }: { item: NavItem; pathname: string; scrolled: boolean }) {
  const { open, onMouseEnter, onMouseLeave, close } = useHoverDropdown();
  const ref = useRef<HTMLDivElement>(null);
  const isActive =
    pathname === item.href ||
    (item.href === "/courses" && pathname.startsWith("/courses/")) ||
    item.children?.some(c => pathname.startsWith(c.href));

  if (!item.children) {
    return (
      <Link
        href={item.href}
        className={cn(
          "px-3 py-2 rounded-lg text-[15px] font-semibold transition-colors",
          isActive
            ? "text-indigo-600 bg-indigo-50"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        )}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div ref={ref} className="relative" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <Link
        href={item.href}
        className={cn(
          "flex items-center gap-1.5 px-3 py-2 rounded-lg text-[15px] font-semibold transition-colors",
          open || isActive
            ? "text-indigo-600 bg-indigo-50"
            : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
        )}
      >
        {item.label}
        <ChevronDown
          size={13}
          strokeWidth={2.2}
          className={cn("transition-transform duration-200", open && "rotate-180")}
        />
      </Link>

      {/* Dropdown panel */}
      <div className={cn(
        "absolute top-[calc(100%+4px)] left-0 min-w-[200px] bg-white border border-gray-200 rounded-xl overflow-hidden shadow-[0_8px_40px_rgba(0,0,0,0.12)] z-50 transition-all duration-200",
        open
          ? "opacity-100 visible translate-y-0"
          : "opacity-0 invisible -translate-y-2 pointer-events-none"
      )}>
        <div className="p-1.5">
          {item.children.map(child => (
            <Link
              key={child.href}
              href={child.href}
              onClick={close}
              className={cn(
                "block px-3 py-2 rounded-lg text-[13px] transition-colors",
                pathname === child.href
                  ? "text-indigo-600 bg-indigo-50 font-medium"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
              )}
            >
              {child.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Mobile nav (accordion) ────────────────────────────────────────────────────

function MobileNav({
  pathname,
  onClose,
  courses,
}: {
  pathname: string;
  onClose: () => void;
  courses: NavCourse[];
}) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <ul className="space-y-0.5">
      {NAV.map(item => {
        const isActive =
          pathname === item.href ||
          (item.href === "/courses" && pathname.startsWith("/courses/")) ||
          item.children?.some(c => pathname.startsWith(c.href));
        const isOpen = openItem === item.label;

        if (item.label === "Courses") {
          return (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => setOpenItem(isOpen ? null : item.label)}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-[15px] font-semibold transition-colors",
                  isActive || isOpen
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                Courses
                <ChevronDown
                  size={14}
                  strokeWidth={2.2}
                  className={cn("transition-transform duration-200", isOpen && "rotate-180")}
                />
              </button>

              {isOpen && (
                <ul className="mt-0.5 ml-3 pl-3 border-l-2 border-indigo-100 space-y-0.5 pb-1">
                  <li>
                    <Link
                      href="/courses"
                      onClick={onClose}
                      className={cn(
                        "block px-3 py-2 rounded-lg text-[13px] font-semibold transition-colors",
                        pathname === "/courses"
                          ? "text-indigo-600 bg-indigo-50"
                          : "text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                      )}
                    >
                      All Courses
                    </Link>
                  </li>
                  {courses.map(course => {
                    const href = courseHref(course);
                    return (
                      <li key={course.id}>
                        <Link
                          href={href}
                          onClick={onClose}
                          className={cn(
                            "block px-3 py-2 rounded-lg text-[13px] transition-colors",
                            pathname === href
                              ? "text-indigo-600 font-medium bg-indigo-50"
                              : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                          )}
                        >
                          {course.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              )}
            </li>
          );
        }

        if (item.children?.length) {
          return (
            <li key={item.label}>
              <button
                type="button"
                onClick={() => setOpenItem(isOpen ? null : item.label)}
                className={cn(
                  "flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-[15px] font-semibold transition-colors",
                  isActive || isOpen
                    ? "text-indigo-600 bg-indigo-50"
                    : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                )}
              >
                {item.label}
                <ChevronDown
                  size={14}
                  strokeWidth={2.2}
                  className={cn("transition-transform duration-200", isOpen && "rotate-180")}
                />
              </button>
              {isOpen && (
                <ul className="mt-0.5 ml-3 pl-3 border-l-2 border-indigo-100 space-y-0.5 pb-1">
                  {item.children.map(child => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        onClick={onClose}
                        className={cn(
                          "block px-3 py-2 rounded-lg text-[13px] transition-colors",
                          pathname === child.href
                            ? "text-indigo-600 font-medium bg-indigo-50"
                            : "text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        )}
                      >
                        {child.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        }

        return (
          <li key={item.label}>
            <Link
              href={item.href}
              onClick={onClose}
              className={cn(
                "block px-3 py-2.5 rounded-lg text-[15px] font-semibold transition-colors",
                isActive
                  ? "text-indigo-600 bg-indigo-50"
                  : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
              )}
            >
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function SiteNavbar({ user, height, courses = [] }: Props) {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [staffOpen,  setStaffOpen]  = useState(false);
  const staffRef = useRef<HTMLDivElement>(null);
  const router   = useRouter();
  const pathname = usePathname();

  useEffect(() => { setMobileOpen(false); setStaffOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!staffOpen) return;
    const h = (e: MouseEvent) => {
      if (staffRef.current && !staffRef.current.contains(e.target as Node)) setStaffOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [staffOpen]);

  const firstName = user?.name?.split(" ")[0] ?? "";
  const initials  = user?.name
    ? user.name.split(" ").map(n => n[0]).slice(0, 2).join("").toUpperCase()
    : "";

  const profileHref =
    user?.role === "ADMIN"   ? "/admin/dashboard"   :
    user?.role === "TEACHER" ? "/teacher/dashboard" :
    "/student/profile";

  async function handleLogout() {
    try { await fetch("/api/auth/logout", { method: "POST" }); } catch { /* ignore */ }
    router.refresh();
    router.replace("/");
  }

  return (
    <>
      {/* ── Navbar bar ── */}
      <header
        className="fixed top-0 left-0 right-0 z-[999] bg-transparent"
      >
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6  h-full flex items-center">
          <div className={cn(
            "flex items-center justify-between w-full px-4 transition-all duration-300",
            scrolled
              ? "bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)] border border-gray-200 rounded-2xl h-[60px]"
              : "bg-white/90 backdrop-blur-md shadow-sm border border-gray-200 rounded-2xl h-[60px]"
          )}>

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 flex-shrink-0">
              <Image
                src={SITE_CONFIG.logo1}
                alt="MindlyftAI"
                width={44}
                height={44}
                priority
                style={{ width: 44, height: 44 }}
              />
              <span className="text-base sm:text-xl font-bold tracking-tight text-gray-900">{SITE_CONFIG.name}</span>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden xl:flex items-center gap-0.5">
              {NAV.map(item =>
                item.label === "Courses" ? (
                  <CoursesDesktopItem key="courses" pathname={pathname} courses={courses} />
                ) : (
                  <DesktopItem key={item.href + item.label} item={item} pathname={pathname} scrolled={scrolled} />
                )
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">

              {/* Desktop auth */}
              <div className="hidden xl:flex items-center">
                {!user ? (
                  <Link
                    href="/login"
                    prefetch={false}
                    className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
                  >
                    Sign in <ArrowRight size={14} />
                  </Link>
                ) : user.role === "STUDENT" ? (
                  <StudentNavDropdown
                    name={user.name}
                    initials={initials}
                    firstName={firstName}
                    onLogout={handleLogout}
                  />
                ) : (
                  /* Staff (admin / teacher) dropdown */
                  <div ref={staffRef} className="relative">
                    <button
                      type="button"
                      onClick={() => setStaffOpen(v => !v)}
                      className="flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors hover:bg-gray-100"
                    >
                      <div className="w-8 h-8 rounded-full bg-indigo-100 border border-indigo-200 flex items-center justify-center text-[11px] font-bold text-indigo-700 shrink-0">
                        {initials}
                      </div>
                      <span className="text-sm font-semibold text-gray-800">{user.name}</span>
                      <ChevronDown
                        size={12}
                        strokeWidth={1.5}
                        className={cn("text-gray-400 shrink-0 transition-transform duration-200", staffOpen && "rotate-180")}
                      />
                    </button>

                    <div className={cn(
                      "absolute top-[calc(100%+8px)] right-0 min-w-[180px] bg-white border border-gray-200 rounded-xl p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.12)] z-[9999] transition-all duration-[180ms]",
                      staffOpen
                        ? "opacity-100 visible translate-y-0"
                        : "opacity-0 invisible -translate-y-1.5 pointer-events-none"
                    )}>
                      <div className="px-3 py-2 mb-1 border-b border-gray-100">
                        <p className="m-0 text-[13px] font-semibold text-gray-900">{user.name}</p>
                      </div>
                      <Link
                        href={profileHref}
                        onClick={() => setStaffOpen(false)}
                        className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[13.5px] font-medium text-gray-600 no-underline hover:bg-gray-50 hover:text-gray-900 transition-colors"
                      >
                        <User size={15} strokeWidth={2} />
                        Profile
                      </Link>
                      <div className="h-px bg-gray-100 my-1 mx-1.5" />
                      <button
                        onClick={() => { setStaffOpen(false); handleLogout(); }}
                        className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-[13.5px] font-medium text-gray-600 bg-transparent border-none cursor-pointer hover:bg-red-50 hover:text-red-600 transition-colors text-left"
                      >
                        <LogOut size={15} strokeWidth={2} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile hamburger */}
              <button
                type="button"
                aria-label="Toggle navigation"
                onClick={() => setMobileOpen(v => !v)}
                className="xl:hidden flex items-center justify-center w-9 h-9 rounded-lg transition-colors text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>

            </div>
          </div>
        </div>
      </header>

      {/* ── Mobile backdrop ── */}
      <div
        className={cn(
          "fixed inset-0 z-[997] bg-black/30 backdrop-blur-sm xl:hidden transition-opacity duration-300",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileOpen(false)}
      />

      {/* ── Mobile drawer (slides from right) ── */}
      <aside className={cn(
        "fixed top-0 right-0 h-full w-[300px] z-[998] bg-white border-l border-gray-200 shadow-2xl transition-transform duration-300 ease-in-out xl:hidden flex flex-col",
        mobileOpen ? "translate-x-0" : "translate-x-full"
      )}>

        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 h-[88px] border-b border-gray-100 shrink-0">
          <Link href="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
            <Image
              src={SITE_CONFIG.logo1}
              alt="MindlyftAI"
              width={32}
              height={32}
              style={{ width: 32, height: 32 }}
            />
            <span className="text-base font-bold text-gray-900 tracking-tight">MindlyftAI</span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="flex items-center justify-center w-8 h-8 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4">

          <MobileNav pathname={pathname} onClose={() => setMobileOpen(false)} courses={courses} />

          {/* Auth section */}
          <div className="pt-4 border-t border-gray-100">
            {!user ? (
              <Link
                href="/login"
                prefetch={false}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center gap-2 w-full px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors"
              >
                Sign in <ArrowRight size={14} />
              </Link>
            ) : (
              <div className="space-y-1">
                {/* User info */}
                <div className="flex items-center gap-3 px-3 py-2 mb-1">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white shrink-0">
                    {initials}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
                    <p className="text-xs text-gray-400 capitalize">{user.role.toLowerCase()}</p>
                  </div>
                </div>

                <Link
                  href={profileHref}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                >
                  <User size={15} strokeWidth={2} />
                  Profile
                </Link>
                <button
                  onClick={() => { setMobileOpen(false); handleLogout(); }}
                  className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-lg text-sm text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors bg-transparent border-none cursor-pointer text-left"
                >
                  <LogOut size={15} strokeWidth={2} />
                  Logout
                </button>
              </div>
            )}
          </div>

        </div>
      </aside>
    </>
  );
}
