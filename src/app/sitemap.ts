import type { MetadataRoute } from "next";

const BASE = "https://www.mindlyftai.com";

const STATIC_ROUTES: { url: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
  { url: "/",           priority: 1.0,  changeFrequency: "weekly"  },
  { url: "/courses",    priority: 0.9,  changeFrequency: "daily"   },
  { url: "/iit-kanpur-cyber-security-course", priority: 0.9,  changeFrequency: "weekly"  },
  { url: "/ai-workshops",  priority: 0.8,  changeFrequency: "weekly"  },
  { url: "/webinar",    priority: 0.8,  changeFrequency: "weekly"  },
  { url: "/blogs",      priority: 0.7,  changeFrequency: "daily"   },
  { url: "/about",      priority: 0.6,  changeFrequency: "monthly" },
  { url: "/contact",    priority: 0.6,  changeFrequency: "monthly" },
  { url: "/resources",  priority: 0.5,  changeFrequency: "monthly" },
  { url: "/login",      priority: 0.3,  changeFrequency: "yearly"  },
  { url: "/terms",      priority: 0.2,  changeFrequency: "yearly"  },
  { url: "/privacy",    priority: 0.2,  changeFrequency: "yearly"  },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return STATIC_ROUTES.map(({ url, priority, changeFrequency }) => ({
    url: `${BASE}${url}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
