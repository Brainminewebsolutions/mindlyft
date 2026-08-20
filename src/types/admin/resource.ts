export type Resource = {
  id:           number;
  name:         string;
  description?: string | null;
  image?:       string | null;
  type:         "File" | "Link";
  displayOrder: number;
  status:       "Active" | "Inactive" | "Pending" | "Suspended" | "Deleted" | "Upcoming";
  createdAt:    string;
  url?:         string | null;
};
