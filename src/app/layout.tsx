import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster }           from "sonner";
import { ThemeProvider }  from "@/components/providers/ThemeProvider";
import SessionProvider     from "@/components/providers/SessionProvider";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mindlyft AI",
  description: "AI Startup & Technology Platform",
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning   /* next-themes injects class server-side */
    >
      <head></head>

      <body className="min-h-full flex flex-col">
        {/*
          ThemeProvider — default light, persists user choice via localStorage.
          attribute="class" adds/removes the "dark" class on <html>.
        */}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SessionProvider>
            {/* SmoothScrollProvider wires the npm Lenis instance to window.gsap
                and fires the `gsap:ready` event that animation components wait for. */}
            <SmoothScrollProvider>
              {children}
            </SmoothScrollProvider>
          </SessionProvider>
        </ThemeProvider>

        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
