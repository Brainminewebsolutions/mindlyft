import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

const { sendMail, createTransport } = vi.hoisted(() => {
  const sendMail = vi.fn();
  const createTransport = vi.fn(() => ({ sendMail }));
  return { sendMail, createTransport };
});

vi.mock("nodemailer", () => ({
  default: { createTransport },
}));

import { POST } from "./route";

function makeRequest(body: unknown) {
  return new NextRequest("https://example.test/api/lead-notify", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

describe("POST /api/lead-notify", () => {
  beforeEach(() => {
    sendMail.mockReset();
    createTransport.mockClear();
    sendMail.mockResolvedValue({ messageId: "msg-1" });
    vi.stubEnv("SMTP_USER", "info@brainminetech.com");
    vi.stubEnv("SMTP_PASS", "test app pass");
    vi.stubEnv("SMTP_HOST", "smtp.gmail.com");
    vi.stubEnv("SMTP_PORT", "465");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.unstubAllGlobals();
  });

  it("rejects invalid phone numbers with 400", async () => {
    const res = await POST(makeRequest({ name: "Test User", phone: "12345" }));
    expect(res.status).toBe(400);
    expect(sendMail).not.toHaveBeenCalled();
  });

  it("sends full-field team notification with page-specific subject for CDAC leads without duplicating student mail", async () => {
    const res = await POST(
      makeRequest({
        refId: "ML-CDAC-1042",
        course_slug: "cloud-computing",
        course_name: "Cloud Computing & DevOps for AI",
        name: "Apurva Dandale",
        phone: "+91 9876543210",
        email: "apurva@example.com",
        background: "Working Professional",
        source: "Hero Lead Form",
        pageUrl: "https://www.mindlyftai.com/cloud-computing?utm_source=meta",
        utm_source: "meta",
        utm_campaign: "cdac_cloud",
      }),
    );

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toMatchObject({
      ok: true,
      pageSlug: "cloud-computing",
      teamEmailSent: true,
      studentEmailSent: false,
    });

    expect(createTransport).toHaveBeenCalledWith({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: { user: "info@brainminetech.com", pass: "testapppass" },
    });

    expect(sendMail).toHaveBeenCalledTimes(1);
    const mail = sendMail.mock.calls[0][0];
    expect(mail.to).toContain("apurva.d@brainminetech.com");
    expect(mail.to).toContain("sairaj.m@brainminetech.com");
    expect(mail.to).toContain("pushkaraj.a@brainminetech.com");
    expect(mail.to).toContain("suraj.pol@brainminetech.com");
    expect(mail.subject).toBe(
      "New Lead | Cloud Computing & DevOps for AI (C-DAC) — Apurva Dandale (ML-CDAC-1042)",
    );
    expect(mail.html).toContain("Working Professional");
    expect(mail.html).toContain("+91 9876543210");
    expect(mail.html).toContain("cdac_cloud");
    expect(mail.html).toContain("Hero Lead Form");
  });

  it("sends both team and student emails and forwards to IIT_GOOGLE_SCRIPT_URL for IIT pages", async () => {
    const fetchMock = vi.fn().mockResolvedValue(new Response("ok", { status: 200 }));
    vi.stubGlobal("fetch", fetchMock);
    vi.stubEnv("IIT_GOOGLE_SCRIPT_URL", "https://script.google.com/macros/s/test-deploy/exec");

    const res = await POST(
      makeRequest({
        refId: "ML-CYBER-2201",
        sheet_tab: "ai-security",
        course_slug: "ai-security",
        course_name: "Applications of AI, AI Security & Governance",
        name: "Rohan Patil",
        phone: "+919988776655",
        email: "rohan@example.com",
        profile: "Security Engineer",
        intent: "Syllabus Modal",
      }),
    );

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json).toMatchObject({
      ok: true,
      pageSlug: "ai-security",
      teamEmailSent: true,
      studentEmailSent: true,
      sheetForwarded: true,
    });

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock.mock.calls[0][0]).toBe("https://script.google.com/macros/s/test-deploy/exec");
    expect(sendMail).toHaveBeenCalledTimes(2);
    expect(sendMail.mock.calls[0][0].subject).toContain("AI Security & ISO 42001 (C3iHub IIT Kanpur)");
    expect(sendMail.mock.calls[1][0].to).toBe("rohan@example.com");
  });

  it("maps renamed cybersecurity slugs cleanly", async () => {
    const res = await POST(
      makeRequest({
        refId: "ML-CYBER-3001",
        sheet_tab: "cybersecurity-beginner-40-hour-course",
        course_slug: "cybersecurity-beginner-40-hour-course",
        name: "Sneha Joshi",
        phone: "9876543210",
        email: "sneha@example.com",
      }),
    );

    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.pageSlug).toBe("cybersecurity-beginner-40-hour-course");
    expect(sendMail.mock.calls[0][0].subject).toContain("40-Hour Beginner Cybersecurity & VAPT");
  });
});
