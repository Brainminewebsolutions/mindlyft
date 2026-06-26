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
          <Link className="active" href="/" onClick={onClose}>Home</Link>
        </li>

        {/* 2 ── ACADEMY */}
        <li className="menu-item-has-children">
          <Link href="#" onClick={(e) => { e.preventDefault(); toggleSub("Academy"); }}>
            Academy
            <i className="ri-arrow-down-s-fill" />
          </Link>
          <ul className={`menu-subs menu-column-1${openSub === "Academy" ? " active" : ""}`}>
            <li><Link href="/courses/mindlyftai" onClick={onClose}>Courses</Link></li>
            <li><Link href="/courses/iit" onClick={onClose}>AI & Cyber Security</Link></li>
            <li><Link href="/webinar" onClick={onClose}>Webinars</Link></li>
          </ul>
        </li>

        {/* 3 ── RESOURCE */}
        <li className="menu-item-has-children">
          <Link href="#" onClick={(e) => { e.preventDefault(); toggleSub("Resource"); }}>
            Resource
            <i className="ri-arrow-down-s-fill" />
          </Link>
          <ul className={`menu-subs menu-column-1${openSub === "Resource" ? " active" : ""}`}>
            <li><Link href="/blogs" onClick={onClose}>Blogs</Link></li>
            <li><Link href="/webinar" onClick={onClose}>Webinars</Link></li>
          </ul>
        </li>

        {/* 4 ── BLOG */}
        <li>
          <Link href="/blogs" onClick={onClose}>Blog</Link>
        </li>

        {/* 5 ── OUR JOURNEY */}
        <li>
          <Link href="/about" onClick={onClose}>Our Journey</Link>
        </li>

        {/* 6 ── ABOUT */}
        <li>
          <Link href="/about" onClick={onClose}>About</Link>
        </li>

        {/* 7 ── CONTACT */}
        <li>
          <Link href="/contact" onClick={onClose}>Contact</Link>
        </li>

        {/* LOGIN (mobile only) */}
        <li className="lg:hidden">
          <Link href="/login" prefetch={false} onClick={onClose}>Login</Link>
        </li>

      </ul>
    </nav>
  );
};

export default HeaderNav;
