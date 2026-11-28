import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

type ProgramGroup = "cdac" | "iit";

interface PageMetadata {
  slug: string;
  group: ProgramGroup;
  pageName: string;
  subjectPrefix: string;
  campusPartner: string;
}

const PAGE_METADATA: Record<string, PageMetadata> = {
  "agentic-ai": {
    slug: "agentic-ai",
    group: "cdac",
    pageName: "Agentic AI & Intelligent Automation (C-DAC)",
    subjectPrefix: "New Lead | Agentic AI & Intelligent Automation (C-DAC)",
    campusPartner: "MindLyft AI in association with C-DAC",
  },
  "cloud-computing": {
    slug: "cloud-computing",
    group: "cdac",
    pageName: "Cloud Computing & DevOps for AI (C-DAC)",
    subjectPrefix: "New Lead | Cloud Computing & DevOps for AI (C-DAC)",
    campusPartner: "MindLyft AI in association with C-DAC",
  },
  "data-analytics": {
    slug: "data-analytics",
    group: "cdac",
    pageName: "Data Analytics with AI (C-DAC)",
    subjectPrefix: "New Lead | Data Analytics with AI (C-DAC)",
    campusPartner: "MindLyft AI in association with C-DAC",
  },
  "deep-learning": {
    slug: "deep-learning",
    group: "cdac",
    pageName: "Deep Learning & Neural Network Applications (C-DAC)",
    subjectPrefix: "New Lead | Deep Learning & Neural Network Applications (C-DAC)",
    campusPartner: "MindLyft AI in association with C-DAC",
  },
  "ai-security": {
    slug: "ai-security",
    group: "iit",
    pageName: "Applications of AI, AI Security & Governance (C3iHub IIT Kanpur)",
    subjectPrefix: "New Lead | AI Security & ISO 42001 (C3iHub IIT Kanpur)",
    campusPartner: "MindLyft AI in collaboration with C3iHub (IIT Kanpur)",
  },
  "cybersecurity-beginner-40-hour-course": {
    slug: "cybersecurity-beginner-40-hour-course",
    group: "iit",
    pageName: "Practical Ethical Hacking & VAPT with AI (C3iHub IIT Kanpur)",
    subjectPrefix: "New Lead | 40-Hour Beginner Cybersecurity & VAPT (C3iHub IIT Kanpur)",
    campusPartner: "MindLyft AI in collaboration with C3iHub (IIT Kanpur)",
  },
  "cybersecurity-complete-100-hours-course": {
    slug: "cybersecurity-complete-100-hours-course",
    group: "iit",
    pageName: "Full-Stack AI in Cybersecurity — 100 Hours (C3iHub IIT Kanpur)",
    subjectPrefix: "New Lead | 100-Hour Complete Cybersecurity (C3iHub IIT Kanpur)",
    campusPartner: "MindLyft AI in collaboration with C3iHub (IIT Kanpur)",
  },
  "cybersecurity-advanced-60-hour-course": {
    slug: "cybersecurity-advanced-60-hour-course",
    group: "iit",
    pageName: "Advanced SOC Analyst & Threat Intelligence — 60 Hours (C3iHub IIT Kanpur)",
    subjectPrefix: "New Lead | 60-Hour Advanced Cybersecurity & SOC (C3iHub IIT Kanpur)",
    campusPartner: "MindLyft AI in collaboration with C3iHub (IIT Kanpur)",
  },
  "ethical-hacking": {
    slug: "cybersecurity-beginner-40-hour-course",
    group: "iit",
    pageName: "Practical Ethical Hacking & VAPT with AI (C3iHub IIT Kanpur)",
    subjectPrefix: "New Lead | 40-Hour Beginner Cybersecurity & VAPT (C3iHub IIT Kanpur)",
    campusPartner: "MindLyft AI in collaboration with C3iHub (IIT Kanpur)",
  },
  "fullstack-cyber": {
    slug: "cybersecurity-complete-100-hours-course",
    group: "iit",
    pageName: "Full-Stack AI in Cybersecurity — 100 Hours (C3iHub IIT Kanpur)",
    subjectPrefix: "New Lead | 100-Hour Complete Cybersecurity (C3iHub IIT Kanpur)",
    campusPartner: "MindLyft AI in collaboration with C3iHub (IIT Kanpur)",
  },
  "soc-analyst": {
    slug: "cybersecurity-advanced-60-hour-course",
    group: "iit",
    pageName: "Advanced SOC Analyst & Threat Intelligence — 60 Hours (C3iHub IIT Kanpur)",
    subjectPrefix: "New Lead | 60-Hour Advanced Cybersecurity & SOC (C3iHub IIT Kanpur)",
    campusPartner: "MindLyft AI in collaboration with C3iHub (IIT Kanpur)",
  },
};

