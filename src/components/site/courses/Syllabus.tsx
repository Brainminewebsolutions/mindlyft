import { ChevronDown, PlayCircle, FileText } from "lucide-react";
import type { CourseChapterItem } from "@/types/student/course";

interface Props {
  chapters:     CourseChapterItem[];
  totalLessons: number;
  heading?:     string;
  showHeader?:  boolean;
  color?:       string;
  bgColor?:     string;
}

export default function Syllabus({
  chapters,
  totalLessons,
  heading = "Course Syllabus",
  showHeader = true,
  color   = "#7c3aed",
  bgColor = "#f5f3ff",
}: Props) {
  if (chapters.length === 0) return null;

  return (
    <section>
      {showHeader && (
      <div className="flex items-center justify-between mb-5 pb-3 border-b" style={{ borderColor: `${color}30` }}>
        <h2 className="text-2xl md:text-4xl font-black m-0" style={{ color }}>{heading}</h2>
        <span
          className="text-xs font-semibold px-3 py-1 rounded-full border"
          style={{ color, backgroundColor: bgColor, borderColor: `${color}40` }}
        >
          {chapters.length} chapters · {totalLessons} lessons
        </span>
      </div>
      )}
      <div className="space-y-2">
        {chapters.map((ch, chIdx) => (
          <details
            key={ch.id}
            open={chIdx === 0}
            className="group overflow-hidden rounded-xl border"
            style={{ borderColor: `${color}20` }}
          >
            <summary
              className="flex cursor-pointer select-none list-none items-start gap-3 px-3 py-4 transition-colors sm:px-5 [&::-webkit-details-marker]:hidden"
              style={{ backgroundColor: `${bgColor}99` }}
            >
              <div
                className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-black text-white"
                style={{ backgroundColor: color }}
              >
                {chIdx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="m-0 text-sm font-bold leading-snug text-gray-900">{ch.title}</p>
                {ch.description && (
                  <p className="m-0 mt-0.5 text-xs leading-relaxed text-gray-500">{ch.description}</p>
                )}
              </div>
              <span className="text-xs font-semibold shrink-0" style={{ color }}>
                {ch.contents.length} lesson{ch.contents.length !== 1 ? "s" : ""}
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
            </summary>

            {ch.contents.length > 0 ? (
              <ul className="m-0 list-none p-0 bg-white">
                {ch.contents.map((lesson, lIdx) => (
                  <li
                    key={lesson.id}
                    className="flex items-center gap-3 border-b py-3 pl-6 pr-4 text-sm sm:pl-14 sm:pr-5 text-gray-500 last:border-b-0 hover:text-gray-800 transition-colors"
                    style={{ borderColor: `${color}10` }}
                  >
                    {lesson.hasVideo
                      ? <PlayCircle className="h-3.5 w-3.5 shrink-0" style={{ color }} />
                      : <FileText   className="h-3.5 w-3.5 shrink-0 text-gray-300" />}
                    <span className="min-w-[20px] shrink-0 text-[11px] font-semibold text-gray-400">{lIdx + 1}.</span>
                    <span className="flex-1">{lesson.title}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="m-0 px-5 py-3 text-xs text-gray-400 bg-white">No lessons yet</p>
            )}
          </details>
        ))}
      </div>
    </section>
  );
}
