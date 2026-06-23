export type EmployeeRole   = "EMPLOYEE";
export type EmployeeStatus = "ACTIVE" | "INACTIVE" | "SUSPENDED";

export type Employee = {
  id:          string;
  employeeId:  number;
  name:        string;
  email:       string;
  phone?:      string;
  avatar?:     string;   // photo URL
  designation?: string;
  description?: string;
  video?:       string;   // video URL
  status:      EmployeeStatus;
  role:        EmployeeRole;
  category?:   string;
  department?: string;
  assignedCourses: number;
  totalStudents:   number;
  displayOrder:    number;
  joinedAt:    string;
  createdAt:   string;
  updatedAt:   string;
};

export type CreateEmployeeInput = {
  name:         string;
  email:        string;
  password:     string;
  phone?:       string;
  category?:    string;
  department?:  string;
  designation?: string;
  description?: string;
  avatar?:      string;
  video?:       string;
};

export type UpdateEmployeeInput = Partial<Omit<CreateEmployeeInput, "password">> & {
  status?:   EmployeeStatus;
  password?: string;
};
