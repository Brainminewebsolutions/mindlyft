import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import Syllabus from "@/components/site/courses/Syllabus";
import Skills from "@/components/site/courses/Skills";
import IITCourseHero from "@/components/site/courses/iit/IITCourseHero";
import IITEnrolCard from "@/components/site/courses/iit/IITEnrolCard";
import IITCourseInfo from "@/components/site/courses/iit/IITCourseInfo";
import InstructorProfile from "@/components/site/Instructor/InstructorProfile";
import CareerOpportunities from "@/components/site/courses/CareerOpportunities";
import Reviews from "@/components/site/courses/Reviews";
import type { Course } from "@/types/admin/course";
import type { CourseChapterItem } from "@/types/student/course";

interface Props {
  course:       Course;
  chapters:     CourseChapterItem[];
  proxiedImage: string | null;
}

const COLOR    = "#7c3aed";
const BG_COLOR = "#f5f3ff";

const section = (bg: string) =>
  `w-full py-14 border-b border-violet-50` + (bg === "violet" ? " bg-[#f5f3ff]" : " bg-white");

const inner = "mx-auto max-w-[1100px] px-6";

const h2cls = "text-2xl md:text-4xl font-black mb-5 pb-3 border-b tracking-tight";

export default function IITCourseDetail({ course, chapters, proxiedImage }: Props) {
  const totalLessons = chapters.reduce((sum, ch) => sum + ch.contents.length, 0);
  const highlights   = course.highlights ?? [];
  const instructor   = course.instructorDetail;

  return (
    <div className="min-h-screen text-gray-900 [font-family:var(--primaryFont,sans-serif)]">

      {/* ── HERO ── */}
      <IITCourseHero name={course.name} category={course.category} proxiedImage={proxiedImage} />

      {/* ── INFO ── bg: white (IITCourseInfo handles its own bg) */}
      <IITCourseInfo
        instructor={course.instructor}
        mode={course.mode}
        duration={course.duration}
        language={course.language}
        chapterCount={chapters.length}
        lessonCount={totalLessons}
      />

      {/* ── SKILLS ── violet */}
      {highlights.length > 0 && (
        <div className={section("violet")}>
          <div className={inner}>
            <Skills highlights={highlights} color={COLOR} bgColor="#ffffff" />
          </div>
        </div>
      )}

      {/* ── ABOUT ── white */}
      {course.description && (
        <div className={section("white")}>
          <div className={inner}>
            <h2 className={h2cls} style={{ borderColor: `${COLOR}30`, color: COLOR }}>About This Course</h2>
            <p className="text-sm text-gray-600 leading-[1.9]">{course.description}</p>
          </div>
        </div>
      )}

      {/* ── ENROL ── violet */}
      <div className={section("violet")}>
        <div className={inner}>
          <IITEnrolCard courseId={course.id} price={course.price} discount={course.discount} discountPrice={course.discountPrice} status={course.status} />
        </div>
      </div>

      {/* ── SYLLABUS ── white */}
      {chapters.length > 0 && (
        <div className={section("white")}>
          <div className={inner}>
            <Syllabus chapters={chapters} totalLessons={totalLessons} color={COLOR} bgColor={BG_COLOR} />
          </div>
        </div>
      )}

      {/* ── INSTRUCTOR ── violet */}
      {instructor && (
        <div className={section("violet")}>
          <div className={inner}>
            <h2 className={h2cls} style={{ borderColor: `${COLOR}30`, color: COLOR }}>Meet Your Instructor</h2>
            <InstructorProfile
              instructor={{
                name:        instructor.name,
                avatar:      instructor.avatar,
                designation: instructor.designation,
                description: instructor.description,
              }}
              color={COLOR}
              bgColor="#ffffff"
            />
          </div>
        </div>
      )}

      {/* ── CAREER OPPORTUNITIES ── white */}
      <div className={section("white")}>
        <CareerOpportunities color={COLOR} bgColor="#ffffff" />
      </div>

      {/* ── TESTIMONIALS ── violet */}
      <div className={section("violet")}>
        <Reviews />
      </div>

      {/* ── BACK ── white */}
      <div className={section("white")}>
        <div className={inner}>
          <Link
            href="/courses"
            className="inline-flex items-center gap-1.5 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Courses
          </Link>
        </div>
      </div>

    </div>
  );
}
