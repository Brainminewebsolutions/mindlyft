export type Student = {
  id:             string;
  firstName:      string;
  lastName:       string;
  name:           string;
  email:          string;
  phone:          string | null;
  courseInterest: string | null;
  status:         "ACTIVE" | "INACTIVE" | "SUSPENDED";
  createdAt:      string;
  updatedAt:      string;
};

export type UpdateStudentInput = {
  phone?:          string;
  courseInterest?: string;
  status?:         "ACTIVE" | "INACTIVE" | "SUSPENDED";
};

export type UpdateStudentProfileInput = {
  firstName?:      string;
  lastName?:       string;
  phone?:          string;
  courseInterest?: string;
};
