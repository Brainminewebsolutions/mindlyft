export type CourseCategory = {
  id:          number;
  name:        string;
  slug:        string;
  image:       string | null;
  description: string | null;
  status:      "Active" | "Inactive";
  createdAt:   string;
};
