export type Partner = {
  id:           number;
  name:         string;
  sector:       string;
  overview:     string;
  image?:       string | null;
  websiteUrl:   string;
  displayorder: number;
  status:       "Active" | "Inactive" | "Pending" | "Suspended" | "Deleted";
};
