import { cn } from "@/lib/utils";
import type { ContactStatus } from "@/services/admin/contactMessageService";

const STYLES: Record<ContactStatus, string> = {
  New:     "bg-violet-100 text-violet-700",
  Read:    "bg-neutral-100 text-neutral-600",
  Replied: "bg-emerald-100 text-emerald-700",
};

export function ContactStatusBadge({ status, className }: { status: ContactStatus; className?: string }) {
  return (
    <span className={cn("inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold", STYLES[status], className)}>
      {status}
    </span>
  );
}

export function formatContactDate(iso: string) {
  return new Date(iso).toLocaleString("en-IN", {
    day: "numeric", month: "short", year: "numeric", hour: "numeric", minute: "2-digit",
    timeZone: "Asia/Kolkata",
  });
}
