export type SessionStatus = "Hosted" | "Upcoming";

export interface Session {
  icon: string;
  iconBg: string;
  status: SessionStatus;
  title: string;
  description: string;
  meta: string[];
}

export interface UpcomingItem {
  day: string;
  month: string;
  title: string;
  description: string;
}

export interface Stat {
  num: string;
  label: string;
}

export interface AboutChip {
  emoji: string;
  label: string;
}

export interface Step {
  num: number;
  title: string;
  description: string;
}

export interface PathNode {
  emoji: string;
  title: string;
  description: string;
  circleBg: string;
  flag?: { text: string; tone: "start" | "goal" };
}

export interface Testimonial {
  quote: string;
  initials: string;
  avatarBg: string;
  name: string;
  role: string;
}

export interface ArchiveItem {
  thumb: string;
  tag: string;
  title: string;
  views: string;
  duration: string;
}

export interface BonusItem {
  icon: string;
  title: string;
}

export const heroStats: Stat[] = [
  { num: "40+", label: "Sessions Hosted" },
  { num: "8K+", label: "Community Members" },
  { num: "95%", label: "Satisfaction Rate" },
  { num: "20+", label: "Expert Speakers" },
];

export const sessions: Session[] = [
  {
    icon: "🧠",
    iconBg: "bg-violet-100",
    status: "Hosted",
    title: "Knowledge Booster Sessions",
    description:
      "Deep dives into trending topics — tech, business, design, and more. Curated to expand what you know and spark what you build.",
    meta: ["📅 Monthly", "⏱ 60 min", "🎥 Recorded"],
  },
  {
    icon: "🚀",
    iconBg: "bg-blue-100",
    status: "Hosted",
    title: "Career Guidance Sessions",
    description:
      "Real talk with industry pros — from resume hacks to navigating job switches, internships, and salary negotiations.",
    meta: ["📅 Bi-Monthly", "⏱ 90 min", "💬 Q&A Included"],
  },
  {
    icon: "💡",
    iconBg: "bg-indigo-100",
    status: "Upcoming",
    title: "Founder & Startup Stories",
    description:
      "Candid conversations with founders who've built, failed, and rebuilt. Zero fluff, full honesty about what it really takes.",
    meta: ["📅 Quarterly", "⏱ 75 min", "🔔 Register Now"],
  },
  {
    icon: "🛠️",
    iconBg: "bg-pink-100",
    status: "Hosted",
    title: "Skill-Building Workshops",
    description:
      "Hands-on sessions covering tools like Figma, Python, Notion, and productivity systems — learn by doing, not watching.",
    meta: ["📅 Bi-Weekly", "⏱ 45 min", "💻 Interactive"],
  },
  {
    icon: "🤝",
    iconBg: "bg-teal-100",
    status: "Upcoming",
    title: "Community AMA Nights",
    description:
      "Ask Anything sessions with community mentors and leaders. Drop your questions live — no script, no filters, pure insight.",
    meta: ["📅 Monthly", "⏱ 60 min", "🎙️ Open Format"],
  },
  {
    icon: "🌍",
    iconBg: "bg-orange-100",
    status: "Upcoming",
    title: "Global Trends Roundtable",
    description:
      "Monthly panel discussions on what's shifting across industries — AI, remote work, sustainability, and the future of work.",
    meta: ["📅 Monthly", "⏱ 90 min", "🌐 Multi-speaker"],
  },
];

export const upcomingItems: UpcomingItem[] = [
  {
    day: "28",
    month: "Jun",
    title: "Breaking Into Tech in 2025 — Career Panel",
    description:
      "3 industry veterans share how to land your first (or next) tech role — with real resume reviews.",
  },
  {
    day: "05",
    month: "Jul",
    title: "The AI Tsunami — What It Means for Your Career",
    description:
      "Knowledge session exploring how AI reshapes roles and what skills keep you ahead of the curve.",
  },
  {
    day: "19",
    month: "Jul",
    title: "Community AMA: Ask a Senior Engineer Anything",
    description:
      "Live Q&A with a lead engineer from a top product company — your questions, their unfiltered answers.",
  },
  {
    day: "02",
    month: "Aug",
    title: "Figma for Beginners — Design Workshop",
    description:
      "Hands-on, zero-experience-needed crash course to go from blank canvas to your first real design.",
  },
];

export const aboutChips: AboutChip[] = [
  { emoji: "📚", label: "Knowledge Sharing" },
  { emoji: "🎯", label: "Career Growth" },
  { emoji: "🧑‍🤝‍🧑", label: "Real Community" },
  { emoji: "🎙️", label: "Expert Speakers" },
  { emoji: "🔁", label: "Replay Access" },
  { emoji: "🌐", label: "Global Reach" },
];

