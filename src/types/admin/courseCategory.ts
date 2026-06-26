export type CourseCategory = {
  id:          number;
  name:        string;
  image:       string | null;
  description: string | null;
  status:      "Active" | "Inactive";
  createdAt:   string;
};
