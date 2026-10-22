import { cn } from "@/lib/utils";
import type { LiveState } from "@/services/student/studentWorkshopService";

const STYLES: Record<LiveState, string> = {
  Upcoming: "bg-blue-50 text-blue-700 border-blue-200",
  Live:     "bg-red-50 text-red-600 border-red-200",
  Ended:    "bg-slate-50 text-slate-600 border-slate-200",
};

export function LiveStateBadge({ state, className }: { state: LiveState; className?: string }) {
  return (
    <span className={cn(
      "inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10px] font-semibold",
      STYLES[state], className,
    )}>
      {state === "Live" && (
        <span className="relative flex size-1.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex size-1.5 rounded-full bg-red-500" />
        </span>
      )}
      {state === "Live" ? "Live now" : state}
    </span>
  );
}
