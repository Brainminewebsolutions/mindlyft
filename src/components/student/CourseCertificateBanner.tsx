"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Award, Download, Loader2, ShieldCheck } from "lucide-react";
import { studentCoursesService } from "@/services/student/studentCoursesService";
import type { CertificateInfo } from "@/types/student/course";

interface Props {
  courseId: number;
}

/** Shown once every lesson is completed — issues and downloads the certificate. */
export function CourseCertificateBanner({ courseId }: Props) {
  const [cert,        setCert]        = useState<CertificateInfo | null>(null);
  const [loading,     setLoading]     = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    studentCoursesService
      .getCertificate(courseId)
      .then(setCert)
      .catch(() => setCert(null))
      .finally(() => setLoading(false));
  }, [courseId]);

  async function download() {
    setDownloading(true);
    try {
      const info = cert ?? (await studentCoursesService.getCertificate(courseId));
      setCert(info);
      const blob = await studentCoursesService.downloadCertificate(courseId);
      const url  = URL.createObjectURL(blob);
      const a    = document.createElement("a");
      a.href     = url;
      a.download = `MindLyftAI-Certificate-${info.certificateNumber}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not download certificate");
    } finally {
      setDownloading(false);
    }
  }

  const completedOn = cert
    ? new Date(cert.completedOn).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })
    : null;

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-violet-200 bg-gradient-to-r from-violet-50 to-blue-50 px-5 py-4 shadow-sm">
      <div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-blue-500 text-white shadow">
        <Award size={22} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-gray-900">Congratulations! You&apos;ve completed this course.</p>
        {loading ? (
          <p className="mt-0.5 text-xs text-gray-500">Preparing your certificate…</p>
        ) : cert ? (
          <p className="mt-0.5 text-xs text-gray-600">
            Completed on {completedOn} &middot; Certificate ID{" "}
            <span className="font-mono font-semibold text-violet-700">{cert.certificateNumber}</span>
          </p>
        ) : (
          <p className="mt-0.5 text-xs text-gray-500">Your certificate of completion is ready to download.</p>
        )}
      </div>

      <div className="flex items-center gap-2 shrink-0">
        {cert && (
          <Link
            href={`/verify-certificate/${cert.certificateNumber}`}
            target="_blank"
            className="inline-flex items-center gap-1.5 rounded-lg border border-violet-200 bg-white px-3 py-2 text-xs font-medium text-violet-700 transition hover:bg-violet-50"
          >
            <ShieldCheck size={14} />
            Verify
          </Link>
        )}
        <button
          type="button"
          onClick={download}
          disabled={downloading}
          className="inline-flex items-center gap-1.5 rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:opacity-90 disabled:opacity-60"
        >
          {downloading ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} />}
          Download certificate
        </button>
      </div>
    </div>
  );
}
