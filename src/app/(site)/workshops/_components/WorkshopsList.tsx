"use client";

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";
import {
  Clock, Wifi, MapPin, User, Globe, Calendar,
  ArrowRight, Search, BookOpen, Tag,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { LineBadge } from "@/components/ui/LineBadge";
import { AnimateIn } from "@/components/ui/AnimateIn";
import type { Webinar } from "@/types/admin/webinar";

const GRADIENTS = [
  "from-violet-500 to-blue-500",
  "from-fuchsia-500 to-violet-600",
  "from-blue-500 to-cyan-400",
  "from-indigo-500 to-purple-600",
  "from-violet-600 to-fuchsia-500",
  "from-blue-600 to-violet-500",
];

const MODES = ["All", "Online", "Offline"] as const;
type Mode = typeof MODES[number];

function WorkshopCard({ item, index }: { item: Webinar; index: number }) {
  const img      = item.image ?? null;
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const ModeIcon = item.mode === "Online" ? Wifi : MapPin;
  const isFree   = item.subscriptionType === "Free" || item.price === 0;

  const dateStr = item.date
    ? new Date(item.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : null;

  const discountedPrice =
    item.discount && item.price > 0
      ? Math.round(item.price - (item.price * item.discount) / 100)
      : null;

  return (
    <Link
      href={`/workshops/${item.slug}`}
      className="group flex flex-col rounded-2xl border border-gray-100 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden shrink-0">
        {img ? (
          <Image
            src={img}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <BookOpen className="w-10 h-10 text-white/40" />
          </div>
        )}

        {/* Mode badge */}
        <span className="absolute top-3 left-3 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white bg-violet-600/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
          <ModeIcon className="w-3 h-3" />
          {item.mode}
        </span>

        {/* Price badge */}
        <span className={cn(
          "absolute top-3 right-3 text-xs font-extrabold px-2.5 py-1 rounded-full",
          isFree ? "bg-emerald-500 text-white" : "bg-white text-violet-700 shadow-sm"
        )}>
          {isFree ? "Free" : `₹${item.price.toLocaleString("en-IN")}`}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {item.category && (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider text-violet-600 bg-violet-50 px-2.5 py-0.5 rounded-full mb-2 w-fit">
            <Tag className="w-2.5 h-2.5" />
            {item.category}
          </span>
        )}

        <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">
          {item.name}
        </h3>

        {item.description && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
            {item.description}
          </p>
        )}

        {/* Stats */}
        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-400 mb-4 mt-auto">
          {dateStr && (
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3 text-violet-400" />
              {dateStr}
            </span>
          )}
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-violet-400" />
            {item.duration}h
          </span>
          <span className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-violet-400" />
            {item.language}
          </span>
          <span className="flex items-center gap-1 truncate max-w-[120px]">
            <User className="w-3 h-3 text-violet-400 shrink-0" />
            {item.instructor}
          </span>
        </div>

        {/* CTA row */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs font-semibold text-violet-600 flex items-center gap-1 group-hover:gap-2 transition-all">
            View Details <ArrowRight className="w-3 h-3" />
          </span>
          {discountedPrice && (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {item.discount}% OFF
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

export default function WorkshopsList({ items }: { items: Webinar[] }) {
  const [mode, setMode]     = useState<Mode>("All");
  const [search, setSearch] = useState("");

  const filtered = items.filter(w => {
    const matchMode   = mode === "All" || w.mode === mode;
    const q           = search.toLowerCase();
    const matchSearch = !q ||
      w.name.toLowerCase().includes(q) ||
      w.instructor.toLowerCase().includes(q) ||
      w.category?.toLowerCase().includes(q) ||
      w.description?.toLowerCase().includes(q);
    return matchMode && matchSearch;
  });

  const counts: Record<Mode, number> = {
    All:     items.length,
    Online:  items.filter(w => w.mode === "Online").length,
    Offline: items.filter(w => w.mode === "Offline").length,
  };

  return (
    <section className="bg-white px-6 md:px-[60px] py-20">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <AnimateIn delay={0} direction="left">
          <LineBadge className="mb-5">Our Workshops</LineBadge>
        </AnimateIn>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10">
          <div className="text-center md:text-left">
            <AnimateIn delay={100} direction="left">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight">
                Find your next{" "}
                <span className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-transparent">
                  workshop
                </span>
              </h2>
            </AnimateIn>
            <AnimateIn delay={200} direction="left">
              <p className="text-base text-gray-500 mt-2">
                {items.length} workshops · hands-on, instructor-led, real outcomes.
              </p>
            </AnimateIn>
          </div>

          {/* Search */}
          <AnimateIn delay={200} direction="right">
            <div className="relative w-full sm:w-72 shrink-0">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search workshops…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-4 py-2.5 text-sm text-gray-900 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 placeholder:text-gray-400 shadow-sm"
              />
            </div>
          </AnimateIn>
        </div>

        {/* Mode filters */}
        <AnimateIn delay={250} direction="up">
          <div className="flex items-center gap-2 flex-wrap mb-8">
            {MODES.map(m => (
              <button
                key={m}
                type="button"
                onClick={() => setMode(m)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all",
                  mode === m
                    ? "bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-md shadow-violet-200"
                    : "bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-100"
                )}
              >
                {m}
                <span className={cn(
                  "text-[11px] font-bold px-1.5 py-0.5 rounded-full",
                  mode === m ? "bg-white/25 text-white" : "bg-violet-100 text-violet-500"
                )}>
                  {counts[m]}
                </span>
              </button>
            ))}
          </div>
        </AnimateIn>

        <div className="border-b border-gray-100 mb-8" />

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((w, i) => (
              <WorkshopCard key={w.id} item={w} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-violet-400" />
            </div>
            <p className="text-gray-700 font-semibold text-base">
              {search ? `No workshops match "${search}"` : "No workshops available"}
            </p>
            <p className="text-sm text-gray-400 mt-1">Check back soon!</p>
          </div>
        )}

      </div>
    </section>
  );
}
