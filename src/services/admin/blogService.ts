import apiAxios from "@/lib/api/api-axios";
import type {
  BlogDto,
  BlogCategoryDto,
  BlogTagDto,
  BlogChapterDto,
  BlogContentDto,
  BlogListResponse,
} from "@/types/admin/blog";

export type BlogListParams = {
  search?:     string;
  status?:     string;
  categoryId?: string;
  page?:       number;
  limit?:      number;
};

export const blogService = {
  list: (params?: BlogListParams) =>
    apiAxios.get<BlogListResponse>("/v1/blogs", { params }).then((r) => r.data),

  getById: (id: string) =>
    apiAxios.get<BlogDto>(`/v1/blogs/${id}`).then((r) => r.data),

  create: async (formData: FormData): Promise<BlogDto> => {
  const response = await apiAxios.post<BlogDto>("/v1/blogs", formData);
  return response.data;
},

  update: (id: string, formData: FormData) =>
    apiAxios.patch<BlogDto>(`/v1/blogs/${id}`, formData).then((r) => r.data),

  delete: (id: string) =>
    apiAxios.delete(`/v1/blogs/${id}`).then((r) => r.data),

  publish: (id: string) =>
    apiAxios.post(`/v1/blogs/${id}/publish`).then((r) => r.data),
};

export const blogCategoryService = {
  list: (status?: string) =>
    apiAxios
      .get<BlogCategoryDto[]>("/v1/blog-categories", {
        params: status ? { status } : undefined,
      })
      .then((r) => r.data),

  getById: (id: string) =>
    apiAxios.get<BlogCategoryDto>(`/v1/blog-categories/${id}`).then((r) => r.data),

  create: (formData: FormData) =>
    apiAxios.post<BlogCategoryDto>("/v1/blog-categories", formData).then((r) => r.data),

  update: (id: string, formData: FormData) =>
    apiAxios.patch<BlogCategoryDto>(`/v1/blog-categories/${id}`, formData).then((r) => r.data),

  delete: (id: string) =>
    apiAxios.delete(`/v1/blog-categories/${id}`).then((r) => r.data),
};

export const blogTagService = {
  list: () =>
    apiAxios.get<BlogTagDto[]>("/v1/blog-tags").then((r) => r.data),

  create: (data: { name: string; slug: string }) =>
    apiAxios.post<BlogTagDto>("/v1/blog-tags", data).then((r) => r.data),

  delete: (id: string) =>
    apiAxios.delete(`/v1/blog-tags/${id}`).then((r) => r.data),
};

export const blogChapterService = {
  listByBlog: (blogId: string) =>
    apiAxios
      .get<BlogChapterDto[]>("/v1/blog-chapters", { params: { blogId } })
      .then((r) => r.data),

  create: (data: { blogId: number; title: string; description?: string; order?: number }) =>
    apiAxios.post<BlogChapterDto>("/v1/blog-chapters", data).then((r) => r.data),

  update: (id: string, data: { title?: string; description?: string; order?: number }) =>
    apiAxios.patch<BlogChapterDto>(`/v1/blog-chapters/${id}`, data).then((r) => r.data),

  delete: (id: string) =>
    apiAxios.delete(`/v1/blog-chapters/${id}`).then((r) => r.data),
};

export const blogContentService = {
  listByChapter: (chapterId: string) =>
    apiAxios
      .get<BlogContentDto[]>("/v1/blog-contents", { params: { chapterId } })
      .then((r) => r.data),

  create: (formData: FormData) =>
    apiAxios.post<BlogContentDto>("/v1/blog-contents", formData).then((r) => r.data),

  update: (id: string, formData: FormData) =>
    apiAxios.patch<BlogContentDto>(`/v1/blog-contents/${id}`, formData).then((r) => r.data),

  delete: (id: string) =>
    apiAxios.delete(`/v1/blog-contents/${id}`).then((r) => r.data),
};
