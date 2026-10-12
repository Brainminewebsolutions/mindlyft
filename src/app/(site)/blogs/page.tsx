import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import BlogsClient, { type BlogItem, type Category } from "./_components/BlogsClient";

// ─── Types ────────────────────────────────────────────────────────────────────

type ApiCategory = {
  id:          number;
  name:        string;
  slug:        string;
  description: string | null;
};

type ApiBlog = {
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
  tags:            { id: number; name: string; slug: string }[];
};

type CatEnvelope  = { isSuccess: boolean; data: ApiCategory[] };
type BlogEnvelope = { isSuccess: boolean; data: { blogs: ApiBlog[] } };

// ─── Data fetching ────────────────────────────────────────────────────────────

async function fetchData(): Promise<{
  categories:      Category[];
  blogsByCategory: Record<number, BlogItem[]>;
}> {
  const [catRes, blogRes] = await Promise.allSettled([
    dotnetFetch<CatEnvelope>("/v1/blog-categories?status=Active", { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit),
    dotnetFetch<BlogEnvelope>("/v1/blogs?status=Active&limit=200", { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit),
  ]);

  const apiCategories: ApiCategory[] =
    catRes.status === "fulfilled" && catRes.value.isSuccess ? catRes.value.data : [];

  const apiBlogs: ApiBlog[] =
    blogRes.status === "fulfilled" && blogRes.value.isSuccess
      ? (blogRes.value.data?.blogs ?? [])
      : [];

  // Build blogsByCategory map
  const blogsByCategory: Record<number, BlogItem[]> = {};
  for (const b of apiBlogs) {
    if (!blogsByCategory[b.blogCategoryId]) blogsByCategory[b.blogCategoryId] = [];
    blogsByCategory[b.blogCategoryId].push(b);
  }

  // Build category list, only include categories that have blogs (or all if none do)
  const catIds = new Set(apiBlogs.map(b => b.blogCategoryId));
  const filteredCats = apiCategories.filter(c => catIds.has(c.id));
  const finalCats    = filteredCats.length > 0 ? filteredCats : apiCategories;

  const categories: Category[] = finalCats.map(c => ({
    id:          c.id,
    name:        c.name,
    slug:        c.slug,
    description: c.description,
    blogCount:   (blogsByCategory[c.id] ?? []).length,
  }));

  return { categories, blogsByCategory };
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogsPage() {
  const { categories, blogsByCategory } = await fetchData();

  return (
    <div className="min-h-screen bg-white">

      {/* ── Page header ── */}
      <header className="mx-auto max-w-3xl px-6 pt-28 pb-10 text-center">
        <p className="text-xs font-bold uppercase tracking-widest text-violet-600">
          Blog &amp; Insights
        </p>
        <h1 className="mt-3 text-4xl md:text-5xl font-extrabold leading-tight text-gray-900">
          Ideas, Stories &amp; Expertise
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-gray-600">
          Explore our latest articles on AI, technology, business, and innovation.
        </p>
      </header>

      {/* ── Body ── */}
      {categories.length === 0 ? (
        <div className="text-center py-24 text-gray-400">
          <p className="text-lg font-medium">No articles published yet.</p>
          <p className="text-sm mt-1">Check back soon!</p>
        </div>
      ) : (
        <BlogsClient categories={categories} blogsByCategory={blogsByCategory} />
      )}

    </div>
  );
}
