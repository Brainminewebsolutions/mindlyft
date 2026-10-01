import Image from "next/image";
import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import { Star, Quote } from "lucide-react";

interface Review {
  id: number;
  name: string;
  designation?: string;
  avatar?: string;
  quote?: string;
  review?: string;
  rating: number;
  tag?: string;
  accent?: string;
  status: string;
}

interface ReviewsEnvelope {
  isSuccess: boolean;
  data: { testimonials: Review[] };
}

async function getReviews(): Promise<Review[]> {
  try {
    const envelope = await dotnetFetch<ReviewsEnvelope>(
      "/v1/testimonials?status=ACTIVE&limit=50",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data?.testimonials ?? []) : [];
  } catch {
    return [];
  }
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          fill={i < rating ? "#f59e0b" : "#e5e7eb"}
          color={i < rating ? "#f59e0b" : "#e5e7eb"}
        />
      ))}
    </div>
  );
}

function Avatar({ src, name, accent }: { src?: string; name: string; accent: string }) {
  if (src) {
    return <Image src={src} alt={name} width={40} height={40} className="h-full w-full object-cover" />;
  }
  return (
    <span className="text-sm font-black" style={{ color: accent }}>
      {name.slice(0, 2).toUpperCase()}
    </span>
  );
}

function ReviewCard({ review }: { review: Review }) {
  const accent = review.accent ?? "#7c3aed";
  const text   = review.review ?? review.quote ?? "";

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-violet-100 bg-white p-6 shadow-sm">
      {/* Quote icon */}
      <Quote size={28} className="shrink-0 opacity-20" style={{ color: accent }} />

      {/* Review text */}
      <p className="flex-1 text-sm leading-relaxed text-gray-600 line-clamp-4">
        {text}
      </p>

      {/* Stars */}
      <Stars rating={review.rating} />

      {/* Divider */}
      <div className="h-px bg-violet-50" />

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full"
          style={{ backgroundColor: `${accent}18`, border: `2px solid ${accent}30` }}
        >
          <Avatar src={review.avatar} name={review.name} accent={accent} />
        </div>
        <div>
          <p className="text-sm font-bold text-gray-900">{review.name}</p>
          {review.designation && (
            <p className="text-xs text-gray-400">{review.designation}</p>
          )}
        </div>
        {review.tag && (
          <span
            className="ml-auto rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
            style={{ backgroundColor: `${accent}12`, color: accent }}
          >
            {review.tag}
          </span>
        )}
      </div>
    </div>
  );
}

export default async function Reviews() {
  const reviews = await getReviews();
  if (reviews.length === 0) return null;

  return (
    <section className="py-14 px-6 md:px-14 lg:px-20">
      <div className="max-w-5xl mx-auto">

        {/* Heading */}
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-2xl md:text-4xl font-black text-violet-700 mb-2">
            Student Reviews
          </h2>
          <p className="text-sm text-gray-500">
            Real experiences from learners who completed this program.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reviews.map((r) => (
            <ReviewCard key={r.id} review={r} />
          ))}
        </div>

      </div>
    </section>
  );
}
