import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, XCircle, Award, CalendarDays, Hash, User, BookOpen } from "lucide-react";
import { dotnetFetch, ApiError } from "@/lib/api/dotnet-client";
import type { CertificateInfo } from "@/types/student/course";

// Target of the QR code printed on every certificate.
export const metadata: Metadata = {
  title: "Verify Certificate",
  robots: { index: false, follow: false },
};

interface Envelope { isSuccess: boolean; data: CertificateInfo; }

async function verify(id: string): Promise<CertificateInfo | null | "error"> {
  try {
    const env = await dotnetFetch<Envelope>(
      `/v1/certificates/verify/${encodeURIComponent(id)}`,
      { cache: "no-store" },
    );
    return env.isSuccess ? env.data : null;
  } catch (e) {
    return e instanceof ApiError && e.status === 404 ? null : "error";
  }
}

export default async function VerifyCertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id }  = await params;
  const result  = await verify(id);
  const cert    = result && result !== "error" ? result : null;

  return (
    <section className="bg-gradient-to-b from-violet-50 to-white px-4 py-16 sm:py-24">
      <div className="mx-auto max-w-xl">
        <div className="mb-6 text-center">
          <Award className="mx-auto mb-3 size-10 text-violet-600" />
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Certificate Verification</h1>
          <p className="mt-1 text-sm text-gray-500">MindLyft AI course completion certificates</p>
        </div>

        {cert ? (
          <div className="overflow-hidden rounded-2xl border border-emerald-200 bg-white shadow-sm">
            <div className="flex items-center gap-3 border-b border-emerald-100 bg-emerald-50 px-6 py-4">
              <BadgeCheck className="size-7 shrink-0 text-emerald-600" />
              <div>
                <p className="font-semibold text-emerald-800">Valid certificate</p>
                <p className="text-xs text-emerald-700">This certificate was issued by MindLyft AI.</p>
              </div>
            </div>

            <dl className="divide-y divide-gray-100 px-6">
              <Row icon={User}         label="Awarded to"     value={cert.studentName} />
              <Row icon={BookOpen}     label="Course"         value={cert.courseName} />
              <Row
                icon={CalendarDays}
                label="Completed on"
                value={new Date(cert.completedOn).toLocaleDateString("en-IN", {
                  day: "numeric", month: "long", year: "numeric",
                })}
              />
              <Row icon={Hash}         label="Certificate ID" value={cert.certificateNumber} mono />
            </dl>

            {cert.courseType === "IIT" && (
              <p className="border-t border-gray-100 bg-gray-50 px-6 py-3 text-xs text-gray-500">
                Conducted by MindLyft AI in collaboration with C3iHub, IIT Kanpur.
              </p>
            )}
          </div>
        ) : (
          <div className="rounded-2xl border border-red-200 bg-white px-6 py-8 text-center shadow-sm">
            <XCircle className="mx-auto mb-3 size-10 text-red-500" />
            <p className="font-semibold text-gray-900">
              {result === "error" ? "We couldn't check this certificate right now" : "Certificate not found"}
            </p>
            <p className="mt-1 text-sm text-gray-500">
              {result === "error"
                ? "Please try again in a few minutes."
                : <>No certificate matches the ID <span className="font-mono font-semibold">{id}</span>.</>}
            </p>
          </div>
        )}

        <p className="mt-6 text-center text-xs text-gray-400">
          <Link href="/" className="hover:text-violet-600">mindlyftai.com</Link>
        </p>
      </div>
    </section>
  );
}

function Row({
  icon: Icon, label, value, mono,
}: { icon: typeof User; label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-start gap-3 py-4">
      <Icon className="mt-0.5 size-4 shrink-0 text-violet-500" />
      <dt className="w-32 shrink-0 text-sm text-gray-500">{label}</dt>
      <dd className={`text-sm font-medium text-gray-900 ${mono ? "font-mono" : ""}`}>{value}</dd>
    </div>
  );
}
