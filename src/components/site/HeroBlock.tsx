import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Reusable full-viewport hero section. Always exactly 100vh, no scroll.
 *
 * ── Two layout modes ──────────────────────────────────────────────────────
 *
 * Mode 1 — imageUrl (full-page background image):
 *   Background = full-page image + dark overlay
 *   Left  → badge + title + subtitle + children
 *   Right → description
 *
 * Mode 2 — sideImage (visible image on one side):
 *   Background = colored gradient
 *   Left  → image
 *   Right → badge + title + subtitle + description + children
 *
 * Use reverse={true} in either mode to flip left/right.
 * Without either image prop → single centered column.
 *
 * ── bg variants ──────────────────────────────────────────────────────────
 *   "violet" | "dark" | "light" | "medium" | any Tailwind bg class
 */

type HeroBlockProps = {
  badge?:       string;
  title?:       React.ReactNode;
  subtitle?:    string;
  description?: string;
  align?:       "left" | "center";
  reverse?:     boolean;
  bg?:          "violet" | "dark" | "light" | "medium" | string;
  /** Mode 1 — full-page background image */
  imageUrl?:    string;
  /** Mode 2 — visible image shown as one column */
  sideImage?:   string;
  children?:    React.ReactNode;
  className?:   string;
};

const BG_PRESETS: Record<string, { cls: string; dark: boolean }> = {
  dark:   { cls: "bg-gradient-to-br from-violet-900 via-indigo-900 to-blue-900",  dark: true  },
  violet: { cls: "bg-gradient-to-br from-violet-500 via-blue-500 to-indigo-600", dark: true  },
  soft:   { cls: "bg-gradient-to-br from-violet-400 via-blue-400 to-indigo-500", dark: true  },
  medium: { cls: "bg-gradient-to-br from-violet-300 via-blue-200 to-indigo-300",  dark: false },
  light:  { cls: "bg-gradient-to-br from-violet-50 via-white to-blue-50",         dark: false },
};

export default function HeroBlock({
  badge,
  title,
  subtitle,
  description,
  align     = "left",
  reverse   = false,
  bg        = "light",
  imageUrl,
  sideImage,
  children,
  className,
}: HeroBlockProps) {
  const preset    = BG_PRESETS[bg];
  const bgClass   = preset?.cls ?? bg;
  const isDark    = imageUrl ? true : (preset?.dark ?? false);
  const isCenter  = align === "center";

  const mode = imageUrl ? "bg-image" : sideImage ? "side-image" : "single";

  /* ── Text block used in both modes ── */
  const textBlock = (full: boolean) => (
    <div className={cn(
      "flex flex-col justify-center space-y-5",
      isCenter && "items-center text-center",
      // Two-column modes stack below lg — centre the text there, left-align once side by side.
      !isCenter && mode !== "single" && "items-center text-center lg:items-start lg:text-left",
    )}>
      {badge && (
        <span className={cn(
          "inline-block w-fit text-sm font-bold uppercase tracking-widest px-4 py-1.5 rounded-full",
          isDark
            ? "text-white bg-white/15 backdrop-blur-sm border border-white/25"
            : "text-violet-700 bg-violet-100 border border-violet-200",
        )}>
          {badge}
        </span>
      )}

      {title && (
        <h1 className={cn(
          "font-black leading-[1.08] tracking-tight",
          mode === "single" ? "text-4xl md:text-5xl lg:text-6xl" : "text-3xl md:text-4xl lg:text-5xl",
          isDark ? "text-white" : "text-gray-900",
        )}>
          {title}
        </h1>
      )}

      <div className={cn(
        "w-14 h-1 rounded-full",
        isDark ? "bg-white/40" : "bg-gradient-to-r from-violet-500 to-blue-500",
      )} />

      {subtitle && (
        <p className={cn(
          "text-base md:text-lg leading-relaxed max-w-lg",
          isDark ? "text-white/75" : "text-gray-500",
        )}>
          {subtitle}
        </p>
      )}

      {/* In Mode 2 (side-image), description lives here with all other text */}
      {full && description && (
        <p className={cn(
          "text-sm md:text-base leading-relaxed max-w-lg",
          isDark ? "text-white/65" : "text-gray-400",
        )}>
          {description}
        </p>
      )}

      {children && (
        <div className={className}>
          {children}
        </div>
      )}
    </div>
  );

  /* ── Grid content per mode ── */
  let gridContent: React.ReactNode;

  if (mode === "bg-image") {
    /* Left: info  |  Right: description */
    const left  = textBlock(false);
    const right = description ? (
      <div className="flex flex-col justify-center">
        <p className="text-white/70 text-base md:text-lg leading-relaxed">
          {description}
        </p>
      </div>
    ) : null;

    gridContent = (
      <div className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
        reverse && "[&>*:first-child]:lg:order-2 [&>*:last-child]:lg:order-1",
      )}>
        {left}
        {right}
      </div>
    );

  } else if (mode === "side-image") {
    /* Left: image  |  Right: all text content */
    const imgCol = (
      <div className="flex items-center justify-center">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/10 w-full aspect-[4/3]">
          <Image
            src={sideImage!}
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
      </div>
    );
    const textCol = textBlock(true);

    gridContent = (
      <div className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center",
        reverse
          ? "[&>*:first-child]:lg:order-2 [&>*:last-child]:lg:order-1"
          : undefined,
      )}>
        {reverse ? textCol : imgCol}
        {reverse ? imgCol   : textCol}
      </div>
    );

  } else {
    /* Single centered column */
    gridContent = (
      <div className={cn(
        "flex flex-col space-y-5",
        isCenter ? "items-center text-center" : "items-start text-left",
      )}>
        {textBlock(true)}
      </div>
    );
  }

  return (
    <section className={cn(
      // Grows with its content on small screens; exactly one viewport tall from lg up.
      "relative min-h-screen lg:h-screen flex items-center justify-center overflow-hidden",
      !imageUrl && bgClass,
    )}>

      {/* Mode 1 — full-page background image */}
      {imageUrl && (
        <>
          <Image
            src={imageUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
        </>
      )}

      {/* Ambient glows (colored bg only) */}
      {!imageUrl && (
        <>
          <div className="absolute -top-24 -left-24 w-[500px] h-[500px] rounded-full bg-violet-400/20 blur-[120px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none" />
        </>
      )}

      {/* Dot grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${isDark ? "rgba(255,255,255,0.08)" : "rgba(139,92,246,0.12)"} 1.5px, transparent 1.5px)`,
          backgroundSize: "28px 28px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 pt-28 pb-12 lg:pt-20 lg:pb-10">
        {gridContent}
      </div>
    </section>
  );
}
