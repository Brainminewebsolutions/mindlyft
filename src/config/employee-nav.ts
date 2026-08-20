import {
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
    label: "Support",
    items: [
      { label: "Support Chat", href: "/employee/support", icon: MessageCircle },
    ],
  },
];
