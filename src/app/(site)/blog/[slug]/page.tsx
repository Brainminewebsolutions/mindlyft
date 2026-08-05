import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { User, Calendar, Tag, ArrowLeft } from "lucide-react";
import { dotnetFetch } from "@/lib/api/dotnet-client";
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
      { next: { revalidate: 300 } } as RequestInit,
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
    <main className="min-h-screen bg-[#f9f8ff]">

      {/* ── Hero ── */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-screen overflow-hidden">
        {/* Background */}
        {cover ? (
          <Image src={cover} alt={blog.title} fill priority sizes="100vw" className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-violet-500 to-blue-500" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-violet-950/40 via-transparent to-transparent" />

        {/* Back link — top left */}
        <Link
          href="/blogs"
          className="absolute top-24 left-8 inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm font-medium transition-colors z-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        {/* Title + meta — bottom left */}
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="px-8 pb-4 pt-6 bg-gradient-to-r from-violet-600/80 to-blue-500/80 max-w-full backdrop-blur-sm">
            {blog.authorName && (
              <span className="flex items-center gap-1.5 text-sm text-white">
                <User className="w-3.5 h-3.5" />
                {blog.authorName}
              </span>
            )}
            {date && (
              <span className="flex items-center gap-1.5 text-sm text-white mb-3">
                <Calendar className="w-3.5 h-3.5" />
                {date}
              </span>
            )}
            <h1
              className="text-xl md:text-2xl font-bold leading-snug max-w-3xl"
              style={{ color: "#ffffff", textShadow: "0 2px 12px rgba(0,0,0,0.8)" }}
            >
              {blog.title}
            </h1>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="bg-[#f9f8ff]">

        {chapters.length > 0 ? (
          <ChapterViewer chapters={chapters} />
        ) : (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg font-medium">Content coming soon.</p>
          </div>
        )}

        {/* Tags + back link */}
        <div className="max-w-4xl mx-auto px-6 pb-12 space-y-6">
          {blog.tags.length > 0 && (
            <div className="pt-8 border-t border-violet-100">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-gray-400" />
                {blog.tags.map((t) => (
                  <span key={t.id} className="text-xs font-semibold text-violet-600 bg-violet-50 border border-violet-200 px-3 py-1 rounded-full">
                    {t.name}
                  </span>
                ))}
              </div>
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
