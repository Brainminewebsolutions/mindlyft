import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft, ArrowRight, Award, BookOpen, CalendarCheck, CheckCircle2,
  Clock, Globe, ListChecks, MapPin, User, Wifi,
} from "lucide-react";
import Syllabus from "@/components/site/courses/Syllabus";
import IITCourseHero from "@/components/site/courses/iit/IITCourseHero";
import IITEnrolCard from "@/components/site/courses/iit/IITEnrolCard";
import CareerOpportunities from "@/components/site/courses/CareerOpportunities";
import CoursesFaq from "@/components/site/courses/landing/CoursesFaq";
import Reviews from "@/components/site/courses/Reviews";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";
import { toUploadUrl } from "@/lib/api/image-url";
import type { Course } from "@/types/admin/course";
import type { CourseChapterItem } from "@/types/student/course";

interface Props {
  course:       Course;
  chapters:     CourseChapterItem[];
  proxiedImage: string | null;
}

const COLOR    = "#7c3aed";
const BG_COLOR = "#f5f3ff";

const primaryCta =
  "inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/25 hover:shadow-xl hover:-translate-y-0.5 transition-all";
const secondaryCta =
  "inline-flex items-center gap-2 rounded-xl border border-violet-200 bg-white px-6 py-3 text-sm font-semibold text-violet-700 hover:bg-violet-50 transition-colors";

// Admin text areas separate paragraphs with a blank line.
const paragraphs = (text: string) => text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

// Light pastel accents, cycled across cards so repeated items are told apart by colour.
const CARD_COLORS = [
  { card: "border-violet-200 bg-violet-50",   badge: "from-violet-500 to-fuchsia-500" },
  { card: "border-blue-200 bg-blue-50",       badge: "from-blue-500 to-cyan-500"      },
  { card: "border-emerald-200 bg-emerald-50", badge: "from-emerald-500 to-teal-500"   },
  { card: "border-amber-200 bg-amber-50",     badge: "from-amber-500 to-orange-500"   },
];

// Slanted top and bottom edges; the extra padding keeps content clear of the cut corners.
const DIAGONAL = cn(
  "py-24 md:py-32",
  "[clip-path:polygon(0_2.5rem,100%_0,100%_calc(100%_-_2.5rem),0_100%)]",
  "md:[clip-path:polygon(0_5rem,100%_0,100%_calc(100%_-_5rem),0_100%)]",
);

// A full-width band: the background spans the page, the content sits in the site container.
// Tinted bands are diagonal and alternate with straight white ones.
function Band({
  id, bg, eyebrow, title, diagonal = false, children,
}: {
  id?:       string;
  bg:        string;
  eyebrow?:  string;
  title?:    string;
  diagonal?: boolean;
  children:  React.ReactNode;
}) {
  return (
    <section id={id} className={cn("scroll-mt-24 px-6 md:px-[60px]", diagonal ? DIAGONAL : "py-16", bg)}>
      <div className="mx-auto max-w-6xl">
        {eyebrow && <p className="mb-2 text-center text-xs font-bold uppercase tracking-widest text-violet-500 md:text-left">{eyebrow}</p>}
        {title && <h2 className="mb-8 text-center text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-left">{title}</h2>}
        {children}
      </div>
    </section>
  );
}

