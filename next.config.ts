import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const STATIC_LANDING_PAGES = [
  "agentic-ai",
  "ai-security",
  "cloud-computing",
  "cybersecurity-advanced-60-hour-course",
  "cybersecurity-beginner-40-hour-course",
  "cybersecurity-complete-100-hours-course",
  "data-analytics",
  "deep-learning",
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
      { source: "/ethical-hacking", destination: "/cybersecurity-beginner-40-hour-course", permanent: true },
      { source: "/ethical-hacking/thank-you", destination: "/cybersecurity-beginner-40-hour-course/thank-you", permanent: true },
      { source: "/soc-analyst", destination: "/cybersecurity-advanced-60-hour-course", permanent: true },
      { source: "/soc-analyst/thank-you", destination: "/cybersecurity-advanced-60-hour-course/thank-you", permanent: true },
      { source: "/fullstack-cyber", destination: "/cybersecurity-complete-100-hours-course", permanent: true },
      { source: "/fullstack-cyber/thank-you", destination: "/cybersecurity-complete-100-hours-course/thank-you", permanent: true },
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