export const steps: Step[] = [
  {
    num: 1,
    title: "Find a Session",
    description:
      "Browse upcoming webinars across topics and pick what resonates with where you are right now.",
  },
  {
    num: 2,
    title: "Reserve Your Spot",
    description:
      "One-click registration. You'll get a reminder, calendar link, and prep materials — all in your inbox.",
  },
  {
    num: 3,
    title: "Show Up & Engage",
    description:
      "Join live, ask questions, take notes, and connect with other attendees in real time.",
  },
  {
    num: 4,
    title: "Watch Anytime",
    description:
      "Can't make it live? Every session is recorded and made available to registered members afterward.",
  },
];

export const pathNodes: PathNode[] = [
  {
    emoji: "🎥",
    title: "Free Webinar",
    description: "Live & on-demand sessions, open to everyone.",
    circleBg: "bg-periwinkle",
    flag: { text: "You start here", tone: "start" },
  },
  {
    emoji: "🛠️",
    title: "Workshop",
    description: "Hands-on practice applying what you learned.",
    circleBg: "bg-[#A78BFA]",
  },
  {
    emoji: "🎓",
    title: "Certification Program",
    description: "Structured curriculum with an earned credential.",
    circleBg: "bg-purple",
  },
  {
    emoji: "🚀",
    title: "Project Building",
    description: "A portfolio-ready project with mentor feedback.",
    circleBg: "bg-[#5B21B6]",
  },
  {
    emoji: "💼",
    title: "Internship / Career Support",
    description: "Real-world experience and placement guidance.",
    circleBg: "bg-indigo",
    flag: { text: "Career outcome", tone: "goal" },
  },
];

export const testimonials: Testimonial[] = [
  {
    quote:
      "The career guidance session completely changed how I was approaching my job search. Got my offer within 6 weeks of attending.",
    initials: "AK",
    avatarBg: "bg-gradient-to-br from-purple to-purple-mid",
    name: "Ananya Krishnan",
    role: "Software Engineer, Bangalore",
  },
  {
    quote:
      "Best webinar format I've been to. No filler, no slides that just repeat what the speaker says — pure conversation and real Q&A.",
    initials: "RS",
    avatarBg: "bg-gradient-to-br from-[#3B82F6] to-blue",
    name: "Rohan Sharma",
    role: "Product Manager, Mumbai",
  },
  {
    quote:
      "The knowledge sessions have become a ritual for me — I block the calendar the moment they announce the next one. Genuinely addictive.",
    initials: "PM",
    avatarBg: "bg-gradient-to-br from-indigo to-purple",
    name: "Priya Mehta",
    role: "Freelance Designer, Pune",
  },
];

export const archiveItems: ArchiveItem[] = [
  {
    thumb: "bg-gradient-to-br from-violet-100 to-blue-100",
    tag: "Career Guidance",
    title: "Resume Reviews Live: What Recruiters Actually Look For",
    views: "1.2K views",
    duration: "58 min",
  },
  {
    thumb: "bg-gradient-to-br from-pink-100 to-violet-100",
    tag: "Skill-Building",
    title: "Building Your First SaaS MVP in 2 Weeks",
    views: "980 views",
    duration: "52 min",
  },
  {
    thumb: "bg-gradient-to-br from-teal-100 to-blue-100",
    tag: "Career Guidance",
    title: "Salary Negotiation Tactics That Actually Work",
    views: "1.5K views",
    duration: "65 min",
  },
  {
    thumb: "bg-gradient-to-br from-violet-100 to-blue-100",
    tag: "Knowledge Booster",
    title: "AI Tools That'll Save You 10 Hours a Week",
    views: "3.4K views",
    duration: "55 min",
  },
  {
    thumb: "bg-gradient-to-br from-pink-100 to-violet-100",
    tag: "Founder Stories",
    title: "From Bootcamp to Big Tech: 3 Real Journeys",
    views: "2.1K views",
    duration: "70 min",
  },
  {
    thumb: "bg-gradient-to-br from-teal-100 to-blue-100",
    tag: "Skill-Building",
    title: "Inside a Designer's Figma Workflow",
    views: "760 views",
    duration: "40 min",
  },
];

export const bonusItems: BonusItem[] = [
  { icon: "📘", title: "AI Tools Handbook" },
  { icon: "🧩", title: "Prompt Engineering Cheat Sheet" },
  { icon: "📄", title: "Resume Template" },
  { icon: "🗺️", title: "Career Roadmap PDF" },
  { icon: "🎥", title: "Webinar Recording" },
];
