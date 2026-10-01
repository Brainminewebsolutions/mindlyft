import { cn } from "@/lib/utils";

interface LineBadgeProps {
  children: React.ReactNode;
  className?: string;
}

// Centred on mobile, left-aligned from `md` up — unless the caller sets its own
// `justify-*` (e.g. "justify-center" for always-centred section headers).
export function LineBadge({ children, className = "" }: LineBadgeProps) {
  const hasJustify = /(^|\s)([a-z]+:)*justify-/.test(className);

  return (
    <div className={cn("flex items-center gap-3", !hasJustify && "justify-center md:justify-start", className)}>
      <span className="block h-px w-10 bg-violet-300" />
      <p className="text-xs font-bold uppercase tracking-widest text-violet-500 whitespace-nowrap">
        {children}
      </p>
      <span className="block h-px w-10 bg-violet-300" />
    </div>
  );
}
