import { CheckCircle2 } from "lucide-react";

interface Props {
  highlights: string[];
  title?:     string;
  color?:     string;
  bgColor?:   string;
}

export default function Skills({
  highlights,
  title    = "What You Learn",
  color    = "#6c63ff",
  bgColor  = "#f5f3ff",
}: Props) {
  if (highlights.length === 0) return null;

  return (
    <div>
      <h2
        className="text-2xl md:text-4xl font-black mb-[18px] pb-3 border-b-2 [font-family:var(--secondaryFont,sans-serif)]"
        style={{ borderColor: bgColor, color }}
      >
        {title}
      </h2>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-3">
        {highlights.map((h, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 rounded-xl px-4 py-3.5 transition-shadow duration-200 hover:shadow-md"
            style={{
              backgroundColor: bgColor,
              border: `1px solid ${color}26`,
            }}
          >
            <CheckCircle2 className="h-4 w-4 shrink-0" style={{ color }} />
            <span className="text-[13.5px] font-medium text-[#333]">{h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
