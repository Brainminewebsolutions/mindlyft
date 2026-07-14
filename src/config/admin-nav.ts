import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  Video,
  ClipboardList,
  CreditCard,
  BarChart2,
  Bell,
  Settings,
  ShieldCheck,
  LogOut,
  Wrench,
  MessageSquare,
  CalendarCheck,
  Handshake,
  Newspaper,
  Tag,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label: string;
  href:  string;
  icon:  LucideIcon;
  badge?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const adminNavGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
     ],
  },
  {
    label: "People",
    items: [
      { label: "Employees", href: "/admin/employees", icon: Users          },
      { label: "Students",  href: "/admin/students",  icon: GraduationCap  },
    ],
  },
  {
    label: "Content",
    items: [
      { label: "Courses",           href: "/admin/courses",             icon: BookOpen },
      { label: "Course Categories", href: "/admin/course-categories",   icon: Tag      },
      { label: "Blog Articles",  href: "/admin/blog",     icon: Newspaper },
      { label: "Blog Categories", href: "/admin/blog-categories", icon: Tag },
      { label: "Workshops",   href: "/admin/webinars",    icon: Video        },
      { label: "Tool Cards",  href: "/admin/tools",       icon: Wrench       },
      { label: "Enrollments",    href: "/admin/enrollments",           icon: ClipboardList },
      { label: "Registrations", href: "/admin/webinar-registrations", icon: CalendarCheck },
      { label: "Orders",        href: "/admin/orders",                icon: CreditCard    },
      { label: "Testimonials",       href: "/admin/testimonials", icon: MessageSquare },
      { label: "Recruiting Partners", href: "/admin/partners",     icon: Handshake     },
    ],
  },
  {
    label: "System",
    items: [
      { label: "Announcements", href: "/admin/announcements",  icon: Bell,       badge: "3" },
      { label: "Roles",         href: "/admin/settings/roles", icon: ShieldCheck },
      { label: "Settings",      href: "/admin/settings",       icon: Settings    },
    ],
  },
];

export const adminBottomNav = [
  { label: "Sign Out", href: "/api/auth/signout", icon: LogOut },
];
