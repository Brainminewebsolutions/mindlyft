"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Search } from "lucide-react";
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

const ALL = -1;

// ─── Shared bits ──────────────────────────────────────────────────────────────

function formatDate(publishedAt: string | null) {
  return publishedAt
    ? new Date(publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : null;
}

function Cover({ blog, sizes }: { blog: BlogItem; sizes: string }) {
  if (blog.coverImageUrl) {
    return (
      <Image
        src={blog.coverImageUrl}
        alt={blog.title}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        unoptimized
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-violet-100 to-blue-100">
      <BookOpen className="h-10 w-10 text-violet-300" />
    </div>
  );
}

function Meta({ blog }: { blog: BlogItem }) {
  const parts = [
    blog.authorName,
    formatDate(blog.publishedAt),
    blog.readTimeMinutes > 0 ? `${blog.readTimeMinutes} min read` : null,
  ].filter(Boolean);

  return <p className="text-xs text-gray-500">{parts.join(" · ")}</p>;
}

// ─── Featured post ────────────────────────────────────────────────────────────

function FeaturedPost({ blog }: { blog: BlogItem }) {
  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10"
    >
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-violet-100 shadow-sm">
        <Cover blog={blog} sizes="(max-width: 768px) 100vw, 50vw" />
      </div>
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-violet-600">{blog.categoryName}</p>
        <h2 className="mt-3 text-2xl font-extrabold leading-snug text-gray-900 transition-colors group-hover:text-violet-600 sm:text-3xl">
          {blog.title}
        </h2>
        {blog.excerpt && (
          <p className="mt-3 line-clamp-3 text-base leading-relaxed text-gray-600">{blog.excerpt}</p>
        )}
        <div className="mt-4">
          <Meta blog={blog} />
        </div>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 transition-all group-hover:gap-2.5">
          Read article <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </Link>
  );
}

// ─── Blog card ────────────────────────────────────────────────────────────────

function BlogCard({ blog }: { blog: BlogItem }) {
  return (
    <Link href={`/blog/${blog.slug}`} className="group flex flex-col">
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-violet-100 shadow-sm">
        <Cover blog={blog} sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" />
      </div>
      <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-violet-600">{blog.categoryName}</p>
      <h3 className="mt-2 line-clamp-2 text-lg font-bold leading-snug text-gray-900 transition-colors group-hover:text-violet-600">
        {blog.title}
      </h3>
      {blog.excerpt && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-gray-600">{blog.excerpt}</p>
      )}
      <div className="mt-3">
        <Meta blog={blog} />
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
  const [activeCategoryId, setActiveCategoryId] = useState<number>(ALL);
  const [search, setSearch] = useState("");

  // Newest first — the latest article leads the page.
  const allBlogs = Object.values(blogsByCategory)
    .flat()
    .sort((a, b) => (b.publishedAt ?? "").localeCompare(a.publishedAt ?? ""));

  const inCategory = activeCategoryId === ALL
    ? allBlogs
    : allBlogs.filter(b => b.blogCategoryId === activeCategoryId);

  const q     = search.trim().toLowerCase();
  const blogs = q
    ? inCategory.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt?.toLowerCase().includes(q) ||
        b.tags.some(t => t.name.toLowerCase().includes(q))
      )
    : inCategory;

  // The featured slot only makes sense on the unfiltered listing.
  const featured = !q && activeCategoryId === ALL ? blogs[0] : undefined;
  const rest     = featured ? blogs.slice(1) : blogs;

  const filters = [{ id: ALL, name: "All" }, ...categories];

  return (
    <div className="mx-auto max-w-6xl px-6 pb-20">

      {/* ── Filters ── */}
      <div className="flex flex-col gap-4 border-b border-violet-100 pb-6 md:flex-row md:items-center md:justify-between">
        <div className="-mx-6 overflow-x-auto px-6 md:mx-0 md:px-0">
          <div className="flex w-max gap-2 md:w-auto md:flex-wrap">
            {filters.map(cat => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategoryId(cat.id)}
                className={cn(
                  "whitespace-nowrap rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors",
                  activeCategoryId === cat.id
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-violet-100 bg-white text-gray-600 hover:border-violet-300 hover:text-violet-700"
                )}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>

        <div className="relative w-full shrink-0 md:w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search articles…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-full border border-violet-200 bg-white py-2 pl-9 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-400"
          />
        </div>
      </div>

      {blogs.length > 0 ? (
        <>
          {/* ── Featured ── */}
          {featured && (
            <div className="border-b border-violet-100 py-10">
              <FeaturedPost blog={featured} />
            </div>
          )}

          {/* ── Grid ── */}
          {rest.length > 0 && (
            <div className="grid grid-cols-1 gap-x-8 gap-y-12 pt-10 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map(blog => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-violet-50">
            <BookOpen className="h-7 w-7 text-violet-400" />
          </div>
          <p className="font-semibold text-gray-600">
            {q ? `No articles match "${search}"` : "No articles in this category yet"}
          </p>
          <p className="mt-1 text-sm text-gray-400">Check back soon!</p>
        </div>
      )}

    </div>
  );
}
