export const ROUTES = {
  // ── Public site ──────────────────────────────────────────
  home:        "/",
  about:       "/about",
  contact:     "/contact",
  ourJourney:  "/our-journey",
  resources:   "/resources",
  terms:       "/terms",

  // ── Academy ──────────────────────────────────────────────
  courses:         "/courses",
  coursesIIT:      "/courses/iit",
  coursesMindlyft: "/courses/mindlyftai",
  iit:             "/iit",               // legacy — keep for backward compat

  courseIIT:      (slug: string) => `/courses/iit/${slug}`,
  courseMindlyft: (slug: string) => `/courses/mindlyftai/${slug}`,

  courseCategory: (slug: string) => `/course-categories/${slug}`,

  // ── Blog ─────────────────────────────────────────────────
  blogs:      "/blogs",
  blog:       (slug: string) => `/blog/${slug}`,

  // ── Webinars / Workshops ─────────────────────────────────
  webinar:    "/webinar",
  webinars:   "/webinars",
  workshop:   (slug: string) => `/workshops/${slug}`,

  // ── Checkout ─────────────────────────────────────────────
  checkout:         (id: string | number) => `/checkout/${id}`,
  checkoutWorkshop: (id: string | number) => `/checkout/workshop/${id}`,
  checkoutSuccess:  "/checkout/success",

  // ── Auth ─────────────────────────────────────────────────
  login:    "/login",
  register: "/register",

  // ── Dashboards ───────────────────────────────────────────
  adminDashboard:   "/admin/dashboard",
  studentDashboard: "/student/courses",
  employeeDashboard:"/employee/support",
} as const;
