import type { MetadataRoute } from "next";

const BASE = "https://www.mindlyftai.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/employee", "/student", "/api"],
      },
    ],
    sitemap: `${BASE}/sitemap.xml`,
  };
}
