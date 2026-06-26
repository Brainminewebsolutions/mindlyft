export function SectionDivider() {
  return (
    <div className="flex w-fit items-center gap-3 mt-1">
      <span className="block h-px w-16 bg-gradient-to-r from-transparent to-violet-300" />
      <span className="w-1.5 h-1.5 rounded-full bg-violet-400 opacity-60" />
      <span className="block h-px w-16 bg-gradient-to-l from-transparent to-violet-300" />
    </div>
  );
}
