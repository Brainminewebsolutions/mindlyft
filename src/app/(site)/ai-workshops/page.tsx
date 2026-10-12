import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Mail, MessageCircle } from "lucide-react";
import { dotnetFetch, REVALIDATE_SECONDS } from "@/lib/api/dotnet-client";
import type { Webinar } from "@/types/admin/webinar";
import { AnimateIn } from "@/components/ui/AnimateIn";
import { SITE_CONFIG } from "@/constants/siteConfig";
import WorkshopsHero from "@/components/site/workshops/WorkshopsHero";
import WorkshopsAudience from "@/components/site/workshops/WorkshopsAudience";
import { WORKSHOP_FAQS } from "@/components/site/workshops/content";
import { SectionHeader } from "@/components/site/courses/landing/InfoSection";
import CoursesFaq from "@/components/site/courses/landing/CoursesFaq";
import WorkshopsList from "./_components/WorkshopsList";

export const metadata: Metadata = {
  title: { absolute: "Free AI Workshops in Pune | Hands-On Sessions | MindLyft AI" },
  description:
    "Free hands-on AI workshops in Pune — generative AI, prompt engineering, data analytics and Power BI. Taught in person at our Akurdi campus. See upcoming dates.",
  alternates: { canonical: "/ai-workshops" },
};

const NOTIFY_MESSAGE = "Hi, please let me know when the next free AI workshop opens.";
const NOTIFY_WHATSAPP = `${SITE_CONFIG.social.whatsapp}?text=${encodeURIComponent(NOTIFY_MESSAGE)}`;
const NOTIFY_EMAIL =
  `mailto:${SITE_CONFIG.email}?subject=${encodeURIComponent("Notify me about the next AI workshop")}`;

type Envelope = { isSuccess: boolean; data: Webinar[] };

async function getWorkshops(): Promise<Webinar[]> {
  try {
    const envelope = await dotnetFetch<Envelope>(
      "/v1/workshopWebinar/public?type=Workshop",
      { next: { revalidate: REVALIDATE_SECONDS } } as RequestInit,
    );
    return envelope.isSuccess ? (envelope.data ?? []) : [];
  } catch {
    return [];
  }
}

export default async function WorkshopsPage() {
  const items = await getWorkshops();

  const todayStr = new Date().toISOString().slice(0, 10);
  const upcoming = items
    .filter(w => w.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date));
  const past = items
    .filter(w => w.date < todayStr)
    .sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div className="min-h-screen bg-white">
      <WorkshopsHero />

      <div id="upcoming" className="scroll-mt-24">
        <WorkshopsList
          items={upcoming}
          badge="Upcoming"
          heading="Upcoming workshops"
          emptyTitle="No dates announced yet"
          emptyHint="Ask us to notify you below and you will hear as soon as the next one opens."
        />
      </div>

      {/* What a session looks like */}
      <section className="bg-violet-50 px-6 md:px-[60px] py-20">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <SectionHeader
            badge="Inside a Session"
            heading="What a session actually looks like"
            intro={<p>Two to three hours, capped at a small group so you can actually ask questions.</p>}
          />
          <div className="grid gap-4">
            <AnimateIn delay={150} direction="up">
              <p className="rounded-2xl border border-violet-100 bg-white p-6 text-base text-gray-600 leading-relaxed shadow-sm">
                We start with the problem, not the tool — what this technology is genuinely good at, and
                where it falls over. Then you open a laptop and build something small that works. You leave
                with the file you made, the steps to repeat it, and an honest answer to whether this is
                worth your time.
              </p>
            </AnimateIn>
            <AnimateIn delay={220} direction="up">
              <p className="rounded-2xl border border-violet-100 bg-white p-6 text-base text-gray-600 leading-relaxed shadow-sm">
                There is no sales presentation at the end. If you want to talk about a full programme, our
                counsellors are in the building and you can ask. If you do not, nobody will chase you.
              </p>
            </AnimateIn>
          </div>
        </div>
      </section>

      {/* Notify me */}
      <section id="notify" className="bg-white px-6 md:px-[60px] py-20 scroll-mt-24">
        <AnimateIn direction="zoom">
          <div className="max-w-5xl mx-auto rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 via-white to-blue-50 p-8 sm:p-12 text-center shadow-sm">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
              Notify me when the next one opens
            </h2>
            <p className="mx-auto max-w-2xl text-base text-gray-600 leading-relaxed mb-8">
              Send us a message and we will tell you when the next workshop date is announced.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <a
                href={NOTIFY_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="h-4 w-4" /> Notify me on WhatsApp
              </a>
              <a
                href={NOTIFY_EMAIL}
                className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors"
              >
                <Mail className="h-4 w-4" /> Notify me by email
              </a>
            </div>
          </div>
        </AnimateIn>
      </section>

      <WorkshopsAudience bg="bg-violet-50" />

      <div id="past" className="scroll-mt-24">
        <WorkshopsList
          items={past}
          badge="Archive"
          heading="Past workshops"
          intro="A record of sessions we have already run. Topics repeat every few months — if one of these is what you were looking for, message us above and we will tell you when it comes round again."
          emptyTitle="No past workshops yet"
          emptyHint="Sessions will be listed here once they have run."
        />
      </div>

      <CoursesFaq bg="bg-violet-50" heading="Common questions" faqs={WORKSHOP_FAQS} centered />

      {/* From a workshop to a full programme */}
      <section className="bg-white px-6 md:px-[60px] py-20">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            badge="Next Step"
            heading="From a workshop to a full programme"
            intro={
              <>
                <p>
                  If a session convinces you this is worth pursuing properly, our programmes cover the same
                  ground in depth — generative AI and LLMs, machine learning, data analytics, and
                  cybersecurity with C3iHub at IIT Kanpur.
                </p>
                <p>
                  There is no pressure to move from one to the other. Plenty of people attend a workshop, go
                  away and apply what they learned, and that is a good outcome.
                </p>
              </>
            }
          />
          <div className="text-center md:text-left">
            <Link
              href="/courses"
              className="inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors"
            >
              Browse our programmes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
