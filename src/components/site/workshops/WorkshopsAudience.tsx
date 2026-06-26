import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";

const CARDS = [
  {
    num: "01",
    dept: "Engineering & Product",
    deptColor: "#8B5CF6",
    title: "Ship faster, with fewer blind spots",
    desc: "A weekend with a new tool or framework means you walk back into sprint planning already knowing where it fits — and where it doesn't.",
    bg: "#faf9ff",
    border: "#ede9fe",
  },
  {
    num: "02",
    dept: "Sales & Marketing",
    deptColor: "#059669",
    title: "Turn a hunch into a number",
    desc: "Learning to read a dashboard or run a basic test changes how you pitch a campaign — you bring evidence into the room, not just instinct.",
    bg: "#f0fdf8",
    border: "#a7f3d0",
  },
  {
    num: "03",
    dept: "HR & People Ops",
    deptColor: "#3B82F6",
    title: "Make people decisions on data, not vibes",
    desc: "A single afternoon on people analytics gives you the language to defend a hiring plan or a retention strategy with numbers, not just a gut feeling.",
    bg: "#f0f7ff",
    border: "#bfdbfe",
  },
  {
    num: "04",
    dept: "Finance & Operations",
    deptColor: "#D97706",
    title: "Stop waiting on someone else's report",
    desc: "Build the dashboard yourself instead of requesting it — and stop being the bottleneck in your own monthly close.",
    bg: "#fffbeb",
    border: "#fde68a",
  },
  {
    num: "05",
    dept: "Design & Research",
    deptColor: "#EC4899",
    title: "Back up taste with evidence",
    desc: "A short, hands-on session on analysis tools means your design decisions can finally point to a number, not just a strong opinion in a review.",
    bg: "#fdf4ff",
    border: "#f5d0fe",
  },
  {
    num: "06",
    dept: "Leadership & Founders",
    deptColor: "#6366F1",
    title: "Ask better questions of your own team",
    desc: "You don't need to build the model — you need to know what a good one looks like, and what question to ask when someone shows you a chart.",
    bg: "#eef2ff",
    border: "#c7d2fe",
  },
];

export default function WorkshopsAudience({ bg = "bg-stone-50" }: { bg?: string }) {
  return (
    <section className={`${bg} px-6 md:px-[60px] py-24`}>
      <div className="max-w-6xl mx-auto">

        <div className="mb-14 max-w-2xl">
          <AnimateIn delay={0} direction="left">
            <LineBadge className="mb-5">Built For Every Desk</LineBadge>
          </AnimateIn>
          <AnimateIn delay={100} direction="left">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 leading-tight mb-5">
              One workshop floor.{" "}
              <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                A dozen different reasons
              </span>{" "}
              to be in the room.
            </h2>
          </AnimateIn>
          <AnimateIn delay={200} direction="left">
            <p className="text-base text-gray-500 leading-relaxed">
              The same Saturday session means something different depending on what you do Monday through Friday. Here&apos;s how it actually plays out, department by department.
            </p>
          </AnimateIn>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {CARDS.map(({ num, dept, deptColor, title, desc, bg: cardBg, border }, i) => (
            <AnimateIn key={num} delay={300 + i * 70} direction="up">
              <div
                className="rounded-2xl p-6 h-full flex flex-col hover:-translate-y-0.5 hover:shadow-md transition-all duration-300"
                style={{ background: cardBg, border: `1.5px solid ${border}` }}
              >
                <p className="text-xs font-black text-gray-300 mb-3 tracking-widest">{num}</p>
                <p className="text-[11px] font-bold uppercase tracking-wider mb-3" style={{ color: deptColor }}>
                  {dept}
                </p>
                <h4 className="text-base font-bold text-gray-900 leading-snug mb-3">{title}</h4>
                <p className="text-sm text-gray-500 leading-relaxed flex-1">{desc}</p>
              </div>
            </AnimateIn>
          ))}
        </div>

      </div>
    </section>
  );
}
