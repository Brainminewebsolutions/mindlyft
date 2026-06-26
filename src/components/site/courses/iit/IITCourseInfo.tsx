import { Clock, Globe, User, Wifi, MapPin, BookOpen, Award, type LucideIcon } from "lucide-react";

interface Props {
  instructor:   string | null;
  mode:         string;
  duration:     number;
  language:     string;
  chapterCount: number;
  lessonCount:  number;
}

interface Stat {
  Icon:  LucideIcon;
  label: string;
  val:   string;
}

const PALETTE = [
  { bg: "#f5f3ff", border: "#7c3aed22", icon: "#7c3aed", label: "#a78bfa" },
  { bg: "#ffffff", border: "#7c3aed18", icon: "#7c3aed", label: "#a78bfa" },
];

export default function IITCourseInfo({ instructor, mode, duration, language, chapterCount, lessonCount }: Props) {
  const ModeIcon: LucideIcon = mode === "Online" ? Wifi : MapPin;

  const stats: Stat[] = [
    { Icon: User,     label: "Instructor",   val: instructor ?? "—"             },
    { Icon: ModeIcon, label: "Mode",          val: mode                          },
    { Icon: Clock,    label: "Duration",      val: `${duration} hours`           },
    { Icon: Globe,    label: "Language",      val: language                      },
    { Icon: Award,    label: "Certification", val: "Certified"        },
    { Icon: BookOpen, label: "Curriculum",    val: `${chapterCount} Ch · ${lessonCount} Lessons` },
  ];

  return (
    <div className="bg-white border-y border-violet-100">
      <div className="mx-auto max-w-[1100px] px-6 py-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {stats.map(({ Icon, label, val }, i) => {
            const c = PALETTE[i % PALETTE.length];
            return (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-2xl px-4 py-5 text-center transition-all hover:scale-[1.03] hover:shadow-md"
                style={{ backgroundColor: c.bg, border: `1px solid ${c.border}` }}
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-sm"
                  style={{ border: `1px solid ${c.border}` }}
                >
                  <Icon className="w-5 h-5" style={{ color: c.icon }} />
                </div>
                <p className="text-[10px] font-bold uppercase tracking-widest" style={{ color: c.label }}>{label}</p>
                <p className="text-[13px] font-semibold text-gray-800 leading-tight">{val}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
