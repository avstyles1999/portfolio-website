import Link from "next/link";
import { CONTAINER } from "./Section";

const SECTIONS = [
  { label: "About", href: "/#about", mobile: false },
  { label: "Experience", href: "/#experience", mobile: false },
  { label: "Projects", href: "/#projects", mobile: true },
  { label: "Contact", href: "/#contact", mobile: false },
];

// Hover styles are gated on (hover: hover): on touch screens a tap leaves :hover "stuck" until the next tap.
// Class names are written out in full so Tailwind's scanner can find them.
const NAV_LINK =
  "relative py-1 text-brand-muted transition-colors [@media(hover:hover)]:hover:text-brand-text focus-visible:text-brand-text " +
  "after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-full after:origin-left after:scale-x-0 " +
  "after:rounded-full after:bg-brand-accent after:transition-transform after:duration-300 " +
  "[@media(hover:hover)]:hover:after:scale-x-100 focus-visible:after:scale-x-100";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 h-16 border-b border-brand-border/70 bg-white/75 shadow-[0_1px_12px_-6px_rgba(4,120,87,0.25)] backdrop-blur-md">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-700"
      />
      <div className={`${CONTAINER} flex h-full items-center justify-between gap-4`}>
        <Link href="/" className="group flex items-center gap-2.5">
          <span
            aria-hidden="true"
            className="grid h-8 w-8 place-items-center rounded-lg bg-gradient-to-br from-brand-accent to-teal-500 text-xs font-bold tracking-wider text-white shadow-sm transition-transform [@media(hover:hover)]:group-hover:scale-105"
          >
            AV
          </span>
          <span className="font-semibold tracking-tight transition-colors [@media(hover:hover)]:group-hover:text-brand-accent">
            Anmol Verma
          </span>
        </Link>
        <nav className="flex items-center gap-5 text-sm font-medium lg:gap-7">
          {SECTIONS.map((s) => (
            <Link key={s.href} href={s.href} className={`${NAV_LINK} ${s.mobile ? "" : "hidden md:inline-block"}`}>
              {s.label}
            </Link>
          ))}
          <a
            href="/Anmol-Verma-CV.pdf"
            download="Anmol-Verma-CV.pdf"
            className="inline-flex items-center gap-1.5 rounded-full bg-brand-accent px-4 py-1.5 text-white shadow-sm transition [@media(hover:hover)]:hover:bg-brand-accentDark [@media(hover:hover)]:hover:shadow"
          >
            <svg aria-hidden="true" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
              <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.69L6.28 8.47a.75.75 0 0 0-1.06 1.06l4.25 4.25a.75.75 0 0 0 1.06 0l4.25-4.25a.75.75 0 1 0-1.06-1.06l-2.97 2.97V2.75Z" />
              <path d="M3.5 13.75a.75.75 0 0 0-1.5 0v1.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-1.5a.75.75 0 0 0-1.5 0v1.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-1.5Z" />
            </svg>
            Resume
          </a>
        </nav>
      </div>
    </header>
  );
}
