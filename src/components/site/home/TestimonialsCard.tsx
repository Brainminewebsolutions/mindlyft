import { dotnetFetch } from "@/lib/api/dotnet-client";
import Testimonials from "./Testimonials";

interface Testimonial {
  id: number;
  type: string;
  name: string;
  designation?: string;
  avatar?: string;
  video?: string;
  quote?: string;
  review?: string;
  rating: number;
  tag?: string;
  accent?: string;
  status: string;
  order: number;
}

interface TestimonialsEnvelope {
  isSuccess: boolean;
  data: { testimonials: Testimonial[] };
}

async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const envelope = await dotnetFetch<TestimonialsEnvelope>(
      "/v1/testimonials?status=ACTIVE&limit=50",
      { cache: "no-store" } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data?.testimonials ?? []) : [];
  } catch {
    return [];
  }
}

export default async function TestimonialsCard() {
  const testimonials = await getTestimonials();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <Testimonials testimonials={testimonials as any} />;
}
