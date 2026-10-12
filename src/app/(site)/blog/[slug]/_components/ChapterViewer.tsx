"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { toUploadUrl } from "@/lib/api/image-url";
import { List } from "lucide-react";

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

const chapterId = (id: number) => `chapter-${id}`;

export default function ChapterViewer({ chapters }: Props) {
  const [activeIdx, setActiveIdx] = useState(0);

  // Every chapter is rendered on the page; the list only jumps to one and
  // highlights whichever is currently in view.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const idx = chapters.findIndex((ch) => chapterId(ch.id) === entry.target.id);
          if (idx !== -1) setActiveIdx(idx);
        });
      },
      { rootMargin: "-20% 0px -70% 0px" },
    );
    chapters.forEach((ch) => {
      const el = document.getElementById(chapterId(ch.id));
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [chapters]);

  const goTo = (i: number) => {
    document
      .getElementById(chapterId(chapters[i].id))
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-14">

      {/* ── Article: all chapters, one after another ── */}
      <article className="order-2 min-w-0 max-w-3xl flex-1 space-y-14 lg:order-1">
        {chapters.map((chapter) => {
          const contents = [...chapter.contents].sort((a, b) => a.order - b.order);
          return (
            <section key={chapter.id} id={chapterId(chapter.id)} className="scroll-mt-24">
              <h2 className="text-2xl sm:text-3xl font-bold leading-snug text-gray-900">
                {chapter.title}
              </h2>
              {chapter.description && (
                <p className="mt-3 text-lg leading-relaxed text-gray-600">{chapter.description}</p>
              )}

              <div className="mt-6 space-y-8">
                {contents.map((item) => {
                  const img = toUploadUrl(item.imageUrl);
                  return (
                    <div key={item.id}>
                      <h3 className="mb-3 text-xl font-semibold text-gray-900">{item.title}</h3>
                      {img && (
                        <div className="mb-5 overflow-hidden rounded-2xl border border-violet-100 shadow-sm">
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
                        <p className="text-[17px] leading-8 text-gray-700 whitespace-pre-line">
                          {item.content}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>
          );
        })}
      </article>

      {/* ── Table of contents ── */}
      <aside className="order-1 w-full shrink-0 lg:order-2 lg:sticky lg:top-24 lg:w-72">
        <div className="rounded-2xl border border-violet-100 bg-violet-50/50 p-5 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto">
          <div className="mb-3 flex items-center gap-2">
            <List className="w-4 h-4 text-violet-500" />
            <p className="text-xs font-bold uppercase tracking-widest text-gray-500">
              In this article
            </p>
          </div>

          <nav className="flex flex-col border-l border-violet-200">
            {chapters.map((ch, i) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => goTo(i)}
                className={cn(
                  "-ml-px border-l-2 py-1.5 pl-4 text-left text-sm leading-snug transition-colors",
                  activeIdx === i
                    ? "border-violet-600 font-semibold text-violet-700"
                    : "border-transparent text-gray-600 hover:border-violet-300 hover:text-violet-700"
                )}
              >
                {ch.title}
              </button>
            ))}
          </nav>
        </div>
      </aside>

    </div>
  );
}
