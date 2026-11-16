import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ChevronRight, Plus, User } from "lucide-react";
import { SITE_CONFIG } from "@/constants/siteConfig";
import { toUploadUrl } from "@/lib/api/image-url";
import { cn } from "@/lib/utils";
import CourseEnrolLink from "../CourseEnrolLink";
import type { Course } from "@/types/admin/course";
import type { CourseChapterItem } from "@/types/student/course";

interface Props {
  course:       Course;
  chapters:     CourseChapterItem[];
  proxiedImage: string | null;
}

const SITE_URL = "https://www.mindlyftai.com";

const primaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700";
const secondaryBtn =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-5 py-3 text-sm font-semibold text-gray-900 transition-colors hover:bg-gray-50";

const band      = "scroll-mt-28 px-6 py-16 md:px-[60px] md:py-24";
const container = "mx-auto max-w-6xl";
const h2        = "text-center text-3xl font-semibold leading-tight tracking-tight text-gray-900 sm:text-4xl md:text-left";
const kicker    = "mb-3 text-center text-sm font-semibold uppercase tracking-wider md:text-left";

// Colour roles on this page: blue = actions, emerald = outcomes and careers,
// violet = MindLyft itself, amber = price offers. These cycle only where items are peers.
const AUDIENCE_ACCENTS = [
  { rule: "bg-blue-600",    num: "text-blue-600"    },
  { rule: "bg-violet-600",  num: "text-violet-600"  },
  { rule: "bg-emerald-600", num: "text-emerald-600" },
  { rule: "bg-amber-500",   num: "text-amber-600"   },
];
const MODULE_ACCENTS = ["bg-blue-600", "bg-violet-600", "bg-emerald-600", "bg-amber-500", "bg-rose-500"];

// Admin text areas separate paragraphs with a blank line.
const paragraphs = (text: string) => text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);

