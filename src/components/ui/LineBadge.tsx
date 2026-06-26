interface LineBadgeProps {
  children: React.ReactNode;
  className?: string;
}

export function LineBadge({ children, className = "" }: LineBadgeProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="block h-px w-10 bg-violet-300" />
      <p className="text-xs font-bold uppercase tracking-widest text-violet-500 whitespace-nowrap">
        {children}
      </p>
      <span className="block h-px w-10 bg-violet-300" />
    </div>
  );
}
