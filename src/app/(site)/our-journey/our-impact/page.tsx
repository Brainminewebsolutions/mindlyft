import Link from "next/link";
import { Users, BookOpen, Globe, TrendingUp, Award, Heart, ArrowRight, Quote, Star } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80";

const STATS = [
  { icon: Users,      value: "500+",  label: "Students Enrolled",    color: "from-violet-600 to-violet-400" },
  { icon: BookOpen,   value: "10",    label: "Courses Delivered",    color: "from-blue-600 to-blue-400"    },
  { icon: Globe,      value: "5+",    label: "Cities Reached",       color: "from-indigo-600 to-blue-500"  },
  { icon: TrendingUp, value: "85%",   label: "Placement Rate",       color: "from-violet-500 to-blue-600"  },
  { icon: Award,      value: "10+",   label: "Industry Awards",      color: "from-blue-500 to-violet-500"  },
  { icon: Heart,      value: "95%",   label: "Learner Satisfaction", color: "from-violet-600 to-blue-500"  },
];

const STORIES = [
  {
    name: "Aisha Sharma",
    role: "ML Engineer at Google",
    location: "Mumbai",
    quote: "Mindlyft AI's curriculum was exactly what I needed to break into ML. Within 6 months of completing the course, I had an offer from Google.",
    avatar: "AS",
    gradient: "from-violet-500 to-blue-500",
    stars: 5,
  },
  {
    name: "Rahul Verma",
    role: "AI Product Manager",
    location: "Bengaluru",
    quote: "The hands-on projects and mentorship transformed my career. I went from a sales background to leading AI product strategy at a top startup.",
    avatar: "RV",
    gradient: "from-blue-600 to-violet-500",
    stars: 5,
  },
  {
    name: "Priya Nair",
    role: "Data Scientist at Flipkart",
    location: "Pune",
    quote: "The community and network I built through Mindlyft AI has been invaluable. Real learning, real connections, real results.",
    avatar: "PN",
    gradient: "from-indigo-500 to-blue-500",
    stars: 5,
  },
  {
    name: "Karan Mehta",
    role: "Deep Learning Engineer at NVIDIA",
    location: "Hyderabad",
    quote: "I had zero ML background. After 4 months with MindlyftAI, I cracked NVIDIA's technical rounds. The structured path made all the difference.",
    avatar: "KM",
    gradient: "from-violet-600 to-blue-400",
    stars: 5,
  },
  {
    name: "Sneha Patil",
    role: "NLP Researcher at IIT Bombay",
    location: "Pune",
    quote: "The research-oriented modules and faculty guidance at MindlyftAI helped me publish my first NLP paper and secure a research position at IIT.",
    avatar: "SP",
    gradient: "from-blue-500 to-indigo-600",
    stars: 5,
  },
  {
    name: "Arjun Das",
    role: "Freelance AI Consultant",
    location: "Kolkata",
    quote: "MindlyftAI gave me the confidence and skills to go independent. I now consult for 3 startups and earn 3x what I did in my corporate job.",
    avatar: "AD",
    gradient: "from-violet-500 to-blue-600",
    stars: 5,
  },
];

const MILESTONES = [
  { year: "Jan 2024", title: "MindlyftAI Founded",         desc: "Launched with a mission to make AI education accessible across India."       },
  { year: "Mar 2024", title: "First IIT Collaboration",    desc: "Partnered with IIT Bombay to deliver AI workshops for 150 graduate students." },
  { year: "May 2024", title: "1,000 Students Enrolled",    desc: "Crossed our first major milestone — 1,000 learners in just 4 months."        },
  { year: "Jul 2024", title: "EdTech Expo Recognition",    desc: "Featured among top 10 EdTech startups at the Bengaluru Innovation Expo."     },
  { year: "Sep 2024", title: "ML Bootcamp Batch 3",        desc: "Completed our 3rd bootcamp with 94% placement rate for graduates."           },
  { year: "Nov 2024", title: "AI Summit — 300 Attendees",  desc: "Hosted our largest event — the AI in Education Summit in Mumbai."            },
  { year: "Jan 2025", title: "25,000 Students Milestone",  desc: "Reached 25,000 enrolled learners across 40+ cities in India."               },
  { year: "Apr 2025", title: "50+ Awards Won",             desc: "Recognised with 50+ industry awards for excellence in AI education."         },
];

