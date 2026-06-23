export type CourseContent = {
  id:          string;
  chapterId:   string;
  title:       string;
  videoUrl:    string | null;
  description: string | null;
  order:       number;
  createdAt:   string;
  updatedAt:   string;
};

export type CreateCourseContentInput = {
  title:       string;
  videoUrl?:   string;
  description?: string;
  order?:      number;
};

export type UpdateCourseContentInput = {
  title?:       string;
  videoUrl?:    string;
  description?: string;
  order?:       number;
};