const DEFAULT_NOTIFY_TO = [
  "apurva.d@brainminetech.com",
  "sairaj.m@brainminetech.com",
  "pushkaraj.a@brainminetech.com",
  "suraj.pol@brainminetech.com",
];

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function normalizeIndianPhone(raw: string): string | null {
  let digits = raw.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("0")) {
    digits = digits.slice(1);
  } else if (digits.length === 12 && digits.startsWith("91")) {
    digits = digits.slice(2);
  }
  return /^[6-9]\d{9}$/.test(digits) ? digits : null;
}

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function resolvePageMetadata(body: Record<string, unknown>): PageMetadata {
  const slugCandidate = asString(body.course_slug || body.sheet_tab).toLowerCase();
  if (slugCandidate && PAGE_METADATA[slugCandidate]) {
    return PAGE_METADATA[slugCandidate];
  }

  const pageUrl = asString(body.pageUrl).toLowerCase();
  for (const [slug, meta] of Object.entries(PAGE_METADATA)) {
    if (pageUrl.includes(`/${slug}`)) {
      return meta;
    }
  }

  const fallbackCourse = asString(body.course_name) || "MindLyft AI Landing Page";
  const group: ProgramGroup = asString(body.program_group) === "cdac" ? "cdac" : "iit";
  return {
    slug: slugCandidate || "landing-page",
    group,
    pageName: fallbackCourse,
    subjectPrefix: `New Lead | ${fallbackCourse}`,
    campusPartner:
      group === "cdac"
        ? "MindLyft AI in association with C-DAC"
        : "MindLyft AI in collaboration with C3iHub (IIT Kanpur)",
  };
}

function formatSubmittedAtIst(isoString: string): string {
  const date = isoString ? new Date(isoString) : new Date();
  if (Number.isNaN(date.getTime())) {
    return new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }) + " IST";
  }
  return (
    date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "medium",
    }) + " IST"
  );
}

