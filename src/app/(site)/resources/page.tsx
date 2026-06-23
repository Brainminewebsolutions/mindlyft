import Link from "next/link";
import {
  BookOpen, FileText, Video, Wrench, GraduationCap,
  Lightbulb, Download, ArrowRight, Newspaper, Globe,
} from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?auto=format&fit=crop&w=1600&q=80";

const CATEGORIES = [
  {
    icon: BookOpen,
    label: "Guides & eBooks",
    color: "from-violet-600 to-violet-400",
    glow: "bg-violet-50 border-violet-100",
    items: [
      { title: "Beginner's Guide to Artificial Intelligence", desc: "A complete walkthrough of AI fundamentals — concepts, terminology, and real-world applications." },
      { title: "Machine Learning Roadmap 2025", desc: "Step-by-step path from Python basics to deploying ML models in production." },
      { title: "Data Science Handbook", desc: "Covers data wrangling, EDA, visualization, and statistical modeling with practical examples." },
    ],
  },
  {
    icon: FileText,
    label: "Cheatsheets",
    color: "from-blue-600 to-blue-400",
    glow: "bg-blue-50 border-blue-100",
    items: [
      { title: "Python for Data Science Cheatsheet", desc: "Key libraries, syntax, and patterns — NumPy, Pandas, Matplotlib at a glance." },
      { title: "SQL Quick Reference", desc: "Essential SQL queries, joins, aggregations, and window functions in one sheet." },
      { title: "Deep Learning Formulas", desc: "Activation functions, loss functions, optimizers, and key architecture diagrams." },
    ],
  },
  {
    icon: Video,
    label: "Video Tutorials",
    color: "from-indigo-600 to-violet-500",
    glow: "bg-indigo-50 border-indigo-100",
    items: [
      { title: "Intro to Neural Networks (Free Series)", desc: "5-part series covering perceptrons, backpropagation, and CNNs with code walkthroughs." },
      { title: "Build Your First ChatBot", desc: "End-to-end tutorial: intent recognition, NLP pipeline, and deploying with FastAPI." },
      { title: "Computer Vision with OpenCV", desc: "Image processing, object detection, and face recognition from scratch." },
    ],
  },
  {
    icon: Wrench,
    label: "AI Tools & Demos",
    color: "from-blue-500 to-cyan-500",
    glow: "bg-cyan-50 border-cyan-100",
    items: [
      { title: "Resume Analyzer (AI-Powered)", desc: "Upload your resume and get instant feedback on ATS score, keywords, and improvements." },
      { title: "Career Path Recommender", desc: "Answer a few questions and get a personalized AI & tech career roadmap." },
      { title: "Dataset Explorer", desc: "Browse curated public datasets for practice projects in ML and data science." },
    ],
  },
  {
    icon: GraduationCap,
    label: "Career Resources",
    color: "from-violet-500 to-blue-600",
    glow: "bg-violet-50 border-violet-100",
    items: [
      { title: "AI Job Interview Prep Kit", desc: "Top 100 interview questions with model answers for data science and ML roles." },
      { title: "LinkedIn Profile Optimization Guide", desc: "How to write a profile that gets noticed by AI/ML recruiters." },
      { title: "Portfolio Project Ideas", desc: "10 project ideas across computer vision, NLP, and predictive analytics to build your portfolio." },
    ],
  },
  {
    icon: Newspaper,
    label: "Research & Articles",
    color: "from-indigo-500 to-blue-500",
    glow: "bg-indigo-50 border-indigo-100",
    items: [
      { title: "The State of AI in India 2025", desc: "Industry trends, job market analysis, and skill demand report for the Indian AI ecosystem." },
      { title: "Top 10 AI Breakthroughs of 2024", desc: "From GPT-4 to multimodal models — key advancements explained for practitioners." },
      { title: "Ethics in Artificial Intelligence", desc: "Bias, fairness, and responsible AI — a practical guide for developers and researchers." },
    ],
  },
];

const QUICK_LINKS = [
  { icon: GraduationCap, label: "Explore Courses",    href: "/courses",   color: "text-violet-600 bg-violet-50" },
  { icon: Globe,         label: "Upcoming Webinars",  href: "/webinars",  color: "text-blue-600 bg-blue-50"    },
  { icon: Lightbulb,     label: "Workshops",          href: "/workshops", color: "text-indigo-600 bg-indigo-50" },
  { icon: Newspaper,     label: "Blog & Insights",    href: "/blogs",     color: "text-violet-600 bg-violet-50" },
];

export default function ResourcesPage() {
  return (
    <div className="min-h-screen bg-[#f9f8ff]">

      {/* ── Hero ── */}
      <div className="relative h-screen overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Resources"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/75 via-violet-900/35 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 px-6 pb-6">
            <div className="bg-gradient-to-r from-violet-600/85 to-blue-600/85 backdrop-blur-sm px-4 py-3 rounded-2xl">
              <h1
                className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight"
                style={{ color: "#ffffff", textShadow: "0 2px 16px rgba(0,0,0,0.6)" }}
              >
                Learning Resources
              </h1>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-8 py-6 rounded-2xl md:max-w-sm">
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Free guides, cheatsheets, tools, and career resources to accelerate your AI journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick links ── */}
      <div className="max-w-[1100px] mx-auto px-[6vw] py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {QUICK_LINKS.map(({ icon: Icon, label, href, color }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center gap-3 px-5 py-4 bg-white rounded-2xl border border-violet-100 shadow-sm hover:shadow-md transition-shadow group"
            >
              <span className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="w-4 h-4" />
              </span>
              <span className="text-sm font-semibold text-gray-700 group-hover:text-violet-700 transition-colors">
                {label}
              </span>
              <ArrowRight className="w-3.5 h-3.5 text-gray-300 ml-auto group-hover:text-violet-500 transition-colors" />
            </Link>
          ))}
        </div>
      </div>

      {/* ── Resource categories ── */}
      <div className="max-w-[1100px] mx-auto px-[6vw] pb-20 space-y-14">
        {CATEGORIES.map(({ icon: Icon, label, color, glow, items }) => (
          <section key={label}>
            {/* Section header */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center shrink-0`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h2
                className="text-xl font-bold text-gray-900"
                style={{ color: "#1a1046" }}
              >
                {label}
              </h2>
              <div className="flex-1 h-px bg-violet-100 ml-2" />
            </div>

            {/* Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {items.map((item) => (
                <div
                  key={item.title}
                  className={`relative bg-white border ${glow} rounded-2xl p-5 hover:shadow-lg transition-shadow group cursor-pointer`}
                >
                  <div className={`inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r ${color} text-white mb-3`}>
                    <Download className="w-3 h-3" />
                    Free
                  </div>
                  <h3 className="text-[15px] font-bold text-gray-900 mb-2 leading-snug group-hover:text-violet-700 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-violet-600 group-hover:gap-2 transition-all">
                    Access Resource <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* ── CTA banner ── */}
      <div className="mx-[6vw] mb-20 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-500" />
        <div className="relative z-10 px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2
              className="text-2xl md:text-3xl font-bold mb-2"
              style={{ color: "#ffffff" }}
            >
              Ready to take the next step?
            </h2>
            <p className="text-white/80 text-base">
              Join thousands of learners building AI careers with MindlyftAI.
            </p>
          </div>
          <Link
            href="/courses"
            className="shrink-0 flex items-center gap-2 bg-white text-violet-700 font-bold px-7 py-3.5 rounded-2xl hover:bg-violet-50 transition-colors shadow-lg"
          >
            Explore Courses <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
