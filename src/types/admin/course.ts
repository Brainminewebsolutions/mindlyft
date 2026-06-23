export type CourseMode = "Online" | "Offline";
export type CourseType = "Mindlyftai" | "IIT";

export type Course = {
  id:          string;
  name:        string;
  duration:    number;          // hours
  mode:        CourseMode;
  image:       string | null;
  description: string | null;
  price:       number;
  instructor:  string;
  language:    string;
  highlights:  string[] | null;
  status:      "ACTIVE" | "INACTIVE" | "SUSPENDED";
  discount:    number | null;
  courseType:  CourseType;
  category:     string | null;
  displayOrder: number;
  createdAt:    string;          // ISO date string
  updatedAt:   string;          // ISO date string
};
