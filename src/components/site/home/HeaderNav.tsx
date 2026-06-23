"use client";

import { useState } from "react";
import Link from "next/link";
import type { FC } from "react";

interface Props {
  open:    boolean;
  onClose: () => void;
}

const HeaderNav: FC<Props> = ({ open, onClose }) => {
  const [openSub, setOpenSub] = useState<string | null>(null);

  const toggleSub = (key: string) =>
    setOpenSub((prev) => (prev === key ? null : key));

  return (
    <nav className={`menu${open ? " active" : ""}`}>

      {/* ── Mobile header ── */}
      <div className="menu-mobile-header">
        <button
          className="menu-mobile-arrow bg-transparent border-0"
          type="button"
          onClick={() => setOpenSub(null)}
          style={{ display: openSub ? "block" : "none" }}
        >
          <i className="ri-arrow-left-s-line" />
        </button>
        <div className="menu-mobile-title">
          {openSub ?? ""}
        </div>
        <button className="menu-mobile-close bg-transparent border-0" type="button" onClick={onClose}>
          <i className="ri-close-line" />
        </button>
      </div>

      <ul className="menu-section p-0 m-0 leading-none">

        {/* 1 ── HOME */}
        <li>
          <Link className="active" href="/" onClick={onClose}>
            Home
          </Link>
        </li>

        {/* 2 ── ACADEMY */}
        <li className="menu-item-has-children">
          <Link href="#" onClick={(e) => { e.preventDefault(); toggleSub("Academy"); }}>
            Academy
            <i className="ri-arrow-down-s-fill" />
          </Link>

          <ul className={`menu-subs menu-column-1${openSub === "Academy" ? " active" : ""}`}>
            <li className="menu-item-has-children">
              <Link href="/courses" onClick={onClose}>
                Courses
                <i className="ri-arrow-right-s-fill" />
              </Link>
              <ul className="menu-subs menu-column-1">
                <li><Link href="/courses/data-science-career-accelerator" onClick={onClose}>Data Science Career Accelerator</Link></li>
                <li><Link href="/courses/ai-foundations" onClick={onClose}>AI Foundations: From Data to Decisions</Link></li>
                <li><Link href="/courses/business-intelligence" onClick={onClose}>Business Intelligence &amp; Data Analysis</Link></li>
                <li><Link href="/courses/full-stack-ai" onClick={onClose}>Full-Stack AI</Link></li>
                <li><Link href="/courses/ai-for-professionals" onClick={onClose}>AI for Professionals</Link></li>
              </ul>
            </li>
          </ul>
        </li>

        {/* 4 ── ABOUT */}
        <li>
          <Link href="/about" onClick={onClose}>About</Link>
        </li>

        {/* 5 ── BLOGS */}
        <li>
          <Link href="/blogs" onClick={onClose}>Blogs</Link>
        </li>

        {/* 6 ── CONTACT */}
        <li>
          <Link href="/contact" onClick={onClose}>Contact</Link>
        </li>

        {/* 7 ── LOGIN (mobile only) */}
        <li className="lg:hidden">
          <Link href="/login" prefetch={false} onClick={onClose}>Login</Link>
        </li>

      </ul>
    </nav>
  );
};

export default HeaderNav;
