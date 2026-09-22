import Image from "next/image";
import Link from "next/link";
import FooterWatermark from "./FooterWatermark";
import { MapPin, Mail, Phone } from "lucide-react";
import { FacebookIcon, XIcon, InstagramIcon, LinkedinIcon } from "./SocialIcons";
import {SITE_CONFIG} from "@/constants/siteConfig"

const QUICK_LINKS = [
  { label: "About",      href: "/about" },
  { label: "Courses",    href: "/courses" },
  { label: "Blog",       href: "/blogs" },
  { label: "New Letter", href: "#" },
  { label: "Contact",    href: "/contact" },
  { label: "Login",      href: "/login" },
];

const SOCIAL = [
  { icon: FacebookIcon,  href: SITE_CONFIG.social.facebook,  label: "Facebook" },
  { icon: XIcon,         href: SITE_CONFIG.social.x,         label: "Twitter" },
  { icon: InstagramIcon, href: SITE_CONFIG.social.instagram, label: "Instagram" },
  { icon: LinkedinIcon,  href: SITE_CONFIG.social.linkedin,  label: "LinkedIn" },
];

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-[radial-gradient(ellipse_at_center,_white_30%,_#ddd6fe_100%)]">

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src={SITE_CONFIG.logo1}
                alt="MindlyftAI"
                width={48}
                height={48}
                style={{ width: 48, height: 48 }}
              />
              <span className="text-2xl font-bold tracking-tight text-black">{SITE_CONFIG.name}</span>
            </Link>
            <p className="text-base text-gray-500 leading-relaxed">
              Empowering careers through AI-powered education and cutting-edge technology solutions.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-6">
              {SOCIAL.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-violet-100 text-violet-500 hover:bg-violet-600 hover:text-white transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-base text-gray-600 hover:text-violet-600 transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3 text-gray-500">
                <MapPin size={15} className="shrink-0 mt-0.5 text-violet-400" />
                <span className="text-base leading-relaxed">
                    2nd Floor, ABC Tiara, opposite Akurdi Railway Station Road,
                    Pradhikaran, Nigdi, Pimpri-Chinchwad, Maharashtra 411035
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={15} className="shrink-0 text-violet-400" />
                <a
                  href="mailto:info@mindlyftai.com"
                  className="text-base text-gray-600 hover:text-violet-600 transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={15} className="shrink-0 text-violet-400" />
                <a
                  href={`tel:${SITE_CONFIG.whatsapp}`}
                  className="text-base text-gray-600 hover:text-violet-600 transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Terms & Conditions */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-violet-600 mb-5">
              Terms &amp; Conditions
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-base text-gray-600 hover:text-violet-600 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-base text-gray-600 hover:text-violet-600 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms#refunds" className="text-base text-gray-600 hover:text-violet-600 transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms#ip" className="text-base text-gray-600 hover:text-violet-600 transition-colors">
                  Intellectual Property
                </Link>
              </li>
              <li>
                <Link href="/terms#contact" className="text-base text-gray-600 hover:text-violet-600 transition-colors">
                  Legal Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="border-t border-violet-200" />
      </div>

      {/* ── Bottom bar ── */}
      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>

      {/* ── Watermark ── */}
      <FooterWatermark />

    </footer>
  );
}
