import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const STATIC_LANDING_PAGES = [
  "agentic-ai",
  "ai-security",
  "cloud-computing",
  "data-analytics",
  "deep-learning",
  "ethical-hacking",
  "fullstack-cyber",
  "soc-analyst",
] as const;

const nextConfig: NextConfig = {
  allowedDevOrigins: ['192.168.31.218'],
  poweredByHeader: false,
  output: "standalone",
  outputFileTracingRoot: process.cwd(),
  images: {
    unoptimized: !isProd,
    remotePatterns: [
      { protocol: "https", hostname: "localhost", port: "7039", pathname: "/uploads/**" },
       { protocol: "https", hostname: "apimindlyftai.mindlyftai.com", pathname: "/uploads/**" },
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
    formats: ["image/avif", "image/webp"],
  },

  compiler: {
    removeConsole: isProd ? { exclude: ["error", "warn"] } : false,
  },

  async redirects() {
    return [
      { source: "/iit", destination: "/iit-kanpur-cyber-security-course", permanent: true },
      { source: "/workshops", destination: "/ai-workshops", permanent: true },
      { source: "/workshops/:slug", destination: "/ai-workshops/:slug", permanent: true },
    ];
  },

  async rewrites() {
    return STATIC_LANDING_PAGES.flatMap((slug) => [
      { source: `/${slug}`, destination: `/${slug}/index.html` },
      { source: `/${slug}.html`, destination: `/${slug}/index.html` },
      { source: `/${slug}/thank-you`, destination: `/${slug}/thank-you.html` },
    ]);
  },

  async headers() {
    if (!isProd) return [];

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options",    value: "nosniff" },
          { key: "X-Frame-Options",           value: "DENY" },
          { key: "X-XSS-Protection",          value: "0" },          // disabled intentionally
          { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
          { key: "Referrer-Policy",           value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy",        value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
          { key: "Content-Security-Policy-Report-Only", value: "default-src 'self'" },
        ],
      },
    ];
  },
};

export default nextConfig;