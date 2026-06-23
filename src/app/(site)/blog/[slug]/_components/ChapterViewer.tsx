"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toUploadUrl } from "@/lib/api/image-url";
import { BookOpen, ChevronRight } from "lucide-react";

export type BlogContent = {
  id:       number;
  title:    string;
  content:  string | null;
  imageUrl: string | null;
  order:    number;
};

export type BlogChapter = {
  id:          number;
  title:       string;
  description: string | null;
  order:       number;
  contents:    BlogContent[];
};

interface Props {
  chapters: BlogChapter[];
}

export default function ChapterViewer({ chapters }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);

  const active   = chapters[activeIdx];
  const contents = active ? [...active.contents].sort((a, b) => a.order - b.order) : [];

  return (
    <div className="flex flex-col lg:flex-row gap-0 min-h-[60vh]">

      {/* ── Left: chapter list ── */}
      <aside className="w-full lg:w-72 xl:w-80 shrink-0">

        {/* Mobile: horizontal pills */}
        <div className="lg:hidden overflow-x-auto border-b border-violet-100 bg-white px-4 py-3">
          <div className="flex gap-2 w-max">
            {chapters.map((ch, i) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
                  activeIdx === i
                    ? "bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-md shadow-violet-200"
                    : "bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-100"
                )}
              >
                <span className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold",
                  activeIdx === i ? "bg-white/25 text-white" : "bg-violet-200 text-violet-700"
                )}>
                  {i + 1}
                </span>
                {ch.title}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: sticky sidebar */}
        <div className="hidden lg:flex flex-col sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto bg-white border-r border-violet-100 px-4 py-6">
          <div className="flex items-center gap-2 mb-5 px-2">
            <BookOpen className="w-4 h-4 text-violet-500" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400">
              Chapters
            </h3>
            <span className="ml-auto text-xs font-semibold text-violet-500 bg-violet-50 px-2 py-0.5 rounded-full">
              {chapters.length}
            </span>
          </div>

          <nav className="flex flex-col gap-1">
            {chapters.map((ch, i) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => setActiveIdx(i)}
                className={cn(
                  "group flex items-center gap-3 w-full px-3 py-3 rounded-xl text-left transition-all",
                  activeIdx === i
                    ? "bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-md shadow-violet-200"
                    : "text-gray-600 hover:bg-violet-50 hover:text-violet-700"
                )}
              >
                <span className={cn(
                  "flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-all",
                  activeIdx === i
                    ? "bg-white/25 text-white"
                    : "bg-violet-100 text-violet-600 group-hover:bg-violet-200"
                )}>
                  {i + 1}
                </span>
                <span className="text-sm font-semibold leading-snug flex-1 truncate">
                  {ch.title}
                </span>
                <ChevronRight className={cn(
                  "w-3.5 h-3.5 shrink-0 transition-all",
                  activeIdx === i ? "opacity-70" : "opacity-0 group-hover:opacity-40"
                )} />
              </button>
            ))}
          </nav>
        </div>
      </aside>

      {/* ── Right: chapter content ── */}
      <main className="flex-1 px-6 lg:px-10 py-8">
        {active && (
          <>
            {/* Chapter heading */}
            <div className="mb-8 pb-6 border-b border-violet-100">
              <div className="flex items-center gap-3 mb-2">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-600 to-blue-500 text-sm font-bold text-white shadow-sm shadow-violet-200">
                  {activeIdx + 1}
                </div>
                <h2 className="text-xl font-extrabold text-gray-900">{active.title}</h2>
              </div>
              {active.description && (
                <p className="text-sm text-gray-500 leading-relaxed ml-11">{active.description}</p>
              )}
            </div>

            {/* Content items */}
            {contents.length > 0 ? (
              <div className="space-y-10">
                {contents.map((item) => {
                  const img = toUploadUrl(item.imageUrl);
                  return (
                    <article key={item.id}>
                      <h3 className="text-base font-bold text-gray-800 mb-4">{item.title}</h3>
                      {img && (
                        <div className="mb-5 rounded-2xl overflow-hidden border border-violet-100 shadow-sm">
                          <Image
                            src={img}
                            alt={item.title}
                            width={900}
                            height={500}
                            className="w-full h-auto"
                            unoptimized
                          />
                        </div>
                      )}
                      {item.content && (
                        <p className="text-[15px] text-gray-600 leading-relaxed whitespace-pre-line">
                          {item.content}
                        </p>
                      )}
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-16 text-gray-400">
                <p>No content in this chapter yet.</p>
              </div>
            )}

            {/* Prev / Next navigation */}
            <div className="flex items-center justify-between mt-12 pt-8 border-t border-violet-100">
              <button
                type="button"
                disabled={activeIdx === 0}
                onClick={() => setActiveIdx(i => i - 1)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                  activeIdx === 0
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-violet-600 bg-violet-50 hover:bg-violet-100 border border-violet-200"
                )}
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
                Previous
              </button>

              <span className="text-xs font-medium text-gray-400">
                {activeIdx + 1} / {chapters.length}
              </span>

              <button
                type="button"
                disabled={activeIdx === chapters.length - 1}
                onClick={() => setActiveIdx(i => i + 1)}
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                  activeIdx === chapters.length - 1
                    ? "text-gray-300 cursor-not-allowed"
                    : "text-violet-600 bg-violet-50 hover:bg-violet-100 border border-violet-200"
                )}
              >
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </>
        )}
      </main>

    </div>
  );
}
