import Link from "next/link";
import { Calendar, MapPin, Clock, Users, ArrowRight, Trophy } from "lucide-react";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80";

const PAST_EVENTS = [
  {
    title: "AI in Education Summit 2024",
    date: "November 18, 2024",
    time: "10:00 AM – 4:00 PM",
    location: "Mumbai Convention Centre, Mumbai",
    description:
      "A landmark full-day summit that brought together 300+ educators, technologists, and innovators to explore how AI is reshaping the future of learning in India.",
    tag: "Summit",
    tagColor: "from-violet-600 to-violet-400",
    attendees: "300+",
    image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80",
    highlight: true,
  },
  {
    title: "Machine Learning Bootcamp — Batch 3",
    date: "September 3–5, 2024",
    time: "9:00 AM – 6:00 PM",
    location: "Pune Tech Hub, Pune",
    description:
      "An intensive 3-day hands-on bootcamp where 80 participants built and deployed their first ML models using real-world datasets.",
    tag: "Bootcamp",
    tagColor: "from-blue-600 to-blue-400",
    attendees: "80",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80",
    highlight: false,
  },
  {
    title: "EdTech Innovation Expo 2024",
    date: "July 20, 2024",
    time: "11:00 AM – 7:00 PM",
    location: "Bengaluru Expo Centre, Bengaluru",
    description:
      "MindlyftAI showcased its AI-powered learning platform to 1,200+ attendees alongside 40 leading EdTech startups from across India.",
    tag: "Expo",
    tagColor: "from-indigo-600 to-blue-500",
    attendees: "1,200+",
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80",
    highlight: false,
  },
  {
    title: "Data Science Career Fair",
    date: "May 10, 2024",
    time: "10:00 AM – 5:00 PM",
    location: "Hyderabad International Convention Centre",
    description:
      "Our first dedicated career fair connected 500+ students with 25 top tech companies hiring data scientists and ML engineers.",
    tag: "Career Fair",
    tagColor: "from-violet-500 to-blue-600",
    attendees: "500+",
    image: "https://images.unsplash.com/photo-1560439513-74b037a25d84?auto=format&fit=crop&w=800&q=80",
    highlight: false,
  },
  {
    title: "AI Workshop Series — IIT Collaboration",
    date: "March 2–3, 2024",
    time: "9:00 AM – 5:00 PM",
    location: "IIT Bombay, Mumbai",
    description:
      "A 2-day deep-dive workshop in collaboration with IIT Bombay covering NLP, computer vision, and large language models for graduate students.",
    tag: "Workshop",
    tagColor: "from-blue-500 to-cyan-500",
    attendees: "150",
    image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=800&q=80",
    highlight: false,
  },
  {
    title: "MindlyftAI Launch Event",
    date: "January 15, 2024",
    time: "6:00 PM – 9:00 PM",
    location: "The Leela, Pune",
    description:
      "The official launch of MindlyftAI, attended by 200+ industry leaders, investors, and students who witnessed the unveiling of our AI learning platform.",
    tag: "Launch",
    tagColor: "from-violet-600 to-blue-500",
    attendees: "200+",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80",
    highlight: false,
  },
];

const STATS = [
  { value: "50+",   label: "Events Hosted"  },
  { value: "10K+",  label: "Attendees"       },
  { value: "30+",   label: "Cities Covered"  },
  { value: "200+",  label: "Expert Speakers" },
];

export default function EventsPage() {
  const [featured, ...rest] = PAST_EVENTS;

  return (
    <div className="min-h-screen bg-[#f9f8ff]">

      {/* ── Hero ── */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-screen overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="MindlyftAI Events"
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
                Our Events
              </h1>
            </div>
            <div className="bg-white/20 backdrop-blur-sm px-8 py-6 rounded-2xl md:max-w-sm">
              <p className="text-white/90 text-sm md:text-base leading-relaxed">
                Every event we've hosted has been a milestone — bringing learners, experts, and innovators together.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="max-w-[1100px] mx-auto px-[6vw] py-12">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white rounded-2xl border border-violet-100 shadow-sm p-6 text-center">
              <p className="text-3xl font-extrabold bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                {s.value}
              </p>
              <p className="text-sm text-gray-500 mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-[6vw] pb-20">

        {/* ── Section label ── */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-500 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-bold" style={{ color: "#1a1046" }}>Past Events</h2>
          <div className="flex-1 h-px bg-violet-100 ml-2" />
        </div>

        {/* ── Featured event ── */}
        <div className="bg-white rounded-3xl border border-violet-100 shadow-md overflow-hidden mb-8 group">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative h-64 lg:h-auto min-h-[280px] overflow-hidden">
              <img
                src={featured.image}
                alt={featured.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-violet-900/40 to-transparent" />
              <span className={`absolute top-4 left-4 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full bg-gradient-to-r ${featured.tagColor} text-white shadow`}>
                ★ Featured · {featured.tag}
              </span>
            </div>
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-extrabold text-gray-900 mb-3 leading-snug" style={{ color: "#1a1046" }}>
                {featured.title}
              </h3>
              <p className="text-gray-500 text-[15px] leading-relaxed mb-5">{featured.description}</p>
              <div className="space-y-2.5 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Calendar className="w-4 h-4 text-violet-500 shrink-0" />{featured.date}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4 text-blue-500 shrink-0" />{featured.time}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <MapPin className="w-4 h-4 text-violet-500 shrink-0" />{featured.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Users className="w-4 h-4 text-blue-500 shrink-0" />{featured.attendees} Attendees
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Rest of events grid ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {rest.map((event) => (
            <div
              key={event.title}
              className="bg-white rounded-2xl border border-violet-100 shadow-sm overflow-hidden group hover:shadow-lg transition-shadow duration-300"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <img
                  src={event.image}
                  alt={event.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <span className={`absolute top-3 left-3 text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-gradient-to-r ${event.tagColor} text-white`}>
                  {event.tag}
                </span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-[15px] font-bold text-gray-900 mb-2 leading-snug group-hover:text-violet-700 transition-colors" style={{ color: "#1a1046" }}>
                  {event.title}
                </h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4 line-clamp-2">{event.description}</p>
                <div className="space-y-1.5 border-t border-violet-50 pt-3">
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-violet-500 shrink-0" />{event.date}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <MapPin className="w-3.5 h-3.5 text-blue-500 shrink-0" />{event.location}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Users className="w-3.5 h-3.5 text-violet-500 shrink-0" />{event.attendees} Attendees
                  </div>
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
              Want to be part of our next event?
            </h2>
            <p className="text-white/80 text-base">Follow our journey and never miss a MindlyftAI event.</p>
          </div>
          <Link
            href="/contact"
            className="shrink-0 flex items-center gap-2 bg-white text-violet-700 font-bold px-7 py-3.5 rounded-2xl hover:bg-violet-50 transition-colors shadow-lg"
          >
            Get In Touch <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
}
