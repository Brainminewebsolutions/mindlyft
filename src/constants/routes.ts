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

  courseIIT:      (id: string | number) => `/courses/iit/${id}`,
  courseMindlyft: (id: string | number) => `/courses/mindlyftai/${id}`,

  courseCategory: (id: string | number) => `/course-categories/${id}`,

  // ── Blog ─────────────────────────────────────────────────
  blogs:      "/blogs",
  blog:       (slug: string) => `/blog/${slug}`,

  // ── Webinars / Workshops ─────────────────────────────────
  webinar:    "/webinar",
  webinars:   "/webinars",
  workshop:   (id: string | number) => `/workshops/${id}`,

  // ── Checkout ─────────────────────────────────────────────
  checkout:         (id: string | number) => `/checkout/${id}`,
  checkoutWorkshop: (id: string | number) => `/checkout/workshop/${id}`,
  checkoutSuccess:  "/checkout/success",

  // ── Auth ─────────────────────────────────────────────────
  login:    "/login",
  register: "/register",

  // ── Dashboards ───────────────────────────────────────────
  adminDashboard:   "/admin/dashboard",
  studentDashboard: "/student/dashboard",
  employeeDashboard:"/employee/dashboard",
} as const;
