"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, User, Calendar, ArrowRight, BookOpen, Search } from "lucide-react";
import { cn } from "@/lib/utils";


// ─── Types ────────────────────────────────────────────────────────────────────

export type BlogTag = { id: number; name: string; slug: string };

export type BlogItem = {
  id:              number;
  title:           string;
  slug:            string;
  excerpt:         string | null;
  coverImageUrl:   string | null;
  authorName:      string | null;
  categoryName:    string;
  blogCategoryId:  number;
  publishedAt:     string | null;
  readTimeMinutes: number;
  tags:            BlogTag[];
};

export type Category = {
  id:          number;
  name:        string;
  slug:        string;
  description: string | null;
  blogCount:   number;
};

// ─── Gradients ────────────────────────────────────────────────────────────────

const GRADIENTS = [
  "from-violet-500 to-blue-500",
  "from-fuchsia-500 to-violet-600",
  "from-blue-500 to-cyan-400",
  "from-emerald-500 to-teal-500",
  "from-orange-400 to-pink-500",
  "from-indigo-500 to-purple-600",
];

// ─── Blog Card ────────────────────────────────────────────────────────────────

function BlogCard({ blog, index }: { blog: BlogItem; index: number }) {
  const img      = blog.coverImageUrl ?? null;
  const gradient = GRADIENTS[index % GRADIENTS.length];
  const date     = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : null;

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex flex-col rounded-2xl border border-violet-100 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover */}
      <div className="relative h-44 overflow-hidden shrink-0">
        {img ? (
          <Image
            src={img}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className={`h-full w-full bg-gradient-to-br ${gradient} flex items-center justify-center`}>
            <span className="text-4xl font-bold text-white/30 select-none">{blog.title.charAt(0)}</span>
          </div>
        )}
        {blog.readTimeMinutes > 0 && (
          <span className="absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-[11px] font-medium px-2.5 py-1 rounded-full">
            <Clock className="w-3 h-3" />
            {blog.readTimeMinutes} min
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {blog.tags.slice(0, 3).map((t) => (
              <span key={t.id} className="text-[10px] font-semibold uppercase tracking-wider text-violet-600 bg-violet-50 px-2.5 py-0.5 rounded-full">
                {t.name}
              </span>
            ))}
          </div>
        )}

        <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">
          {blog.title}
        </h3>

        {blog.excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
            {blog.excerpt}
          </p>
        )}

        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            {blog.authorName && (
              <>
                <User className="w-3 h-3" />
                <span className="truncate max-w-[90px]">{blog.authorName}</span>
                {date && <span className="mx-1">·</span>}
              </>
            )}
            {date && <span>{date}</span>}
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-violet-600 group-hover:gap-2 transition-all shrink-0">
            Read <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Main client component ────────────────────────────────────────────────────

interface Props {
  categories:   Category[];
  blogsByCategory: Record<number, BlogItem[]>;
}

export default function BlogsClient({ categories, blogsByCategory }: Props) {
  const [activeCategoryId, setActiveCategoryId] = useState<number>(categories[0]?.id ?? -1);
  const [search, setSearch] = useState("");

  const activeCategory = categories.find(c => c.id === activeCategoryId);
  const rawBlogs       = blogsByCategory[activeCategoryId] ?? [];
  const blogs          = search.trim()
    ? rawBlogs.filter(b =>
        b.title.toLowerCase().includes(search.toLowerCase()) ||
        b.excerpt?.toLowerCase().includes(search.toLowerCase()) ||
        b.tags.some(t => t.name.toLowerCase().includes(search.toLowerCase()))
      )
    : rawBlogs;

  const totalBlogs = Object.values(blogsByCategory).reduce((s, arr) => s + arr.length, 0);

  return (
    <div className="flex flex-col lg:flex-row gap-0 min-h-screen">

      {/* ── Sidebar (desktop) / Tabs (mobile) ── */}
      <aside className="w-full lg:w-72 xl:w-80 shrink-0">

        {/* Mobile: horizontal scroll tabs */}
        <div className="lg:hidden overflow-x-auto border-b border-violet-100 bg-white px-4 py-3">
          <div className="flex gap-2 w-max">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => { setActiveCategoryId(cat.id); setSearch(""); }}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all",
                  activeCategoryId === cat.id
                    ? "bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-md shadow-violet-200"
                    : "bg-violet-50 text-violet-700 hover:bg-violet-100 border border-violet-100"
                )}
              >
                {cat.name}
                <span className={cn(
                  "text-[11px] font-bold px-1.5 py-0.5 rounded-full",
                  activeCategoryId === cat.id ? "bg-white/20 text-white" : "bg-violet-100 text-violet-500"
                )}>
                  {cat.blogCount}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Desktop: sticky sidebar */}
        <div className="hidden lg:flex flex-col sticky top-24 h-[calc(100vh-6rem)] overflow-y-auto bg-white border-r border-violet-100 px-4 py-6">
          {/* Sidebar header */}
          <div className="mb-6 px-2">
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">Categories</h2>
            <p className="text-sm text-gray-500">{totalBlogs} articles across {categories.length} topics</p>
          </div>

          {/* Category list */}
          <nav className="flex flex-col gap-1 flex-1">
            {categories.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => { setActiveCategoryId(cat.id); setSearch(""); }}
                className={cn(
                  "group flex items-center justify-between w-full px-4 py-3 rounded-xl text-left transition-all",
                  activeCategoryId === cat.id
                    ? "bg-gradient-to-r from-violet-600 to-blue-500 text-white shadow-md shadow-violet-200"
                    : "text-gray-700 hover:bg-violet-50 hover:text-violet-700"
                )}
              >
                <span className="text-sm font-semibold truncate flex-1 mr-2">{cat.name}</span>
                <span className={cn(
                  "shrink-0 text-[11px] font-bold px-2 py-0.5 rounded-full",
                  activeCategoryId === cat.id
                    ? "bg-white/25 text-white"
                    : "bg-violet-100 text-violet-500 group-hover:bg-violet-200"
                )}>
                  {cat.blogCount}
                </span>
              </button>
            ))}
          </nav>

          {/* Bottom stat */}
          <div className="mt-6 px-4 py-4 rounded-xl bg-gradient-to-br from-violet-50 to-blue-50 border border-violet-100">
            <div className="flex items-center gap-2 text-violet-600">
              <BookOpen className="w-4 h-4" />
              <span className="text-sm font-semibold">Total Articles</span>
            </div>
            <p className="text-2xl font-extrabold text-gray-900 mt-1">{totalBlogs}</p>
          </div>
        </div>
      </aside>

      {/* ── Blog content area ── */}
      <main className="flex-1 px-6 lg:px-8 py-8">

        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">{activeCategory?.name ?? "Articles"}</h2>
            {activeCategory?.description && (
              <p className="text-sm text-gray-500 mt-1">{activeCategory.description}</p>
            )}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-72 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              placeholder="Search articles…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 text-sm text-gray-900 bg-white border border-violet-200 rounded-xl outline-none focus:ring-2 focus:ring-violet-400 focus:border-violet-400 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Grid */}
        {blogs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {blogs.map((blog, i) => (
              <BlogCard key={blog.id} blog={blog} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-violet-50 flex items-center justify-center mb-4">
              <BookOpen className="w-7 h-7 text-violet-400" />
            </div>
            <p className="text-gray-600 font-semibold">
              {search ? `No articles match "${search}"` : "No articles in this category yet"}
            </p>
            <p className="text-sm text-gray-400 mt-1">Check back soon!</p>
          </div>
        )}
      </main>

    </div>
  );
}