export default function MindlyftCourseDetail({ course, chapters, proxiedImage }: Props) {
  const totalLessons = chapters.reduce((sum, ch) => sum + ch.contents.length, 0);
  const highlights   = course.highlights ?? [];
  const instructor   = course.instructorDetail;
  const avatarUrl    = toUploadUrl(instructor?.avatar);
  const page         = course.pageContent;
  const audience     = page?.audience ?? [];
  const careerRoles  = page?.careerRoles ?? [];
  const faqs         = (page?.faqs ?? []).filter((f) => f.answer);

  const [lead, ...overview] = course.description ? paragraphs(course.description) : [];

  const isClassroom = course.mode !== "Online";
  const isUpcoming  = course.status === "UPCOMING";
  const hasDiscount = course.price > 0 && (course.discount ?? 0) > 0;
  const payable     = hasDiscount ? Math.round(course.discountPrice) : course.price;
  const priceText   = (n: number) => `₹${n.toLocaleString("en-IN")}`;
  const modeText    = `${course.mode}${isClassroom ? " classroom" : ""}`;
  const curriculum  = [
    chapters.length > 0 ? `${chapters.length} modules` : null,
    totalLessons > 0 ? `${totalLessons} lessons` : null,
  ].filter((v): v is string => !!v);

  const heroFacts = [`${course.duration} hours`, modeText, course.language, ...curriculum];

  const includes = [
    `${course.duration} hours of ${isClassroom ? "in-person teaching" : "live teaching"}`,
    ...(curriculum.length > 0 ? [curriculum.join(", ")] : []),
    `Taught in ${course.language}`,
    ...(course.instructor ? [`Instructor: ${course.instructor}`] : []),
  ];

  const figures = [
    { value: String(course.duration), label: "hours of teaching", color: "text-blue-600" },
    ...(chapters.length > 0 ? [{ value: String(chapters.length), label: "modules, in sequence", color: "text-violet-600" }] : []),
    ...(totalLessons > 0 ? [{ value: String(totalLessons), label: "lessons", color: "text-emerald-600" }] : []),
  ];

  const batchDetails = [
    { label: "Duration", value: `${course.duration} hours${curriculum.length > 0 ? ` across ${curriculum.join(" and ")}` : ""}` },
    { label: "Mode",     value: modeText },
    { label: "Language", value: course.language },
    ...(course.instructor ? [{ label: "Instructor", value: course.instructor }] : []),
    ...(isClassroom ? [{ label: "Campus", value: SITE_CONFIG.address }] : []),
    {
      label: "Fees",
      value: course.price === 0
        ? "Free"
        : hasDiscount
          ? `${priceText(course.price)}, currently ${priceText(payable)} + GST with a ${course.discount}% discount applied`
          : `${priceText(course.price)} + GST`,
    },
  ];

  const reasons = [
    { title: "Faculty with hands-on industry experience.", desc: "Instructors bring practical experience into the classroom, so what you learn reflects how these systems are actually built." },
    { title: "A curriculum that tracks the industry.",     desc: "The syllabus covers tools in current production use, rather than material that stopped being current two years ago." },
    { title: "Real data, real projects.",                  desc: "Every module builds toward applied work, ending in capstone projects rather than closed-book assessments." },
    ...(isClassroom
      ? [{ title: "Classroom teaching, not recorded video.", desc: `All ${course.duration} hours are taught in person, so you can ask a question the moment you are stuck.` }]
      : []),
    { title: "Guest lectures from working professionals.", desc: "Regular sessions on what is changing in the field right now." },
  ];

  const hasOutcomes = !!page?.outcomesText || highlights.length > 0;
  const hasCareers  = careerRoles.length > 0 || !!page?.careersNote;

  const nav = [
    ...(overview.length > 0   ? [{ href: "#overview",   label: "Overview" }]      : []),
    ...(audience.length > 0   ? [{ href: "#audience",   label: "Who it's for" }]  : []),
    ...(hasOutcomes           ? [{ href: "#outcomes",   label: "Outcomes" }]      : []),
    ...(chapters.length > 0   ? [{ href: "#syllabus",   label: "Syllabus" }]      : []),
    ...(hasCareers            ? [{ href: "#careers",    label: "Careers" }]       : []),
    { href: "#fees", label: "Fees" },
    ...(instructor            ? [{ href: "#instructor", label: "Instructor" }]    : []),
    ...(faqs.length > 0       ? [{ href: "#faq",        label: "FAQ" }]           : []),
  ];

  const schema = [
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: course.name,
      description: course.metaDescription ?? course.description ?? undefined,
      provider: { "@type": "Organization", name: SITE_CONFIG.name, sameAs: SITE_URL },
      timeRequired: `PT${course.duration}H`,
      offers: { "@type": "Offer", price: payable, priceCurrency: "INR", category: course.price === 0 ? "Free" : "Paid" },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: isClassroom ? "Onsite" : "Online",
        courseWorkload: `PT${course.duration}H`,
        ...(course.instructor ? { instructor: { "@type": "Person", name: course.instructor } } : {}),
      },
    },
    ...(faqs.length > 0
      ? [{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        }]
      : []),
  ];

  const enrolAction = isUpcoming ? (
    <span className="inline-flex items-center justify-center rounded-lg bg-amber-100 px-5 py-3 text-sm font-semibold text-amber-800">
      Enrolment opens soon
    </span>
  ) : (
    <CourseEnrolLink courseId={course.id} className={primaryBtn}>
      {course.price === 0 ? "Enrol for free" : "Enrol now"} <ArrowRight className="h-4 w-4" />
    </CourseEnrolLink>
  );

  const priceBlock = (
    <div className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
      <span className="text-3xl font-semibold tracking-tight text-gray-900">
        {course.price === 0 ? "Free" : priceText(payable)}
      </span>
      {course.price > 0 && <span className="text-sm text-gray-500">+ GST</span>}
      {hasDiscount && (
        <>
          <span className="text-sm text-gray-400 line-through">{priceText(course.price)}</span>
          <span className="rounded-md bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">{course.discount}% off</span>
        </>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />

      {/* ── HERO: title and summary beside the enrolment card ── */}
      <header className="relative overflow-hidden border-b border-gray-200 bg-gray-50 px-6 pb-14 pt-32 md:px-[60px] md:pb-20">
        {/* Dark slanted panel behind the enrolment card, and a faint ring bottom-left */}
        <div aria-hidden className="absolute right-0 top-0 hidden h-full w-[32%] bg-gradient-to-br from-blue-800 to-indigo-900 [clip-path:polygon(22%_0,100%_0,100%_100%,0_100%)] lg:block" />
        <div aria-hidden className="absolute -bottom-28 -left-28 hidden h-72 w-72 rounded-full border-[44px] border-blue-900/5 md:block" />
        <div className={cn(container, "relative grid grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1fr)_380px] lg:gap-16")}>

          <div className="text-center md:text-left">
            <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center justify-center gap-1.5 text-sm text-gray-500 md:justify-start">
              <Link href="/courses" className="hover:text-gray-900">Courses</Link>
              {course.category && (
                <>
                  <ChevronRight className="h-3.5 w-3.5" />
                  <span className="font-medium text-blue-700">{course.category}</span>
                </>
              )}
            </nav>

            <h1 className="text-3xl font-semibold leading-[1.15] tracking-tight text-gray-900 sm:text-4xl lg:text-[2.75rem]">
              {course.name}
            </h1>

            {lead && <p className="mt-6 text-lg leading-relaxed text-gray-600">{lead}</p>}

            <ul className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium text-gray-700 md:justify-start">
              {heroFacts.map((fact) => (
                <li key={fact} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-blue-600" />
                  {fact}
                </li>
              ))}
            </ul>

            {course.instructor && (
              <p className="mt-4 text-sm text-gray-500">
                Taught by <span className="font-medium text-gray-900">{course.instructor}</span>
              </p>
            )}
          </div>

          {/* Enrolment card */}
          <aside className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            <div className="relative aspect-video w-full bg-gray-100">
              {proxiedImage && (
                <Image
                  src={proxiedImage}
                  alt={`${course.name} at MindLyft AI`}
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 380px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="p-6">
              {priceBlock}
              <div className="mt-5 flex flex-col gap-2.5">
                {enrolAction}
                <Link href="/contact" className={secondaryBtn}>Enquire about the next batch</Link>
              </div>
              <ul className="mt-6 space-y-2.5 border-t border-gray-200 pt-5">
                {includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

        </div>
      </header>

      {/* ── SECTION LINKS ── */}
      <nav aria-label="On this page" className="border-b border-gray-200 px-6 md:px-[60px]">
        <ul className={cn(container, "flex gap-x-7 overflow-x-auto text-sm font-medium text-gray-600")}>
          {nav.map(({ href, label }) => (
            <li key={href} className="shrink-0">
              <a href={href} className="block border-b-2 border-transparent py-4 transition-colors hover:border-blue-600 hover:text-gray-900">
                {label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── OVERVIEW: reading column beside the key figures ── */}
      {overview.length > 0 && (
        <section id="overview" className={cn(band, "bg-white")}>
          <div className={cn(container, "grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-20")}>
            <div className="space-y-5 text-lg leading-relaxed text-gray-600">
              {overview.map((p, i) => (
                <p key={p} className={i === 0 ? "border-l-4 border-blue-600 pl-5 text-xl font-medium text-gray-900" : undefined}>{p}</p>
              ))}
            </div>
            <dl className="grid grid-cols-3 gap-6 text-center lg:grid-cols-1 lg:text-left lg:gap-8 lg:border-l lg:border-gray-200 lg:pl-10">
              {figures.map(({ value, label, color }) => (
                <div key={label}>
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <span className={cn("block text-4xl font-semibold tracking-tight sm:text-5xl", color)}>{value}</span>
                    <span className="mt-1 block text-sm text-gray-500">{label}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      )}

      {/* ── AUDIENCE: numbered columns, one accent each ── */}
      {audience.length > 0 && (
        <section id="audience" className={cn(band, "bg-slate-50")}>
          <div className={container}>
            <h2 className={cn(h2, "mb-12")}>Who this programme is for</h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {audience.map(({ title, description }, i) => {
                const accent = AUDIENCE_ACCENTS[i % AUDIENCE_ACCENTS.length];
                return (
                  <article key={title} className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
                    <div className={cn("h-1", accent.rule)} />
                    <div className="p-7">
                      <span className={cn("text-sm font-semibold tabular-nums", accent.num)}>{String(i + 1).padStart(2, "0")}</span>
                      <h3 className="mt-3 text-lg font-semibold leading-snug text-gray-900">{title}</h3>
                      <p className="mt-3 text-sm leading-relaxed text-gray-600">{description}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── OUTCOMES: statement on a green tint, checklist card beside it ── */}
      {hasOutcomes && (
        <section id="outcomes" className={cn(band, "bg-emerald-50")}>
          <div className={cn(container, "grid grid-cols-1 items-start gap-10", highlights.length > 0 && page?.outcomesText && "lg:grid-cols-2 lg:gap-16")}>
            <div>
              <p className={cn(kicker, "text-emerald-700")}>Outcomes</p>
              <h2 className={h2}>What you will be able to build</h2>
              {page?.outcomesText && (
                <div className="mt-6 space-y-5 text-base leading-relaxed text-gray-700 sm:text-lg">
                  {paragraphs(page.outcomesText).map((p) => <p key={p}>{p}</p>)}
                </div>
              )}
            </div>
            {highlights.length > 0 && (
              <ul className={cn("grid grid-cols-1 gap-y-4 rounded-2xl bg-white p-7 shadow-sm ring-1 ring-emerald-100", !page?.outcomesText && "gap-x-10 sm:grid-cols-2")}>
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm font-medium leading-relaxed text-gray-800">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
                      <Check className="h-3 w-3" />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* ── SYLLABUS: sticky heading beside colour-keyed modules ── */}
      {chapters.length > 0 && (
        <section id="syllabus" className={cn(band, "bg-white")}>
          <div className={cn(container, "grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12")}>
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <p className={cn(kicker, "text-blue-700")}>Curriculum</p>
                <h2 className={h2}>Course syllabus</h2>
                <p className="mt-4 text-center text-base text-gray-600 md:text-left">{[...curriculum, `${course.duration} hours`].join(", ")}</p>
              </div>
            </div>
            <div className="space-y-4 lg:col-span-8">
              {chapters.map((ch, i) => (
                <details key={ch.id} className="group overflow-hidden rounded-2xl border border-gray-200 bg-white open:shadow-md">
                  <summary className="flex cursor-pointer list-none items-start gap-3.5 p-4 sm:gap-5 sm:p-6 [&::-webkit-details-marker]:hidden">
                    <span className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-sm font-semibold tabular-nums text-white", MODULE_ACCENTS[i % MODULE_ACCENTS.length])}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-base font-semibold leading-snug text-gray-900 sm:text-lg">{ch.title}</h3>
                      {ch.contents.length > 0 && (
                        <p className="mt-1 text-sm text-gray-500">
                          {ch.contents.length} lesson{ch.contents.length !== 1 ? "s" : ""}
                        </p>
                      )}
                      {ch.description && <p className="mt-3 text-sm leading-relaxed text-gray-600">{ch.description}</p>}
                    </div>
                    {ch.contents.length > 0 && (
                      <ChevronDown className="mt-2.5 h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180" />
                    )}
                  </summary>
                  {ch.contents.length > 0 && (
                    <ol className="grid grid-cols-1 gap-x-8 gap-y-2.5 border-t border-gray-200 bg-gray-50 px-4 py-5 sm:grid-cols-2 sm:px-6">
                      {ch.contents.map((lesson, l) => (
                        <li key={lesson.id} className="flex gap-2.5 text-sm leading-relaxed text-gray-700">
                          <span className="w-5 shrink-0 text-gray-400 tabular-nums">{l + 1}.</span>
                          {lesson.title}
                        </li>
                      ))}
                    </ol>
                  )}
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CAREERS: role tiles with the reasoning alongside ── */}
      {hasCareers && (
        <section id="careers" className={cn(band, "bg-slate-50")}>
          <div className={container}>
            <p className={cn(kicker, "text-emerald-700")}>Careers</p>
            <h2 className={cn(h2, "mb-10")}>Where this takes your career</h2>
            <div className={cn("grid grid-cols-1 gap-10", careerRoles.length > 0 && page?.careersNote && "lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-16")}>
              {careerRoles.length > 0 && (
                <ul className="grid grid-cols-1 gap-3 self-start sm:grid-cols-2">
                  {careerRoles.map((role) => (
                    <li key={role} className="flex items-center justify-between gap-3 rounded-xl bg-white px-5 py-4 text-sm font-semibold text-gray-900 ring-1 ring-gray-200">
                      {role}
                      <ArrowUpRight className="h-4 w-4 shrink-0 text-emerald-600" />
                    </li>
                  ))}
                </ul>
              )}
              {page?.careersNote && (
                <div className="space-y-5 text-base leading-relaxed text-gray-600">
                  {paragraphs(page.careersNote).map((p) => <p key={p}>{p}</p>)}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── FEES: detail table beside a price card ── */}
      <section id="fees" className={cn(band, "bg-white")}>
        <div className={container}>
          <h2 className={cn(h2, "mb-10")}>Fees, duration and batch details</h2>
          <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1fr)_340px] lg:gap-12">
            <dl className="divide-y divide-gray-200 border-y border-gray-200">
              {batchDetails.map(({ label, value }) => (
                <div key={label} className="grid grid-cols-1 gap-1 py-4 sm:grid-cols-[140px_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-sm font-medium text-gray-500">{label}</dt>
                  <dd className="text-base text-gray-900">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="relative">
              <div aria-hidden className="absolute inset-0 translate-x-3 translate-y-3 rounded-2xl bg-amber-600" />
              <div className="relative rounded-2xl border border-amber-200 bg-amber-50 p-7">
                <p className={cn(kicker, "text-left text-amber-700")}>{hasDiscount ? "Current offer" : "Programme fee"}</p>
                {priceBlock}
                <div className="mt-6 flex flex-col gap-2.5">
                  {enrolAction}
                  <Link href="/contact" className={secondaryBtn}>Enquire about the next batch</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY MINDLYFT: numbered grid on the brand violet tint ── */}
      <section id="why" className={cn(band, "relative overflow-hidden bg-violet-50")}>
        <div aria-hidden className="absolute -right-24 -top-24 hidden h-72 w-72 rounded-full bg-violet-800 md:block" />
        <div aria-hidden className="absolute -bottom-10 -left-10 hidden h-28 w-28 rotate-12 rounded-3xl bg-fuchsia-800 md:block" />
        <div className={cn(container, "relative")}>
          <p className={cn(kicker, "text-violet-700")}>MindLyft AI</p>
          <h2 className={cn(h2, "mb-12")}>Why learn at MindLyft AI</h2>
          <ol className="grid grid-cols-1 gap-x-12 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map(({ title, desc }, i) => (
              <li key={title} className="border-t-2 border-violet-200 pt-5">
                <span className="text-sm font-semibold tabular-nums text-violet-600">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-base leading-relaxed text-gray-600">
                  <strong className="font-semibold text-gray-900">{title}</strong> {desc}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── INSTRUCTOR: profile card with a tinted photo panel ── */}
      {instructor && (
        <section id="instructor" className={cn(band, "bg-white")}>
          <div className={cn(container, "overflow-hidden rounded-2xl border border-gray-200 md:grid md:grid-cols-[300px_minmax(0,1fr)]")}>
            <div className="relative flex items-center justify-center overflow-hidden bg-blue-50 p-10">
              <div aria-hidden className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-blue-800" />
              <div className="relative h-44 w-44 overflow-hidden rounded-2xl bg-white shadow-lg ring-4 ring-white">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={`${instructor.name}, instructor for ${course.name}`}
                    fill
                    sizes="176px"
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center text-blue-200">
                    <User className="h-20 w-20" />
                  </div>
                )}
              </div>
            </div>
            <div className="p-6 text-center sm:p-10 md:text-left">
              <p className={cn(kicker, "text-blue-700")}>Your instructor</p>
              <h2 className="text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl">{instructor.name}</h2>
              {instructor.designation && <p className="mt-1.5 text-sm font-medium text-gray-500">{instructor.designation}</p>}
              {instructor.description && <p className="mt-5 text-base leading-relaxed text-gray-600">{instructor.description}</p>}
            </div>
          </div>
        </section>
      )}

      {/* ── FAQ: heading rail beside an expand list ── */}
      {faqs.length > 0 && (
        <section id="faq" className={cn(band, "bg-gray-50")}>
          <div className={cn(container, "grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12")}>
            <div className="lg:col-span-4">
              <h2 className={h2}>Frequently asked questions</h2>
              <p className="mt-4 text-center text-base text-gray-600 md:text-left">
                Something else?{" "}
                <Link href="/contact" className="font-semibold text-blue-700 hover:underline">Ask a counsellor</Link>.
              </p>
            </div>
            <div className="space-y-3 lg:col-span-8">
              {faqs.map(({ question, answer }) => (
                <details key={question} className="group rounded-xl bg-white ring-1 ring-gray-200">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-5 sm:px-6 [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold text-gray-900">{question}</h3>
                    <Plus className="h-5 w-5 shrink-0 text-blue-600 transition-transform duration-200 group-open:rotate-45" />
                  </summary>
                  <p className="px-5 pb-6 text-base leading-relaxed text-gray-600 sm:px-6 sm:pr-14">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CLOSING: one line, one action ── */}
      <section className="px-6 py-16 md:px-[60px]">
        <div className={cn(container, "relative flex flex-col items-center justify-between gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-800 to-indigo-900 p-8 text-center md:flex-row md:p-12 md:text-left")}>
          <div aria-hidden className="absolute -right-16 -top-20 h-56 w-56 rounded-full bg-blue-500/40" />
          <div aria-hidden className="absolute -bottom-24 right-40 h-48 w-48 rounded-full border-[28px] border-white/5" />
          <div className="relative">
            <h2 className="text-2xl font-semibold tracking-tight text-white">Enquire about the next batch</h2>
            <p className="mt-2 text-base text-blue-100">
              Talk to a counsellor about dates, fees and whether this programme fits where you are now.
            </p>
          </div>
          <div className="relative flex shrink-0 flex-wrap justify-center gap-3">
            {enrolAction}
            <Link href="/contact" className={secondaryBtn}>Talk to a counsellor</Link>
          </div>
        </div>
      </section>

    </div>
  );
}
