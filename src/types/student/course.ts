/* ── Public syllabus (course detail pages) — no video URLs ── */
export type CourseContentItem = {
  id:          string;
  chapterId:   string;
  title:       string;
  description: string | null;
  order:       number;
  hasVideo:    boolean;
};

export type CourseChapterItem = {
  id:          string;
  courseId:    string;
  title:       string;
  description: string | null;
  order:       number;
  contents:    CourseContentItem[];
};

/* ── Student course player (sequential unlock) ── */
export type PlayerContentItem = {
  id:             string;
  chapterId:      string;
  title:          string;
  description:    string | null;
  order:          number;
  /** null while the lesson is locked */
  videoUrl:       string | null;
  hasVideo:       boolean;
  isCompleted:    boolean;
  isLocked:       boolean;
  watchedPercent: number;
};

export type PlayerChapterItem = {
  id:          string;
  courseId:    string;
  title:       string;
  description: string | null;
  order:       number;
  contents:    PlayerContentItem[];
};

export type LessonProgressResult = {
  contentId:      string;
  watchedPercent: number;
  isCompleted:    boolean;
  nextLesson:     PlayerContentItem | null;
  courseCompleted: boolean;
};

export type CertificateInfo = {
  certificateNumber: string;
  studentName:       string;
  courseName:        string;
  courseType:        "IIT" | "Mindlyftai";
  completedOn:       string;   // ISO-8601 (+05:30)
  verifyUrl:         string;
};

export type PurchasedCourse = {
  orderId:     string;
  courseId:    number;
  courseName:  string;
  courseImage: string | null;
  mode:        string;
  duration:    number;
  instructor:  string;
  language:    string;
  amount:      number;
  purchasedAt: string;
};
