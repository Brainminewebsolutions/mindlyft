import Image from "next/image";
import Link from "next/link";
import FooterWatermark from "./FooterWatermark";
import { MapPin, Mail, Phone } from "lucide-react";
import {SITE_CONFIG} from "@/constants/siteConfig"
import { color } from "framer-motion";

const QUICK_LINKS = [
  { label: "About",   href: "/about" },
  { label: "Courses", href: "/courses" },
  { label: "Blog",    href: "/blogs" },
  { label: "Contact", href: "/contact" },
  { label: "Login",   href: "/login" },
];

const SOCIAL = [
  { icon: "ri-facebook-fill",  href: SITE_CONFIG.social.facebook,  label: "Facebook" },
  { icon: "ri-twitter-x-line", href: SITE_CONFIG.social.x,             label: "Twitter" },
  { icon: "ri-instagram-line", href: SITE_CONFIG.social.instagram, label: "Instagram" },
  { icon: "ri-linkedin-fill",  href: SITE_CONFIG.social.linkedin,  label: "LinkedIn" },
];

export default function SiteFooter() {
  return (
    <footer className="text-white" style={{ background: "#808080" }}>

      {/* ── Main content ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4">
              <Image
                src={SITE_CONFIG.logo}
                alt="MindlyftAI"
                width={48}
                height={48}
                style={{ width: 48, height: 48 }}
              />
              <span className="text-2xl font-bold tracking-tight">{SITE_CONFIG.name}</span>
            </Link>
            <p className="text-base text-white/80 leading-relaxed">
              Empowering careers through AI-powered education and cutting-edge technology solutions.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-2 mt-6">
              {SOCIAL.map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/[0.07] text-white/50 hover:bg-indigo-600 hover:text-white transition-colors text-base"
                >
                  <i className={icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-base font-semibold uppercase tracking-widest text-white/60 mb-5"  style={{ color: "#ffffff" }}>
              Quick Links
            </h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <Link
                    href={href}
                    className="text-base text-white/85 hover:text-white transition-colors"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-base font-semibold uppercase tracking-widest text-white/60 mb-5"  style={{ color: "#ffffff" }}>
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <MapPin size={15} className="shrink-0 mt-0.5" />
                <span className="text-base text-white/85 leading-relaxed">
                    2nd Floor, ABC Tiara, Opposite Akurdi Railway Station,
                    Nigadi Pradhikaran, Pimpri-Chinchwad, Pune.
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <Mail size={15} className="shrink-0" />
                <a
                  href="mailto:info@mindlyftai.com"
                  className="text-base text-white/85 hover:text-white transition-colors"
                >
                  {SITE_CONFIG.email}
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Phone size={15} className="shrink-0" />
                <a
                  href={`tel:${SITE_CONFIG.whatsapp}`}
                  className="text-base text-white/85 hover:text-white transition-colors"
                >
                  {SITE_CONFIG.phone}
                </a>
              </li>
            </ul>
          </div>

          {/* Terms & Conditions */}
          <div>
            <h4 className="text-base font-semibold uppercase tracking-widest text-white/60 mb-5" style={{ color: "#ffffff" }}>
              Terms &amp; Conditions
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/terms" className="text-base text-white/85 hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-base text-white/85 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms#refunds" className="text-base text-white/85 hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/terms#ip" className="text-base text-white/85 hover:text-white transition-colors">
                  Intellectual Property
                </Link>
              </li>
              <li>
                <Link href="/terms#contact" className="text-base text-white/85 hover:text-white transition-colors">
                  Legal Contact
                </Link>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Divider ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        <div className="border-t border-white/[0.08]" />
      </div>

      {/* ── Bottom bar ── */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
          </p>
          
        </div>
      </div>


      {/* ── Watermark ── */}
      <FooterWatermark />

    </footer>
  );
}