export default function OurImpactPage() {
  return (
    <div className="min-h-screen bg-[#f9f8ff]">

      {/* ── Hero ── */}
      <div className="relative h-screen overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Our Impact"
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
                Our Impact
              </h1>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-8 py-6 rounded-2xl md:max-w-sm">
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Every number represents a life changed, a career launched, and a future built with AI.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="max-w-[1100px] mx-auto px-[6vw] py-8">
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {STATS.map(({ icon: Icon, value, label, color }) => (
            <div key={label} className="bg-white rounded-xl border border-violet-100 shadow-sm px-3 py-3 flex flex-col items-center text-center">
              <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${color} flex items-center justify-center mb-2`}>
                <Icon className="w-3.5 h-3.5 text-white" />
              </div>
              <p className="text-lg font-extrabold bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent leading-none mb-0.5">
                {value}
              </p>
              <p className="text-[10px] text-gray-500 font-medium leading-snug">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Milestones timeline ── */}
      <div className="max-w-[1100px] mx-auto px-[6vw] pb-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold" style={{ color: "#1a1046" }}>Our Journey So Far</h2>
          <div className="flex-1 h-px bg-violet-100 ml-2" />
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[88px] top-0 bottom-0 w-px bg-violet-100 hidden sm:block" />

          <div className="space-y-4">
            {MILESTONES.map((m, i) => (
              <div key={i} className="flex gap-4 items-start">
                {/* Year pill */}
                <div className="shrink-0 w-[80px] text-right hidden sm:block pt-3">
                  <span className="text-xs font-bold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-1 rounded-full">
                    {m.year}
                  </span>
                </div>
                {/* Dot */}
                <div className="shrink-0 hidden sm:flex flex-col items-center pt-[14px]">
                  <div className="w-3 h-3 rounded-full bg-gradient-to-br from-violet-500 to-blue-500 ring-4 ring-violet-50" />
                </div>
                {/* Card */}
                <div className="flex-1 bg-white rounded-2xl border border-violet-100 shadow-sm px-5 py-4 hover:shadow-md transition-shadow">
                  <span className="text-xs font-bold text-violet-600 sm:hidden mb-1 block">{m.year}</span>
                  <p className="text-[15px] font-bold text-gray-900 mb-1" style={{ color: "#1a1046" }}>{m.title}</p>
                  <p className="text-sm text-gray-500">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Success stories ── */}
      <div className="max-w-[1100px] mx-auto px-[6vw] pb-20">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shrink-0">
            <Quote className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold" style={{ color: "#1a1046" }}>Success Stories</h2>
          <div className="flex-1 h-px bg-violet-100 ml-2" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {STORIES.map((story) => (
            <div
              key={story.name}
              className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6 hover:shadow-lg transition-shadow group"
            >
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: story.stars }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-600 text-sm leading-relaxed mb-5 italic">
                &ldquo;{story.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-violet-50">
                <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${story.gradient} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {story.avatar}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900">{story.name}</p>
                  <p className="text-xs text-violet-600 font-medium">{story.role}</p>
                  <p className="text-xs text-gray-400">{story.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA banner ── */}
      <div className="mx-[6vw] mb-20 rounded-3xl overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 to-blue-500" />
        <div className="relative z-10 px-8 py-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: "#ffffff" }}>
              Become our next success story
            </h2>
            <p className="text-white/80 text-base">Join 25,000+ learners transforming their careers with AI.</p>
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