function buildTeamEmailContent(params: {
  meta: PageMetadata;
  refId: string;
  name: string;
  phone10: string;
  email: string;
  profile: string;
  courseName: string;
  intent: string;
  pageUrl: string;
  landingPage: string;
  referrer: string;
  submittedAtIst: string;
  utms: Record<string, string>;
}) {
  const {
    meta,
    refId,
    name,
    phone10,
    email,
    profile,
    courseName,
    intent,
    pageUrl,
    landingPage,
    referrer,
    submittedAtIst,
    utms,
  } = params;

  const phoneDisplay = `+91 ${phone10}`;
  const waLink = `https://wa.me/91${phone10}`;
  const subject = `${meta.subjectPrefix} — ${name} (${refId})`;

  const rows: Array<[string, string, string?]> = [
    ["Reference ID", refId],
    ["Page Name", meta.pageName],
    ["Page Slug", meta.slug],
    ["Program Track", meta.campusPartner],
    ["Course Name", courseName || meta.pageName],
    ["Full Name", name],
    ["Mobile / WhatsApp", phoneDisplay, waLink],
    ["Email Address", email || "Not Provided", email ? `mailto:${email}` : undefined],
    ["Background / Profile", profile || "Not Specified"],
    ["CTA / Enquiry Intent", intent || "Website Lead Form"],
    ["Submitted At", submittedAtIst],
    ["Page URL", pageUrl || "Not Provided", pageUrl || undefined],
    ["Landing Page", landingPage || "Not Provided", landingPage || undefined],
    ["Referrer", referrer || "Direct"],
    ["UTM Source", utms.utm_source || "-"],
    ["UTM Medium", utms.utm_medium || "-"],
    ["UTM Campaign", utms.utm_campaign || "-"],
    ["UTM Term", utms.utm_term || "-"],
    ["UTM Content", utms.utm_content || "-"],
    ["UTM ID", utms.utm_id || "-"],
    ["GCLID", utms.gclid || "-"],
    ["FBCLID", utms.fbclid || "-"],
  ];

  const htmlRows = rows
    .map(([label, value, href]) => {
      const safeLabel = escapeHtml(label);
      const safeValue = escapeHtml(value);
      const renderedValue = href
        ? `<a href="${escapeHtml(href)}" style="color:#4f46e5;text-decoration:none;font-weight:600">${safeValue}</a>`
        : safeValue;
      return `
        <tr>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;background:#f8fafc;font-weight:600;color:#334155;width:190px;font-size:13px">${safeLabel}</td>
          <td style="padding:10px 14px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:13px;word-break:break-word">${renderedValue}</td>
        </tr>`;
    })
    .join("");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:680px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#ffffff">
      <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:20px 24px;color:#ffffff">
        <div style="font-size:12px;letter-spacing:0.08em;text-transform:uppercase;opacity:0.9">${escapeHtml(meta.campusPartner)}</div>
        <h2 style="margin:6px 0 4px;font-size:20px;line-height:1.3">New Enquiry: ${escapeHtml(meta.pageName)}</h2>
        <div style="font-size:13px;opacity:0.95">Ref: <strong>${escapeHtml(refId)}</strong> &bull; ${escapeHtml(submittedAtIst)}</div>
      </div>
      <div style="padding:20px 24px">
        <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
          <tbody>${htmlRows}</tbody>
        </table>
        <div style="margin-top:18px;display:flex;gap:12px">
          <a href="tel:+91${phone10}" style="display:inline-block;padding:10px 16px;background:#4f46e5;color:#ffffff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:700">Call ${escapeHtml(phoneDisplay)}</a>
          <a href="${escapeHtml(waLink)}" style="display:inline-block;padding:10px 16px;background:#16a34a;color:#ffffff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:700">WhatsApp Lead</a>
        </div>
      </div>
    </div>`;

  const text = [
    `NEW LEAD — ${meta.pageName}`,
    "============================================================",
    ...rows.map(([label, value]) => `${label}: ${value}`),
  ].join("\n");

  return { subject, html, text };
}

function buildStudentEmailContent(params: {
  meta: PageMetadata;
  refId: string;
  name: string;
  courseName: string;
}) {
  const { meta, refId, name, courseName } = params;
  const displayCourse = courseName || meta.pageName;
  const subject = `Enquiry Received (${refId}) | ${meta.pageName}`;

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:620px;margin:0 auto;border:1px solid #e2e8f0;border-radius:12px;overflow:hidden;background:#ffffff">
      <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px;text-align:center;color:#ffffff">
        <h2 style="margin:0 0 6px;font-size:22px">Enquiry Received!</h2>
        <div style="font-size:13px;opacity:0.95">${escapeHtml(meta.campusPartner)} &middot; Akurdi, Pune</div>
      </div>
      <div style="padding:24px;color:#1e293b;font-size:14px;line-height:1.6">
        <p style="margin-top:0">Hi <strong>${escapeHtml(name)}</strong>,</p>
        <p>Thank you for showing interest in <strong>${escapeHtml(displayCourse)}</strong> at MindLyft AI Academy, Akurdi, Pune.</p>
        <p style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px 14px">
          <strong>Reference ID:</strong> ${escapeHtml(refId)}
        </p>
        <p>Our senior academic counsellor has received your details and will connect with you shortly via WhatsApp / Phone to share:</p>
        <ul>
          <li>Detailed Course Syllabus PDF &amp; Curriculum Breakdown</li>
          <li>Upcoming Batch Dates &amp; Classroom Timings</li>
          <li>Fee Structure &amp; Payment Options</li>
          <li>1:1 Eligibility Check &amp; Lab Placement Roadmap</li>
        </ul>
        <p style="margin-bottom:0">Need immediate help? Call/WhatsApp <strong>+91 99756 70303</strong> or reply to <a href="mailto:info@mindlyftai.com">info@mindlyftai.com</a>.</p>
      </div>
    </div>`;

  const text = [
    `Hi ${name},`,
    "",
    `Thank you for showing interest in ${displayCourse} (${meta.campusPartner}) at MindLyft AI Academy, Akurdi, Pune.`,
    `Reference ID: ${refId}`,
    "",
    "Our academic counsellor will connect with you shortly via WhatsApp / Phone.",
    "Direct Helpline: +91 99756 70303 | info@mindlyftai.com",
  ].join("\n");

  return { subject, html, text };
}

async function forwardToGoogleSheet(scriptUrl: string, payload: Record<string, unknown>): Promise<boolean> {
  if (!scriptUrl || !scriptUrl.startsWith("https://script.google.com/")) {
    return false;
  }
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(scriptUrl, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow",
      signal: controller.signal,
    });
    return res.ok;
  } catch (err) {
    console.error("[lead-notify] Google Sheet forward error:", err);
    return false;
  } finally {
    clearTimeout(timer);
  }
}

