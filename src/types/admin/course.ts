export type CourseMode = "Online" | "Offline" | "Hybrid";
export type CourseType = "Mindlyftai" | "IIT";

export type InstructorDetail = {
  id:          string;
  name:        string;
  avatar:      string | null;
  designation: string | null;
  description: string | null;
};

export type CourseCardChip = { label: string; icon: string | null };

// Course-specific copy for the public course page (list endpoints omit it).
export type CoursePageContent = {
  outcomesText: string | null;
  audience:     { title: string; description: string }[] | null;
  cardChips:    CourseCardChip[] | null;
  careerRoles:  string[] | null;
  careersNote:  string | null;
  faqs:         { question: string; answer: string }[] | null;
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
  discountAmount:   number;
  discountPrice:    number;
  gstPer:           number;
  gstAmount:        number;
  finalPrice:       number;
  courseType:       CourseType;
  category:         string | null;
  displayOrder:     number;
  accessMonths:     number | null;
  createdAt:        string;
  updatedAt:        string;
  instructorDetail: InstructorDetail | null;
  metaTitle?:       string | null;
  metaDescription?: string | null;
  cardChips?:       CourseCardChip[] | null;
  pageContent?:     CoursePageContent | null;
};
