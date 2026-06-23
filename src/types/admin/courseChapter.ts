export type CourseChapter = {
  id:          string;
  courseId:    string;
  title:       string;
  description: string | null;
  order:       number;
  createdAt:   string;
  updatedAt:   string;
};
