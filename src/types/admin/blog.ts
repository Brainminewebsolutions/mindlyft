export type BlogStatus = "Pending" | "Active" | "Inactive";

export type BlogTagDto = {
  id:        string;
  name:      string;
  slug:      string;
  createdAt: string;
};

export type BlogContentDto = {
  id:            string;
  blogChapterId: string;
  title:         string;
  content:       string | null;
  imageUrl:      string | null;
  order:         number;
};

export type BlogChapterDto = {
  id:          string;
  blogId:      string;
  title:       string;
  description: string | null;
  order:       number;
  contents:    BlogContentDto[];
};

export type BlogDto = {
  id:              string;
  title:           string;
  slug:            string;
  excerpt:         string | null;
  coverImageUrl:   string | null;
  employeeId:      string | null;
  authorName:      string | null;
  blogCategoryId:  string;
  categoryName:    string;
  status:          BlogStatus;
  publishedAt:     string | null;
  readTimeMinutes: number;
  viewCount:       number;
  tags:            BlogTagDto[];
  chapters:        BlogChapterDto[];
  createdAt:       string;
  updatedAt:       string;
};

export type BlogCategoryDto = {
  id:           string;
  name:         string;
  slug:         string;
  description:  string | null;
  coverImageUrl: string | null;
  status:       string;
  createdAt:    string;
};

export type BlogListResponse = {
  blogs:      BlogDto[];
  pagination: { total: number; page: number; limit: number; totalPages: number };
};
