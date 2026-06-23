import Link           from "next/link";
import { redirect }   from "next/navigation";
import { notFound }   from "next/navigation";
import { ArrowLeft, Lock } from "lucide-react";
import { dotnetFetch } from "@/lib/api/dotnet-client";
import { getSession }  from "@/lib/auth/session";
import type { Course } from "@/types/admin/course";
import CheckoutClient  from "../_components/CheckoutClient";

interface CourseEnvelope {
  isSuccess: boolean;
  data: Course;
}

async function getCourse(id: string): Promise<Course | null> {
  try {
    const envelope = await dotnetFetch<CourseEnvelope>(
      `/v1/courses/${id}`,
      { next: { revalidate: 300 } } as RequestInit,
    );
    return envelope.isSuccess ? envelope.data : null;
  } catch {
    return null;
  }
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const session = await getSession();
  if (!session) redirect(`/login?next=/checkout/${id}`);

  const course = await getCourse(id);
  if (!course) notFound();

  return (
    <div className="min-h-screen bg-[#f9f9fb]" style={{ fontFamily: "var(--primaryFont, sans-serif)" }}>
      <div className="max-w-[680px] mx-auto px-[6vw] pt-10 pb-20">

        {/* Back link */}
        <Link
          href={`/courses/${course.id}`}
          className="inline-flex items-center gap-1.5 text-[#6c63ff] text-[13px] font-semibold no-underline mb-8 hover:opacity-75 transition-opacity"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to course
        </Link>

        {/* Header */}
        <div className="text-center mb-8">
          <h1
            className="text-[#1a1046] text-[1.6rem] font-extrabold mb-2"
            style={{ fontFamily: "var(--secondaryFont, sans-serif)" }}
          >
            Complete Your Purchase
          </h1>
          <p className="text-[#888] text-sm">
            You&apos;re one step away from accessing{" "}
            <span className="text-[#1a1046] font-semibold">{course.name}</span>
          </p>
        </div>

        {/* Secure badge */}
        <div className="flex items-center justify-center gap-1.5 mb-6">
          <Lock className="w-3 h-3 text-[#6c63ff]" />
          <span className="text-[#999] text-xs font-semibold tracking-wide uppercase">
            Secure Checkout
          </span>
        </div>

        <CheckoutClient
          course={course}
          userName={session.user.name}
          userEmail={session.user.email}
          userPhoneNumber={session.user.phoneNumber}
        />
      </div>
    </div>
  );
}