export default function IITCourseDetail({ course, chapters, proxiedImage }: Props) {
  const totalLessons = chapters.reduce((sum, ch) => sum + ch.contents.length, 0);
  const highlights   = course.highlights ?? [];
  const instructor   = course.instructorDetail;
  const avatarUrl    = toUploadUrl(instructor?.avatar);
  const page         = course.pageContent;
  const audience     = page?.audience ?? [];
  const faqs         = (page?.faqs ?? []).filter((f) => f.answer).map((f) => ({ q: f.question, a: f.answer }));

  const facts = [
    { Icon: Clock,                                    label: "Duration",      value: `${course.duration} hours` },
    { Icon: course.mode === "Online" ? Wifi : MapPin, label: "Mode",          value: course.mode },
    { Icon: Globe,                                    label: "Language",      value: course.language },
    ...(chapters.length > 0
      ? [{ Icon: BookOpen, label: "Curriculum", value: `${chapters.length} modules · ${totalLessons} lessons` }]
      : []),
    { Icon: Award,                                    label: "Certification", value: "Joint MindLyft AI and C3iHub, IIT Kanpur certificate" },
    ...(course.instructor ? [{ Icon: User, label: "Lead instructor", value: course.instructor }] : []),
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* ── HERO: title, intro, CTAs ── */}
      <IITCourseHero name={course.name} category={course.category} proxiedImage={proxiedImage}>
        {course.description && (
          <div className="space-y-4 text-base leading-relaxed text-gray-600">
            {paragraphs(course.description).map((p) => <p key={p}>{p}</p>)}
          </div>
        )}
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/contact" className={primaryCta}>
            <CalendarCheck className="h-4 w-4" /> Book a free counselling call
          </Link>
          {chapters.length > 0 && (
            <a href="#syllabus" className={secondaryCta}>
              <ListChecks className="h-4 w-4" /> View the syllabus
            </a>
          )}
        </div>
      </IITCourseHero>

      {/* ── ENROL: price, actions, course facts ── */}
      <Band bg="bg-white">
        <IITEnrolCard
          courseId={course.id}
          price={course.price}
          discount={course.discount}
          discountPrice={course.discountPrice}
          status={course.status}
          facts={facts}
        />
      </Band>

      {/* ── OUTCOMES: gradient band (falls back to the highlight list) ── */}
      {page?.outcomesText ? (
        <Band diagonal bg="bg-gradient-to-br from-violet-200 via-fuchsia-100 to-blue-200" eyebrow="Outcomes" title="What you will be able to do">
          <div className="max-w-4xl space-y-4 text-base leading-relaxed text-gray-700 sm:text-lg">
            {paragraphs(page.outcomesText).map((p) => <p key={p}>{p}</p>)}
          </div>
        </Band>
      ) : highlights.length > 0 && (
        <Band diagonal bg="bg-gradient-to-br from-violet-200 via-fuchsia-100 to-blue-200" eyebrow="Outcomes" title="What you will learn">
          <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-2.5 rounded-xl bg-white/70 px-4 py-3 text-sm font-medium text-gray-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-violet-600" />
                {h}
              </li>
            ))}
          </ul>
        </Band>
      )}

      {/* ── AUDIENCE: numbered cards on white ── */}
      {audience.length > 0 && (
        <Band bg="bg-white" eyebrow="Audience" title="Who this certification is for">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {audience.map(({ title, description }, i) => {
              const c = CARD_COLORS[i % CARD_COLORS.length];
              return (
              <div key={title} className={cn("rounded-2xl border p-6 shadow-sm", c.card)}>
                <span className={cn("mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br text-sm font-bold text-white", c.badge)}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mb-2 text-base font-bold leading-snug text-gray-900">{title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{description}</p>
              </div>
              );
            })}
          </div>
        </Band>
      )}

      {/* ── SYLLABUS: accordion on a violet tint ── */}
      {chapters.length > 0 && (
        <Band
          id="syllabus"
          diagonal
          bg="bg-gradient-to-br from-blue-100 via-cyan-50 to-violet-100"
          eyebrow="Curriculum"
          title={`Course syllabus — ${chapters.length} modules, ${course.duration} hours`}
        >
          <div className="rounded-3xl border border-violet-100 bg-white p-4 shadow-sm sm:p-6">
            <Syllabus chapters={chapters} totalLessons={totalLessons} showHeader={false} color={COLOR} bgColor={BG_COLOR} />
          </div>
        </Band>
      )}

      {/* ── INSTRUCTOR: split card on white ── */}
      {instructor && (
        <Band bg="bg-white">
          <div className="overflow-hidden rounded-3xl border border-violet-100 bg-white shadow-sm md:flex">
            {/* Photo panel */}
            <div className="flex shrink-0 items-center justify-center bg-gradient-to-br from-fuchsia-200 via-violet-200 to-blue-200 p-10 md:w-80">
              <div className="relative h-44 w-44 overflow-hidden rounded-full border-4 border-white bg-white shadow-md">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={`${instructor.name}, cyber security instructor, C3iHub IIT Kanpur`}
                    fill
                    sizes="176px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-violet-300">
                    <User className="h-20 w-20" />
                  </div>
                )}
              </div>
            </div>
            {/* Bio */}
            <div className="flex min-w-0 flex-col justify-center p-6 text-center sm:p-10 md:text-left">
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-violet-500">Your instructor</p>
              <h2 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">{instructor.name}</h2>
              {instructor.designation && (
                <p className="mt-2 text-base font-semibold text-violet-600">{instructor.designation}</p>
              )}
              {instructor.description && (
                <p className="mt-5 text-base leading-relaxed text-gray-600">{instructor.description}</p>
              )}
            </div>
          </div>
        </Band>
      )}

      {/* ── CAREERS: pill chips on a blue tint ── */}
      <Band diagonal bg="bg-gradient-to-br from-emerald-100 via-teal-50 to-blue-100" eyebrow="Careers" title="Careers this certification leads to">
        <CareerOpportunities
          roles={page?.careerRoles?.length ? page.careerRoles : undefined}
          intro="The programme is mapped to the roles employers are recruiting for:"
          note={page?.careersNote ?? undefined}
        />
      </Band>

      {/* ── FAQ ── */}
      {faqs.length > 0 && <CoursesFaq bg="bg-white" heading="Common questions" faqs={faqs} />}

      {/* ── TESTIMONIALS ── */}
      <Reviews className={cn("bg-gradient-to-br from-amber-50 via-fuchsia-50 to-violet-100", DIAGONAL)} />

      {/* ── CLOSING CTA ── */}
      <section className="bg-white px-6 py-20 md:px-[60px]">
        <div className="mx-auto max-w-6xl rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-200 via-fuchsia-100 to-blue-200 p-8 text-center shadow-sm sm:p-12">
          <h2 className="mb-4 text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">Not sure this is the right level?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-base leading-relaxed text-gray-600">
            MindLyft AI runs five cyber security courses in Pune at different levels and price points.
            Choosing between them from a web page is genuinely hard. A short call will match you to the
            right one, at no cost.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/contact" className={primaryCta}>
              <CalendarCheck className="h-4 w-4" /> Book a free counselling call
            </Link>
            <Link href={`${ROUTES.iit}#programmes`} className={secondaryCta}>
              Compare all five programmes <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <Link
            href="/courses"
            className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Courses
          </Link>
        </div>
      </section>

    </div>
  );
}