export async function POST(req: NextRequest) {
  let rawBody: unknown;
  try {
    rawBody = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON payload" }, { status: 400 });
  }

  if (!rawBody || typeof rawBody !== "object") {
    return NextResponse.json({ ok: false, error: "Invalid request body" }, { status: 400 });
  }

  const body = rawBody as Record<string, unknown>;
  const name = asString(body.name || body.full_name);
  const phone10 = normalizeIndianPhone(asString(body.phone_full || body.phone));

  if (name.length < 2) {
    return NextResponse.json({ ok: false, error: "Valid name is required" }, { status: 400 });
  }
  if (!phone10) {
    return NextResponse.json({ ok: false, error: "Valid 10-digit Indian phone is required" }, { status: 400 });
  }

  const meta = resolvePageMetadata(body);
  const emailRaw = asString(body.email);
  const studentEmail = isValidEmail(emailRaw) ? emailRaw : "";
  const refId =
    asString(body.refId) ||
    `${meta.group === "cdac" ? "ML-CDAC" : "ML-CYBER"}-${Math.floor(1000 + Math.random() * 9000)}`;
  const courseName = asString(body.course_name) || meta.pageName;
  const profile = asString(body.profile || body.background);
  const intent = asString(body.intent || body.source || body.cta_intent);
  const pageUrl = asString(body.pageUrl);
  const landingPage = asString(body.landingPage) || pageUrl;
  const referrer = asString(body.referrer);
  const submittedAt = asString(body.submittedAt) || new Date().toISOString();
  const submittedAtIst = formatSubmittedAtIst(submittedAt);

  const utms = {
    utm_source: asString(body.utm_source),
    utm_medium: asString(body.utm_medium),
    utm_campaign: asString(body.utm_campaign),
    utm_term: asString(body.utm_term),
    utm_content: asString(body.utm_content),
    utm_id: asString(body.utm_id),
    gclid: asString(body.gclid),
    fbclid: asString(body.fbclid),
  };

  let sheetForwarded = false;
  const skipServerSheet = body.skipServerSheet === true;
  if (!skipServerSheet && meta.group === "iit") {
    const iitScriptUrl = asString(process.env.IIT_GOOGLE_SCRIPT_URL);
    if (iitScriptUrl) {
      sheetForwarded = await forwardToGoogleSheet(iitScriptUrl, {
        ...body,
        refId,
        sheet_tab: meta.slug,
        course_slug: meta.slug,
        course_name: courseName,
        name,
        phone: phone10,
        phone_full: `+91 ${phone10}`,
        email: studentEmail || "Not Provided",
        profile: profile || "Not Specified",
        intent: intent || "Cybersecurity Lead Form",
        page_name: meta.pageName,
        submittedAt,
        submittedAtIst,
        ...utms,
      });
    }
  }

  const smtpUser = asString(process.env.SMTP_USER);
  const smtpPass = asString(process.env.SMTP_PASS).replace(/\s+/g, "");
  if (!smtpUser || !smtpPass) {
    console.warn("[lead-notify] SMTP_USER or SMTP_PASS is not configured");
    return NextResponse.json(
      { ok: true, emailSent: false, sheetForwarded, reason: "smtp_not_configured" },
      { status: 200 },
    );
  }

  const smtpHost = asString(process.env.SMTP_HOST) || "smtp.gmail.com";
  const smtpPort = Number(process.env.SMTP_PORT || 465);
  const recipients = (asString(process.env.LEAD_NOTIFY_TO) || DEFAULT_NOTIFY_TO.join(","))
    .split(",")
    .map((addr) => addr.trim())
    .filter(isValidEmail);

  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  const teamMail = buildTeamEmailContent({
    meta,
    refId,
    name,
    phone10,
    email: studentEmail,
    profile,
    courseName,
    intent,
    pageUrl,
    landingPage,
    referrer,
    submittedAtIst,
    utms,
  });

  let teamEmailSent = false;
  let studentEmailSent = false;

  try {
    if (recipients.length > 0) {
      await transporter.sendMail({
        from: `"MindLyft AI Leads" <${smtpUser}>`,
        to: recipients.join(", "),
        replyTo: studentEmail || smtpUser,
        subject: teamMail.subject,
        html: teamMail.html,
        text: teamMail.text,
      });
      teamEmailSent = true;
    }

    const shouldSendStudentMail =
      Boolean(studentEmail) &&
      (meta.group === "iit" || process.env.CDAC_SEND_STUDENT_EMAIL === "true");

    if (shouldSendStudentMail) {
      const studentMail = buildStudentEmailContent({ meta, refId, name, courseName });
      await transporter.sendMail({
        from: `"MindLyft AI Academy" <${smtpUser}>`,
        to: studentEmail,
        replyTo: "info@mindlyftai.com",
        subject: studentMail.subject,
        html: studentMail.html,
        text: studentMail.text,
      });
      studentEmailSent = true;
    }
  } catch (err) {
    console.error("[lead-notify] SMTP send error:", err);
    return NextResponse.json(
      { ok: false, teamEmailSent, studentEmailSent, sheetForwarded, error: "email_send_failed" },
      { status: 500 },
    );
  }

  return NextResponse.json({
    ok: true,
    refId,
    pageSlug: meta.slug,
    teamEmailSent,
    studentEmailSent,
    sheetForwarded,
  });
}
