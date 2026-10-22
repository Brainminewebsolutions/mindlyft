import type { Metadata } from "next";
import { Toaster }           from "sonner";
import SessionProvider     from "@/components/providers/SessionProvider";

import "./globals.css";

const SITE_URL = "https://www.mindlyftai.com";
const SITE_NAME = "MindLyft AI";
const SITE_DESCRIPTION =
  "MindLyft AI bridges academia and industry with future-ready learning services, AI consulting, and scalable digital products.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Learning Services, AI Solutions & Innovative Products`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "MindLyft AI",
    "AI training",
    "industry-ready courses",
    "AI consulting",
    "IIT expertise",
    "upskilling",
    "workshops",
    "ed-tech",
  ],
  icons: { icon: "/favicon.ico" },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Learning Services, AI Solutions & Innovative Products`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/MINDLYF_LOGO_new.png",
        width: 718,
        height: 469,
        alt: SITE_NAME,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — Learning Services, AI Solutions & Innovative Products`,
    description: SITE_DESCRIPTION,
    images: ["/MINDLYF_LOGO_new.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className="h-full antialiased"
      data-scroll-behavior="smooth"
    >
      <head></head>

      <body className="min-h-full flex flex-col">
        <SessionProvider>
          {children}
        </SessionProvider>

        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
