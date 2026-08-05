export type CourseMode = "Online" | "Offline" | "Hybrid";
export type CourseType = "Mindlyftai" | "IIT";

export type InstructorDetail = {
  id:          string;
  name:        string;
  avatar:      string | null;
  designation: string | null;
  description: string | null;
};

export type Course = {
  id:               string;
  name:             string;
  slug:             string;
  duration:         number;
  mode:             CourseMode;
  image:            string | null;
  description:      string | null;
  price:            number;
  instructor:       string | null;
  instructorId:     number | null;
  language:         string;
  highlights:       string[] | null;
  status:           "ACTIVE" | "INACTIVE" | "SUSPENDED" | "UPCOMING";
  discount:         number | null;
  courseType:       CourseType;
  category:         string | null;
  displayOrder:     number;
  accessMonths:     number | null;
  createdAt:        string;
  updatedAt:        string;
  instructorDetail: InstructorDetail | null;
};
