export type CourseContentItem = {
  id:          string;
  chapterId:   string;
  title:       string;
  videoUrl:    string | null;
  description: string | null;
  order:       number;
};

export type CourseChapterItem = {
  id:          string;
  courseId:    string;
  title:       string;
  description: string | null;
  order:       number;
  contents:    CourseContentItem[];
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
