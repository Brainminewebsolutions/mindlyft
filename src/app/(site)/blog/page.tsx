import Link from "next/link";
import Image from "next/image";
import { Clock, User, Tag, ArrowRight } from "lucide-react";
import { dotnetFetch } from "@/lib/api/dotnet-client";
import { toUploadUrl } from "@/lib/api/image-url";

// ─── Types ────────────────────────────────────────────────────────────────────

type BlogTag  = { id: number; name: string; slug: string };
type BlogItem = {
  id:              number;
  title:           string;
  slug:            string;
  excerpt:         string | null;
  coverImageUrl:   string | null;
  authorName:      string | null;
  categoryName:    string;
  blogCategoryId:  number;
  status:          string;
  publishedAt:     string | null;
  readTimeMinutes: number;
  tags:            BlogTag[];
};

type BlogListEnvelope = {
  isSuccess: boolean;
  data: { blogs: BlogItem[]; pagination: { total: number } };
};

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getPublishedBlogs(): Promise<BlogItem[]> {
  try {
    const envelope = await dotnetFetch<BlogListEnvelope>(
      "/v1/blogs?status=Active&limit=200",
      { next: { revalidate: 300 } } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data?.blogs ?? []) : [];
  } catch {
    return [];
  }
}

// ─── Blog Card ────────────────────────────────────────────────────────────────

const CARD_GRADIENTS = [
  "from-violet-500 to-blue-500",
  "from-fuchsia-500 to-violet-600",
  "from-blue-500 to-cyan-400",
  "from-emerald-500 to-teal-500",
  "from-orange-400 to-pink-500",
  "from-indigo-500 to-purple-600",
];

function BlogCard({ blog, index }: { blog: BlogItem; index: number }) {
  const img      = toUploadUrl(blog.coverImageUrl);
  const gradient = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
  const date     = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })
    : null;

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex flex-col rounded-2xl border border-violet-100 bg-white overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Cover */}
      <div className="relative h-48 overflow-hidden shrink-0">
        {img ? (
          <Image src={img} alt={blog.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" unoptimized />
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
        {/* Tags */}
        {blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {blog.tags.slice(0, 3).map((t) => (
              <span key={t.id} className="text-[10px] font-semibold uppercase tracking-wider text-violet-600 bg-violet-50 px-2.5 py-0.5 rounded-full">
                {t.name}
              </span>
            ))}
          </div>
        )}

        {/* Title */}
        <h3 className="text-[15px] font-bold text-gray-900 leading-snug mb-2 group-hover:text-violet-600 transition-colors line-clamp-2">
          {blog.title}
        </h3>

        {/* Excerpt */}
        {blog.excerpt && (
          <p className="text-sm text-gray-500 leading-relaxed line-clamp-2 mb-4 flex-1">
            {blog.excerpt}
          </p>
        )}

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-gray-400">
            {blog.authorName && (
              <>
                <User className="w-3 h-3" />
                <span>{blog.authorName}</span>
                {date && <span className="mx-1">·</span>}
              </>
            )}
            {date && <span>{date}</span>}
          </div>
          <span className="flex items-center gap-1 text-xs font-semibold text-violet-600 group-hover:gap-2 transition-all">
            Read <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPage() {
  const blogs = await getPublishedBlogs();

  // Group by category
  const categoryMap = new Map<string, BlogItem[]>();
  for (const blog of blogs) {
    const key = blog.categoryName || "Uncategorised";
    if (!categoryMap.has(key)) categoryMap.set(key, []);
    categoryMap.get(key)!.push(blog);
  }
  const categories = Array.from(categoryMap.entries());

  return (
    <main className="min-h-screen bg-[#f9f8ff]">

      {/* ── Hero ── */}
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-violet-500 to-blue-500 pt-28 pb-20 px-6 text-center">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px), radial-gradient(circle at 70% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }}
        />
        <div className="relative max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm text-white text-sm font-semibold px-5 py-2 rounded-full ring-1 ring-white/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            Blog & Insights
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4">
            Ideas, Stories &amp; Expertise
          </h1>
          <p className="text-white/80 text-lg max-w-xl mx-auto">
            Explore our latest articles on AI, technology, business, and innovation — curated by our experts.
          </p>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-16 space-y-16">

        {blogs.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No articles published yet.</p>
            <p className="text-sm mt-1">Check back soon!</p>
          </div>
        ) : (
          categories.map(([category, items]) => (
            <section key={category}>
              {/* Category header */}
              <div className="flex items-center gap-4 mb-8">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-violet-500" />
                  <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                  <span className="text-sm font-medium text-violet-500 bg-violet-50 px-2.5 py-0.5 rounded-full">
                    {items.length}
                  </span>
                </div>
                <div className="flex-1 h-px bg-gradient-to-r from-violet-200 to-transparent" />
              </div>

              {/* Cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {items.map((blog, i) => (
                  <BlogCard key={blog.id} blog={blog} index={i} />
                ))}
              </div>
            </section>
          ))
        )}
      </div>
    </main>
  );
}
