export type Tool = {
  id:           string;
  image:        string | null;
  title:        string;
  description:  string;
  link:         string;
  displayOrder: number;
  status:       "ACTIVE" | "INACTIVE";
  createdAt:    string;
  updatedAt:    string;
};
