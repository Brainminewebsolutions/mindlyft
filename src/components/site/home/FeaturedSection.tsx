 "use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

function CyclingLine({ lines, paused, textSize = "text-[11px] sm:text-xs" }: { lines: [string, string, string]; paused: boolean; textSize?: string }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIdx((i) => (i + 1) % lines.length);
    }, 2800);
    return () => clearInterval(id);
  }, [paused, lines.length]);

  return (
    <div className="mt-1 h-[35px] overflow-hidden relative">
      <AnimatePresence mode="wait">
        <motion.p
          key={idx}
          className={`${textSize} font-semibold text-slate-600 leading-snug absolute`}
          initial={{ opacity: 0, x: -18 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 18 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          {lines[idx]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

interface CardItem {
  image: string;
  name: string;
  lines: [string, string, string];
  tag: string;
  accent: string;
  bg: string;
  border: string;
  tagBg: string;
  tagText: string;
  orbColor: string;
  stripFrom: string;
  href: string;
}

const items: CardItem[] = [
  {
    image: "./AI_IT_Solution.jpeg",
    name: "AI & IT Solutions",
    lines: [
      "Building Intelligent Digital Solutions",
      "Helping businesses leverage AI, automation, software development",
      "and digital transformation",
    ],
    tag: "Technology",
    accent: "bg-indigo-500",
    bg: "from-indigo-50 to-white",
    border: "border-indigo-100",
    tagBg: "bg-indigo-500",
    tagText: "text-white",
    orbColor: "bg-indigo-400",
    stripFrom: "from-indigo-500",
    href: "/ai-it-solutions",
  },
  {
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=90",
    name: "Education",
    lines: [
      "Empowering Future Innovators",
      "Learn AI, Cybersecurity, Data Science, Cloud Computing",
      "and emerging technologies through industry-focused training",
    ],
    tag: "Learning",
    accent: "bg-indigo-500",
    bg: "from-indigo-50 to-white",
    border: "border-indigo-100",
    tagBg: "bg-indigo-500",
    tagText: "text-white",
    orbColor: "bg-indigo-400",
    stripFrom: "from-indigo-500",
    href: "#iit-courses",
  },
  {
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&q=90",
    name: "Innovation",
    lines: [
      "Transforming Ideas into Reality",
      "Driving innovation through research, product development,",
      "emerging technologies, and future-ready solutions",
    ],
    tag: "Future",
    accent: "bg-indigo-500",
    bg: "from-indigo-50 to-white",
    border: "border-indigo-100",
    tagBg: "bg-indigo-500",
    tagText: "text-white",
    orbColor: "bg-indigo-400",
    stripFrom: "from-indigo-500",
    href: "/innovation",
  },
];

const arrowColors: Record<string, string> = {
  "bg-indigo-500": "text-indigo-500 border-indigo-200 bg-indigo-50 hover:bg-indigo-500",
};

function Card({
  item,
  index,
  isCenter,
}: {
  item: CardItem;
  index: number;
  isCenter: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  function handleEducationClick(e: React.MouseEvent) {
    e.preventDefault();
    const target = document.getElementById("iit-courses");
    if (target) target.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <motion.article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: isCenter ? -8 : -5, transition: { duration: 0.2 } }}
      className={`group relative min-w-0 overflow-hidden flex flex-row bg-gradient-to-br ${item.bg} border ${item.border} rounded-2xl transition-shadow duration-300
        ${
          isCenter
            ? "flex-[1.45] shadow-xl hover:shadow-2xl ring-2 ring-indigo-300/60"
            : "flex-[0.77] shadow-sm hover:shadow-lg opacity-90 hover:opacity-100"
        }`}
      style={isCenter ? { height: "220px" } : { height: "150px", alignSelf: "center" }}
    >
      {isCenter ? (
        <button
          onClick={handleEducationClick}
          className="absolute inset-0 z-10 w-full h-full cursor-pointer"
        />
      ) : (
        <Link href={item.href} className="absolute inset-0 z-10" />
      )}

      {/* IMAGE SECTION */}
<div
  className={`
    relative flex-shrink-0 overflow-hidden rounded-xl m-2.5
    ${isCenter ? "w-[42%]" : "w-[38%]"}
  `}
  style={{ alignSelf: "stretch" }}
>
        <img
          src={item.image}
          alt={item.name} style={{ height: "stretch" }}
          className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/30" />

       
        {/* {isCenter && (
          <div className="absolute bottom-2 right-2">
            <span className="px-2 py-0.5 text-[9px] font-bold bg-white/90 text-violet-700 rounded-full">
              ★ Core Pillar
            </span>
          </div>
        )} */}
      </div>

      {/* CONTENT */}
      <div className="relative flex flex-col justify-between flex-1 min-w-0 py-3.5 pr-3.5 pl-2.5">
        <div className={`absolute -bottom-5 -right-5 rounded-full ${item.orbColor} opacity-20 blur-2xl`} />

        <div className="flex flex-col justify-between h-full">
          <div>
            <motion.div
              className={`mb-2 rounded-full ${item.accent} ${isCenter ? "h-[4px] w-8" : "h-[3px] w-6"}`}
              initial={{ scaleX: 0, originX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
            />
            <h3 className={`font-extrabold text-gray-900 truncate ${isCenter ? "text-lg" : "text-sm"}`}>
              {item.name}
            </h3>
          </div>

          <CyclingLine lines={item.lines} paused={hovered} textSize={isCenter ? "text-sm" : "text-[11px] sm:text-xs"} />

          <span className={`inline-flex items-center gap-1.5 self-start px-3 py-0.5 rounded-full text-[10px] font-bold uppercase ${item.tagBg} ${item.tagText}`}>
            <span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />
            {item.tag}
          </span>
        </div>

        {/* FOOTER */}
        {/* <div className="flex items-center justify-between mt-2">
          <div className="flex gap-1">
            <span className={`h-1 ${isCenter ? "w-6" : "w-4"} ${item.accent}`} />
            <span className={`h-1 w-1 ${item.accent} opacity-40`} />
            <span className={`h-1 w-1 ${item.accent} opacity-20`} />
          </div>

          <span
            className={`flex items-center justify-center rounded-full border transition-all group-hover:text-white ${
              arrowColors[item.accent]
            } ${isCenter ? "w-8 h-8" : "w-7 h-7"}`}
          >
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path
                d={isCenter ? "M1 9h10M7 5l4 4-4 4" : "M1 6h10M7 2l4 4-4 4"}
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </div> */}
      </div>

      <motion.div
        className={`absolute top-0 left-0 w-full bg-gradient-to-r ${item.stripFrom} to-transparent rounded-t-2xl ${
          isCenter ? "h-[4px]" : "h-[3px]"
        }`}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
      />
    </motion.article>
  );
}

export default function FeaturedSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-violet-50 via-white to-blue-50 px-4 py-6">
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, #a78bfa 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute top-0 left-1/3 w-64 h-24 bg-violet-300/30 blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-56 h-20 bg-blue-300/25 blur-3xl" />

      <div className="relative mx-auto max-w-6xl flex flex-col sm:flex-row gap-4 items-stretch">
        {items.map((item, i) => (
          <Card key={item.name} item={item} index={i} isCenter={item.name === "Education"} />
        ))}
      </div>
    </section>
  );
}