"use client";

import { useState } from "react";
import Link from "next/link";
import { Clock, Globe, User, ArrowRight, Wifi, MapPin, Search, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Course } from "@/types/admin/course";

const GRADIENTS = [
  "from-violet-500 to-blue-500",
  "from-fuchsia-500 to-violet-600",
  "from-blue-500 to-cyan-400",
  "from-indigo-500 to-purple-600",
  "from-violet-600 to-indigo-500",
  "from-blue-600 to-violet-500",
];

function IITCourseCard({ course, index }: { course: Course; index: number }) {
  const img      = course.image ?? null;
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const ModeIcon = course.mode === "Online" ? Wifi : MapPin;
  const isFree   = course.price === 0;

  return (
    <Link
      href={`/courses/iit/${course.slug}`}
      className="group flex flex-col rounded-2xl border border-violet-100 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative h-48 overflow-hidden shrink-0">
        {img ? (
          <img
            src={img}
            alt={course.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <BookOpen className="w-10 h-10 text-white/40" />
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-white bg-violet-600/80 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
            IIT
          </span>
          {course.category && (
            <span className="text-[10px] font-semibold text-white bg-black/40 backdrop-blur-sm px-2.5 py-0.5 rounded-full">
              {course.category}
            </span>
          )}
        </div>

        <span className={cn(
          "absolute top-3 right-3 text-xs font-extrabold px-2.5 py-1 rounded-full",
          isFree ? "bg-emerald-500 text-white" : "bg-white text-violet-700 shadow-sm"
        )}>
          {isFree ? "Free" : `₹${course.price.toLocaleString("en-IN")}`}
        </span>
      </div>

      <div className="flex flex-col flex-1 p-5">
        <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">
          {course.name}
        </h3>

        {course.description && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
            {course.description}
          </p>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-gray-400 mb-4 mt-auto">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3 text-violet-400" />
            {course.duration}h
          </span>
          <span className="flex items-center gap-1">
            <Globe className="w-3 h-3 text-violet-400" />
            {course.language}
          </span>
          <span className="flex items-center gap-1">
            <ModeIcon className="w-3 h-3 text-violet-400" />
            {course.mode}
          </span>
          <span className="flex items-center gap-1 truncate max-w-[120px]">
            <User className="w-3 h-3 text-violet-400 shrink-0" />
            {course.instructor}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <span className="text-xs font-semibold text-violet-600 group-hover:gap-2 flex items-center gap-1 transition-all">
            View Course <ArrowRight className="w-3 h-3" />
          </span>
          {course.discount && course.discount > 0 ? (
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              {course.discount}% OFF
            </span>
          ) : null}
        </div>
      </div>
    </Link>
  );
}

export default function CoursesGrid({ courses }: { courses: Course[] }) {
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? courses.filter(c => {
        const q = search.toLowerCase();
        return (
          c.name.toLowerCase().includes(q) ||
          c.instructor?.toLowerCase().includes(q) ||
          c.category?.toLowerCase().includes(q) ||
          c.description?.toLowerCase().includes(q)
        );
      })
    : courses;

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <div className="flex items-center justify-between gap-4 mb-10">
        <p className="text-sm text-gray-500">
          {courses.length} IIT program{courses.length !== 1 ? "s" : ""} available
        </p>
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search IIT programs…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 text-sm text-gray-900 bg-white border border-violet-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 placeholder:text-gray-400"
          />
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((course, i) => (
            <IITCourseCard key={course.id} course={course} index={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center mb-4">
            <BookOpen className="w-7 h-7 text-violet-400" />
          </div>
          <p className="text-gray-600 font-semibold">
            {search ? `No programs match "${search}"` : "No IIT programs available"}
          </p>
          <p className="text-sm text-gray-400 mt-1">Check back soon!</p>
        </div>
      )}
    </div>
  );
}
