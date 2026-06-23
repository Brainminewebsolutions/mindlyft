import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  User,
  MessageCircle,
  type LucideIcon,
} from "lucide-react";

export type NavItem = {
  label:  string;
  href:   string;
  icon:   LucideIcon;
  badge?: string;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

export const employeeNavGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { label: "Dashboard", href: "/employee/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "My Work",
    items: [
      { label: "My Courses",  href: "/employee/courses",  icon: BookOpen       },
      { label: "My Students", href: "/employee/students", icon: GraduationCap  },
    ],
  },
  {
    label: "Support",
    items: [
      { label: "Support Chat", href: "/employee/support", icon: MessageCircle },
    ],
  },
  {
    label: "Account",
    items: [
      { label: "Profile", href: "/employee/profile", icon: User },
    ],
  },
];
