import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { User, Calendar, Clock, Tag, ArrowLeft, ChevronRight } from "lucide-react";
import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import { toUploadUrl } from "@/lib/api/image-url";
import ChapterViewer from "./_components/ChapterViewer";

// ─── Types ────────────────────────────────────────────────────────────────────

type BlogTag     = { id: number; name: string; slug: string };
type BlogContent = { id: number; title: string; content: string | null; imageUrl: string | null; order: number };
type BlogChapter = { id: number; title: string; description: string | null; order: number; contents: BlogContent[] };

type BlogDetail = {
  id:              number;
  title:           string;
  slug:            string;
  excerpt:         string | null;
  coverImageUrl:   string | null;
  authorName:      string | null;
  categoryName:    string;
  status:          string;
  publishedAt:     string | null;
  readTimeMinutes: number;
  viewCount:       number;
  tags:            BlogTag[];
  chapters:        BlogChapter[];
};

type BlogEnvelope = { isSuccess: boolean; data: BlogDetail };

// ─── Data fetching ────────────────────────────────────────────────────────────

async function getBlog(slug: string): Promise<BlogDetail | null> {
  try {
    const envelope = await dotnetFetch<BlogEnvelope>(
      `/v1/blogs/slug/${encodeURIComponent(slug)}`,
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    return envelope.isSuccess ? envelope.data : null;
  } catch {
    return null;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = await getBlog(slug);
  if (!blog) notFound();

  const cover = toUploadUrl(blog.coverImageUrl);
  const date  = blog.publishedAt
    ? new Date(blog.publishedAt).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })
    : null;

  const chapters = [...blog.chapters].sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen bg-white">

      {/* ── Article header ── */}
      <header className="mx-auto max-w-4xl px-6 pt-28 pb-8 text-center">
        {/* Breadcrumb — doubles as the way back to the listing */}
        <nav className="flex flex-wrap items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest">
          <Link href="/blogs" className="text-gray-400 hover:text-violet-600 transition-colors">
            Blog
          </Link>
          {blog.categoryName && (
            <>
              <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
              <span className="text-violet-600">{blog.categoryName}</span>
            </>
          )}
        </nav>

        <h1 className="mt-3 text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
          {blog.title}
        </h1>

        {blog.excerpt && (
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg leading-relaxed text-gray-600">
            {blog.excerpt}
          </p>
        )}

        <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm text-gray-500">
          {blog.authorName && (
            <span className="flex items-center gap-1.5">
              <User className="w-4 h-4 text-violet-500" />
              {blog.authorName}
            </span>
          )}
          {date && (
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-violet-500" />
              {date}
            </span>
          )}
          {blog.readTimeMinutes > 0 && (
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-violet-500" />
              {blog.readTimeMinutes} min read
            </span>
          )}
        </div>
      </header>

      {/* ── Cover image ── */}
      {cover && (
        <div className="mx-auto max-w-5xl px-6">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-violet-100 shadow-sm">
            <Image
              src={cover}
              alt={blog.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover"
            />
          </div>
        </div>
      )}

      {/* ── Body ── */}
      <div className="mx-auto max-w-6xl px-6 py-12">

        {chapters.length > 0 ? (
          <ChapterViewer chapters={chapters} />
        ) : (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg font-medium">Content coming soon.</p>
          </div>
        )}

        {/* Tags + back link */}
        <div className="mt-12 max-w-3xl space-y-6 border-t border-violet-100 pt-8">
          {blog.tags.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              <Tag className="w-4 h-4 text-gray-400" />
              {blog.tags.map((t) => (
                <span key={t.id} className="text-xs font-semibold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1 rounded-full">
                  {t.name}
                </span>
              ))}
            </div>
          )}
          <Link href="/blogs" className="inline-flex items-center gap-2 text-sm font-semibold text-violet-600 hover:text-violet-800 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to all articles
          </Link>
        </div>

      </div>
    </main>
  );
}
